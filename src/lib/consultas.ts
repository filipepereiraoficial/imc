import type {
  BaseDados,
  Cargo,
  Grau,
  ID,
  Lancamento,
  Membro,
  Nucleo,
  Publicacao,
} from '@/types';
import { contem } from './formato';
import { ordenarRanking } from './xp';

/** Consultas derivadas sobre a base. Funcoes puras, sem estado. */

export function membroPorId(base: BaseDados, id: ID | null | undefined): Membro | undefined {
  if (!id) return undefined;
  return base.membros.find((m) => m.id === id);
}

export function cargoDe(base: BaseDados, membro: Membro | null | undefined): Cargo | undefined {
  if (!membro) return undefined;
  return base.cargos.find((c) => c.id === membro.cargoId);
}

export function grauDe(base: BaseDados, membro: Membro | null | undefined): Grau | undefined {
  if (!membro) return undefined;
  return base.graus.find((g) => g.id === membro.grauId);
}

export function nucleoPorId(base: BaseDados, id: ID | null | undefined): Nucleo | undefined {
  if (!id) return undefined;
  return base.nucleos.find((n) => n.id === id);
}

export function nomeMunicipio(base: BaseDados, id: ID | null | undefined): string {
  return base.municipios.find((m) => m.id === id)?.nome ?? '—';
}

export function siglaEstado(base: BaseDados, id: ID | null | undefined): string {
  return base.estados.find((e) => e.id === id)?.sigla ?? '—';
}

export function nomeEstado(base: BaseDados, id: ID | null | undefined): string {
  return base.estados.find((e) => e.id === id)?.nome ?? '—';
}

export function nomePais(base: BaseDados, id: ID | null | undefined): string {
  return base.paises.find((p) => p.id === id)?.nome ?? '—';
}

/**
 * Localidade do membro — "Jaboatão dos Guararapes · PE · Brasil".
 *
 * Campos ainda nao preenchidos ficam de fora em vez de virar travessao: numa
 * instalacao nova o endereco costuma estar vazio, e "— · — · —" nao informa
 * nada e ainda parece defeito. Ausente por ausente, uma frase e melhor.
 */
export function localidade(base: BaseDados, membro: Membro): string {
  const partes = [
    nomeMunicipio(base, membro.municipioId),
    siglaEstado(base, membro.estadoId),
    nomePais(base, membro.paisId),
  ].filter((p) => p !== '' && p !== '—');
  return partes.length > 0 ? partes.join(' · ') : 'Localidade não informada';
}

export function membrosDoNucleo(base: BaseDados, nucleoId: ID): Membro[] {
  return base.membros.filter((m) => m.nucleoId === nucleoId);
}

export function estadosDoPais(base: BaseDados, paisId: ID) {
  return base.estados.filter((e) => e.paisId === paisId);
}

export function municipiosDoEstado(base: BaseDados, estadoId: ID) {
  return base.municipios.filter((m) => m.estadoId === estadoId);
}

/* ---------------------------------------------------------------- */
/* Ranking territorial                                               */
/* ---------------------------------------------------------------- */

export type AmbitoRanking = 'global' | 'pais' | 'estado' | 'municipio' | 'nucleo';

export function membrosDoAmbito(
  base: BaseDados,
  ambito: AmbitoRanking,
  referencia: Membro | null,
): Membro[] {
  const ativos = base.membros.filter((m) => m.situacao === 'ativo');
  if (!referencia || ambito === 'global') return ativos;
  switch (ambito) {
    case 'pais':
      return ativos.filter((m) => m.paisId === referencia.paisId);
    case 'estado':
      return ativos.filter((m) => m.estadoId === referencia.estadoId);
    case 'municipio':
      return ativos.filter((m) => m.municipioId === referencia.municipioId);
    case 'nucleo':
      return ativos.filter((m) => m.nucleoId === referencia.nucleoId);
    default:
      return ativos;
  }
}

export function rankingDoAmbito(
  base: BaseDados,
  ambito: AmbitoRanking,
  referencia: Membro | null,
  termo = '',
): Membro[] {
  const lista = ordenarRanking(membrosDoAmbito(base, ambito, referencia));
  if (!termo) return lista;
  return lista.filter(
    (m) => contem(m.nomeCompleto, termo) || contem(m.usuario, termo) || contem(m.numeroMembro, termo),
  );
}

