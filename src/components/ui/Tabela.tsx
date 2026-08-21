import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icone } from './Icone';

export interface Coluna<T> {
  chave: string;
  titulo: string;
  renderizar: (item: T) => ReactNode;
  /** Oculta a coluna em telas estreitas. */
  secundaria?: boolean;
  alinhamento?: 'esquerda' | 'direita' | 'centro';
  larguraMinima?: string;
}

interface Props<T> {
  colunas: Coluna<T>[];
  itens: T[];
  chaveDe: (item: T) => string;
  aoClicar?: (item: T) => void;
  vazio?: ReactNode;
  className?: string;
  legenda: string;
  /**
   * Renderizacao alternativa em cartao para telas estreitas. Quando ausente,
   * a tabela rola horizontalmente dentro do proprio contorno.
   */
  cartaoMobile?: (item: T) => ReactNode;
}

const ALINHAMENTO = {
  esquerda: 'text-left',
  direita: 'text-right',
  centro: 'text-center',
};

export function Tabela<T>({
  colunas,
  itens,
  chaveDe,
  aoClicar,
  vazio,
  className,
  legenda,
  cartaoMobile,
}: Props<T>) {
  if (itens.length === 0 && vazio) return <>{vazio}</>;

  return (
    <div className={className}>
      {cartaoMobile && (
        <div className="space-y-2 md:hidden">
          {itens.map((item) => (
            <div key={chaveDe(item)}>{cartaoMobile(item)}</div>
          ))}
        </div>
      )}
      <div
        className={cn(
          'overflow-x-auto rounded-card border border-line bg-surface-card',
          cartaoMobile && 'hidden md:block',
        )}
      >
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{legenda}</caption>
          <thead>
            <tr className="border-b border-line bg-surface-muted/60">
              {colunas.map((c) => (
                <th
                  key={c.chave}
                  scope="col"
                  className={cn(
                    'whitespace-nowrap px-4 py-3 text-rotulo uppercase text-ink-faint',
                    ALINHAMENTO[c.alinhamento ?? 'esquerda'],
                    c.secundaria && 'hidden lg:table-cell',
                  )}
                  style={c.larguraMinima ? { minWidth: c.larguraMinima } : undefined}
                >
                  {c.titulo}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr
                key={chaveDe(item)}
                onClick={aoClicar ? () => aoClicar(item) : undefined}
                tabIndex={aoClicar ? 0 : undefined}
                onKeyDown={
                  aoClicar
                    ? (e) => {
                        if (e.key === 'Enter') aoClicar(item);
                      }
                    : undefined
                }
                className={cn(
                  'border-b border-line last:border-0 transition-colors',
                  aoClicar && 'cursor-pointer hover:bg-surface-muted/70',
                )}
              >
                {colunas.map((c) => (
                  <td
                    key={c.chave}
                    className={cn(
                      'px-4 py-3 align-middle text-ink',
                      ALINHAMENTO[c.alinhamento ?? 'esquerda'],
                      c.secundaria && 'hidden lg:table-cell',
                    )}
                  >
                    {c.renderizar(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Paginacao({
  pagina,
  totalPaginas,
  aoMudar,
  totalItens,
}: {
  pagina: number;
  totalPaginas: number;
  aoMudar: (p: number) => void;
  totalItens: number;
}) {
  if (totalPaginas <= 1) return null;
  return (
    <nav className="flex items-center justify-between gap-3 pt-3" aria-label="Paginação">
      <p className="text-sm text-ink-faint">
        Página {pagina} de {totalPaginas} · {totalItens} registros
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => aoMudar(pagina - 1)}
          disabled={pagina <= 1}
          className="grid h-9 w-9 place-items-center rounded-xl border border-line-strong text-ink transition hover:bg-surface-muted disabled:opacity-40"
          aria-label="Página anterior"
        >
          <Icone nome="chevron_left" className="text-[20px]" />
        </button>
        <button
          type="button"
          onClick={() => aoMudar(pagina + 1)}
          disabled={pagina >= totalPaginas}
          className="grid h-9 w-9 place-items-center rounded-xl border border-line-strong text-ink transition hover:bg-surface-muted disabled:opacity-40"
          aria-label="Próxima página"
        >
          <Icone nome="chevron_right" className="text-[20px]" />
        </button>
      </div>
    </nav>
  );
}
