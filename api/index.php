<?php
declare(strict_types=1);

/**
 * Ponto de entrada da API.
 *
 * Todas as chamadas de /api/... passam por aqui. A ordem importa:
 * cabeçalhos de segurança, verificação de instalação, confirmação de origem
 * (CSRF) e só então o roteamento.
 */

namespace OMCL;

require_once __DIR__ . '/nucleo/inicio.php';

Resposta::cabecalhosSeguranca();

if (Requisicao::metodo() === 'OPTIONS') {
    http_response_code(204);
    header('Allow: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    exit;
}

// Antes de instalada, a API só sabe responder que precisa ser instalada.
// O cliente usa esta resposta para levar o visitante ao instalador.
if (!Config::instalado()) {
    if (Roteador::caminhoAtual() === '/estado') {
        Resposta::json(['ok' => true, 'instalado' => false, 'instalador' => 'instalacao/']);
    }
    Resposta::json([
        'ok'          => false,
        'instalado'   => false,
        'erro'        => 'A plataforma ainda não foi instalada.',
        'instalador'  => 'instalacao/',
    ], 503);
}

Banco::definirPrefixo(Config::prefixo());

// Confirmação de origem em tudo que altera estado. As exceções são as rotas
// que ainda não têm sessão de onde derivar o token; elas se defendem pela
// limitação de tentativas.
$semCsrf = ['/sessao', '/sessao/recuperar', '/sessao/redefinir', '/cadastro'];
if (Requisicao::alteraEstado() && !in_array(Roteador::caminhoAtual(), $semCsrf, true)) {
    Seguranca::exigirCsrf();
}

$r = new Roteador();

foreach (['sessao', 'referencias', 'membros', 'nucleos', 'publicacoes', 'assembleias', 'financeiro', 'administracao'] as $grupo) {
    $arquivo = __DIR__ . '/rotas/' . $grupo . '.php';
    if (is_file($arquivo)) {
        (require $arquivo)($r);
    }
}

$r->get('/estado', static function (): never {
    $config = Banco::todos('SELECT chave, valor FROM {P}config WHERE chave IN (?, ?, ?)', [
        'nome_sistema', 'nome_organizacao', 'versao_esquema',
    ]);
    $mapa = array_column($config, 'valor', 'chave');
    Resposta::json([
        'ok'          => true,
        'instalado'   => true,
        'sistema'     => $mapa['nome_sistema'] ?? 'Plataforma da Ordem',
        'organizacao' => $mapa['nome_organizacao'] ?? '',
        'esquema'     => $mapa['versao_esquema'] ?? '1',
    ]);
});

$r->despachar();
