import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { membroPorId } from '@/lib/consultas';
import {
  DIAS_DEFESA_DISCIPLINAR,
  DIAS_PERIODO_EXCECAO,
  prazoDefesa,
  prazoVencido,
} from '@/lib/deliberacao';
import { cn } from '@/lib/cn';
import { data as formatarData, dataHora, moeda, tempoRelativo } from '@/lib/formato';
import type { DecisaoDisciplinar, FaseDisciplinar, ProcessoDisciplinar } from '@/types';
import {
  Abas,
  AreaTexto,
  Avatar,
  Botao,
  Cartao,
  CabecalhoCartao,
  Icone,
  Modal,
  Selo,
  SemAcesso,
  Vazio,
} from '@/components/ui';
import type { TomSelo } from '@/components/ui/Selo';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

/** Est. Art. 65 — o rito mínimo do processo disciplinar. */
const RITO: { fase: FaseDisciplinar; rotulo: string; descricao: string }[] = [
  { fase: 'instaurado', rotulo: 'Instauração', descricao: 'Instauração formal do processo.' },
  { fase: 'notificado', rotulo: 'Notificação', descricao: 'Ciência dos fatos imputados ao acusado.' },
  {
    fase: 'defesa_apresentada',
    rotulo: 'Defesa',
    descricao: `Prazo de ${DIAS_DEFESA_DISCIPLINAR} dias contados da notificação (Art. 65, § 1.º).`,
  },
  { fase: 'em_instrucao', rotulo: 'Instrução', descricao: 'Produção de provas.' },
  { fase: 'relatorio', rotulo: 'Relatório', descricao: 'Relatório conclusivo do órgão instrutor.' },
  { fase: 'decidido', rotulo: 'Decisão', descricao: 'Decisão motivada do órgão competente.' },
];

const ROTULO_FASE: Record<FaseDisciplinar, string> = {
  instaurado: 'Instaurado',
  notificado: 'Notificado',
  defesa_apresentada: 'Defesa apresentada',
  em_instrucao: 'Em instrução',
  relatorio: 'Relatório conclusivo',
  decidido: 'Decidido',
  em_recurso: 'Em recurso',
  arquivado: 'Arquivado',
};

const TOM_FASE: Record<FaseDisciplinar, TomSelo> = {
  instaurado: 'info',
  notificado: 'atencao',
  defesa_apresentada: 'info',
  em_instrucao: 'info',
  relatorio: 'ouro',
  decidido: 'positivo',
  em_recurso: 'atencao',
  arquivado: 'neutro',
};

const ROTULO_DECISAO: Record<DecisaoDisciplinar, string> = {
  advertencia: 'Advertência',
  multa: 'Multa',
  suspensao: 'Suspensão',
  exclusao: 'Exclusão',
  absolvicao: 'Absolvição',
};

