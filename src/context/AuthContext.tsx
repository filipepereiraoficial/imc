import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useDados, novoId } from './DadosContext';
import { useServidor } from './ServidorContext';
import { CHAVES, gravar, ler, remover } from '@/lib/armazenamento';
import { api, definirCsrf, ErroApi } from '@/lib/api';
import { cargoDaApi, grauDaApi, membroDaApi } from '@/lib/mapear';
import type { MembroApi } from '@/lib/mapear';
import { pode as podeRBAC, possui, possuiAlguma } from '@/lib/rbac';
import type { Alvo } from '@/lib/rbac';
import type { Cargo, ID, Membro, Permissao, PreferenciasPrivacidade } from '@/types';

/** Senha unica das contas de demonstracao. */
export const SENHA_DEMONSTRACAO = 'ordem2026';

export interface DadosCadastro {
  nomeCompleto: string;
  nomeExibicao: string;
  email: string;
  telefone: string;
  senha: string;
  sexo: Membro['sexo'];
  dataNascimento: string;
  paisId: ID;
  estadoId: ID;
  municipioId: ID;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  nucleoId: ID | null;
  numeroMembro?: string;
}

export type ModoAprovacao = 'automatica' | 'secretaria' | 'administrador';

interface ValorAuth {
  membro: Membro | null;
  cargo: Cargo | undefined;
  autenticado: boolean;
  /**
   * A sessao guardada no cookie ainda esta sendo conferida com o servidor.
   *
   * Enquanto for verdadeiro nao se sabe se ha sessao: mandar o visitante
   * para a tela de entrada aqui o expulsaria a cada recarga de pagina.
   */
  restaurando: boolean;
  entrar: (email: string, senha: string, lembrar: boolean) => Promise<void>;
  entrarComo: (membroId: ID) => void;
  sair: () => void;
  cadastrar: (dados: DadosCadastro) => Promise<Membro>;
  recuperarSenha: (email: string) => Promise<void>;
  alterarSenha: (atual: string, nova: string) => Promise<void>;
  atualizarPerfil: (mudancas: Partial<Membro>) => void;
  atualizarPrivacidade: (mudancas: Partial<PreferenciasPrivacidade>) => void;
  encerrarSessao: (sessaoId: ID) => void;
  encerrarTodasSessoes: () => void;
  /** Permissao + escopo territorial. */
  pode: (permissao: Permissao, alvo?: Alvo) => boolean;
  /** Apenas posse da permissao (para exibir menus). */
  tem: (permissao: Permissao) => boolean;
  temAlguma: (permissoes: Permissao[]) => boolean;
}

const Contexto = createContext<ValorAuth | null>(null);

/** Erro de autenticacao com mensagem apresentavel ao usuario. */
export class ErroAuth extends Error {}

/**
 * Monta o registro de um postulante a partir do formulario.
 *
 * Vive fora do provedor porque os dois modos precisam dela: em demonstracao
 * o registro entra na base local; com back-end, serve so para devolver a
 * tela o que ela acabou de enviar — o cadastro de verdade e o do servidor.
 */
function esbocoDeMembro(dados: DadosCadastro, id: ID, quantidade: number): Membro {
  const usuarioBase = dados.nomeCompleto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  const usuario = `${usuarioBase[0] ?? 'membro'}${usuarioBase[usuarioBase.length - 1] ?? ''}`;

  return {
    id,
    numeroMembro: dados.numeroMembro?.trim() || `AO-${30000 + quantidade * 17}`,
    nomeCompleto: dados.nomeCompleto.trim(),
    nomeExibicao: dados.nomeExibicao.trim() || dados.nomeCompleto.split(' ').slice(0, 2).join(' '),
    usuario,
    email: dados.email.trim().toLowerCase(),
    telefone: dados.telefone,
    sexo: dados.sexo,
    dataNascimento: dados.dataNascimento,
    endereco: {
      logradouro: dados.logradouro,
      numero: dados.numero,
      bairro: dados.bairro,
      cep: dados.cep,
      municipioId: dados.municipioId,
      estadoId: dados.estadoId,
      paisId: dados.paisId,
    },
    paisId: dados.paisId,
    estadoId: dados.estadoId,
    municipioId: dados.municipioId,
    nucleoId: dados.nucleoId,
    cargoId: 'cargo-candidato',
    categoriaAssociativa: 'transicao',
    grauId: 'grau-recruta',
    titulos: [],
    situacao: 'pendente',
    dataIngresso: new Date().toISOString(),
    interessesFilosoficos: [],
    areasAtuacao: [],
    competencias: [],
    xp: 0,
    nivel: 1,
    sequenciaDias: 0,
    aliados: [],
    conquistas: [],
    privacidade: {
      email: 'administracao',
      telefone: 'nucleo',
      endereco: 'administracao',
      dataNascimento: 'nucleo',
      perfil: 'publico',
      publicacoes: 'publico',
    },
    autenticacaoDoisFatores: false,
  };
}

