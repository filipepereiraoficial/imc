<?php
declare(strict_types=1);

/**
 * Tabelas de referência: cargos, graus, órgãos, território e configuração.
 *
 * São os dados que a interface precisa antes de desenhar qualquer tela.
 * Vêm num pedido só para poupar viagens no primeiro carregamento.
 */

namespace OMCL;

return static function (Roteador $r): void {

    $r->get('/referencias', static function (): never {
        Seguranca::exigirSessao();

        $cargos = [];
        foreach (Rbac::cargos() as $c) {
            $cargos[] = [
                'id'          => $c['id'],
                'codigo'      => $c['codigo'],
                'nome'        => $c['nome'],
                'descricao'   => $c['descricao'],
                'escopo'      => $c['escopo'],
                'precedencia' => (int) $c['precedencia'],
                'sistema'     => (bool) $c['sistema'],
                'permissoes'  => $c['permissoes'],
            ];
        }
        usort($cargos, static fn ($a, $b) => $a['precedencia'] <=> $b['precedencia']);

        $graus = array_map(static fn (array $g) => [
            'id'         => $g['id'],
            'codigo'     => $g['codigo'],
            'nome'       => $g['nome'],
            'categoria'  => $g['categoria'],
            'ordem'      => (int) $g['ordem'],
            'descricao'  => $g['descricao'],
            'xpSugerido' => (int) $g['xp_sugerido'],
        ], Banco::todos('SELECT * FROM {P}graus ORDER BY ordem'));

        $orgaos = [];
        $competencias = [];
        foreach (Banco::todos('SELECT orgao_id, competencia FROM {P}orgao_competencias ORDER BY orgao_id, ordem') as $c) {
            $competencias[$c['orgao_id']][] = $c['competencia'];
        }
        foreach (Banco::todos('SELECT * FROM {P}orgaos ORDER BY ambito, nome') as $o) {
            $orgaos[] = [
                'id'            => $o['id'],
                'codigo'        => $o['codigo'],
                'nome'          => $o['nome'],
                'descricao'     => $o['descricao'],
                'ambito'        => $o['ambito'],
                'nucleoId'      => $o['nucleo_id'],
                'minimoMembros' => $o['minimo_membros'] === null ? null : (int) $o['minimo_membros'],
                'maximoMembros' => $o['maximo_membros'] === null ? null : (int) $o['maximo_membros'],
                'mandatoAnos'   => $o['mandato_anos'] === null ? null : (int) $o['mandato_anos'],
                'fundamento'    => $o['fundamento'],
                'competencias'  => $competencias[$o['id']] ?? [],
            ];
        }

        $config = array_column(
            Banco::todos("SELECT chave, valor FROM {P}config WHERE chave NOT IN ('instalado_em')"),
            'valor',
            'chave',
        );

        Resposta::ok([
            'cargos'     => $cargos,
            'graus'      => $graus,
            'orgaos'     => $orgaos,
            'paises'     => Banco::todos('SELECT id, nome, codigo_iso AS codigoIso, moeda FROM {P}paises ORDER BY nome'),
            'estados'    => Banco::todos('SELECT id, pais_id AS paisId, nome, sigla FROM {P}estados ORDER BY nome'),
            'municipios' => Banco::todos('SELECT id, estado_id AS estadoId, nome FROM {P}municipios ORDER BY nome'),
            'config'     => $config,
        ]);
    });

    // Território — cadastrado pela Secretaria conforme a Ordem se expande.
    $r->post('/estados', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'nucleos.criar');
        $paisId = $req->id('paisId');
        $nome = $req->texto('nome', true, 120);
        $sigla = mb_strtoupper($req->texto('sigla', true, 10));
        $req->conferir();

        if (Banco::primeiro('SELECT id FROM {P}paises WHERE id = ?', [$paisId]) === null) {
            $req->rejeitar('paisId', 'País não encontrado.');
        }
        if (Banco::primeiro('SELECT id FROM {P}estados WHERE pais_id = ? AND sigla = ?', [$paisId, $sigla]) !== null) {
            $req->rejeitar('sigla', 'Já existe um estado com esta sigla neste país.');
        }
        $id = Seguranca::uuid();
        Banco::inserir('estados', ['id' => $id, 'pais_id' => $paisId, 'nome' => $nome, 'sigla' => $sigla]);
        Auditoria::registrar((string) $s['id'], 'territorio.estado.criou', 'secretaria', $nome);
        Resposta::ok(['id' => $id]);
    });

    $r->post('/municipios', static function (array $_p, Requisicao $req): never {
        $s = Seguranca::exigirSessao();
        Rbac::exigir($s, 'nucleos.criar');
        $estadoId = $req->id('estadoId');
        $nome = $req->texto('nome', true, 160);
        $req->conferir();

        if (Banco::primeiro('SELECT id FROM {P}estados WHERE id = ?', [$estadoId]) === null) {
            $req->rejeitar('estadoId', 'Estado não encontrado.');
        }
        if (Banco::primeiro('SELECT id FROM {P}municipios WHERE estado_id = ? AND nome = ?', [$estadoId, $nome]) !== null) {
            $req->rejeitar('nome', 'Este município já está cadastrado neste estado.');
        }
        $id = Seguranca::uuid();
        Banco::inserir('municipios', ['id' => $id, 'estado_id' => $estadoId, 'nome' => $nome]);
        Auditoria::registrar((string) $s['id'], 'territorio.municipio.criou', 'secretaria', $nome);
        Resposta::ok(['id' => $id]);
    });
};
