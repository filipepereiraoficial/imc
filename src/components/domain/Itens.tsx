import { Link } from 'react-router-dom';
import { useDados } from '@/context/DadosContext';
import { localidade, nucleoPorId } from '@/lib/consultas';
import { cn } from '@/lib/cn';
import { diaDoMes, mesAbreviado, numero, tempoRelativo, hora } from '@/lib/formato';
import type { Evento, Membro, Notificacao, Proposta, SituacaoMembresia, SituacaoProposta } from '@/types';
import { Avatar, Icone, Selo } from '@/components/ui';
import type { TomSelo } from '@/components/ui/Selo';

/* ------------------------------------------------------------------ */
/* Ranking                                                             */
/* ------------------------------------------------------------------ */

export function ItemRanking({
  membro,
  posicao,
  destacado,
}: {
  membro: Membro;
  posicao: number;
  destacado?: boolean;
}) {
  const { base } = useDados();
  const nucleo = nucleoPorId(base, membro.nucleoId);
  const podio = posicao <= 3;

  return (
    <Link
      to={`/membros/${membro.id}`}
      className={cn(
        'flex items-center gap-3 rounded-card border p-3.5 transition hover:shadow-suave sm:gap-4',
        destacado ? 'border-ouro/45 bg-ouro-wash' : 'border-line bg-surface-card hover:border-line-strong',
      )}
    >
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-extrabold tabular-nums',
          podio ? 'bg-ink text-[rgb(245_197_24)]' : 'bg-surface-muted text-ink-soft',
        )}
      >
        {posicao}
      </span>
      <Avatar nome={membro.nomeCompleto} fotoUrl={membro.fotoUrl} tamanho="md" nivel={membro.nivel} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-ink">{membro.nomeCompleto}</p>
        <p className="truncate text-xs text-ink-faint">
          {localidade(base, membro).split(' · ').slice(0, 2).join(' · ')}
          {nucleo && ` · ${nucleo.nome.replace('Núcleo ', '')}`}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-extrabold tabular-nums text-ink">{numero(membro.xp)}</p>
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-ink-faint">XP</p>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Eventos                                                             */
/* ------------------------------------------------------------------ */

const ICONE_MODALIDADE = { presencial: 'location_on', online: 'videocam', hibrido: 'hub' } as const;

