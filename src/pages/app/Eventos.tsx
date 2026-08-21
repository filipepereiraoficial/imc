import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { estaInscrito, inscritosNoEvento, membroPorId, nucleoPorId } from '@/lib/consultas';
import { contem, data as formatarData, dataHora, hora } from '@/lib/formato';
import { CartaoEvento } from '@/components/domain/Itens';
import {
  Abas,
  Avatar,
  Botao,
  Cartao,
  CabecalhoCartao,
  CampoBusca,
  Confirmacao,
  Icone,
  Selo,
  Tabela,
  Vazio,
} from '@/components/ui';
import type { Coluna } from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';
import type { Membro } from '@/types';

type Filtro = 'proximos' | 'meus' | 'realizados';

export function Eventos() {
  const { base } = useDados();
  const { membro } = useAuth();
  const [filtro, setFiltro] = useState<Filtro>('proximos');
  const [termo, setTermo] = useState('');

  const lista = useMemo(() => {
    const agora = Date.now();
    let eventos = [...base.eventos].sort(
      (a, b) => new Date(a.inicio).getTime() - new Date(b.inicio).getTime(),
    );
    if (filtro === 'proximos') eventos = eventos.filter((e) => new Date(e.inicio).getTime() >= agora);
    if (filtro === 'realizados')
      eventos = eventos
        .filter((e) => new Date(e.inicio).getTime() < agora)
        .reverse();
    if (filtro === 'meus')
      eventos = eventos.filter((e) => membro && estaInscrito(base, e.id, membro.id));
    if (termo) eventos = eventos.filter((e) => contem(e.titulo, termo) || contem(e.local, termo));
    return eventos;
  }, [base, filtro, termo, membro]);

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Eventos"
        descricao="Congressos, assembleias, formações e reuniões de Núcleo."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Abas
          className="flex-1"
          itens={[
            { id: 'proximos', rotulo: 'Próximos', icone: 'upcoming' },
            { id: 'meus', rotulo: 'Minhas inscrições', icone: 'how_to_reg' },
            { id: 'realizados', rotulo: 'Realizados', icone: 'history' },
          ]}
          ativo={filtro}
          aoMudar={setFiltro}
          rotuloGrupo="Filtros de eventos"
        />
        <CampoBusca valor={termo} aoMudar={setTermo} placeholder="Buscar evento…" className="sm:w-64" />
      </div>

      {lista.length === 0 ? (
        <Cartao>
          <Vazio icone="event_busy" titulo="Nenhum evento" descricao="Não há eventos para este filtro." />
        </Cartao>
      ) : (
        <div className="grid gap-4 [&>*]:min-w-0 sm:grid-cols-2 xl:grid-cols-3">
          {lista.map((e) => (
            <CartaoEvento key={e.id} evento={e} inscrito={membro ? estaInscrito(base, e.id, membro.id) : false} />
          ))}
        </div>
      )}
    </div>
  );
}

