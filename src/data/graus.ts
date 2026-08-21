import type { CategoriaAssociativa, Grau } from '@/types';

/**
 * Escala de graus da Ordem — Códice Verde, C10:24 a C10:54.
 *
 * A progressão é ascética, não administrativa: a elevação se dá pelo rito da
 * Prokopē (C10:19) e, na categoria Mediadora, exige aprovação de ao menos um
 * Afentis (C10:28). O XP indicado em `xpSugerido` apenas sinaliza à Mestria que
 * o confrade reúne participação para ser considerado — o sistema jamais promove
 * por acúmulo de pontos.
 *
 * C10:46: homens e mulheres têm igual acesso a todos os graus, do Recruta ao
 * Grão-Mestre. Nenhuma regra desta escala pode depender de sexo.
 *
 * C10:19 ressalva que a arquitetura é adaptável por cada irmandade, desde que
 * preservada a lógica hierárquica; a numeração abaixo segue a referência do
 * Códice, que situa a Mestria nos graus 15 a 19 (C10:54).
 */
export const GRAUS: Grau[] = [
  // Categoria Formação — C10:24
  {
    id: 'grau-recruta',
    codigo: 'recruta',
    nome: 'Recruta',
    categoria: 'formacao',
    ordem: 1,
    descricao: 'Ingressante acolhido pelo rito da Oikeiōsis, em reconhecimento inicial da irmandade.',
    xpSugerido: 0,
  },
  {
    id: 'grau-anchario',
    codigo: 'anchario',
    nome: 'Anchário',
    categoria: 'formacao',
    ordem: 2,
    descricao: 'Primeira firmeza na disciplina fraterna e no trato com os deveres do Códice.',
    xpSugerido: 400,
  },
  {
    id: 'grau-mathetes',
    codigo: 'mathetes',
    nome: 'Mathētēs',
    categoria: 'formacao',
    ordem: 3,
    descricao: 'O discípulo. Dedica-se ao estudo sistemático da Filosofia Perene no Spíti.',
    xpSugerido: 1000,
  },
  {
    id: 'grau-prokopos',
    codigo: 'prokopos',
    nome: 'Prókopos',
    categoria: 'formacao',
    ordem: 4,
    descricao: 'Aquele que progride. Demonstra domínio crescente sobre os próprios impulsos.',
    xpSugerido: 1800,
  },
  {
    id: 'grau-aretaios',
    codigo: 'aretaios',
    nome: 'Aretáios',
    categoria: 'formacao',
    ordem: 5,
    descricao:
      'Avanço na reestruturação da alma e aquisição do caráter firme exigido nas fileiras (C10:23).',
    xpSugerido: 2800,
  },
  {
    id: 'grau-empeiros',
    codigo: 'empeiros',
    nome: 'Empeiros',
    categoria: 'formacao',
    ordem: 6,
    descricao: 'O experimentado. Encerra a base formativa e habilita-se à categoria mediadora.',
    xpSugerido: 4000,
  },

  // Categoria Mediadora — C10:26 a C10:29
  {
    id: 'grau-syntrofo',
    codigo: 'syntrofo',
    nome: 'Syntrofo',
    categoria: 'mediadora',
    ordem: 10,
    descricao:
      'O Companheiro. Escudo operacional das lideranças de base; gere a logística da Symphyle (C10:26).',
    xpSugerido: 5500,
  },
  {
    id: 'grau-thesi',
    codigo: 'thesi',
    nome: 'Thési',
    categoria: 'mediadora',
    ordem: 12,
    descricao:
      'A Posição. Sentinela veterano que estabiliza o Núcleo; sua elevação exige aprovação de um Afentis (C10:28).',
    xpSugerido: 7500,
  },

  // Categoria Mestria — graus 15 a 19 (C10:54)
  {
    id: 'grau-afentis',
    codigo: 'afentis',
    nome: 'Afentis',
    categoria: 'mestria',
    ordem: 15,
    descricao:
      'Primeira face da autoridade madura de proximidade; transforma os princípios do Códice em conduta tangível (C10:36).',
    xpSugerido: 9500,
  },
  {
    id: 'grau-epopte',
    codigo: 'epopte',
    nome: 'Epopte',
    categoria: 'mestria',
    ordem: 16,
    descricao:
      'Supervisão macro-regional; baluarte da ortodoxia territorial. Ascensão validada pelo Moderador ou pelo Grão-Mestre (C10:38).',
    xpSugerido: 12000,
  },
  {
    id: 'grau-auguere',
    codigo: 'auguere',
    nome: 'Auguere',
    categoria: 'mestria',
    ordem: 17,
    descricao:
      'Mestre da estratégia superior e da erudição; corrige desvios doutrinários nos documentos da Ordem (C10:40).',
    xpSugerido: 15000,
  },
  {
    id: 'grau-moderador',
    codigo: 'moderador',
    nome: 'Moderador',
    categoria: 'mestria',
    ordem: 18,
    descricao:
      'Autoridade doutrinária máxima em âmbito estadual ou nacional; última instância interpretativa abaixo da presidência (C10:42).',
    xpSugerido: 19000,
  },
  {
    id: 'grau-grao-mestre',
    codigo: 'grao_mestre',
    nome: 'Grão-Mestre',
    categoria: 'mestria',
    ordem: 19,
    descricao:
      'Autoridade máxima, soberana e vitalícia; ponto de união de todos os graus e intérprete final da doutrina (C10:44).',
    xpSugerido: 24000,
  },
];

