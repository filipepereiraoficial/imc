import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { membroPorId } from '@/lib/consultas';
import {
  apurar,
  conferirConvocacao,
  jaVotou,
  quorumInstalacao,
  votantes,
} from '@/lib/deliberacao';
import { cn } from '@/lib/cn';
import { data as formatarData, dataHora, hora, numero, percentual, tempoRelativo } from '@/lib/formato';
import type { Assembleia, Materia, OpcaoVoto, SituacaoAssembleia } from '@/types';
import {
  Abas,
  Avatar,
  Botao,
  Cartao,
  CabecalhoCartao,
  Confirmacao,
  Icone,
  Selo,
  Vazio,
} from '@/components/ui';
import type { TomSelo } from '@/components/ui/Selo';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const ROTULO_SITUACAO: Record<SituacaoAssembleia, string> = {
  convocada: 'Convocada',
  instalada: 'Em sessão',
  encerrada: 'Encerrada',
  cancelada: 'Cancelada',
};

const TOM_SITUACAO: Record<SituacaoAssembleia, TomSelo> = {
  convocada: 'info',
  instalada: 'ouro',
  encerrada: 'neutro',
  cancelada: 'critico',
};

export function Assembleias() {
  const { base } = useDados();
  const [filtro, setFiltro] = useState<SituacaoAssembleia | 'todas'>('todas');

  const lista = useMemo(() => {
    const itens = [...base.assembleias].sort(
      (a, b) => new Date(b.inicio).getTime() - new Date(a.inicio).getTime(),
    );
    return filtro === 'todas' ? itens : itens.filter((a) => a.situacao === filtro);
  }, [base.assembleias, filtro]);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina
        titulo="Assembleias"
        descricao="Órgão soberano de deliberação da Ordem. Convocação, quórum e votação nominal na forma dos Arts. 27 a 32 do Estatuto."
      />

      <Abas
        itens={[
          { id: 'todas', rotulo: 'Todas', contagem: base.assembleias.length },
          ...(Object.keys(ROTULO_SITUACAO) as SituacaoAssembleia[]).map((sit) => ({
            id: sit,
            rotulo: ROTULO_SITUACAO[sit],
            contagem: base.assembleias.filter((a) => a.situacao === sit).length,
          })),
        ]}
        ativo={filtro}
        aoMudar={(v) => setFiltro(v as SituacaoAssembleia | 'todas')}
        rotuloGrupo="Situação das assembleias"
      />

      {lista.length === 0 ? (
        <Cartao>
          <Vazio icone="how_to_vote" titulo="Nenhuma assembleia" descricao="Não há sessões neste filtro." />
        </Cartao>
      ) : (
        <div className="space-y-3">
          {lista.map((a) => {
            const materias = base.materias.filter((m) => m.assembleiaId === a.id);
            const convocacao = conferirConvocacao(a);
            return (
              <Link
                key={a.id}
                to={`/assembleias/${a.id}`}
                className="flex flex-col gap-3 rounded-card border border-line bg-surface-card p-4 shadow-suave transition hover:border-line-strong hover:shadow-elevado"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold leading-snug text-ink">{a.titulo}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{a.descricao}</p>
                  </div>
                  <Selo tom={TOM_SITUACAO[a.situacao]} rotulo>
                    {ROTULO_SITUACAO[a.situacao]}
                  </Selo>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-3 text-xs text-ink-faint">
                  <span className="flex items-center gap-1">
                    <Icone nome="event" className="text-[14px]" />
                    {formatarData(a.inicio)} · {hora(a.inicio)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icone nome="ballot" className="text-[14px]" />
                    {materias.length} {materias.length === 1 ? 'matéria' : 'matérias'}
                  </span>
                  <Selo tom={a.ordinaria ? 'neutro' : 'atencao'}>
                    {a.ordinaria ? 'Ordinária' : 'Extraordinária'}
                  </Selo>
                  {!convocacao.regular && a.situacao === 'convocada' && (
                    <Selo tom="atencao" icone="warning">
                      Antecedência
                    </Selo>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AssembleiaDetalhe() {
  const { id } = useParams();
  const { base, atualizar, auditar } = useDados();
  const { membro, tem } = useAuth();
  const { avisar } = useAviso();
  const [encerrando, setEncerrando] = useState<Materia | null>(null);

  const assembleia = base.assembleias.find((a) => a.id === id);

  const dados = useMemo(() => {
    if (!assembleia) return null;
    const aptos = votantes(base.membros);
    const presencas = base.presencasAssembleia.filter((p) => p.assembleiaId === assembleia.id);
    return {
      aptos,
      presencas,
      quorum: quorumInstalacao(
        presencas.length,
        aptos.length,
        assembleia.convocacaoAplicada ?? 'primeira',
      ),
      convocacao: conferirConvocacao(assembleia),
      materias: base.materias
        .filter((m) => m.assembleiaId === assembleia.id)
        .sort((a, b) => a.ordem - b.ordem),
      convocador: membroPorId(base, assembleia.convocadaPorId),
    };
  }, [assembleia, base]);

  if (!assembleia || !dados) {
    return (
      <Cartao>
        <Vazio icone="how_to_vote" titulo="Assembleia não encontrada" />
      </Cartao>
    );
  }

  const presente = dados.presencas.some((p) => p.membroId === membro?.id);
  const apto = membro ? dados.aptos.some((m) => m.id === membro.id) : false;
  const emSessao = assembleia.situacao === 'instalada';
  // A presença é o que forma o quórum de instalação (Art. 31): registra-se
  // desde a convocação, não apenas depois de instalada a sessão.
  const aberto = assembleia.situacao === 'convocada' || emSessao;
  const podeConduzir = tem('configuracoes.gerenciar') || tem('propostas.tramitar');

  const registrarPresenca = () => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      presencasAssembleia: [
        ...b.presencasAssembleia,
        {
          id: `pa-${Math.random().toString(36).slice(2, 9)}`,
          assembleiaId: assembleia.id,
          membroId: membro.id,
          registradaEm: new Date().toISOString(),
        },
      ],
    }));
    avisar('sucesso', 'Presença registrada', 'Sua presença consta da lista da sessão.');
  };

  /**
   * Est. Art. 31 — em segunda convocação a assembleia instala-se com qualquer
   * número, após o prazo mínimo previsto no edital.
   */
  const aplicarSegundaConvocacao = () => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      assembleias: b.assembleias.map((a) =>
        a.id === assembleia.id ? { ...a, convocacaoAplicada: 'segunda' as const } : a,
      ),
    }));
    auditar({
      membroId: membro.id,
      acao: 'Aplicou segunda convocação',
      modulo: 'Assembleias',
      detalhe: `${assembleia.titulo} — instalação com qualquer número, na forma do Art. 31.`,
    });
    avisar(
      'atencao',
      'Segunda convocação aplicada',
      'A sessão pode instalar-se com qualquer número de presentes.',
    );
  };

  const instalar = () => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      assembleias: b.assembleias.map((a) =>
        a.id === assembleia.id
          ? { ...a, situacao: 'instalada' as const, convocacaoAplicada: a.convocacaoAplicada ?? 'primeira' }
          : a,
      ),
    }));
    auditar({
      membroId: membro.id,
      acao: 'Instalou assembleia',
      modulo: 'Assembleias',
      detalhe: `${assembleia.titulo} — ${dados.presencas.length} presentes de ${dados.aptos.length} aptos.`,
    });
    avisar('sucesso', 'Sessão instalada', 'A assembleia está aberta à deliberação.');
  };

  const votar = (materia: Materia, opcao: OpcaoVoto) => {
    if (!membro) return;
    const anterior = jaVotou(base.votos, materia.id, membro.id);
    atualizar((b) => ({
      ...b,
      votos: anterior
        ? b.votos.map((v) =>
            v.id === anterior.id ? { ...v, opcao, registradoEm: new Date().toISOString() } : v,
          )
        : [
            ...b.votos,
            {
              id: `vo-${Math.random().toString(36).slice(2, 9)}`,
              materiaId: materia.id,
              membroId: membro.id,
              opcao,
              registradoEm: new Date().toISOString(),
            },
          ],
    }));
    auditar({
      membroId: membro.id,
      acao: 'Registrou voto',
      modulo: 'Assembleias',
      detalhe: `${materia.titulo} — voto ${opcao}. Votação nominal (Est. Art. 62).`,
    });
  };

  const encerrarMateria = (materia: Materia) => {
    if (!membro) return;
    const resultado = apurar(materia, base.votos);
    atualizar((b) => ({
      ...b,
      materias: b.materias.map((m) => (m.id === materia.id ? { ...m, encerrada: true } : m)),
    }));
    auditar({
      membroId: membro.id,
      acao: 'Encerrou votação',
      modulo: 'Assembleias',
      detalhe: `${materia.titulo} — ${resultado.aprovada ? 'aprovada' : 'rejeitada'} com ${resultado.favor} a favor, ${resultado.contra} contra e ${resultado.abstencao} abstenções.`,
    });
    avisar(
      resultado.aprovada ? 'sucesso' : 'atencao',
      resultado.aprovada ? 'Matéria aprovada' : 'Matéria rejeitada',
      `${resultado.favor} a favor de ${resultado.exigidos} exigidos.`,
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina
        titulo={assembleia.titulo}
        voltarPara="/assembleias"
        rotuloVoltar="Voltar às assembleias"
        acao={
          <>
            {aberto && apto && !presente && (
              <Botao icone="how_to_reg" onClick={registrarPresenca}>
                Registrar presença
              </Botao>
            )}
            {assembleia.situacao === 'convocada' &&
              podeConduzir &&
              !dados.quorum.instalavel &&
              assembleia.convocacaoAplicada !== 'segunda' && (
                <Botao variante="contorno" icone="replay" onClick={aplicarSegundaConvocacao}>
                  Segunda convocação
                </Botao>
              )}
            {assembleia.situacao === 'convocada' && podeConduzir && (
              <Botao icone="gavel" onClick={instalar} disabled={!dados.quorum.instalavel}>
                {dados.quorum.instalavel ? 'Instalar sessão' : 'Quórum insuficiente'}
              </Botao>
            )}
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Selo tom={TOM_SITUACAO[assembleia.situacao]} rotulo>
          {ROTULO_SITUACAO[assembleia.situacao]}
        </Selo>
        <Selo tom={assembleia.ordinaria ? 'neutro' : 'atencao'}>
          {assembleia.ordinaria ? 'Ordinária' : 'Extraordinária'}
        </Selo>
        {presente && <Selo tom="positivo" icone="check">Presença registrada</Selo>}
      </div>

      <Cartao>
        <p className="leading-relaxed text-ink-soft">{assembleia.descricao}</p>
        <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-line pt-4 sm:grid-cols-2">
          <Linha icone="event" rotulo="Sessão" valor={dataHora(assembleia.inicio)} />
          <Linha icone="location_on" rotulo="Local" valor={assembleia.local} />
          <Linha icone="campaign" rotulo="Convocada em" valor={formatarData(assembleia.convocadaEm)} />
          <Linha
            icone="person"
            rotulo="Convocada por"
            valor={dados.convocador?.nomeCompleto ?? '—'}
          />
        </dl>
      </Cartao>

      {/* Est. Art. 30 — a antecedência é condição de regularidade da convocação. */}
      <div
        className={cn(
          'flex items-start gap-2.5 rounded-card border p-4',
          dados.convocacao.regular
            ? 'border-positivo/25 bg-positivo/10'
            : 'border-atencao/30 bg-atencao/10',
        )}
      >
        <Icone
          nome={dados.convocacao.regular ? 'verified' : 'warning'}
          className={cn(
            'mt-px shrink-0 text-[19px]',
            dados.convocacao.regular ? 'text-positivo' : 'text-atencao',
          )}
        />
        <p className="text-sm leading-relaxed text-ink-soft">{dados.convocacao.mensagem}</p>
      </div>

      {/* Est. Art. 31 — quórum de instalação. */}
      <Cartao>
        <CabecalhoCartao
          titulo="Quórum de instalação"
          descricao={
            assembleia.convocacaoAplicada === 'segunda'
              ? 'Segunda convocação: instala-se com qualquer número (Est. Art. 31).'
              : 'Primeira convocação: exige maioria absoluta dos associados com direito a voto (Est. Art. 31).'
          }
          icone="groups"
        />
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-titulo tabular-nums text-ink">{dados.quorum.presentes}</span>
          <span className="text-sm text-ink-soft">
            de {dados.quorum.aptos} aptos · exigidos {dados.quorum.exigido}
          </span>
          <span className="ml-auto text-sm font-bold tabular-nums text-ink">
            {percentual(dados.quorum.atingido, 1)}
          </span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-surface-strong">
          <div
            className={cn(
              'h-full rounded-full transition-[width] duration-500',
              dados.quorum.instalavel ? 'bg-positivo' : 'bg-atencao',
            )}
            style={{
              width: `${Math.min(100, (dados.quorum.presentes / Math.max(1, dados.quorum.exigido)) * 100)}%`,
            }}
          />
        </div>
        <p className="mt-2 text-xs text-ink-faint">
          {dados.quorum.instalavel
            ? 'Quórum atingido: a sessão pode ser instalada.'
            : assembleia.convocacaoAplicada === 'segunda'
              ? 'Segunda convocação: instala-se com qualquer número.'
              : `Faltam ${dados.quorum.exigido - dados.quorum.presentes} presenças para a instalação em primeira convocação. Não atingido o quórum, cabe a segunda convocação (Art. 31).`}
        </p>
      </Cartao>

      <div className="space-y-4">
        <h2 className="rotulo">Ordem do dia</h2>
        {dados.materias.map((materia) => (
          <CartaoMateria
            key={materia.id}
            materia={materia}
            emSessao={emSessao}
            apto={apto && presente}
            meuVoto={membro ? jaVotou(base.votos, materia.id, membro.id) : undefined}
            aoVotar={(opcao) => votar(materia, opcao)}
            aoEncerrar={podeConduzir && emSessao ? () => setEncerrando(materia) : undefined}
          />
        ))}
      </div>

      {assembleia.ata && (
        <Cartao>
          <CabecalhoCartao titulo="Ata" descricao="Registro das deliberações (Est. Art. 62)." icone="history_edu" />
          <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-soft">{assembleia.ata}</p>
        </Cartao>
      )}

      <Confirmacao
        aberto={Boolean(encerrando)}
        aoFechar={() => setEncerrando(null)}
        aoConfirmar={() => encerrando && encerrarMateria(encerrando)}
        titulo="Encerrar a votação?"
        mensagem={`A apuração de “${encerrando?.titulo ?? ''}” será registrada e não poderá ser reaberta. Os votos permanecem no registro nominal da sessão.`}
        rotuloConfirmar="Encerrar votação"
      />
    </div>
  );
}

function CartaoMateria({
  materia,
  emSessao,
  apto,
  meuVoto,
  aoVotar,
  aoEncerrar,
}: {
  materia: Materia;
  emSessao: boolean;
  apto: boolean;
  meuVoto?: { opcao: OpcaoVoto };
  aoVotar: (opcao: OpcaoVoto) => void;
  aoEncerrar?: () => void;
}) {
  const { base } = useDados();
  const resultado = apurar(materia, base.votos);
  const votosDaMateria = base.votos.filter((v) => v.materiaId === materia.id);
  const [nominalVisivel, setNominalVisivel] = useState(false);

  const opcoes: { valor: OpcaoVoto; rotulo: string; icone: string }[] = [
    { valor: 'favor', rotulo: 'A favor', icone: 'thumb_up' },
    { valor: 'contra', rotulo: 'Contra', icone: 'thumb_down' },
    { valor: 'abstencao', rotulo: 'Abstenção', icone: 'remove' },
  ];

  return (
    <Cartao>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="rotulo">Matéria {materia.ordem}</p>
          <h3 className="mt-1 font-bold leading-snug text-ink">{materia.titulo}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{materia.descricao}</p>
        </div>
        {materia.encerrada && (
          <Selo tom={resultado.aprovada ? 'positivo' : 'critico'} rotulo>
            {resultado.aprovada ? 'Aprovada' : 'Rejeitada'}
          </Selo>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Selo tom={materia.quorum === 'qualificado' ? 'atencao' : 'neutro'} icone="gavel">
          {materia.quorum === 'qualificado' ? 'Quórum de 2/3' : 'Maioria simples'}
        </Selo>
        {materia.fundamento && <span className="text-xs text-ink-faint">{materia.fundamento}</span>}
      </div>

      {/* Apuração — Est. Art. 32: a abstenção não é voto válido. */}
      <div className="mt-4 space-y-2">
        {[
          { rotulo: 'A favor', valor: resultado.favor, cor: 'var(--viz-bom)' },
          { rotulo: 'Contra', valor: resultado.contra, cor: 'var(--viz-critico)' },
          { rotulo: 'Abstenções', valor: resultado.abstencao, cor: 'rgb(var(--c-ink-faint))' },
        ].map((linha) => (
          <div key={linha.rotulo}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-ink-soft">{linha.rotulo}</span>
              <span className="font-bold tabular-nums text-ink">{linha.valor}</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${resultado.total ? (linha.valor / resultado.total) * 100 : 0}%`,
                  backgroundColor: linha.cor,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-ink-faint">
        {numero(resultado.validos)} votos válidos · {resultado.exigidos} necessários para aprovação
        {resultado.abstencao > 0 && ` · ${resultado.abstencao} abstenções não integram o cálculo`}
      </p>

      {emSessao && !materia.encerrada && apto && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
          {opcoes.map((o) => (
            <button
              key={o.valor}
              type="button"
              onClick={() => aoVotar(o.valor)}
              aria-pressed={meuVoto?.opcao === o.valor}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition',
                meuVoto?.opcao === o.valor
                  ? 'border-transparent bg-ink text-ink-inverse shadow-suave'
                  : 'border-line-strong bg-surface-card text-ink hover:bg-surface-muted',
              )}
            >
              <Icone nome={o.icone} className="text-[17px]" />
              {o.rotulo}
            </button>
          ))}
          {meuVoto && (
            <span className="flex items-center text-xs text-ink-faint">
              Seu voto está registrado e pode ser alterado até o encerramento.
            </span>
          )}
        </div>
      )}

      {emSessao && !materia.encerrada && !apto && (
        <p className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-xs text-ink-faint">
          <Icone nome="info" className="mt-px shrink-0 text-[15px]" />
          <span>
            A votação exige presença registrada e direito a voto na forma dos Arts. 20, II e 27.
          </span>
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
        <button
          type="button"
          onClick={() => setNominalVisivel((v) => !v)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft transition hover:text-ink"
        >
          <Icone nome={nominalVisivel ? 'visibility_off' : 'visibility'} className="text-[15px]" />
          {nominalVisivel ? 'Ocultar' : 'Ver'} votação nominal
        </button>
        {aoEncerrar && !materia.encerrada && (
          <Botao className="ml-auto" tamanho="pequeno" variante="contorno" icone="gavel" onClick={aoEncerrar}>
            Encerrar votação
          </Botao>
        )}
      </div>

      {nominalVisivel && (
        <ul className="mt-3 space-y-1.5">
          {votosDaMateria.length === 0 && (
            <li className="text-sm text-ink-faint">Nenhum voto registrado.</li>
          )}
          {votosDaMateria.map((v) => {
            const m = membroPorId(base, v.membroId);
            return (
              <li key={v.id} className="flex items-center gap-2.5 rounded-xl bg-surface-muted/60 px-3 py-2">
                <Avatar nome={m?.nomeCompleto ?? 'Membro'} tamanho="xs" />
                <span className="min-w-0 flex-1 truncate text-sm text-ink">{m?.nomeCompleto}</span>
                <span className="shrink-0 text-xs text-ink-faint">{tempoRelativo(v.registradoEm)}</span>
                <Selo
                  tom={v.opcao === 'favor' ? 'positivo' : v.opcao === 'contra' ? 'critico' : 'neutro'}
                >
                  {v.opcao === 'favor' ? 'A favor' : v.opcao === 'contra' ? 'Contra' : 'Abstenção'}
                </Selo>
              </li>
            );
          })}
        </ul>
      )}
    </Cartao>
  );
}

function Linha({ icone, rotulo, valor }: { icone: string; rotulo: string; valor: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icone nome={icone} className="mt-0.5 shrink-0 text-[18px] text-ink-faint" />
      <div className="min-w-0">
        <dt className="rotulo">{rotulo}</dt>
        <dd className="mt-0.5 text-sm font-semibold text-ink">{valor}</dd>
      </div>
    </div>
  );
}

export type { Assembleia };
