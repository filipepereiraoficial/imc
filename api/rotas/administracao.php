<?php
declare(strict_types=1);

/**
 * Auditoria, cargos e configuração da plataforma.
 *
 * Rotas de quem administra. Duas regras se repetem: a auditoria é somente
 * leitura, e a alteração de permissões nunca pode aumentar o poder de quem a
 * faz — nem diretamente, nem pela porta do cargo de sistema.
 */

namespace OMCL;

return static function (Roteador $r): void {

    // -----------------------------------------------------------------
    // Auditoria — Est. Art. 13
    // -----------------------------------------------------------------
    $r->get('/auditoria', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'auditoria.visualizar');

        $condicoes = [];
        $parametros = [];
        if ($req->tem('modulo')) {
            $condicoes[] = 'a.modulo = ?';
            $parametros[] = $req->texto('modulo', false, 60);
        }
        if ($req->tem('membroId')) {
            $condicoes[] = 'a.membro_id = ?';
            $parametros[] = $req->id('membroId');
        }
        if ($req->tem('de')) {
            $condicoes[] = 'a.em >= ?';
            $parametros[] = $req->data('de') . ' 00:00:00';
        }
        if ($req->tem('ate')) {
            $condicoes[] = 'a.em <= ?';
            $parametros[] = $req->data('ate') . ' 23:59:59';
        }
        $req->conferir();

        $onde = $condicoes === [] ? '' : ' WHERE ' . implode(' AND ', $condicoes);
        $pagina = max(1, $req->inteiro('pagina', false, 1, 10000) ?: 1);
        $porPagina = 100;

        $total = (int) Banco::valor('SELECT COUNT(*) FROM {P}auditoria a' . $onde, $parametros);
        $linhas = Banco::todos(
            'SELECT a.id, a.acao, a.modulo, a.detalhe, a.ip, a.em, a.membro_id,
                    m.nome_exibicao AS membro_nome
               FROM {P}auditoria a LEFT JOIN {P}membros m ON m.id = a.membro_id' . $onde . '
              ORDER BY a.em DESC, a.id DESC LIMIT ' . $porPagina . ' OFFSET ' . (($pagina - 1) * $porPagina),
            $parametros,
        );

        Resposta::ok(array_map(static fn (array $a) => [
            'id'         => (int) $a['id'],
            'acao'       => $a['acao'],
            'modulo'     => $a['modulo'],
            'detalhe'    => $a['detalhe'],
            'ip'         => $a['ip'],
            'em'         => $a['em'],
            'membroId'   => $a['membro_id'],
            'membroNome' => $a['membro_nome'],
        ], $linhas), ['total' => $total, 'pagina' => $pagina, 'porPagina' => $porPagina]);
    });

    // -----------------------------------------------------------------
    // Cargos e permissões
    // -----------------------------------------------------------------
    $r->put('/cargos/:id/permissoes', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'permissoes.gerenciar');

        $cargo = Rbac::cargo($p['id']);
        if ($cargo === null) {
            Resposta::naoEncontrado('Cargo não encontrado.');
        }
        $cargoAutor = Rbac::cargo($s['cargo_id']);
        if ($cargoAutor === null || (int) $cargoAutor['precedencia'] > (int) $cargo['precedencia']) {
            Resposta::proibido('Não é possível alterar as permissões de um cargo de precedência superior à sua.');
        }

        $pedidas = $req->listaDeIds('permissoes');
        $req->conferir();

        $conhecidas = Semente::permissoes();
        $desconhecidas = array_diff($pedidas, $conhecidas);
        if ($desconhecidas !== []) {
            $req->rejeitar('permissoes', 'Permissão não reconhecida: ' . implode(', ', $desconhecidas));
        }

        // Não se concede o que não se tem. Sem esta linha, quem administra um
        // cargo abaixo do seu poderia dar-lhe poderes que ele mesmo não possui
        // e depois assumi-lo.
        $minhas = Rbac::permissoesDe($s);
        $acima = array_diff($pedidas, $minhas);
        if ($acima !== []) {
            Auditoria::registrar((string) $s['id'], 'permissao.escalonamento.negado', 'seguranca', implode(', ', $acima));
            Resposta::proibido('Só é possível conceder permissões que você mesmo possui: ' . implode(', ', $acima));
        }

        Banco::transacao(static function () use ($cargo, $pedidas): void {
            Banco::executar('DELETE FROM {P}cargo_permissoes WHERE cargo_id = ?', [$cargo['id']]);
            foreach ($pedidas as $permissao) {
                Banco::inserir('cargo_permissoes', ['cargo_id' => $cargo['id'], 'permissao' => $permissao]);
            }
        });

        Auditoria::registrar((string) $s['id'], 'cargo.permissoes.alterou', 'seguranca', $cargo['codigo'] . ': ' . implode(', ', $pedidas));
        Resposta::ok(['permissoes' => $pedidas]);
    });

    /** O catálogo de permissões existentes, para a tela de configuração. */
    $r->get('/permissoes', static function (): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'permissoes.gerenciar');
        Resposta::ok([
            'grupos' => Semente::tudo()['gruposPermissao'] ?? [],
            'minhas' => Rbac::permissoesDe($s),
        ]);
    });

    // -----------------------------------------------------------------
    // Configuração da plataforma
    // -----------------------------------------------------------------
    $r->put('/configuracoes', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'configuracoes.gerenciar');

        // Lista fechada: uma chave livre viraria caminho para gravar
        // qualquer coisa na tabela de configuração.
        $aceitas = [
            'nome_sistema'     => static fn (Requisicao $q) => $q->texto('nome_sistema', false, 120),
            'nome_organizacao' => static fn (Requisicao $q) => $q->texto('nome_organizacao', false, 200),
            'cadastro_aberto'  => static fn (Requisicao $q) => $q->booleano('cadastro_aberto', true) ? '1' : '0',
            'aprovacao_manual' => static fn (Requisicao $q) => $q->booleano('aprovacao_manual', true) ? '1' : '0',
            'email_remetente'  => static fn (Requisicao $q) => $q->email('email_remetente', false),
            'moeda'            => static fn (Requisicao $q) => mb_strtoupper($q->texto('moeda', false, 3)),
        ];

        $alteradas = [];
        foreach ($aceitas as $chave => $ler) {
            if (!$req->tem($chave)) {
                continue;
            }
            $valor = (string) $ler($req);
            $alteradas[$chave] = $valor;
        }
        $req->conferir();

        if ($alteradas === []) {
            Resposta::erro('Nada a alterar.', 400);
        }
        foreach ($alteradas as $chave => $valor) {
            Banco::executar(
                'INSERT INTO {P}config (chave, valor) VALUES (?, ?) ON DUPLICATE KEY UPDATE valor = VALUES(valor)',
                [$chave, $valor],
            );
        }
        Auditoria::registrar((string) $s['id'], 'configuracao.alterou', 'sistema', implode(', ', array_keys($alteradas)));
        Resposta::ok($alteradas);
    });

    // -----------------------------------------------------------------
    // Registro de XP — a razão fica em transacoes_xp; membros.xp é o saldo
    // -----------------------------------------------------------------
    $r->post('/xp', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'gamificacao.configurar');

        $membroId = (string) $req->id('membroId');
        $pontos = $req->inteiro('pontos', true, -100000, 100000);
        $origem = $req->texto('origem', true, 40);
        $descricao = $req->texto('descricao', true, 255, 3);
        $req->conferir();

        if ($pontos === 0) {
            $req->rejeitar('pontos', 'Informe um valor diferente de zero.');
        }
        if (Banco::primeiro('SELECT id FROM {P}membros WHERE id = ?', [$membroId]) === null) {
            $req->rejeitar('membroId', 'Membro não encontrado.');
        }

        Banco::transacao(static function () use ($membroId, $pontos, $origem, $descricao, $s): void {
            Banco::inserir('transacoes_xp', [
                'id'             => Seguranca::uuid(),
                'membro_id'      => $membroId,
                'origem'         => $origem,
                'descricao'      => $descricao,
                'pontos'         => $pontos,
                'registrado_por' => $s['id'],
                'criado_em'      => gmdate('Y-m-d H:i:s'),
            ]);
            // O saldo não desce abaixo de zero: XP mede participação
            // acumulada, e participação negativa não significa nada.
            Banco::executar(
                'UPDATE {P}membros SET xp = GREATEST(0, CAST(xp AS SIGNED) + ?) WHERE id = ?',
                [$pontos, $membroId],
            );
        });

        Auditoria::registrar((string) $s['id'], 'xp.registrou', 'gamificacao', $membroId . ': ' . $pontos);
        Resposta::ok(['xp' => (int) Banco::valor('SELECT xp FROM {P}membros WHERE id = ?', [$membroId])]);
    });

    $r->get('/membros/:id/xp', static function (array $p): never {
        $s = Seguranca::exigirSessao();
        if ($p['id'] !== $s['id']) {
            Rbac::exigir($s, 'membros.visualizar');
        }
        Resposta::ok(Banco::todos(
            'SELECT id, origem, descricao, pontos, criado_em AS criadoEm
               FROM {P}transacoes_xp WHERE membro_id = ? ORDER BY criado_em DESC LIMIT 200',
            [$p['id']],
        ));
    });

    // -----------------------------------------------------------------
    // Ritos — registram o que a celebração produziu (Códice Verde)
    // -----------------------------------------------------------------
    $r->post('/ritos', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'membros.editar');

        $tipo = (string) $req->opcao('tipo', ['oikeiosis', 'prokope', 'syzygia', 'reconhecimento', 'syssitia', 'desobrigacao']);
        $membroId = (string) $req->id('membroId');
        $celebradoEm = $req->data('celebradoEm');
        $local = $req->texto('local', false, 200);
        $nota = $req->textoLongo('nota', false, 4000);
        $grauId = $req->id('grauAlcancadoId', false);
        $nucleoId = $req->id('nucleoId', false);
        $req->conferir();

        $membro = Banco::primeiro('SELECT * FROM {P}membros WHERE id = ?', [$membroId]);
        if ($membro === null) {
            $req->rejeitar('membroId', 'Membro não encontrado.');
        }
        if ($grauId !== null && Banco::primeiro('SELECT id FROM {P}graus WHERE id = ?', [$grauId]) === null) {
            $req->rejeitar('grauAlcancadoId', 'Grau não encontrado.');
        }

        Banco::transacao(static function () use ($tipo, $membroId, $celebradoEm, $local, $nota, $grauId, $nucleoId, $s): void {
            Banco::inserir('ritos', [
                'id'                => Seguranca::uuid(),
                'tipo'              => $tipo,
                'membro_id'         => $membroId,
                'nucleo_id'         => $nucleoId,
                'celebrado_em'      => $celebradoEm,
                'presidido_por_id'  => $s['id'],
                'local'             => $local,
                'nota'              => $nota === '' ? null : $nota,
                'grau_alcancado_id' => $grauId,
            ]);
            // C10:19 — a elevação de grau se dá pela Prokopē. O sistema
            // registra o que o rito produziu; nunca promove por si.
            if ($tipo === 'prokope' && $grauId !== null) {
                Banco::atualizar('membros', ['grau_id' => $grauId], 'id = :id', ['id' => $membroId]);
            }
        });

        Auditoria::registrar((string) $s['id'], 'rito.' . $tipo, 'formacao', $membroId);
        Resposta::ok();
    });

    $r->get('/membros/:id/ritos', static function (array $p): never {
        Seguranca::exigirSessao();
        Resposta::ok(Banco::todos(
            'SELECT r.id, r.tipo, r.celebrado_em AS celebradoEm, r.local, r.nota,
                    r.grau_alcancado_id AS grauAlcancadoId, m.nome_exibicao AS presididoPor
               FROM {P}ritos r LEFT JOIN {P}membros m ON m.id = r.presidido_por_id
              WHERE r.membro_id = ? ORDER BY r.celebrado_em DESC',
            [$p['id']],
        ));
    });
};
