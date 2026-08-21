<?php
declare(strict_types=1);

/**
 * Roteador para o servidor embutido do PHP.
 *
 * Reproduz, sem Apache, o que os arquivos .htaccess fazem em produção:
 * a pasta api/ tem roteador próprio e todo o restante cai no index.html
 * do aplicativo. Serve para experimentar a instalação em máquina local
 * sem montar XAMPP.
 *
 *   php -S localhost:8080 -t dist implantacao/servidor-local.php
 *
 * A raiz (-t) deve conter o index.html do build e a pasta api/ ao lado.
 */

$raiz = $_SERVER['DOCUMENT_ROOT'];
$caminho = parse_url((string) $_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
$caminho = '/' . ltrim(rawurldecode($caminho), '/');

// Nada de subir de diretório pelo caminho da requisição.
if (str_contains($caminho, '..')) {
    http_response_code(400);
    exit;
}

// A pasta api/ e seus arquivos de configuração não são servidos como texto.
if (preg_match('#^/api/(config\.php|nucleo/|.*\.sql$|.*\.json$)#', $caminho)) {
    http_response_code(403);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'erro' => 'Acesso negado.'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (str_starts_with($caminho, '/api')) {
    $alvo = $raiz . $caminho;
    // O instalador e outros arquivos reais são servidos como estão.
    if (is_file($alvo)) {
        return false;
    }
    if (is_dir($alvo) && is_file(rtrim($alvo, '/') . '/index.php')) {
        $_SERVER['SCRIPT_NAME'] = rtrim($caminho, '/') . '/index.php';
        require rtrim($alvo, '/') . '/index.php';
        exit;
    }
    $_GET['rota'] = substr($caminho, 4) ?: '/';
    $_SERVER['SCRIPT_NAME'] = '/api/index.php';
    require $raiz . '/api/index.php';
    exit;
}

if ($caminho !== '/' && is_file($raiz . $caminho)) {
    return false;
}

$indice = $raiz . '/index.html';
if (is_file($indice)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($indice);
    exit;
}

http_response_code(404);
echo 'index.html não encontrado. Rode `npm run build` antes.';
