import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AppShell } from '@/components/layout/AppShell';

import { Entrar } from '@/pages/auth/Entrar';
import { Cadastro } from '@/pages/auth/Cadastro';
import { CadastroEnviado, RecuperarSenha } from '@/pages/auth/RecuperarSenha';

import { Hoje } from '@/pages/app/Hoje';
import { Feed } from '@/pages/app/Feed';
import { Ranking } from '@/pages/app/Ranking';
import { Perfil } from '@/pages/app/Perfil';
import { PainelUsuario } from '@/pages/app/PainelUsuario';
import { Notificacoes } from '@/pages/app/Notificacoes';
import { Mensagens } from '@/pages/app/Mensagens';
import { Eventos, EventoDetalhe } from '@/pages/app/Eventos';
import { Documentos } from '@/pages/app/Documentos';
import { CursoDetalhe, Formacao } from '@/pages/app/Formacao';
import { Propostas, PropostaDetalhe } from '@/pages/app/Propostas';
import { Configuracoes } from '@/pages/app/Configuracoes';
import { Transparencia } from '@/pages/app/Transparencia';
import { Assembleias, AssembleiaDetalhe } from '@/pages/app/Assembleias';
import { ServicoHonorifico } from '@/pages/app/Servico';
import { Arbitragem } from '@/pages/app/Arbitragem';

import { Secretaria } from '@/pages/admin/Secretaria';
import { Tesouraria } from '@/pages/admin/Tesouraria';
import { Administrador } from '@/pages/admin/Administrador';
import { Membros } from '@/pages/admin/Membros';
import { Nucleos, NucleoDetalhe } from '@/pages/admin/Nucleos';
import { Relatorios } from '@/pages/admin/Relatorios';
import { Permissoes } from '@/pages/admin/Permissoes';
import { Auditoria } from '@/pages/admin/Auditoria';
import { Governanca } from '@/pages/admin/Governanca';
import { Disciplina } from '@/pages/admin/Disciplina';

import { Vazio } from '@/components/ui';
import { BotaoLink } from '@/components/ui/Botao';

/** Barreira de autenticacao: rotas internas exigem sessao ativa. */
function Protegida({ children }: { children: React.ReactNode }) {
  const { autenticado } = useAuth();
  if (!autenticado) return <Navigate to="/entrar" replace />;
  return <>{children}</>;
}

export function App() {
  return (
    <Routes>
      {/* Publicas */}
      <Route path="/entrar" element={<Entrar />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastro-enviado" element={<CadastroEnviado />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />

      {/* Internas */}
      <Route
        element={
          <Protegida>
            <AppShell />
          </Protegida>
        }
      >
        <Route path="/" element={<Navigate to="/hoje" replace />} />
        <Route path="/hoje" element={<Hoje />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/propostas" element={<Propostas />} />
        <Route path="/propostas/:id" element={<PropostaDetalhe />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/membros/:id" element={<Perfil />} />
        <Route path="/painel" element={<PainelUsuario />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/mensagens" element={<Mensagens />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/:id" element={<EventoDetalhe />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/formacao" element={<Formacao />} />
        <Route path="/formacao/:id" element={<CursoDetalhe />} />
        <Route path="/meu-nucleo" element={<NucleoDetalhe proprio />} />
        <Route path="/assembleias" element={<Assembleias />} />
        <Route path="/assembleias/:id" element={<AssembleiaDetalhe />} />
        <Route path="/leitourgia" element={<ServicoHonorifico />} />
        <Route path="/arbitragem" element={<Arbitragem />} />
        <Route path="/transparencia" element={<Transparencia />} />
        <Route path="/configuracoes" element={<Configuracoes />} />

        {/* Administrativas — cada pagina aplica sua propria verificacao de permissao */}
        <Route path="/admin" element={<Administrador />} />
        <Route path="/secretaria" element={<Secretaria />} />
        <Route path="/tesouraria" element={<Tesouraria />} />
        <Route path="/membros" element={<Membros />} />
        <Route path="/nucleos" element={<Nucleos />} />
        <Route path="/nucleos/:id" element={<NucleoDetalhe />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/permissoes" element={<Permissoes />} />
        <Route path="/governanca" element={<Governanca />} />
        <Route path="/disciplina" element={<Disciplina />} />
        <Route path="/auditoria" element={<Auditoria />} />

        <Route
          path="*"
          element={
            <Vazio
              icone="explore_off"
              titulo="Página não encontrada"
              descricao="O endereço acessado não existe ou foi movido."
              acao={<BotaoLink para="/hoje" icone="home">Voltar ao início</BotaoLink>}
            />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/entrar" replace />} />
    </Routes>
  );
}
