import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icone } from '@/components/ui';
import { LEMA_ORDEM, NOME_ORDEM, SIGLA_ORDEM } from '@/config';

/**
 * Moldura das telas publicas.
 *
 * No desktop divide a tela entre um painel institucional escuro e o formulario;
 * no celular o painel some e o formulario ocupa toda a largura.
 */
export function LayoutAuth({
  titulo,
  descricao,
  children,
  rodape,
}: {
  titulo: string;
  descricao: string;
  children: ReactNode;
  rodape?: ReactNode;
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <aside
        className="relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex"
        style={{
          background:
            'linear-gradient(150deg, rgb(26 22 16) 0%, rgb(18 16 12) 55%, rgb(42 34 14) 100%)',
        }}
      >
        <div className="trama absolute inset-0 opacity-[0.09]" aria-hidden />
        <div
          className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgb(245 197 24 / 0.75), transparent 70%)' }}
          aria-hidden
        />

        <Link to="/entrar" className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-ouro/40 bg-ouro/10">
            <Icone nome="shield" className="text-[23px] text-[rgb(245_197_24)]" />
          </span>
          <span>
            <span className="block text-sm font-extrabold uppercase tracking-[0.18em] text-[rgb(245_197_24)]">
              {SIGLA_ORDEM}
            </span>
            <span className="block text-xs text-white/45">{NOME_ORDEM}</span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[rgb(245_197_24)]">
            Plataforma Institucional
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white xl:text-4xl">
            Toda a sua relação com a Ordem em um só lugar.
          </h2>
          <p className="mt-4 text-white/60">{LEMA_ORDEM}</p>

          <ul className="mt-8 space-y-3">
            {[
              { icone: 'badge', texto: 'Carteira de membro digital e verificável' },
              { icone: 'school', texto: 'Trilhas de formação filosófica e política' },
              { icone: 'gavel', texto: 'Propostas, deliberação e participação' },
              { icone: 'hub', texto: 'Organização territorial por Núcleos' },
            ].map((i) => (
              <li key={i.icone} className="flex items-center gap-3 text-sm text-white/75">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5">
                  <Icone nome={i.icone} className="text-[17px] text-[rgb(245_197_24)]" />
                </span>
                {i.texto}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/30">
          Acesso restrito aos membros. O uso é registrado para fins de auditoria institucional.
        </p>
      </aside>

      <main className="flex flex-col justify-center bg-surface px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <Link to="/entrar" className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink">
              <Icone nome="shield" className="text-[22px] text-[rgb(245_197_24)]" />
            </span>
            <span>
              <span className="block text-sm font-extrabold uppercase tracking-[0.16em] text-ink">
                {SIGLA_ORDEM}
              </span>
              <span className="block text-xs text-ink-faint">{NOME_ORDEM}</span>
            </span>
          </Link>

          <h1 className="text-titulo text-ink">{titulo}</h1>
          <p className="mt-1.5 text-sm text-ink-soft">{descricao}</p>

          <div className="mt-7">{children}</div>

          {rodape && <div className="mt-7">{rodape}</div>}
        </div>
      </main>
    </div>
  );
}
