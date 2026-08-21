<?php
declare(strict_types=1);

/**
 * Assembleias e deliberação — Est. Arts. 27 a 32 e 62.
 *
 * O voto é o ponto do sistema em que a validação do cliente vale menos:
 * quem quer fraudar a deliberação não usa a tela. Presença, aptidão, prazo e
 * unicidade são conferidos aqui, e a apuração sai do banco.
 */

namespace OMCL;

return static function (Roteador $r): void {

    $r->get('/assembleias', static function (): never {
        Seguranca::exigirSessao();
        $linhas = Banco::todos(
            'SELECT a.*, o.nome AS orgao_nome,
                    (SELECT COUNT(*) FROM {P}presencas_assembleia pa WHERE pa.assembleia_id = a.id) AS presentes,
                    (SELECT COUNT(*) FROM {P}materias mt WHERE mt.assembleia_id = a.id) AS materias
               FROM {P}assembleias a JOIN {P}orgaos o ON o.id = a.orgao_id
              ORDER BY a.inicio DESC LIMIT 100',
        );
        Resposta::ok(array_map(static fn (array $a) => [
            'id'          => $a['id'],
            'titulo'      => $a['titulo'],
            'descricao'   => $a['descricao'],
            'orgaoId'     => $a['orgao_id'],
            'orgaoNome'   => $a['orgao_nome'],
            'ordinaria'   => (bool) $a['ordinaria'],
            'convocadaEm' => $a['convocada_em'],
            'inicio'      => $a['inicio'],
            'local'       => $a['local'],
            'modalidade'  => $a['modalidade'],
            'convocacaoAplicada' => $a['convocacao_aplicada'],
            'situacao'    => $a['situacao'],
            'presentes'   => (int) $a['presentes'],
            'materias'    => (int) $a['materias'],
            'convocacao'  => Deliberacao::conferirConvocacao($a),
        ], $linhas));
    });

    $r->get('/assembleias/:id', static function (array $p): never {
        $s = Seguranca::exigirSessao();
        $a = Banco::primeiro('SELECT * FROM {P}assembleias WHERE id = ?', [$p['id']]);
        if ($a === null) {
            Resposta::naoEncontrado('Assembleia não encontrada.');
        }

        $presentes = (int) Banco::valor('SELECT COUNT(*) FROM {P}presencas_assembleia WHERE assembleia_id = ?', [$a['id']]);
        $aptos = Deliberacao::contarAptos();
        $convocacao = (string) ($a['convocacao_aplicada'] ?? 'primeira');

        $materias = [];
        foreach (Banco::todos('SELECT * FROM {P}materias WHERE assembleia_id = ? ORDER BY ordem', [$a['id']]) as $m) {
            $meuVoto = Banco::valor(
                'SELECT opcao FROM {P}votos WHERE materia_id = ? AND membro_id = ?',
                [$m['id'], $s['id']],
            );
            $materias[] = [
                'id'         => $m['id'],
                'ordem'      => (int) $m['ordem'],
                'titulo'     => $m['titulo'],
                'descricao'  => $m['descricao'],
                'quorum'     => $m['quorum'],
                'fundamento' => $m['fundamento'],
                'encerrada'  => (bool) $m['encerrada'],
                'apuracao'   => Deliberacao::apurar((string) $m['id'], (string) $m['quorum']),
                'meuVoto'    => $meuVoto,
            ];
        }

        $listaPresentes = Banco::todos(
            'SELECT m.id, m.nome_exibicao, m.usuario, m.foto_url, m.nucleo_id, m.cargo_id, m.grau_id, m.xp,
                    pa.registrada_em
               FROM {P}presencas_assembleia pa JOIN {P}membros m ON m.id = pa.membro_id
              WHERE pa.assembleia_id = ? ORDER BY pa.registrada_em',
            [$a['id']],
        );

        Resposta::ok([
            'assembleia' => $a,
            'convocacao' => Deliberacao::conferirConvocacao($a),
            'quorum'     => Deliberacao::quorumInstalacao($presentes, $aptos, $convocacao),
            'materias'   => $materias,
            'presentes'  => array_map(static fn (array $m) => Membros::resumo($m) + ['registradaEm' => $m['registrada_em']], $listaPresentes),
            'euPosso'    => [
                'votar'    => Deliberacao::podeVotar($s),
                'presente' => Banco::valor('SELECT id FROM {P}presencas_assembleia WHERE assembleia_id = ? AND membro_id = ?', [$a['id'], $s['id']]) !== null,
            ],
        ]);
    });

    $r->post('/assembleias', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'propostas.tramitar');

        $titulo = $req->texto('titulo', true, 200, 3);
        $descricao = $req->textoLongo('descricao', false, 4000);
        $orgaoId = $req->id('orgaoId');
        $inicio = $req->dataHora('inicio');
        $local = $req->texto('local', false, 200);
        $modalidade = (string) $req->opcao('modalidade', ['presencial', 'online', 'hibrido'], false, 'hibrido');
        $ordinaria = $req->booleano('ordinaria', true);
        $req->conferir();

        if (Banco::primeiro('SELECT id FROM {P}orgaos WHERE id = ?', [$orgaoId]) === null) {
            $req->rejeitar('orgaoId', 'Órgão não encontrado.');
        }
        if ($inicio !== null && strtotime($inicio) < time()) {
            $req->rejeitar('inicio', 'A assembleia não pode ser marcada para o passado.');
        }

        $id = Seguranca::uuid();
        Banco::inserir('assembleias', [
            'id'                  => $id,
            'titulo'              => $titulo,
            'descricao'           => $descricao,
            'orgao_id'            => $orgaoId,
            'ordinaria'           => $ordinaria ? 1 : 0,
            'convocada_em'        => gmdate('Y-m-d H:i:s'),
            'inicio'              => $inicio,
            'local'               => $local,
            'modalidade'          => $modalidade,
            'convocacao_aplicada' => 'primeira',
            'situacao'            => 'convocada',
            'convocada_por_id'    => $s['id'],
        ]);
        Auditoria::registrar((string) $s['id'], 'assembleia.convocou', 'governanca', $titulo);

        $criada = (array) Banco::primeiro('SELECT * FROM {P}assembleias WHERE id = ?', [$id]);
        Resposta::ok(['id' => $id, 'convocacao' => Deliberacao::conferirConvocacao($criada)]);
    });

    /**
     * Presença. Registrável desde a convocação: é a presença que forma o
     * quórum de instalação, de modo que exigir a instalação antes dela
     * tornaria a assembleia impossível de instalar.
     */
    $r->post('/assembleias/:id/presenca', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $a = Banco::primeiro('SELECT * FROM {P}assembleias WHERE id = ?', [$p['id']]);
        if ($a === null) {
            Resposta::naoEncontrado('Assembleia não encontrada.');
        }
        if (!in_array($a['situacao'], ['convocada', 'instalada'], true)) {
            Resposta::erro('A assembleia já foi encerrada ou cancelada.', 409);
        }

        $membroId = $req->id('membroId', false) ?? (string) $s['id'];
        $req->conferir();
        if ($membroId !== $s['id']) {
            // Registrar presença alheia é ato da mesa, não do participante.
            Rbac::exigir($s, 'presenca.registrar', ['membroId' => $membroId]);
        }
        $membro = Banco::primeiro('SELECT * FROM {P}membros WHERE id = ?', [$membroId]);
        if ($membro === null) {
            Resposta::naoEncontrado('Membro não encontrado.');
        }
        if (!Deliberacao::podeVotar($membro)) {
            Resposta::erro('Este membro não tem direito a voto nesta assembleia (Est. Arts. 20, II e 27).', 403);
        }

        $ja = Banco::valor('SELECT id FROM {P}presencas_assembleia WHERE assembleia_id = ? AND membro_id = ?', [$a['id'], $membroId]);
        if ($ja === null) {
            Banco::inserir('presencas_assembleia', [
                'id'            => Seguranca::uuid(),
                'assembleia_id' => $a['id'],
                'membro_id'     => $membroId,
                'registrada_em' => gmdate('Y-m-d H:i:s'),
            ]);
        }

        $presentes = (int) Banco::valor('SELECT COUNT(*) FROM {P}presencas_assembleia WHERE assembleia_id = ?', [$a['id']]);
        Resposta::ok(Deliberacao::quorumInstalacao($presentes, Deliberacao::contarAptos(), (string) ($a['convocacao_aplicada'] ?? 'primeira')));
    });

    /** Instalação e segunda convocação — Est. Art. 31. */
    $r->post('/assembleias/:id/situacao', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'propostas.tramitar');
        $a = Banco::primeiro('SELECT * FROM {P}assembleias WHERE id = ?', [$p['id']]);
        if ($a === null) {
            Resposta::naoEncontrado('Assembleia não encontrada.');
        }
        $acao = (string) $req->opcao('acao', ['instalar', 'segunda_convocacao', 'encerrar', 'cancelar']);
        $ata = $req->textoLongo('ata', false, 20000);
        $req->conferir();

        $presentes = (int) Banco::valor('SELECT COUNT(*) FROM {P}presencas_assembleia WHERE assembleia_id = ?', [$a['id']]);
        $aptos = Deliberacao::contarAptos();

        switch ($acao) {
            case 'instalar':
                if ($a['situacao'] !== 'convocada') {
                    Resposta::erro('Só uma assembleia convocada pode ser instalada.', 409);
                }
                $quorum = Deliberacao::quorumInstalacao($presentes, $aptos, (string) ($a['convocacao_aplicada'] ?? 'primeira'));
                if (!$quorum['instalavel']) {
                    Resposta::erro(
                        sprintf('Quórum insuficiente: %d presentes para %d exigidos (Est. Art. 31).', $quorum['presentes'], $quorum['exigido']),
                        409,
                        ['quorum' => $quorum],
                    );
                }
                Banco::atualizar('assembleias', ['situacao' => 'instalada'], 'id = :id', ['id' => $a['id']]);
                break;

            case 'segunda_convocacao':
                // Est. Art. 31: frustrada a primeira, a segunda instala com
                // qualquer número. O registro guarda qual foi aplicada.
                if ($a['situacao'] !== 'convocada') {
                    Resposta::erro('A segunda convocação só cabe antes da instalação.', 409);
                }
                Banco::atualizar('assembleias', ['convocacao_aplicada' => 'segunda'], 'id = :id', ['id' => $a['id']]);
                break;

            case 'encerrar':
                if ($a['situacao'] !== 'instalada') {
                    Resposta::erro('Só uma assembleia instalada pode ser encerrada.', 409);
                }
                Banco::atualizar('assembleias', [
                    'situacao' => 'encerrada',
                    'ata'      => $ata === '' ? $a['ata'] : $ata,
                ], 'id = :id', ['id' => $a['id']]);
                Banco::executar('UPDATE {P}materias SET encerrada = 1 WHERE assembleia_id = ?', [$a['id']]);
                break;

            case 'cancelar':
                Banco::atualizar('assembleias', ['situacao' => 'cancelada'], 'id = :id', ['id' => $a['id']]);
                break;
        }

        Auditoria::registrar((string) $s['id'], 'assembleia.' . $acao, 'governanca', (string) $a['id']);
        Resposta::ok(Banco::primeiro('SELECT * FROM {P}assembleias WHERE id = ?', [$a['id']]));
    });

    $r->post('/assembleias/:id/materias', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'propostas.tramitar');
        $a = Banco::primeiro('SELECT * FROM {P}assembleias WHERE id = ?', [$p['id']]);
        if ($a === null) {
            Resposta::naoEncontrado('Assembleia não encontrada.');
        }
        if (in_array($a['situacao'], ['encerrada', 'cancelada'], true)) {
            Resposta::erro('Não se pauta matéria em assembleia encerrada.', 409);
        }

        $titulo = $req->texto('titulo', true, 200, 3);
        $descricao = $req->textoLongo('descricao', false, 8000);
        $quorum = (string) $req->opcao('quorum', ['simples', 'qualificado'], false, 'simples');
        $fundamento = $req->texto('fundamento', false, 120);
        $req->conferir();

        $ordem = (int) Banco::valor('SELECT COALESCE(MAX(ordem), 0) + 1 FROM {P}materias WHERE assembleia_id = ?', [$a['id']]);
        $id = Seguranca::uuid();
        Banco::inserir('materias', [
            'id'            => $id,
            'assembleia_id' => $a['id'],
            'ordem'         => $ordem,
            'titulo'        => $titulo,
            'descricao'     => $descricao,
            'quorum'        => $quorum,
            'fundamento'    => $fundamento === '' ? null : $fundamento,
        ]);
        Auditoria::registrar((string) $s['id'], 'materia.pautou', 'governanca', $titulo);
        Resposta::ok(['id' => $id, 'ordem' => $ordem]);
    });

    // -----------------------------------------------------------------
    // Voto — Est. Art. 62
    // -----------------------------------------------------------------
    $r->post('/materias/:id/voto', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $m = Banco::primeiro(
            'SELECT mt.*, a.id AS assembleia_id, a.situacao AS assembleia_situacao
               FROM {P}materias mt JOIN {P}assembleias a ON a.id = mt.assembleia_id
              WHERE mt.id = ?',
            [$p['id']],
        );
        if ($m === null) {
            Resposta::naoEncontrado('Matéria não encontrada.');
        }
        $opcao = (string) $req->opcao('opcao', ['favor', 'contra', 'abstencao']);
        $req->conferir();

        if ($m['assembleia_situacao'] !== 'instalada') {
            Resposta::erro('A votação só corre com a assembleia instalada (Est. Art. 31).', 409);
        }
        if ((int) $m['encerrada'] === 1) {
            Resposta::erro('Esta matéria já foi encerrada.', 409);
        }
        if (!Deliberacao::podeVotar($s)) {
            Resposta::proibido('Você não tem direito a voto nesta assembleia (Est. Arts. 20, II e 27).');
        }
        $presente = Banco::valor(
            'SELECT id FROM {P}presencas_assembleia WHERE assembleia_id = ? AND membro_id = ?',
            [$m['assembleia_id'], $s['id']],
        );
        if ($presente === null) {
            // Est. Art. 32: delibera quem está presente. Sem presença
            // registrada não há voto a computar.
            Resposta::erro('Registre a sua presença antes de votar.', 409);
        }

        // O voto é único por matéria: a chave do banco garante isso mesmo
        // quando dois pedidos chegam ao mesmo tempo.
        try {
            Banco::inserir('votos', [
                'id'            => Seguranca::uuid(),
                'materia_id'    => $m['id'],
                'membro_id'     => $s['id'],
                'opcao'         => $opcao,
                'registrado_em' => gmdate('Y-m-d H:i:s'),
            ]);
        } catch (\PDOException $e) {
            if ((int) ($e->errorInfo[1] ?? 0) === 1062) {
                Resposta::erro('Você já votou nesta matéria. O voto não se altera depois de registrado.', 409);
            }
            throw $e;
        }

        Auditoria::registrar((string) $s['id'], 'voto.registrou', 'governanca', (string) $m['id']);
        Resposta::ok(Deliberacao::apurar((string) $m['id'], (string) $m['quorum']));
    });

    $r->post('/materias/:id/encerrar', static function (array $p): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'propostas.tramitar');
        $m = Banco::primeiro('SELECT * FROM {P}materias WHERE id = ?', [$p['id']]);
        if ($m === null) {
            Resposta::naoEncontrado('Matéria não encontrada.');
        }
        Banco::atualizar('materias', ['encerrada' => 1], 'id = :id', ['id' => $m['id']]);
        $apuracao = Deliberacao::apurar((string) $m['id'], (string) $m['quorum']);
        Auditoria::registrar(
            (string) $s['id'],
            'materia.encerrou',
            'governanca',
            sprintf('%s — %s (%d a favor, %d contra, %d abstenções)', $m['id'], $apuracao['aprovada'] ? 'aprovada' : 'rejeitada', $apuracao['favor'], $apuracao['contra'], $apuracao['abstencao']),
        );
        Resposta::ok($apuracao);
    });
};
