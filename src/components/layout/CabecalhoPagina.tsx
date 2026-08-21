import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Icone } from '@/components/ui';

/** Cabecalho padrao de pagina, com trilha opcional e area de acoes. */
export function CabecalhoPagina({
  titulo,
  descricao,
  acao,
  voltarPara,
  rotuloVoltar = 'Voltar',
  className,
}: {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
  voltarPara?: string;
  rotuloVoltar?: string;
  className?: string;
}) {
  return (
    <header className={cn('mb-5', className)}>
      {voltarPara && (
        <Link
          to={voltarPara}
          className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-ink-faint transition hover:text-ink"
        >
          <Icone nome="arrow_back" className="text-[18px]" />
          {rotuloVoltar}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-titulo text-ink">{titulo}</h1>
          {descricao && <p className="mt-1 max-w-leitura text-sm text-ink-soft">{descricao}</p>}
        </div>
        {acao && <div className="flex shrink-0 flex-wrap gap-2">{acao}</div>}
      </div>
    </header>
  );
}
