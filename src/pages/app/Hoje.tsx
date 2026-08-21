import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { eventosFuturos, estaInscrito, nucleoPorId, publicacoesOrdenadas } from '@/lib/consultas';
import { primeiroNome, numero, tempoRelativo } from '@/lib/formato';
import { posicaoNoRanking, xpRecente } from '@/lib/xp';
import { cn } from '@/lib/cn';
import { CarteiraMembro, PlacaIndicador } from '@/components/domain/CarteiraMembro';
import { CartaoEvento, ItemNotificacao } from '@/components/domain/Itens';
import { CartaoPublicacao } from '@/components/domain/CartaoPublicacao';
import { Cartao, EsqueletoCartao, Icone, Selo, TituloSecao, Vazio } from '@/components/ui';

const ATALHOS = [
  { rotulo: 'Formação', icone: 'school', para: '/formacao' },
  { rotulo: 'Propostas', icone: 'gavel', para: '/propostas' },
  { rotulo: 'Documentos', icone: 'folder_open', para: '/documentos' },
  { rotulo: 'Meu Núcleo', icone: 'groups', para: '/meu-nucleo' },
  { rotulo: 'Mensagens', icone: 'forum', para: '/mensagens' },
  { rotulo: 'Eventos', icone: 'event', para: '/eventos' },
];

