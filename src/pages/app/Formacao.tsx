import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { aulasDoCurso, membroPorId, progressoCurso } from '@/lib/consultas';
import { cn } from '@/lib/cn';
import { percentual } from '@/lib/formato';
import type { TipoAula } from '@/types';
import {
  Abas,
  AnelProgresso,
  BarraProgresso,
  Botao,
  Cartao,
  CabecalhoCartao,
  Icone,
  Selo,
  Vazio,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const ICONE_AULA: Record<TipoAula, string> = {
  video: 'play_circle',
  texto: 'article',
  documento: 'description',
  questionario: 'quiz',
};

export function Formacao() {
  const { base } = useDados();
  const { membro } = useAuth();
  const [trilha, setTrilha] = useState<string>('todas');

  const trilhas = useMemo(() => [...new Set(base.cursos.map((c) => c.trilha))], [base.cursos]);

  const cursos = useMemo(
    () => (trilha === 'todas' ? base.cursos : base.cursos.filter((c) => c.trilha === trilha)),
    [base.cursos, trilha],
  );

  const resumo = useMemo(() => {
    if (!membro) return { concluidos: 0, emAndamento: 0, aulasFeitas: 0 };
    let concluidos = 0;
    let emAndamento = 0;
    for (const c of base.cursos) {
      const p = progressoCurso(base, c.id, membro.id);
      if (p >= 1) concluidos++;
      else if (p > 0) emAndamento++;
    }
    return {
      concluidos,
      emAndamento,
      aulasFeitas: base.progressoAulas.filter((p) => p.membroId === membro.id).length,
    };
  }, [base, membro]);

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Formação"
        descricao="Trilhas de formação filosófica, política e institucional da Ordem."
      />

      <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-3">
        <Cartao className="flex items-center gap-3">
          <AnelProgresso
            fracao={base.cursos.length ? resumo.concluidos / base.cursos.length : 0}
            rotuloAcessivel="Cursos concluídos"
          >
            {resumo.concluidos}
          </AnelProgresso>
          <div>
            <p className="font-bold text-ink">Cursos concluídos</p>
            <p className="text-sm text-ink-soft">de {base.cursos.length} disponíveis</p>
          </div>
        </Cartao>
        <Cartao className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ouro-wash text-[rgb(var(--c-gold-deep))]">
            <Icone nome="pending_actions" className="text-[24px]" />
          </span>
          <div>
            <p className="font-bold text-ink">{resumo.emAndamento} em andamento</p>
            <p className="text-sm text-ink-soft">Continue de onde parou</p>
          </div>
        </Cartao>
        <Cartao className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface-muted text-ink-soft">
            <Icone nome="task_alt" className="text-[24px]" />
          </span>
          <div>
            <p className="font-bold text-ink">{resumo.aulasFeitas} aulas</p>
            <p className="text-sm text-ink-soft">concluídas até aqui</p>
          </div>
        </Cartao>
      </div>

      <Abas
        itens={[
          { id: 'todas', rotulo: 'Todas as trilhas' },
          ...trilhas.map((t) => ({ id: t, rotulo: t })),
        ]}
        ativo={trilha}
        aoMudar={setTrilha}
        rotuloGrupo="Trilhas de formação"
      />

      <div className="grid gap-4 [&>*]:min-w-0 md:grid-cols-2 xl:grid-cols-3">
        {cursos.map((curso) => {
          const progresso = membro ? progressoCurso(base, curso.id, membro.id) : 0;
          const responsavel = membroPorId(base, curso.responsavelId);
          return (
            <Link
              key={curso.id}
              to={`/formacao/${curso.id}`}
              className="flex flex-col overflow-hidden rounded-card border border-line bg-surface-card shadow-suave transition hover:shadow-elevado"
            >
              {/*
                A capa é institucional, não decorativa: o mesmo grafite quente da
                carteira, com a trilha distinguida por uma faixa fina de cor —
                cor saturada em área grande destoaria da identidade da Ordem.
              */}
              <div
                className="relative h-24 overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(30 26 19) 0%, rgb(22 19 14) 55%, rgb(38 31 16) 100%)',
                }}
              >
                <div className="trama absolute inset-0 opacity-[0.16]" aria-hidden />
                <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white/85">
                  {curso.trilha}
                </span>
                <Icone
                  nome="school"
                  className="absolute bottom-4 left-3 text-[30px]"
                  style={{ color: curso.capaCor }}
                />
                <span
                  className="absolute inset-x-0 bottom-0 h-1"
                  style={{ backgroundColor: curso.capaCor }}
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-bold leading-snug text-ink">{curso.titulo}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{curso.descricao}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-faint">
                  <span className="flex items-center gap-1">
                    <Icone nome="schedule" className="text-[14px]" />
                    {curso.cargaHoraria}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Icone nome="bolt" className="text-[14px]" />+{curso.xpConclusao} XP
                  </span>
                  {curso.emiteCertificado && (
                    <span className="flex items-center gap-1">
                      <Icone nome="workspace_premium" className="text-[14px]" />
                      Certificado
                    </span>
                  )}
                </div>
                <div className="mt-auto pt-4">
                  <div className="mb-1.5 flex items-baseline justify-between text-xs">
                    <span className="font-semibold text-ink-soft">{responsavel?.nomeExibicao}</span>
                    <span className="font-bold tabular-nums text-ink">{percentual(progresso)}</span>
                  </div>
                  <BarraProgresso fracao={progresso} altura="fina" rotuloAcessivel={`Progresso em ${curso.titulo}`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CursoDetalhe() {
  const { id } = useParams();
  const { base, atualizar } = useDados();
  const { membro } = useAuth();
  const { avisar } = useAviso();

  const curso = base.cursos.find((c) => c.id === id);
  const modulos = useMemo(
    () => base.modulos.filter((m) => m.cursoId === id).sort((a, b) => a.ordem - b.ordem),
    [base.modulos, id],
  );
  const progresso = useMemo(
    () => (curso && membro ? progressoCurso(base, curso.id, membro.id) : 0),
    [base, curso, membro],
  );

  if (!curso) {
    return (
      <Cartao>
        <Vazio icone="school" titulo="Curso não encontrado" />
      </Cartao>
    );
  }

  const concluida = (aulaId: string) =>
    base.progressoAulas.some((p) => p.membroId === membro?.id && p.aulaId === aulaId);

  const alternarAula = (aulaId: string, titulo: string) => {
    if (!membro) return;
    const jaFeita = concluida(aulaId);
    atualizar((b) => ({
      ...b,
      progressoAulas: jaFeita
        ? b.progressoAulas.filter((p) => !(p.membroId === membro.id && p.aulaId === aulaId))
        : [
            ...b.progressoAulas,
            {
              id: `pg-${Math.random().toString(36).slice(2, 9)}`,
              membroId: membro.id,
              aulaId,
              concluidaEm: new Date().toISOString(),
            },
          ],
    }));
    if (!jaFeita) avisar('sucesso', 'Aula concluída', titulo);
  };

  const concluirCurso = () => {
    if (!membro) return;
    const aulas = aulasDoCurso(base, curso.id);
    atualizar((b) => ({
      ...b,
      progressoAulas: [
        ...b.progressoAulas.filter((p) => !(p.membroId === membro.id && aulas.some((a) => a.id === p.aulaId))),
        ...aulas.map((a) => ({
          id: `pg-${Math.random().toString(36).slice(2, 9)}`,
          membroId: membro.id,
          aulaId: a.id,
          concluidaEm: new Date().toISOString(),
        })),
      ],
      membros: b.membros.map((m) => (m.id === membro.id ? { ...m, xp: m.xp + curso.xpConclusao } : m)),
      transacoesXP: [
        {
          id: `tx-${Math.random().toString(36).slice(2, 9)}`,
          membroId: membro.id,
          origem: 'formacao' as const,
          descricao: `Conclusão do curso ${curso.titulo}`,
          pontos: curso.xpConclusao,
          registradoPor: null,
          criadoEm: new Date().toISOString(),
        },
        ...b.transacoesXP,
      ],
    }));
    avisar('sucesso', `Curso concluído — +${curso.xpConclusao} XP`, curso.titulo);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina titulo={curso.titulo} voltarPara="/formacao" rotuloVoltar="Voltar à formação" />

      <Cartao>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Selo tom="ouro" rotulo>
              {curso.trilha}
            </Selo>
            <p className="mt-3 leading-relaxed text-ink-soft">{curso.descricao}</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-faint">
              <span className="flex items-center gap-1.5">
                <Icone nome="schedule" className="text-[16px]" />
                {curso.cargaHoraria} horas
              </span>
              <span className="flex items-center gap-1.5">
                <Icone nome="bolt" className="text-[16px]" />+{curso.xpConclusao} XP na conclusão
              </span>
              {curso.emiteCertificado && (
                <span className="flex items-center gap-1.5">
                  <Icone nome="workspace_premium" className="text-[16px]" />
                  Emite certificado
                </span>
              )}
            </div>
          </div>
          <AnelProgresso fracao={progresso} tamanho={84} espessura={8} rotuloAcessivel="Progresso no curso">
            {percentual(progresso)}
          </AnelProgresso>
        </div>

        {progresso >= 1 ? (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-positivo/25 bg-positivo/10 p-4">
            <Icone nome="workspace_premium" className="shrink-0 text-[24px] text-positivo" />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-ink">Curso concluído</p>
              <p className="text-sm text-ink-soft">Seu certificado está disponível para emissão.</p>
            </div>
            <Botao
              variante="contorno"
              tamanho="pequeno"
              icone="download"
              onClick={() => avisar('sucesso', 'Certificado emitido', curso.titulo)}
            >
              Certificado
            </Botao>
          </div>
        ) : (
          <Botao className="mt-5" larguraTotal icone="done_all" onClick={concluirCurso}>
            Marcar curso como concluído
          </Botao>
        )}
      </Cartao>

      <div className="space-y-4">
        {modulos.map((mod) => {
          const aulas = base.aulas.filter((a) => a.moduloId === mod.id).sort((a, b) => a.ordem - b.ordem);
          const feitas = aulas.filter((a) => concluida(a.id)).length;
          return (
            <Cartao key={mod.id} semPadding>
              <div className="p-5 pb-3">
                <CabecalhoCartao
                  titulo={mod.titulo}
                  descricao={`${feitas} de ${aulas.length} aulas concluídas`}
                  icone="folder"
                />
              </div>
              <ul className="divide-y divide-line">
                {aulas.map((aula) => {
                  const feita = concluida(aula.id);
                  return (
                    <li key={aula.id}>
                      <button
                        type="button"
                        onClick={() => alternarAula(aula.id, aula.titulo)}
                        className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-surface-muted/60"
                      >
                        <span
                          className={cn(
                            'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                            feita ? 'bg-positivo/15 text-positivo' : 'bg-surface-muted text-ink-soft',
                          )}
                        >
                          <Icone
                            nome={feita ? 'check_circle' : ICONE_AULA[aula.tipo]}
                            preenchido={feita}
                            className="text-[19px]"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              'block truncate text-sm font-semibold',
                              feita ? 'text-ink-faint line-through' : 'text-ink',
                            )}
                          >
                            {aula.titulo}
                          </span>
                          <span className="block truncate text-xs text-ink-faint">
                            {aula.tipo} · {aula.duracao}
                          </span>
                        </span>
                        <Icone nome="chevron_right" className="shrink-0 text-[19px] text-ink-faint" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Cartao>
          );
        })}
      </div>
    </div>
  );
}
