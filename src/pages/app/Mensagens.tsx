import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { membroPorId } from '@/lib/consultas';
import { contem, hora, tempoRelativo } from '@/lib/formato';
import { cn } from '@/lib/cn';
import type { Conversa } from '@/types';
import { Avatar, CampoBusca, Icone, Selo, Vazio } from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const ICONE_CONVERSA: Record<Conversa['tipo'], string> = {
  direta: 'person',
  grupo: 'groups',
  nucleo: 'hub',
  oficial: 'campaign',
};

export function Mensagens() {
  const { membro } = useAuth();
  const { base, atualizar } = useDados();
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [termo, setTermo] = useState('');
  const [rascunho, setRascunho] = useState('');
  const fim = useRef<HTMLDivElement>(null);

  const conversas = useMemo(
    () =>
      base.conversas
        .filter((c) => membro && c.participantes.includes(membro.id))
        .filter((c) => contem(c.titulo, termo))
        .sort(
          (a, b) =>
            Number(b.fixada) - Number(a.fixada) ||
            new Date(b.atualizadaEm).getTime() - new Date(a.atualizadaEm).getTime(),
        ),
    [base.conversas, membro, termo],
  );

  const ativa = useMemo(
    () => conversas.find((c) => c.id === selecionada) ?? null,
    [conversas, selecionada],
  );

  const mensagens = useMemo(
    () =>
      base.mensagens
        .filter((m) => m.conversaId === ativa?.id)
        .sort((a, b) => new Date(a.criadaEm).getTime() - new Date(b.criadaEm).getTime()),
    [base.mensagens, ativa],
  );

  useEffect(() => {
    fim.current?.scrollIntoView({ block: 'end' });
  }, [mensagens.length, ativa?.id]);

  // Ao abrir a conversa, as mensagens sao marcadas como lidas.
  useEffect(() => {
    if (!ativa || !membro) return;
    atualizar((b) => ({
      ...b,
      mensagens: b.mensagens.map((m) =>
        m.conversaId === ativa.id && !m.lidaPor.includes(membro.id)
          ? { ...m, lidaPor: [...m.lidaPor, membro.id] }
          : m,
      ),
    }));
  }, [ativa?.id, membro?.id, atualizar, ativa, membro]);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ativa || !membro || !rascunho.trim()) return;
    const agora = new Date().toISOString();
    atualizar((b) => ({
      ...b,
      mensagens: [
        ...b.mensagens,
        {
          id: `ms-${Math.random().toString(36).slice(2, 9)}`,
          conversaId: ativa.id,
          autorId: membro.id,
          conteudo: rascunho.trim(),
          criadaEm: agora,
          lidaPor: [membro.id],
        },
      ],
      conversas: b.conversas.map((c) => (c.id === ativa.id ? { ...c, atualizadaEm: agora } : c)),
    }));
    setRascunho('');
  };

  const ultimaDe = (conversaId: string) =>
    base.mensagens
      .filter((m) => m.conversaId === conversaId)
      .sort((a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime())[0];

  const naoLidasDe = (conversaId: string) =>
    base.mensagens.filter(
      (m) => m.conversaId === conversaId && membro && m.autorId !== membro.id && !m.lidaPor.includes(membro.id),
    ).length;

  return (
    <div className="space-y-5">
      <CabecalhoPagina titulo="Mensagens" descricao="Comunicação interna entre membros, grupos e Núcleos." />

      <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
        <div className={cn('min-w-0 space-y-3', ativa && 'hidden lg:block')}>
          <CampoBusca valor={termo} aoMudar={setTermo} placeholder="Buscar conversa…" />
          <ul className="space-y-1.5">
            {conversas.map((c) => {
              const ultima = ultimaDe(c.id);
              const pendentes = naoLidasDe(c.id);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setSelecionada(c.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-card border p-3 text-left transition',
                      ativa?.id === c.id
                        ? 'border-ouro/45 bg-ouro-wash'
                        : 'border-line bg-surface-card hover:border-line-strong',
                    )}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-muted text-ink-soft">
                      <Icone nome={ICONE_CONVERSA[c.tipo]} className="text-[21px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate font-bold text-ink">{c.titulo}</span>
                        {c.fixada && <Icone nome="push_pin" className="shrink-0 text-[14px] text-ink-faint" />}
                      </span>
                      <span className="block truncate text-xs text-ink-faint">
                        {ultima ? ultima.conteudo : 'Sem mensagens'}
                      </span>
                    </span>
                    {pendentes > 0 && (
                      <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-critico px-1.5 text-[11px] font-bold text-white">
                        {pendentes}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
            {conversas.length === 0 && (
              <li className="rounded-card border border-line bg-surface-card">
                <Vazio icone="forum" titulo="Nenhuma conversa" descricao="Suas conversas aparecerão aqui." />
              </li>
            )}
          </ul>
        </div>

        <div
          className={cn(
            'flex h-[calc(100dvh-16rem)] min-h-[26rem] min-w-0 flex-col rounded-card border border-line bg-surface-card',
            !ativa && 'hidden lg:flex',
          )}
        >
          {!ativa ? (
            <Vazio
              icone="chat"
              titulo="Selecione uma conversa"
              descricao="Escolha um contato, grupo ou canal do seu Núcleo para começar."
              className="m-auto"
            />
          ) : (
            <>
              <header className="flex items-center gap-3 border-b border-line p-4">
                <button
                  type="button"
                  onClick={() => setSelecionada(null)}
                  aria-label="Voltar à lista"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition hover:bg-surface-muted lg:hidden"
                >
                  <Icone nome="arrow_back" className="text-[20px]" />
                </button>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-muted text-ink-soft">
                  <Icone nome={ICONE_CONVERSA[ativa.tipo]} className="text-[20px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink">{ativa.titulo}</p>
                  <p className="truncate text-xs text-ink-faint">
                    {ativa.participantes.length} participantes · atualizada {tempoRelativo(ativa.atualizadaEm)}
                  </p>
                </div>
                {ativa.tipo === 'oficial' && <Selo tom="ouro" icone="verified">Canal oficial</Selo>}
              </header>

              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                {mensagens.map((m) => {
                  const meu = m.autorId === membro?.id;
                  const autor = membroPorId(base, m.autorId);
                  return (
                    <div key={m.id} className={cn('flex gap-2.5', meu && 'flex-row-reverse')}>
                      {!meu && <Avatar nome={autor?.nomeCompleto ?? 'Membro'} tamanho="sm" />}
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-3.5 py-2.5',
                          meu
                            ? 'rounded-br-sm bg-ink text-ink-inverse'
                            : 'rounded-bl-sm border border-line bg-surface-muted text-ink',
                        )}
                      >
                        {!meu && (
                          <p className="mb-0.5 text-xs font-bold text-ink-soft">{autor?.nomeExibicao}</p>
                        )}
                        <p className="whitespace-pre-line text-sm leading-relaxed">{m.conteudo}</p>
                        <p className={cn('mt-1 text-[0.65rem]', meu ? 'text-ink-inverse/55' : 'text-ink-faint')}>
                          {hora(m.criadaEm)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={fim} />
              </div>

              <form onSubmit={enviar} className="flex items-center gap-2 border-t border-line p-3">
                <button
                  type="button"
                  aria-label="Anexar arquivo"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink-faint transition hover:bg-surface-muted hover:text-ink"
                >
                  <Icone nome="attach_file" className="text-[20px]" />
                </button>
                <input
                  value={rascunho}
                  onChange={(e) => setRascunho(e.target.value)}
                  placeholder="Escreva uma mensagem…"
                  aria-label="Escreva uma mensagem"
                  className="h-11 min-w-0 flex-1 rounded-full border border-line-strong bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:border-ouro focus:outline-none focus:ring-2 focus:ring-ouro/30"
                />
                <button
                  type="submit"
                  disabled={!rascunho.trim()}
                  aria-label="Enviar mensagem"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-ink-inverse transition disabled:opacity-40"
                >
                  <Icone nome="send" className="text-[19px]" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
