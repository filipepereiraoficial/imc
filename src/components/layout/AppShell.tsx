import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useTema } from '@/context/TemaContext';
import { cn } from '@/lib/cn';
import { mensagensNaoLidas, naoLidas } from '@/lib/consultas';
import { primeiroNome } from '@/lib/formato';
import { Avatar, Gaveta, Icone } from '@/components/ui';
import { NOME_ORDEM, SIGLA_ORDEM } from '@/config';
import { NAV_ADMINISTRATIVA, NAV_MOBILE, NAV_PRINCIPAL } from './navegacao';
import type { ItemNav } from './navegacao';
import { BuscaGlobal } from './BuscaGlobal';

export function AppShell() {
  const { membro, cargo, temAlguma, sair } = useAuth();
  const { base } = useDados();
  const { escuroAtivo, definirTema } = useTema();
  const local = useLocation();
  const navegar = useNavigate();
  const [menuMovel, setMenuMovel] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);

  const contadores = useMemo(
    () => ({
      notificacoes: membro ? naoLidas(base, membro.id) : 0,
      mensagens: membro ? mensagensNaoLidas(base, membro.id) : 0,
      cadastros: base.membros.filter((m) => m.situacao === 'pendente').length,
    }),
    [base, membro],
  );

  const itensAdmin = useMemo(
    () => NAV_ADMINISTRATIVA.itens.filter((i) => !i.permissoes || temAlguma(i.permissoes)),
    [temAlguma],
  );

  useEffect(() => {
    setMenuMovel(false);
  }, [local.pathname]);

  // Atalho de busca global.
  useEffect(() => {
    const ouvir = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setBuscaAberta(true);
      }
    };
    document.addEventListener('keydown', ouvir);
    return () => document.removeEventListener('keydown', ouvir);
  }, []);

  if (!membro) return null;

  const listaLateral = (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-4" aria-label="Navegação principal">
      <ul className="space-y-0.5">
        {NAV_PRINCIPAL.map((item) => (
          <li key={item.para}>
            <LinkNav item={item} contagem={item.contador ? contadores[item.contador] : 0} />
          </li>
        ))}
      </ul>

      {itensAdmin.length > 0 && (
        <div>
          <p className="rotulo px-3 pb-2">{NAV_ADMINISTRATIVA.titulo}</p>
          <ul className="space-y-0.5">
            {itensAdmin.map((item) => (
              <li key={item.para}>
                <LinkNav item={item} contagem={item.contador ? contadores[item.contador] : 0} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto space-y-0.5 border-t border-line pt-4">
        <LinkNav item={{ rotulo: 'Configurações', para: '/configuracoes', icone: 'settings' }} contagem={0} />
        <button
          type="button"
          onClick={() => {
            sair();
            navegar('/entrar');
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-surface-muted hover:text-critico"
        >
          <Icone nome="logout" className="text-[20px]" />
          Sair da sessão
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-dvh bg-surface">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-xl focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-inverse"
      >
        Ir para o conteúdo
      </a>

      {/* Barra lateral fixa — tablet largo e desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[17rem] flex-col border-r border-line bg-surface-card lg:flex">
        <Link to="/hoje" className="flex items-center gap-3 border-b border-line p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink">
            <Icone nome="shield" className="text-[21px] text-[rgb(245_197_24)]" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-extrabold uppercase tracking-[0.14em] text-ink">
              {SIGLA_ORDEM}
            </span>
            <span className="block truncate text-[0.7rem] text-ink-faint">{NOME_ORDEM}</span>
          </span>
        </Link>
        {listaLateral}
        <Link
          to="/perfil"
          className="flex items-center gap-3 border-t border-line p-4 transition hover:bg-surface-muted"
        >
          <Avatar nome={membro.nomeCompleto} fotoUrl={membro.fotoUrl} tamanho="sm" nivel={membro.nivel} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-ink">{membro.nomeExibicao}</span>
            <span className="block truncate text-xs text-ink-faint">{cargo?.nome}</span>
          </span>
          <Icone nome="chevron_right" className="text-[18px] text-ink-faint" />
        </Link>
      </aside>

      {/* Gaveta de navegação — celular e tablet */}
      <Gaveta aberta={menuMovel} aoFechar={() => setMenuMovel(false)} lado="esquerda" titulo={SIGLA_ORDEM}>
        <div className="flex min-h-full flex-col">{listaLateral}</div>
      </Gaveta>

      <div className="lg:pl-[17rem]">
        <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-app items-center gap-2 px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setMenuMovel(true)}
              aria-label="Abrir menu"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink-soft transition hover:bg-surface-muted lg:hidden"
            >
              <Icone nome="menu" className="text-[22px]" />
            </button>

            <Link to="/hoje" className="flex items-center gap-2 lg:hidden">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink">
                <Icone nome="shield" className="text-[17px] text-[rgb(245_197_24)]" />
              </span>
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink">
                {SIGLA_ORDEM}
              </span>
            </Link>

            <p className="hidden min-w-0 flex-1 truncate text-sm text-ink-soft lg:block">
              Bem-vindo, <strong className="font-bold text-ink">{primeiroNome(membro.nomeCompleto)}</strong>.
            </p>

            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBuscaAberta(true)}
                aria-label="Busca global"
                title="Busca global (Ctrl+K)"
                className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition hover:bg-surface-muted hover:text-ink"
              >
                <Icone nome="search" className="text-[21px]" />
              </button>
              <button
                type="button"
                onClick={() => definirTema(escuroAtivo ? 'claro' : 'escuro')}
                aria-label={escuroAtivo ? 'Usar tema claro' : 'Usar tema escuro'}
                className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition hover:bg-surface-muted hover:text-ink"
              >
                <Icone nome={escuroAtivo ? 'light_mode' : 'dark_mode'} className="text-[21px]" />
              </button>
              <Link
                to="/notificacoes"
                aria-label={`Notificações${contadores.notificacoes ? `: ${contadores.notificacoes} não lidas` : ''}`}
                className="relative grid h-10 w-10 place-items-center rounded-full text-ink-soft transition hover:bg-surface-muted hover:text-ink"
              >
                <Icone nome="notifications" className="text-[21px]" />
                {contadores.notificacoes > 0 && (
                  <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-critico px-1 text-[10px] font-bold text-white">
                    {contadores.notificacoes}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </header>

        <main id="conteudo" className="mx-auto max-w-app px-4 pb-28 pt-5 sm:px-6 lg:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Navegação inferior — aplicativo móvel */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface-card/95 backdrop-blur-md lg:hidden"
        aria-label="Navegação do aplicativo"
      >
        <ul className="mx-auto flex max-w-lg items-stretch area-segura-inferior">
          {NAV_MOBILE.map((item) => (
            <li key={item.para} className="flex-1">
              <NavLink
                to={item.para}
                className={({ isActive }) =>
                  cn(
                    'relative flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-bold uppercase tracking-wide transition-colors',
                    isActive ? 'text-ink' : 'text-ink-faint',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative">
                      <Icone nome={item.icone} preenchido={isActive} className="text-[23px]" />
                      {item.para === '/perfil' && contadores.notificacoes + contadores.mensagens > 0 && (
                        <span className="absolute -right-1 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface-card bg-critico" />
                      )}
                    </span>
                    {item.rotulo}
                    {isActive && (
                      <span className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-ouro" aria-hidden />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <BuscaGlobal aberta={buscaAberta} aoFechar={() => setBuscaAberta(false)} />
    </div>
  );
}

function LinkNav({ item, contagem }: { item: ItemNav; contagem: number }) {
  return (
    <NavLink
      to={item.para}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
          isActive
            ? 'bg-ouro-wash text-ink shadow-suave'
            : 'text-ink-soft hover:bg-surface-muted hover:text-ink',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icone
            nome={item.icone}
            preenchido={isActive}
            className={cn('text-[20px]', isActive && 'text-[rgb(var(--c-gold-deep))] dark:text-ouro')}
          />
          <span className="min-w-0 flex-1 truncate">{item.rotulo}</span>
          {contagem > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-critico px-1.5 text-[11px] font-bold text-white">
              {contagem}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
