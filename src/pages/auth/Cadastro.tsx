import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErroAuth, useAuth } from '@/context/AuthContext';
import type { DadosCadastro } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { avaliarForca } from '@/lib/senha';
import { cn } from '@/lib/cn';
import { Botao, Campo, Icone, Selecao } from '@/components/ui';
import { LayoutAuth } from './LayoutAuth';

type Etapa = 0 | 1 | 2;

const ETAPAS = [
  { titulo: 'Identificação', icone: 'person' },
  { titulo: 'Localização', icone: 'public' },
  { titulo: 'Acesso', icone: 'lock' },
];

const VAZIO: DadosCadastro = {
  nomeCompleto: '',
  nomeExibicao: '',
  email: '',
  telefone: '',
  senha: '',
  sexo: 'nao_informado',
  dataNascimento: '',
  paisId: 'pa-br',
  estadoId: '',
  municipioId: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cep: '',
  nucleoId: null,
  numeroMembro: '',
};

export function Cadastro() {
  const { base } = useDados();
  const { cadastrar } = useAuth();
  const { avisar } = useAviso();
  const navegar = useNavigate();

  const [etapa, setEtapa] = useState<Etapa>(0);
  const [dados, setDados] = useState<DadosCadastro>(VAZIO);
  const [confirmacao, setConfirmacao] = useState('');
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  const definir = <K extends keyof DadosCadastro>(campo: K, valor: DadosCadastro[K]) => {
    setDados((d) => ({ ...d, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: '' }));
  };

  const estados = useMemo(
    () => base.estados.filter((e) => e.paisId === dados.paisId),
    [base.estados, dados.paisId],
  );
  const municipios = useMemo(
    () => base.municipios.filter((m) => m.estadoId === dados.estadoId),
    [base.municipios, dados.estadoId],
  );
  const nucleos = useMemo(
    () =>
      base.nucleos.filter(
        (n) => n.situacao !== 'encerrado' && (!dados.estadoId || n.estadoId === dados.estadoId),
      ),
    [base.nucleos, dados.estadoId],
  );

  const forca = avaliarForca(dados.senha);

  const validar = (alvo: Etapa): boolean => {
    const e: Record<string, string> = {};
    if (alvo === 0) {
      if (dados.nomeCompleto.trim().split(/\s+/).length < 2)
        e.nomeCompleto = 'Informe o nome completo.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) e.email = 'Informe um e-mail válido.';
      if (dados.telefone.replace(/\D/g, '').length < 10) e.telefone = 'Informe um telefone válido com DDD.';
      if (!dados.dataNascimento) e.dataNascimento = 'Informe a data de nascimento.';
      else {
        const idade = (Date.now() - new Date(dados.dataNascimento).getTime()) / 31557600000;
        if (idade < 16) e.dataNascimento = 'É necessário ter ao menos 16 anos.';
        if (idade > 120) e.dataNascimento = 'Verifique a data informada.';
      }
    }
    if (alvo === 1) {
      if (!dados.estadoId) e.estadoId = 'Selecione o estado ou província.';
      if (!dados.municipioId) e.municipioId = 'Selecione o município.';
      if (!dados.logradouro.trim()) e.logradouro = 'Informe o logradouro.';
      if (!dados.numero.trim()) e.numero = 'Informe o número.';
      if (!dados.bairro.trim()) e.bairro = 'Informe o bairro.';
    }
    if (alvo === 2) {
      if (dados.senha.length < 8) e.senha = 'A senha deve ter ao menos 8 caracteres.';
      else if (forca.pontuacao < 2) e.senha = 'Escolha uma senha mais forte.';
      if (dados.senha !== confirmacao) e.confirmacao = 'As senhas não coincidem.';
    }
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const avancar = () => {
    if (!validar(etapa)) return;
    setEtapa((v) => Math.min(2, v + 1) as Etapa);
  };

  const enviar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setErroGeral('');
    if (!validar(2)) return;
    setEnviando(true);
    try {
      await cadastrar(dados);
      avisar(
        'sucesso',
        'Cadastro enviado',
        'Sua solicitação foi encaminhada à Secretaria para análise.',
      );
      navegar('/cadastro-enviado');
    } catch (falha) {
      setErroGeral(falha instanceof ErroAuth ? falha.message : 'Não foi possível concluir o cadastro.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <LayoutAuth
      titulo="Solicitação de cadastro"
      descricao="Preencha os dados abaixo. A Secretaria analisará sua solicitação antes da liberação do acesso."
    >
      <ol className="mb-6 flex items-center gap-2" aria-label="Etapas do cadastro">
        {ETAPAS.map((e, i) => (
          <li key={e.titulo} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition',
                i < etapa && 'border-transparent bg-positivo text-white',
                i === etapa && 'border-ouro bg-ouro-wash text-[rgb(var(--c-gold-deep))]',
                i > etapa && 'border-line bg-surface-card text-ink-faint',
              )}
              aria-current={i === etapa ? 'step' : undefined}
            >
              {i < etapa ? <Icone nome="check" className="text-[18px]" /> : i + 1}
            </div>
            <span
              className={cn(
                'hidden truncate text-xs font-semibold sm:block',
                i === etapa ? 'text-ink' : 'text-ink-faint',
              )}
            >
              {e.titulo}
            </span>
            {i < ETAPAS.length - 1 && <span className="h-px flex-1 bg-line" aria-hidden />}
          </li>
        ))}
      </ol>

      <form onSubmit={enviar} className="space-y-4" noValidate>
        {erroGeral && (
          <div role="alert" className="flex items-start gap-2.5 rounded-2xl border border-critico/30 bg-critico/10 p-3.5">
            <Icone nome="error" className="mt-0.5 shrink-0 text-[19px] text-critico" />
            <p className="text-sm font-medium text-critico">{erroGeral}</p>
          </div>
        )}

        {etapa === 0 && (
          <>
            <Campo
              rotulo="Nome completo"
              value={dados.nomeCompleto}
              onChange={(e) => definir('nomeCompleto', e.target.value)}
              erro={erros.nomeCompleto}
              autoComplete="name"
              required
            />
            <Campo
              rotulo="Nome social ou de exibição"
              value={dados.nomeExibicao}
              onChange={(e) => definir('nomeExibicao', e.target.value)}
              dica="Como você prefere ser identificado na plataforma. Opcional."
            />
            <Campo
              rotulo="E-mail"
              type="email"
              inputMode="email"
              value={dados.email}
              onChange={(e) => definir('email', e.target.value)}
              erro={erros.email}
              autoComplete="email"
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                rotulo="Telefone"
                type="tel"
                inputMode="tel"
                placeholder="(00) 00000-0000"
                value={dados.telefone}
                onChange={(e) => definir('telefone', e.target.value)}
                erro={erros.telefone}
                autoComplete="tel"
                required
              />
              <Campo
                rotulo="Data de nascimento"
                type="date"
                value={dados.dataNascimento.slice(0, 10)}
                onChange={(e) => definir('dataNascimento', e.target.value)}
                erro={erros.dataNascimento}
                required
              />
            </div>
            <Selecao
              rotulo="Sexo"
              value={dados.sexo}
              onChange={(e) => definir('sexo', e.target.value as DadosCadastro['sexo'])}
            >
              <option value="nao_informado">Prefiro não informar</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </Selecao>
          </>
        )}

        {etapa === 1 && (
          <>
            <Selecao
              rotulo="País"
              value={dados.paisId}
              onChange={(e) => {
                definir('paisId', e.target.value);
                definir('estadoId', '');
                definir('municipioId', '');
                definir('nucleoId', null);
              }}
              required
            >
              {base.paises.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </Selecao>
            <div className="grid gap-4 sm:grid-cols-2">
              <Selecao
                rotulo="Estado / Província"
                value={dados.estadoId}
                onChange={(e) => {
                  definir('estadoId', e.target.value);
                  definir('municipioId', '');
                }}
                erro={erros.estadoId}
                required
              >
                <option value="">Selecione…</option>
                {estados.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nome}
                  </option>
                ))}
              </Selecao>
              <Selecao
                rotulo="Município"
                value={dados.municipioId}
                onChange={(e) => definir('municipioId', e.target.value)}
                erro={erros.municipioId}
                disabled={!dados.estadoId}
                required
              >
                <option value="">Selecione…</option>
                {municipios.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
              </Selecao>
            </div>
            <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
              <Campo
                rotulo="Logradouro"
                value={dados.logradouro}
                onChange={(e) => definir('logradouro', e.target.value)}
                erro={erros.logradouro}
                autoComplete="street-address"
                required
              />
              <Campo
                rotulo="Número"
                value={dados.numero}
                onChange={(e) => definir('numero', e.target.value)}
                erro={erros.numero}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                rotulo="Bairro"
                value={dados.bairro}
                onChange={(e) => definir('bairro', e.target.value)}
                erro={erros.bairro}
                required
              />
              <Campo
                rotulo="CEP / Código postal"
                value={dados.cep}
                onChange={(e) => definir('cep', e.target.value)}
                inputMode="numeric"
              />
            </div>
            <Selecao
              rotulo="Núcleo de vínculo"
              value={dados.nucleoId ?? ''}
              onChange={(e) => definir('nucleoId', e.target.value || null)}
              dica="Se ainda não houver Núcleo em sua região, a Secretaria fará a indicação."
            >
              <option value="">Aguardar indicação da Secretaria</option>
              {nucleos.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.nome}
                </option>
              ))}
            </Selecao>
          </>
        )}

        {etapa === 2 && (
          <>
            <Campo
              rotulo="Senha"
              type="password"
              value={dados.senha}
              onChange={(e) => definir('senha', e.target.value)}
              erro={erros.senha}
              autoComplete="new-password"
              icone="lock"
              required
            />
            {dados.senha && (
              <div>
                <div className="flex gap-1" aria-hidden>
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={cn(
                        'h-1.5 flex-1 rounded-full transition-colors',
                        i < forca.pontuacao
                          ? forca.pontuacao <= 1
                            ? 'bg-critico'
                            : forca.pontuacao === 2
                              ? 'bg-atencao'
                              : 'bg-positivo'
                          : 'bg-surface-strong',
                      )}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-ink-faint">
                  Força da senha: <strong className="text-ink">{forca.rotulo}</strong>
                  {forca.sugestoes.length > 0 && ` — ${forca.sugestoes.join('. ')}.`}
                </p>
              </div>
            )}
            <Campo
              rotulo="Confirmação da senha"
              type="password"
              value={confirmacao}
              onChange={(e) => {
                setConfirmacao(e.target.value);
                setErros((x) => ({ ...x, confirmacao: '' }));
              }}
              erro={erros.confirmacao}
              autoComplete="new-password"
              icone="lock_reset"
              required
            />
            <Campo
              rotulo="Código ou número de membro"
              value={dados.numeroMembro}
              onChange={(e) => definir('numeroMembro', e.target.value)}
              dica="Apenas se você já possui registro anterior na Ordem. Opcional."
            />
            <p className="flex items-start gap-2 rounded-2xl bg-surface-muted p-3 text-xs text-ink-faint">
              <Icone nome="gavel" className="mt-px shrink-0 text-[16px]" />
              Ao enviar, você declara conhecer o Estatuto e o Código de Conduta da Ordem e autoriza o
              tratamento dos seus dados para fins institucionais.
            </p>
          </>
        )}

        <div className="flex gap-3 pt-1">
          {etapa > 0 && (
            <Botao
              type="button"
              variante="contorno"
              tamanho="grande"
              icone="arrow_back"
              onClick={() => setEtapa((v) => (v - 1) as Etapa)}
            >
              Voltar
            </Botao>
          )}
          {etapa < 2 ? (
            <Botao type="button" tamanho="grande" larguraTotal iconeFim="arrow_forward" onClick={avancar}>
              Continuar
            </Botao>
          ) : (
            <Botao type="submit" tamanho="grande" larguraTotal carregando={enviando} icone="send">
              Enviar solicitação
            </Botao>
          )}
        </div>

        <p className="flex items-center justify-center gap-1.5 text-sm text-ink-soft">
          Já possui acesso?
          <Link to="/entrar" className="link-sutil font-bold">
            Entrar
          </Link>
        </p>
      </form>
    </LayoutAuth>
  );
}