/* ---------------------------------------------------------------- */
/* Feed                                                              */
/* ---------------------------------------------------------------- */

export function publicacoesOrdenadas(base: BaseDados): Publicacao[] {
  return [...base.publicacoes].sort(
    (a, b) =>
      Number(b.fixado) - Number(a.fixado) ||
      new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
  );
}

export function comentariosDe(base: BaseDados, publicacaoId: ID) {
  return base.comentarios
    .filter((c) => c.publicacaoId === publicacaoId)
    .sort((a, b) => new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime());
}

/* ---------------------------------------------------------------- */
/* Eventos                                                           */
/* ---------------------------------------------------------------- */

export function eventosFuturos(base: BaseDados) {
  const agora = Date.now();
  return base.eventos
    .filter((e) => new Date(e.inicio).getTime() >= agora)
    .sort((a, b) => new Date(a.inicio).getTime() - new Date(b.inicio).getTime());
}

export function inscritosNoEvento(base: BaseDados, eventoId: ID) {
  return base.inscricoes.filter((i) => i.eventoId === eventoId && i.situacao === 'confirmado');
}

export function estaInscrito(base: BaseDados, eventoId: ID, membroId: ID): boolean {
  return base.inscricoes.some(
    (i) => i.eventoId === eventoId && i.membroId === membroId && i.situacao === 'confirmado',
  );
}

/* ---------------------------------------------------------------- */
/* Formacao                                                          */
/* ---------------------------------------------------------------- */

export function aulasDoCurso(base: BaseDados, cursoId: ID) {
  const mods = base.modulos.filter((m) => m.cursoId === cursoId).map((m) => m.id);
  return base.aulas.filter((a) => mods.includes(a.moduloId));
}

export function progressoCurso(base: BaseDados, cursoId: ID, membroId: ID): number {
  const aulas = aulasDoCurso(base, cursoId);
  if (aulas.length === 0) return 0;
  const concluidas = base.progressoAulas.filter(
    (p) => p.membroId === membroId && aulas.some((a) => a.id === p.aulaId),
  ).length;
  return concluidas / aulas.length;
}

/* ---------------------------------------------------------------- */
/* Tesouraria                                                        */
/* ---------------------------------------------------------------- */

export interface ResumoFinanceiro {
  receitas: number;
  despesas: number;
  saldo: number;
  saldoTotal: number;
}

function noMes(iso: string, referencia: Date): boolean {
  const d = new Date(iso);
  return d.getUTCFullYear() === referencia.getUTCFullYear() && d.getUTCMonth() === referencia.getUTCMonth();
}

export function resumoFinanceiro(
  base: BaseDados,
  filtro: (l: Lancamento) => boolean = () => true,
  referencia = new Date(),
): ResumoFinanceiro {
  const validos = base.lancamentos.filter((l) => l.situacao !== 'cancelado' && filtro(l));
  const doMes = validos.filter((l) => noMes(l.data, referencia));
  const soma = (lista: Lancamento[], tipo: Lancamento['tipo']) =>
    lista.filter((l) => l.tipo === tipo).reduce((s, l) => s + l.valor, 0);

  const receitas = soma(doMes, 'receita');
  const despesas = soma(doMes, 'despesa');
  const saldoInicial = base.contas.reduce((s, c) => s + c.saldoInicial, 0);
  const saldoTotal = saldoInicial + soma(validos, 'receita') - soma(validos, 'despesa');
  return { receitas, despesas, saldo: receitas - despesas, saldoTotal };
}

export interface PontoFluxo {
  rotulo: string;
  receitas: number;
  despesas: number;
  chave: string;
}

export function fluxoMensal(
  base: BaseDados,
  meses = 6,
  filtro: (l: Lancamento) => boolean = () => true,
): PontoFluxo[] {
  const hoje = new Date();
  const pontos: PontoFluxo[] = [];
  for (let i = meses - 1; i >= 0; i--) {
    const ref = new Date(Date.UTC(hoje.getUTCFullYear(), hoje.getUTCMonth() - i, 1));
    const doMes = base.lancamentos.filter(
      (l) => l.situacao !== 'cancelado' && filtro(l) && noMes(l.data, ref),
    );
    pontos.push({
      chave: ref.toISOString(),
      rotulo: new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(ref).replace('.', ''),
      receitas: doMes.filter((l) => l.tipo === 'receita').reduce((s, l) => s + l.valor, 0),
      despesas: doMes.filter((l) => l.tipo === 'despesa').reduce((s, l) => s + l.valor, 0),
    });
  }
  return pontos;
}

