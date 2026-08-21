import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useDados, novoId } from './DadosContext';
import { CHAVES, gravar, ler, remover } from '@/lib/armazenamento';
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

export function ProvedorAuth({ children }: { children: ReactNode }) {
  const { base, atualizar, auditar } = useDados();
  const [membroId, setMembroId] = useState<ID | null>(() => ler<ID | null>(CHAVES.sessao, null));

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
    [base.membros, atualizar, auditar],
  );

  /** Troca rapida de perfil — usada apenas na vitrine de demonstracao. */
  const entrarComo = useCallback(
    (id: ID) => {
      setMembroId(id);
      gravar(CHAVES.sessao, id);
    },
    [],
  );

  const sair = useCallback(() => {
    if (membroId) {
      auditar({ membroId, acao: 'Encerrou a sessão', modulo: 'Autenticação', detalhe: 'Logout solicitado pelo membro.' });
    }
    setMembroId(null);
    remover(CHAVES.sessao);
  }, [membroId, auditar]);

  const cadastrar = useCallback<ValorAuth['cadastrar']>(
    async (dados) => {
      await new Promise((r) => setTimeout(r, 520));
      const existente = base.membros.some(
        (m) => m.email.toLowerCase() === dados.email.trim().toLowerCase(),
      );
      if (existente) throw new ErroAuth('Já existe um cadastro com este e-mail.');

      const id = novoId('me');
      const usuarioBase = dados.nomeCompleto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(/\s+/)
        .filter(Boolean);
      const usuario = `${usuarioBase[0] ?? 'membro'}${usuarioBase[usuarioBase.length - 1] ?? ''}`;

      const novo: Membro = {
        id,
        numeroMembro: dados.numeroMembro?.trim() || `AO-${30000 + base.membros.length * 17}`,
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

      atualizar((b) => ({ ...b, membros: [...b.membros, novo] }));
      auditar({
        membroId: id,
        acao: 'Solicitou cadastro',
        modulo: 'Secretaria',
        detalhe: `Novo cadastro aguardando aprovação: ${novo.nomeCompleto} (${novo.numeroMembro}).`,
      });
      return novo;
    },
    [base.membros, atualizar, auditar],
  );

  const recuperarSenha = useCallback<ValorAuth['recuperarSenha']>(async (email) => {
    await new Promise((r) => setTimeout(r, 600));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new ErroAuth('Informe um endereço de e-mail válido.');
    }
    // Resposta sempre generica: nao revela se o e-mail existe na base.
  }, []);

  const alterarSenha = useCallback<ValorAuth['alterarSenha']>(
    async (atual, nova) => {
      await new Promise((r) => setTimeout(r, 480));
      if (atual !== SENHA_DEMONSTRACAO) throw new ErroAuth('A senha atual está incorreta.');
      if (nova.length < 8) throw new ErroAuth('A nova senha deve ter ao menos 8 caracteres.');
      if (membroId) {
        auditar({ membroId, acao: 'Alterou a senha', modulo: 'Segurança', detalhe: 'Senha redefinida pelo próprio membro.' });
      }
    },
    [membroId, auditar],
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
    atualizar((b) => ({
      ...b,
      sessoes: b.sessoes.filter((s) => s.membroId !== membroId || s.atual),
    }));
    auditar({ membroId, acao: 'Encerrou todos os dispositivos', modulo: 'Segurança', detalhe: 'Todas as demais sessões foram revogadas.' });
  }, [membroId, atualizar, auditar]);

  const valor = useMemo<ValorAuth>(
    () => ({
      membro,
      cargo,
      autenticado: Boolean(membro),
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
      membro, cargo, base.cargos, entrar, entrarComo, sair, cadastrar, recuperarSenha,
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
