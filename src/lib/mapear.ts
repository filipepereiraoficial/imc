/**
 * Conversao entre o formato da API e os tipos da interface.
 *
 * A API responde em camelCase e omite o que a faixa de visibilidade do
 * membro nao permite ver — um campo ausente e informacao, nao falha. Aqui os
 * ausentes viram valores neutros, para que nenhuma tela precise se defender
 * de undefined.
 */

import { nivelPorXP } from '@/lib/xp';
import type { Cargo, Grau, Membro, Nivel, TituloLateral } from '@/types';

/** Forma minima do que a API devolve para um membro. */
export interface MembroApi {
  id: string;
  numeroMembro?: string;
  nomeCompleto?: string;
  nomeExibicao?: string;
  usuario?: string;
  email?: string | null;
  telefone?: string | null;
  fotoUrl?: string | null;
  sexo?: string;
  dataNascimento?: string | null;
  endereco?: {
    logradouro?: string;
    numero?: string;
    complemento?: string | null;
    bairro?: string;
    cep?: string;
  };
  paisId?: string | null;
  estadoId?: string | null;
  municipioId?: string | null;
  nucleoId?: string | null;
  cargoId?: string;
  grauId?: string;
  categoriaAssociativa?: string;
  situacao?: string;
  dataIngresso?: string;
  biografia?: string | null;
  xp?: number;
  sequenciaDias?: number;
  titulos?: string[];
  privacidade?: Record<string, string>;
  doisFatoresAtivo?: boolean;
  ultimoAcesso?: string | null;
  observacoesAdmin?: string | null;
}

const VISIBILIDADE_PADRAO: Membro['privacidade'] = {
  email: 'administracao',
  telefone: 'nucleo',
  endereco: 'administracao',
  dataNascimento: 'nucleo',
  perfil: 'publico',
  publicacoes: 'publico',
};

/**
 * A escala de niveis nao vem do servidor: ela e configuracao de exibicao,
 * definida na propria aplicacao. Por isso entra como parametro.
 */
export function membroDaApi(bruto: MembroApi, niveis: Nivel[] = []): Membro {
  const xp = bruto.xp ?? 0;
  const privacidade = bruto.privacidade;

  return {
    id: bruto.id,
    numeroMembro: bruto.numeroMembro ?? '',
    nomeCompleto: bruto.nomeCompleto ?? bruto.nomeExibicao ?? '',
    nomeExibicao: bruto.nomeExibicao ?? bruto.nomeCompleto ?? '',
    usuario: bruto.usuario ?? '',
    email: bruto.email ?? '',
    telefone: bruto.telefone ?? '',
    fotoUrl: bruto.fotoUrl ?? undefined,
    sexo: (bruto.sexo as Membro['sexo']) ?? 'nao_informado',
    dataNascimento: bruto.dataNascimento ?? '',
    endereco: {
      logradouro: bruto.endereco?.logradouro ?? '',
      numero: bruto.endereco?.numero ?? '',
      complemento: bruto.endereco?.complemento ?? undefined,
      bairro: bruto.endereco?.bairro ?? '',
      cep: bruto.endereco?.cep ?? '',
      municipioId: bruto.municipioId ?? '',
      estadoId: bruto.estadoId ?? '',
      paisId: bruto.paisId ?? '',
    },
    paisId: bruto.paisId ?? '',
    estadoId: bruto.estadoId ?? '',
    municipioId: bruto.municipioId ?? '',
    nucleoId: bruto.nucleoId ?? null,
    cargoId: bruto.cargoId ?? '',
    categoriaAssociativa: (bruto.categoriaAssociativa as Membro['categoriaAssociativa']) ?? 'transicao',
    grauId: bruto.grauId ?? '',
    titulos: (bruto.titulos ?? []) as TituloLateral[],
    situacao: (bruto.situacao as Membro['situacao']) ?? 'ativo',
    dataIngresso: bruto.dataIngresso ?? '',
    biografia: bruto.biografia ?? undefined,
    // Interesses, areas e conquistas ainda nao tem tabela propria: quem vem
    // do servidor chega sem eles, e as telas tratam a lista vazia.
    interessesFilosoficos: [],
    areasAtuacao: [],
    competencias: [],
    xp,
    nivel: niveis.length > 0 ? nivelPorXP(niveis, xp).numero : 1,
    sequenciaDias: bruto.sequenciaDias ?? 0,
    aliados: [],
    conquistas: [],
    privacidade: privacidade
      ? {
          email: (privacidade.email ?? VISIBILIDADE_PADRAO.email) as Membro['privacidade']['email'],
          telefone: (privacidade.telefone ?? VISIBILIDADE_PADRAO.telefone) as Membro['privacidade']['telefone'],
          endereco: (privacidade.endereco ?? VISIBILIDADE_PADRAO.endereco) as Membro['privacidade']['endereco'],
          dataNascimento: (privacidade.nascimento ?? VISIBILIDADE_PADRAO.dataNascimento) as Membro['privacidade']['dataNascimento'],
          perfil: (privacidade.perfil ?? VISIBILIDADE_PADRAO.perfil) as Membro['privacidade']['perfil'],
          publicacoes: (privacidade.publicacoes ?? VISIBILIDADE_PADRAO.publicacoes) as Membro['privacidade']['publicacoes'],
        }
      : VISIBILIDADE_PADRAO,
    autenticacaoDoisFatores: bruto.doisFatoresAtivo ?? false,
    observacoesAdministrativas: bruto.observacoesAdmin ?? undefined,
    ultimoAcesso: bruto.ultimoAcesso ?? undefined,
  };
}

export function cargoDaApi(bruto: Record<string, unknown>): Cargo {
  return {
    id: String(bruto.id),
    codigo: bruto.codigo as Cargo['codigo'],
    nome: String(bruto.nome ?? ''),
    descricao: String(bruto.descricao ?? ''),
    escopo: bruto.escopo as Cargo['escopo'],
    precedencia: Number(bruto.precedencia ?? 99),
    permissoes: (bruto.permissoes as Cargo['permissoes']) ?? [],
    sistema: Boolean(bruto.sistema),
  };
}

export function grauDaApi(bruto: Record<string, unknown>): Grau {
  return {
    id: String(bruto.id),
    codigo: String(bruto.codigo ?? ''),
    nome: String(bruto.nome ?? ''),
    categoria: bruto.categoria as Grau['categoria'],
    ordem: Number(bruto.ordem ?? 0),
    descricao: String(bruto.descricao ?? ''),
    xpSugerido: Number(bruto.xpSugerido ?? 0),
  };
}
