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

export type CodigoCargo =
  | 'administrador'
  | 'presidente'
  | 'vice_presidente'
  | 'secretario'
  | 'tesoureiro'
  | 'dirigente_nucleo'
  | 'coordenador'
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

export interface Documento {
  id: ID;
  titulo: string;
  descricao: string;
  categoria: CategoriaDocumento;
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

export interface Lancamento {
  id: ID;
  tipo: TipoLancamento;
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
  categoriasFinanceiras: CategoriaFinanceira[];
  lancamentos: Lancamento[];
  atividades: Atividade[];
  auditoria: RegistroAuditoria[];
  sessoes: Sessao[];
}
