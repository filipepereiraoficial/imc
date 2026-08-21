import { useMemo } from 'react';
import { useDados } from '@/context/DadosContext';
import { fluxoMensal, nucleoPorId, porCategoria, resumoFinanceiro } from '@/lib/consultas';
import { data as formatarData, moeda, numero } from '@/lib/formato';
import {
  Cartao,
  CabecalhoCartao,
  CartaoEstatistica,
  CartaoGrafico,
  GraficoBarrasDuplas,
  GraficoBarrasRanqueadas,
  Icone,
  Legenda,
  TabelaDeApoio,
  Vazio,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';
import { NOME_ORDEM } from '@/config';

/**
 * Portal Geral de Transparência Financeira da Ordem (PGTFO).
 *
 * Criado pelo Estatuto Social, Art. 12, § 4.º, que sujeita a faculdade de
 * remunerar dirigentes à "inegociável obrigação de ampla transparência
 * contábil", devendo os vencimentos figurar "de forma acessível e
 * discriminada".
 *
 * Diferente do painel da Tesouraria, esta área é aberta a todo Eunomita: a
 * transparência é dever da Ordem perante os seus (Est. Art. 6.º), não
 * concessão da administração.
 */
export function Transparencia() {
  const { base } = useDados();

  const resumo = useMemo(() => resumoFinanceiro(base), [base]);
  const fluxo = useMemo(() => fluxoMensal(base, 12), [base]);
  const receitas = useMemo(() => porCategoria(base, 'receita'), [base]);
  const despesas = useMemo(() => porCategoria(base, 'despesa'), [base]);

  const porNucleo = useMemo(
    () =>
      base.nucleos
        .map((n) => ({
          rotulo: n.nome.replace('Núcleo ', ''),
          valor: base.lancamentos
            .filter((l) => l.nucleoId === n.id && l.tipo === 'receita' && l.situacao !== 'cancelado')
            .reduce((s, l) => s + l.valor, 0),
        }))
        .filter((n) => n.valor > 0),
    [base],
  );

  // Est. Art. 12 — a remuneração de dirigentes, quando houver, é discriminada
  // aqui. A ausência de lançamentos nesta rubrica significa gestão voluntária.
  const remuneracoes = useMemo(
    () =>
      base.lancamentos.filter(
        (l) => l.tipo === 'despesa' && /remunera|vencimento|honorári/i.test(l.descricao),
      ),
    [base.lancamentos],
  );

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Portal Geral de Transparência Financeira"
        descricao={`Prestação de contas aberta a todos os Eunomitas da ${NOME_ORDEM}, nos termos do Estatuto Social.`}
      />

      <Cartao destaque>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ouro/20 text-[rgb(var(--c-gold-deep))]">
            <Icone nome="gavel" className="text-[20px]" />
          </span>
          <p className="text-sm leading-relaxed text-ink-soft">
            <strong className="text-ink">Estatuto Social, Art. 12, § 4.º.</strong> A aplicação de
            qualquer modalidade de remuneração sujeita-se à inegociável obrigação de ampla
            transparência contábil, devendo os vencimentos percebidos por cada dirigente, em todos
            os âmbitos, figurar de forma acessível e discriminada neste Portal.
          </p>
        </div>
      </Cartao>

      <div className="grid gap-3 sm:grid-cols-2 [&>*]:min-w-0 xl:grid-cols-4">
        <CartaoEstatistica
          rotulo="Saldo consolidado"
          valor={moeda(resumo.saldoTotal)}
          icone="account_balance"
          detalhe="Soma das contas institucionais"
          destaque
        />
        <CartaoEstatistica rotulo="Receitas do mês" valor={moeda(resumo.receitas)} icone="trending_up" />
        <CartaoEstatistica rotulo="Despesas do mês" valor={moeda(resumo.despesas)} icone="trending_down" />
        <CartaoEstatistica
          rotulo="Resultado do mês"
          valor={moeda(resumo.saldo)}
          icone="savings"
          detalhe={resumo.saldo >= 0 ? 'Superávit no período' : 'Déficit no período'}
        />
      </div>

      <Cartao semPadding>
        <div className="p-5">
          <CabecalhoCartao
            titulo="Remuneração de dirigentes"
            descricao="Art. 12 — faculdade condicionada a proposta formal, dotação orçamentária e aprovação pelos órgãos competentes."
            icone="badge"
          />
        </div>
        {remuneracoes.length === 0 ? (
          <div className="px-5 pb-5">
            <Vazio
              icone="volunteer_activism"
              titulo="Nenhuma remuneração no período"
              descricao="Não há vencimentos lançados para dirigentes da Diretoria Executiva, dos Conselhos Superiores ou das Coordenadorias de Gestão Local. A gestão permanece voluntária."
            />
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {remuneracoes.map((l) => (
              <li key={l.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{l.descricao}</p>
                  <p className="truncate text-xs text-ink-faint">
                    {formatarData(l.data)} ·{' '}
                    {nucleoPorId(base, l.nucleoId)?.nome ?? 'Âmbito nacional'}
                  </p>
                </div>
                <span className="shrink-0 font-bold tabular-nums text-ink">{moeda(l.valor)}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="border-t border-line px-5 py-3 text-xs text-ink-faint">
          Teto: o montante acumulado não pode ultrapassar 3/4 do limite de remuneração aplicável aos
          servidores do Poder Executivo Federal (Art. 12, § 1.º). No âmbito local, o teto está
          condicionado à arrecadação do próprio Núcleo, sem ônus ao caixa geral (§ 3.º).
        </p>
      </Cartao>

      <CartaoGrafico
        titulo="Evolução de doze meses"
        descricao="Receitas e despesas de toda a Ordem."
        legenda={
          <Legenda
            itens={[
              { rotulo: 'Receitas', cor: 'var(--viz-serie-1)' },
              { rotulo: 'Despesas', cor: 'var(--viz-serie-2)' },
            ]}
          />
        }
        tabela={
          <TabelaDeApoio
            colunas={['Mês', 'Receitas', 'Despesas', 'Resultado']}
            linhas={fluxo.map((p) => [
              p.rotulo,
              moeda(p.receitas),
              moeda(p.despesas),
              moeda(p.receitas - p.despesas),
            ])}
          />
        }
      >
        <GraficoBarrasDuplas
          dados={fluxo.map((p) => ({ rotulo: p.rotulo, serieA: p.receitas, serieB: p.despesas }))}
          nomeA="Receitas"
          nomeB="Despesas"
        />
      </CartaoGrafico>

      <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-2">
        <CartaoGrafico
          titulo="Origem das receitas"
          descricao="Acumulado dos últimos seis meses."
          tabela={
            <TabelaDeApoio
              colunas={['Categoria', 'Valor']}
              linhas={receitas.map((c) => [c.rotulo, moeda(c.valor)])}
            />
          }
        >
          <GraficoBarrasRanqueadas dados={receitas} formatar={moeda} />
        </CartaoGrafico>

        <CartaoGrafico
          titulo="Aplicação dos recursos"
          descricao="Art. 11 — aplicação exclusiva nas finalidades institucionais."
          tabela={
            <TabelaDeApoio
              colunas={['Categoria', 'Valor']}
              linhas={despesas.map((c) => [c.rotulo, moeda(c.valor)])}
            />
          }
        >
          <GraficoBarrasRanqueadas dados={despesas} formatar={moeda} />
        </CartaoGrafico>
      </div>

      {porNucleo.length > 0 && (
        <CartaoGrafico
          titulo="Arrecadação por Núcleo"
          descricao="Receitas acumuladas de cada unidade territorial."
          tabela={
            <TabelaDeApoio
              colunas={['Núcleo', 'Arrecadação']}
              linhas={porNucleo.map((n) => [n.rotulo, moeda(n.valor)])}
            />
          }
        >
          <GraficoBarrasRanqueadas dados={porNucleo} formatar={moeda} limite={12} />
        </CartaoGrafico>
      )}

      <Cartao>
        <CabecalhoCartao titulo="Vedações" icone="block" />
        <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
          {[
            'É vedada qualquer distribuição de resultado, patrimônio ou vantagem econômica a dirigentes, associados ou terceiros (Art. 11).',
            'Os recursos são aplicados exclusivamente na manutenção e no desenvolvimento das finalidades institucionais (Art. 11).',
            'Nenhuma modalidade de contribuição pode ser objeto de cobrança coercitiva, humilhação pública ou exposição vexatória (Códice, C106:20).',
          ].map((texto) => (
            <li key={texto} className="flex items-start gap-2.5">
              <Icone nome="block" className="mt-0.5 shrink-0 text-[16px] text-critico" />
              <span>{texto}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-line pt-3 text-xs text-ink-faint">
          Prestação anual de contas, balanço patrimonial, demonstrações financeiras e relatório de
          gestão na forma do Art. 13, sob fiscalização do Conselho Superior de Contas (Art. 56).
          {' '}
          {numero(base.lancamentos.length)} lançamentos registrados.
        </p>
      </Cartao>
    </div>
  );
}
