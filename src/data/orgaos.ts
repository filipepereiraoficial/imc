import type { Orgao } from '@/types';

/**
 * Órgãos da Ordem — Estatuto Social, Arts. 23 (centrais) e 59 (locais).
 *
 * As competências reproduzem o texto estatutário. Os limites de composição e a
 * duração de mandato são validados pelo sistema ao lotar assentos: os Conselhos
 * Superiores têm de 3 a 7 membros (Arts. 51 e 55) e mandato de 4 anos; o
 * Grão-Mestre, 9 anos (Art. 34).
 */
export const ORGAOS_CENTRAIS: Orgao[] = [
  {
    id: 'org-assembleia',
    codigo: 'assembleia_geral',
    nome: 'Assembleia Geral',
    descricao:
      'Órgão soberano de deliberação, integrado pelos associados com direito a voto. Reúne-se ordinariamente ao menos uma vez por ano.',
    ambito: 'central',
    nucleoId: null,
    minimoMembros: null,
    maximoMembros: null,
    mandatoAnos: null,
    competencias: [
      'Eleger e destituir administradores, observados o contraditório e a ampla defesa',
      'Apreciar o relatório da administração e deliberar sobre as contas da Diretoria Executiva',
      'Aprovar o orçamento anual e o plano de trabalho',
      'Deliberar sobre a continuidade do Grão-Mestre',
      'Eleger ou destituir membros dos Conselhos Superiores de Contas e de Ética',
      'Deliberar sobre alienação, oneração ou gravação de bens imóveis',
      'Deliberar sobre reforma estatutária',
      'Deliberar sobre dissolução da Ordem',
      'Aprovar a política geral de remuneração, quando houver',
    ],
    fundamento: 'Est. Arts. 27 a 32',
  },
  {
    id: 'org-grao-mestre',
    codigo: 'grao_mestre',
    nome: 'Moderador Presidente (Grão-Mestre)',
    descricao:
      'Dirigente máximo, representante legal, guardião da unidade institucional e autoridade executiva superior. Mandato de nove anos, admitida recondução.',
    ambito: 'central',
    nucleoId: null,
    minimoMembros: 1,
    maximoMembros: 1,
    mandatoAnos: 9,
    competencias: [
      'Representar a Ordem ativa e passivamente, judicial e extrajudicialmente',
      'Convocar e presidir as sessões do Conselho Eclesia Supremo',
      'Sancionar ou vetar Resoluções Gerais e demais atos internos',
      'Nomear e exonerar dirigentes, coordenadores e responsáveis departamentais',
      'Assinar, em conjunto com o Chanceler, contratos e instrumentos jurídicos relevantes',
      'Expedir Atos Normativos Supremos de caráter geral',
      'Firmar acordos, parcerias e termos de cooperação',
    ],
    fundamento: 'Est. Arts. 33 a 40',
  },
  {
    id: 'org-diretoria',
    codigo: 'diretoria_executiva',
    nome: 'Diretoria Executiva',
    descricao:
      'Órgão colegiado de administração ordinária, composto no mínimo pelo Chanceler, pelo Secretário-Geral e pelo Tesoureiro-Geral.',
    ambito: 'central',
    nucleoId: null,
    minimoMembros: 3,
    maximoMembros: null,
    mandatoAnos: 4,
    competencias: [
      'Conduzir a administração ordinária da Ordem',
      'Analisar os requerimentos de admissão de associados',
      'Elaborar a prestação anual de contas e o relatório de gestão',
    ],
    fundamento: 'Est. Arts. 41 e 42',
  },
  {
    id: 'org-conselho-alto',
    codigo: 'conselho_alto',
    nome: 'Conselho Alto',
    descricao:
      'Câmara do Conselho Eclesia Supremo composta pelos membros da Mestria ou por conselheiros de alta confiança institucional.',
    ambito: 'central',
    nucleoId: null,
    minimoMembros: 3,
    maximoMembros: null,
    mandatoAnos: 4,
    competencias: [
      'Apreciar, deliberar e aprovar Resoluções Gerais',
      'Apreciar vetos do Grão-Mestre',
      'Sabatinar o Epígonos Honorário para investidura como Epígonos Permanente',
      'Aprovar a indicação dos membros do Conselho Superior de Ética',
    ],
    fundamento: 'Est. Arts. 43, 44 e 46',
  },
  {
    id: 'org-conselho-baixo',
    codigo: 'conselho_baixo',
    nome: 'Conselho Baixo',
    descricao:
      'Câmara do Conselho Eclesia Supremo composta por representantes eleitos ou indicados, portadores do título de Kyrios.',
    ambito: 'central',
    nucleoId: null,
    minimoMembros: 3,
    maximoMembros: null,
    mandatoAnos: 4,
    competencias: [
      'Apreciar, deliberar e aprovar Resoluções Gerais',
      'Apreciar vetos do Grão-Mestre',
      'Aprovar a indicação dos membros do Conselho Superior de Contas',
      'Representar os pequenos pelotões perante os conselhos superiores',
    ],
    fundamento: 'Est. Arts. 43, 45 e 46',
  },
  {
    id: 'org-etica',
    codigo: 'conselho_superior_etica',
    nome: 'Conselho Superior de Ética',
    descricao:
      'Órgão colegiado de independência funcional, destinado ao julgamento ético-disciplinar e à interpretação oficial das normas internas. É vedado a seus membros ocupar cargo na Diretoria Executiva ou em coordenadoria local.',
    ambito: 'central',
    nucleoId: null,
    minimoMembros: 3,
    maximoMembros: 7,
    mandatoAnos: 4,
    competencias: [
      'Julgar condutas e infrações de membros e dirigentes',
      'Emitir pareceres e recomendar providências',
      'Atuar como intérprete oficial das normas internas',
      'Analisar a compatibilidade das normas internas com o Estatuto',
      'Instruir o processo de destituição do Moderador Presidente',
    ],
    fundamento: 'Est. Arts. 50 a 53',
  },
  {
    id: 'org-contas',
    codigo: 'conselho_superior_contas',
    nome: 'Conselho Superior de Contas',
    descricao:
      'Órgão colegiado de fiscalização econômico-financeira, patrimonial e contábil da Ordem.',
    ambito: 'central',
    nucleoId: null,
    minimoMembros: 3,
    maximoMembros: 7,
    mandatoAnos: 4,
    competencias: [
      'Fiscalizar receitas, despesas, patrimônio e execução orçamentária',
      'Examinar livros e documentos contábeis',
      'Emitir pareceres sobre a prestação de contas',
      'Requisitar documentos necessários ao exercício da fiscalização',
    ],
    fundamento: 'Est. Arts. 54 a 56',
  },
];

