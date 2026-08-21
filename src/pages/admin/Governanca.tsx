import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { membroPorId, nucleoPorId } from '@/lib/consultas';
import { conferirComposicao, ORGAOS_INCOMPATIVEIS_COM_ETICA } from '@/data/orgaos';
import { cn } from '@/lib/cn';
import { data as formatarData } from '@/lib/formato';
import type { FiguraSucessoria, Orgao } from '@/types';

/** Est. Arts. 37 a 39 — figuras da linha sucessória. */
const ROTULO_FIGURA: Record<FiguraSucessoria, string> = {
  epigonos_honorario: 'Epígonos Honorário',
  epigonos_permanente: 'Epígonos Permanente',
  arquidama: 'Arquidama',
  chanceler: 'Chanceler',
};

const FUNDAMENTO_FIGURA: Record<FiguraSucessoria, string> = {
  epigonos_honorario: 'Est. Art. 37, § 1.º — sucessor em idade de incapacidade civil',
  epigonos_permanente: 'Est. Art. 37, § 3.º e § 4.º — após sabatina do Conselho Alto',
  arquidama: 'Est. Art. 38 — assume a Regência na menoridade do Epígonos',
  chanceler: 'Est. Arts. 36 e 39, I — substituto ordinário',
};
import {
  Abas,
  Avatar,
  Cartao,
  CabecalhoCartao,
  Icone,
  Selo,
  SemAcesso,
  Vazio,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const DIA_MS = 24 * 60 * 60 * 1000;

export function Governanca() {
  const { base } = useDados();
  const { temAlguma } = useAuth();
  const [ambito, setAmbito] = useState<'central' | 'local' | 'sucessao'>('central');

  const orgaos = useMemo(
    () => base.orgaos.filter((o) => o.ambito === ambito),
    [base.orgaos, ambito],
  );

  /**
   * Est. Art. 52 — é vedado aos membros do Conselho Superior de Ética o
   * exercício cumulativo de cargos na Diretoria Executiva ou em coordenadorias
   * de gestão local. A verificação corre sobre os assentos ativos.
   */
  const acumulosIrregulares = useMemo(() => {
    const etica = base.orgaos.find((o) => o.codigo === 'conselho_superior_etica');
    if (!etica) return [];
    const naEtica = base.assentos.filter((a) => a.orgaoId === etica.id && a.ativo).map((a) => a.membroId);
    const incompativeis = base.orgaos
      .filter((o) => ORGAOS_INCOMPATIVEIS_COM_ETICA.includes(o.codigo))
      .map((o) => o.id);
    return base.assentos
      .filter((a) => a.ativo && incompativeis.includes(a.orgaoId) && naEtica.includes(a.membroId))
      .map((a) => ({
        membro: membroPorId(base, a.membroId),
        orgao: base.orgaos.find((o) => o.id === a.orgaoId),
      }));
  }, [base]);

  if (!temAlguma(['membros.visualizar'])) return <SemAcesso modulo="a estrutura de governança" />;

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Governança"
        descricao="Órgãos da Ordem, composição e mandatos, nos termos dos Arts. 23, 41, 43, 50, 54 e 59 do Estatuto."
      />

      {acumulosIrregulares.length > 0 && (
        <Cartao className="border-critico/30 bg-critico/5">
          <div className="flex items-start gap-3">
            <Icone nome="warning" className="mt-px shrink-0 text-[20px] text-critico" />
            <div className="min-w-0">
              <p className="font-bold text-ink">Acúmulo vedado pelo Art. 52</p>
              <p className="mt-1 text-sm text-ink-soft">
                Membros do Conselho Superior de Ética não podem ocupar cargo na Diretoria Executiva
                nem em coordenadoria de gestão local.
              </p>
              <ul className="mt-2 space-y-1">
                {acumulosIrregulares.map((a, i) => (
                  <li key={i} className="text-sm font-semibold text-critico">
                    {a.membro?.nomeCompleto} — também em {a.orgao?.nome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Cartao>
      )}

      <Abas
        itens={[
          {
            id: 'central',
            rotulo: 'Órgãos centrais',
            icone: 'account_balance',
            contagem: base.orgaos.filter((o) => o.ambito === 'central').length,
          },
          {
            id: 'local',
            rotulo: 'Órgãos locais',
            icone: 'hub',
            contagem: base.orgaos.filter((o) => o.ambito === 'local').length,
          },
          {
            id: 'sucessao',
            rotulo: 'Sucessão',
            icone: 'workspace_premium',
            contagem: base.sucessao.length,
          },
        ]}
        ativo={ambito}
        aoMudar={(v) => setAmbito(v as 'central' | 'local' | 'sucessao')}
        rotuloGrupo="Âmbito dos órgãos"
      />

      {ambito === 'local' && (
        <p className="flex items-start gap-2 rounded-2xl border border-line bg-surface-muted/60 p-3 text-xs text-ink-soft">
          <Icone nome="info" className="mt-px shrink-0 text-[16px]" />
          <span>
            O Art. 59 exige que cada Núcleo possua, no mínimo, Coordenadoria de Gestão Local,
            Conselho Local de Ética e Conselho Local de Contas. A descentralização é delegação de
            execução, não transferência de soberania (Art. 61).
          </span>
        </p>
      )}

      {ambito === 'sucessao' ? (
        <LinhaSucessao />
      ) : (
        <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-2">
          {orgaos.map((orgao) => (
            <CartaoOrgao key={orgao.id} orgao={orgao} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Linha de sucessão — Est. Arts. 36 a 39.
 *
 * A ordem de precedência é fixada por Ato Normativo Supremo (Art. 39, § 1.º), e
 * esse ato só se anula contra a vontade do subscritor por deliberação de 2/3 da
 * Assembleia Geral (§ 2.º) — daí a hierarquia normativa aparecer aqui.
 */
function LinhaSucessao() {
  const { base } = useDados();
  const linha = [...base.sucessao].sort((a, b) => a.ordem - b.ordem);

  return (
    <div className="space-y-4">
      <Cartao destaque>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ouro/20 text-[rgb(var(--c-gold-deep))]">
            <Icone nome="workspace_premium" className="text-[20px]" />
          </span>
          <p className="text-sm leading-relaxed text-ink-soft">
            <strong className="text-ink">Perenidade da Ordem.</strong> O Moderador Presidente pode
            escolher e indicar o seu primeiro sucessor, ao qual se outorga o título de Epígonos,
            formalizado exclusivamente por Ato Normativo Supremo. A ordem de precedência é modulável
            pelo próprio Grão-Mestre e o ato só se anula por 2/3 da Assembleia Geral (Art. 39, §§ 1.º
            e 2.º).
          </p>
        </div>
      </Cartao>

      <ol className="space-y-3">
        {linha.map((posto) => {
          const m = membroPorId(base, posto.membroId);
          const ato = base.documentos.find((d) => d.id === posto.atoNormativoId);
          return (
            <li key={posto.id}>
              <Cartao>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-lg font-extrabold text-[rgb(245_197_24)]">
                    {posto.ordem}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-ink">{ROTULO_FIGURA[posto.figura]}</h3>
                      {posto.autorizadoParaAusencias && (
                        <Selo tom="positivo" icone="check">
                          Autorizado para ausências
                        </Selo>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-2.5">
                      <Avatar nome={m?.nomeCompleto ?? 'Membro'} tamanho="sm" />
                      <Link
                        to={`/membros/${posto.membroId}`}
                        className="truncate text-sm font-semibold text-ink hover:underline"
                      >
                        {m?.nomeCompleto ?? '—'}
                      </Link>
                    </div>
                    {posto.observacao && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{posto.observacao}</p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-3 text-xs text-ink-faint">
                      <span>{FUNDAMENTO_FIGURA[posto.figura]}</span>
                      {ato && (
                        <span className="ml-auto flex items-center gap-1">
                          <Icone nome="gavel" className="text-[14px]" />
                          {ato.titulo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Cartao>
            </li>
          );
        })}
      </ol>

      <Cartao>
        <p className="rotulo mb-3">Regime de Regência</p>
        <p className="text-sm leading-relaxed text-ink-soft">
          Havendo Epígonos Honorário em idade de incapacidade civil, a vacância do Moderador
          Presidente não transfere poderes executivos ao sucessor menor: a administração instala-se
          de imediato em regime de Regência, cabendo à Arquidama responder interinamente pela Ordem
          até que o sucessor alcance a idade para assumir.
        </p>
        <p className="mt-2 text-xs text-ink-faint">Est. Art. 37, § 2.º e Art. 38, § 1.º</p>
      </Cartao>
    </div>
  );
}

function CartaoOrgao({ orgao }: { orgao: Orgao }) {
  const { base } = useDados();
  const assentos = base.assentos.filter((a) => a.orgaoId === orgao.id && a.ativo);
  const conformidade = conferirComposicao(orgao, assentos.length);
  const nucleo = nucleoPorId(base, orgao.nucleoId);

  return (
    <Cartao semPadding className={cn(!conformidade.regular && 'border-atencao/40')}>
      <div className="p-5">
        <CabecalhoCartao
          titulo={orgao.nome}
          descricao={orgao.descricao}
          icone={orgao.ambito === 'central' ? 'account_balance' : 'hub'}
          acao={
            <Selo tom={conformidade.regular ? 'positivo' : 'atencao'} rotulo>
              {assentos.length}
              {orgao.maximoMembros ? `/${orgao.maximoMembros}` : ''}
            </Selo>
          }
        />

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <Selo tom="neutro" icone="gavel">
            {orgao.fundamento}
          </Selo>
          {orgao.mandatoAnos && (
            <Selo tom="neutro" icone="schedule">
              Mandato de {orgao.mandatoAnos} anos
            </Selo>
          )}
          {nucleo && <Selo tom="neutro">{nucleo.nome}</Selo>}
        </div>

        <p
          className={cn(
            'mt-3 flex items-start gap-1.5 text-xs',
            conformidade.regular ? 'text-ink-faint' : 'font-semibold text-atencao',
          )}
        >
          <Icone
            nome={conformidade.regular ? 'check_circle' : 'warning'}
            className="mt-px shrink-0 text-[14px]"
          />
          {conformidade.mensagem}
        </p>

        {orgao.competencias.length > 0 && (
          <details className="mt-3 group">
            <summary className="cursor-pointer list-none text-xs font-bold text-ink-soft transition hover:text-ink">
              <span className="inline-flex items-center gap-1">
                <Icone nome="expand_more" className="text-[15px] transition group-open:rotate-180" />
                Competências ({orgao.competencias.length})
              </span>
            </summary>
            <ul className="mt-2 space-y-1.5">
              {orgao.competencias.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-ink-soft">
                  <Icone nome="check" className="mt-0.5 shrink-0 text-[14px] text-ink-faint" />
                  {c}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      {assentos.length > 0 ? (
        <ul className="divide-y divide-line border-t border-line">
          {assentos.map((a) => {
            const m = membroPorId(base, a.membroId);
            const restante = a.fimMandato
              ? Math.floor((new Date(a.fimMandato).getTime() - Date.now()) / DIA_MS)
              : null;
            const vencendo = restante !== null && restante < 180;
            return (
              <li key={a.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar nome={m?.nomeCompleto ?? 'Membro'} tamanho="sm" />
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/membros/${a.membroId}`}
                    className="block truncate text-sm font-semibold text-ink hover:underline"
                  >
                    {m?.nomeCompleto ?? '—'}
                  </Link>
                  <p className="truncate text-xs text-ink-faint">
                    {a.funcao}
                    {a.fimMandato && ` · até ${formatarData(a.fimMandato)}`}
                  </p>
                </div>
                {vencendo && (
                  <Selo tom="atencao" icone="schedule">
                    Vence em breve
                  </Selo>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="border-t border-line">
          <Vazio icone="person_off" titulo="Sem assentos ocupados" className="py-8" />
        </div>
      )}
    </Cartao>
  );
}
