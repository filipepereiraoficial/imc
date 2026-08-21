import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icone } from './Icone';

export function Vazio({
  icone = 'inbox',
  titulo,
  descricao,
  acao,
  className,
}: {
  icone?: string;
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center gap-3 px-6 py-14 text-center', className)}>
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-muted text-ink-faint">
        <Icone nome={icone} className="text-[26px]" />
      </span>
      <div>
        <p className="text-base font-bold text-ink">{titulo}</p>
        {descricao && <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">{descricao}</p>}
      </div>
      {acao}
    </div>
  );
}

export function Esqueleto({ className }: { className?: string }) {
  return <div className={cn('brilho rounded-xl bg-surface-muted', className)} />;
}

export function EsqueletoCartao() {
  return (
    <div className="rounded-card border border-line bg-surface-card p-5">
      <div className="flex items-center gap-3">
        <Esqueleto className="h-11 w-11 rounded-full" />
        <div className="flex-1 space-y-2">
          <Esqueleto className="h-3.5 w-1/3" />
          <Esqueleto className="h-3 w-1/4" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Esqueleto className="h-3 w-full" />
        <Esqueleto className="h-3 w-11/12" />
        <Esqueleto className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function EsqueletoLista({ linhas = 5 }: { linhas?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: linhas }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-card border border-line bg-surface-card p-4">
          <Esqueleto className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Esqueleto className="h-3 w-1/3" />
            <Esqueleto className="h-2.5 w-1/5" />
          </div>
          <Esqueleto className="h-6 w-14 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/** Bloqueio de acesso por falta de permissao. */
export function SemAcesso({ modulo }: { modulo: string }) {
  return (
    <Vazio
      icone="lock"
      titulo="Acesso restrito"
      descricao={`Seu cargo atual não possui autorização para acessar ${modulo}. Caso precise deste acesso, solicite à Secretaria ou à Administração da Ordem.`}
    />
  );
}
