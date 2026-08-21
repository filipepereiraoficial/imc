import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { GRUPOS_PERMISSAO } from '@/data/cargos';
import { cn } from '@/lib/cn';
import { numero } from '@/lib/formato';
import type { Cargo, Permissao } from '@/types';
import { Cartao, CabecalhoCartao, Icone, Selo, SemAcesso } from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

const ROTULO_ESCOPO: Record<Cargo['escopo'], string> = {
  global: 'Toda a Ordem',
  pais: 'Próprio país',
  estado: 'Próprio estado',
  nucleo: 'Próprio Núcleo',
  proprio: 'Apenas o próprio registro',
};

export function Permissoes() {
  const { base, atualizar, auditar } = useDados();
  const { membro, cargo: meuCargo, tem } = useAuth();
  const { avisar } = useAviso();
  const [selecionado, setSelecionado] = useState(base.cargos[0]?.id ?? '');

  const cargo = useMemo(() => base.cargos.find((c) => c.id === selecionado), [base.cargos, selecionado]);

  if (!tem('permissoes.gerenciar')) return <SemAcesso modulo="a gestão de cargos e permissões" />;

  const alternar = (permissao: Permissao, conceder: boolean) => {
    if (!cargo || !membro) return;
    // Nao se altera um cargo de precedencia superior a do proprio autor.
    if ((meuCargo?.precedencia ?? 99) > cargo.precedencia) {
      avisar('erro', 'Ação não permitida', 'Não é possível alterar um cargo de precedência superior à sua.');
      return;
    }
    atualizar((b) => ({
      ...b,
      cargos: b.cargos.map((c) =>
        c.id === cargo.id
          ? {
              ...c,
              permissoes: conceder
                ? [...new Set([...c.permissoes, permissao])]
                : c.permissoes.filter((p) => p !== permissao),
            }
          : c,
      ),
    }));
    auditar({
      membroId: membro.id,
      acao: 'Alterou permissões',
      modulo: 'Administração',
      detalhe: `${conceder ? 'Concedida' : 'Revogada'} '${permissao}' ao cargo ${cargo.nome}.`,
    });
  };

  return (
    <div className="space-y-5">
      <CabecalhoPagina
        titulo="Cargos e permissões"
        descricao="Controle de acesso baseado em cargos. Cada permissão é exercida dentro do escopo territorial do cargo."
      />

      <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
        <Cartao semPadding>
          <div className="p-5 pb-3">
            <CabecalhoCartao titulo="Cargos" icone="key" />
          </div>
          <ul className="divide-y divide-line">
            {[...base.cargos]
              .sort((a, b) => a.precedencia - b.precedencia)
              .map((c) => {
                const quantidade = base.membros.filter((m) => m.cargoId === c.id).length;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setSelecionado(c.id)}
                      className={cn(
                        'flex w-full items-center gap-3 px-5 py-3.5 text-left transition',
                        selecionado === c.id ? 'bg-ouro-wash' : 'hover:bg-surface-muted/60',
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-extrabold',
                          selecionado === c.id
                            ? 'bg-ink text-[rgb(245_197_24)]'
                            : 'bg-surface-muted text-ink-soft',
                        )}
                      >
                        {c.precedencia}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-ink">{c.nome}</span>
                        <span className="block truncate text-xs text-ink-faint">
                          {c.permissoes.length} permissões · {numero(quantidade)} membros
                        </span>
                      </span>
                      <Icone nome="chevron_right" className="shrink-0 text-[18px] text-ink-faint" />
                    </button>
                  </li>
                );
              })}
          </ul>
        </Cartao>

        {cargo && (
          <div className="min-w-0 space-y-4">
            <Cartao>
              <CabecalhoCartao
                titulo={cargo.nome}
                descricao={cargo.descricao}
                icone="admin_panel_settings"
                acao={cargo.sistema ? <Selo tom="neutro" icone="lock">Cargo do sistema</Selo> : undefined}
              />
              <dl className="mt-4 grid gap-4 border-t border-line pt-4 sm:grid-cols-3">
                <div>
                  <dt className="rotulo">Precedência</dt>
                  <dd className="mt-1 text-sm font-bold text-ink">{cargo.precedencia}</dd>
                </div>
                <div>
                  <dt className="rotulo">Escopo</dt>
                  <dd className="mt-1 text-sm font-bold text-ink">{ROTULO_ESCOPO[cargo.escopo]}</dd>
                </div>
                <div>
                  <dt className="rotulo">Membros</dt>
                  <dd className="mt-1 text-sm font-bold text-ink">
                    {numero(base.membros.filter((m) => m.cargoId === cargo.id).length)}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 flex items-start gap-2 rounded-2xl bg-surface-muted p-3 text-xs text-ink-soft">
                <Icone nome="shield" className="mt-px shrink-0 text-[16px]" />
                <span>
                  A permissão só produz efeito dentro do escopo do cargo. Um Dirigente com{' '}
                  <strong className="font-mono">membros.editar</strong>, por exemplo, edita apenas
                  membros do próprio Núcleo.
                </span>
              </p>
            </Cartao>

            {GRUPOS_PERMISSAO.map((grupo) => (
              <Cartao key={grupo.grupo}>
                <p className="rotulo">{grupo.grupo}</p>
                <ul className="mt-3 divide-y divide-line">
                  {grupo.permissoes.map((p) => {
                    const concedida = cargo.permissoes.includes(p.chave);
                    return (
                      <li key={p.chave} className="flex items-center justify-between gap-3 py-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-ink">{p.rotulo}</p>
                          <p className="font-mono text-xs text-ink-faint">{p.chave}</p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={concedida}
                          aria-label={`${p.rotulo} para ${cargo.nome}`}
                          onClick={() => alternar(p.chave, !concedida)}
                          className={cn(
                            'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                            concedida ? 'bg-ouro' : 'bg-surface-strong',
                          )}
                        >
                          <span
                            className={cn(
                              'absolute top-0.5 h-5 w-5 rounded-full border border-black/10 bg-white shadow-sm transition-transform',
                              concedida ? 'translate-x-[22px]' : 'translate-x-0.5',
                            )}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Cartao>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
