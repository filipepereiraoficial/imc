import type { Permissao } from '@/types';

export interface ItemNav {
  rotulo: string;
  para: string;
  icone: string;
  /** Exige ao menos uma destas permissoes. Ausente = livre a qualquer membro. */
  permissoes?: Permissao[];
  /** Chave do contador de pendencias exibido ao lado do item. */
  contador?: 'notificacoes' | 'mensagens' | 'cadastros';
}

export interface GrupoNav {
  titulo: string;
  itens: ItemNav[];
}

/** Menu principal — visivel a todo membro autenticado. */
export const NAV_PRINCIPAL: ItemNav[] = [
  { rotulo: 'Início', para: '/hoje', icone: 'home' },
  { rotulo: 'Feed', para: '/feed', icone: 'article' },
  { rotulo: 'Propostas', para: '/propostas', icone: 'gavel' },
  { rotulo: 'Ranking', para: '/ranking', icone: 'leaderboard' },
  { rotulo: 'Eventos', para: '/eventos', icone: 'event' },
  { rotulo: 'Formação', para: '/formacao', icone: 'school' },
  { rotulo: 'Documentos', para: '/documentos', icone: 'folder_open' },
  { rotulo: 'Mensagens', para: '/mensagens', icone: 'forum', contador: 'mensagens' },
  { rotulo: 'Meu Núcleo', para: '/meu-nucleo', icone: 'groups' },
  // Est. Art. 12, § 4.º — portal aberto a todo Eunomita, não área administrativa.
  { rotulo: 'Transparência', para: '/transparencia', icone: 'query_stats' },
  { rotulo: 'Perfil', para: '/perfil', icone: 'account_circle' },
];

/** Menu administrativo — cada item filtrado por permissao. */
export const NAV_ADMINISTRATIVA: GrupoNav = {
  titulo: 'Administração',
  itens: [
    {
      rotulo: 'Painel do Administrador',
      para: '/admin',
      icone: 'dashboard',
      permissoes: ['configuracoes.gerenciar', 'permissoes.gerenciar'],
    },
    {
      rotulo: 'Secretaria',
      para: '/secretaria',
      icone: 'assignment_ind',
      permissoes: ['membros.criar', 'membros.aprovar', 'membros.editar'],
      contador: 'cadastros',
    },
    {
      rotulo: 'Tesouraria',
      para: '/tesouraria',
      icone: 'account_balance_wallet',
      permissoes: ['tesouraria.visualizar'],
    },
    { rotulo: 'Membros', para: '/membros', icone: 'badge', permissoes: ['membros.visualizar'] },
    { rotulo: 'Núcleos', para: '/nucleos', icone: 'hub', permissoes: ['nucleos.visualizar'] },
    { rotulo: 'Relatórios', para: '/relatorios', icone: 'monitoring', permissoes: ['relatorios.gerar'] },
    { rotulo: 'Cargos e permissões', para: '/permissoes', icone: 'key', permissoes: ['permissoes.gerenciar'] },
    { rotulo: 'Auditoria', para: '/auditoria', icone: 'policy', permissoes: ['auditoria.visualizar'] },
  ],
};

/** Barra inferior do aplicativo movel. */
export const NAV_MOBILE: ItemNav[] = [
  { rotulo: 'Hoje', para: '/hoje', icone: 'bolt' },
  { rotulo: 'Feed', para: '/feed', icone: 'article' },
  { rotulo: 'Propostas', para: '/propostas', icone: 'gavel' },
  { rotulo: 'Ranking', para: '/ranking', icone: 'leaderboard' },
  { rotulo: 'Perfil', para: '/perfil', icone: 'account_circle' },
];
