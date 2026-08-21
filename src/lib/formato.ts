/** Formatadores usados em toda a interface (pt-BR). */

const LOCALE = 'pt-BR';

export function moeda(valor: number, currency = 'BRL'): string {
  return new Intl.NumberFormat(LOCALE, { style: 'currency', currency }).format(valor);
}

export function numero(valor: number): string {
  return new Intl.NumberFormat(LOCALE).format(valor);
}

export function data(iso: string, opcoes: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...opcoes,
  }).format(new Date(iso));
}

export function dataHora(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function hora(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit' }).format(
    new Date(iso),
  );
}

export function mesAbreviado(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, { month: 'short' })
    .format(new Date(iso))
    .replace('.', '')
    .toUpperCase();
}

export function diaDoMes(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, { day: '2-digit' }).format(new Date(iso));
}

/** "ha 2 horas", "em 3 dias" */
export function tempoRelativo(iso: string, referencia = new Date()): string {
  const rtf = new Intl.RelativeTimeFormat(LOCALE, { numeric: 'auto' });
  const diff = new Date(iso).getTime() - referencia.getTime();
  const unidades: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 1000 * 60 * 60 * 24 * 365],
    ['month', 1000 * 60 * 60 * 24 * 30],
    ['day', 1000 * 60 * 60 * 24],
    ['hour', 1000 * 60 * 60],
    ['minute', 1000 * 60],
  ];
  for (const [unidade, ms] of unidades) {
    if (Math.abs(diff) >= ms) return rtf.format(Math.round(diff / ms), unidade);
  }
  return 'agora mesmo';
}

export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '?';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export function primeiroNome(nome: string): string {
  return nome.trim().split(/\s+/)[0] ?? nome;
}

/** Compacta numeros grandes: 1.2 mil, 12,4 mil */
export function compacto(valor: number): string {
  return new Intl.NumberFormat(LOCALE, { notation: 'compact', maximumFractionDigits: 1 }).format(
    valor,
  );
}

export function percentual(valor: number, casas = 0): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'percent',
    maximumFractionDigits: casas,
  }).format(valor);
}

/** Remove acentos para busca textual. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function contem(alvo: string, termo: string): boolean {
  if (!termo) return true;
  return normalizar(alvo).includes(normalizar(termo));
}
