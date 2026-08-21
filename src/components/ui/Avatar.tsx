import { cn } from '@/lib/cn';
import { iniciais } from '@/lib/formato';

export type TamanhoAvatar = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const TAMANHOS: Record<TamanhoAvatar, string> = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-2xl',
};

/**
 * Deriva um tom estavel a partir do nome, para que o mesmo membro tenha
 * sempre o mesmo fundo — sem depender de imagem remota.
 */
function tomDoNome(nome: string): string {
  let soma = 0;
  for (let i = 0; i < nome.length; i++) soma = (soma + nome.charCodeAt(i) * (i + 1)) % 360;
  return `hsl(${soma} 34% 32%)`;
}

interface Props {
  nome: string;
  fotoUrl?: string;
  tamanho?: TamanhoAvatar;
  className?: string;
  /** Anel dourado — usado para o proprio membro e para cargos de direcao. */
  destacado?: boolean;
  nivel?: number;
}

export function Avatar({ nome, fotoUrl, tamanho = 'md', className, destacado, nivel }: Props) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      {fotoUrl ? (
        <img
          src={fotoUrl}
          alt={nome}
          className={cn(
            'rounded-full object-cover',
            TAMANHOS[tamanho],
            destacado && 'ring-2 ring-ouro ring-offset-2 ring-offset-surface-card',
          )}
        />
      ) : (
        <span
          aria-hidden
          className={cn(
            'grid place-items-center rounded-full font-bold uppercase tracking-wide text-white',
            TAMANHOS[tamanho],
            destacado && 'ring-2 ring-ouro ring-offset-2 ring-offset-surface-card',
          )}
          style={{ backgroundColor: tomDoNome(nome) }}
        >
          {iniciais(nome)}
        </span>
      )}
      {nivel !== undefined && (
        <span className="absolute -bottom-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-surface-card bg-ouro-soft px-1 text-[10px] font-bold text-[rgb(20_18_14)]">
          {nivel}
        </span>
      )}
      <span className="sr-only">{nome}</span>
    </span>
  );
}
