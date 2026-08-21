<?php
declare(strict_types=1);

/**
 * Entrada, saída e cuidado com a senha.
 *
 * O que orienta este arquivo: uma resposta de erro nunca revela se um
 * endereço existe no quadro da Ordem. Quem tenta adivinhar contas recebe
 * sempre a mesma frase, no mesmo tempo aproximado.
 */

namespace OMCL;

return static function (Roteador $r): void {

    // -----------------------------------------------------------------
    // Entrar
    // -----------------------------------------------------------------
    $r->post('/sessao', static function (array $_p, Requisicao $req): never {
        Seguranca::limitarPorOrigem('entrar');

        $identificacao = mb_strtolower($req->texto('identificacao', true, 190));
        $senha = $req->senha('senha');
        $req->conferir();

        $chaveConta = 'entrar:conta:' . $identificacao;
        if (Seguranca::tentativasRecentes($chaveConta) >= Seguranca::TENTATIVAS_ATE_TRAVA) {
            Resposta::erro('Muitas tentativas para esta conta. Aguarde alguns minutos.', 429);
        }

        $membro = Banco::primeiro(
            'SELECT * FROM {P}membros WHERE email = ? OR usuario = ? LIMIT 1',
            [$identificacao, $identificacao],
        );

        $recusar = static function (?string $membroId) use ($chaveConta): never {
            Seguranca::registrarTentativa($chaveConta);
            Auditoria::registrar($membroId, 'sessao.recusada', 'seguranca');
            Resposta::erro('Credenciais não conferem.', 401);
        };

        if ($membro === null) {
            // Gasta o mesmo tempo de uma verificação real, para que a
            // duração da resposta não denuncie a existência da conta.
            password_verify($senha, '$2y$12$usuarioinexistenteusuarioinexistenteusuarioinexiste12345678');
            $recusar(null);
        }

        if ($membro['bloqueado_ate'] !== null && $membro['bloqueado_ate'] > gmdate('Y-m-d H:i:s')) {
            Resposta::erro('Conta temporariamente bloqueada por tentativas seguidas. Tente mais tarde.', 429);
        }

        if (!Seguranca::conferirSenha($senha, (string) $membro['senha_hash'])) {
            $falhas = (int) $membro['tentativas_falhas'] + 1;
            $campos = ['tentativas_falhas' => $falhas];
            if ($falhas >= Seguranca::TENTATIVAS_ATE_TRAVA) {
                $campos['bloqueado_ate'] = gmdate('Y-m-d H:i:s', time() + Seguranca::MINUTOS_TRAVA * 60);
                $campos['tentativas_falhas'] = 0;
            }
            Banco::atualizar('membros', $campos, 'id = :id', ['id' => $membro['id']]);
            $recusar((string) $membro['id']);
        }

        if (in_array($membro['situacao'], ['desligado', 'inativo'], true)) {
            Auditoria::registrar((string) $membro['id'], 'sessao.recusada.situacao', 'seguranca', (string) $membro['situacao']);
            Resposta::erro('Este cadastro não está ativo. Procure a Secretaria.', 403);
        }
        if ($membro['situacao'] === 'suspenso') {
            // Est. Art. 64: a suspensão retira o exercício dos direitos
            // associativos, e com ele o acesso às áreas internas.
            Resposta::erro('Cadastro suspenso. Procure a Secretaria da Ordem.', 403);
        }
        if ($membro['situacao'] === 'pendente') {
            Resposta::erro('Cadastro ainda em análise pela Secretaria.', 403);
        }

        // A senha pode ter sido cifrada por um algoritmo mais fraco em uma
        // instalação antiga: aproveita-se o único momento em que ela existe
        // em texto claro para recifrá-la.
        if (Seguranca::precisaRecifrar((string) $membro['senha_hash'])) {
            Banco::atualizar('membros', ['senha_hash' => Seguranca::cifrarSenha($senha)], 'id = :id', ['id' => $membro['id']]);
        }

        Banco::atualizar('membros', [
            'tentativas_falhas' => 0,
            'bloqueado_ate'     => null,
            'ultimo_acesso'     => gmdate('Y-m-d H:i:s'),
        ], 'id = :id', ['id' => $membro['id']]);

        $sessao = Seguranca::abrirSessao((string) $membro['id']);
        Auditoria::registrar((string) $membro['id'], 'sessao.abriu', 'seguranca');
        Seguranca::podarTentativas();

        Resposta::ok([
            'membro'    => Membros::paraCliente($membro, $membro),
            'csrf'      => $sessao['csrf'],
            'expira_em' => $sessao['expira_em'],
        ]);
    });

    // -----------------------------------------------------------------
    // Quem sou eu
    // -----------------------------------------------------------------
    $r->get('/sessao', static function (): never {
        $s = Seguranca::sessao();
        if ($s === null) {
            Resposta::json(['ok' => true, 'dados' => null]);
        }
        $token = Seguranca::tokenRecebido();
        Resposta::ok([
            'membro'     => Membros::paraCliente($s, $s),
            'csrf'       => $token === null ? null : Seguranca::csrfDoToken($token),
            'permissoes' => Rbac::permissoesDe($s),
            'cargo'      => Rbac::cargo($s['cargo_id']),
            'expira_em'  => gmdate('c', strtotime((string) $s['expira_em'])),
        ]);
    });

    // -----------------------------------------------------------------
    // Sair
    // -----------------------------------------------------------------
    $r->delete('/sessao', static function (): never {
        $s = Seguranca::sessao();
        Seguranca::encerrarSessao();
        if ($s !== null) {
            Auditoria::registrar((string) $s['id'], 'sessao.encerrou', 'seguranca');
        }
        Resposta::ok();
    });

    /** Encerra as demais sessões — útil depois de usar um dispositivo alheio. */
    $r->delete('/sessao/outras', static function (): never {
        $s = Seguranca::exigirSessao();
        Banco::executar(
            'UPDATE {P}sessoes SET revogada_em = ? WHERE membro_id = ? AND id <> ? AND revogada_em IS NULL',
            [gmdate('Y-m-d H:i:s'), $s['id'], $s['sessao_id']],
        );
        Auditoria::registrar((string) $s['id'], 'sessao.encerrou.outras', 'seguranca');
        Resposta::ok();
    });

    $r->get('/sessao/dispositivos', static function (): never {
        $s = Seguranca::exigirSessao();
        $linhas = Banco::todos(
            'SELECT id, dispositivo, ip, criada_em, expira_em FROM {P}sessoes
              WHERE membro_id = ? AND revogada_em IS NULL AND expira_em > ?
              ORDER BY criada_em DESC',
            [$s['id'], gmdate('Y-m-d H:i:s')],
        );
        foreach ($linhas as &$l) {
            $l['atual'] = $l['id'] === $s['sessao_id'];
        }
        Resposta::ok($linhas);
    });

    // -----------------------------------------------------------------
    // Trocar a própria senha
    // -----------------------------------------------------------------
    $r->post('/sessao/senha', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $atual = $req->senha('senha_atual');
        $nova = $req->senha('senha_nova');
        $req->conferir();

        if (!Seguranca::conferirSenha($atual, (string) $s['senha_hash'])) {
            Seguranca::registrarTentativa('senha:conta:' . $s['id']);
            Resposta::erro('A senha atual não confere.', 401);
        }
        $faltas = Seguranca::criticarSenha($nova, (string) $s['email'], (string) $s['nome_completo']);
        if ($faltas !== []) {
            $req->rejeitar('senha_nova', implode(' ', $faltas));
        }

        Banco::atualizar('membros', ['senha_hash' => Seguranca::cifrarSenha($nova)], 'id = :id', ['id' => $s['id']]);
        // Trocar a senha derruba os demais aparelhos: é o gesto de quem
        // suspeita que alguém entrou.
        Banco::executar(
            'UPDATE {P}sessoes SET revogada_em = ? WHERE membro_id = ? AND id <> ? AND revogada_em IS NULL',
            [gmdate('Y-m-d H:i:s'), $s['id'], $s['sessao_id']],
        );
        Auditoria::registrar((string) $s['id'], 'senha.alterou', 'seguranca');
        Resposta::ok();
    });

    // -----------------------------------------------------------------
    // Recuperação
    // -----------------------------------------------------------------
    $r->post('/sessao/recuperar', static function (array $_p, Requisicao $req): never {
        Seguranca::limitarPorOrigem('recuperar');
        $email = $req->email('email');
        $req->conferir();

        $membro = Banco::primeiro('SELECT id, nome_exibicao, email, situacao FROM {P}membros WHERE email = ?', [$email]);
        if ($membro !== null && !in_array($membro['situacao'], ['desligado', 'inativo'], true)) {
            $token = Seguranca::tokenAleatorio();
            Banco::inserir('recuperacoes', [
                'id'         => Seguranca::uuid(),
                'membro_id'  => $membro['id'],
                'token_hash' => Seguranca::resumo($token),
                'criado_em'  => gmdate('Y-m-d H:i:s'),
                'expira_em'  => gmdate('Y-m-d H:i:s', time() + 3600),
                'ip'         => Seguranca::ip(),
            ]);
            Auditoria::registrar((string) $membro['id'], 'senha.recuperacao.pediu', 'seguranca');
            Correio::enviarRecuperacao((string) $membro['email'], (string) $membro['nome_exibicao'], $token);
        }

        // A mesma resposta em qualquer caso: o formulário não serve para
        // descobrir quem pertence à Ordem.
        Resposta::ok(null, ['mensagem' => 'Se o endereço constar do quadro, as instruções foram enviadas.']);
    });

    $r->post('/sessao/redefinir', static function (array $_p, Requisicao $req): never {
        Seguranca::limitarPorOrigem('redefinir');
        $token = $req->texto('token', true, 100);
        $nova = $req->senha('senha');
        $req->conferir();

        $pedido = Banco::primeiro(
            'SELECT r.*, m.email, m.nome_completo FROM {P}recuperacoes r
               JOIN {P}membros m ON m.id = r.membro_id
              WHERE r.token_hash = ? AND r.usado_em IS NULL AND r.expira_em > ?',
            [Seguranca::resumo($token), gmdate('Y-m-d H:i:s')],
        );
        if ($pedido === null) {
            Resposta::erro('Este link expirou ou já foi usado. Peça outro.', 410);
        }

        $faltas = Seguranca::criticarSenha($nova, (string) $pedido['email'], (string) $pedido['nome_completo']);
        if ($faltas !== []) {
            $req->rejeitar('senha', implode(' ', $faltas));
        }

        Banco::transacao(static function () use ($pedido, $nova): void {
            Banco::atualizar('membros', [
                'senha_hash'        => Seguranca::cifrarSenha($nova),
                'tentativas_falhas' => 0,
                'bloqueado_ate'     => null,
            ], 'id = :id', ['id' => $pedido['membro_id']]);
            Banco::atualizar('recuperacoes', ['usado_em' => gmdate('Y-m-d H:i:s')], 'id = :id', ['id' => $pedido['id']]);
            // Os demais pedidos pendentes perdem a validade junto.
            Banco::executar(
                'UPDATE {P}recuperacoes SET usado_em = ? WHERE membro_id = ? AND usado_em IS NULL',
                [gmdate('Y-m-d H:i:s'), $pedido['membro_id']],
            );
            Seguranca::encerrarTodasAsSessoes((string) $pedido['membro_id']);
        });

        Auditoria::registrar((string) $pedido['membro_id'], 'senha.redefiniu', 'seguranca');
        Resposta::ok();
    });
};
