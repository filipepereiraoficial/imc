import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { cargoDe, membroPorId, nucleoPorId } from '@/lib/consultas';
import { cn } from '@/lib/cn';
import { data as formatarData, tempoRelativo } from '@/lib/formato';
import type { Mediacao, SituacaoMediacao } from '@/types';
import {
  Abas,
  AreaTexto,
  Avatar,
  Botao,
  Cartao,
  Icone,
  Modal,
  Selecao,
  Selo,
  Vazio,
} from '@/components/ui';
import type { TomSelo } from '@/components/ui/Selo';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const ROTULO: Record<SituacaoMediacao, string> = {
  solicitada: 'Solicitada',
  em_mediacao: 'Em mediação',
  conciliada: 'Conciliada',
  sem_acordo: 'Sem acordo',
  arquivada: 'Arquivada',
};

const TOM: Record<SituacaoMediacao, TomSelo> = {
  solicitada: 'atencao',
  em_mediacao: 'info',
  conciliada: 'positivo',
  sem_acordo: 'critico',
  arquivada: 'neutro',
};

/**
 * Arbitragem de Honra — Códice C6:21 a C6:23.
 *
 * Dever moral absoluto de esgotar a mediação interna perante a Mestria antes de
 * submeter litígios societários e desavenças civis ordinárias aos tribunais
 * seculares. É anterior e distinta do processo disciplinar: aqui não há
 * acusado, há partes.
 *
 * O sigilo é a regra, não a exceção: uma desavença exposta ao corpo da
 * irmandade dificilmente se concilia.
 */
