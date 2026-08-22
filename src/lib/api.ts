/**
 * Cliente da API em PHP.
 *
 * A plataforma roda em dois modos. Com o back-end instalado, tudo o que toca
 * autenticacao passa por aqui. Sem ele, a aplicacao continua funcionando
 * sobre o armazenamento local, em demonstracao — o que permite avaliar as
 * telas antes de contratar hospedagem, e e o modo em que a pagina unica e a
 * publicacao estatica funcionam.
 *
 * O token anti-CSRF vive so em memoria: guarda-lo em localStorage o deixaria
 * ao alcance de qualquer script injetado na pagina, que e justamente o que
 * ele existe para conter.
 */

export type ModoServidor = 'servidor' | 'nao-instalado' | 'demonstracao';

export interface EstadoServidor {
  modo: ModoServidor;
  sistema: string;
  organizacao: string;
  /** Endereco do instalador, quando ha back-end sem instalacao concluida. */
  instalador: string | null;
}

/** Erro devolvido pela API, com os campos rejeitados quando houver. */
export class ErroApi extends Error {
  constructor(
    mensagem: string,
    readonly situacao: number,
    readonly campos: Record<string, string> = {},
  ) {
    super(mensagem);
    this.name = 'ErroApi';
  }
}

let csrf: string | null = null;

/**
 * Raiz da API.
 *
 * BASE_URL acompanha a `--base` do build, de modo que a instalacao em
 * subpasta (dominio.com/ordem/) continua encontrando o servidor.
 */
export function raiz(): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/+$/, '')}/api`;
}

export function definirCsrf(token: string | null): void {
  csrf = token;
}

export function temCsrf(): boolean {
  return csrf !== null;
}

interface Envelope<T> {
  ok: boolean;
  dados?: T;
  erro?: string;
  campos?: Record<string, string>;
  [extra: string]: unknown;
}

async function pedir<T>(
  metodo: string,
  caminho: string,
  corpo?: unknown,
): Promise<Envelope<T>> {
  const cabecalhos: Record<string, string> = { Accept: 'application/json' };
  if (corpo !== undefined) cabecalhos['Content-Type'] = 'application/json';
  if (csrf) cabecalhos['X-CSRF-Token'] = csrf;

  let resposta: Response;
  try {
    resposta = await fetch(`${raiz()}${caminho}`, {
      method: metodo,
      headers: cabecalhos,
      // O cookie de sessao e httpOnly: e o navegador que o carrega.
      credentials: 'same-origin',
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    });
  } catch {
    throw new ErroApi('Não foi possível falar com o servidor. Verifique a conexão.', 0);
  }

  let envelope: Envelope<T>;
  try {
    envelope = (await resposta.json()) as Envelope<T>;
  } catch {
    throw new ErroApi(
      `O servidor respondeu de forma inesperada (${resposta.status}).`,
      resposta.status,
    );
  }

  if (!resposta.ok || envelope.ok === false) {
    throw new ErroApi(
      envelope.erro ?? `Falha na requisição (${resposta.status}).`,
      resposta.status,
      envelope.campos ?? {},
    );
  }
  return envelope;
}

export const api = {
  get: <T>(caminho: string) => pedir<T>('GET', caminho),
  post: <T>(caminho: string, corpo?: unknown) => pedir<T>('POST', caminho, corpo ?? {}),
  put: <T>(caminho: string, corpo?: unknown) => pedir<T>('PUT', caminho, corpo ?? {}),
  patch: <T>(caminho: string, corpo?: unknown) => pedir<T>('PATCH', caminho, corpo ?? {}),
  delete: <T>(caminho: string) => pedir<T>('DELETE', caminho),
};

/**
 * Descobre em que modo a aplicacao esta rodando.
 *
 * Nao lanca: a ausencia de servidor e um estado normal, nao um erro. Um
 * tempo limite curto evita que a tela de entrada fique presa esperando um
 * back-end que nao existe.
 */
export async function descobrirServidor(limiteMs = 4000): Promise<EstadoServidor> {
  const demonstracao: EstadoServidor = {
    modo: 'demonstracao',
    sistema: '',
    organizacao: '',
    instalador: null,
  };

  const corte = new AbortController();
  const relogio = setTimeout(() => corte.abort(), limiteMs);
  try {
    const resposta = await fetch(`${raiz()}/estado`, {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
      signal: corte.signal,
    });
    const tipo = resposta.headers.get('content-type') ?? '';
    if (!tipo.includes('application/json')) {
      // Servidor sem PHP devolve o index.html do proprio aplicativo.
      return demonstracao;
    }
    const corpo = (await resposta.json()) as {
      instalado?: boolean;
      sistema?: string;
      organizacao?: string;
      instalador?: string;
    };
    if (corpo.instalado === true) {
      return {
        modo: 'servidor',
        sistema: corpo.sistema ?? '',
        organizacao: corpo.organizacao ?? '',
        instalador: null,
      };
    }
    if (corpo.instalado === false) {
      return {
        modo: 'nao-instalado',
        sistema: '',
        organizacao: '',
        instalador: `${raiz()}/${corpo.instalador ?? 'instalacao/'}`,
      };
    }
    return demonstracao;
  } catch {
    return demonstracao;
  } finally {
    clearTimeout(relogio);
  }
}
