import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { cargoDe, membroPorId } from '@/lib/consultas';
import { documentoVisivel } from '@/lib/rbac';
import { contem, data as formatarData } from '@/lib/formato';
import type { CategoriaDocumento, Documento, NivelNormativo } from '@/types';

/**
 * Hierarquia normativa interna — Est. Art. 24. A ordem importa: o Art. 25
 * declara nula a parte da norma inferior que contrarie norma superior.
 */
const ROTULO_NIVEL: Record<NivelNormativo, string> = {
  estatuto: 'Estatuto Social',
  regimento_interno: 'Regimento Interno',
  resolucao_geral: 'Resolução Geral',
  ato_normativo_supremo: 'Ato Normativo Supremo',
  regulamento_geral_local: 'Regulamento Geral Local',
  resolucao_local: 'Resolução Local',
  ato_mestral_local: 'Ato Mestral Local',
  nao_normativo: 'Sem força normativa',
};

const ORDEM_NIVEL: Record<NivelNormativo, number> = {
  estatuto: 1,
  regimento_interno: 2,
  resolucao_geral: 3,
  ato_normativo_supremo: 4,
  regulamento_geral_local: 5,
  resolucao_local: 6,
  ato_mestral_local: 7,
  nao_normativo: 8,
};
import {
  Abas,
  Botao,
  Cartao,
  CampoBusca,
  Icone,
  Modal,
  Selo,
  Vazio,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const ROTULO_CATEGORIA: Record<CategoriaDocumento, string> = {
  estatuto: 'Estatuto',
  regimento: 'Regimentos',
  codigo: 'Códigos',
  codice: 'Códices',
  regulamento: 'Regulamentos',
  manual: 'Manuais',
  formacao: 'Formação',
  comunicado: 'Comunicados',
  administrativo: 'Administrativos',
  financeiro: 'Financeiros',
};

const ICONE_CATEGORIA: Record<CategoriaDocumento, string> = {
  estatuto: 'gavel',
  regimento: 'balance',
  codigo: 'menu_book',
  codice: 'auto_stories',
  regulamento: 'rule',
  manual: 'library_books',
  formacao: 'school',
  comunicado: 'campaign',
  administrativo: 'folder_managed',
  financeiro: 'account_balance',
};

export function Documentos() {
  const { base } = useDados();
  const { membro, tem } = useAuth();
  const { avisar } = useAviso();
  const [categoria, setCategoria] = useState<CategoriaDocumento | 'todos'>('todos');
  const [termo, setTermo] = useState('');
  const [detalhe, setDetalhe] = useState<Documento | null>(null);

  const cargo = cargoDe(base, membro);

  const acessiveis = useMemo(
    () => base.documentos.filter((d) => documentoVisivel(d.nivelAcesso, cargo)),
    [base.documentos, cargo],
  );

  const lista = useMemo(() => {
    let itens = acessiveis;
    if (categoria !== 'todos') itens = itens.filter((d) => d.categoria === categoria);
    if (termo) itens = itens.filter((d) => contem(d.titulo, termo) || contem(d.descricao, termo));
    // Norma superior vem antes: a biblioteca reflete a hierarquia do Art. 24.
    return [...itens].sort(
      (a, b) =>
        ORDEM_NIVEL[a.nivelNormativo] - ORDEM_NIVEL[b.nivelNormativo] ||
        new Date(b.atualizadoEm).getTime() - new Date(a.atualizadoEm).getTime(),
    );
  }, [acessiveis, categoria, termo]);

  const restritos = base.documentos.length - acessiveis.length;

  const categorias = useMemo(() => {
    const usadas = new Set(acessiveis.map((d) => d.categoria));
    return [...usadas];
  }, [acessiveis]);

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Documentos"
        descricao="Biblioteca institucional com controle de versões e de acesso por cargo."
        acao={
          tem('documentos.gerenciar') && (
            <Botao
              icone="upload_file"
              onClick={() => avisar('info', 'Publicação de documento', 'O envio exige o serviço de arquivos da Ordem.')}
            >
              Publicar documento
            </Botao>
          )
        }
      />

      <CampoBusca valor={termo} aoMudar={setTermo} placeholder="Buscar documento…" />

      <Abas
        itens={[
          { id: 'todos', rotulo: 'Todos', contagem: acessiveis.length },
          ...categorias.map((c) => ({
            id: c,
            rotulo: ROTULO_CATEGORIA[c],
            contagem: acessiveis.filter((d) => d.categoria === c).length,
          })),
        ]}
        ativo={categoria}
        aoMudar={(v) => setCategoria(v as CategoriaDocumento | 'todos')}
        rotuloGrupo="Categorias de documento"
      />

      {restritos > 0 && (
        <p className="flex items-center gap-2 rounded-2xl border border-line bg-surface-muted/60 p-3 text-xs text-ink-soft">
          <Icone nome="lock" className="shrink-0 text-[16px]" />
          <span>
            {restritos}{' '}
            {restritos === 1 ? 'documento não é acessível' : 'documentos não são acessíveis'} ao seu
            cargo atual ({cargo?.nome}).
          </span>
        </p>
      )}

      {lista.length === 0 ? (
        <Cartao>
          <Vazio icone="folder_off" titulo="Nenhum documento" descricao="Ajuste os filtros ou o termo pesquisado." />
        </Cartao>
      ) : (
        <div className="grid gap-3 [&>*]:min-w-0 md:grid-cols-2 xl:grid-cols-3">
          {lista.map((d) => {
            const responsavel = membroPorId(base, d.responsavelId);
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDetalhe(d)}
                className="flex flex-col gap-3 rounded-card border border-line bg-surface-card p-4 text-left shadow-suave transition hover:border-ouro/40 hover:shadow-elevado"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ouro-wash text-[rgb(var(--c-gold-deep))]">
                    <Icone nome={ICONE_CATEGORIA[d.categoria]} className="text-[21px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold leading-snug text-ink">{d.titulo}</p>
                    <p className="mt-0.5 text-xs text-ink-faint">{ROTULO_CATEGORIA[d.categoria]}</p>
                  </div>
                  {d.nivelAcesso.length > 0 && <Icone nome="lock" className="shrink-0 text-[16px] text-ink-faint" />}
                </div>
                <p className="line-clamp-2 text-sm text-ink-soft">{d.descricao}</p>
                {d.nivelNormativo !== 'nao_normativo' && (
                  <Selo tom="ouro" rotulo icone="gavel">
                    {ORDEM_NIVEL[d.nivelNormativo]}.º — {ROTULO_NIVEL[d.nivelNormativo]}
                  </Selo>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-3 text-xs text-ink-faint">
                  <Selo tom="neutro">{`v${d.versaoAtual}`}</Selo>
                  {d.reservado && (
                    <Selo tom="atencao" icone="shield">
                      Reservado
                    </Selo>
                  )}
                  <span>{formatarData(d.atualizadoEm)}</span>
                  <span className="ml-auto truncate">{responsavel?.nomeExibicao}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <ModalDocumento documento={detalhe} aoFechar={() => setDetalhe(null)} />
    </div>
  );
}

function ModalDocumento({ documento, aoFechar }: { documento: Documento | null; aoFechar: () => void }) {
  const { base } = useDados();
  const { avisar } = useAviso();
  if (!documento) return null;

  const versoes = base.versoesDocumento
    .filter((v) => v.documentoId === documento.id)
    .sort((a, b) => new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime());
  const responsavel = membroPorId(base, documento.responsavelId);

  return (
    <Modal
      aberto
      aoFechar={aoFechar}
      titulo={documento.titulo}
      descricao={ROTULO_CATEGORIA[documento.categoria]}
      rodape={
        <Botao
          icone="download"
          onClick={() => {
            avisar('sucesso', 'Acesso registrado', `${documento.titulo} v${documento.versaoAtual}`);
            aoFechar();
          }}
        >
          Abrir documento
        </Botao>
      }
    >
      <div className="space-y-5">
        <p className="text-sm leading-relaxed text-ink-soft">{documento.descricao}</p>

        {documento.nivelNormativo !== 'nao_normativo' && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-ouro/35 bg-ouro-wash p-3.5">
            <Icone nome="gavel" className="mt-px shrink-0 text-[17px] text-[rgb(var(--c-gold-deep))]" />
            <p className="text-xs leading-relaxed text-ink-soft">
              <strong className="text-ink">
                {ORDEM_NIVEL[documento.nivelNormativo]}.º nível —{' '}
                {ROTULO_NIVEL[documento.nivelNormativo]}
              </strong>{' '}
              na hierarquia normativa da Ordem (Est. Art. 24). Nenhuma norma inferior pode
              contrariá-la, sob pena de nulidade da parte conflitante (Art. 25).
            </p>
          </div>
        )}

        <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-surface-muted/50 p-4 text-sm">
          <div>
            <dt className="rotulo">Versão vigente</dt>
            <dd className="mt-1 font-bold text-ink">{documento.versaoAtual}</dd>
          </div>
          <div>
            <dt className="rotulo">Atualizado em</dt>
            <dd className="mt-1 font-bold text-ink">{formatarData(documento.atualizadoEm)}</dd>
          </div>
          <div>
            <dt className="rotulo">Responsável</dt>
            <dd className="mt-1 truncate font-bold text-ink">{responsavel?.nomeCompleto ?? '—'}</dd>
          </div>
          <div>
            <dt className="rotulo">Arquivo</dt>
            <dd className="mt-1 font-bold text-ink">{documento.tamanho}</dd>
          </div>
        </dl>

        <div>
          <p className="rotulo mb-2">Nível de acesso</p>
          {documento.nivelAcesso.length === 0 ? (
            <Selo tom="positivo" icone="lock_open">
              Aberto a todos os membros
            </Selo>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {documento.nivelAcesso.map((c) => (
                <Selo key={c} tom="atencao" icone="lock">
                  {base.cargos.find((x) => x.codigo === c)?.nome ?? c}
                </Selo>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="rotulo mb-2">Histórico de versões</p>
          <ol className="space-y-2">
            {versoes.map((v, i) => (
              <li
                key={v.id}
                className="flex items-start gap-3 rounded-xl border border-line bg-surface-card p-3"
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                    i === 0 ? 'bg-ouro-wash text-[rgb(var(--c-gold-deep))]' : 'bg-surface-muted text-ink-faint'
                  }`}
                >
                  {v.versao}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">
                    {i === 0 ? 'Versão vigente' : 'Versão anterior'}
                  </p>
                  <p className="text-xs text-ink-soft">{v.notas}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">{formatarData(v.publicadoEm)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Modal>
  );
}
