import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { membroPorId, nucleoPorId } from '@/lib/consultas';
import { COMPETENCIAS_LEITOURGIA } from '@/data/ritos';
import { cn } from '@/lib/cn';
import { contem, data as formatarData, tempoRelativo } from '@/lib/formato';
import type { Servico, SituacaoServico } from '@/types';
import {
  Abas,
  AreaTexto,
  Avatar,
  Botao,
  Campo,
  Cartao,
  CabecalhoCartao,
  CampoBusca,
  Icone,
  Modal,
  Selecao,
  Selo,
  Vazio,
} from '@/components/ui';
import type { TomSelo } from '@/components/ui/Selo';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const ROTULO_SITUACAO: Record<SituacaoServico, string> = {
  aberto: 'Aberto',
  atendido: 'Em atendimento',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
};

const TOM_SITUACAO: Record<SituacaoServico, TomSelo> = {
  aberto: 'atencao',
  atendido: 'info',
  concluido: 'positivo',
  cancelado: 'neutro',
};

/**
 * Leitourgia — o serviço comunitário honorífico (Códice C107:18).
 *
 * O confrade abdica do tempo de labor profano para ofertar competência
 * especializada — direito, saúde, engenharia — e assim erguer as Symphyles e
 * curar a dor material na vizinhança. Não é voluntariado genérico: é ofício.
 */
