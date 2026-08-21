import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { localidade, nucleoPorId } from '@/lib/consultas';
import { podeAtribuirCargo } from '@/lib/rbac';
import { contem, data as formatarData, numero } from '@/lib/formato';
import type { Membro, SituacaoMembresia } from '@/types';
import { ROTULO_SITUACAO, TOM_SITUACAO } from '@/components/domain/Itens';
import {
  AreaTexto,
  Avatar,
  Botao,
  Campo,
  Cartao,
  CampoBusca,
  Confirmacao,
  Icone,
  Modal,
  Paginacao,
  Selecao,
  Selo,
  SemAcesso,
  Tabela,
  Vazio,
} from '@/components/ui';
import type { Coluna } from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const POR_PAGINA = 15;

interface Filtros {
  paisId: string;
  estadoId: string;
  municipioId: string;
  nucleoId: string;
  cargoId: string;
  situacao: string;
  nivelMinimo: string;
}

const FILTROS_VAZIOS: Filtros = {
  paisId: '',
  estadoId: '',
  municipioId: '',
  nucleoId: '',
  cargoId: '',
  situacao: '',
  nivelMinimo: '',
};

export function Membros() {
  const { base, atualizar, auditar } = useDados();
  const { membro: autor, tem, pode } = useAuth();
  const { avisar } = useAviso();
  const navegar = useNavigate();

  const [termo, setTermo] = useState('');
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VAZIOS);
  const [filtrosVisiveis, setFiltrosVisiveis] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [emEdicao, setEmEdicao] = useState<Membro | null>(null);
  const [criando, setCriando] = useState(false);
  const [confirmacao, setConfirmacao] = useState<{ membro: Membro; acao: 'suspender' | 'reativar' } | null>(null);

  const lista = useMemo(() => {
    let itens = [...base.membros];
    if (termo) {
      itens = itens.filter(
        (m) =>
          contem(m.nomeCompleto, termo) ||
          contem(m.usuario, termo) ||
          contem(m.numeroMembro, termo) ||
          contem(m.email, termo),
      );
    }
    if (filtros.paisId) itens = itens.filter((m) => m.paisId === filtros.paisId);
    if (filtros.estadoId) itens = itens.filter((m) => m.estadoId === filtros.estadoId);
    if (filtros.municipioId) itens = itens.filter((m) => m.municipioId === filtros.municipioId);
    if (filtros.nucleoId) itens = itens.filter((m) => m.nucleoId === filtros.nucleoId);
    if (filtros.cargoId) itens = itens.filter((m) => m.cargoId === filtros.cargoId);
    if (filtros.situacao) itens = itens.filter((m) => m.situacao === filtros.situacao);
    if (filtros.nivelMinimo) itens = itens.filter((m) => m.nivel >= Number(filtros.nivelMinimo));
    return itens.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto, 'pt-BR'));
  }, [base.membros, termo, filtros]);

  const totalPaginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
  const paginados = lista.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);
  const filtrosAtivos = Object.values(filtros).filter(Boolean).length;

  if (!tem('membros.visualizar')) return <SemAcesso modulo="o cadastro de membros" />;

  const podeEditar = (alvo: Membro) => pode('membros.editar', { nucleoId: alvo.nucleoId, membroId: alvo.id });

  const alterarSituacao = (alvo: Membro, situacao: SituacaoMembresia) => {
    if (!autor) return;
    atualizar((b) => ({
      ...b,
      membros: b.membros.map((m) => (m.id === alvo.id ? { ...m, situacao } : m)),
    }));
    auditar({
      membroId: autor.id,
      acao: situacao === 'suspenso' ? 'Suspendeu membro' : 'Reativou membro',
      modulo: 'Secretaria',
      detalhe: `${alvo.nomeCompleto} (${alvo.numeroMembro}) → ${ROTULO_SITUACAO[situacao]}.`,
    });
    avisar('sucesso', 'Situação alterada', `${alvo.nomeExibicao}: ${ROTULO_SITUACAO[situacao]}`);
  };

  const exportar = () => {
    if (!autor) return;
    const cabecalho = ['Registro', 'Nome', 'Núcleo', 'Situação', 'Nível', 'XP', 'Ingresso'];
    const linhas = lista.map((m) => [
      m.numeroMembro,
      m.nomeCompleto,
      nucleoPorId(base, m.nucleoId)?.nome ?? '',
      ROTULO_SITUACAO[m.situacao],
      String(m.nivel),
      String(m.xp),
      formatarData(m.dataIngresso),
    ]);
    const csv = [cabecalho, ...linhas].map((l) => l.map((c) => `"${c}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'membros-a-ordem.csv';
    link.click();
    URL.revokeObjectURL(url);
    auditar({
      membroId: autor.id,
      acao: 'Exportou dados',
      modulo: 'Secretaria',
      detalhe: `${lista.length} registros exportados em CSV.`,
    });
    avisar('sucesso', 'Exportação concluída', `${lista.length} registros.`);
  };

  const colunas: Coluna<Membro>[] = [
    {
      chave: 'membro',
      titulo: 'Membro',
      larguraMinima: '15rem',
      renderizar: (m) => (
        <div className="flex items-center gap-2.5">
          <Avatar nome={m.nomeCompleto} fotoUrl={m.fotoUrl} tamanho="sm" nivel={m.nivel} />
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">{m.nomeCompleto}</p>
            <p className="truncate text-xs text-ink-faint">
              {m.numeroMembro} · @{m.usuario}
            </p>
          </div>
        </div>
      ),
    },
    {
      chave: 'nucleo',
      titulo: 'Núcleo',
      renderizar: (m) => (
        <span className="text-ink-soft">{nucleoPorId(base, m.nucleoId)?.nome.replace('Núcleo ', '') ?? '—'}</span>
      ),
    },
    {
      chave: 'local',
      titulo: 'Localidade',
      secundaria: true,
      renderizar: (m) => <span className="text-ink-soft">{localidade(base, m).split(' · ').slice(0, 2).join(' · ')}</span>,
    },
    {
      chave: 'cargo',
      titulo: 'Cargo',
      secundaria: true,
      renderizar: (m) => <span className="text-ink-soft">{base.cargos.find((c) => c.id === m.cargoId)?.nome}</span>,
    },
    {
      chave: 'xp',
      titulo: 'XP',
      alinhamento: 'direita',
      secundaria: true,
      renderizar: (m) => <span className="font-semibold tabular-nums text-ink">{numero(m.xp)}</span>,
    },
    {
      chave: 'situacao',
      titulo: 'Situação',
      renderizar: (m) => (
        <Selo tom={TOM_SITUACAO[m.situacao]} rotulo>
          {ROTULO_SITUACAO[m.situacao]}
        </Selo>
      ),
    },
    {
      chave: 'acoes',
      titulo: 'Ações',
      alinhamento: 'direita',
      renderizar: (m) => (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navegar(`/membros/${m.id}`);
            }}
            aria-label={`Ver perfil de ${m.nomeCompleto}`}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-faint transition hover:bg-surface-muted hover:text-ink"
          >
            <Icone nome="visibility" className="text-[18px]" />
          </button>
          {podeEditar(m) && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setEmEdicao(m);
              }}
              aria-label={`Editar ${m.nomeCompleto}`}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-faint transition hover:bg-surface-muted hover:text-ink"
            >
              <Icone nome="edit" className="text-[18px]" />
            </button>
          )}
          {tem('membros.suspender') && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmacao({ membro: m, acao: m.situacao === 'suspenso' ? 'reativar' : 'suspender' });
              }}
              aria-label={m.situacao === 'suspenso' ? `Reativar ${m.nomeCompleto}` : `Suspender ${m.nomeCompleto}`}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-faint transition hover:bg-surface-muted hover:text-critico"
            >
              <Icone nome={m.situacao === 'suspenso' ? 'lock_open' : 'block'} className="text-[18px]" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Cadastro de membros"
        descricao="Consulta, manutenção e movimentação do quadro de membros da Ordem."
        acao={
          <>
            {tem('membros.exportar') && (
              <Botao variante="contorno" icone="download" onClick={exportar}>
                Exportar
              </Botao>
            )}
            {tem('membros.criar') && (
              <Botao icone="person_add" onClick={() => setCriando(true)}>
                Novo membro
              </Botao>
            )}
          </>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <CampoBusca
          valor={termo}
          aoMudar={(v) => {
            setTermo(v);
            setPagina(1);
          }}
          placeholder="Buscar por nome, registro, usuário ou e-mail…"
          className="flex-1"
        />
        <Botao
          variante="contorno"
          icone="filter_alt"
          onClick={() => setFiltrosVisiveis((v) => !v)}
          aria-expanded={filtrosVisiveis}
        >
          Filtros{filtrosAtivos > 0 && ` (${filtrosAtivos})`}
        </Botao>
      </div>

      {filtrosVisiveis && (
        <Cartao>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Selecao
              rotulo="País"
              value={filtros.paisId}
              onChange={(e) => setFiltros({ ...filtros, paisId: e.target.value, estadoId: '', municipioId: '' })}
            >
              <option value="">Todos</option>
              {base.paises.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </Selecao>
            <Selecao
              rotulo="Estado"
              value={filtros.estadoId}
              onChange={(e) => setFiltros({ ...filtros, estadoId: e.target.value, municipioId: '' })}
            >
              <option value="">Todos</option>
              {base.estados
                .filter((e) => !filtros.paisId || e.paisId === filtros.paisId)
                .map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nome}
                  </option>
                ))}
            </Selecao>
            <Selecao
              rotulo="Município"
              value={filtros.municipioId}
              onChange={(e) => setFiltros({ ...filtros, municipioId: e.target.value })}
            >
              <option value="">Todos</option>
              {base.municipios
                .filter((m) => !filtros.estadoId || m.estadoId === filtros.estadoId)
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
            </Selecao>
            <Selecao
              rotulo="Núcleo"
              value={filtros.nucleoId}
              onChange={(e) => setFiltros({ ...filtros, nucleoId: e.target.value })}
            >
              <option value="">Todos</option>
              {base.nucleos.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.nome}
                </option>
              ))}
            </Selecao>
            <Selecao
              rotulo="Cargo"
              value={filtros.cargoId}
              onChange={(e) => setFiltros({ ...filtros, cargoId: e.target.value })}
            >
              <option value="">Todos</option>
              {base.cargos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </Selecao>
            <Selecao
              rotulo="Situação"
              value={filtros.situacao}
              onChange={(e) => setFiltros({ ...filtros, situacao: e.target.value })}
            >
              <option value="">Todas</option>
              {(Object.keys(ROTULO_SITUACAO) as SituacaoMembresia[]).map((s) => (
                <option key={s} value={s}>
                  {ROTULO_SITUACAO[s]}
                </option>
              ))}
            </Selecao>
            <Selecao
              rotulo="Nível mínimo"
              value={filtros.nivelMinimo}
              onChange={(e) => setFiltros({ ...filtros, nivelMinimo: e.target.value })}
            >
              <option value="">Qualquer</option>
              {base.niveis.map((n) => (
                <option key={n.numero} value={n.numero}>
                  {n.numero} — {n.titulo}
                </option>
              ))}
            </Selecao>
            <div className="flex items-end">
              <Botao variante="sutil" icone="filter_alt_off" onClick={() => setFiltros(FILTROS_VAZIOS)} larguraTotal>
                Limpar filtros
              </Botao>
            </div>
          </div>
        </Cartao>
      )}

      <p className="text-sm text-ink-faint">
        {lista.length} {lista.length === 1 ? 'registro encontrado' : 'registros encontrados'}
      </p>

      <Tabela
        legenda="Quadro de membros da Ordem"
        colunas={colunas}
        itens={paginados}
        chaveDe={(m) => m.id}
        vazio={
          <Cartao>
            <Vazio icone="person_search" titulo="Nenhum membro encontrado" descricao="Ajuste a busca ou os filtros." />
          </Cartao>
        }
        cartaoMobile={(m) => (
          <div className="rounded-card border border-line bg-surface-card p-4">
            <div className="flex items-center gap-3">
              <Avatar nome={m.nomeCompleto} tamanho="md" nivel={m.nivel} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-ink">{m.nomeCompleto}</p>
                <p className="truncate text-xs text-ink-faint">
                  {m.numeroMembro} · {nucleoPorId(base, m.nucleoId)?.nome.replace('Núcleo ', '') ?? '—'}
                </p>
              </div>
              <Selo tom={TOM_SITUACAO[m.situacao]} rotulo>
                {ROTULO_SITUACAO[m.situacao]}
              </Selo>
            </div>
            <div className="mt-3 flex gap-2 border-t border-line pt-3">
              <Botao tamanho="pequeno" variante="contorno" icone="visibility" onClick={() => navegar(`/membros/${m.id}`)}>
                Perfil
              </Botao>
              {podeEditar(m) && (
                <Botao tamanho="pequeno" variante="contorno" icone="edit" onClick={() => setEmEdicao(m)}>
                  Editar
                </Botao>
              )}
            </div>
          </div>
        )}
      />

      <Paginacao pagina={pagina} totalPaginas={totalPaginas} aoMudar={setPagina} totalItens={lista.length} />

      {emEdicao && <ModalEdicao membro={emEdicao} aoFechar={() => setEmEdicao(null)} />}
      {criando && <ModalNovoMembro aoFechar={() => setCriando(false)} />}

      <Confirmacao
        aberto={Boolean(confirmacao)}
        aoFechar={() => setConfirmacao(null)}
        aoConfirmar={() =>
          confirmacao &&
          alterarSituacao(confirmacao.membro, confirmacao.acao === 'suspender' ? 'suspenso' : 'ativo')
        }
        titulo={confirmacao?.acao === 'suspender' ? 'Suspender membro?' : 'Reativar membro?'}
        mensagem={
          confirmacao?.acao === 'suspender'
            ? `${confirmacao.membro.nomeCompleto} perderá o acesso à plataforma até nova deliberação. A ação será registrada na auditoria.`
            : `${confirmacao?.membro.nomeCompleto ?? ''} voltará a ter acesso pleno à plataforma.`
        }
        rotuloConfirmar={confirmacao?.acao === 'suspender' ? 'Suspender' : 'Reativar'}
        perigo={confirmacao?.acao === 'suspender'}
      />
    </div>
  );
}

function ModalEdicao({ membro, aoFechar }: { membro: Membro; aoFechar: () => void }) {
  const { base, atualizar, auditar } = useDados();
  const { membro: autor } = useAuth();
  const { avisar } = useAviso();

  const [nucleoId, setNucleoId] = useState(membro.nucleoId ?? '');
  const [cargoId, setCargoId] = useState(membro.cargoId);
  const [situacao, setSituacao] = useState<SituacaoMembresia>(membro.situacao);
  const [observacoes, setObservacoes] = useState(membro.observacoesAdministrativas ?? '');

  const cargosPermitidos = base.cargos.filter((c) => podeAtribuirCargo(base.cargos, autor, c.id));

  const salvar = () => {
    if (!autor) return;
    const mudancas: string[] = [];
    if (nucleoId !== (membro.nucleoId ?? '')) mudancas.push('Núcleo');
    if (cargoId !== membro.cargoId) mudancas.push('cargo');
    if (situacao !== membro.situacao) mudancas.push('situação');

    atualizar((b) => ({
      ...b,
      membros: b.membros.map((m) =>
        m.id === membro.id
          ? {
              ...m,
              nucleoId: nucleoId || null,
              cargoId,
              situacao,
              observacoesAdministrativas: observacoes.trim() || undefined,
            }
          : m,
      ),
    }));
    auditar({
      membroId: autor.id,
      acao: 'Editou membro',
      modulo: 'Secretaria',
      detalhe: `${membro.nomeCompleto} (${membro.numeroMembro}) — alterações: ${mudancas.join(', ') || 'observações'}.`,
    });
    avisar('sucesso', 'Registro atualizado', membro.nomeCompleto);
    aoFechar();
  };

  return (
    <Modal
      aberto
      aoFechar={aoFechar}
      titulo={`Editar ${membro.nomeExibicao}`}
      descricao={`Registro ${membro.numeroMembro}. Toda alteração é registrada na auditoria.`}
      rodape={
        <>
          <Botao variante="contorno" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao icone="save" onClick={salvar}>
            Salvar alterações
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <Selecao rotulo="Núcleo de vínculo" value={nucleoId} onChange={(e) => setNucleoId(e.target.value)}>
          <option value="">Sem vínculo</option>
          {base.nucleos.map((n) => (
            <option key={n.id} value={n.id}>
              {n.nome}
            </option>
          ))}
        </Selecao>
        <Selecao
          rotulo="Cargo"
          value={cargoId}
          onChange={(e) => setCargoId(e.target.value)}
          dica="Só é possível atribuir cargos de precedência igual ou inferior à sua."
        >
          {cargosPermitidos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </Selecao>
        <Selecao
          rotulo="Situação da membresia"
          value={situacao}
          onChange={(e) => setSituacao(e.target.value as SituacaoMembresia)}
        >
          {(Object.keys(ROTULO_SITUACAO) as SituacaoMembresia[]).map((s) => (
            <option key={s} value={s}>
              {ROTULO_SITUACAO[s]}
            </option>
          ))}
        </Selecao>
        <AreaTexto
          rotulo="Observações administrativas"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          dica="Visível apenas à Secretaria e à Administração."
        />
      </div>
    </Modal>
  );
}

function ModalNovoMembro({ aoFechar }: { aoFechar: () => void }) {
  const { base, atualizar, auditar } = useDados();
  const { membro: autor } = useAuth();
  const { avisar } = useAviso();

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nucleoId, setNucleoId] = useState(base.nucleos[0]?.id ?? '');
  const [erros, setErros] = useState<Record<string, string>>({});

  const criar = () => {
    const e: Record<string, string> = {};
    if (nomeCompleto.trim().split(/\s+/).length < 2) e.nomeCompleto = 'Informe o nome completo.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Informe um e-mail válido.';
    if (base.membros.some((m) => m.email.toLowerCase() === email.trim().toLowerCase()))
      e.email = 'Já existe cadastro com este e-mail.';
    setErros(e);
    if (Object.keys(e).length > 0 || !autor) return;

    const nucleo = base.nucleos.find((n) => n.id === nucleoId);
    const partes = nomeCompleto.trim().toLowerCase().split(/\s+/);
    const id = `me-${Math.random().toString(36).slice(2, 9)}`;
    const novo: Membro = {
      id,
      numeroMembro: `AO-${30000 + base.membros.length * 17}`,
      nomeCompleto: nomeCompleto.trim(),
      nomeExibicao: nomeCompleto.trim().split(/\s+/).slice(0, 2).join(' '),
      usuario: `${partes[0]}${partes[partes.length - 1]}`.replace(/[^a-z0-9]/g, ''),
      email: email.trim().toLowerCase(),
      telefone,
      sexo: 'nao_informado',
      dataNascimento: new Date(1990, 0, 1).toISOString(),
      endereco: {
        logradouro: '',
        numero: '',
        bairro: '',
        cep: '',
        municipioId: nucleo?.municipioId ?? '',
        estadoId: nucleo?.estadoId ?? '',
        paisId: nucleo?.paisId ?? 'pa-br',
      },
      paisId: nucleo?.paisId ?? 'pa-br',
      estadoId: nucleo?.estadoId ?? '',
      municipioId: nucleo?.municipioId ?? '',
      nucleoId: nucleoId || null,
      cargoId: 'cargo-membro',
      situacao: 'ativo',
      dataIngresso: new Date().toISOString(),
      interessesFilosoficos: [],
      areasAtuacao: [],
      xp: 0,
      nivel: 1,
      sequenciaDias: 0,
      aliados: [],
      conquistas: [],
      privacidade: {
        email: 'administracao',
        telefone: 'nucleo',
        endereco: 'administracao',
        dataNascimento: 'nucleo',
        perfil: 'publico',
        publicacoes: 'publico',
      },
      autenticacaoDoisFatores: false,
    };

    atualizar((b) => ({ ...b, membros: [...b.membros, novo] }));
    auditar({
      membroId: autor.id,
      acao: 'Cadastrou membro',
      modulo: 'Secretaria',
      detalhe: `${novo.nomeCompleto} (${novo.numeroMembro}) cadastrado diretamente pela Secretaria.`,
    });
    avisar('sucesso', 'Membro cadastrado', `${novo.nomeCompleto} — ${novo.numeroMembro}`);
    aoFechar();
  };

  return (
    <Modal
      aberto
      aoFechar={aoFechar}
      titulo="Novo membro"
      descricao="Cadastro direto pela Secretaria, com filiação já ativa."
      rodape={
        <>
          <Botao variante="contorno" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao icone="person_add" onClick={criar}>
            Cadastrar
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <Campo
          rotulo="Nome completo"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          erro={erros.nomeCompleto}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo rotulo="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} erro={erros.email} required />
          <Campo rotulo="Telefone" type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <Selecao rotulo="Núcleo" value={nucleoId} onChange={(e) => setNucleoId(e.target.value)}>
          <option value="">Sem vínculo</option>
          {base.nucleos.map((n) => (
            <option key={n.id} value={n.id}>
              {n.nome}
            </option>
          ))}
        </Selecao>
        <p className="flex items-start gap-2 rounded-2xl bg-surface-muted p-3 text-xs text-ink-faint">
          <Icone nome="info" className="mt-px shrink-0 text-[16px]" />
          O membro receberá por e-mail as instruções para definição da senha de acesso.
        </p>
      </div>
    </Modal>
  );
}
