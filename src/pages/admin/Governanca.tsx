import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { membroPorId, nucleoPorId } from '@/lib/consultas';
import { conferirComposicao, ORGAOS_INCOMPATIVEIS_COM_ETICA } from '@/data/orgaos';
import { cn } from '@/lib/cn';
import { data as formatarData } from '@/lib/formato';
import type { Orgao } from '@/types';
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
  const [ambito, setAmbito] = useState<'central' | 'local'>('central');

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
        ]}
        ativo={ambito}
        aoMudar={(v) => setAmbito(v as 'central' | 'local')}
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

      <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-2">
        {orgaos.map((orgao) => (
          <CartaoOrgao key={orgao.id} orgao={orgao} />
        ))}
      </div>
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
