import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDados } from '@/context/DadosContext';
import type { TipoNotificacao } from '@/types';
import { ItemNotificacao } from '@/components/domain/Itens';
import { Abas, Botao, Cartao, EsqueletoLista, Vazio } from '@/components/ui';
import { CabecalhoPagina } from '@/components/layout/CabecalhoPagina';

type Filtro = 'todas' | 'nao_lidas' | TipoNotificacao;

export function Notificacoes() {
  const { membro } = useAuth();
  const { base, atualizar, carregando } = useDados();
  const [filtro, setFiltro] = useState<Filtro>('todas');

  const minhas = useMemo(
    () =>
      base.notificacoes
        .filter((n) => n.membroId === membro?.id)
        .sort((a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime()),
    [base.notificacoes, membro],
  );

  const lista = useMemo(() => {
    if (filtro === 'todas') return minhas;
    if (filtro === 'nao_lidas') return minhas.filter((n) => !n.lida);
    return minhas.filter((n) => n.tipo === filtro);
  }, [minhas, filtro]);

  const marcarLida = (id: string) =>
    atualizar((b) => ({
      ...b,
      notificacoes: b.notificacoes.map((n) => (n.id === id ? { ...n, lida: true } : n)),
    }));

  const marcarTodas = () =>
    atualizar((b) => ({
      ...b,
      notificacoes: b.notificacoes.map((n) => (n.membroId === membro?.id ? { ...n, lida: true } : n)),
    }));

  const naoLidas = minhas.filter((n) => !n.lida).length;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <CabecalhoPagina
        titulo="Notificações"
        descricao="Comunicados, atividades, mensagens e alterações administrativas."
        acao={
          naoLidas > 0 && (
            <Botao variante="contorno" icone="mark_email_read" onClick={marcarTodas}>
              Marcar todas como lidas
            </Botao>
          )
        }
      />

      <Abas
        itens={[
          { id: 'todas', rotulo: 'Todas', contagem: minhas.length },
          { id: 'nao_lidas', rotulo: 'Não lidas', contagem: naoLidas },
          { id: 'comunicado', rotulo: 'Comunicados' },
          { id: 'evento', rotulo: 'Eventos' },
          { id: 'mensagem', rotulo: 'Mensagens' },
          { id: 'atividade', rotulo: 'Atividades' },
          { id: 'administrativo', rotulo: 'Administrativas' },
        ]}
        ativo={filtro}
        aoMudar={setFiltro}
        rotuloGrupo="Filtros de notificação"
      />

      {carregando ? (
        <EsqueletoLista linhas={5} />
      ) : lista.length === 0 ? (
        <Cartao>
          <Vazio
            icone="notifications_off"
            titulo="Nenhuma notificação"
            descricao="Você está em dia. Novos avisos aparecerão aqui."
          />
        </Cartao>
      ) : (
        <ul className="space-y-2">
          {lista.map((n) => (
            <li key={n.id}>
              <ItemNotificacao notificacao={n} aoAbrir={() => marcarLida(n.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
