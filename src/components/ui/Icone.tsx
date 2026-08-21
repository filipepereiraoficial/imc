import { cn } from '@/lib/cn';

interface Props {
  nome: string;
  className?: string;
  preenchido?: boolean;
  /** Rotulo acessivel. Sem ele o icone e tratado como decorativo. */
  rotulo?: string;
}

/** Icone Material Symbols Rounded. */
export function Icone({ nome, className, preenchido, rotulo }: Props) {
  return (
    <span
      className={cn('icone select-none leading-none', preenchido && 'icone-preenchido', className)}
      aria-hidden={rotulo ? undefined : true}
      aria-label={rotulo}
      role={rotulo ? 'img' : undefined}
    >
      {nome}
    </span>
  );
}
