import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { cargoDe, grauDe, localidade, nucleoPorId, publicacoesOrdenadas } from '@/lib/consultas';
import {
  DESCRICAO_TITULO,
  ROTULO_CATEGORIA_ASSOCIATIVA,
  ROTULO_CATEGORIA_GRAU,
  ROTULO_TITULO,
  apto,
} from '@/data/graus';
import { definicaoRito } from '@/data/ritos';
import { data as formatarData, numero, tempoRelativo } from '@/lib/formato';
import { posicaoNoRanking, progressoNivel } from '@/lib/xp';
import type { Membro, NivelVisibilidade } from '@/types';
import { CarteiraMembro, PlacaIndicador } from '@/components/domain/CarteiraMembro';
import { CartaoPublicacao } from '@/components/domain/CartaoPublicacao';
import { ROTULO_SITUACAO, TOM_SITUACAO } from '@/components/domain/Itens';
import {
  Abas,
  Botao,
  Cartao,
  CabecalhoCartao,
  Icone,
  Modal,
  Selo,
  Vazio,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';
import { NOME_ORDEM } from '@/config';

type Secao = 'visao' | 'ritos' | 'publicacoes' | 'conquistas' | 'atividade';

/** Perfil proprio (/perfil) e de terceiros (/membros/:id). */
export function Perfil() {
  const { id } = useParams();
  const { membro: autenticado } = useAuth();
  const { base } = useDados();
  const { avisar } = useAviso();
  const [secao, setSecao] = useState<Secao>('visao');
  const [carteiraAberta, setCarteiraAberta] = useState(false);

  const alvo = useMemo(
    () => (id ? base.membros.find((m) => m.id === id) : autenticado),
    [id, base.membros, autenticado],
  );
  const proprio = alvo?.id === autenticado?.id;

  const info = useMemo(() => {
    if (!alvo) return null;
    const ativos = base.membros.filter((m) => m.situacao === 'ativo');
    return {
      cargo: cargoDe(base, alvo),
      grau: grauDe(base, alvo),
      nucleo: nucleoPorId(base, alvo.nucleoId),
      progresso: progressoNivel(base.niveis, alvo.xp),
      posicao: posicaoNoRanking(ativos, alvo.id),
      publicacoes: publicacoesOrdenadas(base).filter((p) => p.autorId === alvo.id),
      conquistas: base.conquistas.filter((c) => alvo.conquistas.includes(c.id)),
      ritos: base.ritos
        .filter((r) => r.membroId === alvo.id)
        .sort((a, b) => new Date(b.celebradoEm).getTime() - new Date(a.celebradoEm).getTime()),
      transacoes: base.transacoesXP
        .filter((t) => t.membroId === alvo.id)
        .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
        .slice(0, 12),
    };
  }, [alvo, base]);

  if (!alvo || !info) {
    return (
      <Cartao>
        <Vazio icone="person_off" titulo="Membro não encontrado" descricao="O registro solicitado não existe ou foi removido." />
      </Cartao>
    );
  }

  /** Um dado so aparece se a preferencia de privacidade do titular permitir. */
  const visivel = (nivel: NivelVisibilidade): boolean => {
    if (proprio) return true;
    if (!autenticado) return false;
    switch (nivel) {
      case 'publico':
        return true;
      case 'nucleo':
        return autenticado.nucleoId === alvo.nucleoId;
      case 'administracao':
        return (cargoDe(base, autenticado)?.precedencia ?? 99) <= 4;
      case 'privado':
      default:
        return false;
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <CabecalhoPagina
        titulo={proprio ? 'Meu perfil' : alvo.nomeCompleto}
        descricao={proprio ? 'Sua identidade institucional na Ordem.' : `@${alvo.usuario}`}
        voltarPara={proprio ? undefined : '/ranking'}
        rotuloVoltar="Voltar ao ranking"
        acao={
          proprio ? (
            <>
              <Botao variante="contorno" icone="badge" onClick={() => setCarteiraAberta(true)}>
                Carteira
              </Botao>
              <Link to="/painel">
                <Botao icone="manage_accounts">Editar perfil</Botao>
              </Link>
            </>
          ) : (
            <Botao
              variante="contorno"
              icone="forum"
              onClick={() => avisar('info', 'Mensagem direta', 'Abra Mensagens para iniciar a conversa.')}
            >
              Mensagem
            </Botao>
          )
        }
      />

      <div className="grid gap-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-5">
          <CarteiraMembro membro={alvo} />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <PlacaIndicador icone="bolt" valor={numero(alvo.xp)} rotulo="XP total" destaque />
            <PlacaIndicador icone="leaderboard" valor={`${info.posicao}º`} rotulo="Ranking" />
            <PlacaIndicador icone="local_fire_department" valor={alvo.sequenciaDias} rotulo="Sequência" />
            <PlacaIndicador icone="groups" valor={alvo.aliados.length} rotulo="Aliados" />
          </div>

          <Abas
            variante="linha"
            itens={[
              { id: 'visao', rotulo: 'Visão geral', icone: 'person' },
              { id: 'ritos', rotulo: 'Ritos', icone: 'church', contagem: info.ritos.length },
              { id: 'publicacoes', rotulo: 'Publicações', contagem: info.publicacoes.length },
              { id: 'conquistas', rotulo: 'Conquistas', contagem: info.conquistas.length },
              { id: 'atividade', rotulo: 'Atividade' },
            ]}
            ativo={secao}
            aoMudar={setSecao}
            rotuloGrupo="Seções do perfil"
          />

          {secao === 'visao' && (
            <div className="space-y-4">
              <Cartao>
                <CabecalhoCartao titulo="Dados institucionais" icone="badge" />
                <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  <Dado rotulo="Número de membro" valor={alvo.numeroMembro} mono />
                  <Dado
                    rotulo="Categoria associativa"
                    valor={ROTULO_CATEGORIA_ASSOCIATIVA[alvo.categoriaAssociativa]}
                  />
                  <Dado
                    rotulo="Grau"
                    valor={
                      info.grau
                        ? `${info.grau.nome} · ${ROTULO_CATEGORIA_GRAU[info.grau.categoria]}`
                        : '—'
                    }
                  />
                  <Dado rotulo="Cargo" valor={info.cargo?.nome ?? '—'} />
                  <Dado rotulo="Núcleo" valor={info.nucleo?.nome ?? 'Sem vínculo'} />
                  <Dado rotulo="Ingresso" valor={formatarData(alvo.dataIngresso)} />
                  <Dado rotulo="Localidade" valor={localidade(base, alvo)} />
                  <div>
                    <dt className="rotulo">Situação</dt>
                    <dd className="mt-1">
                      <Selo tom={TOM_SITUACAO[alvo.situacao]}>{ROTULO_SITUACAO[alvo.situacao]}</Selo>
                    </dd>
                  </div>
                </dl>

                {alvo.titulos.length > 0 && (
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="rotulo mb-2">Títulos</p>
                    <ul className="space-y-2">
                      {alvo.titulos.map((t) => (
                        <li key={t} className="flex items-start gap-2.5">
                          <Selo tom="ouro" icone="workspace_premium">
                            {ROTULO_TITULO[t]}
                          </Selo>
                          <span className="text-xs leading-relaxed text-ink-soft">
                            {DESCRICAO_TITULO[t]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Cartao>

              <Cartao>
                <CabecalhoCartao titulo="Contato" icone="contact_mail" />
                <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  <Dado
                    rotulo="E-mail"
                    valor={visivel(alvo.privacidade.email) ? alvo.email : 'Restrito pelo titular'}
                    restrito={!visivel(alvo.privacidade.email)}
                  />
                  <Dado
                    rotulo="Telefone"
                    valor={visivel(alvo.privacidade.telefone) ? alvo.telefone : 'Restrito pelo titular'}
                    restrito={!visivel(alvo.privacidade.telefone)}
                  />
                  <Dado
                    rotulo="Data de nascimento"
                    valor={
                      visivel(alvo.privacidade.dataNascimento)
                        ? formatarData(alvo.dataNascimento)
                        : 'Restrito pelo titular'
                    }
                    restrito={!visivel(alvo.privacidade.dataNascimento)}
                  />
                  <Dado
                    rotulo="Endereço"
                    valor={
                      visivel(alvo.privacidade.endereco)
                        ? `${alvo.endereco.logradouro}, ${alvo.endereco.numero} — ${alvo.endereco.bairro}`
                        : 'Restrito pelo titular'
                    }
                    restrito={!visivel(alvo.privacidade.endereco)}
                  />
                </dl>
              </Cartao>

              {(alvo.biografia || alvo.interessesFilosoficos.length > 0) && (
                <Cartao>
                  <CabecalhoCartao titulo="Formação e atuação" icone="auto_stories" />
                  {alvo.biografia && (
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">{alvo.biografia}</p>
                  )}
                  {alvo.interessesFilosoficos.length > 0 && (
                    <div className="mt-4">
                      <p className="rotulo mb-2">Interesses filosóficos</p>
                      <div className="flex flex-wrap gap-1.5">
                        {alvo.interessesFilosoficos.map((i) => (
                          <Selo key={i} tom="neutro">
                            {i}
                          </Selo>
                        ))}
                      </div>
                    </div>
                  )}
                  {alvo.areasAtuacao.length > 0 && (
                    <div className="mt-4">
                      <p className="rotulo mb-2">Áreas de atuação</p>
                      <div className="flex flex-wrap gap-1.5">
                        {alvo.areasAtuacao.map((a) => (
                          <Selo key={a} tom="ouro">
                            {a}
                          </Selo>
                        ))}
                      </div>
                    </div>
                  )}
                </Cartao>
              )}
            </div>
          )}

          {secao === 'ritos' && (
            <div className="space-y-3">
              {info.ritos.length === 0 ? (
                <Cartao>
                  <Vazio
                    icone="church"
                    titulo="Nenhum rito registrado"
                    descricao="Os ritos celebrados aparecem aqui, do ingresso à graduação."
                  />
                </Cartao>
              ) : (
                info.ritos.map((r) => {
                  const def = definicaoRito(r.tipo);
                  const presidente = base.membros.find((m) => m.id === r.presididoPorId);
                  const grau = base.graus.find((g) => g.id === r.grauAlcancadoId);
                  return (
                    <Cartao key={r.id}>
                      <div className="flex items-start gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ouro-wash text-[rgb(var(--c-gold-deep))]">
                          <Icone nome={def.icone} className="text-[21px]" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <h3 className="font-bold text-ink">{def.nome}</h3>
                            <span className="text-xs text-ink-faint">{formatarData(r.celebradoEm)}</span>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{def.descricao}</p>
                          {r.nota && (
                            <p className="mt-2 rounded-xl bg-surface-muted/60 p-3 text-sm text-ink-soft">
                              {r.nota}
                            </p>
                          )}
                          {grau && (
                            <div className="mt-2">
                              <Selo tom="ouro" icone="stairs">
                                Grau alcançado: {grau.nome}
                              </Selo>
                            </div>
                          )}
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-3 text-xs text-ink-faint">
                            <span className="flex items-center gap-1">
                              <Icone nome="location_on" className="text-[14px]" />
                              {r.local}
                            </span>
                            {presidente && (
                              <span className="flex items-center gap-1">
                                <Icone nome="person" className="text-[14px]" />
                                Presidido por {presidente.nomeExibicao}
                              </span>
                            )}
                            <span className="ml-auto">{def.fundamento}</span>
                          </div>
                        </div>
                      </div>
                    </Cartao>
                  );
                })
              )}
            </div>
          )}

          {secao === 'publicacoes' && (
            <div className="space-y-3">
              {info.publicacoes.length === 0 ? (
                <Cartao>
                  <Vazio icone="post_add" titulo="Nenhuma publicação" descricao="Este membro ainda não publicou no feed." />
                </Cartao>
              ) : (
                info.publicacoes.map((p) => <CartaoPublicacao key={p.id} publicacao={p} />)
              )}
            </div>
          )}

          {secao === 'conquistas' && (
            <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2">
              {base.conquistas.map((c) => {
                const obtida = alvo.conquistas.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className={`flex items-start gap-3 rounded-card border p-4 ${
                      obtida ? 'border-ouro/40 bg-ouro-wash' : 'border-line bg-surface-card opacity-70'
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                        obtida ? 'bg-ouro/25 text-[rgb(var(--c-gold-deep))]' : 'bg-surface-muted text-ink-faint'
                      }`}
                    >
                      <Icone nome={obtida ? c.icone : 'lock'} className="text-[21px]" preenchido={obtida} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-ink">{c.nome}</p>
                      <p className="mt-0.5 text-sm text-ink-soft">{c.descricao}</p>
                      <p className="mt-1.5 text-xs text-ink-faint">Critério: {c.criterio}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {secao === 'atividade' && (
            <Cartao semPadding>
              <ul className="divide-y divide-line">
                {info.transacoes.length === 0 && (
                  <li>
                    <Vazio icone="history" titulo="Sem registros" descricao="Nenhuma pontuação registrada até o momento." />
                  </li>
                )}
                {info.transacoes.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-muted text-ink-soft">
                      <Icone nome="bolt" className="text-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{t.descricao}</p>
                      <p className="text-xs text-ink-faint">{tempoRelativo(t.criadoEm)}</p>
                    </div>
                    <span className="shrink-0 text-sm font-extrabold tabular-nums text-[rgb(var(--c-gold-deep))] dark:text-ouro">
                      +{t.pontos}
                    </span>
                  </li>
                ))}
              </ul>
            </Cartao>
          )}
        </div>

        <aside className="min-w-0 space-y-4">
          {info.grau && (
            <Cartao>
              <p className="rotulo">Grau</p>
              <p className="mt-2 text-titulo leading-none text-ink">{info.grau.nome}</p>
              <p className="mt-1 text-sm font-semibold text-ink-soft">
                Categoria {ROTULO_CATEGORIA_GRAU[info.grau.categoria]} · {info.grau.ordem}.º grau
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{info.grau.descricao}</p>
              {apto(base.graus, info.grau, alvo.xp) && (
                <p className="mt-3 flex items-start gap-2 rounded-2xl bg-ouro-wash p-3 text-xs text-[rgb(var(--c-gold-deep))] dark:text-ouro">
                  <Icone nome="stairs" className="mt-px shrink-0 text-[16px]" />
                  <span>
                    Reúne participação para ser considerado à elevação. A decisão cabe à Mestria,
                    pelo rito da Prokopē.
                  </span>
                </p>
              )}
            </Cartao>
          )}

          <Cartao>
            <p className="rotulo">Progresso de participação</p>
            <p className="mt-2 text-titulo leading-none text-ink">
              {info.progresso.nivel.numero}
              <span className="ml-2 text-base font-semibold text-ink-soft">{info.progresso.nivel.titulo}</span>
            </p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-surface-strong">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ouro to-ouro-soft"
                style={{ width: `${info.progresso.fracao * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-ink-faint">
              {info.progresso.proximo
                ? `${numero(info.progresso.xpNoNivel)} / ${numero(info.progresso.xpNecessario)} XP — faltam ${numero(info.progresso.restante)} para ${info.progresso.proximo.titulo}`
                : 'Nível máximo alcançado.'}
            </p>
          </Cartao>

          <Cartao>
            <CabecalhoCartao titulo="Carteira digital" icone="qr_code_2" />
            <p className="mt-3 text-sm text-ink-soft">
              A carteira comprova a membresia e pode ser validada por QR Code em atividades da Ordem.
            </p>
            <Botao className="mt-4" larguraTotal variante="contorno" icone="badge" onClick={() => setCarteiraAberta(true)}>
              Visualizar carteira
            </Botao>
          </Cartao>
        </aside>
      </div>

      <ModalCarteira aberto={carteiraAberta} aoFechar={() => setCarteiraAberta(false)} membro={alvo} />
    </div>
  );
}

function Dado({
  rotulo,
  valor,
  mono,
  restrito,
}: {
  rotulo: string;
  valor: string;
  mono?: boolean;
  restrito?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="rotulo">{rotulo}</dt>
      <dd
        className={`mt-1 truncate text-sm ${
          restrito ? 'flex items-center gap-1 text-ink-faint' : 'font-semibold text-ink'
        } ${mono ? 'tracking-wider' : ''}`}
      >
        {restrito && <Icone nome="lock" className="text-[15px]" />}
        {valor}
      </dd>
    </div>
  );
}

function ModalCarteira({
  aberto,
  aoFechar,
  membro,
}: {
  aberto: boolean;
  aoFechar: () => void;
  membro: Membro;
}) {
  const { avisar } = useAviso();
  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo="Carteira de Membro"
      descricao="Documento digital de identificação institucional."
      largura="sm"
      rodape={
        <>
          <Botao
            variante="contorno"
            icone="share"
            onClick={() => avisar('sucesso', 'Compartilhada', 'A carteira foi compartilhada internamente.')}
          >
            Compartilhar
          </Botao>
          <Botao
            icone="verified"
            onClick={() => avisar('sucesso', 'Membresia válida', `${membro.numeroMembro} verificado.`)}
          >
            Validar
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <CarteiraMembro membro={membro} compacta />
        <div className="flex items-center gap-4 rounded-card border border-line bg-surface-muted/60 p-4">
          <CodigoQR valor={membro.numeroMembro} />
          <div className="min-w-0 text-sm">
            <p className="font-bold text-ink">Validação por QR Code</p>
            <p className="mt-1 text-ink-soft">
              A leitura confirma o registro <strong className="tracking-wider">{membro.numeroMembro}</strong> junto à{' '}
              {NOME_ORDEM}.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/**
 * Marca de validacao deterministica derivada do numero de membro.
 * A geracao de QR Code real ocorre no servidor, com assinatura verificavel.
 */
function CodigoQR({ valor }: { valor: string }) {
  const celulas = useMemo(() => {
    const grade: boolean[] = [];
    let semente = 0;
    for (let i = 0; i < valor.length; i++) semente = (semente * 31 + valor.charCodeAt(i)) % 100000;
    for (let i = 0; i < 121; i++) {
      semente = (semente * 1103515245 + 12345) % 2147483648;
      grade.push((semente >> 7) % 3 !== 0);
    }
    return grade;
  }, [valor]);

  return (
    <div
      className="grid h-24 w-24 shrink-0 grid-cols-11 gap-px rounded-lg border border-line bg-white p-1.5"
      role="img"
      aria-label={`Código de validação do registro ${valor}`}
    >
      {celulas.map((ativa, i) => (
        <span key={i} className={ativa ? 'bg-[rgb(20_18_14)]' : 'bg-white'} />
      ))}
    </div>
  );
}
