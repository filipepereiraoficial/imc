import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { compacto, moeda, numero } from '@/lib/formato';
import { useLargura } from '@/lib/useLargura';
import { Icone } from './Icone';

/**
 * Camada de visualizacao de dados.
 *
 * Regras aplicadas (ver docs/DESIGN-SYSTEM.md):
 *  - eixo unico, nunca duas escalas no mesmo grafico;
 *  - series categoricas em ordem fixa (--viz-serie-1, --viz-serie-2), validadas
 *    para daltonismo nos dois temas;
 *  - comparacoes de grandeza usam um unico matiz, com rotulo direto no valor;
 *  - legenda sempre presente a partir de duas series;
 *  - toda figura oferece visao em tabela como alternativa acessivel.
 */

/* ------------------------------------------------------------------ */
/* Cartao de indicador                                                 */
/* ------------------------------------------------------------------ */

export interface Variacao {
  valor: number;
  rotulo: string;
  /** Um aumento e desejavel? Despesas invertem o sinal. */
  aumentoEBom?: boolean;
}

export function CartaoEstatistica({
  rotulo,
  valor,
  icone,
  variacao,
  detalhe,
  destaque,
  className,
}: {
  rotulo: string;
  valor: string;
  icone?: string;
  variacao?: Variacao;
  detalhe?: string;
  destaque?: boolean;
  className?: string;
}) {
  // Variacao praticamente nula e informacao neutra: nao merece cor de estado.
  const estavel = variacao ? Math.abs(variacao.valor) < 0.05 : false;
  const bom = variacao ? (variacao.aumentoEBom ?? true) === variacao.valor >= 0 : true;
  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-3 rounded-card border p-5 shadow-suave',
        destaque ? 'border-ouro/40 bg-ouro-wash' : 'border-line bg-surface-card',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="rotulo">{rotulo}</p>
        {icone && (
          <span
            className={cn(
              'grid h-8 w-8 shrink-0 place-items-center rounded-lg',
              destaque ? 'bg-ouro/20 text-[rgb(var(--c-gold-deep))]' : 'bg-surface-muted text-ink-soft',
            )}
          >
            <Icone nome={icone} className="text-[18px]" />
          </span>
        )}
      </div>
      <p className="text-titulo leading-none text-ink">{valor}</p>
      {variacao ? (
        <p
          className={cn('flex items-center gap-1 text-xs font-semibold', estavel && 'text-ink-faint')}
          style={estavel ? undefined : { color: bom ? 'var(--viz-bom)' : 'var(--viz-critico)' }}
        >
          <Icone
            nome={estavel ? 'trending_flat' : variacao.valor >= 0 ? 'trending_up' : 'trending_down'}
            className="text-[15px]"
          />
          {estavel ? (
            <>estável <span className="font-medium text-ink-faint">{variacao.rotulo}</span></>
          ) : (
            <>
              {variacao.valor >= 0 ? '+' : ''}
              {variacao.valor.toFixed(1)}%{' '}
              <span className="font-medium text-ink-faint">{variacao.rotulo}</span>
            </>
          )}
        </p>
      ) : (
        detalhe && <p className="text-xs text-ink-faint">{detalhe}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Envelope de grafico                                                 */
/* ------------------------------------------------------------------ */

export function CartaoGrafico({
  titulo,
  descricao,
  legenda,
  acao,
  tabela,
  children,
  className,
}: {
  titulo: string;
  descricao?: string;
  legenda?: ReactNode;
  acao?: ReactNode;
  /** Visao alternativa em tabela, exigida para acessibilidade. */
  tabela?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const [verTabela, setVerTabela] = useState(false);
  return (
    <section className={cn('rounded-card border border-line bg-surface-card p-5 shadow-suave', className)}>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-secao text-ink">{titulo}</h3>
          {descricao && <p className="mt-0.5 text-sm text-ink-soft">{descricao}</p>}
        </div>
        <div className="flex items-center gap-1">
          {acao}
          {tabela && (
            <button
              type="button"
              onClick={() => setVerTabela((v) => !v)}
              aria-pressed={verTabela}
              className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-ink-soft transition hover:bg-surface-muted hover:text-ink"
            >
              <Icone nome={verTabela ? 'bar_chart' : 'table_rows'} className="text-[16px]" />
              {verTabela ? 'Ver gráfico' : 'Ver tabela'}
            </button>
          )}
        </div>
      </header>
      {legenda && <div className="mt-3">{legenda}</div>}
      <div className="mt-4">{verTabela && tabela ? tabela : children}</div>
    </section>
  );
}

export function Legenda({ itens }: { itens: { rotulo: string; cor: string }[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
      {itens.map((i) => (
        <li key={i.rotulo} className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: i.cor }} />
          {i.rotulo}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Barras agrupadas — duas series ao longo do tempo                    */
/* ------------------------------------------------------------------ */

export interface PontoDuplo {
  rotulo: string;
  serieA: number;
  serieB: number;
}

export function GraficoBarrasDuplas({
  dados,
  nomeA,
  nomeB,
  formatar = (v: number) => moeda(v),
  altura = 240,
}: {
  dados: PontoDuplo[];
  nomeA: string;
  nomeB: string;
  formatar?: (v: number) => string;
  altura?: number;
}) {
  const { ref, largura } = useLargura<HTMLDivElement>();
  const [ativo, setAtivo] = useState<number | null>(null);

  const margem = { topo: 12, direita: 8, baixo: 26, esquerda: 46 };
  const larguraPlot = Math.max(120, largura - margem.esquerda - margem.direita);
  const alturaPlot = altura - margem.topo - margem.baixo;

  const maximo = Math.max(1, ...dados.flatMap((d) => [d.serieA, d.serieB]));
  const escala = (v: number) => (v / maximo) * alturaPlot;

  const passo = larguraPlot / Math.max(1, dados.length);
  const larguraGrupo = Math.min(56, passo * 0.62);
  const larguraBarra = Math.max(4, (larguraGrupo - 2) / 2); // 2px de respiro entre as barras
  const marcas = [0, 0.5, 1].map((f) => maximo * f);

  return (
    <div ref={ref} className="relative">
      <svg
        width={largura}
        height={altura}
        role="img"
        aria-label={`${nomeA} e ${nomeB} por mês`}
        onMouseLeave={() => setAtivo(null)}
      >
        {marcas.map((m, i) => {
          const y = margem.topo + alturaPlot - escala(m);
          return (
            <g key={i}>
              <line
                x1={margem.esquerda}
                x2={largura - margem.direita}
                y1={y}
                y2={y}
                stroke={i === 0 ? 'var(--viz-eixo)' : 'var(--viz-grade)'}
                strokeWidth={1}
              />
              <text
                x={margem.esquerda - 8}
                y={y + 4}
                textAnchor="end"
                fontSize={11}
                fill="var(--viz-rotulo)"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {compacto(m)}
              </text>
            </g>
          );
        })}

        {dados.map((d, i) => {
          const centro = margem.esquerda + passo * i + passo / 2;
          const inicio = centro - larguraGrupo / 2;
          const base = margem.topo + alturaPlot;
          const barras = [
            { v: d.serieA, x: inicio, cor: 'var(--viz-serie-1)' },
            { v: d.serieB, x: inicio + larguraBarra + 2, cor: 'var(--viz-serie-2)' },
          ];
          return (
            <g
              key={d.rotulo + i}
              onMouseEnter={() => setAtivo(i)}
              onFocus={() => setAtivo(i)}
              tabIndex={0}
              role="group"
              aria-label={`${d.rotulo}: ${nomeA} ${formatar(d.serieA)}, ${nomeB} ${formatar(d.serieB)}`}
            >
              <rect
                x={margem.esquerda + passo * i}
                y={margem.topo}
                width={passo}
                height={alturaPlot}
                fill={ativo === i ? 'rgb(var(--c-ink) / 0.04)' : 'transparent'}
              />
              {barras.map((b, j) => {
                const h = Math.max(2, escala(b.v));
                return (
                  <rect
                    key={j}
                    x={b.x}
                    y={base - h}
                    width={larguraBarra}
                    height={h}
                    rx={4}
                    fill={b.cor}
                    opacity={ativo === null || ativo === i ? 1 : 0.42}
                  />
                );
              })}
              <text
                x={centro}
                y={altura - 8}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill="var(--viz-rotulo)"
              >
                {d.rotulo}
              </text>
            </g>
          );
        })}
      </svg>

      {ativo !== null && dados[ativo] && (
        <div
          className="pointer-events-none absolute top-2 z-10 min-w-[9rem] rounded-xl border border-line bg-surface-card p-3 shadow-elevado"
          style={{
            left: Math.min(
              Math.max(0, margem.esquerda + passo * ativo + passo / 2 - 72),
              Math.max(0, largura - 160),
            ),
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">{dados[ativo].rotulo}</p>
          <p className="mt-1.5 flex items-center gap-2 text-sm text-ink">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: 'var(--viz-serie-1)' }} />
            {nomeA}: <strong className="ml-auto tabular-nums">{formatar(dados[ativo].serieA)}</strong>
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-ink">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: 'var(--viz-serie-2)' }} />
            {nomeB}: <strong className="ml-auto tabular-nums">{formatar(dados[ativo].serieB)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Barras ranqueadas — grandeza em matiz unico                         */
/* ------------------------------------------------------------------ */

export interface ItemRanqueado {
  rotulo: string;
  valor: number;
  cor?: string;
}

export function GraficoBarrasRanqueadas({
  dados,
  formatar = (v: number) => numero(v),
  limite = 8,
  usarCorDoItem,
}: {
  dados: ItemRanqueado[];
  formatar?: (v: number) => string;
  limite?: number;
  /** Usa a cor de identidade do item em vez do matiz unico de grandeza. */
  usarCorDoItem?: boolean;
}) {
  const visiveis = useMemo(
    () => [...dados].sort((a, b) => b.valor - a.valor).slice(0, limite),
    [dados, limite],
  );
  const maximo = Math.max(1, ...visiveis.map((d) => d.valor));

  if (visiveis.length === 0) {
    return <p className="py-8 text-center text-sm text-ink-faint">Sem dados no período.</p>;
  }

  return (
    <ul className="space-y-2.5">
      {visiveis.map((d) => (
        <li key={d.rotulo}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate font-medium text-ink">{d.rotulo}</span>
            <span className="shrink-0 font-bold tabular-nums text-ink">{formatar(d.valor)}</span>
          </div>
          <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                // Zero nao ganha barra minima: uma barra visivel para valor nulo
                // engana a leitura.
                width: d.valor <= 0 ? '0%' : `${Math.max(2, (d.valor / maximo) * 100)}%`,
                backgroundColor: usarCorDoItem && d.cor ? d.cor : 'var(--viz-sequencial)',
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Tabela de apoio para qualquer figura — atende a exigencia de acessibilidade. */
export function TabelaDeApoio({
  colunas,
  linhas,
}: {
  colunas: string[];
  linhas: (string | number)[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line">
            {colunas.map((c) => (
              <th key={c} scope="col" className="px-3 py-2 text-left text-rotulo uppercase text-ink-faint">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {linha.map((celula, j) => (
                <td
                  key={j}
                  className={cn('px-3 py-2 text-ink', j > 0 && 'text-right tabular-nums')}
                >
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