export function Hoje() {
  const { membro } = useAuth();
  const { base, atualizar, carregando } = useDados();
  const { avisar } = useAviso();

  const dados = useMemo(() => {
    if (!membro) return null;
    const ativos = base.membros.filter((m) => m.situacao === 'ativo');
    return {
      posicao: posicaoNoRanking(ativos, membro.id),
      totalAtivos: ativos.length,
      xp30: xpRecente(base.transacoesXP, membro.id, 30),
      atividades: base.atividades
        .filter((a) => a.membroId === membro.id)
        .sort((a, b) => Number(a.concluida) - Number(b.concluida) || new Date(a.prazo).getTime() - new Date(b.prazo).getTime()),
      notificacoes: base.notificacoes
        .filter((n) => n.membroId === membro.id)
        .sort((a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime())
        .slice(0, 3),
      eventos: eventosFuturos(base).slice(0, 3),
      comunicados: publicacoesOrdenadas(base).filter((p) => p.oficial).slice(0, 2),
      recentes: publicacoesOrdenadas(base).slice(0, 2),
      nucleo: nucleoPorId(base, membro.nucleoId),
    };
  }, [base, membro]);

  if (!membro || !dados) return null;

  const concluirAtividade = (id: string, titulo: string, xp: number) => {
    atualizar((b) => ({
      ...b,
      atividades: b.atividades.map((a) => (a.id === id ? { ...a, concluida: true } : a)),
      membros: b.membros.map((m) => (m.id === membro.id ? { ...m, xp: m.xp + xp } : m)),
      transacoesXP: [
        {
          id: `tx-${Math.random().toString(36).slice(2, 9)}`,
          membroId: membro.id,
          origem: 'atividade' as const,
          descricao: titulo,
          pontos: xp,
          registradoPor: null,
          criadoEm: new Date().toISOString(),
        },
        ...b.transacoesXP,
      ],
    }));
    avisar('sucesso', `+${xp} XP`, titulo);
  };

  const pendentes = dados.atividades.filter((a) => !a.concluida);

  return (
    <div className="space-y-7">
      <header>
        <p className="rotulo">Painel inicial</p>
        <h1 className="mt-1 text-titulo text-ink">
          Bem-vindo, {primeiroNome(membro.nomeExibicao)}.
        </h1>
        <p className="mt-1 max-w-leitura text-sm text-ink-soft">
          Sua dedicação sustenta a Ordem. Este é o panorama de hoje.
        </p>
      </header>

      <div className="grid gap-6 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_25rem]">
        <div className="min-w-0 space-y-7">
          <section className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <CarteiraMembro membro={membro} />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              <PlacaIndicador
                icone="local_fire_department"
                valor={membro.sequenciaDias}
                rotulo="Sequência"
                destaque={membro.sequenciaDias >= 7}
              />
              <PlacaIndicador icone="groups" valor={membro.aliados.length} rotulo="Aliados" />
              <PlacaIndicador
                icone="leaderboard"
                valor={`${dados.posicao}º`}
                rotulo={`de ${dados.totalAtivos} membros`}
              />
              <PlacaIndicador icone="bolt" valor={`+${numero(dados.xp30)}`} rotulo="XP em 30 dias" />
            </div>
          </section>

          <section>
            <TituloSecao
              titulo="Atividades pendentes"
              acao={
                pendentes.length > 0 && (
                  <Selo tom="atencao">{pendentes.length} em aberto</Selo>
                )
              }
            />
            <div className="mt-3 space-y-2">
              {carregando ? (
                <EsqueletoCartao />
              ) : dados.atividades.length === 0 ? (
                <Cartao>
                  <Vazio icone="task_alt" titulo="Nenhuma atividade designada" descricao="Novas tarefas aparecerão aqui." />
                </Cartao>
              ) : (
                dados.atividades.map((a) => (
                  <div
                    key={a.id}
                    className={cn(
                      'flex items-start gap-3 rounded-card border p-4',
                      a.concluida ? 'border-line bg-surface-muted/50' : 'border-line bg-surface-card shadow-suave',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-10 w-10 shrink-0 place-items-center rounded-xl',
                        a.concluida ? 'bg-positivo/15 text-positivo' : 'bg-ouro-wash text-[rgb(var(--c-gold-deep))]',
                      )}
                    >
                      <Icone nome={a.concluida ? 'check_circle' : 'assignment'} preenchido={a.concluida} className="text-[20px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={cn('font-bold text-ink', a.concluida && 'text-ink-faint line-through')}>
                        {a.titulo}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-soft">{a.descricao}</p>
                      <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-ink-faint">
                        <Icone nome="schedule" className="text-[14px]" />
                        {a.concluida ? 'Concluída' : `Prazo: ${tempoRelativo(a.prazo)}`}
                        <span className="ml-2">+{a.xp} XP</span>
                      </p>
                    </div>
                    {!a.concluida && (
                      <button
                        type="button"
                        onClick={() => concluirAtividade(a.id, a.titulo, a.xp)}
                        className="shrink-0 rounded-xl border border-line-strong px-3 py-2 text-xs font-bold text-ink transition hover:bg-surface-muted"
                      >
                        Concluir
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <TituloSecao
              titulo="Comunicados oficiais"
              acao={
                <Link to="/feed" className="link-sutil text-sm font-bold">
                  Ver todos
                </Link>
              }
            />
            <div className="mt-3 space-y-3">
              {carregando ? (
                <EsqueletoCartao />
              ) : (
                dados.comunicados.map((p) => <CartaoPublicacao key={p.id} publicacao={p} />)
              )}
            </div>
          </section>

          <section>
            <TituloSecao
              titulo="Publicações recentes"
              acao={
                <Link to="/feed" className="link-sutil text-sm font-bold">
                  Abrir feed
                </Link>
              }
            />
            <div className="mt-3 space-y-3">
              {dados.recentes.map((p) => (
                <CartaoPublicacao key={p.id} publicacao={p} />
              ))}
            </div>
          </section>
        </div>

        <aside className="min-w-0 space-y-6">
          <section>
            <TituloSecao titulo="Atalhos" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              {ATALHOS.map((a) => (
                <Link
                  key={a.para}
                  to={a.para}
                  className="flex flex-col items-center gap-2 rounded-card border border-line bg-surface-card p-3 text-center transition hover:border-ouro/40 hover:shadow-suave"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-muted text-ink-soft">
                    <Icone nome={a.icone} className="text-[20px]" />
                  </span>
                  <span className="text-[0.7rem] font-bold text-ink">{a.rotulo}</span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <TituloSecao
              titulo="Notificações"
              acao={
                <Link to="/notificacoes" className="link-sutil text-sm font-bold">
                  Ver todas
                </Link>
              }
            />
            <div className="mt-3 space-y-2">
              {dados.notificacoes.map((n) => (
                <ItemNotificacao key={n.id} notificacao={n} />
              ))}
            </div>
          </section>

          <section>
            <TituloSecao
              titulo="Próximos eventos"
              acao={
                <Link to="/eventos" className="link-sutil text-sm font-bold">
                  Calendário
                </Link>
              }
            />
            <div className="mt-3 space-y-2">
              {dados.eventos.map((e) => (
                <CartaoEvento
                  key={e.id}
                  evento={e}
                  compacto
                  inscrito={estaInscrito(base, e.id, membro.id)}
                />
              ))}
            </div>
          </section>

          {dados.nucleo && (
            <section>
              <TituloSecao titulo="Meu Núcleo" />
              <Link
                to="/meu-nucleo"
                className="mt-3 flex items-center gap-3 rounded-card border border-line bg-surface-card p-4 transition hover:border-ouro/40 hover:shadow-suave"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ouro-wash text-[rgb(var(--c-gold-deep))]">
                  <Icone nome="hub" className="text-[22px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold text-ink">{dados.nucleo.nome}</span>
                  <span className="block text-xs text-ink-faint">
                    {base.membros.filter((m) => m.nucleoId === dados.nucleo!.id).length} membros ·{' '}
                    {dados.nucleo.codigo}
                  </span>
                </span>
                <Icone nome="chevron_right" className="shrink-0 text-[20px] text-ink-faint" />
              </Link>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
