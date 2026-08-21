import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icone } from './Icone';

export type TomSelo = 'neutro' | 'ouro' | 'positivo' | 'atencao' | 'critico' | 'info' | 'escuro';

const TONS: Record<TomSelo, string> = {
  neutro: 'bg-surface-muted text-ink-soft border-line',
  ouro: 'bg-ouro-wash text-[rgb(var(--c-gold-deep))] border-ouro/35',
  positivo: 'bg-positivo/10 text-positivo border-positivo/25',
  atencao: 'bg-atencao/10 text-atencao border-atencao/25',
  critico: 'bg-critico/10 text-critico border-critico/25',
  info: 'bg-info/10 text-info border-info/25',
  escuro: 'bg-ink text-ink-inverse border-transparent',
};

interface Props {
  children: ReactNode;
  tom?: TomSelo;
  icone?: string;
  className?: string;
  /** Estilo de rotulo institucional: caixa alta e espacamento maior. */
  rotulo?: boolean;
}

export function Selo({ children, tom = 'neutro', icone, className, rotulo }: Props) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none',
        rotulo && 'text-[0.68rem] uppercase tracking-[0.08em]',
        TONS[tom],
        className,
      )}
    >
      {icone && <Icone nome={icone} className="text-[14px]" />}
      {children}
    </span>
  );
}

/** Ponto colorido usado para identidade em tabelas e legendas. */
export function Ponto({ cor, className }: { cor: string; className?: string }) {
  return (
    <span
      className={cn('inline-block h-2.5 w-2.5 shrink-0 rounded-full', className)}
      style={{ backgroundColor: cor }}
    />
  );
}
