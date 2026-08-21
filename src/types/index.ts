/**
 * Modelo de dominio da Ordem.
 *
 * As entidades abaixo espelham 1:1 o esquema relacional documentado em
 * docs/MODELO-DADOS.md e docs/schema.sql. A camada de dados do cliente
 * (src/lib/repositorio.ts) opera sobre estas mesmas formas, de modo que a
 * substituicao do armazenamento local por uma API real nao exige mudanca
 * nas telas.
 */

export type ID = string;
/** Data/hora em ISO 8601 (UTC). */
export type ISODate = string;

/* ------------------------------------------------------------------ */
/* Territorio                                                          */
/* ------------------------------------------------------------------ */

export interface Pais {
  id: ID;
  nome: string;
  codigoISO: string;
  moeda: string;
}

export interface Estado {
  id: ID;
  paisId: ID;
  nome: string;
  sigla: string;
}

export interface Municipio {
  id: ID;
  estadoId: ID;
  nome: string;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  municipioId: ID;
  estadoId: ID;
  paisId: ID;
  cep: string;
}

/* ------------------------------------------------------------------ */
/* Cargos e permissoes (RBAC)                                          */
/* ------------------------------------------------------------------ */

export type Permissao =
  // Membros
  | 'membros.visualizar'
  | 'membros.criar'
  | 'membros.editar'
  | 'membros.suspender'
  | 'membros.transferir'
  | 'membros.aprovar'
  | 'membros.exportar'
  // Nucleos
  | 'nucleos.visualizar'
  | 'nucleos.criar'
  | 'nucleos.editar'
  // Conteudo
  | 'publicacoes.criar'
  | 'publicacoes.publicarOficial'
  | 'publicacoes.moderar'
  | 'documentos.visualizar'
  | 'documentos.gerenciar'
  | 'formacao.gerenciar'
  // Eventos e presenca
  | 'eventos.visualizar'
  | 'eventos.gerenciar'
  | 'presenca.registrar'
  // Tesouraria
  | 'tesouraria.visualizar'
  | 'tesouraria.lancarReceita'
  | 'tesouraria.lancarDespesa'
  | 'tesouraria.gerenciarContas'
  // Governanca
  | 'propostas.criar'
  | 'propostas.tramitar'
  | 'gamificacao.configurar'
  | 'relatorios.gerar'
  | 'auditoria.visualizar'
  | 'permissoes.gerenciar'
  | 'configuracoes.gerenciar';

/**
 * Cargos da OMCL, conforme o Estatuto Social (Arts. 16, 33, 41, 60) e o
 * Codice Verde (C10:36 a C10:50). Ver docs/MAPEAMENTO-NORMATIVO.md.
 */
export type CodigoCargo =
  | 'administrador'      // funcao tecnica da plataforma, sem previsao estatutaria
  | 'grao_mestre'        // Est. Art. 33 — Moderador Presidente
  | 'chanceler'          // Est. Art. 41 — gestao administrativa cotidiana
  | 'secretario_geral'   // Est. Art. 41, II
  | 'tesoureiro_geral'   // Est. Art. 41, III
  | 'moderador'          // C10:42 — autoridade doutrinaria estadual ou nacional
  | 'auguere'            // C10:40 — estrategia superior e ortodoxia doutrinaria
  | 'epopte'             // C10:38 — supervisao macro-regional
  | 'afentis'            // C10:36 — Mestre Titular do Nucleo (Est. Art. 60)
  | 'thesi'              // C10:28 — supervisao senior da etapa auxiliar
  | 'syntrofo'           // C10:26 — escudo operacional das liderancas de base
  | 'embaixador'         // Est. Art. 16 — representacao protocolar
  | 'membro'
  | 'candidato';

/** Alcance sobre o qual as permissoes do cargo sao exercidas. */
export type Escopo = 'global' | 'pais' | 'estado' | 'nucleo' | 'proprio';

export interface Cargo {
  id: ID;
  codigo: CodigoCargo;
  nome: string;
  descricao: string;
  escopo: Escopo;
  /** Ordem hierarquica (1 = mais alto). Usada para exibicao e para impedir escalonamento. */
  precedencia: number;
  permissoes: Permissao[];
  /** Cargos internos nao podem ser removidos pelo administrador. */
  sistema: boolean;
}

/* ------------------------------------------------------------------ */
/* Categoria associativa e graus de formacao                           */
/* ------------------------------------------------------------------ */