export function Arbitragem() {
  const { base, atualizar, auditar } = useDados();
  const { membro, tem } = useAuth();
  const { avisar } = useAviso();
  const [filtro, setFiltro] = useState<'minhas' | 'abertas' | 'todas'>('minhas');
  const [solicitando, setSolicitando] = useState(false);
  const [concluindo, setConcluindo] = useState<Mediacao | null>(null);

  const cargo = cargoDe(base, membro);
  /** Só a Mestria conduz a mediação (C6:22). */
  const daMestria = (cargo?.precedencia ?? 99) <= 6;

  const lista = useMemo(() => {
    let itens = [...base.mediacoes].sort(
      (a, b) => new Date(b.solicitadaEm).getTime() - new Date(a.solicitadaEm).getTime(),
    );
    // O sigilo limita a visão: parte, mediador ou Mestria.
    itens = itens.filter((m) => {
      if (!membro) return false;
      const parte = m.requerenteId === membro.id || m.requeridoId === membro.id;
      const mediador = m.mediadorId === membro.id;
      return parte || mediador || (daMestria && !m.sigilosa) || (daMestria && mediador);
    });
    if (filtro === 'minhas' && membro) {
      itens = itens.filter(
        (m) => m.requerenteId === membro.id || m.requeridoId === membro.id || m.mediadorId === membro.id,
      );
    } else if (filtro === 'abertas') {
      itens = itens.filter((m) => m.situacao === 'solicitada' || m.situacao === 'em_mediacao');
    }
    return itens;
  }, [base.mediacoes, filtro, membro, daMestria]);

  const solicitar = (dados: { requeridoId: string; objeto: string }) => {
    if (!membro) return;
    const numero = `AH ${String(base.mediacoes.length + 1).padStart(3, '0')}/${new Date().getFullYear()}`;
    atualizar((b) => ({
      ...b,
      mediacoes: [
        {
          id: `md-${Math.random().toString(36).slice(2, 9)}`,
          numero,
          requerenteId: membro.id,
          requeridoId: dados.requeridoId,
          objeto: dados.objeto,
          nucleoId: membro.nucleoId,
          mediadorId: null,
          situacao: 'solicitada' as const,
          solicitadaEm: new Date().toISOString(),
          concluidaEm: null,
          sigilosa: true,
        },
        ...b.mediacoes,
      ],
    }));
    auditar({
      membroId: membro.id,
      acao: 'Solicitou arbitragem de honra',
      modulo: 'Arbitragem',
      detalhe: `${numero} — mediação interna anterior a qualquer via judicial (C6:21).`,
    });
    avisar('sucesso', 'Mediação solicitada', 'A Mestria designará um mediador.');
    setSolicitando(false);
  };

  const assumirMediacao = (m: Mediacao) => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      mediacoes: b.mediacoes.map((x) =>
        x.id === m.id ? { ...x, mediadorId: membro.id, situacao: 'em_mediacao' as const } : x,
      ),
    }));
    auditar({
      membroId: membro.id,
      acao: 'Assumiu mediação',
      modulo: 'Arbitragem',
      detalhe: `${m.numero} — condução pela Mestria.`,
    });
    avisar('sucesso', 'Mediação assumida', 'Conduza o diálogo fraterno entre as partes.');
  };

  const concluir = (m: Mediacao, conciliada: boolean, termo: string) => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      mediacoes: b.mediacoes.map((x) =>
        x.id === m.id
          ? {
              ...x,
              situacao: conciliada ? ('conciliada' as const) : ('sem_acordo' as const),
              concluidaEm: new Date().toISOString(),
              termoConciliacao: termo || undefined,
            }
          : x,
      ),
    }));
    auditar({
      membroId: membro.id,
      acao: conciliada ? 'Conciliou arbitragem' : 'Encerrou arbitragem sem acordo',
      modulo: 'Arbitragem',
      detalhe: `${m.numero} — ${conciliada ? 'conciliada' : 'sem acordo; esgotada a mediação interna'}.`,
    });
    avisar(
      conciliada ? 'sucesso' : 'atencao',
      conciliada ? 'Conciliação registrada' : 'Encerrada sem acordo',
      conciliada
        ? 'A paz fraterna foi restaurada.'
        : 'Esgotada a mediação interna exigida pelo Códice.',
    );
    setConcluindo(null);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina
        titulo="Arbitragem de Honra"
        descricao="Mediação fraterna perante a Mestria, anterior e obrigatória em relação a qualquer via judicial."
        acao={
          tem('propostas.criar') && (
            <Botao icone="handshake" onClick={() => setSolicitando(true)}>
              Solicitar mediação
            </Botao>
          )
        }
      />

      <Cartao destaque>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ouro/20 text-[rgb(var(--c-gold-deep))]">
            <Icone nome="handshake" className="text-[20px]" />
          </span>
          <div className="min-w-0">
            <p className="font-bold text-ink">Dever moral absoluto</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Princípio de conciliação privada que obriga o confrade a esgotar a mediação interna e o
              diálogo fraterno perante a Mestria antes de submeter litígios societários e desavenças
              civis ordinárias aos tribunais seculares do Estado, evitando o litígio destrutivo.
            </p>
            <p className="mt-2 text-xs text-ink-faint">Códice Verde, C6:21 a C6:23</p>
          </div>
        </div>
      </Cartao>

      <p className="flex items-start gap-2 rounded-2xl border border-line bg-surface-muted/60 p-3 text-xs text-ink-soft">
        <Icone nome="lock" className="mt-px shrink-0 text-[16px]" />
        <span>
          As mediações são sigilosas por padrão: visíveis apenas às partes e ao mediador designado.
          Uma desavença exposta ao corpo da irmandade dificilmente se concilia.
        </span>
      </p>

      <Abas
        itens={[
          { id: 'minhas', rotulo: 'Minhas', icone: 'person' },
          { id: 'abertas', rotulo: 'Em curso' },
          { id: 'todas', rotulo: 'Todas' },
        ]}
        ativo={filtro}
        aoMudar={(v) => setFiltro(v as typeof filtro)}
        rotuloGrupo="Filtros de mediação"
      />

      {lista.length === 0 ? (
        <Cartao>
          <Vazio
            icone="handshake"
            titulo="Nenhuma mediação"
            descricao="Não há mediações visíveis para você neste filtro — o que, aqui, é uma boa notícia."
          />
        </Cartao>
      ) : (
        <div className="space-y-3">
          {lista.map((m) => {
            const requerente = membroPorId(base, m.requerenteId);
            const requerido = membroPorId(base, m.requeridoId);
            const mediador = membroPorId(base, m.mediadorId);
            const nucleo = nucleoPorId(base, m.nucleoId);
            const souMediador = membro?.id === m.mediadorId;
            return (
              <Cartao key={m.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="rotulo">{m.numero}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{m.objeto}</p>
                  </div>
                  <Selo tom={TOM[m.situacao]} rotulo>
                    {ROTULO[m.situacao]}
                  </Selo>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-surface-muted/60 p-3">
                  <span className="flex items-center gap-1.5">
                    <Avatar nome={requerente?.nomeCompleto ?? 'Membro'} tamanho="xs" />
                    <span className="text-xs font-semibold text-ink">{requerente?.nomeExibicao}</span>
                  </span>
                  <Icone nome="swap_horiz" className="text-[16px] text-ink-faint" />
                  <span className="flex items-center gap-1.5">
                    <Avatar nome={requerido?.nomeCompleto ?? 'Membro'} tamanho="xs" />
                    <span className="text-xs font-semibold text-ink">{requerido?.nomeExibicao}</span>
                  </span>
                  {mediador && (
                    <span className="ml-auto flex items-center gap-1.5">
                      <Icone nome="gavel" className="text-[14px] text-ink-faint" />
                      <span className="text-xs text-ink-soft">Mediador: {mediador.nomeExibicao}</span>
                    </span>
                  )}
                </div>

                {m.termoConciliacao && (
                  <div className="mt-3 rounded-2xl border border-positivo/25 bg-positivo/10 p-3.5">
                    <p className="text-xs font-bold text-positivo">Termo de conciliação</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{m.termoConciliacao}</p>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 text-xs text-ink-faint">
                  {nucleo && <span>{nucleo.nome.replace('Núcleo ', '')}</span>}
                  <span>
                    {m.concluidaEm
                      ? `Concluída em ${formatarData(m.concluidaEm)}`
                      : `Solicitada ${tempoRelativo(m.solicitadaEm)}`}
                  </span>
                  {m.sigilosa && (
                    <Selo tom="neutro" icone="lock">
                      Sigilosa
                    </Selo>
                  )}
                  <div className="ml-auto flex gap-2">
                    {daMestria && m.situacao === 'solicitada' && !m.mediadorId && (
                      <Botao tamanho="pequeno" variante="contorno" icone="gavel" onClick={() => assumirMediacao(m)}>
                        Assumir mediação
                      </Botao>
                    )}
                    {souMediador && m.situacao === 'em_mediacao' && (
                      <Botao tamanho="pequeno" icone="done_all" onClick={() => setConcluindo(m)}>
                        Concluir
                      </Botao>
                    )}
                  </div>
                </div>
              </Cartao>
            );
          })}
        </div>
      )}

      <ModalSolicitacao
        aberto={solicitando}
        aoFechar={() => setSolicitando(false)}
        aoSolicitar={solicitar}
      />
      {concluindo && (
        <ModalConclusao
          mediacao={concluindo}
          aoFechar={() => setConcluindo(null)}
          aoConcluir={concluir}
        />
      )}
    </div>
  );
}

function ModalSolicitacao({
  aberto,
  aoFechar,
  aoSolicitar,
}: {
  aberto: boolean;
  aoFechar: () => void;
  aoSolicitar: (d: { requeridoId: string; objeto: string }) => void;
}) {
  const { base } = useDados();
  const { membro } = useAuth();
  const [requeridoId, setRequeridoId] = useState('');
  const [objeto, setObjeto] = useState('');
  const [erro, setErro] = useState('');

  const candidatos = base.membros.filter((m) => m.situacao === 'ativo' && m.id !== membro?.id);

  const enviar = () => {
    if (!requeridoId) return setErro('Indique o confrade com quem há a desavença.');
    if (objeto.trim().length < 20) return setErro('Descreva o objeto em ao menos 20 caracteres.');
    aoSolicitar({ requeridoId, objeto: objeto.trim() });
    setRequeridoId('');
    setObjeto('');
    setErro('');
  };

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo="Solicitar arbitragem de honra"
      descricao="A mediação é sigilosa e conduzida pela Mestria. Precede obrigatoriamente qualquer via judicial."
      rodape={
        <>
          <Botao variante="contorno" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao icone="handshake" onClick={enviar}>
            Solicitar
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        {erro && (
          <p role="alert" className="flex items-center gap-2 rounded-xl bg-critico/10 p-3 text-sm font-medium text-critico">
            <Icone nome="error" className="text-[17px]" />
            {erro}
          </p>
        )}
        <Selecao
          rotulo="Confrade requerido"
          value={requeridoId}
          onChange={(e) => {
            setRequeridoId(e.target.value);
            setErro('');
          }}
          required
        >
          <option value="">Selecione…</option>
          {candidatos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nomeCompleto}
            </option>
          ))}
        </Selecao>
        <AreaTexto
          rotulo="Objeto da desavença"
          value={objeto}
          onChange={(e) => {
            setObjeto(e.target.value);
            setErro('');
          }}
          dica="Exponha os fatos com serenidade. O texto é visto apenas pelas partes e pelo mediador."
          required
        />
        <p className="flex items-start gap-2 rounded-2xl bg-surface-muted p-3 text-xs text-ink-faint">
          <Icone nome="info" className="mt-px shrink-0 text-[16px]" />
          A arbitragem de honra não substitui o processo disciplinar: aqui não há acusado, há partes
          buscando conciliação.
        </p>
      </div>
    </Modal>
  );
}

