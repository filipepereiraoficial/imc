import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useTema } from '@/context/TemaContext';
import type { Tema } from '@/context/TemaContext';
import { useAviso } from '@/context/AvisoContext';
import { cn } from '@/lib/cn';
import { Alternador, Botao, Cartao, CabecalhoCartao, Icone, Selo } from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';
import { ANO_FUNDACAO, NOME_ORDEM, SIGLA_ORDEM } from '@/config';

const TEMAS: { valor: Tema; rotulo: string; icone: string }[] = [
  { valor: 'claro', rotulo: 'Claro', icone: 'light_mode' },
  { valor: 'escuro', rotulo: 'Escuro', icone: 'dark_mode' },
  { valor: 'sistema', rotulo: 'Sistema', icone: 'contrast' },
];

export function Configuracoes() {
  const { membro, cargo, atualizarPerfil, sair } = useAuth();
  const { base } = useDados();
  const { tema, definirTema } = useTema();
  const { avisar } = useAviso();

  if (!membro) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <CabecalhoPagina titulo="Configurações" descricao="Aparência, notificações e informações da plataforma." />

      <Cartao>
        <CabecalhoCartao titulo="Aparência" descricao="Escolha o tema da interface." icone="palette" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {TEMAS.map((t) => (
            <button
              key={t.valor}
              type="button"
              onClick={() => definirTema(t.valor)}
              aria-pressed={tema === t.valor}
              className={cn(
                'flex flex-col items-center gap-2 rounded-card border p-4 transition',
                tema === t.valor
                  ? 'border-ouro bg-ouro-wash text-ink'
                  : 'border-line bg-surface-card text-ink-soft hover:border-line-strong',
              )}
            >
              <Icone nome={t.icone} className="text-[22px]" />
              <span className="text-sm font-bold">{t.rotulo}</span>
            </button>
          ))}
        </div>
      </Cartao>

      <Cartao>
        <CabecalhoCartao titulo="Notificações" descricao="Escolha o que deseja receber." icone="notifications" />
        <div className="mt-2 divide-y divide-line">
          {[
            { rotulo: 'Comunicados oficiais', descricao: 'Publicações da Presidência, Secretaria e Tesouraria.' },
            { rotulo: 'Eventos e convocações', descricao: 'Novas atividades e lembretes de participação.' },
            { rotulo: 'Mensagens diretas', descricao: 'Conversas individuais e de grupo.' },
            { rotulo: 'Formação', descricao: 'Novos cursos, aulas e prazos de trilha.' },
            { rotulo: 'Propostas', descricao: 'Movimentação das propostas que você apoia.' },
          ].map((n, i) => (
            <Alternador
              key={n.rotulo}
              rotulo={n.rotulo}
              descricao={n.descricao}
              ativo={i !== 4}
              aoAlternar={() => avisar('sucesso', 'Preferência salva', n.rotulo)}
            />
          ))}
        </div>
      </Cartao>

      <Cartao>
        <CabecalhoCartao titulo="Segurança" descricao="Acesso e proteção da conta." icone="security" />
        <div className="mt-2 divide-y divide-line">
          <Alternador
            rotulo="Autenticação em dois fatores"
            descricao="Exige um código de uso único após a senha."
            ativo={membro.autenticacaoDoisFatores}
            aoAlternar={(v) => {
              atualizarPerfil({ autenticacaoDoisFatores: v });
              avisar(v ? 'sucesso' : 'atencao', v ? 'Dois fatores ativado' : 'Dois fatores desativado');
            }}
          />
        </div>
        <Link to="/painel" className="mt-4 inline-block">
          <Botao variante="contorno" icone="manage_accounts">
            Abrir painel do usuário
          </Botao>
        </Link>
      </Cartao>

      <Cartao>
        <CabecalhoCartao titulo="Sobre a plataforma" icone="info" />
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-ink-soft">Instituição</dt>
            <dd className="font-semibold text-ink">{NOME_ORDEM}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink-soft">Sigla</dt>
            <dd className="font-semibold text-ink">{SIGLA_ORDEM}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink-soft">Fundação</dt>
            <dd className="font-semibold text-ink">{ANO_FUNDACAO}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink-soft">Seu cargo</dt>
            <dd>
              <Selo tom="ouro">{cargo?.nome}</Selo>
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink-soft">Núcleos ativos</dt>
            <dd className="font-semibold text-ink">
              {base.nucleos.filter((n) => n.situacao === 'ativo').length} de {base.nucleos.length}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink-soft">Versão</dt>
            <dd className="font-mono text-xs text-ink-faint">1.0.0</dd>
          </div>
        </dl>
      </Cartao>

      <Cartao>
        <CabecalhoCartao titulo="Sessão" icone="logout" />
        <p className="mt-3 text-sm text-ink-soft">
          Ao sair, sua sessão neste dispositivo é encerrada. As demais permanecem ativas até que sejam
          revogadas no painel do usuário.
        </p>
        <Botao className="mt-4" variante="perigo" icone="logout" onClick={sair}>
          Sair da sessão
        </Botao>
      </Cartao>
    </div>
  );
}
