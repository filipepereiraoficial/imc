<?php
declare(strict_types=1);

/**
 * Partida comum da API e do instalador.
 *
 * Carrega as classes, ajusta o ambiente de execução e converte qualquer
 * erro do PHP em exceção — assim nenhum aviso vaza para dentro do JSON.
 */

namespace OMCL;

if (PHP_VERSION_ID < 80100) {
    header('Content-Type: application/json; charset=utf-8', true, 500);
    echo json_encode(['ok' => false, 'erro' => 'A plataforma exige PHP 8.1 ou superior.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Erros nunca são exibidos: vão para o registro do servidor. A depuração,
// quando ligada em api/config.php, os devolve em JSON pela classe Resposta.
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// Todo o armazenamento é em UTC; a conversão para o fuso do leitor acontece
// na interface, onde se sabe onde o leitor está.
date_default_timezone_set('UTC');

spl_autoload_register(static function (string $classe): void {
    $prefixo = 'OMCL\\';
    if (!str_starts_with($classe, $prefixo)) {
        return;
    }
    $curto = substr($classe, strlen($prefixo));
    if (!preg_match('/^[A-Za-z][A-Za-z0-9]*$/', $curto)) {
        return;
    }
    $arquivo = __DIR__ . '/' . $curto . '.php';
    if (is_file($arquivo)) {
        require_once $arquivo;
    }
});

set_error_handler(static function (int $nivel, string $mensagem, string $arquivo, int $linha): bool {
    if (!(error_reporting() & $nivel)) {
        return false;
    }
    throw new \ErrorException($mensagem, 0, $nivel, $arquivo, $linha);
});

set_exception_handler(static function (\Throwable $e): void {
    Resposta::falha($e);
});

register_shutdown_function(static function (): void {
    $erro = error_get_last();
    if ($erro !== null && in_array($erro['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        error_log('[OMCL] fatal: ' . $erro['message'] . ' em ' . $erro['file'] . ':' . $erro['line']);
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['ok' => false, 'erro' => 'Erro interno. A ocorrência foi registrada.'], JSON_UNESCAPED_UNICODE);
        }
    }
});
