import { cn } from '@/lib/cn';

interface Props {
  /** Valor entre 0 e 1. */
  fracao: number;
  className?: string;
  altura?: 'fina' | 'media' | 'grossa';
  tom?: 'ouro' | 'escuro' | 'positivo';
  rotuloAcessivel: string;
}

const ALTURAS = { fina: 'h-1.5', media: 'h-2.5', grossa: 'h-3.5' };
const TONS = {
  ouro: 'bg-gradient-to-r from-ouro to-ouro-soft',
  escuro: 'bg-ink',
  positivo: 'bg-positivo',
};

export function BarraProgresso({ fracao, className, altura = 'media', tom = 'ouro', rotuloAcessivel }: Props) {
  const pct = Math.round(Math.min(1, Math.max(0, fracao)) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={rotuloAcessivel}
      className={cn('w-full overflow-hidden rounded-full bg-surface-strong', ALTURAS[altura], className)}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-500 ease-out', TONS[tom])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Anel de progresso — usado em cartoes de formacao e no perfil. */
export function AnelProgresso({
  fracao,
  tamanho = 64,
  espessura = 6,
  children,
  rotuloAcessivel,
}: {
  fracao: number;
  tamanho?: number;
  espessura?: number;
  children?: React.ReactNode;
  rotuloAcessivel: string;
}) {
  const pct = Math.min(1, Math.max(0, fracao));
  const raio = (tamanho - espessura) / 2;
  const circunferencia = 2 * Math.PI * raio;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: tamanho, height: tamanho }}>
      <svg
        width={tamanho}
        height={tamanho}
        className="-rotate-90"
        role="img"
        aria-label={`${rotuloAcessivel}: ${Math.round(pct * 100)}%`}
      >
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          strokeWidth={espessura}
          className="stroke-surface-strong"
        />
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          strokeWidth={espessura}
          strokeLinecap="round"
          stroke="rgb(var(--c-gold))"
          strokeDasharray={circunferencia}
          strokeDashoffset={circunferencia * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 600ms ease-out' }}
        />
      </svg>
      <span className="absolute text-xs font-bold text-ink">{children}</span>
    </div>
  );
}
