import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type TipoAviso = 'sucesso' | 'erro' | 'info' | 'atencao';

interface Aviso {
  id: number;
  tipo: TipoAviso;
  titulo: string;
  descricao?: string;
}

interface ValorAviso {
  avisar: (tipo: TipoAviso, titulo: string, descricao?: string) => void;
}

const Contexto = createContext<ValorAviso | null>(null);

const ICONES: Record<TipoAviso, string> = {
  sucesso: 'check_circle',
  erro: 'error',
  info: 'info',
  atencao: 'warning',
};

const CORES: Record<TipoAviso, string> = {
  sucesso: 'text-positivo',
  erro: 'text-critico',
  info: 'text-info',
  atencao: 'text-atencao',
};

export function ProvedorAviso({ children }: { children: ReactNode }) {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const proximo = useRef(1);

  const avisar = useCallback<ValorAviso['avisar']>((tipo, titulo, descricao) => {
    const id = proximo.current++;
    setAvisos((atual) => [...atual, { id, tipo, titulo, descricao }]);
    window.setTimeout(() => setAvisos((atual) => atual.filter((a) => a.id !== id)), 4200);
  }, []);

  const valor = useMemo(() => ({ avisar }), [avisar]);

  return (
    <Contexto.Provider value={valor}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[80] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end"
        role="status"
        aria-live="polite"
      >
        {avisos.map((a) => (
          <div
            key={a.id}
            className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-card border border-line bg-surface-card p-4 shadow-elevado"
          >
            <span className={cn('icone icone-preenchido text-[20px]', CORES[a.tipo])}>
              {ICONES[a.tipo]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{a.titulo}</p>
              {a.descricao && <p className="mt-0.5 text-sm text-ink-soft">{a.descricao}</p>}
            </div>
            <button
              type="button"
              onClick={() => setAvisos((atual) => atual.filter((x) => x.id !== a.id))}
              className="text-ink-faint transition hover:text-ink"
              aria-label="Fechar aviso"
            >
              <span className="icone text-[18px]">close</span>
            </button>
          </div>
        ))}
      </div>
    </Contexto.Provider>
  );
}

export function useAviso(): ValorAviso {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error('useAviso precisa estar dentro de <ProvedorAviso>');
  return ctx;
}
