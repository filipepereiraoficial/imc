import type {
  Assembleia,
  Convocacao,
  ID,
  Materia,
  Membro,
  QuorumDeliberacao,
  Voto,
} from '@/types';

/**
 * Regras de convocação, quórum e apuração — Estatuto Social, Arts. 27 a 32.
 *
 * Funções puras: recebem o estado e devolvem o resultado, sem tocar em React
 * nem no armazenamento. É a mesma camada que um servidor reaproveitaria para
 * validar a deliberação do lado dele.
 */

/** Est. Art. 30 — antecedência mínima de 15 dias, salvo urgência justificada. */
export const DIAS_ANTECEDENCIA_CONVOCACAO = 15;

/** Est. Art. 65, § 1.º — prazo de defesa no processo disciplinar. */
export const DIAS_DEFESA_DISCIPLINAR = 3;

/** Est. Art. 65, § 2.º — acréscimo no período de exceção. */
export const DIAS_PERIODO_EXCECAO = 30;

const DIA_MS = 24 * 60 * 60 * 1000;

export function diasEntre(inicio: string, fim: string): number {
  return Math.floor((new Date(fim).getTime() - new Date(inicio).getTime()) / DIA_MS);
}

export interface ConferenciaConvocacao {
  regular: boolean;
  diasDeAntecedencia: number;
  mensagem: string;
}

/**
 * A convocação respeitou a antecedência do Art. 30?
 *
 * O Estatuto ressalva a urgência devidamente justificada, de modo que a
 * antecedência insuficiente não impede a assembleia — exige justificativa
 * registrada em ata.
 */
export function conferirConvocacao(assembleia: Assembleia): ConferenciaConvocacao {
  const dias = diasEntre(assembleia.convocadaEm, assembleia.inicio);
  const regular = dias >= DIAS_ANTECEDENCIA_CONVOCACAO;
  return {
    regular,
    diasDeAntecedencia: dias,
    mensagem: regular
      ? `Convocada com ${dias} dias de antecedência, na forma do Art. 30.`
      : `Convocada com ${dias} ${dias === 1 ? 'dia' : 'dias'} de antecedência. O Art. 30 exige ${DIAS_ANTECEDENCIA_CONVOCACAO}, salvo urgência devidamente justificada em ata.`,
  };
}

/** Membros com direito a voto — Est. Arts. 20, II e 27. */
export function votantes(membros: Membro[]): Membro[] {
  return membros.filter(
    (m) => m.situacao === 'ativo' && m.categoriaAssociativa !== 'juvenil' && m.cargoId !== 'cargo-candidato',
  );
}

export interface Quorum {
  presentes: number;
  aptos: number;
  exigido: number;
  atingido: number;
  instalavel: boolean;
}

/**
 * Est. Art. 31 — em primeira convocação exige maioria absoluta dos associados
 * com direito a voto; em segunda, qualquer número.
 */
export function quorumInstalacao(
  presentes: number,
  aptos: number,
  convocacao: Convocacao,
): Quorum {
  const exigido = convocacao === 'primeira' ? Math.floor(aptos / 2) + 1 : 1;
  return {
    presentes,
    aptos,
    exigido,
    atingido: aptos > 0 ? presentes / aptos : 0,
    instalavel: presentes >= exigido,
  };
}

export interface Apuracao {
  favor: number;
  contra: number;
  abstencao: number;
  /** Est. Art. 32 — a apuração incide sobre os votos válidos. */
  validos: number;
  total: number;
  exigidos: number;
  aprovada: boolean;
  quorum: QuorumDeliberacao;
}

/**
 * Apura uma matéria.
 *
 * Est. Art. 32: maioria simples dos votos válidos dos presentes, salvo quórum
 * qualificado. A abstenção não é voto válido — conta na presença, não no
 * cálculo. Nas matérias de 2/3 (Arts. 40, 48, 57, 67 e 68) o divisor continua
 * sendo o total de votos válidos.
 */
export function apurar(materia: Materia, votos: Voto[]): Apuracao {
  const daMateria = votos.filter((v) => v.materiaId === materia.id);
  const favor = daMateria.filter((v) => v.opcao === 'favor').length;
  const contra = daMateria.filter((v) => v.opcao === 'contra').length;
  const abstencao = daMateria.filter((v) => v.opcao === 'abstencao').length;
  const validos = favor + contra;

  const exigidos =
    materia.quorum === 'qualificado'
      ? Math.ceil((validos * 2) / 3)
      : Math.floor(validos / 2) + 1;

  return {
    favor,
    contra,
    abstencao,
    validos,
    total: daMateria.length,
    exigidos,
    aprovada: validos > 0 && favor >= exigidos,
    quorum: materia.quorum,
  };
}

export function jaVotou(votos: Voto[], materiaId: ID, membroId: ID): Voto | undefined {
  return votos.find((v) => v.materiaId === materiaId && v.membroId === membroId);
}

/**
 * Matérias que o Estatuto reserva a quórum de 2/3.
 * Usado para pré-selecionar o quórum ao pautar uma matéria.
 */
export const MATERIAS_QUALIFICADAS: { rotulo: string; fundamento: string }[] = [
  { rotulo: 'Destituição do Moderador Presidente', fundamento: 'Est. Art. 40, III' },
  { rotulo: 'Derrubada de veto do Grão-Mestre', fundamento: 'Est. Art. 48' },
  {
    rotulo: 'Destituição de conselheiro dos Conselhos Superiores',
    fundamento: 'Est. Art. 57',
  },
  { rotulo: 'Reforma estatutária', fundamento: 'Est. Art. 67' },
  { rotulo: 'Dissolução da Ordem', fundamento: 'Est. Art. 68' },
  {
    rotulo: 'Anulação de Ato Normativo Supremo sobre sucessão',
    fundamento: 'Est. Art. 39, § 2.º',
  },
];

/** Est. Art. 28 — competências privativas da Assembleia Geral. */
export const COMPETENCIAS_ASSEMBLEIA: string[] = [
  'Eleger e destituir administradores, observados o contraditório e a ampla defesa',
  'Apreciar o relatório da administração e deliberar sobre as contas da Diretoria Executiva',
  'Aprovar o orçamento anual e o plano de trabalho',
  'Deliberar sobre a continuidade do Grão-Mestre',
  'Eleger ou destituir membros do Conselho Superior de Contas e do Conselho Superior de Ética',
  'Deliberar sobre alienação, oneração ou gravação de bens imóveis',
  'Deliberar sobre reforma estatutária',
  'Deliberar sobre dissolução da Ordem',
  'Aprovar a política geral de remuneração, quando houver',
  'Decidir sobre os demais assuntos que o Estatuto lhe reservar',
];

/** Prazo de defesa a partir da notificação — Est. Art. 65, § 1.º e § 2.º. */
export function prazoDefesa(notificadoEm: string, periodoExcecao: boolean): string {
  const dias = DIAS_DEFESA_DISCIPLINAR + (periodoExcecao ? DIAS_PERIODO_EXCECAO : 0);
  return new Date(new Date(notificadoEm).getTime() + dias * DIA_MS).toISOString();
}

export function prazoVencido(prazo: string | null, referencia = new Date()): boolean {
  if (!prazo) return false;
  return referencia.getTime() > new Date(prazo).getTime();
}
