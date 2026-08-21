<?php
declare(strict_types=1);

/**
 * Quadro de membros — Est. Arts. 14 a 22.
 *
 * Dois cuidados percorrem o arquivo: o escopo territorial do cargo limita
 * quem se pode editar, e a precedência limita que cargo se pode atribuir.
 * Sem o segundo, quem edita membros promoveria a si mesmo.
 */

namespace OMCL;

return static function (Roteador $r): void {

    // -----------------------------------------------------------------
    // Cadastro público — Est. Art. 17: postulante, sujeito a deferimento
    // -----------------------------------------------------------------
    $r->post('/cadastro', static function (array $_p, Requisicao $req): never {
        if ((string) Banco::valor('SELECT valor FROM {P}config WHERE chave = ?', ['cadastro_aberto']) !== '1') {
            Resposta::erro('O cadastro está fechado no momento. Procure a Secretaria da Ordem.', 403);
        }
        Seguranca::limitarPorOrigem('cadastro');

        $nome = $req->texto('nomeCompleto', true, 180, 3);
        $email = $req->email('email');
        $usuario = mb_strtolower($req->texto('usuario', true, 60, 3));
        $senha = $req->senha('senha');
        $telefone = $req->texto('telefone', false, 40);
        $nucleoId = $req->id('nucleoId', false);
        $req->conferir();

        if (!preg_match('/^[a-z0-9._-]{3,60}$/', $usuario)) {
            $req->rejeitar('usuario', 'Use letras minúsculas, números, ponto, hífen ou sublinhado.');
        }
        $faltas = Seguranca::criticarSenha($senha, $email, $nome);
        if ($faltas !== []) {
            $req->rejeitar('senha', implode(' ', $faltas));
        }
        if ($nucleoId !== null && Banco::primeiro('SELECT id FROM {P}nucleos WHERE id = ?', [$nucleoId]) === null) {
            $req->rejeitar('nucleoId', 'Núcleo não encontrado.');
        }

        // Endereço e usuário já em uso não recebem resposta distinta de um
        // cadastro aceito: o formulário aberto não serve para descobrir quem
        // pertence à Ordem. A Secretaria vê a duplicidade na análise.
        $duplicado = Banco::primeiro('SELECT id FROM {P}membros WHERE email = ? OR usuario = ?', [$email, $usuario]);
        if ($duplicado !== null) {
            Auditoria::registrar(null, 'cadastro.duplicado', 'secretaria', $email);
            Resposta::ok(null, ['mensagem' => 'Cadastro recebido. A Secretaria dará retorno pelo e-mail informado.']);
        }

        $cargo = Rbac::cargoPorCodigo('candidato');
        $grau = Banco::primeiro('SELECT id FROM {P}graus ORDER BY ordem LIMIT 1');
        if ($cargo === null || $grau === null) {
            Resposta::erro('Instalação incompleta: cargos e graus não foram semeados.', 500);
        }

        $id = Seguranca::uuid();
        $proximo = (int) Banco::valor('SELECT COALESCE(MAX(CAST(numero_membro AS UNSIGNED)), 0) + 1 FROM {P}membros');
        Banco::inserir('membros', [
            'id'            => $id,
            'numero_membro' => str_pad((string) $proximo, 4, '0', STR_PAD_LEFT),
            'nome_completo' => $nome,
            'nome_exibicao' => $nome,
            'usuario'       => $usuario,
            'email'         => $email,
            'telefone'      => $telefone,
            'nucleo_id'     => $nucleoId,
            'cargo_id'      => $cargo['id'],
            'grau_id'       => $grau['id'],
            // Est. Art. 17: a admissão depende de deferimento; até lá, pendente.
            'situacao'      => 'pendente',
            'data_ingresso' => gmdate('Y-m-d'),
            'senha_hash'    => Seguranca::cifrarSenha($senha),
        ]);
        Auditoria::registrar($id, 'cadastro.solicitou', 'secretaria', $email);
        Resposta::ok(null, ['mensagem' => 'Cadastro recebido. A Secretaria dará retorno pelo e-mail informado.']);
    });

    // -----------------------------------------------------------------
    // Listagem
    // -----------------------------------------------------------------
    $r->get('/membros', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'membros.visualizar');

        $condicoes = [];
        $parametros = [];

        // Quem tem escopo de Núcleo enxerga o próprio Núcleo. A restrição é
        // aplicada na consulta, não na tela.
        $escopo = (string) (Rbac::cargo($s['cargo_id'])['escopo'] ?? 'proprio');
        if ($escopo === 'nucleo' && $s['nucleo_id'] !== null) {
            $condicoes[] = 'm.nucleo_id = ?';
            $parametros[] = $s['nucleo_id'];
        } elseif ($escopo === 'estado' && $s['estado_id'] !== null) {
            $condicoes[] = '(m.estado_id = ? OR m.estado_id IS NULL)';
            $parametros[] = $s['estado_id'];
        }

        if ($req->tem('nucleoId')) {
            $condicoes[] = 'm.nucleo_id = ?';
            $parametros[] = $req->id('nucleoId');
        }
        if ($req->tem('situacao')) {
            $condicoes[] = 'm.situacao = ?';
            $parametros[] = $req->opcao('situacao', ['ativo', 'pendente', 'suspenso', 'inativo', 'desligado']);
        }
        if ($req->tem('busca')) {
            $busca = '%' . $req->texto('busca', false, 80) . '%';
            $condicoes[] = '(m.nome_completo LIKE ? OR m.nome_exibicao LIKE ? OR m.usuario LIKE ? OR m.numero_membro LIKE ?)';
            array_push($parametros, $busca, $busca, $busca, $busca);
        }
        $req->conferir();

        $onde = $condicoes === [] ? '' : ' WHERE ' . implode(' AND ', $condicoes);
        $pagina = max(1, $req->inteiro('pagina', false, 1, 10000) ?: 1);
        $porPagina = 50;

        $total = (int) Banco::valor('SELECT COUNT(*) FROM {P}membros m' . $onde, $parametros);
        $linhas = Banco::todos(
            'SELECT m.* FROM {P}membros m' . $onde . ' ORDER BY m.nome_exibicao LIMIT ' . $porPagina . ' OFFSET ' . (($pagina - 1) * $porPagina),
            $parametros,
        );

        Resposta::ok(
            array_map(static fn (array $m) => Membros::paraCliente($m, $s), $linhas),
            ['total' => $total, 'pagina' => $pagina, 'porPagina' => $porPagina],
        );
    });

    $r->get('/membros/:id', static function (array $p): never {
        $s = Seguranca::exigirSessao();
        // O escopo não é aplicado aqui de propósito: o quadro é visível a
        // quem pertence à Ordem. O que varia por observador são os campos de
        // contato, e disso cuida Membros::paraCliente.
        Rbac::exigir($s, 'membros.visualizar');
        $m = Banco::primeiro('SELECT * FROM {P}membros WHERE id = ?', [$p['id']]);
        if ($m === null) {
            Resposta::naoEncontrado('Membro não encontrado.');
        }
        Resposta::ok(Membros::paraCliente($m, $s));
    });

    // -----------------------------------------------------------------
    // Edição
    // -----------------------------------------------------------------
    $r->patch('/membros/:id', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $alvo = Banco::primeiro('SELECT * FROM {P}membros WHERE id = ?', [$p['id']]);
        if ($alvo === null) {
            Resposta::naoEncontrado('Membro não encontrado.');
        }

        $proprio = $alvo['id'] === $s['id'];
        if (!$proprio) {
            Rbac::exigir($s, 'membros.editar', [
                'membroId' => $alvo['id'],
                'nucleoId' => $alvo['nucleo_id'],
                'estadoId' => $alvo['estado_id'],
            ]);
        }

        $campos = [];
        // O que o próprio membro pode mudar em si — Est. Art. 21, VI.
        $doProprio = [
            'nomeExibicao'  => ['nome_exibicao', 120],
            'telefone'      => ['telefone', 40],
            'biografia'     => ['biografia', 2000],
            'logradouro'    => ['logradouro', 180],
            'numeroEndereco'=> ['numero_endereco', 20],
            'complemento'   => ['complemento', 120],
            'bairro'        => ['bairro', 120],
            'cep'           => ['cep', 20],
        ];
        foreach ($doProprio as $entrada => [$coluna, $limite]) {
            if ($req->tem($entrada)) {
                $campos[$coluna] = $entrada === 'biografia'
                    ? $req->textoLongo($entrada, false, $limite)
                    : $req->texto($entrada, false, $limite);
            }
        }
        foreach (['email', 'telefone', 'endereco', 'nascimento', 'perfil', 'publicacoes'] as $faixa) {
            $entrada = 'visibilidade' . ucfirst($faixa);
            if ($req->tem($entrada)) {
                $campos['vis_' . $faixa] = $req->opcao($entrada, ['publico', 'nucleo', 'administracao', 'privado']);
            }
        }

        // Campos administrativos. Ignorá-los em silêncio quando falta
        // permissão faria a tentativa passar por "nada a alterar"; a recusa
        // precisa ser explícita e ficar registrada.
        $administrativos = ['nomeCompleto', 'numeroMembro', 'observacoesAdmin', 'categoriaAssociativa', 'grauId', 'nucleoId', 'cargoId'];
        $tentados = array_values(array_filter($administrativos, static fn (string $c) => $req->tem($c)));
        if ($tentados !== [] && !Rbac::possui($s, 'membros.editar')) {
            Auditoria::registrar((string) $s['id'], 'membro.edicao.negada', 'seguranca', $alvo['id'] . ': ' . implode(', ', $tentados));
            Resposta::proibido('Estes campos só podem ser alterados por quem administra o quadro: ' . implode(', ', $tentados));
        }

        // O que só a administração pode mudar em outro.
        if (Rbac::possui($s, 'membros.editar')) {
            foreach ([
                'nomeCompleto' => ['nome_completo', 180],
                'numeroMembro' => ['numero_membro', 30],
            ] as $entrada => [$coluna, $limite]) {
                if ($req->tem($entrada)) {
                    $campos[$coluna] = $req->texto($entrada, false, $limite);
                }
            }
            if ($req->tem('observacoesAdmin')) {
                $campos['observacoes_admin'] = $req->textoLongo('observacoesAdmin', false, 4000);
            }
            if ($req->tem('categoriaAssociativa')) {
                $campos['categoria_associativa'] = $req->opcao('categoriaAssociativa', ['transicao', 'efetivo', 'honorario', 'benemerito', 'juvenil']);
            }
            if ($req->tem('grauId')) {
                // O grau se alcança pelo rito da Prokopē (C10:19); a alteração
                // aqui apenas registra o que o rito já produziu.
                $grauId = $req->id('grauId');
                if (Banco::primeiro('SELECT id FROM {P}graus WHERE id = ?', [$grauId]) === null) {
                    $req->rejeitar('grauId', 'Grau não encontrado.');
                }
                $campos['grau_id'] = $grauId;
            }
            if ($req->tem('nucleoId')) {
                Rbac::exigir($s, 'membros.transferir', ['membroId' => $alvo['id'], 'nucleoId' => $alvo['nucleo_id']]);
                $nucleoId = $req->id('nucleoId', false);
                if ($nucleoId !== null && Banco::primeiro('SELECT id FROM {P}nucleos WHERE id = ?', [$nucleoId]) === null) {
                    $req->rejeitar('nucleoId', 'Núcleo não encontrado.');
                }
                $campos['nucleo_id'] = $nucleoId;
            }
            if ($req->tem('cargoId')) {
                $cargoId = (string) $req->id('cargoId');
                if (!Rbac::podeAtribuirCargo($s, $cargoId)) {
                    Auditoria::registrar((string) $s['id'], 'cargo.atribuicao.negada', 'seguranca', $cargoId);
                    Resposta::proibido('Não é possível atribuir um cargo de precedência superior à sua.');
                }
                $campos['cargo_id'] = $cargoId;
            }
        }
        $req->conferir();

        if ($campos === []) {
            Resposta::erro('Nada a alterar.', 400);
        }
        Banco::atualizar('membros', $campos, 'id = :id', ['id' => $alvo['id']]);
        Auditoria::registrar((string) $s['id'], 'membro.editou', 'secretaria', $alvo['id'] . ': ' . implode(', ', array_keys($campos)));

        $atualizado = Banco::primeiro('SELECT * FROM {P}membros WHERE id = ?', [$alvo['id']]);
        Resposta::ok(Membros::paraCliente((array) $atualizado, $s));
    });

    // -----------------------------------------------------------------
    // Situação — deferimento, suspensão, desligamento
    // -----------------------------------------------------------------
    $r->post('/membros/:id/situacao', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $alvo = Banco::primeiro('SELECT * FROM {P}membros WHERE id = ?', [$p['id']]);
        if ($alvo === null) {
            Resposta::naoEncontrado('Membro não encontrado.');
        }
        $situacao = (string) $req->opcao('situacao', ['ativo', 'pendente', 'suspenso', 'inativo', 'desligado']);
        $motivo = $req->textoLongo('motivo', false, 1000);
        $req->conferir();

        // Deferir cadastro e aplicar restrição são atos distintos, e o
        // Estatuto os confia a autoridades distintas.
        $permissao = in_array($situacao, ['suspenso', 'desligado', 'inativo'], true)
            ? 'membros.suspender'
            : 'membros.aprovar';
        Rbac::exigir($s, $permissao, [
            'membroId' => $alvo['id'],
            'nucleoId' => $alvo['nucleo_id'],
            'estadoId' => $alvo['estado_id'],
        ]);

        if ($alvo['id'] === $s['id']) {
            Resposta::erro('Não é possível alterar a própria situação.', 400);
        }

        // Quem deixa de estar ativo perde o cargo estatutário junto: manter o
        // cargo devolveria a autoridade assim que a situação fosse revertida
        // por engano.
        $campos = ['situacao' => $situacao];
        if ($situacao === 'ativo' && (string) (Rbac::cargo($alvo['cargo_id'])['codigo'] ?? '') === 'candidato') {
            $membro = Rbac::cargoPorCodigo('membro');
            if ($membro !== null) {
                $campos['cargo_id'] = $membro['id'];
            }
        }
        Banco::atualizar('membros', $campos, 'id = :id', ['id' => $alvo['id']]);

        if (in_array($situacao, ['suspenso', 'desligado', 'inativo'], true)) {
            Seguranca::encerrarTodasAsSessoes((string) $alvo['id']);
        }
        Auditoria::registrar((string) $s['id'], 'membro.situacao.' . $situacao, 'secretaria', $alvo['id'] . ($motivo !== '' ? ' — ' . $motivo : ''));

        $atualizado = Banco::primeiro('SELECT * FROM {P}membros WHERE id = ?', [$alvo['id']]);
        Resposta::ok(Membros::paraCliente((array) $atualizado, $s));
    });

    // -----------------------------------------------------------------
    // Ranking — C10 reconhece a participação; a ordem é por XP, nunca por
    // valor contribuído (C106:20 veda constrangimento por contribuição).
    // -----------------------------------------------------------------
    $r->get('/ranking', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $parametros = [];
        $onde = "WHERE m.situacao = 'ativo'";
        if ($req->tem('nucleoId')) {
            $onde .= ' AND m.nucleo_id = ?';
            $parametros[] = $req->id('nucleoId');
        }
        $req->conferir();

        $linhas = Banco::todos(
            'SELECT m.id, m.nome_exibicao, m.usuario, m.foto_url, m.nucleo_id, m.cargo_id, m.grau_id, m.xp
               FROM {P}membros m ' . $onde . ' ORDER BY m.xp DESC, m.nome_exibicao LIMIT 100',
            $parametros,
        );
        $saida = [];
        foreach ($linhas as $i => $linha) {
            $saida[] = Membros::resumo($linha) + ['posicao' => $i + 1];
        }
        Resposta::ok($saida, ['eu' => $s['id']]);
    });
};
