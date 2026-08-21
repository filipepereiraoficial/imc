import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import {
  membroPorId,
  membrosDoNucleo,
  nomeEstado,
  nomeMunicipio,
  nomePais,
} from '@/lib/consultas';
import { contem, data as formatarData, numero } from '@/lib/formato';
import { ordenarRanking } from '@/lib/xp';
import type { Nucleo, SituacaoNucleo } from '@/types';
import { CartaoMembro } from '@/components/domain/Itens';
import {
  AreaTexto,
  Avatar,
  Botao,
  Campo,
  Cartao,
  CabecalhoCartao,
  CampoBusca,
  CartaoEstatistica,
  Icone,
  Modal,
  Selecao,
  Selo,
  SemAcesso,
  Vazio,
} from '@/components/ui';
import type { TomSelo } from '@/components/ui/Selo';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const ROTULO_SITUACAO_NUCLEO: Record<SituacaoNucleo, string> = {
  ativo: 'Ativo',
  em_formacao: 'Em formação',
  suspenso: 'Suspenso',
  encerrado: 'Encerrado',
};

const TOM_SITUACAO_NUCLEO: Record<SituacaoNucleo, TomSelo> = {
  ativo: 'positivo',
  em_formacao: 'atencao',
  suspenso: 'critico',
  encerrado: 'neutro',
};

