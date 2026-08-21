import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Icone } from './Icone';

export type VarianteBotao = 'primario' | 'secundario' | 'contorno' | 'sutil' | 'perigo';
export type TamanhoBotao = 'pequeno' | 'medio' | 'grande';

const VARIANTES: Record<VarianteBotao, string> = {
  primario:
    'bg-ink text-ink-inverse hover:bg-ink/90 active:bg-ink shadow-suave disabled:bg-ink/40',
  secundario:
    'bg-ouro-soft text-[rgb(var(--c-gold-deep))] hover:brightness-[0.97] active:brightness-95 shadow-suave dark:text-[rgb(20_18_14)]',
  contorno:
    'border border-line-strong bg-surface-card text-ink hover:bg-surface-muted active:bg-surface-strong',
  sutil: 'text-ink-soft hover:bg-surface-muted hover:text-ink active:bg-surface-strong',
  perigo: 'bg-critico text-white hover:brightness-95 active:brightness-90 shadow-suave',
};

const TAMANHOS: Record<TamanhoBotao, string> = {
  pequeno: 'h-9 px-3.5 text-sm gap-1.5 rounded-xl',
  medio: 'h-11 px-5 text-sm gap-2 rounded-2xl',
  grande: 'h-13 px-6 text-base gap-2.5 rounded-2xl',
};

interface BaseProps {
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  icone?: string;
  iconeFim?: string;
  carregando?: boolean;
  larguraTotal?: boolean;
  children?: ReactNode;
  className?: string;
}

function classes({ variante = 'primario', tamanho = 'medio', larguraTotal, className }: BaseProps) {
  return cn(
    'inline-flex items-center justify-center font-semibold transition-all duration-150',
    'active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60',
    VARIANTES[variante],
    TAMANHOS[tamanho],
    larguraTotal && 'w-full',
    className,
  );
}

type BotaoProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Botao({
  variante,
  tamanho = 'medio',
  icone,
  iconeFim,
  carregando,
  larguraTotal,
  className,
  children,
  disabled,
  ...resto
}: BotaoProps) {
  const tamIcone = tamanho === 'pequeno' ? 'text-[17px]' : 'text-[19px]';
  return (
    <button
      className={classes({ variante, tamanho, larguraTotal, className })}
      disabled={disabled || carregando}
      aria-busy={carregando || undefined}
      {...resto}
    >
      {carregando ? (
        <Icone nome="progress_activity" className={cn(tamIcone, 'animate-spin')} />
      ) : (
        icone && <Icone nome={icone} className={tamIcone} />
      )}
      {children}
      {iconeFim && !carregando && <Icone nome={iconeFim} className={tamIcone} />}
    </button>
  );
}

interface BotaoLinkProps extends BaseProps {
  para: string;
  'aria-label'?: string;
}

export function BotaoLink({
  para,
  variante,
  tamanho = 'medio',
  icone,
  iconeFim,
  larguraTotal,
  className,
  children,
  ...resto
}: BotaoLinkProps) {
  const tamIcone = tamanho === 'pequeno' ? 'text-[17px]' : 'text-[19px]';
  return (
    <Link to={para} className={classes({ variante, tamanho, larguraTotal, className })} {...resto}>
      {icone && <Icone nome={icone} className={tamIcone} />}
      {children}
      {iconeFim && <Icone nome={iconeFim} className={tamIcone} />}
    </Link>
  );
}

/** Botao circular usado em barras superiores e acoes de cartao. */
export function BotaoIcone({
  icone,
  rotulo,
  className,
  variante = 'sutil',
  ...resto
}: { icone: string; rotulo: string; variante?: VarianteBotao } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={rotulo}
      title={rotulo}
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition active:scale-95',
        VARIANTES[variante],
        className,
      )}
      {...resto}
    >
      <Icone nome={icone} className="text-[20px]" />
    </button>
  );
}
