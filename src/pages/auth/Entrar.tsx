import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ErroAuth, SENHA_DEMONSTRACAO, useAuth } from '@/context/AuthContext';
import { useServidor } from '@/context/ServidorContext';
import { useDados } from '@/context/DadosContext';
import { Avatar, Botao, Campo, Icone } from '@/components/ui';
import { LayoutAuth } from './LayoutAuth';

/** Contas de vitrine — permitem avaliar cada nivel de permissao. */
const PERFIS_DEMO = [
  { email: 'filipeedito@gmail.com', papel: 'Eunomita · Membro' },
  { email: 'rafaellins@aordem.org', papel: 'Grão-Mestre' },
  { email: 'beatrizalves@aordem.org', papel: 'Secretário-Geral' },
  { email: 'marcosteixeira@aordem.org', papel: 'Tesoureiro-Geral' },
  { email: 'helenacastro@aordem.org', papel: 'Administrador da plataforma' },
];

export function Entrar() {
  const { entrar, autenticado } = useAuth();
  const { base } = useDados();
  const { noServidor, sistema } = useServidor();
  const navegar = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(true);
  const [verSenha, setVerSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (autenticado) return <Navigate to="/hoje" replace />;

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    if (!email.trim()) return setErro('Informe o e-mail cadastrado.');
    if (!senha) return setErro('Informe sua senha.');
    setEnviando(true);
    try {
      await entrar(email, senha, lembrar);
      navegar('/hoje');
    } catch (falha) {
      setErro(falha instanceof ErroAuth ? falha.message : 'Não foi possível entrar. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const acessarComo = async (emailDemo: string) => {
    setEmail(emailDemo);
    setSenha(SENHA_DEMONSTRACAO);
    setErro('');
    setEnviando(true);
    try {
      await entrar(emailDemo, SENHA_DEMONSTRACAO, true);
      navegar('/hoje');
    } catch (falha) {
      setErro(falha instanceof ErroAuth ? falha.message : 'Não foi possível entrar.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <LayoutAuth
      titulo="Acesso do Eunomita"
      descricao="Use o e-mail registrado na Secretaria-Geral da Ordem."
      rodape={
        // Com back-end instalado nao ha vitrine: as contas de exemplo e a
        // senha compartilhada nao existem, e exibi-las convidaria a tentar.
        noServidor ? (
          <div className="rounded-card border border-line bg-surface-card p-4">
            <p className="rotulo mb-2">Acesso institucional</p>
            <p className="text-sm text-ink-soft">
              {sistema
                ? `Você está entrando em ${sistema}.`
                : 'Você está entrando na instalação da sua Ordem.'}{' '}
              Use o e-mail ou o nome de usuário registrado na Secretaria.
            </p>
          </div>
        ) : (
        <div className="rounded-card border border-line bg-surface-card p-4">
          <p className="rotulo mb-3">Perfis de demonstração</p>
          <ul className="space-y-1">
            {PERFIS_DEMO.map((p) => {
              const m = base.membros.find((x) => x.email === p.email);
              if (!m) return null;
              return (
                <li key={p.email}>
                  <button
                    type="button"
                    onClick={() => acessarComo(p.email)}
                    disabled={enviando}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-surface-muted disabled:opacity-50"
                  >
                    <Avatar nome={m.nomeCompleto} tamanho="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">{m.nomeExibicao}</span>
                      <span className="block truncate text-xs text-ink-faint">{p.papel}</span>
                    </span>
                    <Icone nome="login" className="text-[18px] text-ink-faint" />
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 border-t border-line pt-3 text-xs text-ink-faint">
            Senha de todas as contas de demonstração: <code className="font-mono font-bold text-ink">{SENHA_DEMONSTRACAO}</code>
          </p>
        </div>
        )
      }
    >
      <form onSubmit={enviar} className="space-y-4" noValidate>
        {erro && (
          <div role="alert" className="flex items-start gap-2.5 rounded-2xl border border-critico/30 bg-critico/10 p-3.5">
            <Icone nome="error" className="mt-0.5 shrink-0 text-[19px] text-critico" />
            <p className="text-sm font-medium text-critico">{erro}</p>
          </div>
        )}

        <Campo
          rotulo="E-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          icone="mail"
          placeholder="seu.email@exemplo.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Campo
          rotulo="Senha"
          type={verSenha ? 'text' : 'password'}
          autoComplete="current-password"
          icone="lock"
          placeholder="••••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          acaoFim={
            <button
              type="button"
              onClick={() => setVerSenha((v) => !v)}
              aria-label={verSenha ? 'Ocultar senha' : 'Mostrar senha'}
              className="grid h-9 w-9 place-items-center rounded-xl text-ink-faint transition hover:bg-surface-muted hover:text-ink"
            >
              <Icone nome={verSenha ? 'visibility_off' : 'visibility'} className="text-[19px]" />
            </button>
          }
        />

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={lembrar}
              onChange={(e) => setLembrar(e.target.checked)}
              className="h-4 w-4 rounded border-line-strong text-ouro focus:ring-ouro/40"
            />
            Lembrar-me
          </label>
          <Link to="/recuperar-senha" className="link-sutil text-sm font-semibold">
            Esqueci minha senha
          </Link>
        </div>

        <Botao type="submit" larguraTotal tamanho="grande" carregando={enviando} iconeFim="arrow_forward">
          Entrar
        </Botao>

        <p className="flex items-center justify-center gap-1.5 pt-1 text-sm text-ink-soft">
          Ainda não é membro?
          <Link to="/cadastro" className="link-sutil font-bold">
            Solicitar cadastro
          </Link>
        </p>

        <p className="flex items-start gap-2 rounded-2xl bg-surface-muted p-3 text-xs text-ink-faint">
          <Icone nome="verified_user" className="mt-px shrink-0 text-[16px]" />
          Autenticação em dois fatores disponível nas configurações de segurança da sua conta.
        </p>
      </form>
    </LayoutAuth>
  );
}