function ModalConclusao({
  mediacao,
  aoFechar,
  aoConcluir,
}: {
  mediacao: Mediacao;
  aoFechar: () => void;
  aoConcluir: (m: Mediacao, conciliada: boolean, termo: string) => void;
}) {
  const [termo, setTermo] = useState('');

  return (
    <Modal
      aberto
      aoFechar={aoFechar}
      titulo={`Concluir ${mediacao.numero}`}
      descricao="Registre o desfecho da mediação."
      rodape={
        <>
          <Botao variante="contorno" onClick={() => aoConcluir(mediacao, false, termo)}>
            Sem acordo
          </Botao>
          <Botao icone="handshake" onClick={() => aoConcluir(mediacao, true, termo)}>
            Registrar conciliação
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <AreaTexto
          rotulo="Termo de conciliação"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          dica="O que as partes ajustaram. Fica registrado no processo, sob sigilo."
        />
        <p className={cn('flex items-start gap-2 rounded-2xl bg-surface-muted p-3 text-xs text-ink-faint')}>
          <Icone nome="balance" className="mt-px shrink-0 text-[16px]" />
          Encerrada sem acordo, considera-se esgotada a mediação interna que o Códice exige antes da
          via judicial (C6:21).
        </p>
      </div>
    </Modal>
  );
}