/**
 * Categoria do quadro associativo — Est. Art. 14. E o vinculo juridico do
 * associado com a Ordem, independente do grau de formacao.
 */
export type CategoriaAssociativa =
  | 'transicao'
  | 'efetivo'
  | 'honorario'
  | 'benemerito'
  | 'juvenil';

/** Categoria do grau na escala ascetica — Codice C10:24, C10:26, C10:54. */
export type CategoriaGrau = 'formacao' | 'mediadora' | 'mestria';

/**
 * Grau de formacao — Codice C10:24 e seguintes.
 *
 * A escala e distinta da categoria associativa e do cargo: um mesmo membro e,
 * ao mesmo tempo, efetivo (categoria), Aretaios (grau) e eventualmente Kyrios
 * (titulo lateral). A elevacao se da pelo rito da Prokope (C10:19), nunca por
 * acumulo automatico de XP.
 */
export interface Grau {
  id: ID;
  codigo: string;
  nome: string;
  categoria: CategoriaGrau;
  /** Posicao na escala. A Mestria ocupa os graus 15 a 19 (C10:54). */
  ordem: number;
  descricao: string;
  /** XP sugerido para que a Mestria considere a elevacao. Nao promove sozinho. */
  xpSugerido: number;
}

/**
 * Titulos concedidos fora da progressao linear — Codice C10:49, C10:50.
 * `regalis`: clerigos ordenados associados. `kyrios`: conselheiros eleitos
 * pelas bases. Ambos dependem de aprovacao do Grao-Mestre.
 */
export type TituloLateral = 'regalis' | 'kyrios';

/* ------------------------------------------------------------------ */
/* Membros e contas                                                    */
/* ------------------------------------------------------------------ */

export type SituacaoMembresia = 'ativo' | 'pendente' | 'suspenso' | 'inativo' | 'desligado';
export type Sexo = 'feminino' | 'masculino' | 'outro' | 'nao_informado';

export interface PreferenciasPrivacidade {
  email: NivelVisibilidade;
  telefone: NivelVisibilidade;
  endereco: NivelVisibilidade;
  dataNascimento: NivelVisibilidade;
  perfil: NivelVisibilidade;
  publicacoes: NivelVisibilidade;
}

export type NivelVisibilidade = 'publico' | 'nucleo' | 'administracao' | 'privado';

export interface Membro {
  id: ID;
  numeroMembro: string;
  nomeCompleto: string;
  nomeExibicao: string;
  usuario: string;
  email: string;
  telefone: string;
  fotoUrl?: string;
  sexo: Sexo;
  dataNascimento: ISODate;
  endereco: Endereco;
  paisId: ID;
  estadoId: ID;
  municipioId: ID;
  nucleoId: ID | null;
  cargoId: ID;
  /** Est. Art. 14 — vinculo juridico, distinto do grau. */
  categoriaAssociativa: CategoriaAssociativa;
  /** Codice C10:24 — progressao ascetica, distinta do cargo. */
  grauId: ID;
  /** C10:49, C10:50 — titulos fora da progressao linear. */
  titulos: TituloLateral[];
  situacao: SituacaoMembresia;
  dataIngresso: ISODate;
  biografia?: string;
  interessesFilosoficos: string[];
  areasAtuacao: string[];
  xp: number;
  nivel: number;
  sequenciaDias: number;
  aliados: ID[];
  conquistas: ID[];
  privacidade: PreferenciasPrivacidade;
  autenticacaoDoisFatores: boolean;
  observacoesAdministrativas?: string;
  ultimoAcesso?: ISODate;
}

export interface Sessao {
  id: ID;
  membroId: ID;
  dispositivo: string;
  local: string;
  criadaEm: ISODate;
  atual: boolean;
}

/* ------------------------------------------------------------------ */
/* Nucleos                                                             */
/* ------------------------------------------------------------------ */

export type SituacaoNucleo = 'ativo' | 'em_formacao' | 'suspenso' | 'encerrado';

export interface Nucleo {
  id: ID;
  nome: string;
  codigo: string;
  paisId: ID;
  estadoId: ID;
  municipioId: ID;
  endereco: string;
  dataFundacao: ISODate;
  dirigenteId: ID | null;
  secretarioId: ID | null;
  tesoureiroId: ID | null;
  situacao: SituacaoNucleo;
  descricao: string;
  contatoEmail: string;
  contatoTelefone: string;
}

