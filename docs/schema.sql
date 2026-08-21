-- =====================================================================
-- Plataforma Institucional da Ordem — esquema relacional
-- PostgreSQL 15+
--
-- Espelha src/types/index.ts. Ver docs/MODELO-DADOS.md.
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------
-- Território
-- ---------------------------------------------------------------------

CREATE TABLE paises (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome        TEXT NOT NULL,
  codigo_iso  CHAR(2) NOT NULL UNIQUE,
  moeda       CHAR(3) NOT NULL
);

CREATE TABLE estados (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pais_id  UUID NOT NULL REFERENCES paises(id) ON DELETE RESTRICT,
  nome     TEXT NOT NULL,
  sigla    TEXT NOT NULL,
  UNIQUE (pais_id, sigla)
);

CREATE TABLE municipios (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estado_id  UUID NOT NULL REFERENCES estados(id) ON DELETE RESTRICT,
  nome       TEXT NOT NULL,
  UNIQUE (estado_id, nome)
);

-- ---------------------------------------------------------------------
-- Cargos e permissões (RBAC)
-- ---------------------------------------------------------------------

CREATE TYPE escopo_cargo AS ENUM ('global', 'pais', 'estado', 'nucleo', 'proprio');

CREATE TABLE cargos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo      TEXT NOT NULL UNIQUE,
  nome        TEXT NOT NULL,
  descricao   TEXT NOT NULL DEFAULT '',
  escopo      escopo_cargo NOT NULL,
  precedencia SMALLINT NOT NULL CHECK (precedencia BETWEEN 1 AND 99),
  sistema     BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE permissoes (
  chave     TEXT PRIMARY KEY,
  grupo     TEXT NOT NULL,
  rotulo    TEXT NOT NULL
);

CREATE TABLE cargo_permissoes (
  cargo_id       UUID NOT NULL REFERENCES cargos(id) ON DELETE CASCADE,
  permissao      TEXT NOT NULL REFERENCES permissoes(chave) ON DELETE CASCADE,
  PRIMARY KEY (cargo_id, permissao)
);

-- ---------------------------------------------------------------------
-- Núcleos
-- ---------------------------------------------------------------------

CREATE TYPE situacao_nucleo AS ENUM ('ativo', 'em_formacao', 'suspenso', 'encerrado');