export function Disciplina() {
  const { base, atualizar, auditar } = useDados();
  const { membro, temAlguma } = useAuth();
  const { avisar } = useAviso();
  const [filtro, setFiltro] = useState<'abertos' | 'concluidos' | 'todos'>('abertos');
  const [detalhe, setDetalhe] = useState<ProcessoDisciplinar | null>(null);

  const lista = useMemo(() => {
    const concluidas: FaseDisciplinar[] = ['decidido', 'arquivado'];
    const itens = [...base.processos].sort(
      (a, b) => new Date(b.instauradoEm).getTime() - new Date(a.instauradoEm).getTime(),
    );
    if (filtro === 'abertos') return itens.filter((p) => !concluidas.includes(p.fase));
    if (filtro === 'concluidos') return itens.filter((p) => concluidas.includes(p.fase));
    return itens;
  }, [base.processos, filtro]);

  if (!temAlguma(['auditoria.visualizar', 'membros.suspender'])) {
    return <SemAcesso modulo="os processos disciplinares" />;
  }

  const avancar = (processo: ProcessoDisciplinar, fase: FaseDisciplinar, nota: string) => {
    if (!membro) return;
    const agora = new Date().toISOString();
    atualizar((b) => ({
      ...b,
      processos: b.processos.map((p) =>
        p.id === processo.id
          ? {
              ...p,
              fase,
              notificadoEm: fase === 'notificado' ? agora : p.notificadoEm,
              prazoDefesa:
                fase === 'notificado' ? prazoDefesa(agora, p.periodoExcecao) : p.prazoDefesa,
              tramitacao: [...p.tramitacao, { fase, em: agora, porId: membro.id, nota }],
            }
          : p,
      ),
    }));
    auditar({
      membroId: membro.id,
      acao: 'Tramitou processo disciplinar',
      modulo: 'Disciplina',
      detalhe: `${processo.numero} → ${ROTULO_FASE[fase]}.`,
    });
    avisar('sucesso', 'Processo tramitado', ROTULO_FASE[fase]);
    setDetalhe(null);
  };

  const ordenarExcecao = (processo: ProcessoDisciplinar) => {
    if (!membro) return;
    const agora = new Date().toISOString();
    atualizar((b) => ({
      ...b,
      processos: b.processos.map((p) =>
        p.id === processo.id
          ? {
              ...p,
              periodoExcecao: true,
              prazoDefesa: p.notificadoEm ? prazoDefesa(p.notificadoEm, true) : p.prazoDefesa,
              tramitacao: [
                ...p.tramitacao,
                {
                  fase: p.fase,
                  em: agora,
                  porId: membro.id,
                  nota: `Período de exceção ordenado: ${DIAS_PERIODO_EXCECAO} dias adicionais de revisão e defesa (Art. 65, § 2.º).`,
                },
              ],
            }
          : p,
      ),
    }));
    auditar({
      membroId: membro.id,
      acao: 'Ordenou período de exceção',
      modulo: 'Disciplina',
      detalhe: `${processo.numero} — prazo de defesa estendido em ${DIAS_PERIODO_EXCECAO} dias.`,
    });
    avisar('atencao', 'Período de exceção ordenado', 'O prazo de defesa foi estendido.');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina
        titulo="Processos disciplinares"
        descricao="Código de Disciplina e de Ética Geral (CDEG). Rito, prazos e recursos na forma dos Arts. 64 a 66 do Estatuto."
      />

      <Cartao>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-muted text-ink-soft">
            <Icone nome="balance" className="text-[20px]" />
          </span>
          <p className="text-sm leading-relaxed text-ink-soft">
            O processo observa, no mínimo, instauração formal, ciência dos fatos, prazo para defesa,
            produção de provas, relatório conclusivo e decisão motivada. A primeira instância é o
            Núcleo filial; da decisão cabe recurso aos órgãos gerais competentes (Art. 66).
          </p>
        </div>
      </Cartao>

      <Abas
        itens={[
          { id: 'abertos', rotulo: 'Em andamento' },
          { id: 'concluidos', rotulo: 'Concluídos' },
          { id: 'todos', rotulo: 'Todos', contagem: base.processos.length },
        ]}
        ativo={filtro}
        aoMudar={(v) => setFiltro(v as typeof filtro)}
        rotuloGrupo="Situação dos processos"
      />

      {lista.length === 0 ? (
        <Cartao>
          <Vazio
            icone="balance"
            titulo="Nenhum processo"
            descricao="Não há processos disciplinares neste filtro."
          />
        </Cartao>
      ) : (
        <div className="space-y-3">
          {lista.map((p) => {
            const acusado = membroPorId(base, p.acusadoId);
            const orgao = base.orgaos.find((o) => o.id === p.instanciaOrgaoId);
            const vencido = prazoVencido(p.prazoDefesa) && p.fase === 'notificado';
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setDetalhe(p)}
                className="flex w-full flex-col gap-3 rounded-card border border-line bg-surface-card p-4 text-left shadow-suave transition hover:border-line-strong hover:shadow-elevado"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="rotulo">{p.numero}</p>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft">{p.fatos}</p>
                  </div>
                  <Selo tom={TOM_FASE[p.fase]} rotulo>
                    {ROTULO_FASE[p.fase]}
                  </Selo>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-3 text-xs text-ink-faint">
                  <span className="flex items-center gap-1.5">
                    <Avatar nome={acusado?.nomeCompleto ?? 'Membro'} tamanho="xs" />
                    {acusado?.nomeCompleto}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icone nome="account_balance" className="text-[14px]" />
                    {orgao?.nome ?? 'Órgão não definido'}
                  </span>
                  {p.prazoDefesa && p.fase === 'notificado' && (
                    <Selo tom={vencido ? 'critico' : 'atencao'} icone="schedule">
                      {vencido ? 'Prazo vencido' : `Defesa até ${formatarData(p.prazoDefesa)}`}
                    </Selo>
                  )}
                  {p.decisao && (
                    <Selo tom={p.decisao === 'absolvicao' ? 'positivo' : 'critico'}>
                      {ROTULO_DECISAO[p.decisao]}
                    </Selo>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {detalhe && (
        <ModalProcesso
          processo={detalhe}
          aoFechar={() => setDetalhe(null)}
          aoAvancar={avancar}
          aoOrdenarExcecao={ordenarExcecao}
        />
      )}
    </div>
  );
}

function ModalProcesso({
  processo,
  aoFechar,
  aoAvancar,
  aoOrdenarExcecao,
}: {
  processo: ProcessoDisciplinar;
  aoFechar: () => void;
  aoAvancar: (p: ProcessoDisciplinar, fase: FaseDisciplinar, nota: string) => void;
  aoOrdenarExcecao: (p: ProcessoDisciplinar) => void;
}) {
  const { base } = useDados();
  const { tem } = useAuth();
  const [nota, setNota] = useState('');

  const acusado = membroPorId(base, processo.acusadoId);
  const orgao = base.orgaos.find((o) => o.id === processo.instanciaOrgaoId);
  const indiceAtual = RITO.findIndex((r) => r.fase === processo.fase);
  const proxima = RITO[indiceAtual + 1];
  const podeTramitar = tem('membros.suspender');
  const vencido = prazoVencido(processo.prazoDefesa) && processo.fase === 'notificado';

  return (
    <Modal
      aberto
      aoFechar={aoFechar}
      titulo={processo.numero}
      descricao={`Acusado: ${acusado?.nomeCompleto ?? '—'} · ${orgao?.nome ?? ''}`}
      largura="lg"
      rodape={
        podeTramitar && proxima ? (
          <>
            {processo.fase === 'notificado' && !processo.periodoExcecao && (
              <Botao
                variante="contorno"
                icone="more_time"
                onClick={() => aoOrdenarExcecao(processo)}
              >
                Ordenar período de exceção
              </Botao>
            )}
            <Botao
              icone="arrow_forward"
              onClick={() => aoAvancar(processo, proxima.fase, nota.trim() || proxima.descricao)}
            >
              Avançar para {proxima.rotulo}
            </Botao>
          </>
        ) : undefined
      }
    >
      <div className="space-y-5">
        <Cartao className="border-line bg-surface-muted/50">
          <p className="rotulo">Fatos imputados</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{processo.fatos}</p>
        </Cartao>

        {/* Rito do Art. 65 */}
        <div>
          <p className="rotulo mb-3">Rito processual</p>
          <ol className="space-y-2">
            {RITO.map((etapa, i) => {
              const cumprida = i <= indiceAtual;
              return (
                <li key={etapa.fase} className="flex items-start gap-3">
                  <span
                    className={cn(
                      'grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold',
                      cumprida ? 'bg-ouro text-[rgb(24_20_12)]' : 'bg-surface-strong text-ink-faint',
                    )}
                  >
                    {i < indiceAtual ? <Icone nome="check" className="text-[15px]" /> : i + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className={cn('text-sm font-bold', cumprida ? 'text-ink' : 'text-ink-faint')}>
                      {etapa.rotulo}
                    </p>
                    <p className="text-xs text-ink-soft">{etapa.descricao}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {processo.prazoDefesa && (
          <div
            className={cn(
              'flex items-start gap-2.5 rounded-2xl border p-3.5',
              vencido ? 'border-critico/30 bg-critico/10' : 'border-atencao/30 bg-atencao/10',
            )}
          >
            <Icone
              nome={vencido ? 'error' : 'schedule'}
              className={cn('mt-px shrink-0 text-[18px]', vencido ? 'text-critico' : 'text-atencao')}
            />
            <p className="text-sm leading-relaxed text-ink-soft">
              <strong className="text-ink">
                Prazo de defesa até {dataHora(processo.prazoDefesa)}
              </strong>
              {processo.periodoExcecao
                ? ` — estendido pelo período de exceção do Art. 65, § 2.º (${DIAS_PERIODO_EXCECAO} dias adicionais).`
                : ` — ${DIAS_DEFESA_DISCIPLINAR} dias contados da notificação, na forma do Art. 65, § 1.º.`}
              {vencido && ' O prazo está vencido.'}
            </p>
          </div>
        )}

        {processo.defesa && (
          <Cartao>
            <CabecalhoCartao titulo="Defesa apresentada" icone="record_voice_over" />
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{processo.defesa}</p>
          </Cartao>
        )}

        {processo.relatorio && (
          <Cartao>
            <CabecalhoCartao titulo="Relatório conclusivo" icone="description" />
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{processo.relatorio}</p>
          </Cartao>
        )}

        {processo.decisao && (
          <Cartao destaque>
            <CabecalhoCartao titulo="Decisão motivada" icone="gavel" />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Selo tom={processo.decisao === 'absolvicao' ? 'positivo' : 'critico'} rotulo>
                {ROTULO_DECISAO[processo.decisao]}
              </Selo>
              {processo.valorMulta && <Selo tom="atencao">{moeda(processo.valorMulta)}</Selo>}
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Da decisão cabe recurso aos órgãos gerais competentes (Art. 66, parágrafo único). O
              descumprimento ou a recusa no pagamento de multa autoriza a Diretoria Executiva ou os
              Conselhos Superiores a acionar a justiça comum (Art. 65, § 3.º).
            </p>
          </Cartao>
        )}

        <div>
          <p className="rotulo mb-2">Tramitação</p>
          <ol className="space-y-2.5">
            {[...processo.tramitacao].reverse().map((t, i) => {
              const responsavel = membroPorId(base, t.porId);
              return (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-muted text-ink-soft">
                    <Icone nome="history" className="text-[15px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink">{ROTULO_FASE[t.fase]}</p>
                    {t.nota && <p className="text-sm text-ink-soft">{t.nota}</p>}
                    <p className="mt-0.5 text-xs text-ink-faint">
                      {dataHora(t.em)} · {responsavel?.nomeExibicao ?? 'Sistema'} ·{' '}
                      {tempoRelativo(t.em)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {podeTramitar && proxima && (
          <AreaTexto
            rotulo={`Nota da fase "${proxima.rotulo}"`}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            dica="Opcional. Fica registrada na tramitação e na auditoria."
          />
        )}
      </div>
    </Modal>
  );
}
