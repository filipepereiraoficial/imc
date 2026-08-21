import { useMemo } from 'react';
import { useDados } from '@/context/DadosContext';
import { localidade, nucleoPorId } from '@/lib/consultas';
import { cn } from '@/lib/cn';
import { data as formatarData, numero } from '@/lib/formato';
import { progressoNivel } from '@/lib/xp';
import type { Membro } from '@/types';
import { Avatar, Icone } from '@/components/ui';
import { NOME_ORDEM, SIGLA_ORDEM } from '@/config';

/**
 * Carteira de Membro digital.
 *
 * Peca central da identidade institucional: reune registro, nivel, Nucleo e
 * localidade. E o unico lugar onde o numero de membro aparece em destaque.
 */
export function CarteiraMembro({
  membro,
  compacta,
  className,
}: {
  membro: Membro;
  compacta?: boolean;
  className?: string;
}) {
  const { base } = useDados();
  const nucleo = nucleoPorId(base, membro.nucleoId);
  const progresso = useMemo(() => progressoNivel(base.niveis, membro.xp), [base.niveis, membro.xp]);

  return (
    <article
      className={cn(
        'relative min-w-0 overflow-hidden rounded-painel border border-ouro/25 text-[rgb(250_246_238)] shadow-elevado',
        className,
      )}
      style={{
        background:
          'linear-gradient(135deg, rgb(30 26 19) 0%, rgb(22 19 14) 42%, rgb(38 31 16) 100%)',
      }}
    >
      <div className="trama pointer-events-none absolute inset-0 opacity-[0.10]" aria-hidden />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-25 blur-2xl"
        style={{ background: 'radial-gradient(circle, rgb(245 197 24 / 0.8), transparent 68%)' }}
        aria-hidden
      />

      <div className="relative p-5 sm:p-6">
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-ouro/40 bg-ouro/10">
              <Icone nome="shield" className="text-[19px] text-[rgb(245_197_24)]" />
            </span>
            <div className="leading-tight">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[rgb(245_197_24)]">
                {SIGLA_ORDEM}
              </p>
              <p className="text-[0.65rem] uppercase tracking-[0.1em] text-white/45">
                Carteira de Membro
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-right">
            <p className="text-[0.6rem] uppercase tracking-[0.1em] text-white/45">Registro</p>
            <p className="text-sm font-bold tracking-wider text-white">{membro.numeroMembro}</p>
          </div>
        </header>

        <div className="mt-5 flex items-center gap-4">
          <Avatar nome={membro.nomeCompleto} fotoUrl={membro.fotoUrl} tamanho={compacta ? 'md' : 'lg'} />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-bold leading-tight text-white sm:text-xl">
              {membro.nomeCompleto}
            </h3>
            <p className="truncate text-sm text-white/55">@{membro.usuario}</p>
            <p className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs text-white/70">
              <Icone nome="location_on" className="text-[15px] text-[rgb(245_197_24)]" />
              <span className="truncate">{localidade(base, membro)}</span>
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[0.6rem] uppercase tracking-[0.12em] text-white/45">Nível</p>
            <p className="text-3xl font-extrabold leading-none text-[rgb(245_197_24)]">
              {progresso.nivel.numero}
            </p>
            <p className="text-[0.65rem] font-semibold text-white/60">{progresso.nivel.titulo}</p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
          <div className="min-w-0">
            <dt className="text-[0.6rem] uppercase tracking-[0.1em] text-white/45">Núcleo</dt>
            <dd className="truncate font-semibold text-white">{nucleo?.nome ?? 'Sem vínculo'}</dd>
          </div>
          <div className="min-w-0 text-right">
            <dt className="text-[0.6rem] uppercase tracking-[0.1em] text-white/45">Membro desde</dt>
            <dd className="font-semibold text-white">{formatarData(membro.dataIngresso)}</dd>
          </div>
        </dl>

        {!compacta && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-baseline justify-between text-xs">
              <span className="font-semibold text-white/70">Progresso</span>
              <span className="font-bold tabular-nums text-white">
                {numero(membro.xp)}
                {progresso.proximo && (
                  <span className="font-medium text-white/45"> / {numero(progresso.proximo.xpMinimo)} XP</span>
                )}
              </span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-white/12"
              role="progressbar"
              aria-valuenow={Math.round(progresso.fracao * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progresso para o próximo nível"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[rgb(214_158_11)] to-[rgb(255_214_64)] transition-[width] duration-700"
                style={{ width: `${progresso.fracao * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-[0.7rem] text-white/50">
              {progresso.proximo
                ? `Faltam ${numero(progresso.restante)} XP para ${progresso.proximo.titulo}`
                : 'Nível máximo alcançado'}
            </p>
          </div>
        )}

        <p className="mt-4 text-[0.6rem] uppercase tracking-[0.14em] text-white/25">{NOME_ORDEM}</p>
      </div>
    </article>
  );
}

/** Placa de indicador usada abaixo da carteira (streak, aliados, XP). */
export function PlacaIndicador({
  icone,
  valor,
  rotulo,
  destaque,
}: {
  icone: string;
  valor: string | number;
  rotulo: string;
  destaque?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-card border p-4',
        destaque ? 'border-ouro/35 bg-ouro-wash' : 'border-line bg-surface-card',
      )}
    >
      <span
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-xl',
          destaque ? 'bg-ouro/20 text-[rgb(var(--c-gold-deep))]' : 'bg-surface-muted text-ink-soft',
        )}
      >
        <Icone nome={icone} className="text-[20px]" preenchido={destaque} />
      </span>
      <div className="min-w-0">
        <p className="text-lg font-extrabold leading-none tabular-nums text-ink">{valor}</p>
        <p className="mt-1 text-xs font-medium leading-tight text-ink-faint">{rotulo}</p>
      </div>
    </div>
  );
}