export function EventoDetalhe() {
  const { id } = useParams();
  const { base, atualizar, auditar } = useDados();
  const { membro, pode } = useAuth();
  const { avisar } = useAviso();
  const [confirmandoCancelamento, setConfirmandoCancelamento] = useState(false);

  const evento = base.eventos.find((e) => e.id === id);
  const inscritos = useMemo(() => (evento ? inscritosNoEvento(base, evento.id) : []), [base, evento]);
  const participantes = useMemo(
    () => inscritos.map((i) => membroPorId(base, i.membroId)).filter((m): m is Membro => Boolean(m)),
    [inscritos, base],
  );

  if (!evento) {
    return (
      <Cartao>
        <Vazio icone="event_busy" titulo="Evento não encontrado" />
      </Cartao>
    );
  }

  const nucleo = nucleoPorId(base, evento.nucleoId);
  const responsavel = membroPorId(base, evento.responsavelId);
  const inscrito = membro ? estaInscrito(base, evento.id, membro.id) : false;
  const lotado = evento.limiteParticipantes !== null && inscritos.length >= evento.limiteParticipantes;
  const podeRegistrarPresenca = pode('presenca.registrar', { nucleoId: evento.nucleoId });

  const confirmarPresenca = () => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      inscricoes: [
        ...b.inscricoes,
        {
          id: `in-${Math.random().toString(36).slice(2, 9)}`,
          eventoId: evento.id,
          membroId: membro.id,
          situacao: 'confirmado',
          inscritoEm: new Date().toISOString(),
        },
      ],
    }));
    auditar({ membroId: membro.id, acao: 'Confirmou participação', modulo: 'Eventos', detalhe: evento.titulo });
    avisar('sucesso', 'Participação confirmada', `${evento.titulo} — +${evento.xpParticipacao} XP na presença.`);
  };

  const cancelarInscricao = () => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      inscricoes: b.inscricoes.filter((i) => !(i.eventoId === evento.id && i.membroId === membro.id)),
    }));
    avisar('atencao', 'Inscrição cancelada', evento.titulo);
  };

  const registrarPresenca = (membroId: string, presente: boolean) => {
    if (!membro) return;
    atualizar((b) => {
      const existente = b.presencas.find((p) => p.eventoId === evento.id && p.membroId === membroId);
      const registro = {
        id: existente?.id ?? `pr-${Math.random().toString(36).slice(2, 9)}`,
        eventoId: evento.id,
        membroId,
        presente,
        registradoPor: membro.id,
        registradoEm: new Date().toISOString(),
      };
      return {
        ...b,
        presencas: existente
          ? b.presencas.map((p) => (p.id === existente.id ? registro : p))
          : [...b.presencas, registro],
        membros:
          presente && !existente?.presente
            ? b.membros.map((m) =>
                m.id === membroId ? { ...m, xp: m.xp + evento.xpParticipacao } : m,
              )
            : b.membros,
      };
    });
  };

  const colunas: Coluna<Membro>[] = [
    {
      chave: 'membro',
      titulo: 'Membro',
      renderizar: (m) => (
        <div className="flex items-center gap-2.5">
          <Avatar nome={m.nomeCompleto} tamanho="sm" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">{m.nomeCompleto}</p>
            <p className="truncate text-xs text-ink-faint">{m.numeroMembro}</p>
          </div>
        </div>
      ),
    },
    {
      chave: 'nucleo',
      titulo: 'Núcleo',
      secundaria: true,
      renderizar: (m) => nucleoPorId(base, m.nucleoId)?.nome.replace('Núcleo ', '') ?? '—',
    },
    {
      chave: 'presenca',
      titulo: 'Presença',
      alinhamento: 'direita',
      renderizar: (m) => {
        const registro = base.presencas.find((p) => p.eventoId === evento.id && p.membroId === m.id);
        if (!podeRegistrarPresenca) {
          return registro?.presente ? <Selo tom="positivo">Presente</Selo> : <Selo>Não registrada</Selo>;
        }
        return (
          <div className="flex justify-end gap-1.5">
            <button
              type="button"
              onClick={() => registrarPresenca(m.id, true)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                registro?.presente ? 'bg-positivo text-white' : 'border border-line-strong text-ink hover:bg-surface-muted'
              }`}
            >
              Presente
            </button>
            <button
              type="button"
              onClick={() => registrarPresenca(m.id, false)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                registro && !registro.presente
                  ? 'bg-critico text-white'
                  : 'border border-line-strong text-ink hover:bg-surface-muted'
              }`}
            >
              Ausente
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <CabecalhoPagina
        titulo={evento.titulo}
        voltarPara="/eventos"
        rotuloVoltar="Voltar aos eventos"
        acao={
          inscrito ? (
            <Botao variante="contorno" icone="event_busy" onClick={() => setConfirmandoCancelamento(true)}>
              Cancelar participação
            </Botao>
          ) : (
            <Botao icone="how_to_reg" onClick={confirmarPresenca} disabled={lotado || !evento.inscricoesAbertas}>
              {lotado ? 'Vagas esgotadas' : 'Confirmar participação'}
            </Botao>
          )
        }
      />

      <div className="grid gap-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="min-w-0 space-y-5">
          <Cartao>
            <p className="whitespace-pre-line leading-relaxed text-ink-soft">{evento.descricao}</p>
          </Cartao>

          <Cartao semPadding>
            <div className="p-5">
              <CabecalhoCartao
                titulo="Participantes"
                descricao={`${inscritos.length} confirmados${evento.limiteParticipantes ? ` de ${evento.limiteParticipantes} vagas` : ''}`}
                icone="groups"
                acao={
                  podeRegistrarPresenca && (
                    <Botao
                      variante="contorno"
                      tamanho="pequeno"
                      icone="download"
                      onClick={() => avisar('sucesso', 'Lista gerada', 'A lista de presença foi preparada para impressão.')}
                    >
                      Gerar lista
                    </Botao>
                  )
                }
              />
            </div>
            <div className="px-5 pb-5">
              <Tabela
                legenda={`Participantes de ${evento.titulo}`}
                colunas={colunas}
                itens={participantes}
                chaveDe={(m) => m.id}
                vazio={<Vazio icone="person_off" titulo="Nenhum inscrito" descricao="Ainda não há confirmações." />}
              />
            </div>
          </Cartao>
        </div>

        <aside className="min-w-0 space-y-4">
          <Cartao>
            <dl className="space-y-4">
              <Linha icone="calendar_month" rotulo="Data" valor={formatarData(evento.inicio, { weekday: 'long' })} />
              <Linha icone="schedule" rotulo="Horário" valor={`${hora(evento.inicio)} — ${hora(evento.fim)}`} />
              <Linha
                icone={evento.modalidade === 'online' ? 'videocam' : 'location_on'}
                rotulo="Local"
                valor={evento.local}
              />
              <Linha icone="hub" rotulo="Modalidade" valor={evento.modalidade} />
              {nucleo && <Linha icone="groups" rotulo="Núcleo" valor={nucleo.nome} />}
              {responsavel && <Linha icone="badge" rotulo="Responsável" valor={responsavel.nomeCompleto} />}
              <Linha icone="bolt" rotulo="Pontuação" valor={`+${evento.xpParticipacao} XP na presença`} />
            </dl>
          </Cartao>

          <Cartao>
            <CabecalhoCartao titulo="Agenda" icone="event_available" />
            <Botao
              className="mt-4"
              larguraTotal
              variante="contorno"
              icone="calendar_add_on"
              onClick={() => avisar('sucesso', 'Adicionado à agenda', `${evento.titulo} — ${dataHora(evento.inicio)}`)}
            >
              Adicionar ao calendário
            </Botao>
            <Botao
              className="mt-2"
              larguraTotal
              variante="sutil"
              icone="notifications_active"
              onClick={() => avisar('info', 'Lembrete ativado', 'Você será avisado 24h antes.')}
            >
              Receber lembrete
            </Botao>
          </Cartao>
        </aside>
      </div>

      <Confirmacao
        aberto={confirmandoCancelamento}
        aoFechar={() => setConfirmandoCancelamento(false)}
        aoConfirmar={cancelarInscricao}
        titulo="Cancelar participação?"
        mensagem={`Sua vaga em “${evento.titulo}” será liberada para outro membro. Você poderá se inscrever novamente se houver disponibilidade.`}
        rotuloConfirmar="Cancelar participação"
        perigo
      />
    </div>
  );
}

function Linha({ icone, rotulo, valor }: { icone: string; rotulo: string; valor: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icone nome={icone} className="mt-0.5 shrink-0 text-[19px] text-ink-faint" />
      <div className="min-w-0">
        <dt className="rotulo">{rotulo}</dt>
        <dd className="mt-0.5 text-sm font-semibold capitalize text-ink">{valor}</dd>
      </div>
    </div>
  );
}
