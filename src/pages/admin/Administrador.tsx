import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import {
  fluxoMensal,
  indicadoresMembresia,
  membroPorId,
  membrosPorNucleo,
  resumoFinanceiro,
} from '@/lib/consultas';
import { moeda, numero, tempoRelativo } from '@/lib/formato';
import type { Conquista, Nivel, RegraXP } from '@/types';
import {
  Abas,
  Avatar,
  Botao,
  Campo,
  Cartao,
  CabecalhoCartao,
  CartaoEstatistica,
  CartaoGrafico,
  Confirmacao,
  GraficoBarrasDuplas,
  GraficoBarrasRanqueadas,
  Icone,
  Legenda,
  Selo,
  SemAcesso,
  TabelaDeApoio,
  Alternador,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

export function Administrador() {
  const { base, atualizar, restaurar } = useDados();
  const { temAlguma, tem } = useAuth();
  const { avisar } = useAviso();
  const [aba, setAba] = useState<'visao' | 'gamificacao' | 'sistema'>('visao');
  const [confirmandoRestauro, setConfirmandoRestauro] = useState(false);

  const indicadores = useMemo(() => indicadoresMembresia(base), [base]);
  const financeiro = useMemo(() => resumoFinanceiro(base), [base]);
  const fluxo = useMemo(() => fluxoMensal(base, 6), [base]);
  const porNucleo = useMemo(() => membrosPorNucleo(base), [base]);
  const auditoriaRecente = useMemo(() => base.auditoria.slice(0, 8), [base.auditoria]);
  const acessosRecentes = useMemo(
    () =>
      [...base.membros]
        .filter((m) => m.ultimoAcesso)
        .sort((a, b) => new Date(b.ultimoAcesso!).getTime() - new Date(a.ultimoAcesso!).getTime())
        .slice(0, 6),
    [base.membros],
  );

  if (!temAlguma(['configuracoes.gerenciar', 'permissoes.gerenciar'])) {
    return <SemAcesso modulo="o painel do Administrador" />;
  }

  const ajustarRegra = (regra: RegraXP, pontos: number) =>
    atualizar((b) => ({
      ...b,
      regrasXP: b.regrasXP.map((r) => (r.id === regra.id ? { ...r, pontos } : r)),
    }));

  const alternarRegra = (regra: RegraXP, ativa: boolean) =>
    atualizar((b) => ({
      ...b,
      regrasXP: b.regrasXP.map((r) => (r.id === regra.id ? { ...r, ativa } : r)),
    }));

  const ajustarNivel = (nivel: Nivel, xpMinimo: number) =>
    atualizar((b) => ({
      ...b,
      niveis: b.niveis.map((n) => (n.numero === nivel.numero ? { ...n, xpMinimo } : n)),
    }));

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Painel do Administrador"
        descricao="Visão geral da plataforma, configuração da gamificação e governança do sistema."
      />

      <Abas
        itens={[
          { id: 'visao', rotulo: 'Visão geral', icone: 'dashboard' },
          { id: 'gamificacao', rotulo: 'XP, níveis e conquistas', icone: 'military_tech' },
          { id: 'sistema', rotulo: 'Sistema', icone: 'settings_applications' },
        ]}
        ativo={aba}
        aoMudar={setAba}
        rotuloGrupo="Seções do painel administrativo"
      />

      {aba === 'visao' && (
        <div className="space-y-5">
          <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2 xl:grid-cols-4">
            <CartaoEstatistica rotulo="Membros" valor={numero(indicadores.total)} icone="groups" destaque />
            <CartaoEstatistica rotulo="Ativos" valor={numero(indicadores.ativos)} icone="verified_user" />
            <CartaoEstatistica rotulo="Pendentes" valor={numero(indicadores.pendentes)} icone="pending_actions" />
            <CartaoEstatistica rotulo="Núcleos" valor={numero(base.nucleos.length)} icone="hub" />
          </div>

          <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2 xl:grid-cols-4">
            <CartaoEstatistica rotulo="Publicações" valor={numero(base.publicacoes.length)} icone="article" />
            <CartaoEstatistica rotulo="Eventos" valor={numero(base.eventos.length)} icone="event" />
            <CartaoEstatistica rotulo="Receitas do mês" valor={moeda(financeiro.receitas)} icone="trending_up" />
            <CartaoEstatistica rotulo="Despesas do mês" valor={moeda(financeiro.despesas)} icone="trending_down" />
          </div>

          <CartaoGrafico
            titulo="Fluxo financeiro consolidado"
            descricao="Receitas e despesas de toda a Ordem nos últimos seis meses."
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
                colunas={['Mês', 'Receitas', 'Despesas']}
                linhas={fluxo.map((p) => [p.rotulo, moeda(p.receitas), moeda(p.despesas)])}
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
              titulo="Distribuição por Núcleo"
              descricao="Membros vinculados a cada unidade."
              tabela={<TabelaDeApoio colunas={['Núcleo', 'Membros']} linhas={porNucleo.map((n) => [n.rotulo, n.valor])} />}
            >
              <GraficoBarrasRanqueadas dados={porNucleo} limite={9} />
            </CartaoGrafico>

            <Cartao semPadding>
              <div className="p-5">
                <CabecalhoCartao
                  titulo="Auditoria recente"
                  icone="policy"
                  acao={
                    tem('auditoria.visualizar') && (
                      <Link to="/auditoria" className="link-sutil text-sm font-bold">
                        Ver tudo
                      </Link>
                    )
                  }
                />
              </div>
              <ul className="divide-y divide-line">
                {auditoriaRecente.map((a) => {
                  const responsavel = membroPorId(base, a.membroId);
                  return (
                    <li key={a.id} className="flex items-start gap-3 px-5 py-3">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-muted text-ink-soft">
                        <Icone nome="history" className="text-[16px]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{a.acao}</p>
                        <p className="truncate text-xs text-ink-faint">
                          {responsavel?.nomeExibicao ?? 'Sistema'} · {a.modulo} · {tempoRelativo(a.em)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Cartao>
          </div>

          <Cartao semPadding>
            <div className="p-5">
              <CabecalhoCartao titulo="Acessos recentes" icone="login" />
            </div>
            <ul className="divide-y divide-line">
              {acessosRecentes.map((m) => (
                <li key={m.id} className="flex items-center gap-3 px-5 py-3">
                  <Avatar nome={m.nomeCompleto} tamanho="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{m.nomeCompleto}</p>
                    <p className="truncate text-xs text-ink-faint">{base.cargos.find((c) => c.id === m.cargoId)?.nome}</p>
                  </div>
                  <span className="shrink-0 text-xs text-ink-faint">{tempoRelativo(m.ultimoAcesso!)}</span>
                </li>
              ))}
            </ul>
          </Cartao>
        </div>
      )}

      {aba === 'gamificacao' && (
        <div className="space-y-4">
          <Cartao>
            <CabecalhoCartao
              titulo="Regras de pontuação"
              descricao="Quantidade de XP atribuída por tipo de atividade institucional."
              icone="bolt"
            />
            <ul className="mt-4 divide-y divide-line">
              {base.regrasXP.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center gap-3 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-ink">{r.nome}</p>
                    <p className="text-xs text-ink-soft">{r.descricao}</p>
                  </div>
                  <input
                    type="number"
                    min={0}
                    step={5}
                    value={r.pontos}
                    aria-label={`XP de ${r.nome}`}
                    onChange={(e) => ajustarRegra(r, Math.max(0, Number(e.target.value)))}
                    disabled={!tem('gamificacao.configurar')}
                    className="h-10 w-24 rounded-xl border border-line-strong bg-surface-card px-3 text-right text-sm font-bold tabular-nums text-ink focus:border-ouro focus:outline-none focus:ring-2 focus:ring-ouro/30 disabled:opacity-60"
                  />
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-ink-soft">
                    <input
                      type="checkbox"
                      checked={r.ativa}
                      onChange={(e) => alternarRegra(r, e.target.checked)}
                      disabled={!tem('gamificacao.configurar')}
                      className="h-4 w-4 rounded border-line-strong text-ouro focus:ring-ouro/40"
                    />
                    Ativa
                  </label>
                </li>
              ))}
            </ul>
          </Cartao>

          <Cartao>
            <CabecalhoCartao
              titulo="Níveis"
              descricao="Experiência mínima exigida em cada patamar da progressão."
              icone="stairs"
            />
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {base.niveis.map((n) => (
                <li key={n.numero} className="flex items-center gap-3 rounded-card border border-line p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ouro-wash text-sm font-extrabold text-[rgb(var(--c-gold-deep))]">
                    {n.numero}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-bold text-ink">{n.titulo}</span>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={n.xpMinimo}
                    aria-label={`XP mínimo do nível ${n.numero}`}
                    onChange={(e) => ajustarNivel(n, Math.max(0, Number(e.target.value)))}
                    disabled={!tem('gamificacao.configurar')}
                    className="h-9 w-24 rounded-xl border border-line-strong bg-surface-card px-2.5 text-right text-sm font-bold tabular-nums text-ink focus:border-ouro focus:outline-none focus:ring-2 focus:ring-ouro/30 disabled:opacity-60"
                  />
                </li>
              ))}
            </ul>
          </Cartao>

          <Cartao>
            <CabecalhoCartao titulo="Conquistas" descricao="Medalhas e títulos concedidos aos membros." icone="military_tech" />
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {base.conquistas.map((c: Conquista) => (
                <li key={c.id} className="flex items-start gap-3 rounded-card border border-line p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ouro-wash text-[rgb(var(--c-gold-deep))]">
                    <Icone nome={c.icone} className="text-[20px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-ink">{c.nome}</p>
                    <p className="text-sm text-ink-soft">{c.descricao}</p>
                    <p className="mt-1 text-xs text-ink-faint">
                      Critério: {c.criterio} ·{' '}
                      {base.membros.filter((m) => m.conquistas.includes(c.id)).length} concedidas
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Cartao>
        </div>
      )}

      {aba === 'sistema' && (
        <div className="space-y-4">
          <Cartao>
            <CabecalhoCartao titulo="Identidade da plataforma" icone="badge" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Campo rotulo="Nome da Ordem" defaultValue="Ordem Filosófico-Política" />
              <Campo rotulo="Sigla" defaultValue="A ORDEM" />
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              A identidade é lida de <code className="font-mono">src/config.ts</code>. Em produção, estes campos
              alimentam a tabela de configurações institucionais.
            </p>
          </Cartao>

          <Cartao>
            <CabecalhoCartao titulo="Regras de ingresso" icone="how_to_reg" />
            <div className="mt-2 divide-y divide-line">
              <Alternador
                rotulo="Aprovação automática de cadastros"
                descricao="Quando desativada, todo cadastro depende de análise da Secretaria."
                ativo={false}
                aoAlternar={() => avisar('info', 'Política de ingresso', 'Alteração sujeita a deliberação da Direção.')}
              />
              <Alternador
                rotulo="Exigir Núcleo no cadastro"
                descricao="Obriga o candidato a indicar um Núcleo de vínculo."
                ativo={false}
                aoAlternar={() => avisar('info', 'Política de ingresso', 'Alteração sujeita a deliberação da Direção.')}
              />
              <Alternador
                rotulo="Exigir dois fatores para cargos de direção"
                descricao="Segundo fator obrigatório para precedência 1 a 4."
                ativo
                aoAlternar={() => avisar('atencao', 'Política de segurança', 'Esta exigência não deve ser removida.')}
              />
            </div>
          </Cartao>

          <Cartao>
            <CabecalhoCartao
              titulo="Dados de demonstração"
              descricao="Restaura a massa institucional original, descartando as alterações feitas nesta sessão."
              icone="restart_alt"
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Botao variante="perigo" icone="restart_alt" onClick={() => setConfirmandoRestauro(true)}>
                Restaurar dados
              </Botao>
              <Selo tom="neutro">
                <span>
                  {numero(base.membros.length)} membros · {numero(base.lancamentos.length)}{' '}
                  lançamentos · {numero(base.auditoria.length)} registros de auditoria
                </span>
              </Selo>
            </div>
          </Cartao>
        </div>
      )}

      <Confirmacao
        aberto={confirmandoRestauro}
        aoFechar={() => setConfirmandoRestauro(false)}
        aoConfirmar={() => {
          restaurar();
          avisar('sucesso', 'Dados restaurados', 'A base de demonstração foi reposta.');
        }}
        titulo="Restaurar dados de demonstração?"
        mensagem="Todas as alterações feitas nesta sessão — publicações, lançamentos, cadastros e registros de auditoria — serão descartadas. Esta ação não pode ser desfeita."
        rotuloConfirmar="Restaurar"
        perigo
      />
    </div>
  );
}