/* ------------------------------------------------------------------ */
/* Feed                                                                */
/* ------------------------------------------------------------------ */

export type CategoriaPublicacao =
  | 'comunicado'
  | 'formacao'
  | 'evento'
  | 'nucleo'
  | 'noticia'
  | 'membro';

export type TipoAnexo = 'imagem' | 'video' | 'documento' | 'link' | 'evento' | 'enquete';

export interface Anexo {
  tipo: TipoAnexo;
  titulo: string;
  url?: string;
  descricao?: string;
  tamanho?: string;
  duracao?: string;
  opcoes?: OpcaoEnquete[];
}

export interface OpcaoEnquete {
  id: ID;
  texto: string;
  votos: number;
}

export interface Publicacao {
  id: ID;
  autorId: ID;
  /** Publicacao institucional emitida em nome de um orgao da Ordem. */
  emitidoPor?: string;
  oficial: boolean;
  categoria: CategoriaPublicacao;
  nucleoId?: ID | null;
  titulo?: string;
  conteudo: string;
  anexos: Anexo[];
  criadoEm: ISODate;
  fixado: boolean;
  destaque: boolean;
  curtidas: ID[];
  salvoPor: ID[];
  compartilhamentos: number;
  visibilidade: NivelVisibilidade;
}

export interface Comentario {
  id: ID;
  publicacaoId: ID;
  autorId: ID;
  conteudo: string;
  criadoEm: ISODate;
  curtidas: ID[];
}

/* ------------------------------------------------------------------ */
/* Eventos e presenca                                                  */
/* ------------------------------------------------------------------ */

export type ModalidadeEvento = 'presencial' | 'online' | 'hibrido';
export type SituacaoInscricao = 'confirmado' | 'lista_espera' | 'cancelado';

export interface Evento {
  id: ID;
  titulo: string;
  descricao: string;
  imagemUrl?: string;
  inicio: ISODate;
  fim: ISODate;
  local: string;
  modalidade: ModalidadeEvento;
  responsavelId: ID;
  nucleoId: ID | null;
  limiteParticipantes: number | null;
  xpParticipacao: number;
  inscricoesAbertas: boolean;
}

export interface InscricaoEvento {
  id: ID;
  eventoId: ID;
  membroId: ID;
  situacao: SituacaoInscricao;
  inscritoEm: ISODate;
}

export interface RegistroPresenca {
  id: ID;
  eventoId: ID;
  membroId: ID;
  presente: boolean;
  registradoPor: ID;
  registradoEm: ISODate;
}

/* ------------------------------------------------------------------ */
/* Documentos                                                          */
/* ------------------------------------------------------------------ */

export type CategoriaDocumento =
  | 'estatuto'
  | 'regimento'
  | 'codigo'
  | 'codice'
  | 'regulamento'
  | 'manual'
  | 'formacao'
  | 'comunicado'
  | 'administrativo'
  | 'financeiro';

/**
 * Hierarquia normativa interna — Est. Art. 24. O Art. 25 declara nula a parte
 * da norma inferior que contrarie norma superior, por isso o nivel e dado
 * obrigatorio de todo documento normativo.
 */
export type NivelNormativo =
  | 'estatuto'              // 1
  | 'regimento_interno'     // 2
  | 'resolucao_geral'       // 3
  | 'ato_normativo_supremo' // 4
  | 'regulamento_geral_local' // 5
  | 'resolucao_local'       // 6
  | 'ato_mestral_local'     // 7
  | 'nao_normativo';        // material de apoio, sem forca normativa

export interface Documento {
  id: ID;
  titulo: string;
  descricao: string;
  categoria: CategoriaDocumento;
  /** Est. Art. 24 — posicao na hierarquia normativa. */
  nivelNormativo: NivelNormativo;
  /** Est. Art. 21, VI — informacao reservada exige sigilo. */
  reservado: boolean;
  responsavelId: ID;
  /** Cargo minimo (precedencia) exigido para leitura. */
  nivelAcesso: CodigoCargo[];
  versaoAtual: string;
  atualizadoEm: ISODate;
  arquivoUrl: string;
  tamanho: string;
}

export interface VersaoDocumento {
  id: ID;
  documentoId: ID;
  versao: string;
  notas: string;
  publicadoEm: ISODate;
  publicadoPor: ID;
}

/* ------------------------------------------------------------------ */
/* Formacao                                                            */
/* ------------------------------------------------------------------ */

export type TipoAula = 'texto' | 'video' | 'documento' | 'questionario';

