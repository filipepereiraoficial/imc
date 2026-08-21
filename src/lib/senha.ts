/**
 * Derivacao de senha no cliente.
 *
 * ATENCAO: esta implementacao existe apenas para que o prototipo nao guarde
 * senhas em texto claro no navegador. Em producao a verificacao ocorre no
 * servidor, com Argon2id ou bcrypt e sal por usuario — nunca no cliente.
 * Ver docs/SEGURANCA.md.
 */

const SAL_DEMO = 'ordem-prototipo';

export async function derivar(senha: string): Promise<string> {
  const dados = new TextEncoder().encode(`${SAL_DEMO}:${senha}`);
  const hash = await crypto.subtle.digest('SHA-256', dados);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export interface ForcaSenha {
  pontuacao: 0 | 1 | 2 | 3 | 4;
  rotulo: string;
  sugestoes: string[];
}

export function avaliarForca(senha: string): ForcaSenha {
  const sugestoes: string[] = [];
  let pontos = 0;
  if (senha.length >= 8) pontos++;
  else sugestoes.push('Use ao menos 8 caracteres');
  if (senha.length >= 12) pontos++;
  if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) pontos++;
  else sugestoes.push('Combine maiúsculas e minúsculas');
  if (/\d/.test(senha)) pontos++;
  else sugestoes.push('Inclua ao menos um número');
  if (/[^\w\s]/.test(senha)) pontos = Math.min(4, pontos + 1);
  else sugestoes.push('Inclua um símbolo');

  const escala = Math.min(4, pontos) as ForcaSenha['pontuacao'];
  const rotulos = ['Muito fraca', 'Fraca', 'Razoável', 'Boa', 'Forte'];
  return { pontuacao: escala, rotulo: rotulos[escala], sugestoes: sugestoes.slice(0, 2) };
}