export const ROTULO_CATEGORIA_GRAU: Record<Grau['categoria'], string> = {
  formacao: 'Formação',
  mediadora: 'Mediadora',
  mestria: 'Mestria',
};

/** Categorias do quadro associativo — Est. Art. 14. */
export const ROTULO_CATEGORIA_ASSOCIATIVA: Record<CategoriaAssociativa, string> = {
  transicao: 'Membro em transição',
  efetivo: 'Membro efetivo',
  honorario: 'Membro honorário',
  benemerito: 'Membro benemérito',
  juvenil: 'Membro juvenil',
};

export const DESCRICAO_CATEGORIA_ASSOCIATIVA: Record<CategoriaAssociativa, string> = {
  transicao: 'Admitido e em período de integração à vida da Ordem.',
  efetivo: 'Associado pleno, com direito a votar e ser votado quando habilitado (Est. Art. 20, II).',
  honorario: 'Distinguido por relevantes serviços prestados à Ordem.',
  benemerito: 'Reconhecido por contribuição material ou moral de especial relevo.',
  juvenil: 'Associado menor de idade, sob a legislação protetiva aplicável (Est. Art. 19).',
};

/**
 * Títulos concedidos fora da progressão linear — C10:47 a C10:51.
 * A outorga depende de aprovação soberana do Grão-Mestre.
 */
export const ROTULO_TITULO: Record<'regalis' | 'kyrios', string> = {
  regalis: 'Regalis',
  kyrios: 'Kyrios',
};

export const DESCRICAO_TITULO: Record<'regalis' | 'kyrios', string> = {
  regalis:
    'Dignidade honorífica conferida a clérigos ordenados associados, como conselheiros da dignidade espiritual (C10:48).',
  kyrios:
    'Conselheiro eleito pelas bases para representar os pequenos pelotões nos conselhos superiores (C10:50).',
};

/** Grau correspondente a um saldo de XP — apenas sugestão à Mestria. */
export function grauSugerido(graus: Grau[], xp: number): Grau {
  const ordenados = [...graus].sort((a, b) => a.xpSugerido - b.xpSugerido);
  let atual = ordenados[0];
  for (const g of ordenados) if (xp >= g.xpSugerido) atual = g;
  return atual;
}

/**
 * O membro reúne participação para ser considerado à elevação?
 * A decisão continua sendo da Mestria, pelo rito da Prokopē.
 */
export function apto(graus: Grau[], grauAtual: Grau, xp: number): boolean {
  const proximo = [...graus].sort((a, b) => a.ordem - b.ordem).find((g) => g.ordem > grauAtual.ordem);
  return proximo ? xp >= proximo.xpSugerido : false;
}
