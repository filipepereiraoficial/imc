import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import {
  fluxoMensal,
  nucleoPorId,
  porCategoria,
  resumoFinanceiro,
} from '@/lib/consultas';
import { contem, data as formatarData, moeda } from '@/lib/formato';
import type { Lancamento, TipoLancamento } from '@/types';
import {
  Abas,
  AreaTexto,
  Botao,
  Campo,
  Cartao,
  CabecalhoCartao,
  CampoBusca,
  CartaoEstatistica,
  CartaoGrafico,
  GraficoBarrasDuplas,
  GraficoBarrasRanqueadas,
  Icone,
  Legenda,
  Modal,
  Paginacao,
  Ponto,
  Selecao,
  Selo,
  SemAcesso,
  Tabela,
  TabelaDeApoio,
  Vazio,
} from '@/components/ui';
import type { Coluna } from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const POR_PAGINA = 12;

export function Tesouraria() {
  const { base, atualizar, auditar } = useDados();
  const { membro, tem, pode } = useAuth();
  const { avisar } = useAviso();

  const [aba, setAba] = useState<'painel' | 'lancamentos' | 'contas'>('painel');
  const [termo, setTermo] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState<TipoLancamento | 'todos'>('todos');
  const [nucleoFiltro, setNucleoFiltro] = useState<string>('todos');
  const [pagina, setPagina] = useState(1);
  const [lancando, setLancando] = useState<TipoLancamento | null>(null);

  // Um dirigente de Nucleo so enxerga o proprio Nucleo.
  const restritoAoNucleo = !pode('tesouraria.visualizar', { nucleoId: null }) ? membro?.nucleoId : null;

  const filtroEscopo = (l: Lancamento) => {
    if (restritoAoNucleo) return l.nucleoId === restritoAoNucleo;
    if (nucleoFiltro === 'todos') return true;
    if (nucleoFiltro === 'nacional') return l.nucleoId === null;
    return l.nucleoId === nucleoFiltro;
  };

  const resumo = useMemo(() => resumoFinanceiro(base, filtroEscopo), [base, nucleoFiltro, restritoAoNucleo]);
  const resumoAnterior = useMemo(() => {
    const mesPassado = new Date();
    mesPassado.setMonth(mesPassado.getMonth() - 1);
    return resumoFinanceiro(base, filtroEscopo, mesPassado);
  }, [base, nucleoFiltro, restritoAoNucleo]);

  const fluxo = useMemo(() => fluxoMensal(base, 6, filtroEscopo), [base, nucleoFiltro, restritoAoNucleo]);
  const receitasPorCategoria = useMemo(() => porCategoria(base, 'receita'), [base]);
  const despesasPorCategoria = useMemo(() => porCategoria(base, 'despesa'), [base]);

  const porNucleo = useMemo(
    () =>
      base.nucleos.map((n) => ({
        rotulo: n.nome.replace('Núcleo ', ''),
        valor: base.lancamentos
          .filter((l) => l.nucleoId === n.id && l.tipo === 'receita' && l.situacao !== 'cancelado')
          .reduce((s, l) => s + l.valor, 0),
      })),
    [base],
  );

  const lancamentos = useMemo(() => {
    let itens = base.lancamentos.filter(filtroEscopo);
    if (tipoFiltro !== 'todos') itens = itens.filter((l) => l.tipo === tipoFiltro);
    if (termo) itens = itens.filter((l) => contem(l.descricao, termo));
    return itens.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }, [base, tipoFiltro, termo, nucleoFiltro, restritoAoNucleo]);

  const totalPaginas = Math.max(1, Math.ceil(lancamentos.length / POR_PAGINA));
  const paginados = lancamentos.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const variacao = (atual: number, anterior: number) =>
    anterior === 0 ? 0 : ((atual - anterior) / anterior) * 100;

  const registrar = (dados: Omit<Lancamento, 'id'>) => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      lancamentos: [{ ...dados, id: `la-${Math.random().toString(36).slice(2, 9)}` }, ...b.lancamentos],
    }));
    auditar({
      membroId: membro.id,
      acao: dados.tipo === 'receita' ? 'Registrou receita' : 'Registrou despesa',
      modulo: 'Tesouraria',
      detalhe: `${dados.descricao} — ${moeda(dados.valor)}`,
    });
    avisar('sucesso', 'Lançamento registrado', `${dados.descricao} — ${moeda(dados.valor)}`);
    setLancando(null);
  };

  const colunas: Coluna<Lancamento>[] = [
    {
      chave: 'data',
      titulo: 'Data',
      renderizar: (l) => <span className="tabular-nums text-ink-soft">{formatarData(l.data)}</span>,
    },
    {
      chave: 'descricao',
      titulo: 'Descrição',
      larguraMinima: '16rem',
      renderizar: (l) => {
        const cat = base.categoriasFinanceiras.find((c) => c.id === l.categoriaId);
        return (
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">{l.descricao}</p>
            <p className="flex items-center gap-1.5 truncate text-xs text-ink-faint">
              <Ponto cor={cat?.cor ?? '#999'} />
              {cat?.nome}
            </p>
          </div>
        );
      },
    },
    {
      chave: 'nucleo',
      titulo: 'Âmbito',
      secundaria: true,
      renderizar: (l) => nucleoPorId(base, l.nucleoId)?.nome.replace('Núcleo ', '') ?? 'Nacional',
    },
    {
      chave: 'situacao',
      titulo: 'Situação',
      secundaria: true,
      renderizar: (l) => (
        <Selo tom={l.situacao === 'liquidado' ? 'positivo' : l.situacao === 'previsto' ? 'atencao' : 'neutro'}>
          {l.situacao}
        </Selo>
      ),
    },
    {
      chave: 'valor',
      titulo: 'Valor',
      alinhamento: 'direita',
      renderizar: (l) => (
        <span
          className="font-bold tabular-nums"
          style={{ color: l.tipo === 'receita' ? 'var(--viz-bom)' : 'var(--viz-critico)' }}
        >
          {l.tipo === 'receita' ? '+' : '−'} {moeda(l.valor)}
        </span>
      ),
    },
  ];

  // O bloqueio ocorre apos os hooks para nao violar a ordem de chamada.
  if (!tem('tesouraria.visualizar')) return <SemAcesso modulo="a Tesouraria" />;

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Tesouraria"
        descricao="Gestão financeira institucional: arrecadação, custeio, fluxo de caixa e prestação de contas."
        acao={
          <>
            {tem('tesouraria.lancarReceita') && (
              <Botao variante="contorno" icone="add" onClick={() => setLancando('receita')}>
                Receita
              </Botao>
            )}
            {tem('tesouraria.lancarDespesa') && (
              <Botao variante="contorno" icone="remove" onClick={() => setLancando('despesa')}>
                Despesa
              </Botao>
            )}
          </>
        }
      />

      {restritoAoNucleo && (
        <p className="flex items-center gap-2 rounded-2xl border border-line bg-surface-muted/60 p-3 text-xs text-ink-soft">
          <Icone nome="lock" className="shrink-0 text-[16px]" />
          <span>
            Seu cargo restringe a visão financeira ao{' '}
            {nucleoPorId(base, restritoAoNucleo)?.nome ?? 'seu Núcleo'}.
          </span>
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Abas
          className="flex-1"
          itens={[
            { id: 'painel', rotulo: 'Painel', icone: 'monitoring' },
            { id: 'lancamentos', rotulo: 'Lançamentos', icone: 'receipt_long', contagem: lancamentos.length },
            { id: 'contas', rotulo: 'Contas e categorias', icone: 'account_balance' },
          ]}
          ativo={aba}
          aoMudar={setAba}
          rotuloGrupo="Seções da Tesouraria"
        />
        {!restritoAoNucleo && (
          <Selecao
            rotulo=""
            aria-label="Filtrar por âmbito"
            className="sm:w-56 [&_label]:sr-only"
            value={nucleoFiltro}
            onChange={(e) => setNucleoFiltro(e.target.value)}
          >
            <option value="todos">Todos os âmbitos</option>
            <option value="nacional">Nacional</option>
            {base.nucleos.map((n) => (
              <option key={n.id} value={n.id}>
                {n.nome}
              </option>
            ))}
          </Selecao>
        )}
      </div>

      {aba === 'painel' && (
        <div className="space-y-5">
          <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2 xl:grid-cols-4">
            <CartaoEstatistica
              rotulo="Saldo consolidado"
              valor={moeda(resumo.saldoTotal)}
              icone="account_balance"
              detalhe="Soma das contas institucionais"
              destaque
            />
            <CartaoEstatistica
              rotulo="Receitas do mês"
              valor={moeda(resumo.receitas)}
              icone="trending_up"
              variacao={{ valor: variacao(resumo.receitas, resumoAnterior.receitas), rotulo: 'vs. mês anterior' }}
            />
            <CartaoEstatistica
              rotulo="Despesas do mês"
              valor={moeda(resumo.despesas)}
              icone="trending_down"
              variacao={{
                valor: variacao(resumo.despesas, resumoAnterior.despesas),
                rotulo: 'vs. mês anterior',
                aumentoEBom: false,
              }}
            />
            <CartaoEstatistica
              rotulo="Resultado do mês"
              valor={moeda(resumo.saldo)}
              icone="savings"
              detalhe={resumo.saldo >= 0 ? 'Superávit no período' : 'Déficit no período'}
            />
          </div>

          <CartaoGrafico
            titulo="Fluxo de caixa"
            descricao="Receitas e despesas dos últimos seis meses."
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
              titulo="Receitas por categoria"
              descricao="Acumulado dos últimos seis meses."
              tabela={
                <TabelaDeApoio
                  colunas={['Categoria', 'Valor']}
                  linhas={receitasPorCategoria.map((c) => [c.rotulo, moeda(c.valor)])}
                />
              }
            >
              <GraficoBarrasRanqueadas dados={receitasPorCategoria} formatar={moeda} />
            </CartaoGrafico>

            <CartaoGrafico
              titulo="Despesas por categoria"
              descricao="Acumulado dos últimos seis meses."
              tabela={
                <TabelaDeApoio
                  colunas={['Categoria', 'Valor']}
                  linhas={despesasPorCategoria.map((c) => [c.rotulo, moeda(c.valor)])}
                />
              }
            >
              <GraficoBarrasRanqueadas dados={despesasPorCategoria} formatar={moeda} />
            </CartaoGrafico>
          </div>

          {!restritoAoNucleo && (
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
              <GraficoBarrasRanqueadas dados={porNucleo} formatar={moeda} limite={9} />
            </CartaoGrafico>
          )}
        </div>
      )}

      {aba === 'lancamentos' && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <CampoBusca valor={termo} aoMudar={setTermo} placeholder="Buscar lançamento…" className="flex-1" />
            <Abas
              itens={[
                { id: 'todos', rotulo: 'Todos' },
                { id: 'receita', rotulo: 'Receitas' },
                { id: 'despesa', rotulo: 'Despesas' },
              ]}
              ativo={tipoFiltro}
              aoMudar={(v) => {
                setTipoFiltro(v as TipoLancamento | 'todos');
                setPagina(1);
              }}
              rotuloGrupo="Tipo de lançamento"
            />
          </div>

          <Tabela
            legenda="Lançamentos financeiros"
            colunas={colunas}
            itens={paginados}
            chaveDe={(l) => l.id}
            vazio={<Cartao><Vazio icone="receipt_long" titulo="Nenhum lançamento" /></Cartao>}
            cartaoMobile={(l) => {
              const cat = base.categoriasFinanceiras.find((c) => c.id === l.categoriaId);
              return (
                <div className="rounded-card border border-line bg-surface-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-bold text-ink">{l.descricao}</p>
                      <p className="flex items-center gap-1.5 text-xs text-ink-faint">
                        <Ponto cor={cat?.cor ?? '#999'} />
                        {cat?.nome} · {formatarData(l.data)}
                      </p>
                    </div>
                    <span
                      className="shrink-0 font-bold tabular-nums"
                      style={{ color: l.tipo === 'receita' ? 'var(--viz-bom)' : 'var(--viz-critico)' }}
                    >
                      {l.tipo === 'receita' ? '+' : '−'} {moeda(l.valor)}
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2 border-t border-line pt-2.5">
                    <Selo tom={l.situacao === 'liquidado' ? 'positivo' : 'atencao'}>{l.situacao}</Selo>
                    <span className="text-xs text-ink-faint">
                      {nucleoPorId(base, l.nucleoId)?.nome.replace('Núcleo ', '') ?? 'Nacional'}
                    </span>
                    {l.comprovanteUrl && (
                      <Icone nome="attach_file" className="ml-auto text-[16px] text-ink-faint" />
                    )}
                  </div>
                </div>
              );
            }}
          />

          <Paginacao pagina={pagina} totalPaginas={totalPaginas} aoMudar={setPagina} totalItens={lancamentos.length} />
        </div>
      )}

      {aba === 'contas' && (
        <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-2">
          <Cartao semPadding>
            <div className="p-5">
              <CabecalhoCartao titulo="Contas financeiras" icone="account_balance" />
            </div>
            <ul className="divide-y divide-line">
              {base.contas.map((c) => {
                const movimento = base.lancamentos
                  .filter((l) => l.contaId === c.id && l.situacao !== 'cancelado')
                  .reduce((s, l) => s + (l.tipo === 'receita' ? l.valor : -l.valor), 0);
                return (
                  <li key={c.id} className="flex items-center gap-3 px-5 py-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-muted text-ink-soft">
                      <Icone nome="savings" className="text-[20px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-ink">{c.nome}</p>
                      <p className="truncate text-xs text-ink-faint">
                        {c.instituicao}
                        {c.nucleoId && ` · ${nucleoPorId(base, c.nucleoId)?.nome}`}
                      </p>
                    </div>
                    <span className="shrink-0 font-bold tabular-nums text-ink">
                      {moeda(c.saldoInicial + movimento)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Cartao>

          <Cartao semPadding>
            <div className="p-5">
              <CabecalhoCartao titulo="Categorias financeiras" icone="category" />
            </div>
            <ul className="divide-y divide-line">
              {base.categoriasFinanceiras.map((c) => (
                <li key={c.id} className="flex items-center gap-3 px-5 py-3.5">
                  <Ponto cor={c.cor} className="h-3 w-3" />
                  <span className="min-w-0 flex-1 truncate font-semibold text-ink">{c.nome}</span>
                  <Selo tom={c.tipo === 'receita' ? 'positivo' : 'critico'} rotulo>
                    {c.tipo}
                  </Selo>
                </li>
              ))}
            </ul>
          </Cartao>
        </div>
      )}

      <ModalLancamento
        tipo={lancando}
        aoFechar={() => setLancando(null)}
        aoRegistrar={registrar}
        responsavelId={membro?.id ?? ''}
        nucleoPadrao={restritoAoNucleo ?? null}
      />
    </div>
  );
}

function ModalLancamento({
  tipo,
  aoFechar,
  aoRegistrar,
  responsavelId,
  nucleoPadrao,
}: {
  tipo: TipoLancamento | null;
  aoFechar: () => void;
  aoRegistrar: (l: Omit<Lancamento, 'id'>) => void;
  responsavelId: string;
  nucleoPadrao: string | null;
}) {
  const { base } = useDados();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataLanc, setDataLanc] = useState(new Date().toISOString().slice(0, 10));
  const [categoriaId, setCategoriaId] = useState('');
  const [contaId, setContaId] = useState(base.contas[0]?.id ?? '');
  const [nucleoId, setNucleoId] = useState(nucleoPadrao ?? '');
  const [observacao, setObservacao] = useState('');
  const [erros, setErros] = useState<Record<string, string>>({});

  if (!tipo) return null;

  const categorias = base.categoriasFinanceiras.filter((c) => c.tipo === tipo);

  const enviar = () => {
    const e: Record<string, string> = {};
    const numero = Number(valor.replace(',', '.'));
    if (descricao.trim().length < 4) e.descricao = 'Descreva o lançamento.';
    if (!Number.isFinite(numero) || numero <= 0) e.valor = 'Informe um valor maior que zero.';
    if (!categoriaId) e.categoriaId = 'Selecione a categoria.';
    setErros(e);
    if (Object.keys(e).length > 0) return;

    aoRegistrar({
      tipo,
      data: new Date(dataLanc).toISOString(),
      descricao: descricao.trim(),
      categoriaId,
      contaId,
      valor: numero,
      responsavelId,
      nucleoId: nucleoId || null,
      situacao: 'liquidado',
      observacao: observacao.trim() || undefined,
    });
    setDescricao('');
    setValor('');
    setObservacao('');
  };

  return (
    <Modal
      aberto
      aoFechar={aoFechar}
      titulo={tipo === 'receita' ? 'Registrar receita' : 'Registrar despesa'}
      descricao="O lançamento é registrado na trilha de auditoria com o responsável identificado."
      rodape={
        <>
          <Botao variante="contorno" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao icone="save" onClick={enviar}>
            Registrar
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <Campo
          rotulo="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          erro={erros.descricao}
          required
        />
        <div className="grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
          <Campo
            rotulo="Valor"
            inputMode="decimal"
            placeholder="0,00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            erro={erros.valor}
            icone="payments"
            required
          />
          <Campo rotulo="Data" type="date" value={dataLanc} onChange={(e) => setDataLanc(e.target.value)} required />
        </div>
        <Selecao
          rotulo="Categoria"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          erro={erros.categoriaId}
          required
        >
          <option value="">Selecione…</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </Selecao>
        <div className="grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
          <Selecao rotulo="Conta" value={contaId} onChange={(e) => setContaId(e.target.value)}>
            {base.contas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </Selecao>
          <Selecao
            rotulo="Âmbito"
            value={nucleoId}
            onChange={(e) => setNucleoId(e.target.value)}
            disabled={Boolean(nucleoPadrao)}
          >
            <option value="">Nacional</option>
            {base.nucleos.map((n) => (
              <option key={n.id} value={n.id}>
                {n.nome}
              </option>
            ))}
          </Selecao>
        </div>
        <AreaTexto
          rotulo="Observação"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          dica="Opcional. Referência de comprovante, contrato ou deliberação."
        />
        <p className="flex items-start gap-2 rounded-2xl bg-surface-muted p-3 text-xs text-ink-faint">
          <Icone nome="attach_file" className="mt-px shrink-0 text-[16px]" />
          O anexo de comprovante exige o serviço de arquivos da Ordem, com verificação de tipo e tamanho.
        </p>
      </div>
    </Modal>
  );
}
