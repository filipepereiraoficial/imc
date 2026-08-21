import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { membroPorId } from '@/lib/consultas';
import { contem, dataHora } from '@/lib/formato';
import type { RegistroAuditoria } from '@/types';
import {
  Avatar,
  Cartao,
  CampoBusca,
  Icone,
  Paginacao,
  Selecao,
  Selo,
  SemAcesso,
  Tabela,
  Vazio,
} from '@/components/ui';
import type { Coluna } from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const POR_PAGINA = 20;

export function Auditoria() {
  const { base } = useDados();
  const { tem } = useAuth();
  const [termo, setTermo] = useState('');
  const [modulo, setModulo] = useState('todos');
  const [pagina, setPagina] = useState(1);

  const modulos = useMemo(() => [...new Set(base.auditoria.map((a) => a.modulo))].sort(), [base.auditoria]);

  const lista = useMemo(() => {
    let itens = [...base.auditoria].sort((a, b) => new Date(b.em).getTime() - new Date(a.em).getTime());
    if (modulo !== 'todos') itens = itens.filter((a) => a.modulo === modulo);
    if (termo) {
      itens = itens.filter((a) => {
        const autor = membroPorId(base, a.membroId);
        return (
          contem(a.acao, termo) ||
          contem(a.detalhe, termo) ||
          contem(autor?.nomeCompleto ?? '', termo)
        );
      });
    }
    return itens;
  }, [base, termo, modulo]);

  const totalPaginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
  const paginados = lista.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  if (!tem('auditoria.visualizar')) return <SemAcesso modulo="a trilha de auditoria" />;

  const colunas: Coluna<RegistroAuditoria>[] = [
    {
      chave: 'em',
      titulo: 'Data e hora',
      renderizar: (a) => <span className="whitespace-nowrap tabular-nums text-ink-soft">{dataHora(a.em)}</span>,
    },
    {
      chave: 'membro',
      titulo: 'Usuário',
      renderizar: (a) => {
        const autor = membroPorId(base, a.membroId);
        return (
          <div className="flex items-center gap-2.5">
            <Avatar nome={autor?.nomeCompleto ?? 'Sistema'} tamanho="xs" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{autor?.nomeExibicao ?? 'Sistema'}</p>
              <p className="truncate text-xs text-ink-faint">{autor?.numeroMembro ?? '—'}</p>
            </div>
          </div>
        );
      },
    },
    { chave: 'acao', titulo: 'Ação', renderizar: (a) => <span className="font-semibold text-ink">{a.acao}</span> },
    {
      chave: 'modulo',
      titulo: 'Módulo',
      renderizar: (a) => <Selo tom="neutro">{a.modulo}</Selo>,
    },
    {
      chave: 'detalhe',
      titulo: 'Alteração realizada',
      larguraMinima: '20rem',
      secundaria: true,
      renderizar: (a) => <span className="text-ink-soft">{a.detalhe}</span>,
    },
    {
      chave: 'ip',
      titulo: 'Origem',
      secundaria: true,
      alinhamento: 'direita',
      renderizar: (a) => <span className="font-mono text-xs text-ink-faint">{a.ip}</span>,
    },
  ];

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Auditoria"
        descricao="Registro imutável das ações administrativas: quem fez, o quê, quando e em qual módulo."
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <CampoBusca
          valor={termo}
          aoMudar={(v) => {
            setTermo(v);
            setPagina(1);
          }}
          placeholder="Buscar por ação, detalhe ou responsável…"
          className="flex-1"
        />
        <Selecao
          rotulo=""
          aria-label="Filtrar por módulo"
          className="sm:w-52 [&_label]:sr-only"
          value={modulo}
          onChange={(e) => {
            setModulo(e.target.value);
            setPagina(1);
          }}
        >
          <option value="todos">Todos os módulos</option>
          {modulos.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Selecao>
      </div>

      <p className="flex items-center gap-2 text-sm text-ink-faint">
        <Icone nome="shield" className="text-[16px]" />
        <span>
          {lista.length} {lista.length === 1 ? 'registro' : 'registros'} na trilha de auditoria.
        </span>
      </p>

      <Tabela
        legenda="Trilha de auditoria"
        colunas={colunas}
        itens={paginados}
        chaveDe={(a) => a.id}
        vazio={
          <Cartao>
            <Vazio icone="policy" titulo="Nenhum registro" descricao="Ajuste o filtro ou o termo pesquisado." />
          </Cartao>
        }
        cartaoMobile={(a) => {
          const autor = membroPorId(base, a.membroId);
          return (
            <div className="rounded-card border border-line bg-surface-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold text-ink">{a.acao}</p>
                  <p className="truncate text-xs text-ink-faint">
                    {autor?.nomeExibicao ?? 'Sistema'} · {dataHora(a.em)}
                  </p>
                </div>
                <Selo tom="neutro">{a.modulo}</Selo>
              </div>
              <p className="mt-2 border-t border-line pt-2 text-sm text-ink-soft">{a.detalhe}</p>
            </div>
          );
        }}
      />

      <Paginacao pagina={pagina} totalPaginas={totalPaginas} aoMudar={setPagina} totalItens={lista.length} />
    </div>
  );
}
