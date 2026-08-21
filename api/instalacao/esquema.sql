-- =====================================================================
-- Plataforma Institucional da OMCL — esquema MySQL / MariaDB
--
-- Destinado a hospedagem comum (XAMPP, cPanel, Plesk). O equivalente em
-- PostgreSQL está em docs/schema.sql; este é o que o instalador executa.
--
-- O prefixo {P} é substituído pelo instalador, permitindo mais de uma
-- instalação no mesmo banco — prática comum em hospedagem compartilhada.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Configuração e território
-- ---------------------------------------------------------------------

CREATE TABLE {P}config (
  chave      VARCHAR(64)  NOT NULL PRIMARY KEY,
  valor      TEXT         NOT NULL,
  atualizado TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}paises (
  id         CHAR(36)    NOT NULL PRIMARY KEY,
  nome       VARCHAR(120) NOT NULL,
  codigo_iso CHAR(2)      NOT NULL,
  moeda      CHAR(3)      NOT NULL,
  UNIQUE KEY uq_pais_iso (codigo_iso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}estados (
  id      CHAR(36)     NOT NULL PRIMARY KEY,
  pais_id CHAR(36)     NOT NULL,
  nome    VARCHAR(120) NOT NULL,
  sigla   VARCHAR(10)  NOT NULL,
  UNIQUE KEY uq_estado (pais_id, sigla),
  CONSTRAINT fk_estado_pais FOREIGN KEY (pais_id) REFERENCES {P}paises(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}municipios (
  id        CHAR(36)     NOT NULL PRIMARY KEY,
  estado_id CHAR(36)     NOT NULL,
  nome      VARCHAR(160) NOT NULL,
  UNIQUE KEY uq_municipio (estado_id, nome),
  CONSTRAINT fk_municipio_estado FOREIGN KEY (estado_id) REFERENCES {P}estados(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Cargos e permissões (RBAC) — Est. Arts. 16, 33, 41, 60; C10:36 a C10:50
-- ---------------------------------------------------------------------

CREATE TABLE {P}cargos (
  id          CHAR(36)     NOT NULL PRIMARY KEY,
  codigo      VARCHAR(40)  NOT NULL,
  nome        VARCHAR(80)  NOT NULL,
  descricao   TEXT         NOT NULL,
  escopo      ENUM('global','pais','estado','nucleo','proprio') NOT NULL,
  precedencia TINYINT UNSIGNED NOT NULL,
  sistema     TINYINT(1)   NOT NULL DEFAULT 0,
  UNIQUE KEY uq_cargo_codigo (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}cargo_permissoes (
  cargo_id  CHAR(36)    NOT NULL,
  permissao VARCHAR(60) NOT NULL,
  PRIMARY KEY (cargo_id, permissao),
  CONSTRAINT fk_perm_cargo FOREIGN KEY (cargo_id) REFERENCES {P}cargos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Graus de formação — C10:24 a C10:54
CREATE TABLE {P}graus (
  id          CHAR(36)     NOT NULL PRIMARY KEY,
  codigo      VARCHAR(40)  NOT NULL,
  nome        VARCHAR(80)  NOT NULL,
  categoria   ENUM('formacao','mediadora','mestria') NOT NULL,
  ordem       TINYINT UNSIGNED NOT NULL,
  descricao   TEXT         NOT NULL,
  xp_sugerido INT UNSIGNED NOT NULL DEFAULT 0,
  UNIQUE KEY uq_grau_codigo (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Núcleos — Est. Arts. 58 a 61
-- ---------------------------------------------------------------------

CREATE TABLE {P}nucleos (
  id               CHAR(36)     NOT NULL PRIMARY KEY,
  nome             VARCHAR(160) NOT NULL,
  codigo           VARCHAR(20)  NOT NULL,
  pais_id          CHAR(36)     NOT NULL,
  estado_id        CHAR(36)     NOT NULL,
  municipio_id     CHAR(36)     NOT NULL,
  endereco         VARCHAR(255) NOT NULL DEFAULT '',
  data_fundacao    DATE         NOT NULL,
  situacao         ENUM('ativo','em_formacao','suspenso','encerrado') NOT NULL DEFAULT 'em_formacao',
  descricao        TEXT,
  contato_email    VARCHAR(160) NOT NULL DEFAULT '',
  contato_telefone VARCHAR(40)  NOT NULL DEFAULT '',
  dirigente_id     CHAR(36) NULL,
  secretario_id    CHAR(36) NULL,
  tesoureiro_id    CHAR(36) NULL,
  criado_em        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_nucleo_codigo (codigo),
  KEY idx_nucleo_territorio (estado_id, municipio_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Membros — Est. Arts. 14, 15, 20 a 22
-- ---------------------------------------------------------------------

CREATE TABLE {P}membros (
  id                   CHAR(36)     NOT NULL PRIMARY KEY,
  numero_membro        VARCHAR(30)  NOT NULL,
  nome_completo        VARCHAR(180) NOT NULL,
  nome_exibicao        VARCHAR(120) NOT NULL,
  usuario              VARCHAR(60)  NOT NULL,
  email                VARCHAR(190) NOT NULL,
  telefone             VARCHAR(40)  NOT NULL DEFAULT '',
  foto_url             VARCHAR(255) NULL,
  sexo                 ENUM('feminino','masculino','outro','nao_informado') NOT NULL DEFAULT 'nao_informado',
  data_nascimento      DATE NULL,
  logradouro           VARCHAR(180) NOT NULL DEFAULT '',
  numero_endereco      VARCHAR(20)  NOT NULL DEFAULT '',
  complemento          VARCHAR(120) NULL,
  bairro               VARCHAR(120) NOT NULL DEFAULT '',
  cep                  VARCHAR(20)  NOT NULL DEFAULT '',
  pais_id              CHAR(36)     NULL,
  estado_id            CHAR(36)     NULL,
  municipio_id         CHAR(36)     NULL,
  nucleo_id            CHAR(36)     NULL,
  cargo_id             CHAR(36)     NOT NULL,
  grau_id              CHAR(36)     NOT NULL,
  categoria_associativa ENUM('transicao','efetivo','honorario','benemerito','juvenil') NOT NULL DEFAULT 'transicao',
  situacao             ENUM('ativo','pendente','suspenso','inativo','desligado') NOT NULL DEFAULT 'pendente',
  data_ingresso        DATE         NOT NULL,
  biografia            TEXT,
  xp                   INT UNSIGNED NOT NULL DEFAULT 0,
  sequencia_dias       SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  -- Privacidade — Est. Art. 21, VI
  vis_email            ENUM('publico','nucleo','administracao','privado') NOT NULL DEFAULT 'administracao',
  vis_telefone         ENUM('publico','nucleo','administracao','privado') NOT NULL DEFAULT 'nucleo',
  vis_endereco         ENUM('publico','nucleo','administracao','privado') NOT NULL DEFAULT 'administracao',
  vis_nascimento       ENUM('publico','nucleo','administracao','privado') NOT NULL DEFAULT 'nucleo',
  vis_perfil           ENUM('publico','nucleo','administracao','privado') NOT NULL DEFAULT 'publico',
  vis_publicacoes      ENUM('publico','nucleo','administracao','privado') NOT NULL DEFAULT 'publico',
  -- Segurança
  senha_hash           VARCHAR(255) NOT NULL,
  dois_fatores_ativo   TINYINT(1)   NOT NULL DEFAULT 0,
  dois_fatores_segredo VARCHAR(255) NULL,
  tentativas_falhas    SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  bloqueado_ate        DATETIME NULL,
  observacoes_admin    TEXT,
  ultimo_acesso        DATETIME NULL,
  criado_em            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_membro_email (email),
  UNIQUE KEY uq_membro_usuario (usuario),
  UNIQUE KEY uq_membro_numero (numero_membro),
  KEY idx_membro_nucleo (nucleo_id),
  KEY idx_membro_situacao (situacao),
  KEY idx_membro_ranking (xp DESC),
  CONSTRAINT fk_membro_cargo  FOREIGN KEY (cargo_id)  REFERENCES {P}cargos(id),
  CONSTRAINT fk_membro_grau   FOREIGN KEY (grau_id)   REFERENCES {P}graus(id),
  CONSTRAINT fk_membro_nucleo FOREIGN KEY (nucleo_id) REFERENCES {P}nucleos(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE {P}nucleos
  ADD CONSTRAINT fk_nucleo_dirigente  FOREIGN KEY (dirigente_id)  REFERENCES {P}membros(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_nucleo_secretario FOREIGN KEY (secretario_id) REFERENCES {P}membros(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_nucleo_tesoureiro FOREIGN KEY (tesoureiro_id) REFERENCES {P}membros(id) ON DELETE SET NULL;

-- Títulos fora da progressão linear — C10:47 a C10:51
CREATE TABLE {P}membro_titulos (
  membro_id CHAR(36) NOT NULL,
  titulo    ENUM('regalis','kyrios') NOT NULL,
  PRIMARY KEY (membro_id, titulo),
  CONSTRAINT fk_titulo_membro FOREIGN KEY (membro_id) REFERENCES {P}membros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}membro_competencias (
  membro_id   CHAR(36)    NOT NULL,
  competencia VARCHAR(80) NOT NULL,
  PRIMARY KEY (membro_id, competencia),
  CONSTRAINT fk_comp_membro FOREIGN KEY (membro_id) REFERENCES {P}membros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Sessões — token guardado como resumo, nunca em texto claro
-- ---------------------------------------------------------------------

CREATE TABLE {P}sessoes (
  id          CHAR(36)     NOT NULL PRIMARY KEY,
  membro_id   CHAR(36)     NOT NULL,
  token_hash  CHAR(64)     NOT NULL,
  dispositivo VARCHAR(180) NOT NULL DEFAULT '',
  ip          VARCHAR(45)  NOT NULL DEFAULT '',
  criada_em   DATETIME     NOT NULL,
  expira_em   DATETIME     NOT NULL,
  revogada_em DATETIME     NULL,
  UNIQUE KEY uq_sessao_token (token_hash),
  KEY idx_sessao_membro (membro_id, revogada_em),
  CONSTRAINT fk_sessao_membro FOREIGN KEY (membro_id) REFERENCES {P}membros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Auditoria — Est. Art. 13. Somente acréscimo.
-- ---------------------------------------------------------------------

CREATE TABLE {P}auditoria (
  id        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  membro_id CHAR(36)     NULL,
  acao      VARCHAR(120) NOT NULL,
  modulo    VARCHAR(60)  NOT NULL,
  detalhe   TEXT         NOT NULL,
  ip        VARCHAR(45)  NOT NULL DEFAULT '',
  agente    VARCHAR(255) NOT NULL DEFAULT '',
  em        DATETIME     NOT NULL,
  KEY idx_auditoria_em (em DESC),
  KEY idx_auditoria_membro (membro_id, em DESC),
  KEY idx_auditoria_modulo (modulo, em DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Órgãos e assentos — Est. Arts. 23, 41, 43, 50, 54, 59
-- ---------------------------------------------------------------------

CREATE TABLE {P}orgaos (
  id             CHAR(36)     NOT NULL PRIMARY KEY,
  codigo         VARCHAR(40)  NOT NULL,
  nome           VARCHAR(160) NOT NULL,
  descricao      TEXT         NOT NULL,
  ambito         ENUM('central','local') NOT NULL,
  nucleo_id      CHAR(36)     NULL,
  minimo_membros TINYINT UNSIGNED NULL,
  maximo_membros TINYINT UNSIGNED NULL,
  mandato_anos   TINYINT UNSIGNED NULL,
  fundamento     VARCHAR(120) NOT NULL DEFAULT '',
  KEY idx_orgao_nucleo (nucleo_id),
  CONSTRAINT fk_orgao_nucleo FOREIGN KEY (nucleo_id) REFERENCES {P}nucleos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}orgao_competencias (
  orgao_id   CHAR(36) NOT NULL,
  ordem      TINYINT UNSIGNED NOT NULL,
  competencia TEXT    NOT NULL,
  PRIMARY KEY (orgao_id, ordem),
  CONSTRAINT fk_comp_orgao FOREIGN KEY (orgao_id) REFERENCES {P}orgaos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}assentos (
  id             CHAR(36)     NOT NULL PRIMARY KEY,
  orgao_id       CHAR(36)     NOT NULL,
  membro_id      CHAR(36)     NOT NULL,
  funcao         VARCHAR(120) NOT NULL,
  inicio_mandato DATE         NOT NULL,
  fim_mandato    DATE         NULL,
  ativo          TINYINT(1)   NOT NULL DEFAULT 1,
  KEY idx_assento_orgao (orgao_id, ativo),
  CONSTRAINT fk_assento_orgao  FOREIGN KEY (orgao_id)  REFERENCES {P}orgaos(id)  ON DELETE CASCADE,
  CONSTRAINT fk_assento_membro FOREIGN KEY (membro_id) REFERENCES {P}membros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Assembleias e deliberação — Est. Arts. 27 a 32, 62
-- ---------------------------------------------------------------------

CREATE TABLE {P}assembleias (
  id                   CHAR(36)     NOT NULL PRIMARY KEY,
  titulo               VARCHAR(200) NOT NULL,
  descricao            TEXT         NOT NULL,
  orgao_id             CHAR(36)     NOT NULL,
  ordinaria            TINYINT(1)   NOT NULL DEFAULT 1,
  convocada_em         DATETIME     NOT NULL,
  inicio               DATETIME     NOT NULL,
  local                VARCHAR(200) NOT NULL DEFAULT '',
  modalidade           ENUM('presencial','online','hibrido') NOT NULL,
  convocacao_aplicada  ENUM('primeira','segunda') NULL,
  situacao             ENUM('convocada','instalada','encerrada','cancelada') NOT NULL DEFAULT 'convocada',
  convocada_por_id     CHAR(36)     NOT NULL,
  ata                  TEXT         NULL,
  KEY idx_assembleia_inicio (inicio DESC),
  CONSTRAINT fk_assembleia_orgao FOREIGN KEY (orgao_id) REFERENCES {P}orgaos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}materias (
  id            CHAR(36)     NOT NULL PRIMARY KEY,
  assembleia_id CHAR(36)     NOT NULL,
  ordem         TINYINT UNSIGNED NOT NULL,
  titulo        VARCHAR(200) NOT NULL,
  descricao     TEXT         NOT NULL,
  quorum        ENUM('simples','qualificado') NOT NULL DEFAULT 'simples',
  fundamento    VARCHAR(120) NULL,
  encerrada     TINYINT(1)   NOT NULL DEFAULT 0,
  KEY idx_materia_assembleia (assembleia_id, ordem),
  CONSTRAINT fk_materia_assembleia FOREIGN KEY (assembleia_id) REFERENCES {P}assembleias(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Est. Art. 62 — votação nominal. A chave única impede voto duplicado.
CREATE TABLE {P}votos (
  id            CHAR(36) NOT NULL PRIMARY KEY,
  materia_id    CHAR(36) NOT NULL,
  membro_id     CHAR(36) NOT NULL,
  opcao         ENUM('favor','contra','abstencao') NOT NULL,
  registrado_em DATETIME NOT NULL,
  UNIQUE KEY uq_voto (materia_id, membro_id),
  CONSTRAINT fk_voto_materia FOREIGN KEY (materia_id) REFERENCES {P}materias(id) ON DELETE CASCADE,
  CONSTRAINT fk_voto_membro  FOREIGN KEY (membro_id)  REFERENCES {P}membros(id)  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}presencas_assembleia (
  id            CHAR(36) NOT NULL PRIMARY KEY,
  assembleia_id CHAR(36) NOT NULL,
  membro_id     CHAR(36) NOT NULL,
  registrada_em DATETIME NOT NULL,
  UNIQUE KEY uq_presenca_ag (assembleia_id, membro_id),
  CONSTRAINT fk_presenca_ag_assembleia FOREIGN KEY (assembleia_id) REFERENCES {P}assembleias(id) ON DELETE CASCADE,
  CONSTRAINT fk_presenca_ag_membro     FOREIGN KEY (membro_id)     REFERENCES {P}membros(id)     ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Tesouraria — Est. Arts. 10 a 13; Códice C106
-- ---------------------------------------------------------------------

CREATE TABLE {P}contas (
  id            CHAR(36)     NOT NULL PRIMARY KEY,
  nome          VARCHAR(160) NOT NULL,
  instituicao   VARCHAR(120) NOT NULL DEFAULT '',
  saldo_inicial DECIMAL(14,2) NOT NULL DEFAULT 0,
  nucleo_id     CHAR(36)     NULL,
  CONSTRAINT fk_conta_nucleo FOREIGN KEY (nucleo_id) REFERENCES {P}nucleos(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}categorias_financeiras (
  id   CHAR(36)     NOT NULL PRIMARY KEY,
  nome VARCHAR(160) NOT NULL,
  tipo ENUM('receita','despesa') NOT NULL,
  cor  CHAR(7)      NOT NULL DEFAULT '#2a78d6'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}lancamentos (
  id              CHAR(36)     NOT NULL PRIMARY KEY,
  tipo            ENUM('receita','despesa') NOT NULL,
  modalidade      ENUM('pistis','hekousia') NULL,
  contribuinte_id CHAR(36)     NULL,
  data            DATE         NOT NULL,
  descricao       VARCHAR(255) NOT NULL,
  categoria_id    CHAR(36)     NOT NULL,
  conta_id        CHAR(36)     NOT NULL,
  valor           DECIMAL(14,2) NOT NULL,
  responsavel_id  CHAR(36)     NOT NULL,
  nucleo_id       CHAR(36)     NULL,
  situacao        ENUM('previsto','liquidado','cancelado') NOT NULL DEFAULT 'liquidado',
  observacao      TEXT         NULL,
  comprovante_url VARCHAR(255) NULL,
  criado_em       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_lancamento_data (data DESC),
  KEY idx_lancamento_nucleo (nucleo_id, data DESC),
  CONSTRAINT ck_lancamento_valor CHECK (valor > 0),
  CONSTRAINT fk_lancamento_categoria FOREIGN KEY (categoria_id) REFERENCES {P}categorias_financeiras(id),
  CONSTRAINT fk_lancamento_conta     FOREIGN KEY (conta_id)     REFERENCES {P}contas(id),
  CONSTRAINT fk_lancamento_resp      FOREIGN KEY (responsavel_id) REFERENCES {P}membros(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- C106:7 — compromisso de contribuição recorrente (Pistis Eisphora)
CREATE TABLE {P}compromissos (
  id               CHAR(36)     NOT NULL PRIMARY KEY,
  membro_id        CHAR(36)     NOT NULL,
  valor_mensal     DECIMAL(10,2) NOT NULL,
  inicio_vigencia  DATE         NOT NULL,
  fim_vigencia     DATE         NULL,
  ativo            TINYINT(1)   NOT NULL DEFAULT 1,
  CONSTRAINT fk_compromisso_membro FOREIGN KEY (membro_id) REFERENCES {P}membros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Publicações, XP e demais registros
-- ---------------------------------------------------------------------

CREATE TABLE {P}publicacoes (
  id                CHAR(36)     NOT NULL PRIMARY KEY,
  autor_id          CHAR(36)     NOT NULL,
  emitido_por       VARCHAR(120) NULL,
  oficial           TINYINT(1)   NOT NULL DEFAULT 0,
  categoria         ENUM('comunicado','formacao','evento','nucleo','noticia','membro') NOT NULL,
  nucleo_id         CHAR(36)     NULL,
  titulo            VARCHAR(200) NULL,
  conteudo          TEXT         NOT NULL,
  fixado            TINYINT(1)   NOT NULL DEFAULT 0,
  destaque          TINYINT(1)   NOT NULL DEFAULT 0,
  compartilhamentos INT UNSIGNED NOT NULL DEFAULT 0,
  criado_em         DATETIME     NOT NULL,
  KEY idx_pub_feed (fixado DESC, criado_em DESC),
  CONSTRAINT fk_pub_autor FOREIGN KEY (autor_id) REFERENCES {P}membros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}comentarios (
  id            CHAR(36) NOT NULL PRIMARY KEY,
  publicacao_id CHAR(36) NOT NULL,
  autor_id      CHAR(36) NOT NULL,
  conteudo      TEXT     NOT NULL,
  criado_em     DATETIME NOT NULL,
  KEY idx_comentario_pub (publicacao_id, criado_em),
  CONSTRAINT fk_com_pub   FOREIGN KEY (publicacao_id) REFERENCES {P}publicacoes(id) ON DELETE CASCADE,
  CONSTRAINT fk_com_autor FOREIGN KEY (autor_id)      REFERENCES {P}membros(id)     ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE {P}curtidas (
  publicacao_id CHAR(36) NOT NULL,
  membro_id     CHAR(36) NOT NULL,
  criado_em     DATETIME NOT NULL,
  PRIMARY KEY (publicacao_id, membro_id),
  CONSTRAINT fk_curtida_pub    FOREIGN KEY (publicacao_id) REFERENCES {P}publicacoes(id) ON DELETE CASCADE,
  CONSTRAINT fk_curtida_membro FOREIGN KEY (membro_id)     REFERENCES {P}membros(id)     ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Razão do XP: `membros.xp` é o saldo, recalculável a partir daqui.
CREATE TABLE {P}transacoes_xp (
  id             CHAR(36)     NOT NULL PRIMARY KEY,
  membro_id      CHAR(36)     NOT NULL,
  origem         VARCHAR(40)  NOT NULL,
  descricao      VARCHAR(255) NOT NULL,
  pontos         INT          NOT NULL,
  registrado_por CHAR(36)     NULL,
  criado_em      DATETIME     NOT NULL,
  KEY idx_xp_membro (membro_id, criado_em DESC),
  CONSTRAINT fk_xp_membro FOREIGN KEY (membro_id) REFERENCES {P}membros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ritos com efeito registral — Códice Verde
CREATE TABLE {P}ritos (
  id               CHAR(36)     NOT NULL PRIMARY KEY,
  tipo             ENUM('oikeiosis','prokope','syzygia','reconhecimento','syssitia','desobrigacao') NOT NULL,
  membro_id        CHAR(36)     NOT NULL,
  nucleo_id        CHAR(36)     NULL,
  celebrado_em     DATE         NOT NULL,
  presidido_por_id CHAR(36)     NOT NULL,
  local            VARCHAR(200) NOT NULL DEFAULT '',
  nota             TEXT         NULL,
  grau_alcancado_id CHAR(36)    NULL,
  KEY idx_rito_membro (membro_id, celebrado_em DESC),
  CONSTRAINT fk_rito_membro FOREIGN KEY (membro_id) REFERENCES {P}membros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Recuperação de senha — o token só existe em texto claro na mensagem
-- enviada ao membro; aqui fica apenas o resumo, e de uso único.
CREATE TABLE {P}recuperacoes (
  id         CHAR(36)  NOT NULL PRIMARY KEY,
  membro_id  CHAR(36)  NOT NULL,
  token_hash CHAR(64)  NOT NULL,
  criado_em  DATETIME  NOT NULL,
  expira_em  DATETIME  NOT NULL,
  usado_em   DATETIME  NULL,
  ip         VARCHAR(45) NOT NULL DEFAULT '',
  UNIQUE KEY uq_recuperacao_token (token_hash),
  KEY idx_recuperacao_membro (membro_id, usado_em),
  CONSTRAINT fk_recuperacao_membro FOREIGN KEY (membro_id) REFERENCES {P}membros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Limitação de tentativas de acesso, por conta e por origem
CREATE TABLE {P}tentativas (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  chave      VARCHAR(190) NOT NULL,
  ip         VARCHAR(45)  NOT NULL DEFAULT '',
  em         DATETIME     NOT NULL,
  KEY idx_tentativa (chave, em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
