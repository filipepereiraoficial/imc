import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import {
  fluxoMensal,
  indicadoresMembresia,
  membrosPorEstado,
  membrosPorNucleo,
  nucleoPorId,
  resumoFinanceiro,
} from '@/lib/consultas';
import { data as formatarData, moeda, numero, percentual } from '@/lib/formato';
import { ordenarRanking } from '@/lib/xp';
import {
  Abas,
  Botao,
  Cartao,
  CabecalhoCartao,
  CartaoEstatistica,
  CartaoGrafico,
  GraficoBarrasDuplas,
  GraficoBarrasRanqueadas,
  Icone,
  Legenda,
  SemAcesso,
  TabelaDeApoio,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

type Relatorio = 'membresia' | 'participacao' | 'financeiro' | 'territorial';

export function Relatorios() {
  const { base } = useDados();
  const { tem } = useAuth();
  const { avisar } = useAviso();
  const [relatorio, setRelatorio] = useState<Relatorio>('membresia');

  const indicadores = useMemo(() => indicadoresMembresia(base), [base]);
  const financeiro = useMemo(() => resumoFinanceiro(base), [base]);
  const fluxo = useMemo(() => fluxoMensal(base, 12), [base]);
  const porEstado = useMemo(() => membrosPorEstado(base), [base]);
  const porNucleo = useMemo(() => membrosPorNucleo(base), [base]);

  const participacao = useMemo(() => {
    const ativos = base.membros.filter((m) => m.situacao === 'ativo');
    const comStreak = ativos.filter((m) => m.sequenciaDias >= 7).length;
    const presencas = base.presencas.filter((p) => p.presente).length;
    const inscricoes = base.inscricoes.length;
    const aulas = base.progressoAulas.length;
    return {
      ativos: ativos.length,
      comStreak,
      taxaStreak: ativos.length ? comStreak / ativos.length : 0,
      presencas,
      inscricoes,
      aulas,
      xpTotal: ativos.reduce((s, m) => s + m.xp, 0),
      xpMedio: ativos.length ? Math.round(ativos.reduce((s, m) => s + m.xp, 0) / ativos.length) : 0,
      topo: ordenarRanking(ativos).slice(0, 10),
    };
  }, [base]);

  if (!tem('relatorios.gerar')) return <SemAcesso modulo="os relatórios institucionais" />;

  const exportar = (nome: string, colunas: string[], linhas: (string | number)[][]) => {
    const csv = [colunas, ...linhas].map((l) => l.map((c) => `"${c}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nome}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    avisar('sucesso', 'Relatório exportado', `${nome}.csv`);
  };

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Relatórios"
        descricao="Consolidação institucional da membresia, participação, finanças e organização territorial."
        acao={
          <Botao variante="contorno" icone="print" onClick={() => window.print()}>
            Imprimir
          </Botao>
        }
      />

      <Abas
        itens={[
          { id: 'membresia', rotulo: 'Membresia', icone: 'groups' },
          { id: 'participacao', rotulo: 'Participação', icone: 'bolt' },
          { id: 'financeiro', rotulo: 'Financeiro', icone: 'account_balance' },
          { id: 'territorial', rotulo: 'Territorial', icone: 'map' },
        ]}
        ativo={relatorio}
        aoMudar={setRelatorio}
        rotuloGrupo="Relatórios disponíveis"
      />

      {relatorio === 'membresia' && (
        <div className="space-y-4">
          <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2 xl:grid-cols-4">
            <CartaoEstatistica rotulo="Total" valor={numero(indicadores.total)} icone="groups" destaque />
            <CartaoEstatistica rotulo="Ativos" valor={numero(indicadores.ativos)} icone="verified_user" />
            <CartaoEstatistica rotulo="Pendentes" valor={numero(indicadores.pendentes)} icone="pending_actions" />
            <CartaoEstatistica rotulo="Suspensos" valor={numero(indicadores.suspensos)} icone="block" />
          </div>

          <Cartao>
            <CabecalhoCartao
              titulo="Quadro consolidado"
              descricao={`Emitido em ${formatarData(new Date().toISOString())}`}
              icone="summarize"
              acao={
                <Botao
                  variante="contorno"
                  tamanho="pequeno"
                  icone="download"
                  onClick={() =>
                    exportar(
                      'relatorio-membresia',
                      ['Situação', 'Quantidade', 'Participação'],
                      [
                        ['Ativos', indicadores.ativos, percentual(indicadores.ativos / indicadores.total, 1)],
                        ['Pendentes', indicadores.pendentes, percentual(indicadores.pendentes / indicadores.total, 1)],
                        ['Suspensos', indicadores.suspensos, percentual(indicadores.suspensos / indicadores.total, 1)],
                        ['Inativos', indicadores.inativos, percentual(indicadores.inativos / indicadores.total, 1)],
                      ],
                    )
                  }
                >
                  Exportar
                </Botao>
              }
            />
            <div className="mt-4">
              <TabelaDeApoio
                colunas={['Situação', 'Quantidade', 'Participação']}
                linhas={[
                  ['Ativos', numero(indicadores.ativos), percentual(indicadores.ativos / indicadores.total, 1)],
                  ['Pendentes', numero(indicadores.pendentes), percentual(indicadores.pendentes / indicadores.total, 1)],
                  ['Suspensos', numero(indicadores.suspensos), percentual(indicadores.suspensos / indicadores.total, 1)],
                  ['Inativos', numero(indicadores.inativos), percentual(indicadores.inativos / indicadores.total, 1)],
                  ['Ingressos em 90 dias', numero(indicadores.novos), '—'],
                ]}
              />
            </div>
          </Cartao>
        </div>
      )}

      {relatorio === 'participacao' && (
        <div className="space-y-4">
          <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2 xl:grid-cols-4">
            <CartaoEstatistica rotulo="XP acumulado" valor={numero(participacao.xpTotal)} icone="bolt" destaque />
            <CartaoEstatistica rotulo="XP médio por membro" valor={numero(participacao.xpMedio)} icone="query_stats" />
            <CartaoEstatistica
              rotulo="Sequência ativa"
              valor={percentual(participacao.taxaStreak, 1)}
              icone="local_fire_department"
              detalhe={`${participacao.comStreak} membros com 7+ dias`}
            />
            <CartaoEstatistica rotulo="Presenças registradas" valor={numero(participacao.presencas)} icone="how_to_reg" />
          </div>

          <CartaoGrafico
            titulo="Dez maiores participações"
            descricao="Membros com maior experiência acumulada."
            tabela={
              <TabelaDeApoio
                colunas={['Membro', 'XP']}
                linhas={participacao.topo.map((m) => [m.nomeCompleto, numero(m.xp)])}
              />
            }
            acao={
              <Botao
                variante="sutil"
                tamanho="pequeno"
                icone="download"
                onClick={() =>
                  exportar(
                    'relatorio-participacao',
                    ['Posição', 'Membro', 'Registro', 'Núcleo', 'Nível', 'XP'],
                    participacao.topo.map((m, i) => [
                      i + 1,
                      m.nomeCompleto,
                      m.numeroMembro,
                      nucleoPorId(base, m.nucleoId)?.nome ?? '',
                      m.nivel,
                      m.xp,
                    ]),
                  )
                }
              >
                Exportar
              </Botao>
            }
          >
            <GraficoBarrasRanqueadas
              dados={participacao.topo.map((m) => ({ rotulo: m.nomeExibicao, valor: m.xp }))}
              limite={10}
            />
          </CartaoGrafico>

          <Cartao>
            <CabecalhoCartao titulo="Formação e eventos" icone="school" />
            <div className="mt-4">
              <TabelaDeApoio
                colunas={['Indicador', 'Valor']}
                linhas={[
                  ['Inscrições em eventos', numero(participacao.inscricoes)],
                  ['Presenças confirmadas', numero(participacao.presencas)],
                  ['Aulas concluídas', numero(participacao.aulas)],
                  ['Cursos disponíveis', numero(base.cursos.length)],
                  ['Propostas apresentadas', numero(base.propostas.length)],
                ]}
              />
            </div>
          </Cartao>
        </div>
      )}

      {relatorio === 'financeiro' && (
        <div className="space-y-4">
          {tem('tesouraria.visualizar') ? (
            <>
              <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2 xl:grid-cols-4">
                <CartaoEstatistica rotulo="Saldo consolidado" valor={moeda(financeiro.saldoTotal)} icone="account_balance" destaque />
                <CartaoEstatistica rotulo="Receitas do mês" valor={moeda(financeiro.receitas)} icone="trending_up" />
                <CartaoEstatistica rotulo="Despesas do mês" valor={moeda(financeiro.despesas)} icone="trending_down" />
                <CartaoEstatistica rotulo="Resultado" valor={moeda(financeiro.saldo)} icone="savings" />
              </div>

              <CartaoGrafico
                titulo="Evolução de doze meses"
                descricao="Série completa de receitas e despesas da Ordem."
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
                    linhas={fluxo.map((p) => [p.rotulo, moeda(p.receitas), moeda(p.despesas), moeda(p.receitas - p.despesas)])}
                  />
                }
                acao={
                  <Botao
                    variante="sutil"
                    tamanho="pequeno"
                    icone="download"
                    onClick={() =>
                      exportar(
                        'relatorio-financeiro',
                        ['Mês', 'Receitas', 'Despesas', 'Resultado'],
                        fluxo.map((p) => [p.rotulo, p.receitas.toFixed(2), p.despesas.toFixed(2), (p.receitas - p.despesas).toFixed(2)]),
                      )
                    }
                  >
                    Exportar
                  </Botao>
                }
              >
                <GraficoBarrasDuplas
                  dados={fluxo.map((p) => ({ rotulo: p.rotulo, serieA: p.receitas, serieB: p.despesas }))}
                  nomeA="Receitas"
                  nomeB="Despesas"
                />
              </CartaoGrafico>
            </>
          ) : (
            <Cartao>
              <p className="flex items-center gap-2 text-sm text-ink-soft">
                <Icone nome="lock" className="text-[18px] text-ink-faint" />
                O relatório financeiro exige a permissão de consulta à Tesouraria.
              </p>
            </Cartao>
          )}
        </div>
      )}

      {relatorio === 'territorial' && (
        <div className="space-y-4">
          <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-2">
            <CartaoGrafico
              titulo="Membros por Estado"
              tabela={<TabelaDeApoio colunas={['Estado', 'Membros']} linhas={porEstado.map((e) => [e.nome, e.valor])} />}
            >
              <GraficoBarrasRanqueadas dados={porEstado} limite={10} />
            </CartaoGrafico>
            <CartaoGrafico
              titulo="Membros por Núcleo"
              tabela={<TabelaDeApoio colunas={['Núcleo', 'Membros']} linhas={porNucleo.map((n) => [n.rotulo, n.valor])} />}
            >
              <GraficoBarrasRanqueadas dados={porNucleo} limite={10} />
            </CartaoGrafico>
          </div>

          <Cartao>
            <CabecalhoCartao
              titulo="Quadro territorial"
              icone="map"
              acao={
                <Botao
                  variante="contorno"
                  tamanho="pequeno"
                  icone="download"
                  onClick={() =>
                    exportar(
                      'relatorio-territorial',
                      ['Núcleo', 'Código', 'Situação', 'Membros'],
                      base.nucleos.map((n) => [
                        n.nome,
                        n.codigo,
                        n.situacao,
                        base.membros.filter((m) => m.nucleoId === n.id).length,
                      ]),
                    )
                  }
                >
                  Exportar
                </Botao>
              }
            />
            <div className="mt-4">
              <TabelaDeApoio
                colunas={['Núcleo', 'Código', 'Situação', 'Membros']}
                linhas={base.nucleos.map((n) => [
                  n.nome,
                  n.codigo,
                  n.situacao === 'em_formacao' ? 'Em formação' : n.situacao,
                  base.membros.filter((m) => m.nucleoId === n.id).length,
                ])}
              />
            </div>
          </Cartao>
        </div>
      )}
    </div>
  );
}
