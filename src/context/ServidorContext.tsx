import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { descobrirServidor } from '@/lib/api';
import type { EstadoServidor } from '@/lib/api';

/**
 * Em que modo a plataforma esta rodando.
 *
 * A deteccao acontece uma vez, na partida, e vale para toda a sessao:
 *
 *   servidor       ha back-end em PHP instalado; a autenticacao passa por ele
 *   nao-instalado  ha back-end, mas o instalador ainda nao foi concluido
 *   demonstracao   nao ha back-end; a aplicacao roda sobre o armazenamento
 *                  local, com a massa de exemplo
 *
 * O terceiro caso nao e uma falha: e como as telas sao avaliadas antes de
 * haver hospedagem, e como funcionam a pagina unica e a publicacao estatica.
 */
interface ValorServidor extends EstadoServidor {
  procurando: boolean;
  noServidor: boolean;
}

const Contexto = createContext<ValorServidor | null>(null);

const INICIAL: EstadoServidor = {
  modo: 'demonstracao',
  sistema: '',
  organizacao: '',
  instalador: null,
};

export function ProvedorServidor({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoServidor>(INICIAL);
  const [procurando, setProcurando] = useState(true);

  useEffect(() => {
    let vivo = true;
    descobrirServidor().then((resultado) => {
      if (!vivo) return;
      setEstado(resultado);
      setProcurando(false);
    });
    return () => {
      vivo = false;
    };
  }, []);

  const valor = useMemo<ValorServidor>(
    () => ({ ...estado, procurando, noServidor: estado.modo === 'servidor' }),
    [estado, procurando],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useServidor(): ValorServidor {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error('useServidor precisa estar dentro de <ProvedorServidor>');
  return ctx;
}
