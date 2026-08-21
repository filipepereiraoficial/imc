<?php
declare(strict_types=1);

/**
 * Tesouraria e transparência — Est. Arts. 10 a 13; Códice C106.
 *
 * Uma restrição atravessa o arquivo: C106:20 veda cobrança coercitiva e
 * exposição pública de quem contribui menos. Por isso não há rota que liste
 * inadimplentes nem que ordene membros por valor. Ao público interno saem
 * agregados; o nome do contribuinte só aparece a quem tem a Tesouraria.
 */

namespace OMCL;

return static function (Roteador $r): void {

    $r->get('/financeiro/contas', static function (): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'tesouraria.visualizar');
        Resposta::ok([
            'contas'     => Banco::todos('SELECT id, nome, instituicao, saldo_inicial AS saldoInicial, nucleo_id AS nucleoId FROM {P}contas ORDER BY nome'),
            'categorias' => Banco::todos('SELECT id, nome, tipo, cor FROM {P}categorias_financeiras ORDER BY tipo, nome'),
        ]);
    });

    $r->post('/financeiro/contas', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'tesouraria.gerenciarContas');
        $nome = $req->texto('nome', true, 160, 2);
        $instituicao = $req->texto('instituicao', false, 120);
        $saldo = $req->decimal('saldoInicial', false, -1e10, 1e10);
        $nucleoId = $req->id('nucleoId', false);
        $req->conferir();

        $id = Seguranca::uuid();
        Banco::inserir('contas', [
            'id'            => $id,
            'nome'          => $nome,
            'instituicao'   => $instituicao,
            'saldo_inicial' => $saldo,
            'nucleo_id'     => $nucleoId,
        ]);
        Auditoria::registrar((string) $s['id'], 'conta.criou', 'tesouraria', $nome);
        Resposta::ok(['id' => $id]);
    });

    $r->post('/financeiro/categorias', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'tesouraria.gerenciarContas');
        $nome = $req->texto('nome', true, 160, 2);
        $tipo = (string) $req->opcao('tipo', ['receita', 'despesa']);
        $cor = $req->texto('cor', false, 7);
        $req->conferir();
        if ($cor !== '' && !preg_match('/^#[0-9a-fA-F]{6}$/', $cor)) {
            $req->rejeitar('cor', 'Informe a cor no formato #rrggbb.');
        }

        $id = Seguranca::uuid();
        Banco::inserir('categorias_financeiras', [
            'id'   => $id,
            'nome' => $nome,
            'tipo' => $tipo,
            'cor'  => $cor === '' ? '#2a78d6' : $cor,
        ]);
        Resposta::ok(['id' => $id]);
    });

    // -----------------------------------------------------------------
    // Lançamentos
    // -----------------------------------------------------------------
    $r->get('/financeiro/lancamentos', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'tesouraria.visualizar');

        $condicoes = [];
        $parametros = [];
        $escopo = (string) (Rbac::cargo($s['cargo_id'])['escopo'] ?? 'proprio');
        if ($escopo === 'nucleo' && $s['nucleo_id'] !== null) {
            $condicoes[] = 'l.nucleo_id = ?';
            $parametros[] = $s['nucleo_id'];
        }
        if ($req->tem('de')) {
            $condicoes[] = 'l.data >= ?';
            $parametros[] = $req->data('de');
        }
        if ($req->tem('ate')) {
            $condicoes[] = 'l.data <= ?';
            $parametros[] = $req->data('ate');
        }
        if ($req->tem('tipo')) {
            $condicoes[] = 'l.tipo = ?';
            $parametros[] = $req->opcao('tipo', ['receita', 'despesa']);
        }
        if ($req->tem('nucleoId')) {
            $condicoes[] = 'l.nucleo_id = ?';
            $parametros[] = $req->id('nucleoId');
        }
        $req->conferir();

        $onde = $condicoes === [] ? '' : ' WHERE ' . implode(' AND ', $condicoes);
        $linhas = Banco::todos(
            'SELECT l.*, c.nome AS categoria_nome, ct.nome AS conta_nome, m.nome_exibicao AS responsavel_nome
               FROM {P}lancamentos l
               JOIN {P}categorias_financeiras c ON c.id = l.categoria_id
               JOIN {P}contas ct ON ct.id = l.conta_id
               JOIN {P}membros m ON m.id = l.responsavel_id' . $onde . '
              ORDER BY l.data DESC, l.criado_em DESC LIMIT 500',
            $parametros,
        );

        Resposta::ok(array_map(static fn (array $l) => [
            'id'            => $l['id'],
            'tipo'          => $l['tipo'],
            'modalidade'    => $l['modalidade'],
            'contribuinteId'=> $l['contribuinte_id'],
            'data'          => $l['data'],
            'descricao'     => $l['descricao'],
            'categoriaId'   => $l['categoria_id'],
            'categoriaNome' => $l['categoria_nome'],
            'contaId'       => $l['conta_id'],
            'contaNome'     => $l['conta_nome'],
            'valor'         => (float) $l['valor'],
            'responsavelId' => $l['responsavel_id'],
            'responsavelNome' => $l['responsavel_nome'],
            'nucleoId'      => $l['nucleo_id'],
            'situacao'      => $l['situacao'],
            'observacao'    => $l['observacao'],
        ], $linhas));
    });

    $r->post('/financeiro/lancamentos', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();

        $tipo = (string) $req->opcao('tipo', ['receita', 'despesa']);
        // Receita e despesa são permissões distintas: quem registra entrada
        // não registra saída sem que isso lhe tenha sido confiado.
        Rbac::exigir($s, $tipo === 'receita' ? 'tesouraria.lancarReceita' : 'tesouraria.lancarDespesa');

        $data = $req->data('data');
        $descricao = $req->texto('descricao', true, 255, 2);
        $categoriaId = $req->id('categoriaId');
        $contaId = $req->id('contaId');
        $valor = $req->decimal('valor', true, 0.01, 1e10);
        $modalidade = $req->opcao('modalidade', ['pistis', 'hekousia'], false, null);
        $contribuinteId = $req->id('contribuinteId', false);
        $nucleoId = $req->id('nucleoId', false);
        $situacao = (string) $req->opcao('situacao', ['previsto', 'liquidado', 'cancelado'], false, 'liquidado');
        $observacao = $req->textoLongo('observacao', false, 2000);
        $req->conferir();

        if ($valor <= 0) {
            $req->rejeitar('valor', 'O valor precisa ser maior que zero.');
        }
        $categoria = Banco::primeiro('SELECT id, tipo FROM {P}categorias_financeiras WHERE id = ?', [$categoriaId]);
        if ($categoria === null) {
            $req->rejeitar('categoriaId', 'Categoria não encontrada.');
        }
        if ($categoria['tipo'] !== $tipo) {
            $req->rejeitar('categoriaId', 'A categoria escolhida é de ' . $categoria['tipo'] . '.');
        }
        if (Banco::primeiro('SELECT id FROM {P}contas WHERE id = ?', [$contaId]) === null) {
            $req->rejeitar('contaId', 'Conta não encontrada.');
        }
        if ($contribuinteId !== null && Banco::primeiro('SELECT id FROM {P}membros WHERE id = ?', [$contribuinteId]) === null) {
            $req->rejeitar('contribuinteId', 'Membro não encontrado.');
        }

        $id = Seguranca::uuid();
        Banco::inserir('lancamentos', [
            'id'              => $id,
            'tipo'            => $tipo,
            'modalidade'      => $modalidade,
            'contribuinte_id' => $contribuinteId,
            'data'            => $data,
            'descricao'       => $descricao,
            'categoria_id'    => $categoriaId,
            'conta_id'        => $contaId,
            'valor'           => $valor,
            'responsavel_id'  => $s['id'],
            'nucleo_id'       => $nucleoId,
            'situacao'        => $situacao,
            'observacao'      => $observacao === '' ? null : $observacao,
        ]);
        Auditoria::registrar((string) $s['id'], 'lancamento.' . $tipo, 'tesouraria', sprintf('%s — %.2f', $descricao, $valor));
        Resposta::ok(['id' => $id]);
    });

    /** Cancelar, e não apagar: a escrituração não some, fica marcada. */
    $r->post('/financeiro/lancamentos/:id/cancelar', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $l = Banco::primeiro('SELECT * FROM {P}lancamentos WHERE id = ?', [$p['id']]);
        if ($l === null) {
            Resposta::naoEncontrado('Lançamento não encontrado.');
        }
        Rbac::exigir($s, $l['tipo'] === 'receita' ? 'tesouraria.lancarReceita' : 'tesouraria.lancarDespesa');
        $motivo = $req->textoLongo('motivo', true, 1000);
        $req->conferir();

        Banco::atualizar('lancamentos', [
            'situacao'   => 'cancelado',
            'observacao' => trim(((string) $l['observacao']) . "\nCancelado: " . $motivo),
        ], 'id = :id', ['id' => $l['id']]);
        Auditoria::registrar((string) $s['id'], 'lancamento.cancelou', 'tesouraria', $l['id'] . ' — ' . $motivo);
        Resposta::ok();
    });

    // -----------------------------------------------------------------
    // Transparência — Est. Art. 13
    // -----------------------------------------------------------------

    /**
     * Números abertos a todo membro. Saem apenas somas por período, conta e
     * categoria: nenhum nome, nenhum valor individual.
     */
    $r->get('/transparencia', static function (array $_p, Requisicao $req): never {
        Seguranca::exigirSessao();
        $de = $req->tem('de') ? $req->data('de') : gmdate('Y-01-01');
        $ate = $req->tem('ate') ? $req->data('ate') : gmdate('Y-m-d');
        $req->conferir();

        $porTipo = Banco::todos(
            "SELECT tipo, SUM(valor) AS total, COUNT(*) AS n
               FROM {P}lancamentos WHERE situacao = 'liquidado' AND data BETWEEN ? AND ?
              GROUP BY tipo",
            [$de, $ate],
        );
        $porCategoria = Banco::todos(
            "SELECT c.nome, c.tipo, c.cor, SUM(l.valor) AS total
               FROM {P}lancamentos l JOIN {P}categorias_financeiras c ON c.id = l.categoria_id
              WHERE l.situacao = 'liquidado' AND l.data BETWEEN ? AND ?
              GROUP BY c.id, c.nome, c.tipo, c.cor ORDER BY total DESC",
            [$de, $ate],
        );
        $porMes = Banco::todos(
            "SELECT DATE_FORMAT(data, '%Y-%m') AS mes, tipo, SUM(valor) AS total
               FROM {P}lancamentos WHERE situacao = 'liquidado' AND data BETWEEN ? AND ?
              GROUP BY mes, tipo ORDER BY mes",
            [$de, $ate],
        );

        $receita = 0.0;
        $despesa = 0.0;
        foreach ($porTipo as $t) {
            if ($t['tipo'] === 'receita') {
                $receita = (float) $t['total'];
            } else {
                $despesa = (float) $t['total'];
            }
        }

        Resposta::ok([
            'periodo'      => ['de' => $de, 'ate' => $ate],
            'receita'      => $receita,
            'despesa'      => $despesa,
            'resultado'    => round($receita - $despesa, 2),
            'porCategoria' => array_map(static fn (array $c) => $c + ['total' => (float) $c['total']], $porCategoria),
            'porMes'       => array_map(static fn (array $m) => $m + ['total' => (float) $m['total']], $porMes),
            // C106:20 — a participação se mede pela adesão, não pelo valor.
            'aderentes'    => (int) Banco::valor('SELECT COUNT(*) FROM {P}compromissos WHERE ativo = 1'),
            'ativos'       => (int) Banco::valor("SELECT COUNT(*) FROM {P}membros WHERE situacao = 'ativo'"),
        ]);
    });

    /**
     * Compromisso de contribuição — C106:7 (Pistis Eisphora).
     *
     * Cada membro assume e revê o próprio compromisso; a Tesouraria vê os
     * números, não a lista de quem está abaixo do esperado.
     */
    $r->post('/compromissos', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $valor = $req->decimal('valorMensal', true, 0, 1e6);
        $inicio = $req->data('inicioVigencia', false) ?? gmdate('Y-m-d');
        $req->conferir();

        Banco::transacao(static function () use ($s, $valor, $inicio): void {
            Banco::executar('UPDATE {P}compromissos SET ativo = 0, fim_vigencia = ? WHERE membro_id = ? AND ativo = 1', [$inicio, $s['id']]);
            if ($valor > 0) {
                Banco::inserir('compromissos', [
                    'id'              => Seguranca::uuid(),
                    'membro_id'       => $s['id'],
                    'valor_mensal'    => $valor,
                    'inicio_vigencia' => $inicio,
                    'ativo'           => 1,
                ]);
            }
        });
        Auditoria::registrar((string) $s['id'], 'compromisso.assumiu', 'tesouraria');
        Resposta::ok();
    });

    $r->get('/compromissos/meu', static function (): never {
        $s = Seguranca::exigirSessao();
        Resposta::ok(Banco::primeiro(
            'SELECT id, valor_mensal AS valorMensal, inicio_vigencia AS inicioVigencia, ativo
               FROM {P}compromissos WHERE membro_id = ? AND ativo = 1',
            [$s['id']],
        ));
    });
};