export function porCategoria(base: BaseDados, tipo: Lancamento['tipo'], meses = 6) {
  const limite = Date.now() - meses * 30 * 24 * 60 * 60 * 1000;
  const mapa = new Map<ID, number>();
  for (const l of base.lancamentos) {
    if (l.tipo !== tipo || l.situacao === 'cancelado') continue;
    if (new Date(l.data).getTime() < limite) continue;
    mapa.set(l.categoriaId, (mapa.get(l.categoriaId) ?? 0) + l.valor);
  }
  return [...mapa.entries()]
    .map(([categoriaId, valor]) => {
      const cat = base.categoriasFinanceiras.find((c) => c.id === categoriaId);
      return { rotulo: cat?.nome ?? 'Sem categoria', cor: cat?.cor ?? '#999', valor };
    })
    .sort((a, b) => b.valor - a.valor);
}

/* ---------------------------------------------------------------- */
/* Indicadores institucionais                                        */
/* ---------------------------------------------------------------- */

export function indicadoresMembresia(base: BaseDados) {
  const total = base.membros.length;
  const ativos = base.membros.filter((m) => m.situacao === 'ativo').length;
  const pendentes = base.membros.filter((m) => m.situacao === 'pendente').length;
  const suspensos = base.membros.filter((m) => m.situacao === 'suspenso').length;
  const inativos = base.membros.filter((m) => m.situacao === 'inativo').length;
  const limite = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const novos = base.membros.filter((m) => new Date(m.dataIngresso).getTime() >= limite).length;
  return { total, ativos, pendentes, suspensos, inativos, novos };
}

export function membrosPorEstado(base: BaseDados) {
  const mapa = new Map<ID, number>();
  for (const m of base.membros) mapa.set(m.estadoId, (mapa.get(m.estadoId) ?? 0) + 1);
  return [...mapa.entries()]
    .map(([id, valor]) => ({ rotulo: siglaEstado(base, id), nome: nomeEstado(base, id), valor }))
    .sort((a, b) => b.valor - a.valor);
}

export function membrosPorNucleo(base: BaseDados) {
  return base.nucleos
    .map((n) => ({
      nucleo: n,
      rotulo: n.nome.replace('Núcleo ', ''),
      valor: base.membros.filter((m) => m.nucleoId === n.id).length,
    }))
    .sort((a, b) => b.valor - a.valor);
}

/* ---------------------------------------------------------------- */
/* Contribuicoes — Codice C106                                       */
/* ---------------------------------------------------------------- */

export interface ResumoContribuicoes {
  pistis: number;
  hekousia: number;
  compromissosAtivos: number;
  valorComprometido: number;
}

/**
 * Consolida as duas modalidades de contribuicao no mes de referencia.
 *
 * C106:20 veda cobranca coercitiva e exposicao vexatoria: por isso esta
 * consulta devolve agregados, nunca uma relacao de quem deixou de contribuir.
 */
export function resumoContribuicoes(
  base: BaseDados,
  referencia = new Date(),
): ResumoContribuicoes {
  const doMes = base.lancamentos.filter(
    (l) => l.tipo === 'receita' && l.situacao !== 'cancelado' && noMes(l.data, referencia),
  );
  const ativos = base.compromissos.filter((c) => c.ativo);
  return {
    pistis: doMes.filter((l) => l.modalidade === 'pistis').reduce((s, l) => s + l.valor, 0),
    hekousia: doMes.filter((l) => l.modalidade === 'hekousia').reduce((s, l) => s + l.valor, 0),
    compromissosAtivos: ativos.length,
    valorComprometido: ativos.reduce((s, c) => s + c.valorMensal, 0),
  };
}

export function naoLidas(base: BaseDados, membroId: ID): number {
  return base.notificacoes.filter((n) => n.membroId === membroId && !n.lida).length;
}

export function mensagensNaoLidas(base: BaseDados, membroId: ID): number {
  return base.mensagens.filter(
    (m) =>
      m.autorId !== membroId &&
      !m.lidaPor.includes(membroId) &&
      base.conversas.some((c) => c.id === m.conversaId && c.participantes.includes(membroId)),
  ).length;
}
