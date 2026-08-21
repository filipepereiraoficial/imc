<?php
declare(strict_types=1);

/**
 * Núcleos — Est. Arts. 58 a 61.
 *
 * Ao criar um Núcleo, os três órgãos locais obrigatórios do Art. 59 são
 * criados junto. Deixá-los para depois produziria Núcleos irregulares desde
 * o primeiro dia.
 */

namespace OMCL;

return static function (Roteador $r): void {

    $r->get('/nucleos', static function (): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'nucleos.visualizar');

        $linhas = Banco::todos(
            'SELECT n.*, (SELECT COUNT(*) FROM {P}membros m WHERE m.nucleo_id = n.id AND m.situacao = ?) AS membros_ativos
               FROM {P}nucleos n ORDER BY n.nome',
            ['ativo'],
        );
        Resposta::ok(array_map(static fn (array $n) => [
            'id'            => $n['id'],
            'nome'          => $n['nome'],
            'codigo'        => $n['codigo'],
            'paisId'        => $n['pais_id'],
            'estadoId'      => $n['estado_id'],
            'municipioId'   => $n['municipio_id'],
            'endereco'      => $n['endereco'],
            'dataFundacao'  => $n['data_fundacao'],
            'situacao'      => $n['situacao'],
            'descricao'     => $n['descricao'],
            'contatoEmail'  => $n['contato_email'],
            'contatoTelefone' => $n['contato_telefone'],
            'dirigenteId'   => $n['dirigente_id'],
            'secretarioId'  => $n['secretario_id'],
            'tesoureiroId'  => $n['tesoureiro_id'],
            'membrosAtivos' => (int) $n['membros_ativos'],
        ], $linhas));
    });

    $r->get('/nucleos/:id', static function (array $p): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'nucleos.visualizar');
        $n = Banco::primeiro('SELECT * FROM {P}nucleos WHERE id = ?', [$p['id']]);
        if ($n === null) {
            Resposta::naoEncontrado('Núcleo não encontrado.');
        }
        $membros = Banco::todos(
            'SELECT id, nome_exibicao, usuario, foto_url, nucleo_id, cargo_id, grau_id, xp
               FROM {P}membros WHERE nucleo_id = ? AND situacao = ? ORDER BY nome_exibicao',
            [$n['id'], 'ativo'],
        );
        $orgaos = Banco::todos('SELECT id, codigo, nome, descricao, fundamento FROM {P}orgaos WHERE nucleo_id = ?', [$n['id']]);

        Resposta::ok([
            'nucleo'  => $n,
            'membros' => array_map(static fn (array $m) => Membros::resumo($m), $membros),
            'orgaos'  => $orgaos,
        ]);
    });

    $r->post('/nucleos', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'nucleos.criar');

        $nome = $req->texto('nome', true, 160, 3);
        $codigo = mb_strtoupper($req->texto('codigo', true, 20, 2));
        $paisId = $req->id('paisId');
        $estadoId = $req->id('estadoId');
        $municipioId = $req->id('municipioId');
        $dataFundacao = $req->data('dataFundacao');
        $endereco = $req->texto('endereco', false, 255);
        $descricao = $req->textoLongo('descricao', false, 2000);
        $email = $req->email('contatoEmail', false);
        $telefone = $req->texto('contatoTelefone', false, 40);
        $situacao = $req->opcao('situacao', ['ativo', 'em_formacao', 'suspenso', 'encerrado'], false, 'em_formacao');
        $req->conferir();

        if (Banco::primeiro('SELECT id FROM {P}nucleos WHERE codigo = ?', [$codigo]) !== null) {
            $req->rejeitar('codigo', 'Já existe um Núcleo com este código.');
        }
        $municipio = Banco::primeiro(
            'SELECT mu.id FROM {P}municipios mu
               JOIN {P}estados e ON e.id = mu.estado_id
              WHERE mu.id = ? AND mu.estado_id = ? AND e.pais_id = ?',
            [$municipioId, $estadoId, $paisId],
        );
        if ($municipio === null) {
            $req->rejeitar('municipioId', 'O município informado não pertence ao estado e ao país escolhidos.');
        }

        $id = Seguranca::uuid();
        Banco::transacao(static function () use ($id, $nome, $codigo, $paisId, $estadoId, $municipioId, $dataFundacao, $endereco, $descricao, $email, $telefone, $situacao): void {
            Banco::inserir('nucleos', [
                'id'               => $id,
                'nome'             => $nome,
                'codigo'           => $codigo,
                'pais_id'          => $paisId,
                'estado_id'        => $estadoId,
                'municipio_id'     => $municipioId,
                'endereco'         => $endereco,
                'data_fundacao'    => $dataFundacao,
                'situacao'         => $situacao,
                'descricao'        => $descricao,
                'contato_email'    => $email,
                'contato_telefone' => $telefone,
            ]);

            // Est. Art. 59 — a Coordenadoria de Gestão Local e os dois
            // Conselhos locais nascem com o Núcleo.
            foreach (Semente::orgaosLocais() as $modelo) {
                $orgaoId = Seguranca::uuid();
                Banco::inserir('orgaos', [
                    'id'         => $orgaoId,
                    'codigo'     => $modelo['codigo'],
                    'nome'       => $modelo['nome'],
                    'descricao'  => $modelo['descricao'],
                    'ambito'     => 'local',
                    'nucleo_id'  => $id,
                    'fundamento' => 'Est. Art. 59',
                ]);
                foreach ($modelo['competencias'] as $ordem => $competencia) {
                    Banco::inserir('orgao_competencias', [
                        'orgao_id'    => $orgaoId,
                        'ordem'       => $ordem + 1,
                        'competencia' => $competencia,
                    ]);
                }
            }
        });

        Auditoria::registrar((string) $s['id'], 'nucleo.criou', 'secretaria', $nome);
        Resposta::ok(['id' => $id]);
    });

    $r->patch('/nucleos/:id', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $n = Banco::primeiro('SELECT * FROM {P}nucleos WHERE id = ?', [$p['id']]);
        if ($n === null) {
            Resposta::naoEncontrado('Núcleo não encontrado.');
        }
        Rbac::exigir($s, 'nucleos.editar', ['nucleoId' => $n['id'], 'estadoId' => $n['estado_id']]);

        $campos = [];
        foreach ([
            'nome'            => ['nome', 160],
            'endereco'        => ['endereco', 255],
            'contatoEmail'    => ['contato_email', 160],
            'contatoTelefone' => ['contato_telefone', 40],
        ] as $entrada => [$coluna, $limite]) {
            if ($req->tem($entrada)) {
                $campos[$coluna] = $req->texto($entrada, false, $limite);
            }
        }
        if ($req->tem('descricao')) {
            $campos['descricao'] = $req->textoLongo('descricao', false, 2000);
        }
        if ($req->tem('situacao')) {
            $campos['situacao'] = $req->opcao('situacao', ['ativo', 'em_formacao', 'suspenso', 'encerrado']);
        }

        // A direção local do Art. 60 é designada, não eleita na tela: só quem
        // pertence ao Núcleo e está ativo pode ocupá-la.
        foreach (['dirigenteId' => 'dirigente_id', 'secretarioId' => 'secretario_id', 'tesoureiroId' => 'tesoureiro_id'] as $entrada => $coluna) {
            if (!$req->tem($entrada)) {
                continue;
            }
            $membroId = $req->id($entrada, false);
            if ($membroId !== null) {
                $ocupante = Banco::primeiro('SELECT id, nucleo_id, situacao FROM {P}membros WHERE id = ?', [$membroId]);
                if ($ocupante === null || $ocupante['nucleo_id'] !== $n['id'] || $ocupante['situacao'] !== 'ativo') {
                    $req->rejeitar($entrada, 'A designação recai sobre membro ativo do próprio Núcleo.');
                }
            }
            $campos[$coluna] = $membroId;
        }
        $req->conferir();

        if ($campos === []) {
            Resposta::erro('Nada a alterar.', 400);
        }
        Banco::atualizar('nucleos', $campos, 'id = :id', ['id' => $n['id']]);
        Auditoria::registrar((string) $s['id'], 'nucleo.editou', 'secretaria', $n['id'] . ': ' . implode(', ', array_keys($campos)));
        Resposta::ok(Banco::primeiro('SELECT * FROM {P}nucleos WHERE id = ?', [$n['id']]));
    });
};
