/** Concatena classes condicionais sem dependencias externas. */
export function cn(...partes: (string | number | false | null | undefined)[]): string {
  return partes.filter((p): p is string => typeof p === 'string' && p.length > 0).join(' ');
}
