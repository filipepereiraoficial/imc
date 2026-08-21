import type { EsferaCelula, TipoRito } from '@/types';

/**
 * Ritos institucionais — Códice Verde.
 *
 * Cada rito tem efeito registral na vida do membro: sela um ingresso, uma
 * elevação, uma aliança ou uma saída. É por isso que ficam no histórico, e não
 * apenas na agenda.
 */
export interface DefinicaoRito {
  tipo: TipoRito;
  nome: string;
  descricao: string;
  icone: string;
  fundamento: string;
  /** Quem preside, por exigência do Códice. */
  presidencia: string;
}

export const RITOS: DefinicaoRito[] = [
  {
    tipo: 'oikeiosis',
    nome: 'Oikeiōsis',
    descricao:
      'Rito de Integração. Sela o despertar da consciência moral: o postulante reconhece a irmandade como a nobre expansão de seu próprio lar. Não é concessão de matrícula, mas acolhimento.',
    icone: 'handshake',
    fundamento: 'C10:7, C10:25, C103:2',
    presidencia: 'Autoridade da Mestria (C10:35)',
  },
  {
    tipo: 'prokope',
    nome: 'Prokopē',
    descricao:
      'Rito de Graduação. Coroa o progresso ascético da alma e atesta que o confrade domou suas paixões, habilitando-o a ascender na estrutura funcional.',
    icone: 'stairs',
    fundamento: 'C10:19, C10:14, C103:4',
    presidencia: 'Autoridade da Mestria (C10:35)',
  },
  {
    tipo: 'syzygia',
    nome: 'Syzygia',
    descricao:
      'Reconhecimento Matrimonial. Cerimônia interna e não sacramental em que a Alta Mestria acolhe a aliança conjugal do membro, fortalecendo o Jugo Partilhado.',
    icone: 'diversity_1',
    fundamento: 'C15:21, C15:23, C61:3',
    presidencia: 'Alta Mestria',
  },
  {
    tipo: 'reconhecimento',
    nome: 'Ato de Reconhecimento do Reinado do Rei Divino',
    descricao:
      'Ato de natureza civil, confessional e pedagógica — nunca sacramental — destinado a afirmar que toda autoridade legítima se submete à Lei Natural e à verdade moral.',
    icone: 'church',
    fundamento: 'C102:1, C102:2',
    presidencia: 'Grão-Mestre ou Moderador',
  },
  {
    tipo: 'syssitia',
    nome: 'Syssitia',
    descricao:
      'Ágape fraterno. Repasto comunitário partilhado pelas famílias, pedagogia milenar de dissolver o egoísmo atomizado e amalgamar a confiança entre os irmãos.',
    icone: 'restaurant',
    fundamento: 'C11:1, C11:2',
    presidencia: 'Afentis ou Syntrofo',
  },
  {
    tipo: 'desobrigacao',
    nome: 'Desobrigação Voluntária',
    descricao:
      'Recolhimento Fraterno Pacífico. Rito honroso de interrupção do apostolado ativo, com devolução de encargos e voto de sigilo perpétuo, isento de coerção.',
    icone: 'waving_hand',
    fundamento: 'C10:61 a C10:64',
    presidencia: 'Mestria local que acolheu o confrade',
  },
];

export const ROTULO_RITO: Record<TipoRito, string> = Object.fromEntries(
  RITOS.map((r) => [r.tipo, r.nome]),
) as Record<TipoRito, string>;

export function definicaoRito(tipo: TipoRito): DefinicaoRito {
  return RITOS.find((r) => r.tipo === tipo) ?? RITOS[0];
}

/**
 * Bestiário heráldico — Códice, capítulo 11.
 *
 * O Spíti (Cidadela Interior) e a Symphyle (falange ativa) têm cortes
 * alegóricas próprias: felinos para a ascese e o discernimento, aves para a
 * ação e a caridade. Servem de emblema às células do Núcleo.
 */
export const BESTIARIO: Record<EsferaCelula, { nome: string; simboliza: string }[]> = {
  spiti: [
    { nome: 'Leão', simboliza: 'Coragem e realeza interior; guarda as portas do Spíti' },
    { nome: 'Leopardo', simboliza: 'Prudência e cálculo cirúrgico dos passos' },
    { nome: 'Lince', simboliza: 'Contemplação; rasga o véu das ilusões ideológicas' },
    { nome: 'Tigre', simboliza: 'Força da vontade estoica sob o comando da razão' },
    { nome: 'Onça-pintada', simboliza: 'Discernimento agudo e conhecimento das raízes' },
    { nome: 'Guepardo', simboliza: 'Clareza de propósito e justiça retributiva' },
    { nome: 'Puma', simboliza: 'Adaptabilidade serena perante as tempestades' },
  ],
  symphyle: [
    { nome: 'Águia', simboliza: 'Visão de longo alcance; emblema primário da Symphyle' },
    { nome: 'Pelicano', simboliza: 'Sacrifício e compaixão filantrópica extrema' },
    { nome: 'Cisne', simboliza: 'Dignidade imaculada e discrição na caridade' },
    { nome: 'Corvo', simboliza: 'Inteligência tática e astúcia logística' },
    { nome: 'Falcão-peregrino', simboliza: 'Velocidade de ação e decisão' },
    { nome: 'Gavião-real', simboliza: 'Autoridade territorial e soberania civil local' },
    { nome: 'Grou', simboliza: 'Vigilância noturna e fidelidade protocolar' },
  ],
};

export const DESCRICAO_ESFERA: Record<EsferaCelula, { nome: string; vocacao: string; fundamento: string }> = {
  spiti: {
    nome: 'Spíti',
    vocacao:
      'A Cidadela Interior. Casa do recolhimento reflexivo: meditação, artes liberais, forja da mente estoica e formulação do Direito Público contra o ruído do século.',
    fundamento: 'C1:2, C1:13, C1:14',
  },
  symphyle: {
    nome: 'Symphyle',
    vocacao:
      'A falange ativa e o braço operativo exterior. Consagra-se à insurgência cultural e à caridade estrutural, com autonomia administrativa e fundos próprios de auxílio mútuo.',
    fundamento: 'C1:2, C11:1, C11:5, C10:66',
  },
};

/** Competências ofertadas ao serviço honorífico — Leitourgia (C107:18). */
export const COMPETENCIAS_LEITOURGIA = [
  'Direito',
  'Saúde',
  'Engenharia',
  'Contabilidade',
  'Educação',
  'Comunicação',
  'Tecnologia',
  'Logística',
  'Construção civil',
  'Tradução',
  'Psicologia',
  'Assistência social',
];
