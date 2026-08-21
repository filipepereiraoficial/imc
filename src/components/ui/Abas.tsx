import { cn } from '@/lib/cn';
import { Icone } from './Icone';

export interface ItemAba<T extends string = string> {
  id: T;
  rotulo: string;
  icone?: string;
  contagem?: number;
}

interface Props<T extends string> {
  itens: ItemAba<T>[];
  ativo: T;
  aoMudar: (id: T) => void;
  /** 'pilula' para filtros; 'linha' para navegacao interna de pagina. */
  variante?: 'pilula' | 'linha';
  className?: string;
  rotuloGrupo?: string;
}

export function Abas<T extends string>({
  itens,
  ativo,
  aoMudar,
  variante = 'pilula',
  className,
  rotuloGrupo = 'Seções',
}: Props<T>) {
  if (variante === 'linha') {
    return (
      <div
        role="tablist"
        aria-label={rotuloGrupo}
        className={cn('sem-barra flex gap-1 overflow-x-auto border-b border-line', className)}
      >
        {itens.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={ativo === item.id}
            onClick={() => aoMudar(item.id)}
            className={cn(
              'relative shrink-0 px-4 py-3 text-sm font-semibold transition-colors',
              ativo === item.id ? 'text-ink' : 'text-ink-faint hover:text-ink-soft',
            )}
          >
            <span className="flex items-center gap-1.5">
              {item.icone && <Icone nome={item.icone} className="text-[18px]" />}
              {item.rotulo}
              {item.contagem !== undefined && (
                <span className="rounded-full bg-surface-muted px-1.5 py-0.5 text-[11px] font-bold text-ink-soft">
                  {item.contagem}
                </span>
              )}
            </span>
            {ativo === item.id && (
              <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-ouro" />
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-label={rotuloGrupo}
      className={cn('sem-barra flex gap-2 overflow-x-auto pb-1', className)}
    >
      {itens.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={ativo === item.id}
          onClick={() => aoMudar(item.id)}
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition',
            ativo === item.id
              ? 'border-transparent bg-ink text-ink-inverse shadow-suave'
              : 'border-line bg-surface-card text-ink-soft hover:border-line-strong hover:text-ink',
          )}
        >
          {item.icone && <Icone nome={item.icone} className="text-[17px]" />}
          {item.rotulo}
          {item.contagem !== undefined && (
            <span
              className={cn(
                'rounded-full px-1.5 text-[11px] font-bold',
                ativo === item.id ? 'bg-ink-inverse/20' : 'bg-surface-muted',
              )}
            >
              {item.contagem}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
