import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icone } from './Icone';

interface CartaoProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Remove o preenchimento interno para conteudo que sangra ate a borda. */
  semPadding?: boolean;
  destaque?: boolean;
}

export function Cartao({ children, className, semPadding, destaque, ...resto }: CartaoProps) {
  return (
    <div
      className={cn(
        'rounded-card border bg-surface-card shadow-suave',
        destaque ? 'border-ouro/40' : 'border-line',
        !semPadding && 'p-5',
        className,
      )}
      {...resto}
    >
      {children}
    </div>
  );
}

interface CabecalhoProps {
  titulo: string;
  descricao?: string;
  icone?: string;
  acao?: ReactNode;
  className?: string;
}

export function CabecalhoCartao({ titulo, descricao, icone, acao, className }: CabecalhoProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="flex min-w-0 items-start gap-3">
        {icone && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-muted text-ink-soft">
            <Icone nome={icone} className="text-[19px]" />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-secao text-ink">{titulo}</h3>
          {descricao && <p className="mt-0.5 text-sm text-ink-soft">{descricao}</p>}
        </div>
      </div>
      {acao && <div className="shrink-0">{acao}</div>}
    </div>
  );
}

/** Titulo de secao usado entre blocos de uma pagina. */
export function TituloSecao({
  titulo,
  acao,
  className,
}: {
  titulo: string;
  acao?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-baseline justify-between gap-4', className)}>
      <h2 className="rotulo">{titulo}</h2>
      {acao}
    </div>
  );
}