CREATE TABLE nucleos (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              TEXT NOT NULL,
  codigo            TEXT NOT NULL UNIQUE,
  pais_id           UUID NOT NULL REFERENCES paises(id),
  estado_id         UUID NOT NULL REFERENCES estados(id),
  municipio_id      UUID NOT NULL REFERENCES municipios(id),
  endereco          TEXT NOT NULL DEFAULT '',
  data_fundacao     DATE NOT NULL,
  situacao          situacao_nucleo NOT NULL DEFAULT 'em_formacao',
  descricao         TEXT NOT NULL DEFAULT '',
  contato_email     TEXT NOT NULL DEFAULT '',
  contato_telefone  TEXT NOT NULL DEFAULT '',
  dirigente_id      UUID,   -- FK adiada: referencia membros
  secretario_id     UUID,
  tesoureiro_id     UUID,
  criado_em         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------
-- Membros
-- ---------------------------------------------------------------------

CREATE TYPE situacao_membresia AS ENUM ('ativo','pendente','suspenso','inativo','desligado');
CREATE TYPE sexo_membro        AS ENUM ('feminino','masculino','outro','nao_informado');
CREATE TYPE nivel_visibilidade AS ENUM ('publico','nucleo','administracao','privado');

CREATE TABLE membros (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_membro         TEXT NOT NULL UNIQUE,
  nome_completo         TEXT NOT NULL,
  nome_exibicao         TEXT NOT NULL,
  usuario               CITEXT NOT NULL UNIQUE,
  email                 CITEXT NOT NULL UNIQUE,
  telefone              TEXT NOT NULL DEFAULT '',
  foto_url              TEXT,
  sexo                  sexo_membro NOT NULL DEFAULT 'nao_informado',
  data_nascimento       DATE,
  -- endereço
  logradouro            TEXT NOT NULL DEFAULT '',
  numero_endereco       TEXT NOT NULL DEFAULT '',
  complemento           TEXT,
  bairro                TEXT NOT NULL DEFAULT '',
  cep                   TEXT NOT NULL DEFAULT '',
  -- território (desnormalizado para ranking e relatórios)
  pais_id               UUID NOT NULL REFERENCES paises(id),
  estado_id             UUID NOT NULL REFERENCES estados(id),
  municipio_id          UUID NOT NULL REFERENCES municipios(id),
  -- vínculo institucional
  nucleo_id             UUID REFERENCES nucleos(id) ON DELETE SET NULL,
  cargo_id              UUID NOT NULL REFERENCES cargos(id),
  situacao              situacao_membresia NOT NULL DEFAULT 'pendente',
  data_ingresso         DATE NOT NULL DEFAULT CURRENT_DATE,
  -- perfil
  biografia             TEXT,
  interesses            TEXT[] NOT NULL DEFAULT '{}',
  areas_atuacao         TEXT[] NOT NULL DEFAULT '{}',
  -- gamificação (saldo; o razão está em transacoes_xp)
  xp                    INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
  nivel                 SMALLINT NOT NULL DEFAULT 1,
  sequencia_dias        SMALLINT NOT NULL DEFAULT 0,
  -- privacidade
  vis_email             nivel_visibilidade NOT NULL DEFAULT 'administracao',
  vis_telefone          nivel_visibilidade NOT NULL DEFAULT 'nucleo',
  vis_endereco          nivel_visibilidade NOT NULL DEFAULT 'administracao',
  vis_nascimento        nivel_visibilidade NOT NULL DEFAULT 'nucleo',
  vis_perfil            nivel_visibilidade NOT NULL DEFAULT 'publico',
  vis_publicacoes       nivel_visibilidade NOT NULL DEFAULT 'publico',
  -- segurança
  senha_hash            TEXT NOT NULL,          -- Argon2id
  dois_fatores_ativo    BOOLEAN NOT NULL DEFAULT FALSE,
  dois_fatores_segredo  TEXT,
  observacoes_admin     TEXT,
  ultimo_acesso         TIMESTAMPTZ,
  criado_em             TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_membros_nucleo    ON membros(nucleo_id);
CREATE INDEX idx_membros_situacao  ON membros(situacao);
CREATE INDEX idx_membros_ranking   ON membros(xp DESC) WHERE situacao = 'ativo';
CREATE INDEX idx_membros_estado    ON membros(estado_id);
CREATE INDEX idx_membros_municipio ON membros(municipio_id);

ALTER TABLE nucleos
  ADD CONSTRAINT fk_nucleo_dirigente  FOREIGN KEY (dirigente_id)  REFERENCES membros(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_nucleo_secretario FOREIGN KEY (secretario_id) REFERENCES membros(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_nucleo_tesoureiro FOREIGN KEY (tesoureiro_id) REFERENCES membros(id) ON DELETE SET NULL;

CREATE TABLE aliados (
  membro_id  UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  aliado_id  UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  criado_em  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (membro_id, aliado_id),
  CHECK (membro_id <> aliado_id)
);

CREATE TABLE sessoes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membro_id   UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  token_hash  TEXT NOT NULL UNIQUE,
  dispositivo TEXT NOT NULL DEFAULT '',
  local       TEXT NOT NULL DEFAULT '',
  ip          INET,
  criada_em   TIMESTAMPTZ NOT NULL DEFAULT now(),
  expira_em   TIMESTAMPTZ NOT NULL,
  revogada_em TIMESTAMPTZ
);

CREATE INDEX idx_sessoes_membro ON sessoes(membro_id) WHERE revogada_em IS NULL;

-- ---------------------------------------------------------------------
-- Feed
-- ---------------------------------------------------------------------

CREATE TYPE categoria_publicacao AS ENUM ('comunicado','formacao','evento','nucleo','noticia','membro');
CREATE TYPE tipo_anexo           AS ENUM ('imagem','video','documento','link','evento','enquete');

CREATE TABLE publicacoes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  autor_id          UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  emitido_por       TEXT,
  oficial           BOOLEAN NOT NULL DEFAULT FALSE,
  categoria         categoria_publicacao NOT NULL,
  nucleo_id         UUID REFERENCES nucleos(id) ON DELETE SET NULL,
  titulo            TEXT,
  conteudo          TEXT NOT NULL,
  fixado            BOOLEAN NOT NULL DEFAULT FALSE,
  destaque          BOOLEAN NOT NULL DEFAULT FALSE,
  compartilhamentos INTEGER NOT NULL DEFAULT 0,
  visibilidade      nivel_visibilidade NOT NULL DEFAULT 'publico',
  criado_em         TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (NOT oficial OR emitido_por IS NOT NULL)
);

CREATE INDEX idx_publicacoes_feed ON publicacoes(fixado DESC, criado_em DESC);

CREATE TABLE anexos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publicacao_id   UUID NOT NULL REFERENCES publicacoes(id) ON DELETE CASCADE,
  tipo            tipo_anexo NOT NULL,
  titulo          TEXT NOT NULL,
  url             TEXT,
  descricao       TEXT,
  tamanho         TEXT,
  duracao         TEXT,
  ordem           SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE opcoes_enquete (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anexo_id  UUID NOT NULL REFERENCES anexos(id) ON DELETE CASCADE,
  texto     TEXT NOT NULL,
  ordem     SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE votos_enquete (
  opcao_id   UUID NOT NULL REFERENCES opcoes_enquete(id) ON DELETE CASCADE,
  membro_id  UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  criado_em  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (opcao_id, membro_id)
);

CREATE TABLE comentarios (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publicacao_id  UUID NOT NULL REFERENCES publicacoes(id) ON DELETE CASCADE,
  autor_id       UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  conteudo       TEXT NOT NULL,
  criado_em      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_comentarios_publicacao ON comentarios(publicacao_id, criado_em);

CREATE TABLE reacoes (
  publicacao_id UUID REFERENCES publicacoes(id) ON DELETE CASCADE,
  comentario_id UUID REFERENCES comentarios(id) ON DELETE CASCADE,
  membro_id     UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (num_nonnulls(publicacao_id, comentario_id) = 1),
  UNIQUE (publicacao_id, comentario_id, membro_id)
);

CREATE TABLE publicacoes_salvas (
  publicacao_id UUID NOT NULL REFERENCES publicacoes(id) ON DELETE CASCADE,
  membro_id     UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (publicacao_id, membro_id)
);

-- ---------------------------------------------------------------------
-- Eventos e presença
-- ---------------------------------------------------------------------

CREATE TYPE modalidade_evento  AS ENUM ('presencial','online','hibrido');
CREATE TYPE situacao_inscricao AS ENUM ('confirmado','lista_espera','cancelado');

CREATE TABLE eventos (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo               TEXT NOT NULL,
  descricao            TEXT NOT NULL DEFAULT '',
  imagem_url           TEXT,
  inicio               TIMESTAMPTZ NOT NULL,
  fim                  TIMESTAMPTZ NOT NULL,
  local                TEXT NOT NULL DEFAULT '',
  modalidade           modalidade_evento NOT NULL,
  responsavel_id       UUID NOT NULL REFERENCES membros(id),
  nucleo_id            UUID REFERENCES nucleos(id) ON DELETE SET NULL,
  limite_participantes INTEGER CHECK (limite_participantes IS NULL OR limite_participantes > 0),
  xp_participacao      INTEGER NOT NULL DEFAULT 0,
  inscricoes_abertas   BOOLEAN NOT NULL DEFAULT TRUE,
  CHECK (fim >= inicio)
);

CREATE INDEX idx_eventos_inicio ON eventos(inicio);

CREATE TABLE inscricoes_evento (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evento_id   UUID NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
  membro_id   UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  situacao    situacao_inscricao NOT NULL DEFAULT 'confirmado',
  inscrito_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (evento_id, membro_id)
);

CREATE TABLE presencas (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evento_id      UUID NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
  membro_id      UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  presente       BOOLEAN NOT NULL,
  registrado_por UUID NOT NULL REFERENCES membros(id),
  registrado_em  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (evento_id, membro_id)
);

-- ---------------------------------------------------------------------
-- Documentos
-- ---------------------------------------------------------------------

CREATE TYPE categoria_documento AS ENUM
  ('estatuto','regimento','codigo','codice','regulamento','manual','formacao','comunicado','administrativo','financeiro');

CREATE TABLE documentos (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo         TEXT NOT NULL,
  descricao      TEXT NOT NULL DEFAULT '',
  categoria      categoria_documento NOT NULL,
  responsavel_id UUID NOT NULL REFERENCES membros(id),
  versao_atual   TEXT NOT NULL DEFAULT '1.0',
  atualizado_em  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lista vazia = documento aberto a todos os membros.
CREATE TABLE documento_acesso (
  documento_id UUID NOT NULL REFERENCES documentos(id) ON DELETE CASCADE,
  cargo_id     UUID NOT NULL REFERENCES cargos(id) ON DELETE CASCADE,
  PRIMARY KEY (documento_id, cargo_id)
);

CREATE TABLE versoes_documento (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  documento_id  UUID NOT NULL REFERENCES documentos(id) ON DELETE CASCADE,
  versao        TEXT NOT NULL,
  notas         TEXT NOT NULL DEFAULT '',
  arquivo_url   TEXT NOT NULL,
  tamanho_bytes BIGINT,
  publicado_em  TIMESTAMPTZ NOT NULL DEFAULT now(),
  publicado_por UUID NOT NULL REFERENCES membros(id),
  UNIQUE (documento_id, versao)
);

-- ---------------------------------------------------------------------
-- Formação
-- ---------------------------------------------------------------------

CREATE TYPE tipo_aula AS ENUM ('texto','video','documento','questionario');

CREATE TABLE cursos (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo             TEXT NOT NULL,
  descricao          TEXT NOT NULL DEFAULT '',
  trilha             TEXT NOT NULL,
  carga_horaria      SMALLINT NOT NULL DEFAULT 0,
  responsavel_id     UUID NOT NULL REFERENCES membros(id),
  xp_conclusao       INTEGER NOT NULL DEFAULT 0,
  emite_certificado  BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE modulos (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curso_id  UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  titulo    TEXT NOT NULL,
  ordem     SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE aulas (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  modulo_id  UUID NOT NULL REFERENCES modulos(id) ON DELETE CASCADE,
  titulo     TEXT NOT NULL,
  tipo       tipo_aula NOT NULL,
  duracao    TEXT NOT NULL DEFAULT '',
  conteudo   TEXT NOT NULL DEFAULT '',
  ordem      SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE progresso_aulas (
  membro_id     UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  aula_id       UUID NOT NULL REFERENCES aulas(id) ON DELETE CASCADE,
  concluida_em  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (membro_id, aula_id)
);

CREATE TABLE certificados (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membro_id    UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  curso_id     UUID NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  codigo       TEXT NOT NULL UNIQUE,
  emitido_em   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (membro_id, curso_id)
);

-- ---------------------------------------------------------------------
-- Propostas
-- ---------------------------------------------------------------------

CREATE TYPE situacao_proposta AS ENUM
  ('recebida','em_analise','em_discussao','aprovada','rejeitada','arquivada');

CREATE TABLE propostas (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo                 TEXT NOT NULL,
  resumo                 TEXT NOT NULL,
  conteudo               TEXT NOT NULL,
  categoria              TEXT NOT NULL,
  autor_id               UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  nucleo_id              UUID REFERENCES nucleos(id) ON DELETE SET NULL,
  situacao               situacao_proposta NOT NULL DEFAULT 'recebida',
  resposta_administracao TEXT,
  criada_em              TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizada_em          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE apoios_proposta (
  proposta_id UUID NOT NULL REFERENCES propostas(id) ON DELETE CASCADE,
  membro_id   UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (proposta_id, membro_id)
);

CREATE TABLE tramites_proposta (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposta_id UUID NOT NULL REFERENCES propostas(id) ON DELETE CASCADE,
  situacao    situacao_proposta NOT NULL,
  por_id      UUID NOT NULL REFERENCES membros(id),
  nota        TEXT,
  em          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------
-- Gamificação
-- ---------------------------------------------------------------------

CREATE TYPE origem_xp AS ENUM
  ('reuniao','evento','formacao','debate','publicacao','nucleo','projeto','atividade','ajuste_administrativo');

CREATE TABLE regras_xp (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origem    origem_xp NOT NULL,
  nome      TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  pontos    INTEGER NOT NULL CHECK (pontos >= 0),
  ativa     BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE niveis (
  numero    SMALLINT PRIMARY KEY,
  titulo    TEXT NOT NULL,
  xp_minimo INTEGER NOT NULL CHECK (xp_minimo >= 0)
);

CREATE TABLE conquistas (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome      TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  icone     TEXT NOT NULL DEFAULT 'military_tech',
  criterio  TEXT NOT NULL DEFAULT ''
);

CREATE TABLE membro_conquistas (
  membro_id    UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  conquista_id UUID NOT NULL REFERENCES conquistas(id) ON DELETE CASCADE,
  concedida_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (membro_id, conquista_id)
);

-- Razão do XP. membros.xp é o saldo; recalculável a partir daqui.
CREATE TABLE transacoes_xp (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membro_id      UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  origem         origem_xp NOT NULL,
  descricao      TEXT NOT NULL,
  pontos         INTEGER NOT NULL,
  registrado_por UUID REFERENCES membros(id),
  criado_em      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_transacoes_membro ON transacoes_xp(membro_id, criado_em DESC);

-- ---------------------------------------------------------------------
-- Comunicação
-- ---------------------------------------------------------------------

CREATE TYPE tipo_conversa     AS ENUM ('direta','grupo','nucleo','oficial');
CREATE TYPE tipo_notificacao  AS ENUM
  ('mensagem','evento','comunicado','administrativo','convite','atividade','cadastro','xp');

CREATE TABLE conversas (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo          tipo_conversa NOT NULL,
  titulo        TEXT NOT NULL,
  nucleo_id     UUID REFERENCES nucleos(id) ON DELETE CASCADE,
  fixada        BOOLEAN NOT NULL DEFAULT FALSE,
  criada_em     TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizada_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE participantes_conversa (
  conversa_id UUID NOT NULL REFERENCES conversas(id) ON DELETE CASCADE,
  membro_id   UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  entrou_em   TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (conversa_id, membro_id)
);

CREATE TABLE mensagens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversa_id UUID NOT NULL REFERENCES conversas(id) ON DELETE CASCADE,
  autor_id    UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  conteudo    TEXT NOT NULL,
  anexo_url   TEXT,
  criada_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_mensagens_conversa ON mensagens(conversa_id, criada_em);

CREATE TABLE leituras_mensagem (
  mensagem_id UUID NOT NULL REFERENCES mensagens(id) ON DELETE CASCADE,
  membro_id   UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  lida_em     TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (mensagem_id, membro_id)
);

CREATE TABLE notificacoes (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membro_id UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  tipo      tipo_notificacao NOT NULL,
  titulo    TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  destino   TEXT,
  lida      BOOLEAN NOT NULL DEFAULT FALSE,
  criada_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notificacoes_membro ON notificacoes(membro_id, lida, criada_em DESC);

-- ---------------------------------------------------------------------
-- Tesouraria
-- ---------------------------------------------------------------------

CREATE TYPE tipo_lancamento     AS ENUM ('receita','despesa');
CREATE TYPE situacao_lancamento AS ENUM ('previsto','liquidado','cancelado');

CREATE TABLE contas_financeiras (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome          TEXT NOT NULL,
  instituicao   TEXT NOT NULL DEFAULT '',
  saldo_inicial NUMERIC(14,2) NOT NULL DEFAULT 0,
  nucleo_id     UUID REFERENCES nucleos(id) ON DELETE SET NULL
);

CREATE TABLE categorias_financeiras (
  id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  tipo tipo_lancamento NOT NULL,
  cor  TEXT NOT NULL DEFAULT '#2a78d6'
);

CREATE TABLE lancamentos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo            tipo_lancamento NOT NULL,
  data            DATE NOT NULL,
  descricao       TEXT NOT NULL,
  categoria_id    UUID NOT NULL REFERENCES categorias_financeiras(id),
  conta_id        UUID NOT NULL REFERENCES contas_financeiras(id),
  valor           NUMERIC(14,2) NOT NULL CHECK (valor > 0),
  responsavel_id  UUID NOT NULL REFERENCES membros(id),
  nucleo_id       UUID REFERENCES nucleos(id) ON DELETE SET NULL,  -- NULL = âmbito nacional
  situacao        situacao_lancamento NOT NULL DEFAULT 'liquidado',
  observacao      TEXT,
  comprovante_url TEXT,
  criado_em       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lancamentos_data   ON lancamentos(data DESC);
CREATE INDEX idx_lancamentos_nucleo ON lancamentos(nucleo_id, data DESC);

-- ---------------------------------------------------------------------
-- Atividades e auditoria
-- ---------------------------------------------------------------------

CREATE TABLE atividades (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo     TEXT NOT NULL,
  descricao  TEXT NOT NULL DEFAULT '',
  prazo      TIMESTAMPTZ,
  membro_id  UUID NOT NULL REFERENCES membros(id) ON DELETE CASCADE,
  origem     origem_xp NOT NULL DEFAULT 'atividade',
  xp         INTEGER NOT NULL DEFAULT 0,
  concluida  BOOLEAN NOT NULL DEFAULT FALSE,
  destino    TEXT,
  criada_em  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trilha de auditoria: apenas INSERT. Sem UPDATE nem DELETE.
CREATE TABLE auditoria (
  id         BIGSERIAL PRIMARY KEY,
  membro_id  UUID REFERENCES membros(id) ON DELETE SET NULL,
  acao       TEXT NOT NULL,
  modulo     TEXT NOT NULL,
  detalhe    TEXT NOT NULL DEFAULT '',
  ip         INET,
  agente     TEXT,
  em         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_auditoria_em     ON auditoria(em DESC);
CREATE INDEX idx_auditoria_membro ON auditoria(membro_id, em DESC);
CREATE INDEX idx_auditoria_modulo ON auditoria(modulo, em DESC);

REVOKE UPDATE, DELETE ON auditoria FROM PUBLIC;

-- ---------------------------------------------------------------------
-- Consultas de apoio
-- ---------------------------------------------------------------------

-- Ranking global (os demais âmbitos filtram por pais_id, estado_id,
-- municipio_id ou nucleo_id sobre a mesma base).
CREATE VIEW vw_ranking_global AS
SELECT
  ROW_NUMBER() OVER (ORDER BY m.xp DESC, m.sequencia_dias DESC, m.nome_completo) AS posicao,
  m.id, m.numero_membro, m.nome_completo, m.nivel, m.xp,
  m.pais_id, m.estado_id, m.municipio_id, m.nucleo_id
FROM membros m
WHERE m.situacao = 'ativo';

-- Fluxo de caixa mensal consolidado.
CREATE VIEW vw_fluxo_mensal AS
SELECT
  date_trunc('month', l.data)::date                                    AS mes,
  l.nucleo_id,
  SUM(l.valor) FILTER (WHERE l.tipo = 'receita')                       AS receitas,
  SUM(l.valor) FILTER (WHERE l.tipo = 'despesa')                       AS despesas,
  SUM(l.valor) FILTER (WHERE l.tipo = 'receita')
    - COALESCE(SUM(l.valor) FILTER (WHERE l.tipo = 'despesa'), 0)      AS resultado
FROM lancamentos l
WHERE l.situacao <> 'cancelado'
GROUP BY 1, 2;
