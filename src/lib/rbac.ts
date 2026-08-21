import type { Cargo, CodigoCargo, Escopo, ID, Membro, Permissao } from '@/types';

/**
 * Controle de acesso baseado em cargos.
 *
 * A verificacao ocorre em duas etapas:
 *  1. o cargo do membro possui a permissao?
 *  2. o alvo da acao esta dentro do escopo territorial do cargo?
 *
 * A segunda etapa evita, por exemplo, que um Dirigente de Nucleo edite
 * membros de outro Nucleo mesmo possuindo `membros.editar`.
 */

export interface Alvo {
  nucleoId?: ID | null;
  estadoId?: ID | null;
  paisId?: ID | null;
  membroId?: ID | null;
}

export function encontrarCargo(cargos: Cargo[], cargoId: ID): Cargo | undefined {
  return cargos.find((c) => c.id === cargoId);
}

export function permissoesDe(cargos: Cargo[], membro: Membro | null): Permissao[] {
  if (!membro) return [];
  if (membro.situacao !== 'ativo' && membro.situacao !== 'pendente') return [];
  return encontrarCargo(cargos, membro.cargoId)?.permissoes ?? [];
}

/** Verifica apenas a posse da permissao, sem considerar escopo. */
export function possui(cargos: Cargo[], membro: Membro | null, permissao: Permissao): boolean {
  return permissoesDe(cargos, membro).includes(permissao);
}

export function possuiAlguma(cargos: Cargo[], membro: Membro | null, lista: Permissao[]): boolean {
  const atuais = permissoesDe(cargos, membro);
  return lista.some((p) => atuais.includes(p));
}

/** O alvo esta dentro do alcance territorial do cargo do membro? */
export function dentroDoEscopo(escopo: Escopo, membro: Membro, alvo: Alvo = {}): boolean {
  switch (escopo) {
    case 'global':
      return true;
    case 'pais':
      return !alvo.paisId || alvo.paisId === membro.paisId;
    case 'estado':
      return !alvo.estadoId || alvo.estadoId === membro.estadoId;
    case 'nucleo':
      if (alvo.membroId && alvo.membroId === membro.id) return true;
      return !alvo.nucleoId || alvo.nucleoId === membro.nucleoId;
    case 'proprio':
      return !alvo.membroId || alvo.membroId === membro.id;
    default:
      return false;
  }
}

/** Verificacao completa: permissao + escopo. */
export function pode(
  cargos: Cargo[],
  membro: Membro | null,
  permissao: Permissao,
  alvo: Alvo = {},
): boolean {
  if (!membro) return false;
  const cargo = encontrarCargo(cargos, membro.cargoId);
  if (!cargo) return false;
  if (!cargo.permissoes.includes(permissao)) return false;
  return dentroDoEscopo(cargo.escopo, membro, alvo);
}

/**
 * Um cargo so pode ser atribuido por quem tem precedencia igual ou superior.
 * Impede escalonamento de privilegio a partir de telas administrativas.
 */
export function podeAtribuirCargo(cargos: Cargo[], autor: Membro | null, cargoAlvoId: ID): boolean {
  if (!autor) return false;
  if (!possui(cargos, autor, 'permissoes.gerenciar') && !possui(cargos, autor, 'membros.editar')) {
    return false;
  }
  const cargoAutor = encontrarCargo(cargos, autor.cargoId);
  const cargoAlvo = encontrarCargo(cargos, cargoAlvoId);
  if (!cargoAutor || !cargoAlvo) return false;
  return cargoAutor.precedencia <= cargoAlvo.precedencia;
}

/** Documento visivel para o cargo informado. */
export function documentoVisivel(nivelAcesso: CodigoCargo[], cargo: Cargo | undefined): boolean {
  if (!cargo) return false;
  if (nivelAcesso.length === 0) return true;
  return nivelAcesso.includes(cargo.codigo);
}
