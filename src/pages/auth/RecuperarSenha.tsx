import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErroAuth, useAuth } from '@/context/AuthContext';
import { Botao, Campo, Icone } from '@/components/ui';
import { LayoutAuth } from './LayoutAuth';

export function RecuperarSenha() {
  const { recuperarSenha } = useAuth();
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      await recuperarSenha(email);
      setEnviado(true);
    } catch (falha) {
      setErro(falha instanceof ErroAuth ? falha.message : 'Não foi possível processar a solicitação.');
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <LayoutAuth
        titulo="Verifique seu e-mail"
        descricao="Se houver uma conta associada a este endereço, enviaremos as instruções de redefinição."
      >
        <div className="rounded-card border border-line bg-surface-card p-6 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ouro-wash">
            <Icone nome="mark_email_read" className="text-[26px] text-[rgb(var(--c-gold-deep))]" />
          </span>
          <p className="mt-4 font-bold text-ink">Instruções enviadas para {email}</p>
          <p className="mt-2 text-sm text-ink-soft">
            O link de redefinição expira em 30 minutos. Caso não encontre a mensagem, verifique a caixa
            de spam ou procure a Secretaria da sua instância.
          </p>
          <Link to="/entrar" className="mt-5 inline-block">
            <Botao variante="contorno" icone="arrow_back">
              Voltar para o acesso
            </Botao>
          </Link>
        </div>
      </LayoutAuth>
    );
  }

  return (
    <LayoutAuth
      titulo="Recuperar senha"
      descricao="Informe o e-mail cadastrado. Enviaremos um link seguro para a redefinição."
    >
      <form onSubmit={enviar} className="space-y-4" noValidate>
        {erro && (
          <div role="alert" className="flex items-start gap-2.5 rounded-2xl border border-critico/30 bg-critico/10 p-3.5">
            <Icone nome="error" className="mt-0.5 shrink-0 text-[19px] text-critico" />
            <p className="text-sm font-medium text-critico">{erro}</p>
          </div>
        )}
        <Campo
          rotulo="E-mail cadastrado"
          type="email"
          inputMode="email"
          icone="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <Botao type="submit" larguraTotal tamanho="grande" carregando={enviando} icone="send">
          Enviar instruções
        </Botao>
        <p className="flex items-center justify-center gap-1.5 text-sm text-ink-soft">
          Lembrou a senha?
          <Link to="/entrar" className="link-sutil font-bold">
            Entrar
          </Link>
        </p>
      </form>
    </LayoutAuth>
  );
}

export function CadastroEnviado() {
  return (
    <LayoutAuth
      titulo="Solicitação registrada"
      descricao="Sua ficha foi encaminhada à Secretaria da Ordem."
    >
      <div className="rounded-card border border-line bg-surface-card p-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ouro-wash">
          <Icone nome="how_to_reg" className="text-[26px] text-[rgb(var(--c-gold-deep))]" />
        </span>
        <p className="mt-4 font-bold text-ink">Cadastro em análise</p>
        <p className="mt-2 text-sm text-ink-soft">
          A Secretaria fará a conferência dos dados e, uma vez aprovada a filiação, você receberá por
          e-mail o número de membro e a liberação do acesso à plataforma.
        </p>
        <ol className="mt-5 space-y-2 text-left text-sm text-ink-soft">
          {[
            'Conferência dos dados pela Secretaria',
            'Indicação ou confirmação do Núcleo de vínculo',
            'Emissão do número de membro e da carteira digital',
          ].map((passo, i) => (
            <li key={passo} className="flex items-start gap-2.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-surface-muted text-xs font-bold text-ink-soft">
                {i + 1}
              </span>
              {passo}
            </li>
          ))}
        </ol>
        <Link to="/entrar" className="mt-6 inline-block">
          <Botao variante="contorno" icone="arrow_back">
            Voltar para o acesso
          </Botao>
        </Link>
      </div>
    </LayoutAuth>
  );
}
