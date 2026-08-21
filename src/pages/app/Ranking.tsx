import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { rankingDoAmbito } from '@/lib/consultas';
import type { AmbitoRanking } from '@/lib/consultas';
import { nomeEstado, nomeMunicipio, nomePais, nucleoPorId } from '@/lib/consultas';
import { numero } from '@/lib/formato';
import { ItemRanking } from '@/components/domain/Itens';
import { Abas, CampoBusca, Cartao, EsqueletoLista, Icone, Vazio } from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

export function Ranking() {
  const { base, carregando } = useDados();
  const { membro } = useAuth();
  const [ambito, setAmbito] = useState<AmbitoRanking>('global');
  const [termo, setTermo] = useState('');

  // A posicao e sempre a do ranking completo do ambito: filtrar por nome
  // nao pode renumerar os colocados.
  const completa = useMemo(() => rankingDoAmbito(base, ambito, membro), [base, ambito, membro]);
  const posicoes = useMemo(
    () => new Map(completa.map((m, i) => [m.id, i + 1])),
    [completa],
  );
  const lista = useMemo(
    () => rankingDoAmbito(base, ambito, membro, termo),
    [base, ambito, membro, termo],
  );

  const minhaPosicao = useMemo(() => {
    if (!membro) return null;
    const posicao = posicoes.get(membro.id);
    return posicao ? { posicao, total: completa.length } : null;
  }, [membro, posicoes, completa.length]);

  const descricaoAmbito = useMemo(() => {
    if (!membro) return '';
    switch (ambito) {
      case 'pais':
        return nomePais(base, membro.paisId);
      case 'estado':
        return nomeEstado(base, membro.estadoId);
      case 'municipio':
        return nomeMunicipio(base, membro.municipioId);
      case 'nucleo':
        return nucleoPorId(base, membro.nucleoId)?.nome ?? 'Sem Núcleo';
      default:
        return 'Todos os membros ativos da Ordem';
    }
  }, [ambito, base, membro]);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina
        titulo="Ranking de participação"
        descricao="Classificação por experiência acumulada em formação, presença e trabalho institucional."
      />

      <Abas
        itens={[
          { id: 'global', rotulo: 'Global', icone: 'public' },
          { id: 'pais', rotulo: 'País', icone: 'flag' },
          { id: 'estado', rotulo: 'Estado', icone: 'map' },
          { id: 'municipio', rotulo: 'Município', icone: 'location_city' },
          { id: 'nucleo', rotulo: 'Núcleo', icone: 'hub' },
        ]}
        ativo={ambito}
        aoMudar={(v) => setAmbito(v as AmbitoRanking)}
        rotuloGrupo="Âmbito do ranking"
      />

      <p className="flex items-center gap-1.5 text-sm text-ink-soft">
        <Icone nome="filter_alt" className="text-[16px] text-ink-faint" />
        <span>{descricaoAmbito}</span>
      </p>

      {minhaPosicao && (
        <Cartao destaque className="flex items-center gap-4 bg-ouro-wash">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink text-lg font-extrabold text-[rgb(245_197_24)]">
            {minhaPosicao.posicao}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-ink">Sua posição neste âmbito</p>
            <p className="text-xs text-ink-soft">
              {minhaPosicao.posicao}º entre {minhaPosicao.total} membros ·{' '}
              {numero(membro?.xp ?? 0)} XP
            </p>
          </div>
          <Icone nome="trending_up" className="text-[22px] text-[rgb(var(--c-gold-deep))]" />
        </Cartao>
      )}

      <CampoBusca valor={termo} aoMudar={setTermo} placeholder="Pesquisar membro pelo nome ou registro…" />

      {carregando ? (
        <EsqueletoLista linhas={6} />
      ) : lista.length === 0 ? (
        <Cartao>
          <Vazio
            icone="leaderboard"
            titulo="Nenhum membro encontrado"
            descricao="Ajuste o âmbito territorial ou o termo pesquisado."
          />
        </Cartao>
      ) : (
        <ol className="space-y-2">
          {lista.map((m) => (
            <li key={m.id}>
              <ItemRanking
                membro={m}
                posicao={posicoes.get(m.id) ?? 0}
                destacado={m.id === membro?.id}
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
