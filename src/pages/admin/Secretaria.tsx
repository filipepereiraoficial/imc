import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import {
  eventosFuturos,
  indicadoresMembresia,
  membrosPorEstado,
  membrosPorNucleo,
  nucleoPorId,
} from '@/lib/consultas';
import { data as formatarData, numero } from '@/lib/formato';
import type { Membro } from '@/types';
import { CartaoEvento, ROTULO_SITUACAO, TOM_SITUACAO } from '@/components/domain/Itens';
import {
  Avatar,
  Botao,
  Cartao,
  CabecalhoCartao,
  CartaoEstatistica,
  CartaoGrafico,
  Confirmacao,
  GraficoBarrasRanqueadas,
  Icone,
  Selo,
  SemAcesso,
  TabelaDeApoio,
  TituloSecao,
  Vazio,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

export function Secretaria() {
  const { base, atualizar, auditar } = useDados();
  const { membro, temAlguma, tem } = useAuth();
  const { avisar } = useAviso();
  const [recusando, setRecusando] = useState<Membro | null>(null);

  const indicadores = useMemo(() => indicadoresMembresia(base), [base]);
  const pendentes = useMemo(
    () => base.membros.filter((m) => m.situacao === 'pendente'),
    [base.membros],
  );
  const porEstado = useMemo(() => membrosPorEstado(base), [base]);
  const porNucleo = useMemo(() => membrosPorNucleo(base), [base]);
  const proximos = useMemo(() => eventosFuturos(base).slice(0, 3), [base]);
  const recentes = useMemo(
    () =>
      [...base.membros]
        .sort((a, b) => new Date(b.dataIngresso).getTime() - new Date(a.dataIngresso).getTime())
        .slice(0, 5),
    [base.membros],
  );

  if (!temAlguma(['membros.criar', 'membros.aprovar', 'membros.editar'])) {
    return <SemAcesso modulo="o painel da Secretaria" />;
  }

  const aprovar = (alvo: Membro) => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      membros: b.membros.map((m) =>
        m.id === alvo.id ? { ...m, situacao: 'ativo' as const, cargoId: 'cargo-membro' } : m,
      ),
      notificacoes: [
        {
          id: `no-${Math.random().toString(36).slice(2, 9)}`,
          membroId: alvo.id,
          tipo: 'cadastro' as const,
          titulo: 'Cadastro aprovado',
          descricao: `Sua filiação foi aprovada. Registro ${alvo.numeroMembro}.`,
          criadaEm: new Date().toISOString(),
          lida: false,
          destino: '/perfil',
        },
        ...b.notificacoes,
      ],
    }));
    auditar({
      membroId: membro.id,
      acao: 'Aprovou cadastro',
      modulo: 'Secretaria',
      detalhe: `${alvo.nomeCompleto} (${alvo.numeroMembro}) aprovado e vinculado.`,
    });
    avisar('sucesso', 'Cadastro aprovado', alvo.nomeCompleto);
  };

  const recusar = (alvo: Membro) => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      membros: b.membros.map((m) => (m.id === alvo.id ? { ...m, situacao: 'desligado' as const } : m)),
    }));
    auditar({
      membroId: membro.id,
      acao: 'Indeferiu cadastro',
      modulo: 'Secretaria',
      detalhe: `${alvo.nomeCompleto} (${alvo.numeroMembro}) indeferido.`,
    });
    avisar('atencao', 'Cadastro indeferido', alvo.nomeCompleto);
  };

  return (
    <div className="space-y-6">
      <CabecalhoPagina
        titulo="Painel da Secretaria"
        descricao="Gestão cadastral, documental e de atividades da Ordem."
        acao={
          tem('membros.criar') && (
            <Link to="/membros">
              <Botao icone="person_add">Cadastrar membro</Botao>
            </Link>
          )
        }
      />

      <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2 xl:grid-cols-4">
        <CartaoEstatistica rotulo="Total de membros" valor={numero(indicadores.total)} icone="groups" destaque />
        <CartaoEstatistica rotulo="Membros ativos" valor={numero(indicadores.ativos)} icone="verified_user" />
        <CartaoEstatistica
          rotulo="Cadastros pendentes"
          valor={numero(indicadores.pendentes)}
          icone="pending_actions"
          detalhe={indicadores.pendentes > 0 ? 'Aguardando análise' : 'Nada pendente'}
        />
        <CartaoEstatistica
          rotulo="Novos em 90 dias"
          valor={numero(indicadores.novos)}
          icone="person_add"
          detalhe="Ingressos recentes"
        />
      </div>

      {pendentes.length > 0 && tem('membros.aprovar') && (
        <section>
          <TituloSecao
            titulo="Cadastros aguardando aprovação"
            acao={<Selo tom="atencao">{pendentes.length} pendentes</Selo>}
          />
          <div className="mt-3 space-y-2">
            {pendentes.map((m) => (
              <div
                key={m.id}
                className="flex flex-wrap items-center gap-3 rounded-card border border-atencao/30 bg-atencao/5 p-4"
              >
                <Avatar nome={m.nomeCompleto} tamanho="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink">{m.nomeCompleto}</p>
                  <p className="truncate text-xs text-ink-faint">
                    {m.email} · {nucleoPorId(base, m.nucleoId)?.nome ?? 'Sem Núcleo indicado'} · solicitado em{' '}
                    {formatarData(m.dataIngresso)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Botao variante="contorno" tamanho="pequeno" icone="close" onClick={() => setRecusando(m)}>
                    Indeferir
                  </Botao>
                  <Botao tamanho="pequeno" icone="check" onClick={() => aprovar(m)}>
                    Aprovar
                  </Botao>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-2">
        <CartaoGrafico
          titulo="Membros por Estado"
          descricao="Distribuição territorial da membresia."
          tabela={
            <TabelaDeApoio
              colunas={['Estado', 'Membros']}
              linhas={porEstado.map((e) => [e.nome, e.valor])}
            />
          }
        >
          <GraficoBarrasRanqueadas dados={porEstado} limite={10} />
        </CartaoGrafico>

        <CartaoGrafico
          titulo="Membros por Núcleo"
          descricao="Ocupação de cada unidade territorial."
          tabela={
            <TabelaDeApoio colunas={['Núcleo', 'Membros']} linhas={porNucleo.map((n) => [n.rotulo, n.valor])} />
          }
        >
          <GraficoBarrasRanqueadas dados={porNucleo} limite={10} />
        </CartaoGrafico>
      </div>

      <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-2">
        <Cartao semPadding>
          <div className="p-5">
            <CabecalhoCartao
              titulo="Ingressos recentes"
              icone="how_to_reg"
              acao={
                <Link to="/membros" className="link-sutil text-sm font-bold">
                  Ver todos
                </Link>
              }
            />
          </div>
          <ul className="divide-y divide-line">
            {recentes.map((m) => (
              <li key={m.id}>
                <Link to={`/membros/${m.id}`} className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-surface-muted/60">
                  <Avatar nome={m.nomeCompleto} tamanho="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{m.nomeCompleto}</p>
                    <p className="truncate text-xs text-ink-faint">
                      {m.numeroMembro} · {formatarData(m.dataIngresso)}
                    </p>
                  </div>
                  <Selo tom={TOM_SITUACAO[m.situacao]} rotulo>
                    {ROTULO_SITUACAO[m.situacao]}
                  </Selo>
                </Link>
              </li>
            ))}
          </ul>
        </Cartao>

        <div className="space-y-4">
          <Cartao>
            <CabecalhoCartao titulo="Situação da membresia" icone="pie_chart" />
            <ul className="mt-4 space-y-2.5">
              {[
                { rotulo: 'Ativos', valor: indicadores.ativos, tom: 'positivo' as const },
                { rotulo: 'Pendentes', valor: indicadores.pendentes, tom: 'atencao' as const },
                { rotulo: 'Suspensos', valor: indicadores.suspensos, tom: 'critico' as const },
                { rotulo: 'Inativos', valor: indicadores.inativos, tom: 'neutro' as const },
              ].map((s) => (
                <li key={s.rotulo} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-ink-soft">{s.rotulo}</span>
                  <Selo tom={s.tom}>{numero(s.valor)}</Selo>
                </li>
              ))}
            </ul>
          </Cartao>

          <div>
            <TituloSecao
              titulo="Próximos eventos"
              acao={
                <Link to="/eventos" className="link-sutil text-sm font-bold">
                  Agenda
                </Link>
              }
            />
            <div className="mt-3 space-y-2">
              {proximos.length === 0 ? (
                <Cartao>
                  <Vazio icone="event_busy" titulo="Sem eventos agendados" />
                </Cartao>
              ) : (
                proximos.map((e) => <CartaoEvento key={e.id} evento={e} compacto />)
              )}
            </div>
          </div>
        </div>
      </div>

      <Cartao>
        <CabecalhoCartao titulo="Expediente" descricao="Atalhos das rotinas da Secretaria." icone="assignment" />
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { rotulo: 'Cadastro de membros', icone: 'badge', para: '/membros' },
            { rotulo: 'Cadastro de Núcleos', icone: 'hub', para: '/nucleos' },
            { rotulo: 'Documentos administrativos', icone: 'folder_open', para: '/documentos' },
            { rotulo: 'Eventos e presença', icone: 'event_available', para: '/eventos' },
            { rotulo: 'Relatórios', icone: 'monitoring', para: '/relatorios' },
            { rotulo: 'Comunicados no feed', icone: 'campaign', para: '/feed' },
          ].map((a) => (
            <Link
              key={a.para}
              to={a.para}
              className="flex items-center gap-3 rounded-card border border-line bg-surface-card p-3.5 transition hover:border-ouro/40 hover:shadow-suave"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-muted text-ink-soft">
                <Icone nome={a.icone} className="text-[19px]" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{a.rotulo}</span>
              <Icone nome="chevron_right" className="shrink-0 text-[18px] text-ink-faint" />
            </Link>
          ))}
        </div>
      </Cartao>

      <Confirmacao
        aberto={Boolean(recusando)}
        aoFechar={() => setRecusando(null)}
        aoConfirmar={() => recusando && recusar(recusando)}
        titulo="Indeferir cadastro?"
        mensagem={`A solicitação de ${recusando?.nomeCompleto ?? ''} será indeferida e o acesso permanecerá bloqueado. A ação fica registrada na auditoria.`}
        rotuloConfirmar="Indeferir"
        perigo
      />
    </div>
  );
}
