import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDados } from '@/context/DadosContext';
import { contem } from '@/lib/formato';
import { Icone, Modal } from '@/components/ui';
import { NAV_ADMINISTRATIVA, NAV_PRINCIPAL } from './navegacao';
import { useAuth } from '@/context/AuthContext';

interface Resultado {
  id: string;
  titulo: string;
  contexto: string;
  icone: string;
  destino: string;
  grupo: string;
}

/** Busca unificada sobre membros, Nucleos, documentos, eventos, propostas e paginas. */
export function BuscaGlobal({ aberta, aoFechar }: { aberta: boolean; aoFechar: () => void }) {
  const { base } = useDados();
  const { temAlguma } = useAuth();
  const navegar = useNavigate();
  const [termo, setTermo] = useState('');

  useEffect(() => {
    if (!aberta) setTermo('');
  }, [aberta]);

  const resultados = useMemo<Resultado[]>(() => {
    if (termo.trim().length < 2) return [];
    const saida: Resultado[] = [];

    for (const m of base.membros) {
      if (contem(m.nomeCompleto, termo) || contem(m.usuario, termo) || contem(m.numeroMembro, termo)) {
        saida.push({
          id: `me-${m.id}`,
          titulo: m.nomeCompleto,
          contexto: `${m.numeroMembro} · @${m.usuario}`,
          icone: 'person',
          destino: `/membros/${m.id}`,
          grupo: 'Membros',
        });
      }
    }
    for (const n of base.nucleos) {
      if (contem(n.nome, termo) || contem(n.codigo, termo)) {
        saida.push({
          id: `nu-${n.id}`,
          titulo: n.nome,
          contexto: n.codigo,
          icone: 'hub',
          destino: `/nucleos/${n.id}`,
          grupo: 'Núcleos',
        });
      }
    }
    for (const d of base.documentos) {
      if (contem(d.titulo, termo) || contem(d.descricao, termo)) {
        saida.push({
          id: `do-${d.id}`,
          titulo: d.titulo,
          contexto: `Versão ${d.versaoAtual}`,
          icone: 'description',
          destino: '/documentos',
          grupo: 'Documentos',
        });
      }
    }
    for (const e of base.eventos) {
      if (contem(e.titulo, termo)) {
        saida.push({
          id: `ev-${e.id}`,
          titulo: e.titulo,
          contexto: e.local,
          icone: 'event',
          destino: `/eventos/${e.id}`,
          grupo: 'Eventos',
        });
      }
    }
    for (const p of base.propostas) {
      if (contem(p.titulo, termo) || contem(p.resumo, termo)) {
        saida.push({
          id: `pp-${p.id}`,
          titulo: p.titulo,
          contexto: p.categoria,
          icone: 'gavel',
          destino: `/propostas/${p.id}`,
          grupo: 'Propostas',
        });
      }
    }
    const paginas = [...NAV_PRINCIPAL, ...NAV_ADMINISTRATIVA.itens.filter((i) => !i.permissoes || temAlguma(i.permissoes))];
    for (const pag of paginas) {
      if (contem(pag.rotulo, termo)) {
        saida.push({
          id: `pg-${pag.para}`,
          titulo: pag.rotulo,
          contexto: 'Ir para a página',
          icone: pag.icone,
          destino: pag.para,
          grupo: 'Navegação',
        });
      }
    }
    return saida.slice(0, 24);
  }, [base, termo, temAlguma]);

  const grupos = useMemo(() => {
    const mapa = new Map<string, Resultado[]>();
    for (const r of resultados) {
      mapa.set(r.grupo, [...(mapa.get(r.grupo) ?? []), r]);
    }
    return [...mapa.entries()];
  }, [resultados]);

  return (
    <Modal aberto={aberta} aoFechar={aoFechar} titulo="Busca global" largura="md">
      <div className="relative">
        <Icone
          nome="search"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-ink-faint"
        />
        <input
          autoFocus
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Buscar membros, Núcleos, documentos, eventos…"
          aria-label="Buscar na plataforma"
          className="h-12 w-full rounded-2xl border border-line-strong bg-surface-card pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-ouro focus:outline-none focus:ring-2 focus:ring-ouro/30"
        />
      </div>

      {termo.trim().length < 2 ? (
        <p className="py-8 text-center text-sm text-ink-faint">
          Digite ao menos dois caracteres para pesquisar.
        </p>
      ) : resultados.length === 0 ? (
        <p className="py-8 text-center text-sm text-ink-faint">
          Nenhum resultado para “{termo}”.
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          {grupos.map(([grupo, itens]) => (
            <div key={grupo}>
              <p className="rotulo px-1 pb-1.5">{grupo}</p>
              <ul className="space-y-1">
                {itens.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => {
                        navegar(r.destino);
                        aoFechar();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-surface-muted"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-muted text-ink-soft">
                        <Icone nome={r.icone} className="text-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">{r.titulo}</span>
                        <span className="block truncate text-xs text-ink-faint">{r.contexto}</span>
                      </span>
                      <Icone nome="arrow_forward" className="shrink-0 text-[17px] text-ink-faint" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
