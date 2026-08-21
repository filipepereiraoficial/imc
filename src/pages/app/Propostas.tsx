import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { membroPorId, nucleoPorId } from '@/lib/consultas';
import { contem, data as formatarData, dataHora } from '@/lib/formato';
import { cn } from '@/lib/cn';
import type { Proposta, SituacaoProposta } from '@/types';
import {
  CartaoProposta,
  ROTULO_SITUACAO_PROPOSTA,
  TOM_SITUACAO_PROPOSTA,
} from '@/components/domain/Itens';
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
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const CATEGORIAS = [
  'Organização territorial',
  'Formação',
  'Tesouraria',
  'Secretaria',
  'Institucional',
  'Documentação',
  'Comunicação',
];

const FLUXO: SituacaoProposta[] = ['recebida', 'em_analise', 'em_discussao', 'aprovada'];

export function Propostas() {
  const { base, atualizar, auditar } = useDados();
  const { membro, tem } = useAuth();
  const { avisar } = useAviso();
  const [situacao, setSituacao] = useState<SituacaoProposta | 'todas'>('todas');
  const [termo, setTermo] = useState('');
  const [compondo, setCompondo] = useState(false);

  const lista = useMemo(() => {
    let itens = [...base.propostas].sort(
      (a, b) => new Date(b.atualizadaEm).getTime() - new Date(a.atualizadaEm).getTime(),
    );
    if (situacao !== 'todas') itens = itens.filter((p) => p.situacao === situacao);
    if (termo) itens = itens.filter((p) => contem(p.titulo, termo) || contem(p.resumo, termo));
    return itens;
  }, [base.propostas, situacao, termo]);

  const apresentar = (dados: { titulo: string; resumo: string; conteudo: string; categoria: string }) => {
    if (!membro) return;
    const agora = new Date().toISOString();
    const id = `pp-${Math.random().toString(36).slice(2, 9)}`;
    atualizar((b) => ({
      ...b,
      propostas: [
        {
          id,
          ...dados,
          autorId: membro.id,
          nucleoId: membro.nucleoId,
          situacao: 'recebida' as const,
          apoios: [membro.id],
          criadaEm: agora,
          atualizadaEm: agora,
          tramitacao: [{ situacao: 'recebida' as const, em: agora, porId: membro.id, nota: 'Protocolo registrado.' }],
        },
        ...b.propostas,
      ],
    }));
    auditar({ membroId: membro.id, acao: 'Apresentou proposta', modulo: 'Propostas', detalhe: dados.titulo });
    avisar('sucesso', 'Proposta protocolada', 'Sua proposta seguirá para análise.');
    setCompondo(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina
        titulo="Propostas"
        descricao="Canal de participação: apresente, apoie e acompanhe a tramitação das propostas da Ordem."
        acao={
          tem('propostas.criar') && (
            <Botao icone="add" onClick={() => setCompondo(true)}>
              Nova proposta
            </Botao>
          )
        }
      />

      <CampoBusca valor={termo} aoMudar={setTermo} placeholder="Buscar proposta…" />

      <Abas
        itens={[
          { id: 'todas', rotulo: 'Todas', contagem: base.propostas.length },
          ...(Object.keys(ROTULO_SITUACAO_PROPOSTA) as SituacaoProposta[]).map((s) => ({
            id: s,
            rotulo: ROTULO_SITUACAO_PROPOSTA[s],
            contagem: base.propostas.filter((p) => p.situacao === s).length,
          })),
        ]}
        ativo={situacao}
        aoMudar={(v) => setSituacao(v as SituacaoProposta | 'todas')}
        rotuloGrupo="Situação das propostas"
      />

      {lista.length === 0 ? (
        <Cartao>
          <Vazio icone="gavel" titulo="Nenhuma proposta" descricao="Ajuste os filtros ou apresente a primeira proposta." />
        </Cartao>
      ) : (
        <div className="space-y-3">
          {lista.map((p) => (
            <CartaoProposta key={p.id} proposta={p} apoiada={membro ? p.apoios.includes(membro.id) : false} />
          ))}
        </div>
      )}

      <ModalNovaProposta aberto={compondo} aoFechar={() => setCompondo(false)} aoEnviar={apresentar} />
    </div>
  );
}

function ModalNovaProposta({
  aberto,
  aoFechar,
  aoEnviar,
}: {
  aberto: boolean;
  aoFechar: () => void;
  aoEnviar: (d: { titulo: string; resumo: string; conteudo: string; categoria: string }) => void;
}) {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [erros, setErros] = useState<Record<string, string>>({});

  const enviar = () => {
    const e: Record<string, string> = {};
    if (titulo.trim().length < 6) e.titulo = 'O título deve ter ao menos 6 caracteres.';
    if (resumo.trim().length < 20) e.resumo = 'O resumo deve ter ao menos 20 caracteres.';
    if (conteudo.trim().length < 60) e.conteudo = 'Detalhe a proposta com ao menos 60 caracteres.';
    setErros(e);
    if (Object.keys(e).length > 0) return;
    aoEnviar({ titulo: titulo.trim(), resumo: resumo.trim(), conteudo: conteudo.trim(), categoria });
    setTitulo('');
    setResumo('');
    setConteudo('');
  };

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo="Apresentar proposta"
      descricao="A proposta será protocolada e seguirá o rito previsto no Regimento Interno."
      rodape={
        <>
          <Botao variante="contorno" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao icone="send" onClick={enviar}>
            Protocolar
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <Campo rotulo="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} erro={erros.titulo} required />
        <Selecao rotulo="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Selecao>
        <AreaTexto
          rotulo="Resumo"
          value={resumo}
          onChange={(e) => setResumo(e.target.value)}
          erro={erros.resumo}
          dica="Uma síntese objetiva do que se propõe."
          required
        />
        <AreaTexto
          rotulo="Conteúdo integral"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          erro={erros.conteudo}
          dica="Justificativa, impacto, cronograma e responsáveis pela execução."
          className="[&_textarea]:min-h-40"
          required
        />
      </div>
    </Modal>
  );
}

export function PropostaDetalhe() {
  const { id } = useParams();
  const { base, atualizar, auditar } = useDados();
  const { membro, tem } = useAuth();
  const { avisar } = useAviso();

  const proposta = base.propostas.find((p) => p.id === id);
  if (!proposta) {
    return (
      <Cartao>
        <Vazio icone="gavel" titulo="Proposta não encontrada" />
      </Cartao>
    );
  }

  const autor = membroPorId(base, proposta.autorId);
  const nucleo = nucleoPorId(base, proposta.nucleoId);
  const apoiada = membro ? proposta.apoios.includes(membro.id) : false;
  const podeTramitar = tem('propostas.tramitar');

  const alternarApoio = () => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      propostas: b.propostas.map((p) =>
        p.id === proposta.id
          ? {
              ...p,
              apoios: p.apoios.includes(membro.id)
                ? p.apoios.filter((x) => x !== membro.id)
                : [...p.apoios, membro.id],
            }
          : p,
      ),
    }));
  };

  const tramitar = (nova: SituacaoProposta) => {
    if (!membro) return;
    const agora = new Date().toISOString();
    atualizar((b) => ({
      ...b,
      propostas: b.propostas.map((p) =>
        p.id === proposta.id
          ? {
              ...p,
              situacao: nova,
              atualizadaEm: agora,
              tramitacao: [
                ...p.tramitacao,
                { situacao: nova, em: agora, porId: membro.id, nota: 'Tramitação registrada pela administração.' },
              ],
            }
          : p,
      ),
    }));
    auditar({
      membroId: membro.id,
      acao: 'Tramitou proposta',
      modulo: 'Propostas',
      detalhe: `${proposta.titulo} → ${ROTULO_SITUACAO_PROPOSTA[nova]}`,
    });
    avisar('sucesso', 'Tramitação registrada', ROTULO_SITUACAO_PROPOSTA[nova]);
  };

  const indiceAtual = FLUXO.indexOf(proposta.situacao);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina
        titulo={proposta.titulo}
        voltarPara="/propostas"
        rotuloVoltar="Voltar às propostas"
        acao={
          <Botao variante={apoiada ? 'secundario' : 'contorno'} icone="thumb_up" onClick={alternarApoio}>
            {`${apoiada ? 'Apoiando' : 'Apoiar'} · ${proposta.apoios.length}`}
          </Botao>
        }
      />

      <Cartao>
        <div className="flex flex-wrap items-center gap-3">
          <Selo tom={TOM_SITUACAO_PROPOSTA[proposta.situacao]} rotulo>
            {ROTULO_SITUACAO_PROPOSTA[proposta.situacao]}
          </Selo>
          <Selo tom="neutro" icone="label">
            {proposta.categoria}
          </Selo>
          <span className="ml-auto text-xs text-ink-faint">
            Protocolada em {formatarData(proposta.criadaEm)}
          </span>
        </div>

        <p className="mt-4 font-semibold leading-relaxed text-ink">{proposta.resumo}</p>
        <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-soft">{proposta.conteudo}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <Avatar nome={autor?.nomeCompleto ?? 'Membro'} tamanho="sm" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink">{autor?.nomeCompleto}</p>
            <p className="text-xs text-ink-faint">
              {autor?.numeroMembro}
              {nucleo && ` · ${nucleo.nome}`}
            </p>
          </div>
        </div>
      </Cartao>

      {proposta.respostaAdministracao && (
        <Cartao destaque>
          <CabecalhoCartao titulo="Resposta da administração" icone="record_voice_over" />
          <p className="mt-3 leading-relaxed text-ink-soft">{proposta.respostaAdministracao}</p>
        </Cartao>
      )}

      <Cartao>
        <CabecalhoCartao titulo="Tramitação" icone="timeline" />

        {indiceAtual >= 0 && (
          <ol className="mt-5 flex items-center" aria-label="Etapas da tramitação">
            {FLUXO.map((etapa, i) => (
              <li key={etapa} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      'grid h-8 w-8 place-items-center rounded-full text-xs font-bold',
                      i <= indiceAtual ? 'bg-ouro text-[rgb(24_20_12)]' : 'bg-surface-strong text-ink-faint',
                    )}
                  >
                    {i < indiceAtual ? <Icone nome="check" className="text-[16px]" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      'hidden text-[0.65rem] font-semibold sm:block',
                      i <= indiceAtual ? 'text-ink' : 'text-ink-faint',
                    )}
                  >
                    {ROTULO_SITUACAO_PROPOSTA[etapa]}
                  </span>
                </div>
                {i < FLUXO.length - 1 && (
                  <span
                    className={cn('mx-1 h-0.5 flex-1 rounded-full', i < indiceAtual ? 'bg-ouro' : 'bg-surface-strong')}
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ol>
        )}

        <ol className="mt-6 space-y-3 border-t border-line pt-4">
          {[...proposta.tramitacao].reverse().map((t, i) => {
            const responsavel = membroPorId(base, t.porId);
            return (
              <li key={i} className="flex gap-3">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-muted text-ink-soft">
                  <Icone nome="history" className="text-[15px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink">{ROTULO_SITUACAO_PROPOSTA[t.situacao]}</p>
                  {t.nota && <p className="text-sm text-ink-soft">{t.nota}</p>}
                  <p className="mt-0.5 text-xs text-ink-faint">
                    {dataHora(t.em)} · {responsavel?.nomeExibicao ?? 'Sistema'}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {podeTramitar && (
          <div className="mt-5 border-t border-line pt-4">
            <p className="rotulo mb-2">Ações da administração</p>
            <div className="flex flex-wrap gap-2">
              {(['em_analise', 'em_discussao', 'aprovada', 'rejeitada', 'arquivada'] as SituacaoProposta[])
                .filter((s) => s !== proposta.situacao)
                .map((s) => (
                  <Botao
                    key={s}
                    tamanho="pequeno"
                    variante={s === 'aprovada' ? 'secundario' : s === 'rejeitada' ? 'perigo' : 'contorno'}
                    onClick={() => tramitar(s)}
                  >
                    {ROTULO_SITUACAO_PROPOSTA[s]}
                  </Botao>
                ))}
            </div>
          </div>
        )}
      </Cartao>

      <Cartao>
        <CabecalhoCartao titulo={`Apoios (${proposta.apoios.length})`} icone="thumb_up" />
        <ul className="mt-4 flex flex-wrap gap-2">
          {proposta.apoios.slice(0, 24).map((idApoio) => {
            const m = membroPorId(base, idApoio);
            if (!m) return null;
            return (
              <li key={idApoio} className="flex items-center gap-2 rounded-full border border-line bg-surface-muted/60 py-1 pl-1 pr-3">
                <Avatar nome={m.nomeCompleto} tamanho="xs" />
                <span className="text-xs font-semibold text-ink">{m.nomeExibicao}</span>
              </li>
            );
          })}
          {proposta.apoios.length > 24 && (
            <li className="flex items-center rounded-full bg-surface-muted px-3 py-1.5 text-xs font-bold text-ink-soft">
              +{proposta.apoios.length - 24}
            </li>
          )}
        </ul>
      </Cartao>
    </div>
  );
}

export type { Proposta };