export function ServicoHonorifico() {
  const { base, atualizar, auditar } = useDados();
  const { membro, tem } = useAuth();
  const { avisar } = useAviso();

  const [filtro, setFiltro] = useState<SituacaoServico | 'todos' | 'minhas'>('aberto');
  const [termo, setTermo] = useState('');
  const [compondo, setCompondo] = useState(false);

  const lista = useMemo(() => {
    let itens = [...base.servicos].sort(
      (a, b) => new Date(b.abertoEm).getTime() - new Date(a.abertoEm).getTime(),
    );
    if (filtro === 'minhas' && membro) {
      itens = itens.filter(
        (s) => s.atendentesIds.includes(membro.id) || s.solicitanteId === membro.id,
      );
    } else if (filtro !== 'todos') {
      itens = itens.filter((s) => s.situacao === filtro);
    }
    if (termo) {
      itens = itens.filter(
        (s) => contem(s.titulo, termo) || contem(s.competenciaRequerida, termo),
      );
    }
    return itens;
  }, [base.servicos, filtro, termo, membro]);

  const minhasCompetencias = membro?.competencias ?? [];

  const oferecer = (servico: Servico) => {
    if (!membro) return;
    const jaAtende = servico.atendentesIds.includes(membro.id);
    atualizar((b) => ({
      ...b,
      servicos: b.servicos.map((s) =>
        s.id === servico.id
          ? {
              ...s,
              atendentesIds: jaAtende
                ? s.atendentesIds.filter((x) => x !== membro.id)
                : [...s.atendentesIds, membro.id],
              situacao: jaAtende && s.atendentesIds.length === 1 ? 'aberto' : 'atendido',
            }
          : s,
      ),
    }));
    if (!jaAtende) {
      auditar({
        membroId: membro.id,
        acao: 'Ofertou serviço honorífico',
        modulo: 'Leitourgia',
        detalhe: `${servico.titulo} — competência de ${servico.competenciaRequerida}.`,
      });
      avisar('sucesso', 'Serviço assumido', 'O solicitante será avisado do seu oferecimento.');
    }
  };

  const concluir = (servico: Servico) => {
    if (!membro) return;
    const agora = new Date().toISOString();
    atualizar((b) => ({
      ...b,
      servicos: b.servicos.map((s) =>
        s.id === servico.id ? { ...s, situacao: 'concluido' as const, concluidoEm: agora } : s,
      ),
      membros: b.membros.map((m) =>
        servico.atendentesIds.includes(m.id) ? { ...m, xp: m.xp + servico.xp } : m,
      ),
      transacoesXP: [
        ...servico.atendentesIds.map((id) => ({
          id: `tx-${Math.random().toString(36).slice(2, 9)}`,
          membroId: id,
          origem: 'projeto' as const,
          descricao: `Leitourgia: ${servico.titulo}`,
          pontos: servico.xp,
          registradoPor: membro.id,
          criadoEm: agora,
        })),
        ...b.transacoesXP,
      ],
    }));
    auditar({
      membroId: membro.id,
      acao: 'Concluiu serviço honorífico',
      modulo: 'Leitourgia',
      detalhe: `${servico.titulo} — ${servico.atendentesIds.length} atendentes, +${servico.xp} XP cada.`,
    });
    avisar('sucesso', 'Serviço concluído', `+${servico.xp} XP a cada atendente.`);
  };

  const abrir = (dados: { titulo: string; descricao: string; competencia: string }) => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      servicos: [
        {
          id: `se-${Math.random().toString(36).slice(2, 9)}`,
          titulo: dados.titulo,
          descricao: dados.descricao,
          competenciaRequerida: dados.competencia,
          solicitanteId: membro.id,
          nucleoId: membro.nucleoId,
          celulaId:
            b.celulas.find((c) => c.nucleoId === membro.nucleoId && c.esfera === 'symphyle')?.id ??
            null,
          atendentesIds: [],
          situacao: 'aberto' as const,
          abertoEm: new Date().toISOString(),
          concluidoEm: null,
          xp: 120,
        },
        ...b.servicos,
      ],
    }));
    avisar('sucesso', 'Necessidade registrada', 'A irmandade foi notificada.');
    setCompondo(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina
        titulo="Leitourgia"
        descricao="Serviço honorífico: o confrade oferta sua competência especializada para erguer as Symphyles e curar a dor material na vizinhança."
        acao={
          tem('propostas.criar') && (
            <Botao icone="add" onClick={() => setCompondo(true)}>
              Registrar necessidade
            </Botao>
          )
        }
      />

      {minhasCompetencias.length > 0 && (
        <Cartao destaque>
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ouro/20 text-[rgb(var(--c-gold-deep))]">
              <Icone nome="volunteer_activism" className="text-[20px]" />
            </span>
            <div className="min-w-0">
              <p className="font-bold text-ink">Suas competências</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {minhasCompetencias.map((c) => (
                  <Selo key={c} tom="ouro">
                    {c}
                  </Selo>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                As necessidades compatíveis aparecem destacadas na lista abaixo.
              </p>
            </div>
          </div>
        </Cartao>
      )}

      <CampoBusca valor={termo} aoMudar={setTermo} placeholder="Buscar por necessidade ou competência…" />

      <Abas
        itens={[
          { id: 'aberto', rotulo: 'Abertas', contagem: base.servicos.filter((s) => s.situacao === 'aberto').length },
          { id: 'atendido', rotulo: 'Em atendimento' },
          { id: 'concluido', rotulo: 'Concluídas' },
          { id: 'minhas', rotulo: 'Minhas', icone: 'person' },
          { id: 'todos', rotulo: 'Todas', contagem: base.servicos.length },
        ]}
        ativo={filtro}
        aoMudar={(v) => setFiltro(v as typeof filtro)}
        rotuloGrupo="Situação das necessidades"
      />

      {lista.length === 0 ? (
        <Cartao>
          <Vazio
            icone="volunteer_activism"
            titulo="Nenhuma necessidade"
            descricao="Não há necessidades neste filtro."
          />
        </Cartao>
      ) : (
        <div className="space-y-3">
          {lista.map((s) => {
            const compativel = minhasCompetencias.includes(s.competenciaRequerida);
            const solicitante = membroPorId(base, s.solicitanteId);
            const nucleo = nucleoPorId(base, s.nucleoId);
            const atendo = membro ? s.atendentesIds.includes(membro.id) : false;
            const souSolicitante = membro?.id === s.solicitanteId;
            return (
              <Cartao key={s.id} className={cn(compativel && s.situacao === 'aberto' && 'border-ouro/40')}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold leading-snug text-ink">{s.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.descricao}</p>
                  </div>
                  <Selo tom={TOM_SITUACAO[s.situacao]} rotulo>
                    {ROTULO_SITUACAO[s.situacao]}
                  </Selo>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Selo tom={compativel ? 'ouro' : 'neutro'} icone="workspace_premium">
                    {s.competenciaRequerida}
                  </Selo>
                  {compativel && s.situacao === 'aberto' && (
                    <span className="text-xs font-bold text-[rgb(var(--c-gold-deep))] dark:text-ouro">
                      Compatível com sua competência
                    </span>
                  )}
                  <span className="ml-auto text-xs text-ink-faint">+{s.xp} XP</span>
                </div>

                {s.atendentesIds.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-surface-muted/60 p-3">
                    <span className="text-xs font-bold text-ink-soft">Atendem:</span>
                    {s.atendentesIds.map((id) => {
                      const a = membroPorId(base, id);
                      return (
                        <span key={id} className="flex items-center gap-1.5">
                          <Avatar nome={a?.nomeCompleto ?? 'Membro'} tamanho="xs" />
                          <span className="text-xs text-ink">{a?.nomeExibicao}</span>
                        </span>
                      );
                    })}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 text-xs text-ink-faint">
                  <span className="flex items-center gap-1.5">
                    <Avatar nome={solicitante?.nomeCompleto ?? 'Membro'} tamanho="xs" />
                    {solicitante?.nomeExibicao}
                  </span>
                  {nucleo && (
                    <span className="flex items-center gap-1">
                      <Icone nome="hub" className="text-[14px]" />
                      {nucleo.nome.replace('Núcleo ', '')}
                    </span>
                  )}
                  <span>{s.concluidoEm ? `Concluído em ${formatarData(s.concluidoEm)}` : tempoRelativo(s.abertoEm)}</span>

                  <div className="ml-auto flex gap-2">
                    {s.situacao !== 'concluido' && s.situacao !== 'cancelado' && !souSolicitante && (
                      <Botao
                        tamanho="pequeno"
                        variante={atendo ? 'secundario' : 'contorno'}
                        icone={atendo ? 'check' : 'volunteer_activism'}
                        onClick={() => oferecer(s)}
                      >
                        {atendo ? 'Atendendo' : 'Ofertar serviço'}
                      </Botao>
                    )}
                    {souSolicitante && s.situacao === 'atendido' && (
                      <Botao tamanho="pequeno" icone="done_all" onClick={() => concluir(s)}>
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

      <ModalNecessidade aberto={compondo} aoFechar={() => setCompondo(false)} aoAbrir={abrir} />

      <Cartao>
        <CabecalhoCartao titulo="Sobre a Leitourgia" icone="menu_book" />
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Serviço comunitário honorífico prestado abnegadamente pelos confrades, no qual abdicam do
          tempo de labor profano para ofertar suas competências especializadas — direito, saúde,
          engenharia — a fim de erguer as Symphyles e curar a dor material na vizinhança.
        </p>
        <p className="mt-2 text-xs text-ink-faint">Códice Verde, C107:18</p>
      </Cartao>
    </div>
  );
}

function ModalNecessidade({
  aberto,
  aoFechar,
  aoAbrir,
}: {
  aberto: boolean;
  aoFechar: () => void;
  aoAbrir: (d: { titulo: string; descricao: string; competencia: string }) => void;
}) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [competencia, setCompetencia] = useState(COMPETENCIAS_LEITOURGIA[0]);
  const [erros, setErros] = useState<Record<string, string>>({});

  const enviar = () => {
    const e: Record<string, string> = {};
    if (titulo.trim().length < 8) e.titulo = 'Descreva a necessidade em ao menos 8 caracteres.';
    if (descricao.trim().length < 20) e.descricao = 'Detalhe a necessidade em ao menos 20 caracteres.';
    setErros(e);
    if (Object.keys(e).length > 0) return;
    aoAbrir({ titulo: titulo.trim(), descricao: descricao.trim(), competencia });
    setTitulo('');
    setDescricao('');
  };

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo="Registrar necessidade"
      descricao="A necessidade é posta ao corpo da irmandade; o atendimento é sempre voluntário."
      rodape={
        <>
          <Botao variante="contorno" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao icone="send" onClick={enviar}>
            Registrar
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <Campo rotulo="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} erro={erros.titulo} required />
        <Selecao
          rotulo="Competência requerida"
          value={competencia}
          onChange={(e) => setCompetencia(e.target.value)}
        >
          {COMPETENCIAS_LEITOURGIA.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Selecao>
        <AreaTexto
          rotulo="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          erro={erros.descricao}
          dica="Explique o que se necessita, para quem e em que prazo."
          required
        />
      </div>
    </Modal>
  );
}
