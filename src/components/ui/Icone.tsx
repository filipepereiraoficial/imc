import { cn } from '@/lib/cn';

interface Props {
  nome: string;
  className?: string;
  preenchido?: boolean;
  /** Rotulo acessivel. Sem ele o icone e tratado como decorativo. */
  rotulo?: string;
  style?: React.CSSProperties;
}

/** Icone Material Symbols Rounded. */
export function Icone({ nome, className, preenchido, rotulo, style }: Props) {
  return (
    <span
      className={cn('icone select-none leading-none', preenchido && 'icone-preenchido', className)}
      style={style}
      aria-hidden={rotulo ? undefined : true}
      aria-label={rotulo}
      role={rotulo ? 'img' : undefined}
    >
      {nome}
    </span>
  );
}
