<?php
declare(strict_types=1);

/**
 * Feed, comentários e reconhecimentos.
 *
 * Comunicado oficial e publicação de membro são coisas distintas: a primeira
 * exige permissão própria e leva o nome do órgão que a emitiu, para que o
 * leitor saiba de quem parte a palavra.
 */

namespace OMCL;

return static function (Roteador $r): void {

    $r->get('/publicacoes', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();

        $condicoes = [];
        $parametros = [];
        if ($req->tem('nucleoId')) {
            $condicoes[] = '(p.nucleo_id = ? OR p.nucleo_id IS NULL)';
            $parametros[] = $req->id('nucleoId');
        }
        if ($req->tem('categoria')) {
            $condicoes[] = 'p.categoria = ?';
            $parametros[] = $req->opcao('categoria', ['comunicado', 'formacao', 'evento', 'nucleo', 'noticia', 'membro']);
        }
        if ($req->tem('autorId')) {
            $condicoes[] = 'p.autor_id = ?';
            $parametros[] = $req->id('autorId');
        }
        if ($req->booleano('oficiais')) {
            $condicoes[] = 'p.oficial = 1';
        }
        $req->conferir();

        $onde = $condicoes === [] ? '' : ' WHERE ' . implode(' AND ', $condicoes);
        $pagina = max(1, $req->inteiro('pagina', false, 1, 10000) ?: 1);
        $porPagina = 20;

        $linhas = Banco::todos(
            'SELECT p.*, m.nome_exibicao, m.usuario, m.foto_url, m.cargo_id, m.grau_id, m.xp,
                    (SELECT COUNT(*) FROM {P}curtidas c WHERE c.publicacao_id = p.id) AS curtidas,
                    (SELECT COUNT(*) FROM {P}comentarios co WHERE co.publicacao_id = p.id) AS comentarios,
                    EXISTS(SELECT 1 FROM {P}curtidas c2 WHERE c2.publicacao_id = p.id AND c2.membro_id = ?) AS curti
               FROM {P}publicacoes p
               JOIN {P}membros m ON m.id = p.autor_id' . $onde . '
              ORDER BY p.fixado DESC, p.criado_em DESC
              LIMIT ' . $porPagina . ' OFFSET ' . (($pagina - 1) * $porPagina),
            array_merge([$s['id']], $parametros),
        );

        Resposta::ok(array_map(static fn (array $p) => [
            'id'          => $p['id'],
            'autor'       => Membros::resumo(['id' => $p['autor_id']] + [
                'nome_exibicao' => $p['nome_exibicao'],
                'usuario'       => $p['usuario'],
                'foto_url'      => $p['foto_url'],
                'cargo_id'      => $p['cargo_id'],
                'grau_id'       => $p['grau_id'],
                'xp'            => $p['xp'],
            ]),
            'emitidoPor'  => $p['emitido_por'],
            'oficial'     => (bool) $p['oficial'],
            'categoria'   => $p['categoria'],
            'nucleoId'    => $p['nucleo_id'],
            'titulo'      => $p['titulo'],
            'conteudo'    => $p['conteudo'],
            'fixado'      => (bool) $p['fixado'],
            'destaque'    => (bool) $p['destaque'],
            'curtidas'    => (int) $p['curtidas'],
            'comentarios' => (int) $p['comentarios'],
            'curti'       => (bool) $p['curti'],
            'criadoEm'    => $p['criado_em'],
        ], $linhas), ['pagina' => $pagina, 'porPagina' => $porPagina]);
    });

    $r->post('/publicacoes', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'publicacoes.criar');

        $conteudo = $req->textoLongo('conteudo', true, 20000);
        $titulo = $req->texto('titulo', false, 200);
        $categoria = (string) $req->opcao('categoria', ['comunicado', 'formacao', 'evento', 'nucleo', 'noticia', 'membro'], false, 'membro');
        $oficial = $req->booleano('oficial');
        $emitidoPor = $req->texto('emitidoPor', false, 120);
        $nucleoId = $req->id('nucleoId', false);
        $req->conferir();

        if (mb_strlen($conteudo) < 2) {
            $req->rejeitar('conteudo', 'Escreva algo antes de publicar.');
        }
        if ($oficial) {
            // O comunicado oficial fala em nome da Ordem: quem não tem a
            // permissão não o emite, mesmo podendo publicar no feed.
            Rbac::exigir($s, 'publicacoes.publicarOficial', ['nucleoId' => $nucleoId]);
            if ($emitidoPor === '') {
                $req->rejeitar('emitidoPor', 'Informe o órgão que emite o comunicado.');
            }
        }
        if ($nucleoId !== null && Banco::primeiro('SELECT id FROM {P}nucleos WHERE id = ?', [$nucleoId]) === null) {
            $req->rejeitar('nucleoId', 'Núcleo não encontrado.');
        }

        $id = Seguranca::uuid();
        Banco::inserir('publicacoes', [
            'id'          => $id,
            'autor_id'    => $s['id'],
            'emitido_por' => $oficial ? $emitidoPor : null,
            'oficial'     => $oficial ? 1 : 0,
            'categoria'   => $categoria,
            'nucleo_id'   => $nucleoId,
            'titulo'      => $titulo === '' ? null : $titulo,
            'conteudo'    => $conteudo,
            'criado_em'   => gmdate('Y-m-d H:i:s'),
        ]);
        if ($oficial) {
            Auditoria::registrar((string) $s['id'], 'publicacao.oficial', 'comunicacao', $emitidoPor . ': ' . ($titulo ?: mb_substr($conteudo, 0, 60)));
        }
        Resposta::ok(['id' => $id]);
    });

    $r->delete('/publicacoes/:id', static function (array $p): never {
        $s = Seguranca::exigirSessao();
        $pub = Banco::primeiro('SELECT * FROM {P}publicacoes WHERE id = ?', [$p['id']]);
        if ($pub === null) {
            Resposta::naoEncontrado('Publicação não encontrada.');
        }
        // O autor apaga o que escreveu; os demais precisam de moderação.
        if ($pub['autor_id'] !== $s['id']) {
            Rbac::exigir($s, 'publicacoes.moderar', ['nucleoId' => $pub['nucleo_id']]);
            Auditoria::registrar((string) $s['id'], 'publicacao.moderou', 'comunicacao', (string) $pub['id']);
        }
        Banco::executar('DELETE FROM {P}publicacoes WHERE id = ?', [$pub['id']]);
        Resposta::ok();
    });

    /** Fixar e destacar são atos de moderação, não do autor. */
    $r->patch('/publicacoes/:id', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        $pub = Banco::primeiro('SELECT * FROM {P}publicacoes WHERE id = ?', [$p['id']]);
        if ($pub === null) {
            Resposta::naoEncontrado('Publicação não encontrada.');
        }
        Rbac::exigir($s, 'publicacoes.moderar', ['nucleoId' => $pub['nucleo_id']]);

        $campos = [];
        if ($req->tem('fixado')) {
            $campos['fixado'] = $req->booleano('fixado') ? 1 : 0;
        }
        if ($req->tem('destaque')) {
            $campos['destaque'] = $req->booleano('destaque') ? 1 : 0;
        }
        $req->conferir();
        if ($campos === []) {
            Resposta::erro('Nada a alterar.', 400);
        }
        Banco::atualizar('publicacoes', $campos, 'id = :id', ['id' => $pub['id']]);
        Auditoria::registrar((string) $s['id'], 'publicacao.destacou', 'comunicacao', (string) $pub['id']);
        Resposta::ok();
    });

    $r->get('/publicacoes/:id/comentarios', static function (array $p): never {
        Seguranca::exigirSessao();
        $linhas = Banco::todos(
            'SELECT c.id, c.conteudo, c.criado_em, m.id AS autor_id, m.nome_exibicao, m.usuario, m.foto_url,
                    m.cargo_id, m.grau_id, m.xp, m.nucleo_id
               FROM {P}comentarios c JOIN {P}membros m ON m.id = c.autor_id
              WHERE c.publicacao_id = ? ORDER BY c.criado_em',
            [$p['id']],
        );
        Resposta::ok(array_map(static fn (array $c) => [
            'id'       => $c['id'],
            'conteudo' => $c['conteudo'],
            'criadoEm' => $c['criado_em'],
            'autor'    => Membros::resumo(['id' => $c['autor_id']] + $c),
        ], $linhas));
    });

    $r->post('/publicacoes/:id/comentarios', static function (array $p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'publicacoes.criar');
        if (Banco::primeiro('SELECT id FROM {P}publicacoes WHERE id = ?', [$p['id']]) === null) {
            Resposta::naoEncontrado('Publicação não encontrada.');
        }
        $conteudo = $req->textoLongo('conteudo', true, 4000);
        $req->conferir();
        if (mb_strlen($conteudo) < 1) {
            $req->rejeitar('conteudo', 'Escreva o comentário.');
        }
        $id = Seguranca::uuid();
        Banco::inserir('comentarios', [
            'id'            => $id,
            'publicacao_id' => $p['id'],
            'autor_id'      => $s['id'],
            'conteudo'      => $conteudo,
            'criado_em'     => gmdate('Y-m-d H:i:s'),
        ]);
        Resposta::ok(['id' => $id]);
    });

    $r->delete('/comentarios/:id', static function (array $p): never {
        $s = Seguranca::exigirSessao();
        $c = Banco::primeiro('SELECT * FROM {P}comentarios WHERE id = ?', [$p['id']]);
        if ($c === null) {
            Resposta::naoEncontrado('Comentário não encontrado.');
        }
        if ($c['autor_id'] !== $s['id']) {
            Rbac::exigir($s, 'publicacoes.moderar');
        }
        Banco::executar('DELETE FROM {P}comentarios WHERE id = ?', [$c['id']]);
        Resposta::ok();
    });

    /** Reconhecimento de uma publicação. Alternar é idempotente. */
    $r->post('/publicacoes/:id/curtida', static function (array $p): never {
        $s = Seguranca::exigirSessao();
        if (Banco::primeiro('SELECT id FROM {P}publicacoes WHERE id = ?', [$p['id']]) === null) {
            Resposta::naoEncontrado('Publicação não encontrada.');
        }
        $existe = Banco::primeiro(
            'SELECT publicacao_id FROM {P}curtidas WHERE publicacao_id = ? AND membro_id = ?',
            [$p['id'], $s['id']],
        );
        if ($existe === null) {
            Banco::inserir('curtidas', [
                'publicacao_id' => $p['id'],
                'membro_id'     => $s['id'],
                'criado_em'     => gmdate('Y-m-d H:i:s'),
            ]);
        } else {
            Banco::executar('DELETE FROM {P}curtidas WHERE publicacao_id = ? AND membro_id = ?', [$p['id'], $s['id']]);
        }
        $total = (int) Banco::valor('SELECT COUNT(*) FROM {P}curtidas WHERE publicacao_id = ?', [$p['id']]);
        Resposta::ok(['curti' => $existe === null, 'curtidas' => $total]);
    });
};