export interface Curso {
  id: ID;
  titulo: string;
  descricao: string;
  trilha: string;
  cargaHoraria: number;
  responsavelId: ID;
  xpConclusao: number;
  emiteCertificado: boolean;
  capaCor: string;
}

export interface Modulo {
  id: ID;
  cursoId: ID;
  titulo: string;
  ordem: number;
}

export interface Aula {
  id: ID;
  moduloId: ID;
  titulo: string;
  tipo: TipoAula;
  duracao: string;
  ordem: number;
  conteudo: string;
}

export interface ProgressoAula {
  id: ID;
  membroId: ID;
  aulaId: ID;
  concluidaEm: ISODate;
}

/* ------------------------------------------------------------------ */
/* Propostas                                                           */
/* ------------------------------------------------------------------ */

export type SituacaoProposta =
  | 'recebida'
  | 'em_analise'
  | 'em_discussao'
  | 'aprovada'
  | 'rejeitada'
  | 'arquivada';

export interface Proposta {
  id: ID;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  autorId: ID;
  nucleoId: ID | null;
  situacao: SituacaoProposta;
  apoios: ID[];
  criadaEm: ISODate;
  atualizadaEm: ISODate;
  respostaAdministracao?: string;
  tramitacao: TramiteProposta[];
}

export interface TramiteProposta {
  situacao: SituacaoProposta;
  em: ISODate;
  porId: ID;
  nota?: string;
}

/* ------------------------------------------------------------------ */
/* Gamificacao                                                         */
/* ------------------------------------------------------------------ */

export type OrigemXP =
  | 'reuniao'
  | 'evento'
  | 'formacao'
  | 'debate'
  | 'publicacao'
  | 'nucleo'
  | 'projeto'
  | 'atividade'
  | 'ajuste_administrativo';

export interface RegraXP {
  id: ID;
  origem: OrigemXP;
  nome: string;
  descricao: string;
  pontos: number;
  ativa: boolean;
}

export interface TransacaoXP {
  id: ID;
  membroId: ID;
  origem: OrigemXP;
  descricao: string;
  pontos: number;
  registradoPor: ID | null;
  criadoEm: ISODate;
}

export interface Nivel {
  numero: number;
  titulo: string;
  xpMinimo: number;
}

export interface Conquista {
  id: ID;
  nome: string;
  descricao: string;
  icone: string;
  criterio: string;
}

/* ------------------------------------------------------------------ */
/* Comunicacao                                                         */
/* ------------------------------------------------------------------ */

export type TipoConversa = 'direta' | 'grupo' | 'nucleo' | 'oficial';

export interface Conversa {
  id: ID;
  tipo: TipoConversa;
  titulo: string;
  participantes: ID[];
  nucleoId?: ID | null;
  atualizadaEm: ISODate;
  fixada: boolean;
}

export interface Mensagem {
  id: ID;
  conversaId: ID;
  autorId: ID;
  conteudo: string;
  criadaEm: ISODate;
  lidaPor: ID[];
  anexo?: Anexo;
}

export type TipoNotificacao =
  | 'mensagem'
  | 'evento'
  | 'comunicado'
  | 'administrativo'
  | 'convite'
  | 'atividade'
  | 'cadastro'
  | 'xp';

export interface Notificacao {
  id: ID;
  membroId: ID;
  tipo: TipoNotificacao;
  titulo: string;
  descricao: string;
  criadaEm: ISODate;
  lida: boolean;
  destino?: string;
}

/* ------------------------------------------------------------------ */
/* Tesouraria                                                          */
/* ------------------------------------------------------------------ */

export type TipoLancamento = 'receita' | 'despesa';
export type SituacaoLancamento = 'previsto' | 'liquidado' | 'cancelado';

export interface ContaFinanceira {
  id: ID;
  nome: string;
  instituicao: string;
  saldoInicial: number;
  nucleoId: ID | null;
}

export interface CategoriaFinanceira {
  id: ID;
  nome: string;
  tipo: TipoLancamento;
  cor: string;
}

/**
 * Modalidades de contribuicao — Codice C106:11 a C106:19.
 *
 * `pistis`  — Pistis Eisphora, contribuicao de fidelidade: valor mensal
 *             fixado livremente pelo membro, recorrente.
 * `hekousia`— Hekousia Eisphora, contribuicao livre: aporte avulso, sem
 *             faixas nem tetos.
 *
 * C106:20 veda expressamente cobranca coercitiva, humilhacao publica ou
 * exposicao vexatoria em qualquer das modalidades — nao existe, portanto,
 * lista publica de inadimplentes nem classificacao por valor contribuido.
 */
