import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { Icone } from './Icone';

const BASE_CONTROLE =
  'w-full rounded-2xl border bg-surface-card px-4 text-sm text-ink placeholder:text-ink-faint ' +
  'transition focus:border-ouro focus:outline-none focus:ring-2 focus:ring-ouro/30 ' +
  'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-faint';

interface EnvelopeProps {
  id: string;
  rotulo: string;
  erro?: string;
  dica?: string;
  obrigatorio?: boolean;
  children: ReactNode;
  className?: string;
}

function Envelope({ id, rotulo, erro, dica, obrigatorio, children, className }: EnvelopeProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {rotulo}
        {obrigatorio && <span className="ml-1 text-critico">*</span>}
      </label>
      {children}
      {erro ? (
        <p id={`${id}-erro`} className="flex items-center gap-1 text-xs font-medium text-critico">
          <Icone nome="error" className="text-[14px]" />
          {erro}
        </p>
      ) : (
        dica && (
          <p id={`${id}-dica`} className="text-xs text-ink-faint">
            {dica}
          </p>
        )
      )}
    </div>
  );
}

type CampoProps = {
  rotulo: string;
  erro?: string;
  dica?: string;
  icone?: string;
  acaoFim?: ReactNode;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Campo({ rotulo, erro, dica, icone, acaoFim, className, ...resto }: CampoProps) {
  const gerado = useId();
  const id = resto.id ?? gerado;
  return (
    <Envelope id={id} rotulo={rotulo} erro={erro} dica={dica} obrigatorio={resto.required} className={className}>
      <div className="relative">
        {icone && (
          <Icone
            nome={icone}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[19px] text-ink-faint"
          />
        )}
        <input
          {...resto}
          id={id}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${id}-erro` : dica ? `${id}-dica` : undefined}
          className={cn(
            BASE_CONTROLE,
            'h-12',
            icone && 'pl-11',
            acaoFim && 'pr-12',
            erro ? 'border-critico' : 'border-line-strong',
          )}
        />
        {acaoFim && <div className="absolute right-1.5 top-1/2 -translate-y-1/2">{acaoFim}</div>}
      </div>
    </Envelope>
  );
}

type SelecaoProps = {
  rotulo: string;
  erro?: string;
  dica?: string;
  className?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Selecao({ rotulo, erro, dica, className, children, ...resto }: SelecaoProps) {
  const gerado = useId();
  const id = resto.id ?? gerado;
  return (
    <Envelope id={id} rotulo={rotulo} erro={erro} dica={dica} obrigatorio={resto.required} className={className}>
      <div className="relative">
        <select
          {...resto}
          id={id}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${id}-erro` : dica ? `${id}-dica` : undefined}
          className={cn(
            BASE_CONTROLE,
            'h-12 appearance-none pr-11',
            erro ? 'border-critico' : 'border-line-strong',
          )}
        >
          {children}
        </select>
        <Icone
          nome="expand_more"
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px] text-ink-faint"
        />
      </div>
    </Envelope>
  );
}

type AreaProps = {
  rotulo: string;
  erro?: string;
  dica?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function AreaTexto({ rotulo, erro, dica, className, ...resto }: AreaProps) {
  const gerado = useId();
  const id = resto.id ?? gerado;
  return (
    <Envelope id={id} rotulo={rotulo} erro={erro} dica={dica} obrigatorio={resto.required} className={className}>
      <textarea
        {...resto}
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : dica ? `${id}-dica` : undefined}
        className={cn(
          BASE_CONTROLE,
          'min-h-28 resize-y py-3 leading-relaxed',
          erro ? 'border-critico' : 'border-line-strong',
        )}
      />
    </Envelope>
  );
}

export function Alternador({
  rotulo,
  descricao,
  ativo,
  aoAlternar,
  desabilitado,
}: {
  rotulo: string;
  descricao?: string;
  ativo: boolean;
  aoAlternar: (v: boolean) => void;
  desabilitado?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{rotulo}</p>
        {descricao && <p className="mt-0.5 text-sm text-ink-soft">{descricao}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={ativo}
        aria-label={rotulo}
        disabled={desabilitado}
        onClick={() => aoAlternar(!ativo)}
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50',
          ativo ? 'bg-ouro' : 'bg-surface-strong',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full border border-black/10 bg-white shadow-sm transition-transform',
            ativo ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  );
}

export function CampoBusca({
  valor,
  aoMudar,
  placeholder = 'Pesquisar…',
  className,
}: {
  valor: string;
  aoMudar: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <Icone
        nome="search"
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[19px] text-ink-faint"
      />
      <input
        type="search"
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(BASE_CONTROLE, 'h-11 border-line-strong pl-11')}
      />
    </div>
  );
}