/** Est. Art. 59 — cada Núcleo deve possuir, no mínimo, estes três órgãos. */
export const ORGAOS_OBRIGATORIOS_LOCAIS: {
  codigo: Orgao['codigo'];
  nome: string;
  descricao: string;
  competencias: string[];
}[] = [
  {
    codigo: 'coordenadoria_local',
    nome: 'Coordenadoria de Gestão Local',
    descricao:
      'Administra a unidade local, executa as deliberações superiores e representa o Núcleo perante os membros.',
    competencias: [
      'Executar as deliberações dos órgãos centrais',
      'Administrar as atividades e o expediente do Núcleo',
      'Representar o Núcleo perante os membros',
    ],
  },
  {
    codigo: 'conselho_local_etica',
    nome: 'Conselho Local de Ética',
    descricao:
      'Julga em primeira instância as infrações cometidas por associados vinculados ao Núcleo.',
    competencias: [
      'Julgar em primeira instância as infrações do Núcleo (Est. Art. 66)',
      'Instruir o processo disciplinar com ampla defesa',
      'Encaminhar recurso aos órgãos gerais competentes',
    ],
  },
  {
    codigo: 'conselho_local_contas',
    nome: 'Conselho Local de Contas',
    descricao: 'Fiscaliza a arrecadação e a aplicação dos recursos do Núcleo.',
    competencias: [
      'Fiscalizar a arrecadação local',
      'Examinar a aplicação dos recursos do Núcleo',
      'Emitir parecer sobre a prestação de contas local',
    ],
  },
];

export const ROTULO_ORGAO: Record<Orgao['codigo'], string> = {
  assembleia_geral: 'Assembleia Geral',
  grao_mestre: 'Moderador Presidente',
  diretoria_executiva: 'Diretoria Executiva',
  conselho_alto: 'Conselho Alto',
  conselho_baixo: 'Conselho Baixo',
  conselho_superior_etica: 'Conselho Superior de Ética',
  conselho_superior_contas: 'Conselho Superior de Contas',
  coordenadoria_local: 'Coordenadoria de Gestão Local',
  conselho_local_etica: 'Conselho Local de Ética',
  conselho_local_contas: 'Conselho Local de Contas',
};

/**
 * Conformidade de composição de um órgão.
 *
 * Est. Arts. 51 e 55 fixam o intervalo dos Conselhos Superiores; o Art. 52
 * veda o acúmulo com a Diretoria Executiva ou com coordenadoria local.
 */
export interface Conformidade {
  regular: boolean;
  ocupados: number;
  mensagem: string;
}

export function conferirComposicao(orgao: Orgao, ocupados: number): Conformidade {
  if (orgao.minimoMembros !== null && ocupados < orgao.minimoMembros) {
    return {
      regular: false,
      ocupados,
      mensagem: `Composição incompleta: ${ocupados} de no mínimo ${orgao.minimoMembros} (${orgao.fundamento}).`,
    };
  }
  if (orgao.maximoMembros !== null && ocupados > orgao.maximoMembros) {
    return {
      regular: false,
      ocupados,
      mensagem: `Composição excedida: ${ocupados} para um máximo de ${orgao.maximoMembros} (${orgao.fundamento}).`,
    };
  }
  return {
    regular: true,
    ocupados,
    mensagem:
      orgao.minimoMembros === null
        ? `${ocupados} assentos ocupados.`
        : `${ocupados} assentos ocupados, dentro do previsto (${orgao.fundamento}).`,
  };
}

/** Est. Art. 52 — vedação de acúmulo para o Conselho Superior de Ética. */
export const ORGAOS_INCOMPATIVEIS_COM_ETICA: Orgao['codigo'][] = [
  'diretoria_executiva',
  'coordenadoria_local',
];
