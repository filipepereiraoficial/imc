/**
 * Persistencia local.
 *
 * Isola o acesso ao localStorage para que qualquer falha (modo privado,
 * cota excedida, storage bloqueado) degrade sem quebrar a aplicacao.
 */

const PREFIXO = 'ordem:v1:';

export function ler<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(PREFIXO + chave);
    if (!bruto) return padrao;
    return JSON.parse(bruto) as T;
  } catch {
    return padrao;
  }
}

export function gravar(chave: string, valor: unknown): void {
  try {
    localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch {
    /* silencioso: a sessao continua valida em memoria */
  }
}

export function remover(chave: string): void {
  try {
    localStorage.removeItem(PREFIXO + chave);
  } catch {
    /* silencioso */
  }
}

export const CHAVES = {
  base: 'base-dados',
  sessao: 'sessao',
  tema: 'tema',
  lembrar: 'lembrar-me',
} as const;
