import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { comentariosDe, membroPorId, nucleoPorId, cargoDe } from '@/lib/consultas';
import { cn } from '@/lib/cn';
import { compacto, tempoRelativo } from '@/lib/formato';
import type { CategoriaPublicacao, Publicacao } from '@/types';
import { Avatar, Icone, Selo } from '@/components/ui';

export const ROTULO_CATEGORIA: Record<CategoriaPublicacao, string> = {
  comunicado: 'Comunicado',
  formacao: 'Formação',
  evento: 'Evento',
  nucleo: 'Núcleo',
  noticia: 'Notícia',
  membro: 'Membro',
};

const ICONE_ANEXO: Record<string, string> = {
  documento: 'description',
  video: 'play_circle',
  imagem: 'image',
  link: 'link',
  evento: 'event',
  enquete: 'ballot',
};

export function CartaoPublicacao({ publicacao }: { publicacao: Publicacao }) {
  const { base, atualizar } = useDados();
  const { membro } = useAuth();
  const { avisar } = useAviso();
  const [menuAberto, setMenuAberto] = useState(false);
  const [comentariosVisiveis, setComentariosVisiveis] = useState(false);
  const [rascunho, setRascunho] = useState('');

  const autor = membroPorId(base, publicacao.autorId);
  const cargo = cargoDe(base, autor);
  const nucleo = nucleoPorId(base, publicacao.nucleoId);
  const comentarios = comentariosDe(base, publicacao.id);
  const curtiu = membro ? publicacao.curtidas.includes(membro.id) : false;
  const salvou = membro ? publicacao.salvoPor.includes(membro.id) : false;

  const alternarLista = (campo: 'curtidas' | 'salvoPor') => {
    if (!membro) return;
    atualizar((b) => ({
      ...b,
      publicacoes: b.publicacoes.map((p) =>
        p.id === publicacao.id
          ? {
              ...p,
              [campo]: p[campo].includes(membro.id)
                ? p[campo].filter((x) => x !== membro.id)
                : [...p[campo], membro.id],
            }
          : p,
      ),
    }));
  };

  const comentar = () => {
    if (!membro || !rascunho.trim()) return;
    atualizar((b) => ({
      ...b,
      comentarios: [
        ...b.comentarios,
        {
          id: `co-${Math.random().toString(36).slice(2, 9)}`,
          publicacaoId: publicacao.id,
          autorId: membro.id,
          conteudo: rascunho.trim(),
          criadoEm: new Date().toISOString(),
          curtidas: [],
        },
      ],
    }));
    setRascunho('');
  };

  return (
    <article className="rounded-card border border-line bg-surface-card shadow-suave">
      <header className="flex items-start gap-3 p-4 pb-3">
        {publicacao.oficial ? (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ouro/35 bg-ouro-wash">
            <Icone nome="account_balance" className="text-[21px] text-[rgb(var(--c-gold-deep))]" />
          </span>
        ) : (
          <Avatar nome={autor?.nomeCompleto ?? 'Membro'} fotoUrl={autor?.fotoUrl} />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="truncate font-bold text-ink">
              {publicacao.oficial ? publicacao.emitidoPor : autor?.nomeExibicao}
            </p>
            {publicacao.fixado && <Selo tom="ouro" icone="push_pin" rotulo>Fixado</Selo>}
          </div>
          <p className="mt-0.5 truncate text-xs text-ink-faint">
            {publicacao.oficial ? 'Comunicado Oficial' : (cargo?.nome ?? 'Membro')}
            {nucleo && ` · ${nucleo.nome}`} · {tempoRelativo(publicacao.criadoEm)}
          </p>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            aria-label="Opções da publicação"
            aria-expanded={menuAberto}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-faint transition hover:bg-surface-muted hover:text-ink"
          >
            <Icone nome="more_horiz" className="text-[20px]" />
          </button>
          {menuAberto && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuAberto(false)} aria-hidden />
              <div className="absolute right-0 top-10 z-20 w-52 overflow-hidden rounded-xl border border-line bg-surface-card py-1 shadow-elevado">
                {[
                  { icone: salvou ? 'bookmark_remove' : 'bookmark_add', rotulo: salvou ? 'Remover dos salvos' : 'Salvar publicação', acao: () => alternarLista('salvoPor') },
                  { icone: 'share', rotulo: 'Compartilhar internamente', acao: () => avisar('sucesso', 'Compartilhado', 'A publicação foi encaminhada ao seu Núcleo.') },
                  { icone: 'link', rotulo: 'Copiar referência', acao: () => avisar('info', 'Referência copiada', `Publicação ${publicacao.id}`) },
                  { icone: 'flag', rotulo: 'Denunciar', acao: () => avisar('atencao', 'Denúncia registrada', 'A moderação analisará o conteúdo.') },
                ].map((item) => (
                  <button
                    key={item.rotulo}
                    type="button"
                    onClick={() => {
                      item.acao();
                      setMenuAberto(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-ink transition hover:bg-surface-muted"
                  >
                    <Icone nome={item.icone} className="text-[18px] text-ink-faint" />
                    {item.rotulo}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <div className="px-4 pb-3">
        {publicacao.titulo && (
          <h3 className="mb-1.5 text-base font-bold leading-snug text-ink">{publicacao.titulo}</h3>
        )}
        <p className="whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink-soft">
          {publicacao.conteudo}
        </p>

        {publicacao.anexos.map((anexo, i) => (
          <div key={i} className="mt-3">
            {anexo.tipo === 'imagem' && (
              <div className="flex aspect-[16/9] items-end overflow-hidden rounded-xl border border-line bg-gradient-to-br from-surface-strong to-surface-muted p-4">
                <p className="text-sm font-semibold text-ink-soft">{anexo.titulo}</p>
              </div>
            )}

            {anexo.tipo === 'video' && (
              <button
                type="button"
                onClick={() => avisar('info', 'Reprodução', 'O player será integrado à biblioteca de formação.')}
                className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-line bg-gradient-to-br from-ink to-[rgb(48_42_30)]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-ouro-soft text-ink">
                  <Icone nome="play_arrow" preenchido className="text-[28px]" />
                </span>
                <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white/85">
                  <span className="truncate">{anexo.titulo}</span>
                  {anexo.duracao && <span className="tabular-nums">{anexo.duracao}</span>}
                </span>
              </button>
            )}

            {(anexo.tipo === 'documento' || anexo.tipo === 'link' || anexo.tipo === 'evento') && (
              <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-muted/60 p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-card text-ink-soft">
                  <Icone nome={ICONE_ANEXO[anexo.tipo]} className="text-[20px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{anexo.titulo}</p>
                  <p className="truncate text-xs text-ink-faint">
                    {anexo.descricao ?? anexo.tamanho ?? anexo.url}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => avisar('sucesso', 'Acesso registrado', anexo.titulo)}
                  aria-label={`Abrir ${anexo.titulo}`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-soft transition hover:bg-surface-card"
                >
                  <Icone nome={anexo.tipo === 'documento' ? 'download' : 'open_in_new'} className="text-[19px]" />
                </button>
              </div>
            )}

            {anexo.tipo === 'enquete' && anexo.opcoes && (
              <div className="rounded-xl border border-line bg-surface-muted/60 p-4">
                <p className="text-sm font-bold text-ink">{anexo.titulo}</p>
                <ul className="mt-3 space-y-2">
                  {anexo.opcoes.map((op) => {
                    const total = anexo.opcoes!.reduce((s, o) => s + o.votos, 0) || 1;
                    const pct = Math.round((op.votos / total) * 100);
                    return (
                      <li key={op.id}>
                        <div className="flex items-baseline justify-between text-sm">
                          <span className="text-ink">{op.texto}</span>
                          <span className="font-bold tabular-nums text-ink">{pct}%</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-strong">
                          <div className="h-full rounded-full bg-ouro" style={{ width: `${pct}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-xs text-ink-faint">
                  {compacto(anexo.opcoes.reduce((s, o) => s + o.votos, 0))} respostas
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="flex items-center gap-1 border-t border-line px-2 py-1.5">
        <BotaoAcao
          icone="thumb_up"
          preenchido={curtiu}
          ativo={curtiu}
          rotulo={`${compacto(publicacao.curtidas.length)}`}
          descricao="Curtir"
          onClick={() => alternarLista('curtidas')}
        />
        <BotaoAcao
          icone="mode_comment"
          rotulo={`${comentarios.length}`}
          descricao="Comentários"
          onClick={() => setComentariosVisiveis((v) => !v)}
        />
        <BotaoAcao
          icone="share"
          rotulo={`${compacto(publicacao.compartilhamentos)}`}
          descricao="Compartilhar"
          onClick={() => avisar('sucesso', 'Compartilhado', 'Encaminhado internamente.')}
        />
        <div className="ml-auto">
          <BotaoAcao
            icone="bookmark"
            preenchido={salvou}
            ativo={salvou}
            descricao={salvou ? 'Remover dos salvos' : 'Salvar'}
            onClick={() => alternarLista('salvoPor')}
          />
        </div>
      </footer>

      {comentariosVisiveis && (
        <div className="space-y-3 border-t border-line bg-surface-muted/40 p-4">
          {comentarios.length === 0 && (
            <p className="text-sm text-ink-faint">Nenhum comentário ainda. Seja o primeiro a responder.</p>
          )}
          {comentarios.map((c) => {
            const a = membroPorId(base, c.autorId);
            return (
              <div key={c.id} className="flex gap-2.5">
                <Avatar nome={a?.nomeCompleto ?? 'Membro'} tamanho="sm" />
                <div className="min-w-0 flex-1 rounded-xl rounded-tl-sm border border-line bg-surface-card px-3 py-2">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-xs">
                    <Link to={`/membros/${c.autorId}`} className="font-bold text-ink hover:underline">
                      {a?.nomeExibicao ?? 'Membro'}
                    </Link>
                    <span className="text-ink-faint">{tempoRelativo(c.criadoEm)}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.conteudo}</p>
                </div>
              </div>
            );
          })}
          {membro && (
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                comentar();
              }}
            >
              <Avatar nome={membro.nomeCompleto} tamanho="sm" />
              <input
                value={rascunho}
                onChange={(e) => setRascunho(e.target.value)}
                placeholder="Escreva um comentário…"
                aria-label="Escreva um comentário"
                className="h-10 flex-1 rounded-full border border-line-strong bg-surface-card px-4 text-sm text-ink placeholder:text-ink-faint focus:border-ouro focus:outline-none focus:ring-2 focus:ring-ouro/30"
              />
              <button
                type="submit"
                disabled={!rascunho.trim()}
                aria-label="Enviar comentário"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-ink-inverse transition disabled:opacity-40"
              >
                <Icone nome="send" className="text-[18px]" />
              </button>
            </form>
          )}
        </div>
      )}
    </article>
  );
}

function BotaoAcao({
  icone,
  rotulo,
  descricao,
  onClick,
  ativo,
  preenchido,
}: {
  icone: string;
  rotulo?: string;
  descricao: string;
  onClick: () => void;
  ativo?: boolean;
  preenchido?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={descricao}
      aria-pressed={ativo}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition',
        ativo ? 'text-[rgb(var(--c-gold-deep))]' : 'text-ink-faint hover:bg-surface-muted hover:text-ink',
      )}
    >
      <Icone nome={icone} preenchido={preenchido} className="text-[19px]" />
      {rotulo && <span className="tabular-nums">{rotulo}</span>}
    </button>
  );
}