export type ModalidadeContribuicao = 'pistis' | 'hekousia';

/** Compromisso de contribuicao recorrente (Pistis Eisphora). */
export interface Compromisso {
  id: ID;
  membroId: ID;
  valorMensal: number;
  inicioVigencia: ISODate;
  fimVigencia: ISODate | null;
  ativo: boolean;
}

export interface Lancamento {
  id: ID;
  tipo: TipoLancamento;
  /** Presente apenas quando o lancamento e contribuicao de membro. */
  modalidade?: ModalidadeContribuicao;
  /** Membro contribuinte, quando aplicavel. */
  contribuinteId?: ID | null;
  data: ISODate;
  descricao: string;
  categoriaId: ID;
  contaId: ID;
  valor: number;
  responsavelId: ID;
  nucleoId: ID | null;
  situacao: SituacaoLancamento;
  observacao?: string;
  comprovanteUrl?: string;
}

/* ------------------------------------------------------------------ */
/* Orgaos colegiados — Est. Arts. 23, 41, 43, 50, 54, 59               */
/* ------------------------------------------------------------------ */

export type CodigoOrgao =
  | 'assembleia_geral'          // Est. Art. 27 — orgao soberano
  | 'grao_mestre'               // Est. Art. 33 — unipessoal
  | 'diretoria_executiva'       // Est. Art. 41
  | 'conselho_alto'             // Est. Art. 44 — camara do Eclesia Supremo
  | 'conselho_baixo'            // Est. Art. 45 — camara do Eclesia Supremo
  | 'conselho_superior_etica'   // Est. Art. 50
  | 'conselho_superior_contas'  // Est. Art. 54
  | 'coordenadoria_local'       // Est. Art. 59, I
  | 'conselho_local_etica'      // Est. Art. 59, II
  | 'conselho_local_contas';    // Est. Art. 59, III

export type AmbitoOrgao = 'central' | 'local';

export interface Orgao {
  id: ID;
  codigo: CodigoOrgao;
  nome: string;
  descricao: string;
  ambito: AmbitoOrgao;
  /** Preenchido apenas em orgaos locais (Est. Art. 59). */
  nucleoId: ID | null;
  /** Est. Arts. 51 e 55 — os Conselhos Superiores tem de 3 a 7 membros. */
  minimoMembros: number | null;
  maximoMembros: number | null;
  /** Duracao do mandato em anos. 9 para o Grao-Mestre (Art. 34), 4 para os Conselhos. */
  mandatoAnos: number | null;
  competencias: string[];
  fundamento: string;
}

export interface Assento {
  id: ID;
  orgaoId: ID;
  membroId: ID;
  funcao: string;
  inicioMandato: ISODate;
  fimMandato: ISODate | null;
  ativo: boolean;
}

/* ------------------------------------------------------------------ */
/* Assembleias e deliberacoes — Est. Arts. 27 a 32, 62                 */
/* ------------------------------------------------------------------ */

export type SituacaoAssembleia =
  | 'convocada'
  | 'instalada'
  | 'encerrada'
  | 'cancelada';

/** Est. Art. 31 — o quorum de instalacao depende da convocacao aplicada. */
export type Convocacao = 'primeira' | 'segunda';

/**
 * Quorum de deliberacao.
 * `simples`      — maioria simples dos votos validos dos presentes (Art. 32).
 * `qualificado`  — 2/3, exigido nos Arts. 40, 48, 57, 67 e 68.
 */
export type QuorumDeliberacao = 'simples' | 'qualificado';

export type OpcaoVoto = 'favor' | 'contra' | 'abstencao';

export interface Assembleia {
  id: ID;
  titulo: string;
  descricao: string;
  orgaoId: ID;
  /** Est. Art. 29 — ordinaria ao menos uma vez por ano. */
  ordinaria: boolean;
  /** Est. Art. 30 — antecedencia minima de 15 dias. */
  convocadaEm: ISODate;
  inicio: ISODate;
  local: string;
  modalidade: ModalidadeEvento;
  convocacaoAplicada: Convocacao | null;
  situacao: SituacaoAssembleia;
  convocadaPorId: ID;
  /** Est. Art. 62 — registro das deliberacoes. */
  ata?: string;
}

