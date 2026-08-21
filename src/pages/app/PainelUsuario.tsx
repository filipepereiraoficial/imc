import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import { useAviso } from '@/context/AvisoContext';
import { cargoDe, nucleoPorId } from '@/lib/consultas';
import { data as formatarData, dataHora } from '@/lib/formato';
import { ErroAuth } from '@/context/AuthContext';
import type { NivelVisibilidade } from '@/types';
import { ROTULO_SITUACAO, TOM_SITUACAO } from '@/components/domain/Itens';
import {
  Abas,
  Alternador,
  AreaTexto,
  Avatar,
  Botao,
  Campo,
  Cartao,
  CabecalhoCartao,
  Confirmacao,
  Icone,
  Selecao,
  Selo,
} from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

type Secao = 'conta' | 'pessoais' | 'institucionais' | 'privacidade' | 'seguranca';

const CAMPOS_PRIVACIDADE: { chave: keyof import('@/types').PreferenciasPrivacidade; rotulo: string; descricao: string }[] = [
  { chave: 'email', rotulo: 'E-mail', descricao: 'Quem pode ver seu endereço eletrônico.' },
  { chave: 'telefone', rotulo: 'Telefone', descricao: 'Quem pode ver seu número de contato.' },
  { chave: 'endereco', rotulo: 'Endereço', descricao: 'Quem pode ver seu endereço residencial.' },
  { chave: 'dataNascimento', rotulo: 'Data de nascimento', descricao: 'Quem pode ver sua data de nascimento.' },
  { chave: 'perfil', rotulo: 'Perfil', descricao: 'Quem pode abrir seu perfil completo.' },
  { chave: 'publicacoes', rotulo: 'Publicações', descricao: 'Quem pode ver o que você publica no feed.' },
];

const OPCOES_VISIBILIDADE: { valor: NivelVisibilidade; rotulo: string }[] = [
  { valor: 'publico', rotulo: 'Todos os membros' },
  { valor: 'nucleo', rotulo: 'Apenas meu Núcleo' },
  { valor: 'administracao', rotulo: 'Apenas a administração' },
  { valor: 'privado', rotulo: 'Somente eu' },
];

