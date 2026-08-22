import { useServidor } from '@/context/ServidorContext';
import { Icone } from '@/components/ui/Icone';
import { NOME_ORDEM } from '@/config';

/**
 * Tela exibida quando ha back-end em PHP no servidor mas a instalacao ainda
 * nao foi concluida.
 *
 * Segue o comportamento do instalador de sistemas conhecidos: em vez de uma
 * aplicacao vazia ou de um erro tecnico, a primeira visita leva a instalacao.
 */
export function ConviteInstalacao() {
  const { instalador } = useServidor();

  return (
    <main className="grid min-h-dvh place-items-center bg-surface px-5 py-10">
      <div className="w-full max-w-lg rounded-card border border-line bg-surface-card p-7 shadow-suave">
        <span
          aria-hidden="true"
          className="mb-5 grid size-12 place-items-center rounded-2xl border border-line-strong bg-ouro-wash text-ouro-deep"
        >
          <Icone nome="settings" className="text-[24px]" />
        </span>

        <h1 className="text-xl font-semibold leading-tight text-ink">
          A plataforma ainda não foi instalada
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          O servidor está no ar e responde, mas a base de dados da{' '}
          <span className="font-medium text-ink">{NOME_ORDEM}</span> ainda não foi preparada.
          A instalação leva poucos minutos e pede, em ordem: a conexão com o banco de dados, o
          nome do sistema e da organização, e a conta de administração.
        </p>

        <ol className="mt-6 space-y-2.5 border-t border-line pt-5">
          {[
            'Tenha à mão os dados do banco fornecidos pela sua hospedagem.',
            'O banco precisa existir antes; o instalador não o cria.',
            'Ao terminar, remova a pasta api/instalacao do servidor.',
          ].map((passo, i) => (
            <li key={passo} className="flex gap-3 text-sm text-ink-soft">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-surface-muted text-[11px] font-bold text-ink-faint"
              >
                {i + 1}
              </span>
              <span className="min-w-0">{passo}</span>
            </li>
          ))}
        </ol>

        <a
          href={instalador ?? 'api/instalacao/'}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ouro px-5 py-3 font-semibold text-ink-inverse transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Abrir o instalador
          <Icone nome="arrow_forward" className="text-[19px]" />
        </a>
      </div>
    </main>
  );
}