export interface Materia {
  id: ID;
  assembleiaId: ID;
  ordem: number;
  titulo: string;
  descricao: string;
  quorum: QuorumDeliberacao;
  /** Artigo que fundamenta a exigencia de quorum qualificado, quando houver. */
  fundamento?: string;
  /** Proposta submetida a deliberacao, quando a materia vier das Propostas. */
  propostaId?: ID | null;
  encerrada: boolean;
}

/** Est. Art. 62 — votacao nominal, com identificacao do participante. */
export interface Voto {
  id: ID;
  materiaId: ID;
  membroId: ID;
  opcao: OpcaoVoto;
  registradoEm: ISODate;
}

export interface PresencaAssembleia {
  id: ID;
  assembleiaId: ID;
  membroId: ID;
  registradaEm: ISODate;
}

/* ------------------------------------------------------------------ */
/* Processo disciplinar — Est. Arts. 64 a 66 (CDEG)                    */
/* ------------------------------------------------------------------ */

export type FaseDisciplinar =
  | 'instaurado'
  | 'notificado'
  | 'defesa_apresentada'
  | 'em_instrucao'
  | 'relatorio'
  | 'decidido'
  | 'em_recurso'
  | 'arquivado';

export type DecisaoDisciplinar =
  | 'advertencia'
  | 'multa'
  | 'suspensao'
  | 'exclusao'
  | 'absolvicao';

export interface TramiteDisciplinar {
  fase: FaseDisciplinar;
  em: ISODate;
  porId: ID;
  nota?: string;
}

export interface ProcessoDisciplinar {
  id: ID;
  numero: string;
  acusadoId: ID;
  /** Est. Art. 66 — primeira instancia e o Nucleo filial. */
  instanciaOrgaoId: ID;
  fatos: string;
  fase: FaseDisciplinar;
  instauradoEm: ISODate;
  instauradoPorId: ID;
  notificadoEm: ISODate | null;
  /** Est. Art. 65, § 1.º — 3 dias contados da notificacao. */
  prazoDefesa: ISODate | null;
  /** Est. Art. 65, § 2.º — periodo de excecao acrescenta 30 dias. */
  periodoExcecao: boolean;
  defesa?: string;
  relatorio?: string;
  decisao?: DecisaoDisciplinar;
  valorMulta?: number;
  tramitacao: TramiteDisciplinar[];
}

/* ------------------------------------------------------------------ */
/* Atividades e auditoria                                              */
/* ------------------------------------------------------------------ */

export interface Atividade {
  id: ID;
  titulo: string;
  descricao: string;
  prazo: ISODate;
  membroId: ID;
  origem: OrigemXP;
  xp: number;
  concluida: boolean;
  destino?: string;
}

export interface RegistroAuditoria {
  id: ID;
  membroId: ID;
  acao: string;
  modulo: string;
  detalhe: string;
  em: ISODate;
  ip: string;
}

/* ------------------------------------------------------------------ */
/* Estado agregado                                                     */
/* ------------------------------------------------------------------ */

export interface BaseDados {
  paises: Pais[];
  estados: Estado[];
  municipios: Municipio[];
  cargos: Cargo[];
  graus: Grau[];
  orgaos: Orgao[];
  assentos: Assento[];
  assembleias: Assembleia[];
  materias: Materia[];
  votos: Voto[];
  presencasAssembleia: PresencaAssembleia[];
  processos: ProcessoDisciplinar[];
  membros: Membro[];
  nucleos: Nucleo[];
  publicacoes: Publicacao[];
  comentarios: Comentario[];
  eventos: Evento[];
  inscricoes: InscricaoEvento[];
  presencas: RegistroPresenca[];
  documentos: Documento[];
  versoesDocumento: VersaoDocumento[];
  cursos: Curso[];
  modulos: Modulo[];
  aulas: Aula[];
  progressoAulas: ProgressoAula[];
  propostas: Proposta[];
  regrasXP: RegraXP[];
  transacoesXP: TransacaoXP[];
  niveis: Nivel[];
  conquistas: Conquista[];
  conversas: Conversa[];
  mensagens: Mensagem[];
  notificacoes: Notificacao[];
  contas: ContaFinanceira[];
  compromissos: Compromisso[];
  categoriasFinanceiras: CategoriaFinanceira[];
  lancamentos: Lancamento[];
  atividades: Atividade[];
  auditoria: RegistroAuditoria[];
  sessoes: Sessao[];
}