export function ProvedorAuth({ children }: { children: ReactNode }) {
  const { base, atualizar, auditar } = useDados();
  const { noServidor, procurando } = useServidor();
  const [membroId, setMembroId] = useState<ID | null>(() => ler<ID | null>(CHAVES.sessao, null));
  // A escala de niveis entra por referencia para que `absorver` mantenha a
  // mesma identidade entre renderizacoes. Sem isso, cada mudanca na base
  // recriaria a funcao, e o efeito que retoma a sessao se cancelaria a si
  // mesmo no meio do caminho.
  const niveis = useRef(base.niveis);
  niveis.current = base.niveis;

  /**
   * Absorve o que o servidor devolveu.
   *
   * Cargos e graus vindos da API substituem os locais: as permissoes que a
   * interface usa para decidir o que exibir passam a ser as mesmas que o
   * servidor aplica, e nao uma copia que poderia divergir. O membro e
   * inserido na base local para que as telas ja escritas continuem lendo de
   * um lugar so.
   */
  const absorver = useCallback(
    (bruto: MembroApi, referencias?: { cargos?: unknown[]; graus?: unknown[] }) => {
      const convertido = membroDaApi(bruto, niveis.current);
      atualizar((b) => ({
        ...b,
        cargos: referencias?.cargos
          ? (referencias.cargos as Record<string, unknown>[]).map(cargoDaApi)
          : b.cargos,
        graus: referencias?.graus
          ? (referencias.graus as Record<string, unknown>[]).map(grauDaApi)
          : b.graus,
        membros: b.membros.some((m) => m.id === convertido.id)
          ? b.membros.map((m) => (m.id === convertido.id ? { ...m, ...convertido } : m))
          : [...b.membros, convertido],
      }));
      return convertido;
    },
    [atualizar],
  );

  /**
   * Retoma a sessao guardada no cookie.
   *
   * O cookie e httpOnly: a aplicacao nao consegue le-lo, so perguntar ao
   * servidor se ainda vale. E dai que sai o token anti-CSRF desta aba.
   */
  const [restaurando, setRestaurando] = useState(true);
  const jaRetomou = useRef(false);
  useEffect(() => {
    if (procurando) return;
    if (!noServidor) {
      // Em demonstracao a sessao ja veio do armazenamento local, de forma
      // sincrona: nao ha o que esperar.
      setRestaurando(false);
      return;
    }
    if (jaRetomou.current) return;
    jaRetomou.current = true;

    (async () => {
      try {
        const sessao = await api.get<{ membro: MembroApi; csrf: string | null } | null>('/sessao');
        if (!sessao.dados) {
          setMembroId(null);
          return;
        }
        definirCsrf(sessao.dados.csrf);
        const referencias = await api.get<{ cargos: unknown[]; graus: unknown[] }>('/referencias');
        const membro = absorver(sessao.dados.membro, referencias.dados);
        setMembroId(membro.id);
      } catch {
        // Sem sessao valida a aplicacao segue na tela de entrada.
        setMembroId(null);
      } finally {
        setRestaurando(false);
      }
    })();
  }, [procurando, noServidor, absorver]);

  const membro = useMemo(
    () => base.membros.find((m) => m.id === membroId) ?? null,
    [base.membros, membroId],
  );
  const cargo = useMemo(
    () => base.cargos.find((c) => c.id === membro?.cargoId),
    [base.cargos, membro],
  );

  const entrar = useCallback<ValorAuth['entrar']>(
    async (email, senha, lembrar) => {
      if (noServidor) {
        let resposta;
        try {
          resposta = await api.post<{ membro: MembroApi; csrf: string }>('/sessao', {
            identificacao: email.trim(),
            senha,
          });
        } catch (e) {
          throw new ErroAuth(e instanceof ErroApi ? e.message : 'Não foi possível entrar.');
        }
        definirCsrf(resposta.dados!.csrf);
        const referencias = await api.get<{ cargos: unknown[]; graus: unknown[] }>('/referencias');
        const membro = absorver(resposta.dados!.membro, referencias.dados);
        setMembroId(membro.id);
        // A sessao vive no cookie do servidor; o que se guarda aqui e apenas
        // a preferencia de retomar sozinho na proxima visita.
        gravar(CHAVES.lembrar, lembrar);
        return;
      }

      await new Promise((r) => setTimeout(r, 420));
      const alvo = base.membros.find(
        (m) => m.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (!alvo || senha !== SENHA_DEMONSTRACAO) {
        throw new ErroAuth('E-mail ou senha incorretos. Verifique os dados e tente novamente.');
      }
      if (alvo.situacao === 'suspenso') {
        throw new ErroAuth('Membresia suspensa. Procure a Secretaria da sua instância.');
      }
      if (alvo.situacao === 'desligado' || alvo.situacao === 'inativo') {
        throw new ErroAuth('Cadastro inativo. Solicite a reativação à Secretaria.');
      }
      setMembroId(alvo.id);
      if (lembrar) gravar(CHAVES.sessao, alvo.id);
      gravar(CHAVES.lembrar, lembrar);
      atualizar((b) => ({
        ...b,
        membros: b.membros.map((m) =>
          m.id === alvo.id ? { ...m, ultimoAcesso: new Date().toISOString() } : m,
        ),
      }));
      auditar({ membroId: alvo.id, acao: 'Entrou na plataforma', modulo: 'Autenticação', detalhe: 'Sessão iniciada por e-mail e senha.' });
    },
    [base.membros, atualizar, auditar, noServidor, absorver],
  );

  /** Troca rapida de perfil — usada apenas na vitrine de demonstracao. */
  const entrarComo = useCallback(
    (id: ID) => {
      // Trocar de perfil sem credencial e recurso da vitrine. Com back-end
      // seria uma porta aberta para assumir a identidade de outro membro.
      if (noServidor) return;
      setMembroId(id);
      gravar(CHAVES.sessao, id);
    },
    [noServidor],
  );

  const sair = useCallback(() => {
    if (noServidor) {
      void api.delete('/sessao').catch(() => undefined);
      definirCsrf(null);
    }
    if (membroId) {
      auditar({ membroId, acao: 'Encerrou a sessão', modulo: 'Autenticação', detalhe: 'Logout solicitado pelo membro.' });
    }
    setMembroId(null);
    remover(CHAVES.sessao);
  }, [membroId, auditar, noServidor]);

  const cadastrar = useCallback<ValorAuth['cadastrar']>(
    async (dados) => {
      if (noServidor) {
        const usuario = dados.email.trim().toLowerCase().split('@')[0].replace(/[^a-z0-9._-]/g, '');
        try {
          await api.post('/cadastro', {
            nomeCompleto: dados.nomeCompleto.trim(),
            email: dados.email.trim().toLowerCase(),
            usuario: usuario.length >= 3 ? usuario : `membro${Date.now().toString(36).slice(-5)}`,
            senha: dados.senha,
            telefone: dados.telefone,
            nucleoId: dados.nucleoId,
          });
        } catch (e) {
          if (e instanceof ErroApi) {
            const primeiro = Object.values(e.campos)[0];
            throw new ErroAuth(primeiro ?? e.message);
          }
          throw new ErroAuth('Não foi possível enviar o cadastro.');
        }
        // O servidor nao devolve o registro criado: o Est. Art. 17 sujeita a
        // admissao a deferimento, e ate la nao ha membro a exibir.
        return esbocoDeMembro(dados, novoId('me'), base.membros.length);
      }

      await new Promise((r) => setTimeout(r, 520));
      const existente = base.membros.some(
        (m) => m.email.toLowerCase() === dados.email.trim().toLowerCase(),
      );
      if (existente) throw new ErroAuth('Já existe um cadastro com este e-mail.');

      const id = novoId('me');
      const novo = esbocoDeMembro(dados, id, base.membros.length);

      atualizar((b) => ({ ...b, membros: [...b.membros, novo] }));
      auditar({
        membroId: id,
        acao: 'Solicitou cadastro',
        modulo: 'Secretaria',
        detalhe: `Novo cadastro aguardando aprovação: ${novo.nomeCompleto} (${novo.numeroMembro}).`,
      });
      return novo;
    },
    [base.membros, atualizar, auditar, noServidor],
  );

  const recuperarSenha = useCallback<ValorAuth['recuperarSenha']>(
    async (email) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        throw new ErroAuth('Informe um endereço de e-mail válido.');
      }
      if (noServidor) {
        try {
          await api.post('/sessao/recuperar', { email: email.trim().toLowerCase() });
        } catch (e) {
          throw new ErroAuth(e instanceof ErroApi ? e.message : 'Não foi possível enviar o pedido.');
        }
        return;
      }
      await new Promise((r) => setTimeout(r, 600));
      // Resposta sempre generica: nao revela se o e-mail existe na base.
    },
    [noServidor],
  );

  const alterarSenha = useCallback<ValorAuth['alterarSenha']>(
    async (atual, nova) => {
      if (noServidor) {
        try {
          await api.post('/sessao/senha', { senha_atual: atual, senha_nova: nova });
        } catch (e) {
          if (e instanceof ErroApi) {
            throw new ErroAuth(Object.values(e.campos)[0] ?? e.message);
          }
          throw new ErroAuth('Não foi possível alterar a senha.');
        }
        return;
      }

      await new Promise((r) => setTimeout(r, 480));
      if (atual !== SENHA_DEMONSTRACAO) throw new ErroAuth('A senha atual está incorreta.');
      if (nova.length < 8) throw new ErroAuth('A nova senha deve ter ao menos 8 caracteres.');
      if (membroId) {
        auditar({ membroId, acao: 'Alterou a senha', modulo: 'Segurança', detalhe: 'Senha redefinida pelo próprio membro.' });
      }
    },
    [membroId, auditar, noServidor],
  );

  const atualizarPerfil = useCallback<ValorAuth['atualizarPerfil']>(
    (mudancas) => {
      if (!membroId) return;
      atualizar((b) => ({
        ...b,
        membros: b.membros.map((m) => (m.id === membroId ? { ...m, ...mudancas } : m)),
      }));
      auditar({ membroId, acao: 'Atualizou o perfil', modulo: 'Painel do Usuário', detalhe: `Campos alterados: ${Object.keys(mudancas).join(', ')}.` });
    },
    [membroId, atualizar, auditar],
  );

  const atualizarPrivacidade = useCallback<ValorAuth['atualizarPrivacidade']>(
    (mudancas) => {
      if (!membroId) return;
      atualizar((b) => ({
        ...b,
        membros: b.membros.map((m) =>
          m.id === membroId ? { ...m, privacidade: { ...m.privacidade, ...mudancas } } : m,
        ),
      }));
      auditar({ membroId, acao: 'Alterou a privacidade', modulo: 'Painel do Usuário', detalhe: `Preferências: ${Object.keys(mudancas).join(', ')}.` });
    },
    [membroId, atualizar, auditar],
  );

  const encerrarSessao = useCallback(
    (sessaoId: ID) => {
      atualizar((b) => ({ ...b, sessoes: b.sessoes.filter((s) => s.id !== sessaoId) }));
      if (membroId) {
        auditar({ membroId, acao: 'Encerrou dispositivo', modulo: 'Segurança', detalhe: `Sessão ${sessaoId} revogada.` });
      }
    },
    [atualizar, membroId, auditar],
  );

  const encerrarTodasSessoes = useCallback(() => {
    if (!membroId) return;
    if (noServidor) {
      void api.delete('/sessao/outras').catch(() => undefined);
    }
    atualizar((b) => ({
      ...b,
      sessoes: b.sessoes.filter((s) => s.membroId !== membroId || s.atual),
    }));
    auditar({ membroId, acao: 'Encerrou todos os dispositivos', modulo: 'Segurança', detalhe: 'Todas as demais sessões foram revogadas.' });
  }, [membroId, atualizar, auditar, noServidor]);

  const valor = useMemo<ValorAuth>(
    () => ({
      membro,
      cargo,
      autenticado: Boolean(membro),
      restaurando,
      entrar,
      entrarComo,
      sair,
      cadastrar,
      recuperarSenha,
      alterarSenha,
      atualizarPerfil,
      atualizarPrivacidade,
      encerrarSessao,
      encerrarTodasSessoes,
      pode: (permissao, alvo) => podeRBAC(base.cargos, membro, permissao, alvo),
      tem: (permissao) => possui(base.cargos, membro, permissao),
      temAlguma: (permissoes) => possuiAlguma(base.cargos, membro, permissoes),
    }),
    [
      membro, cargo, restaurando, base.cargos, entrar, entrarComo, sair, cadastrar, recuperarSenha,
      alterarSenha, atualizarPerfil, atualizarPrivacidade, encerrarSessao, encerrarTodasSessoes,
    ],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useAuth(): ValorAuth {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error('useAuth precisa estar dentro de <ProvedorAuth>');
  return ctx;
}
