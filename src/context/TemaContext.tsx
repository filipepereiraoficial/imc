import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CHAVES, gravar, ler } from '@/lib/armazenamento';

export type Tema = 'claro' | 'escuro' | 'sistema';

interface ValorTema {
  tema: Tema;
  escuroAtivo: boolean;
  definirTema: (t: Tema) => void;
}

const Contexto = createContext<ValorTema | null>(null);

function prefereEscuro(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ProvedorTema({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(() => ler<Tema>(CHAVES.tema, 'claro'));
  const [escuroSistema, setEscuroSistema] = useState(prefereEscuro);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const ouvir = (e: MediaQueryListEvent) => setEscuroSistema(e.matches);
    mq.addEventListener('change', ouvir);
    return () => mq.removeEventListener('change', ouvir);
  }, []);

  const escuroAtivo = tema === 'escuro' || (tema === 'sistema' && escuroSistema);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.classList.toggle('dark', escuroAtivo);
    raiz.classList.toggle('light', !escuroAtivo);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', escuroAtivo ? '#121110' : '#fffcf6');
  }, [escuroAtivo]);

  const definirTema = useCallback((t: Tema) => {
    setTema(t);
    gravar(CHAVES.tema, t);
  }, []);

  const valor = useMemo(() => ({ tema, escuroAtivo, definirTema }), [tema, escuroAtivo, definirTema]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useTema(): ValorTema {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error('useTema precisa estar dentro de <ProvedorTema>');
  return ctx;
}