export function PainelUsuario() {
  const { membro, atualizarPerfil, atualizarPrivacidade, alterarSenha, encerrarSessao, encerrarTodasSessoes } = useAuth();
  const { base, atualizar } = useDados();
  const { avisar } = useAviso();
  const [secao, setSecao] = useState<Secao>('conta');
  const [confirmarSaida, setConfirmarSaida] = useState(false);

  if (!membro) return null;
  const cargo = cargoDe(base, membro);
  const nucleo = nucleoPorId(base, membro.nucleoId);
  const sessoes = base.sessoes.filter((s) => s.membroId === membro.id);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <CabecalhoPagina
        titulo="Painel do usuário"
        descricao="Gerencie seus dados, preferências de privacidade e segurança da conta."
      />

      <Abas
        variante="linha"
        itens={[
          { id: 'conta', rotulo: 'Minha conta', icone: 'person' },
          { id: 'pessoais', rotulo: 'Dados pessoais', icone: 'contact_page' },
          { id: 'institucionais', rotulo: 'Institucionais', icone: 'badge' },
          { id: 'privacidade', rotulo: 'Privacidade', icone: 'visibility' },
          { id: 'seguranca', rotulo: 'Segurança', icone: 'security' },
        ]}
        ativo={secao}
        aoMudar={setSecao}
        rotuloGrupo="Seções do painel"
      />

      {secao === 'conta' && <SecaoConta />}

      {secao === 'pessoais' && (
        <Cartao>
          <CabecalhoCartao titulo="Dados pessoais" descricao="Informações usadas em documentos e declarações." icone="contact_page" />
          <FormularioPessoais />
        </Cartao>
      )}

      {secao === 'institucionais' && (
        <Cartao>
          <CabecalhoCartao
            titulo="Dados institucionais"
            descricao="Estes campos são mantidos pela Secretaria e não podem ser editados pelo membro."
            icone="badge"
          />
          <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <Leitura rotulo="Número de membro" valor={membro.numeroMembro} />
            <Leitura rotulo="Cargo" valor={cargo?.nome ?? '—'} />
            <Leitura rotulo="Núcleo" valor={nucleo?.nome ?? 'Sem vínculo'} />
            <Leitura rotulo="Data de ingresso" valor={formatarData(membro.dataIngresso)} />
            <div>
              <dt className="rotulo">Situação da membresia</dt>
              <dd className="mt-1">
                <Selo tom={TOM_SITUACAO[membro.situacao]}>{ROTULO_SITUACAO[membro.situacao]}</Selo>
              </dd>
            </div>
            <Leitura rotulo="Escopo do cargo" valor={cargo?.escopo ?? '—'} />
          </dl>
          <p className="mt-5 flex items-start gap-2 rounded-2xl bg-surface-muted p-3.5 text-xs text-ink-soft">
            <Icone nome="info" className="mt-px shrink-0 text-[16px]" />
            Para transferência de Núcleo, alteração de cargo ou correção de registro, abra uma solicitação
            junto à Secretaria da sua instância.
          </p>
        </Cartao>
      )}

      {secao === 'privacidade' && (
        <Cartao>
          <CabecalhoCartao
            titulo="Privacidade"
            descricao="Defina quem pode visualizar cada informação do seu cadastro."
            icone="visibility"
          />
          <div className="mt-5 divide-y divide-line">
            {CAMPOS_PRIVACIDADE.map((campo) => (
              <div key={campo.chave} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{campo.rotulo}</p>
                  <p className="text-xs text-ink-soft">{campo.descricao}</p>
                </div>
                <select
                  aria-label={`Visibilidade de ${campo.rotulo}`}
                  value={membro.privacidade[campo.chave]}
                  onChange={(e) => {
                    atualizarPrivacidade({ [campo.chave]: e.target.value as NivelVisibilidade });
                    avisar('sucesso', 'Privacidade atualizada', campo.rotulo);
                  }}
                  className="h-10 rounded-xl border border-line-strong bg-surface-card px-3 text-sm font-medium text-ink focus:border-ouro focus:outline-none focus:ring-2 focus:ring-ouro/30"
                >
                  {OPCOES_VISIBILIDADE.map((o) => (
                    <option key={o.valor} value={o.valor}>
                      {o.rotulo}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </Cartao>
      )}

      {secao === 'seguranca' && (
        <div className="space-y-4">
          <Cartao>
            <CabecalhoCartao titulo="Alterar senha" icone="password" />
            <FormularioSenha aoAlterar={alterarSenha} />
          </Cartao>

          <Cartao>
            <CabecalhoCartao
              titulo="Autenticação em dois fatores"
              descricao="Camada adicional exigida no acesso a partir de novos dispositivos."
              icone="verified_user"
            />
            <div className="mt-4">
              <Alternador
                rotulo="Exigir segundo fator"
                descricao="Um código de uso único será solicitado após a senha."
                ativo={membro.autenticacaoDoisFatores}
                aoAlternar={(v) => {
                  atualizarPerfil({ autenticacaoDoisFatores: v });
                  avisar(v ? 'sucesso' : 'atencao', v ? 'Dois fatores ativado' : 'Dois fatores desativado');
                }}
              />
            </div>
          </Cartao>

          <Cartao>
            <CabecalhoCartao
              titulo="Sessões ativas"
              descricao="Dispositivos com acesso à sua conta."
              icone="devices"
              acao={
                <Botao variante="contorno" tamanho="pequeno" icone="logout" onClick={() => setConfirmarSaida(true)}>
                  Encerrar todas
                </Botao>
              }
            />
            <ul className="mt-4 divide-y divide-line">
              {sessoes.map((s) => (
                <li key={s.id} className="flex items-center gap-3 py-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-muted text-ink-soft">
                    <Icone nome={s.dispositivo.includes('App') ? 'smartphone' : 'computer'} className="text-[20px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{s.dispositivo}</p>
                    <p className="truncate text-xs text-ink-faint">
                      {s.local} · {dataHora(s.criadaEm)}
                    </p>
                  </div>
                  {s.atual ? (
                    <Selo tom="positivo">Sessão atual</Selo>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        encerrarSessao(s.id);
                        avisar('sucesso', 'Sessão encerrada', s.dispositivo);
                      }}
                      className="shrink-0 rounded-xl px-3 py-2 text-xs font-bold text-critico transition hover:bg-critico/10"
                    >
                      Encerrar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </Cartao>

          <Cartao>
            <CabecalhoCartao titulo="Histórico de acessos" icone="history" />
            <ul className="mt-4 divide-y divide-line">
              {base.auditoria
                .filter((a) => a.membroId === membro.id)
                .slice(0, 6)
                .map((a) => (
                  <li key={a.id} className="flex items-center gap-3 py-3">
                    <Icone nome="fingerprint" className="shrink-0 text-[18px] text-ink-faint" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{a.acao}</p>
                      <p className="truncate text-xs text-ink-faint">
                        {a.modulo} · {dataHora(a.em)} · IP {a.ip}
                      </p>
                    </div>
                  </li>
                ))}
              {base.auditoria.filter((a) => a.membroId === membro.id).length === 0 && (
                <li className="py-4 text-sm text-ink-faint">Nenhum registro no período.</li>
              )}
            </ul>
          </Cartao>
        </div>
      )}

      <Confirmacao
        aberto={confirmarSaida}
        aoFechar={() => setConfirmarSaida(false)}
        aoConfirmar={() => {
          encerrarTodasSessoes();
          avisar('sucesso', 'Dispositivos desconectados', 'Apenas esta sessão permanece ativa.');
        }}
        titulo="Encerrar todas as sessões?"
        mensagem="Todos os demais dispositivos conectados à sua conta serão desconectados imediatamente. Esta sessão permanecerá ativa."
        rotuloConfirmar="Encerrar sessões"
        perigo
      />
    </div>
  );

  function SecaoConta() {
    const [nomeExibicao, setNomeExibicao] = useState(membro!.nomeExibicao);
    const [usuario, setUsuario] = useState(membro!.usuario);
    const [email, setEmail] = useState(membro!.email);
    const [telefone, setTelefone] = useState(membro!.telefone);
    const [biografia, setBiografia] = useState(membro!.biografia ?? '');
    const [erros, setErros] = useState<Record<string, string>>({});

    const salvar = (e: React.FormEvent) => {
      e.preventDefault();
      const novos: Record<string, string> = {};
      if (nomeExibicao.trim().length < 2) novos.nomeExibicao = 'Informe ao menos 2 caracteres.';
      if (!/^[a-z0-9._]{3,}$/i.test(usuario)) novos.usuario = 'Use letras, números, ponto ou sublinhado (mín. 3).';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) novos.email = 'Informe um e-mail válido.';
      const duplicado = base.membros.some(
        (m) => m.id !== membro!.id && m.usuario.toLowerCase() === usuario.toLowerCase(),
      );
      if (duplicado) novos.usuario = 'Este nome de usuário já está em uso.';
      setErros(novos);
      if (Object.keys(novos).length > 0) return;

      atualizarPerfil({ nomeExibicao, usuario, email, telefone, biografia });
      avisar('sucesso', 'Dados atualizados', 'Suas informações de conta foram salvas.');
    };

    return (
      <Cartao>
        <CabecalhoCartao titulo="Minha conta" descricao="Identificação usada na plataforma." icone="person" />
        <form onSubmit={salvar} className="mt-5 space-y-4" noValidate>
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface-muted/50 p-4">
            <Avatar nome={membro!.nomeCompleto} fotoUrl={membro!.fotoUrl} tamanho="lg" nivel={membro!.nivel} />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-ink">{membro!.nomeCompleto}</p>
              <p className="text-xs text-ink-faint">
                O nome completo consta do registro oficial e só pode ser alterado pela Secretaria.
              </p>
            </div>
            <Botao
              type="button"
              variante="contorno"
              tamanho="pequeno"
              icone="photo_camera"
              onClick={() => avisar('info', 'Envio de foto', 'O envio de imagem exige o serviço de arquivos da Ordem.')}
            >
              Alterar foto
            </Botao>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Campo rotulo="Nome de exibição" value={nomeExibicao} onChange={(e) => setNomeExibicao(e.target.value)} erro={erros.nomeExibicao} />
            <Campo rotulo="Nome de usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)} erro={erros.usuario} icone="alternate_email" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo rotulo="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} erro={erros.email} icone="mail" />
            <Campo rotulo="Telefone" type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} icone="call" />
          </div>
          <AreaTexto
            rotulo="Biografia"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            dica="Breve apresentação exibida no seu perfil."
          />
          <div className="flex justify-end">
            <Botao type="submit" icone="save">
              Salvar alterações
            </Botao>
          </div>
        </form>
      </Cartao>
    );
  }

  function FormularioPessoais() {
    const [sexo, setSexo] = useState(membro!.sexo);
    const [nascimento, setNascimento] = useState(membro!.dataNascimento.slice(0, 10));
    const [logradouro, setLogradouro] = useState(membro!.endereco.logradouro);
    const [numeroEnd, setNumeroEnd] = useState(membro!.endereco.numero);
    const [bairro, setBairro] = useState(membro!.endereco.bairro);
    const [cep, setCep] = useState(membro!.endereco.cep);
    const [estadoId, setEstadoId] = useState(membro!.estadoId);
    const [municipioId, setMunicipioId] = useState(membro!.municipioId);

    const estados = base.estados.filter((e) => e.paisId === membro!.paisId);
    const municipios = base.municipios.filter((m) => m.estadoId === estadoId);

    const salvar = (e: React.FormEvent) => {
      e.preventDefault();
      atualizarPerfil({
        sexo,
        dataNascimento: nascimento,
        estadoId,
        municipioId,
        endereco: {
          ...membro!.endereco,
          logradouro,
          numero: numeroEnd,
          bairro,
          cep,
          estadoId,
          municipioId,
        },
      });
      atualizar((b) => b);
      avisar('sucesso', 'Dados pessoais atualizados');
    };

    return (
      <form onSubmit={salvar} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Selecao rotulo="Sexo" value={sexo} onChange={(e) => setSexo(e.target.value as typeof sexo)}>
            <option value="nao_informado">Prefiro não informar</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro</option>
          </Selecao>
          <Campo rotulo="Data de nascimento" type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Campo rotulo="Logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
          <Campo rotulo="Número" value={numeroEnd} onChange={(e) => setNumeroEnd(e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo rotulo="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
          <Campo rotulo="CEP" value={cep} onChange={(e) => setCep(e.target.value)} inputMode="numeric" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Selecao
            rotulo="Estado / Província"
            value={estadoId}
            onChange={(e) => {
              setEstadoId(e.target.value);
              setMunicipioId('');
            }}
          >
            {estados.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nome}
              </option>
            ))}
          </Selecao>
          <Selecao rotulo="Município" value={municipioId} onChange={(e) => setMunicipioId(e.target.value)}>
            <option value="">Selecione…</option>
            {municipios.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </Selecao>
        </div>
        <div className="flex justify-end">
          <Botao type="submit" icone="save">
            Salvar dados pessoais
          </Botao>
        </div>
      </form>
    );
  }
}

function Leitura({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="min-w-0">
      <dt className="rotulo">{rotulo}</dt>
      <dd className="mt-1 truncate text-sm font-semibold capitalize text-ink">{valor}</dd>
    </div>
  );
}

function FormularioSenha({
  aoAlterar,
}: {
  aoAlterar: (atual: string, nova: string) => Promise<void>;
}) {
  const { avisar } = useAviso();
  const [atual, setAtual] = useState('');
  const [nova, setNova] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    if (nova !== confirmacao) return setErro('A confirmação não corresponde à nova senha.');
    setEnviando(true);
    try {
      await aoAlterar(atual, nova);
      avisar('sucesso', 'Senha alterada', 'Use a nova senha no próximo acesso.');
      setAtual('');
      setNova('');
      setConfirmacao('');
    } catch (falha) {
      setErro(falha instanceof ErroAuth ? falha.message : 'Não foi possível alterar a senha.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={enviar} className="mt-4 space-y-4" noValidate>
      {erro && (
        <p role="alert" className="flex items-center gap-2 rounded-xl bg-critico/10 p-3 text-sm font-medium text-critico">
          <Icone nome="error" className="text-[17px]" />
          {erro}
        </p>
      )}
      <Campo rotulo="Senha atual" type="password" value={atual} onChange={(e) => setAtual(e.target.value)} autoComplete="current-password" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo rotulo="Nova senha" type="password" value={nova} onChange={(e) => setNova(e.target.value)} autoComplete="new-password" required />
        <Campo rotulo="Confirmar nova senha" type="password" value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} autoComplete="new-password" required />
      </div>
      <div className="flex justify-end">
        <Botao type="submit" icone="lock_reset" carregando={enviando}>
          Alterar senha
        </Botao>
      </div>
    </form>
  );
}