export function Nucleos() {
  const { base } = useDados();
  const { tem } = useAuth();
  const [termo, setTermo] = useState('');
  const [situacao, setSituacao] = useState<SituacaoNucleo | 'todas'>('todas');
  const [criando, setCriando] = useState(false);

  const lista = useMemo(() => {
    let itens = [...base.nucleos];
    if (situacao !== 'todas') itens = itens.filter((n) => n.situacao === situacao);
    if (termo)
      itens = itens.filter(
        (n) => contem(n.nome, termo) || contem(n.codigo, termo) || contem(nomeMunicipio(base, n.municipioId), termo),
      );
    return itens.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  }, [base, termo, situacao]);

  if (!tem('nucleos.visualizar')) return <SemAcesso modulo="o cadastro de Núcleos" />;

  const totalMembros = base.membros.filter((m) => m.nucleoId).length;

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Núcleos"
        descricao="Unidades territoriais da Ordem: fundação, direção, quadro e atividades."
        acao={
          tem('nucleos.criar') && (
            <Botao icone="add_home_work" onClick={() => setCriando(true)}>
              Novo Núcleo
            </Botao>
          )
        }
      />

      <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-3">
        <CartaoEstatistica rotulo="Núcleos" valor={numero(base.nucleos.length)} icone="hub" destaque />
        <CartaoEstatistica
          rotulo="Em atividade"
          valor={numero(base.nucleos.filter((n) => n.situacao === 'ativo').length)}
          icone="verified"
        />
        <CartaoEstatistica rotulo="Membros vinculados" valor={numero(totalMembros)} icone="groups" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <CampoBusca valor={termo} aoMudar={setTermo} placeholder="Buscar Núcleo, código ou município…" className="flex-1" />
        <Selecao
          rotulo=""
          aria-label="Filtrar por situação"
          className="sm:w-48 [&_label]:sr-only"
          value={situacao}
          onChange={(e) => setSituacao(e.target.value as SituacaoNucleo | 'todas')}
        >
          <option value="todas">Todas as situações</option>
          {(Object.keys(ROTULO_SITUACAO_NUCLEO) as SituacaoNucleo[]).map((s) => (
            <option key={s} value={s}>
              {ROTULO_SITUACAO_NUCLEO[s]}
            </option>
          ))}
        </Selecao>
      </div>

      {lista.length === 0 ? (
        <Cartao>
          <Vazio icone="hub" titulo="Nenhum Núcleo encontrado" descricao="Ajuste a busca ou o filtro de situação." />
        </Cartao>
      ) : (
        <div className="grid gap-4 [&>*]:min-w-0 md:grid-cols-2 xl:grid-cols-3">
          {lista.map((n) => {
            const membros = membrosDoNucleo(base, n.id);
            const dirigente = membroPorId(base, n.dirigenteId);
            return (
              <Link
                key={n.id}
                to={`/nucleos/${n.id}`}
                className="flex flex-col gap-3 rounded-card border border-line bg-surface-card p-5 shadow-suave transition hover:border-ouro/40 hover:shadow-elevado"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold leading-snug text-ink">{n.nome}</p>
                    <p className="mt-0.5 text-xs tracking-wider text-ink-faint">{n.codigo}</p>
                  </div>
                  <Selo tom={TOM_SITUACAO_NUCLEO[n.situacao]} rotulo>
                    {ROTULO_SITUACAO_NUCLEO[n.situacao]}
                  </Selo>
                </div>

                <dl className="space-y-1 text-sm text-ink-soft">
                  <div className="flex items-center gap-1.5">
                    <Icone nome="location_on" className="text-[15px] text-ink-faint" />
                    <dd className="truncate">
                      {nomeMunicipio(base, n.municipioId)} · {nomeEstado(base, n.estadoId)}
                    </dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icone nome="flag" className="text-[15px] text-ink-faint" />
                    <dd>{nomePais(base, n.paisId)}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icone nome="event" className="text-[15px] text-ink-faint" />
                    <dd>Fundado em {formatarData(n.dataFundacao, { day: undefined, month: 'long' })}</dd>
                  </div>
                </dl>

                <div className="mt-auto flex items-center gap-3 border-t border-line pt-3">
                  {dirigente && <Avatar nome={dirigente.nomeCompleto} tamanho="xs" />}
                  <span className="min-w-0 flex-1 truncate text-xs text-ink-faint">
                    {dirigente ? `Dirigente: ${dirigente.nomeExibicao}` : 'Sem dirigente designado'}
                  </span>
                  <span className="shrink-0 text-sm font-bold tabular-nums text-ink">{membros.length}</span>
                  <Icone nome="groups" className="shrink-0 text-[16px] text-ink-faint" />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {criando && <ModalNovoNucleo aoFechar={() => setCriando(false)} />}
    </div>
  );
}

/** Pagina do Nucleo. Usada tanto por /nucleos/:id quanto por /meu-nucleo. */
export function NucleoDetalhe({ proprio }: { proprio?: boolean }) {
  const { id } = useParams();
  const { base } = useDados();
  const { membro, pode } = useAuth();
  const [editando, setEditando] = useState(false);

  const nucleoId = proprio ? membro?.nucleoId : id;
  const nucleo = base.nucleos.find((n) => n.id === nucleoId);

  const membros = useMemo(() => (nucleo ? ordenarRanking(membrosDoNucleo(base, nucleo.id)) : []), [base, nucleo]);
  const eventos = useMemo(
    () =>
      base.eventos
        .filter((e) => e.nucleoId === nucleo?.id)
        .sort((a, b) => new Date(b.inicio).getTime() - new Date(a.inicio).getTime()),
    [base.eventos, nucleo],
  );
  const publicacoes = useMemo(
    () => base.publicacoes.filter((p) => p.nucleoId === nucleo?.id),
    [base.publicacoes, nucleo],
  );

  if (!nucleo) {
    return (
      <Cartao>
        <Vazio
          icone="hub"
          titulo={proprio ? 'Você ainda não possui Núcleo' : 'Núcleo não encontrado'}
          descricao={
            proprio
              ? 'A Secretaria fará a indicação do seu Núcleo de vínculo. Enquanto isso, participe das atividades nacionais.'
              : 'O Núcleo solicitado não existe ou foi encerrado.'
          }
        />
      </Cartao>
    );
  }

  const dirigente = membroPorId(base, nucleo.dirigenteId);
  const secretario = membroPorId(base, nucleo.secretarioId);
  const tesoureiro = membroPorId(base, nucleo.tesoureiroId);
  const xpTotal = membros.reduce((s, m) => s + m.xp, 0);
  const podeEditar = pode('nucleos.editar', { nucleoId: nucleo.id });

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo={nucleo.nome}
        descricao={`${nomeMunicipio(base, nucleo.municipioId)} · ${nomeEstado(base, nucleo.estadoId)} · ${nomePais(base, nucleo.paisId)}`}
        voltarPara={proprio ? undefined : '/nucleos'}
        rotuloVoltar="Voltar aos Núcleos"
        acao={
          podeEditar && (
            <Botao variante="contorno" icone="edit" onClick={() => setEditando(true)}>
              Editar Núcleo
            </Botao>
          )
        }
      />

      <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2 xl:grid-cols-4">
        <CartaoEstatistica rotulo="Membros" valor={numero(membros.length)} icone="groups" destaque />
        <CartaoEstatistica
          rotulo="Ativos"
          valor={numero(membros.filter((m) => m.situacao === 'ativo').length)}
          icone="verified_user"
        />
        <CartaoEstatistica rotulo="XP acumulado" valor={numero(xpTotal)} icone="bolt" />
        <CartaoEstatistica rotulo="Eventos" valor={numero(eventos.length)} icone="event" />
      </div>

      <div className="grid gap-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="min-w-0 space-y-5">
          <Cartao>
            <CabecalhoCartao
              titulo="Sobre o Núcleo"
              icone="info"
              acao={
                <Selo tom={TOM_SITUACAO_NUCLEO[nucleo.situacao]} rotulo>
                  {ROTULO_SITUACAO_NUCLEO[nucleo.situacao]}
                </Selo>
              }
            />
            <p className="mt-4 leading-relaxed text-ink-soft">{nucleo.descricao}</p>
            <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-line pt-4 sm:grid-cols-2">
              <Info rotulo="Código" valor={nucleo.codigo} />
              <Info rotulo="Fundação" valor={formatarData(nucleo.dataFundacao)} />
              <Info rotulo="Endereço" valor={nucleo.endereco} />
              <Info rotulo="Contato" valor={`${nucleo.contatoEmail} · ${nucleo.contatoTelefone}`} />
            </dl>
          </Cartao>

          <Cartao semPadding>
            <div className="p-5">
              <CabecalhoCartao
                titulo={`Quadro de membros (${membros.length})`}
                descricao="Ordenado por experiência acumulada."
                icone="groups"
              />
            </div>
            <div className="space-y-2 px-5 pb-5">
              {membros.length === 0 ? (
                <Vazio icone="person_off" titulo="Nenhum membro vinculado" />
              ) : (
                membros.map((m) => <CartaoMembro key={m.id} membro={m} />)
              )}
            </div>
          </Cartao>
        </div>

        <aside className="min-w-0 space-y-4">
          <Cartao>
            <CabecalhoCartao titulo="Direção" icone="workspace_premium" />
            <ul className="mt-4 space-y-3">
              {[
                { rotulo: 'Dirigente', pessoa: dirigente },
                { rotulo: 'Secretário', pessoa: secretario },
                { rotulo: 'Tesoureiro', pessoa: tesoureiro },
              ].map((c) => (
                <li key={c.rotulo} className="flex items-center gap-3">
                  {c.pessoa ? (
                    <>
                      <Avatar nome={c.pessoa.nomeCompleto} tamanho="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-ink">{c.pessoa.nomeExibicao}</p>
                        <p className="text-xs text-ink-faint">{c.rotulo}</p>
                      </div>
                      <Link
                        to={`/membros/${c.pessoa.id}`}
                        aria-label={`Ver perfil de ${c.pessoa.nomeCompleto}`}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-faint transition hover:bg-surface-muted"
                      >
                        <Icone nome="chevron_right" className="text-[18px]" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-muted text-ink-faint">
                        <Icone nome="person_off" className="text-[18px]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink-faint">Não designado</p>
                        <p className="text-xs text-ink-faint">{c.rotulo}</p>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Cartao>

          <Cartao>
            <CabecalhoCartao titulo="Atividades" icone="event" />
            <ul className="mt-4 space-y-2">
              {eventos.slice(0, 4).map((e) => (
                <li key={e.id}>
                  <Link
                    to={`/eventos/${e.id}`}
                    className="flex items-center gap-2.5 rounded-xl p-2 transition hover:bg-surface-muted"
                  >
                    <Icone nome="event" className="shrink-0 text-[18px] text-ink-faint" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">{e.titulo}</span>
                      <span className="block text-xs text-ink-faint">{formatarData(e.inicio)}</span>
                    </span>
                  </Link>
                </li>
              ))}
              {eventos.length === 0 && <li className="text-sm text-ink-faint">Nenhuma atividade registrada.</li>}
            </ul>
          </Cartao>

          <Cartao>
            <CabecalhoCartao titulo="Publicações" icone="article" />
            <p className="mt-3 text-sm text-ink-soft">
              {publicacoes.length === 0
                ? 'Este Núcleo ainda não publicou no feed.'
                : `${publicacoes.length} ${publicacoes.length === 1 ? 'publicação' : 'publicações'} no feed institucional.`}
            </p>
            <Link to="/feed" className="mt-3 inline-block">
              <Botao variante="contorno" tamanho="pequeno" icone="article">
                Abrir feed
              </Botao>
            </Link>
          </Cartao>
        </aside>
      </div>

      {editando && <ModalEdicaoNucleo nucleo={nucleo} aoFechar={() => setEditando(false)} />}
    </div>
  );
}

function Info({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="min-w-0">
      <dt className="rotulo">{rotulo}</dt>
      <dd className="mt-1 text-sm font-semibold text-ink">{valor}</dd>
    </div>
  );
}

function ModalEdicaoNucleo({ nucleo, aoFechar }: { nucleo: Nucleo; aoFechar: () => void }) {
  const { base, atualizar, auditar } = useDados();
  const { membro: autor } = useAuth();
  const { avisar } = useAviso();

  const [descricao, setDescricao] = useState(nucleo.descricao);
  const [endereco, setEndereco] = useState(nucleo.endereco);
  const [contatoEmail, setContatoEmail] = useState(nucleo.contatoEmail);
  const [contatoTelefone, setContatoTelefone] = useState(nucleo.contatoTelefone);
  const [situacao, setSituacao] = useState(nucleo.situacao);
  const [dirigenteId, setDirigenteId] = useState(nucleo.dirigenteId ?? '');
  const [secretarioId, setSecretarioId] = useState(nucleo.secretarioId ?? '');
  const [tesoureiroId, setTesoureiroId] = useState(nucleo.tesoureiroId ?? '');

  const candidatos = membrosDoNucleo(base, nucleo.id).filter((m) => m.situacao === 'ativo');

  const salvar = () => {
    if (!autor) return;
    atualizar((b) => ({
      ...b,
      nucleos: b.nucleos.map((n) =>
        n.id === nucleo.id
          ? {
              ...n,
              descricao,
              endereco,
              contatoEmail,
              contatoTelefone,
              situacao,
              dirigenteId: dirigenteId || null,
              secretarioId: secretarioId || null,
              tesoureiroId: tesoureiroId || null,
            }
          : n,
      ),
    }));
    auditar({
      membroId: autor.id,
      acao: 'Editou Núcleo',
      modulo: 'Secretaria',
      detalhe: `${nucleo.nome} (${nucleo.codigo}) atualizado.`,
    });
    avisar('sucesso', 'Núcleo atualizado', nucleo.nome);
    aoFechar();
  };

  return (
    <Modal
      aberto
      aoFechar={aoFechar}
      titulo={`Editar ${nucleo.nome}`}
      rodape={
        <>
          <Botao variante="contorno" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao icone="save" onClick={salvar}>
            Salvar
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <AreaTexto rotulo="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <Campo rotulo="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        <div className="grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
          <Campo rotulo="E-mail de contato" type="email" value={contatoEmail} onChange={(e) => setContatoEmail(e.target.value)} />
          <Campo rotulo="Telefone" type="tel" value={contatoTelefone} onChange={(e) => setContatoTelefone(e.target.value)} />
        </div>
        <Selecao rotulo="Situação" value={situacao} onChange={(e) => setSituacao(e.target.value as SituacaoNucleo)}>
          {(Object.keys(ROTULO_SITUACAO_NUCLEO) as SituacaoNucleo[]).map((s) => (
            <option key={s} value={s}>
              {ROTULO_SITUACAO_NUCLEO[s]}
            </option>
          ))}
        </Selecao>
        <div className="grid gap-4 [&>*]:min-w-0 sm:grid-cols-3">
          {[
            { rotulo: 'Dirigente', valor: dirigenteId, definir: setDirigenteId },
            { rotulo: 'Secretário', valor: secretarioId, definir: setSecretarioId },
            { rotulo: 'Tesoureiro', valor: tesoureiroId, definir: setTesoureiroId },
          ].map((c) => (
            <Selecao key={c.rotulo} rotulo={c.rotulo} value={c.valor} onChange={(e) => c.definir(e.target.value)}>
              <option value="">Não designado</option>
              {candidatos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nomeExibicao}
                </option>
              ))}
            </Selecao>
          ))}
        </div>
      </div>
    </Modal>
  );
}

function ModalNovoNucleo({ aoFechar }: { aoFechar: () => void }) {
  const { base, atualizar, auditar } = useDados();
  const { membro: autor } = useAuth();
  const { avisar } = useAviso();

  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [paisId, setPaisId] = useState('pa-br');
  const [estadoId, setEstadoId] = useState('');
  const [municipioId, setMunicipioId] = useState('');
  const [endereco, setEndereco] = useState('');
  const [erros, setErros] = useState<Record<string, string>>({});

  const criar = () => {
    const e: Record<string, string> = {};
    if (nome.trim().length < 5) e.nome = 'Informe o nome do Núcleo.';
    if (!/^[A-Z]{3}-\d{3}$/.test(codigo.trim().toUpperCase()))
      e.codigo = 'Use o formato AAA-000 (ex.: JAB-010).';
    if (base.nucleos.some((n) => n.codigo.toLowerCase() === codigo.trim().toLowerCase()))
      e.codigo = 'Este código já está em uso.';
    if (!estadoId) e.estadoId = 'Selecione o estado.';
    if (!municipioId) e.municipioId = 'Selecione o município.';
    setErros(e);
    if (Object.keys(e).length > 0 || !autor) return;

    const novo: Nucleo = {
      id: `nu-${Math.random().toString(36).slice(2, 9)}`,
      nome: nome.trim(),
      codigo: codigo.trim().toUpperCase(),
      paisId,
      estadoId,
      municipioId,
      endereco: endereco.trim(),
      dataFundacao: new Date().toISOString(),
      dirigenteId: null,
      secretarioId: null,
      tesoureiroId: null,
      situacao: 'em_formacao',
      descricao:
        'Unidade territorial em formação, responsável pela formação, mobilização e representação da Ordem em sua área de atuação.',
      contatoEmail: '',
      contatoTelefone: '',
    };

    atualizar((b) => ({ ...b, nucleos: [...b.nucleos, novo] }));
    auditar({
      membroId: autor.id,
      acao: 'Cadastrou Núcleo',
      modulo: 'Secretaria',
      detalhe: `${novo.nome} (${novo.codigo}) criado em formação.`,
    });
    avisar('sucesso', 'Núcleo cadastrado', `${novo.nome} — ${novo.codigo}`);
    aoFechar();
  };

  return (
    <Modal
      aberto
      aoFechar={aoFechar}
      titulo="Novo Núcleo"
      descricao="O Núcleo é criado em formação até a sessão solene de instalação."
      rodape={
        <>
          <Botao variante="contorno" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao icone="add_home_work" onClick={criar}>
            Cadastrar
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <Campo rotulo="Nome" value={nome} onChange={(e) => setNome(e.target.value)} erro={erros.nome} placeholder="Núcleo Caruaru" required />
        <Campo
          rotulo="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.toUpperCase())}
          erro={erros.codigo}
          placeholder="CAR-010"
          dica="Três letras, hífen e três dígitos."
          required
        />
        <Selecao
          rotulo="País"
          value={paisId}
          onChange={(e) => {
            setPaisId(e.target.value);
            setEstadoId('');
            setMunicipioId('');
          }}
        >
          {base.paises.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </Selecao>
        <div className="grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
          <Selecao
            rotulo="Estado"
            value={estadoId}
            onChange={(e) => {
              setEstadoId(e.target.value);
              setMunicipioId('');
            }}
            erro={erros.estadoId}
            required
          >
            <option value="">Selecione…</option>
            {base.estados
              .filter((x) => x.paisId === paisId)
              .map((x) => (
                <option key={x.id} value={x.id}>
                  {x.nome}
                </option>
              ))}
          </Selecao>
          <Selecao
            rotulo="Município"
            value={municipioId}
            onChange={(e) => setMunicipioId(e.target.value)}
            erro={erros.municipioId}
            disabled={!estadoId}
            required
          >
            <option value="">Selecione…</option>
            {base.municipios
              .filter((m) => m.estadoId === estadoId)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
          </Selecao>
        </div>
        <Campo rotulo="Endereço da sede" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      </div>
    </Modal>
  );
}
