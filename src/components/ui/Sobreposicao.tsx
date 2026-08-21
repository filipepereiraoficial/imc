import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';
import { BotaoIcone } from './Botao';

function useFecharComEsc(aberto: boolean, aoFechar: () => void) {
  useEffect(() => {
    if (!aberto) return;
    const ouvir = (e: KeyboardEvent) => {
      if (e.key === 'Escape') aoFechar();
    };
    document.addEventListener('keydown', ouvir);
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', ouvir);
      document.body.style.overflow = anterior;
    };
  }, [aberto, aoFechar]);
}

interface ModalProps {
  aberto: boolean;
  aoFechar: () => void;
  titulo: string;
  descricao?: string;
  children: ReactNode;
  rodape?: ReactNode;
  largura?: 'sm' | 'md' | 'lg' | 'xl';
}

const LARGURAS = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-xl',
  lg: 'sm:max-w-3xl',
  xl: 'sm:max-w-5xl',
};

/** Dialogo modal. No mobile ancora na base como folha deslizante. */
export function Modal({ aberto, aoFechar, titulo, descricao, children, rodape, largura = 'md' }: ModalProps) {
  const painel = useRef<HTMLDivElement>(null);
  useFecharComEsc(aberto, aoFechar);

  useEffect(() => {
    if (aberto) painel.current?.focus();
  }, [aberto]);

  if (!aberto) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-[2px]"
        onClick={aoFechar}
        aria-hidden
      />
      <div
        ref={painel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className={cn(
          'relative flex max-h-[92dvh] w-full flex-col rounded-t-painel border border-line bg-surface-card shadow-elevado outline-none',
          'animate-slide-up sm:animate-fade-up sm:rounded-painel',
          LARGURAS[largura],
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div className="min-w-0">
            <h2 className="text-secao text-ink">{titulo}</h2>
            {descricao && <p className="mt-1 text-sm text-ink-soft">{descricao}</p>}
          </div>
          <BotaoIcone icone="close" rotulo="Fechar" onClick={aoFechar} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
        {rodape && (
          <div className="flex flex-wrap justify-end gap-2 border-t border-line p-4 area-segura-inferior">
            {rodape}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

interface GavetaProps {
  aberta: boolean;
  aoFechar: () => void;
  titulo?: string;
  children: ReactNode;
  lado?: 'esquerda' | 'direita';
  className?: string;
}

/** Painel lateral deslizante. */
export function Gaveta({ aberta, aoFechar, titulo, children, lado = 'direita', className }: GavetaProps) {
  useFecharComEsc(aberta, aoFechar);
  if (!aberta) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-[2px]" onClick={aoFechar} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo ?? 'Painel'}
        className={cn(
          'absolute inset-y-0 flex w-[86%] max-w-sm flex-col border-line bg-surface-card shadow-elevado',
          lado === 'direita' ? 'right-0 animate-slide-in-right border-l' : 'left-0 border-r',
          className,
        )}
        style={lado === 'esquerda' ? { animation: 'slide-in-right 0.26s cubic-bezier(0.22,1,0.36,1) reverse' } : undefined}
      >
        {titulo && (
          <div className="flex items-center justify-between gap-3 border-b border-line p-4">
            <h2 className="text-secao text-ink">{titulo}</h2>
            <BotaoIcone icone="close" rotulo="Fechar" onClick={aoFechar} />
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

interface ConfirmacaoProps {
  aberto: boolean;
  aoFechar: () => void;
  aoConfirmar: () => void;
  titulo: string;
  mensagem: string;
  rotuloConfirmar?: string;
  perigo?: boolean;
}

/** Confirmacao exigida antes de acoes criticas. */
export function Confirmacao({
  aberto,
  aoFechar,
  aoConfirmar,
  titulo,
  mensagem,
  rotuloConfirmar = 'Confirmar',
  perigo,
}: ConfirmacaoProps) {
  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo={titulo}
      largura="sm"
      rodape={
        <>
          <button
            type="button"
            onClick={aoFechar}
            className="h-11 rounded-2xl border border-line-strong px-5 text-sm font-semibold text-ink transition hover:bg-surface-muted"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              aoConfirmar();
              aoFechar();
            }}
            className={cn(
              'h-11 rounded-2xl px-5 text-sm font-semibold text-white transition',
              perigo ? 'bg-critico hover:brightness-95' : 'bg-ink text-ink-inverse hover:bg-ink/90',
            )}
          >
            {rotuloConfirmar}
          </button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-ink-soft">{mensagem}</p>
    </Modal>
  );
}