export function CartaoEvento({
  evento,
  inscrito,
  compacto: modoCompacto,
}: {
  evento: Evento;
  inscrito?: boolean;
  compacto?: boolean;
}) {
  const { base } = useDados();
  const nucleo = nucleoPorId(base, evento.nucleoId);

  if (modoCompacto) {
    return (
      <Link
        to={`/eventos/${evento.id}`}
        className="flex items-center gap-3.5 rounded-card border border-line bg-surface-card p-3.5 transition hover:border-line-strong hover:shadow-suave"
      >
        <div className="grid h-14 w-14 shrink-0 place-content-center rounded-xl border border-line bg-surface-muted text-center">
          <p className="text-[0.6rem] font-bold uppercase tracking-wider text-[rgb(var(--c-gold-deep))]">
            {mesAbreviado(evento.inicio)}
          </p>
          <p className="text-xl font-extrabold leading-none tabular-nums text-ink">
            {diaDoMes(evento.inicio)}
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-ink">{evento.titulo}</p>
          <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-ink-faint">
            <Icone nome={ICONE_MODALIDADE[evento.modalidade]} className="text-[14px]" />
            {evento.local}
          </p>
        </div>
        {inscrito && <Selo tom="positivo" icone="check">Inscrito</Selo>}
        <Icone nome="chevron_right" className="shrink-0 text-[20px] text-ink-faint" />
      </Link>
    );
  }

  return (
    <Link
      to={`/eventos/${evento.id}`}
      className="flex flex-col overflow-hidden rounded-card border border-line bg-surface-card shadow-suave transition hover:shadow-elevado"
    >
      <div className="relative flex h-28 items-end bg-gradient-to-br from-ink to-[rgb(60_50_30)] p-4">
        <div className="trama absolute inset-0 opacity-[0.14]" aria-hidden />
        <div className="relative flex items-end justify-between gap-3 w-full">
          <div className="rounded-xl bg-ouro-soft px-3 py-1.5 text-center">
            <p className="text-[0.6rem] font-bold uppercase tracking-wider text-[rgb(60_46_0)]">
              {mesAbreviado(evento.inicio)}
            </p>
            <p className="text-lg font-extrabold leading-none tabular-nums text-[rgb(24_20_12)]">
              {diaDoMes(evento.inicio)}
            </p>
          </div>
          <Selo tom="escuro" rotulo className="bg-white/15 text-white">
            {evento.modalidade}
          </Selo>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold leading-snug text-ink">{evento.titulo}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{evento.descricao}</p>
        <dl className="mt-3 space-y-1 text-xs text-ink-faint">
          <div className="flex items-center gap-1.5">
            <Icone nome="schedule" className="text-[15px]" />
            <dd>{hora(evento.inicio)}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Icone nome={ICONE_MODALIDADE[evento.modalidade]} className="text-[15px]" />
            <dd className="truncate">{evento.local}</dd>
          </div>
          {nucleo && (
            <div className="flex items-center gap-1.5">
              <Icone nome="groups" className="text-[15px]" />
              <dd className="truncate">{nucleo.nome}</dd>
            </div>
          )}
        </dl>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <span className="text-xs font-semibold text-ink-faint">+{evento.xpParticipacao} XP</span>
          {inscrito ? (
            <Selo tom="positivo" icone="check_circle">Presença confirmada</Selo>
          ) : (
            <span className="text-xs font-bold text-[rgb(var(--c-gold-deep))] dark:text-ouro">
              Ver detalhes
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Notificacoes                                                        */
/* ------------------------------------------------------------------ */

const ICONE_NOTIFICACAO: Record<Notificacao['tipo'], string> = {
  mensagem: 'chat',
  evento: 'event',
  comunicado: 'campaign',
  administrativo: 'admin_panel_settings',
  convite: 'group_add',
  atividade: 'task_alt',
  cadastro: 'person_add',
  xp: 'bolt',
};

export function ItemNotificacao({
  notificacao,
  aoAbrir,
}: {
  notificacao: Notificacao;
  aoAbrir?: () => void;
}) {
  const conteudo = (
    <>
      <span
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-xl',
          notificacao.lida ? 'bg-surface-muted text-ink-faint' : 'bg-ouro-wash text-[rgb(var(--c-gold-deep))]',
        )}
      >
        <Icone nome={ICONE_NOTIFICACAO[notificacao.tipo]} className="text-[20px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn('truncate text-sm', notificacao.lida ? 'font-semibold text-ink-soft' : 'font-bold text-ink')}>
          {notificacao.titulo}
        </p>
        <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">{notificacao.descricao}</p>
        <p className="mt-1 text-xs text-ink-faint">{tempoRelativo(notificacao.criadaEm)}</p>
      </div>
      {!notificacao.lida && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ouro" aria-label="Não lida" />}
    </>
  );

  const classe =
    'flex w-full items-start gap-3 rounded-card border border-line bg-surface-card p-4 text-left transition hover:border-line-strong hover:shadow-suave';

  return notificacao.destino ? (
    <Link to={notificacao.destino} onClick={aoAbrir} className={classe}>
      {conteudo}
    </Link>
  ) : (
    <button type="button" onClick={aoAbrir} className={classe}>
      {conteudo}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Propostas                                                           */
/* ------------------------------------------------------------------ */

export const ROTULO_SITUACAO_PROPOSTA: Record<SituacaoProposta, string> = {
  recebida: 'Recebida',
  em_analise: 'Em análise',
  em_discussao: 'Em discussão',
  aprovada: 'Aprovada',
  rejeitada: 'Rejeitada',
  arquivada: 'Arquivada',
};

export const TOM_SITUACAO_PROPOSTA: Record<SituacaoProposta, TomSelo> = {
  recebida: 'neutro',
  em_analise: 'info',
  em_discussao: 'ouro',
  aprovada: 'positivo',
  rejeitada: 'critico',
  arquivada: 'neutro',
};

export function CartaoProposta({ proposta, apoiada }: { proposta: Proposta; apoiada?: boolean }) {
  const { base } = useDados();
  const autor = base.membros.find((m) => m.id === proposta.autorId);
  const nucleo = nucleoPorId(base, proposta.nucleoId);

  return (
    <Link
      to={`/propostas/${proposta.id}`}
      className="flex flex-col gap-3 rounded-card border border-line bg-surface-card p-4 shadow-suave transition hover:border-line-strong hover:shadow-elevado"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-bold leading-snug text-ink">{proposta.titulo}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{proposta.resumo}</p>
        </div>
        <Selo tom={TOM_SITUACAO_PROPOSTA[proposta.situacao]} rotulo>
          {ROTULO_SITUACAO_PROPOSTA[proposta.situacao]}
        </Selo>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-3 text-xs text-ink-faint">
        <span className="flex items-center gap-1.5">
          <Avatar nome={autor?.nomeCompleto ?? 'Membro'} tamanho="xs" />
          {autor?.nomeExibicao}
        </span>
        {nucleo && (
          <span className="flex items-center gap-1">
            <Icone nome="groups" className="text-[14px]" />
            {nucleo.nome.replace('Núcleo ', '')}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Icone nome="label" className="text-[14px]" />
          {proposta.categoria}
        </span>
        <span
          className={cn(
            'ml-auto flex items-center gap-1 font-bold',
            apoiada ? 'text-[rgb(var(--c-gold-deep))] dark:text-ouro' : 'text-ink-soft',
          )}
        >
          <Icone nome="thumb_up" preenchido={apoiada} className="text-[14px]" />
          {proposta.apoios.length} apoios
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Membros                                                             */
/* ------------------------------------------------------------------ */

export const ROTULO_SITUACAO: Record<SituacaoMembresia, string> = {
  ativo: 'Ativo',
  pendente: 'Pendente',
  suspenso: 'Suspenso',
  inativo: 'Inativo',
  desligado: 'Desligado',
};

export const TOM_SITUACAO: Record<SituacaoMembresia, TomSelo> = {
  ativo: 'positivo',
  pendente: 'atencao',
  suspenso: 'critico',
  inativo: 'neutro',
  desligado: 'neutro',
};

export function CartaoMembro({ membro, acao }: { membro: Membro; acao?: React.ReactNode }) {
  const { base } = useDados();
  const nucleo = nucleoPorId(base, membro.nucleoId);
  const cargo = base.cargos.find((c) => c.id === membro.cargoId);

  return (
    <div className="flex items-center gap-3 rounded-card border border-line bg-surface-card p-4 transition hover:border-line-strong">
      <Link to={`/membros/${membro.id}`} className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar nome={membro.nomeCompleto} fotoUrl={membro.fotoUrl} nivel={membro.nivel} />
        <div className="min-w-0">
          <p className="truncate font-bold text-ink">{membro.nomeCompleto}</p>
          <p className="truncate text-xs text-ink-faint">
            {membro.numeroMembro} · {cargo?.nome}
            {nucleo && ` · ${nucleo.nome.replace('Núcleo ', '')}`}
          </p>
        </div>
      </Link>
      <Selo tom={TOM_SITUACAO[membro.situacao]} rotulo>
        {ROTULO_SITUACAO[membro.situacao]}
      </Selo>
      {acao}
    </div>
  );
}
