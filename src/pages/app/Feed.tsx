import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { publicacoesOrdenadas } from '@/lib/consultas';
import { contem } from '@/lib/formato';
import type { CategoriaPublicacao, Publicacao } from '@/types';
import { CartaoPublicacao, ROTULO_CATEGORIA } from '@/components/domain/CartaoPublicacao';
import {
  Abas,
  AreaTexto,
  Avatar,
  Botao,
  Campo,
  CampoBusca,
  Cartao,
  EsqueletoCartao,
  Icone,
  Modal,
  Selecao,
  Vazio,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

type Filtro = 'destaques' | 'recentes' | 'salvos' | CategoriaPublicacao;

const FILTROS: { id: Filtro; rotulo: string; icone?: string }[] = [
  { id: 'destaques', rotulo: 'Destaques', icone: 'star' },
  { id: 'recentes', rotulo: 'Recentes' },
  { id: 'comunicado', rotulo: 'Comunicados' },
  { id: 'formacao', rotulo: 'Formação' },
  { id: 'evento', rotulo: 'Eventos' },
  { id: 'nucleo', rotulo: 'Núcleos' },
  { id: 'noticia', rotulo: 'Notícias' },
  { id: 'membro', rotulo: 'Dos membros' },
  { id: 'salvos', rotulo: 'Salvos', icone: 'bookmark' },
];

export function Feed() {
  const { base, atualizar, auditar, carregando } = useDados();
  const { membro, tem } = useAuth();
  const { avisar } = useAviso();

  const [filtro, setFiltro] = useState<Filtro>('destaques');
  const [termo, setTermo] = useState('');
  const [compondo, setCompondo] = useState(false);

  const publicacoes = useMemo(() => {
    let lista = publicacoesOrdenadas(base);
    if (filtro === 'destaques') lista = lista.filter((p) => p.destaque || p.fixado || p.oficial);
    else if (filtro === 'salvos') lista = lista.filter((p) => membro && p.salvoPor.includes(membro.id));
    else if (filtro !== 'recentes') lista = lista.filter((p) => p.categoria === filtro);
    if (termo) {
      lista = lista.filter(
        (p) => contem(p.conteudo, termo) || contem(p.titulo ?? '', termo) || contem(p.emitidoPor ?? '', termo),
      );
    }
    return lista;
  }, [base, filtro, termo, membro]);

  const contagens = useMemo(() => {
    const mapa: Partial<Record<Filtro, number>> = {
      destaques: base.publicacoes.filter((p) => p.destaque || p.fixado || p.oficial).length,
      recentes: base.publicacoes.length,
      salvos: membro ? base.publicacoes.filter((p) => p.salvoPor.includes(membro.id)).length : 0,
    };
    for (const c of ['comunicado', 'formacao', 'evento', 'nucleo', 'noticia', 'membro'] as const) {
      mapa[c] = base.publicacoes.filter((p) => p.categoria === c).length;
    }
    return mapa;
  }, [base.publicacoes, membro]);

  const publicar = (nova: Omit<Publicacao, 'id' | 'criadoEm' | 'curtidas' | 'salvoPor' | 'compartilhamentos'>) => {
    if (!membro) return;
    const id = `pu-${Math.random().toString(36).slice(2, 9)}`;
    atualizar((b) => ({
      ...b,
      publicacoes: [
        { ...nova, id, criadoEm: new Date().toISOString(), curtidas: [], salvoPor: [], compartilhamentos: 0 },
        ...b.publicacoes,
      ],
    }));
    auditar({
      membroId: membro.id,
      acao: nova.oficial ? 'Publicou comunicado' : 'Publicou no feed',
      modulo: 'Feed',
      detalhe: nova.titulo ?? nova.conteudo.slice(0, 80),
    });
    avisar('sucesso', 'Publicado', 'Sua publicação já está disponível no feed.');
    setCompondo(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <CabecalhoPagina
        titulo="Feed"
        descricao="Comunicados oficiais, formação e a produção dos Núcleos e membros da Ordem."
        acao={
          tem('publicacoes.criar') && (
            <Botao icone="edit_square" onClick={() => setCompondo(true)}>
              Publicar
            </Botao>
          )
        }
      />

      <CampoBusca valor={termo} aoMudar={setTermo} placeholder="Pesquisar no feed…" />

      <Abas
        itens={FILTROS.map((f) => ({ id: f.id, rotulo: f.rotulo, icone: f.icone, contagem: contagens[f.id] }))}
        ativo={filtro}
        aoMudar={setFiltro}
        rotuloGrupo="Categorias do feed"
      />

      <div className="space-y-3">
        {carregando ? (
          <>
            <EsqueletoCartao />
            <EsqueletoCartao />
          </>
        ) : publicacoes.length === 0 ? (
          <Cartao>
            <Vazio
              icone="feed"
              titulo="Nenhuma publicação encontrada"
              descricao={
                termo
                  ? `Não há resultados para “${termo}” nesta categoria.`
                  : 'Ainda não há conteúdo publicado nesta categoria.'
              }
            />
          </Cartao>
        ) : (
          publicacoes.map((p) => <CartaoPublicacao key={p.id} publicacao={p} />)
        )}
      </div>

      {membro && (
        <ModalPublicacao
          aberto={compondo}
          aoFechar={() => setCompondo(false)}
          aoPublicar={publicar}
          podeOficial={tem('publicacoes.publicarOficial')}
          nomeMembro={membro.nomeCompleto}
          membroId={membro.id}
          nucleoId={membro.nucleoId}
        />
      )}
    </div>
  );
}

function ModalPublicacao({
  aberto,
  aoFechar,
  aoPublicar,
  podeOficial,
  nomeMembro,
  membroId,
  nucleoId,
}: {
  aberto: boolean;
  aoFechar: () => void;
  aoPublicar: (p: Omit<Publicacao, 'id' | 'criadoEm' | 'curtidas' | 'salvoPor' | 'compartilhamentos'>) => void;
  podeOficial: boolean;
  nomeMembro: string;
  membroId: string;
  nucleoId: string | null;
}) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoria, setCategoria] = useState<CategoriaPublicacao>('membro');
  const [oficial, setOficial] = useState(false);
  const [orgao, setOrgao] = useState('Secretaria-Geral');
  const [erro, setErro] = useState('');

  const enviar = () => {
    if (conteudo.trim().length < 10) {
      setErro('O conteúdo deve ter ao menos 10 caracteres.');
      return;
    }
    aoPublicar({
      autorId: membroId,
      oficial,
      emitidoPor: oficial ? orgao : undefined,
      categoria,
      nucleoId: categoria === 'nucleo' ? nucleoId : null,
      titulo: titulo.trim() || undefined,
      conteudo: conteudo.trim(),
      anexos: [],
      fixado: false,
      destaque: oficial,
      visibilidade: 'publico',
    });
    setTitulo('');
    setConteudo('');
    setErro('');
  };

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo="Nova publicação"
      descricao="O conteúdo publicado segue o Código de Conduta da Ordem."
      largura="md"
      rodape={
        <>
          <Botao variante="contorno" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao icone="send" onClick={enviar}>
            Publicar
          </Botao>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar nome={nomeMembro} />
          <div>
            <p className="font-bold text-ink">{oficial ? orgao : nomeMembro}</p>
            <p className="text-xs text-ink-faint">
              {oficial ? 'Comunicado oficial' : 'Publicação de membro'}
            </p>
          </div>
        </div>

        {erro && (
          <p role="alert" className="flex items-center gap-2 rounded-xl bg-critico/10 p-3 text-sm font-medium text-critico">
            <Icone nome="error" className="text-[17px]" />
            {erro}
          </p>
        )}

        <Campo rotulo="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} dica="Opcional." />
        <AreaTexto
          rotulo="Conteúdo"
          value={conteudo}
          onChange={(e) => {
            setConteudo(e.target.value);
            setErro('');
          }}
          placeholder="Escreva o conteúdo da publicação…"
          required
        />
        <Selecao
          rotulo="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value as CategoriaPublicacao)}
        >
          {Object.entries(ROTULO_CATEGORIA).map(([chave, rotulo]) => (
            <option key={chave} value={chave}>
              {rotulo}
            </option>
          ))}
        </Selecao>

        {podeOficial && (
          <div className="rounded-2xl border border-line bg-surface-muted/60 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={oficial}
                onChange={(e) => setOficial(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-line-strong text-ouro focus:ring-ouro/40"
              />
              <span>
                <span className="block text-sm font-bold text-ink">Emitir como comunicado oficial</span>
                <span className="block text-xs text-ink-soft">
                  A publicação será atribuída a um órgão da Ordem e ganhará destaque no feed.
                </span>
              </span>
            </label>
            {oficial && (
              <Selecao
                rotulo="Órgão emissor"
                className="mt-3"
                value={orgao}
                onChange={(e) => setOrgao(e.target.value)}
              >
                {['Presidência', 'Secretaria-Geral', 'Tesouraria', 'Direção Nacional', 'Coordenação de Formação'].map(
                  (o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ),
                )}
              </Selecao>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
