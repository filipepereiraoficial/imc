import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { criarBaseInicial } from '@/data/seed';
import { useServidor } from './ServidorContext';
import { CHAVES, gravar, ler } from '@/lib/armazenamento';
import type { BaseDados, ID, RegistroAuditoria } from '@/types';

interface ValorDados {
  base: BaseDados;
  /** Aplica uma transformacao imutavel sobre a base. */
  atualizar: (fn: (base: BaseDados) => BaseDados) => void;
  /** Registra uma acao na trilha de auditoria. */
  auditar: (entrada: Omit<RegistroAuditoria, 'id' | 'em' | 'ip'> & { ip?: string }) => void;
  /** Restaura a massa de demonstracao. */
  restaurar: () => void;
  carregando: boolean;
}

const Contexto = createContext<ValorDados | null>(null);

/**
 * Versao da forma da base persistida. Incrementar sempre que o modelo mudar de
 * maneira incompativel — a carga antiga e descartada em vez de quebrar a tela.
 */
const VERSAO_BASE = 6;

function carregarBase(): BaseDados {
  const versao = ler<number>('versao-base', 0);
  if (versao !== VERSAO_BASE) {
    const nova = criarBaseInicial();
    gravar('versao-base', VERSAO_BASE);
    gravar(CHAVES.base, nova);
    return nova;
  }
  return ler(CHAVES.base, criarBaseInicial());
}

function novoId(prefixo: string): ID {
  return `${prefixo}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Colecoes que sao configuracao de exibicao, e nao conteudo da Ordem.
 *
 * Niveis, conquistas e regras de XP descrevem como a participacao e
 * apresentada; nao ha nada de uma Ordem real nelas. Sobrevivem ao corte
 * porque uma instalacao nova precisa delas para desenhar as telas.
 */
const CONFIGURACAO_DE_EXIBICAO = ['niveis', 'conquistas', 'regrasXP'] as const;

/**
 * Base vazia para a instalacao com servidor.
 *
 * Sem isto, uma Ordem recem-instalada abriria com quarenta e dois membros
 * fictícios e um feed de exemplo — numeros que pareceriam seus e nao sao.
 * O que vem do servidor entra depois, colecao por colecao.
 */
function baseVaziaComConfiguracao(): BaseDados {
  const semente = criarBaseInicial();
  const vazia = Object.fromEntries(
    Object.keys(semente).map((chave) => [chave, []]),
  ) as unknown as BaseDados;
  for (const chave of CONFIGURACAO_DE_EXIBICAO) {
    (vazia as unknown as Record<string, unknown>)[chave] = semente[chave];
  }
  return vazia;
}

export function ProvedorDados({ children }: { children: ReactNode }) {
  const { noServidor, procurando } = useServidor();
  const [base, setBase] = useState<BaseDados>(carregarBase);
  const [carregando, setCarregando] = useState(true);
  const gravacaoPendente = useRef<number | null>(null);
  const trocouDeModo = useRef(false);

  // Assim que se sabe que ha servidor, a massa de demonstracao sai de cena.
  useEffect(() => {
    if (procurando || !noServidor || trocouDeModo.current) return;
    trocouDeModo.current = true;
    setBase(baseVaziaComConfiguracao());
  }, [procurando, noServidor]);

  // Pequeno atraso inicial para que os estados de carregamento sejam reais
  // e a interface seja exercitada como sera com uma API remota.
  useEffect(() => {
    const t = window.setTimeout(() => setCarregando(false), 260);
    return () => window.clearTimeout(t);
  }, []);

  // Persistencia com debounce: evita serializar a base a cada tecla digitada.
  // Com servidor nao ha o que persistir aqui: os dados sao dele, e uma copia
  // no navegador so criaria uma segunda verdade, desatualizada.
  useEffect(() => {
    if (noServidor) return;
    if (gravacaoPendente.current) window.clearTimeout(gravacaoPendente.current);
    gravacaoPendente.current = window.setTimeout(() => gravar(CHAVES.base, base), 400);
    return () => {
      if (gravacaoPendente.current) window.clearTimeout(gravacaoPendente.current);
    };
  }, [base, noServidor]);

  // O debounce nao pode custar dados: se a aba for fechada, recarregada ou
  // ocultada dentro da janela de espera, a gravacao e antecipada.
  const baseAtual = useRef(base);
  baseAtual.current = base;
  useEffect(() => {
    const descarregar = () => {
      if (noServidor) return;
      if (gravacaoPendente.current) {
        window.clearTimeout(gravacaoPendente.current);
        gravacaoPendente.current = null;
      }
      gravar(CHAVES.base, baseAtual.current);
    };
    const aoOcultar = () => {
      if (document.visibilityState === 'hidden') descarregar();
    };
    window.addEventListener('pagehide', descarregar);
    document.addEventListener('visibilitychange', aoOcultar);
    return () => {
      window.removeEventListener('pagehide', descarregar);
      document.removeEventListener('visibilitychange', aoOcultar);
    };
  }, [noServidor]);

  const atualizar = useCallback((fn: (b: BaseDados) => BaseDados) => {
    setBase((anterior) => fn(anterior));
  }, []);

  const auditar = useCallback<ValorDados['auditar']>(
    (entrada) => {
      setBase((anterior) => ({
        ...anterior,
        auditoria: [
          {
            id: novoId('au'),
            em: new Date().toISOString(),
            ip: entrada.ip ?? '—',
            membroId: entrada.membroId,
            acao: entrada.acao,
            modulo: entrada.modulo,
            detalhe: entrada.detalhe,
          },
          ...anterior.auditoria,
        ].slice(0, 400),
      }));
    },
    [],
  );

  const restaurar = useCallback(() => {
    const nova = criarBaseInicial();
    setBase(nova);
    gravar('versao-base', VERSAO_BASE);
    gravar(CHAVES.base, nova);
  }, []);

  const valor = useMemo<ValorDados>(
    () => ({ base, atualizar, auditar, restaurar, carregando }),
    [base, atualizar, auditar, restaurar, carregando],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useDados(): ValorDados {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error('useDados precisa estar dentro de <ProvedorDados>');
  return ctx;
}

export { novoId };
