import type { Membro, Nivel, TransacaoXP } from '@/types';

/** Nivel correspondente a um saldo de XP. */
export function nivelPorXP(niveis: Nivel[], xp: number): Nivel {
  const ordenados = [...niveis].sort((a, b) => a.xpMinimo - b.xpMinimo);
  let atual = ordenados[0];
  for (const n of ordenados) if (xp >= n.xpMinimo) atual = n;
  return atual;
}

export function proximoNivel(niveis: Nivel[], xp: number): Nivel | null {
  const ordenados = [...niveis].sort((a, b) => a.xpMinimo - b.xpMinimo);
  return ordenados.find((n) => n.xpMinimo > xp) ?? null;
}

export interface ProgressoNivel {
  nivel: Nivel;
  proximo: Nivel | null;
  xpNoNivel: number;
  xpNecessario: number;
  restante: number;
  fracao: number;
}

export function progressoNivel(niveis: Nivel[], xp: number): ProgressoNivel {
  const nivel = nivelPorXP(niveis, xp);
  const proximo = proximoNivel(niveis, xp);
  if (!proximo) {
    return { nivel, proximo: null, xpNoNivel: xp - nivel.xpMinimo, xpNecessario: 0, restante: 0, fracao: 1 };
  }
  const xpNoNivel = xp - nivel.xpMinimo;
  const xpNecessario = proximo.xpMinimo - nivel.xpMinimo;
  return {
    nivel,
    proximo,
    xpNoNivel,
    xpNecessario,
    restante: proximo.xpMinimo - xp,
    fracao: Math.min(1, Math.max(0, xpNoNivel / xpNecessario)),
  };
}

/** Ordena membros para o ranking: XP desc, depois sequencia, depois nome. */
export function ordenarRanking(membros: Membro[]): Membro[] {
  return [...membros].sort(
    (a, b) =>
      b.xp - a.xp ||
      b.sequenciaDias - a.sequenciaDias ||
      a.nomeCompleto.localeCompare(b.nomeCompleto, 'pt-BR'),
  );
}

export function posicaoNoRanking(membros: Membro[], membroId: string): number {
  return ordenarRanking(membros).findIndex((m) => m.id === membroId) + 1;
}

/** XP acumulado nos ultimos `dias` dias. */
export function xpRecente(transacoes: TransacaoXP[], membroId: string, dias = 30): number {
  const limite = Date.now() - dias * 24 * 60 * 60 * 1000;
  return transacoes
    .filter((t) => t.membroId === membroId && new Date(t.criadoEm).getTime() >= limite)
    .reduce((soma, t) => soma + t.pontos, 0);
}
