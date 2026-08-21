<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Saída em JSON e cabeçalhos de segurança.
 *
 * A API nunca devolve HTML: mesmo os erros saem em JSON, para que o cliente
 * não precise interpretar páginas de erro do servidor.
 */
final class Resposta
{
    /** Cabeçalhos aplicados a toda resposta da API. */
    public static function cabecalhosSeguranca(): void
    {
        if (headers_sent()) {
            return;
        }
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('Referrer-Policy: same-origin');
        header('Cross-Origin-Resource-Policy: same-origin');
        header('Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()');
        // A API não é um documento: nada deve ser carregado a partir dela.
        header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
        // Respostas autenticadas não devem ficar em cache intermediário.
        header('Cache-Control: no-store');
        header_remove('X-Powered-By');
    }

    public static function json(mixed $corpo, int $situacao = 200): never
    {
        self::cabecalhosSeguranca();
        if (!headers_sent()) {
            http_response_code($situacao);
            header('Content-Type: application/json; charset=utf-8');
        }
        echo json_encode(
            $corpo,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE,
        );
        exit;
    }

    public static function ok(mixed $dados = null, array $extra = []): never
    {
        self::json(['ok' => true, 'dados' => $dados] + $extra);
    }

    /**
     * Erro previsto. A mensagem é escrita para ser lida pelo usuário; o
     * detalhe técnico, quando existir, vai para o registro do servidor.
     */
    public static function erro(string $mensagem, int $situacao = 400, array $extra = []): never
    {
        self::json(['ok' => false, 'erro' => $mensagem] + $extra, $situacao);
    }

    public static function naoAutenticado(string $mensagem = 'Sessão ausente ou expirada.'): never
    {
        self::erro($mensagem, 401);
    }

    public static function proibido(string $mensagem = 'Você não tem permissão para esta ação.'): never
    {
        self::erro($mensagem, 403);
    }

    public static function naoEncontrado(string $mensagem = 'Recurso não encontrado.'): never
    {
        self::erro($mensagem, 404);
    }

    /** Falha inesperada: o cliente recebe uma frase genérica, o registro recebe tudo. */
    public static function falha(\Throwable $e): never
    {
        error_log('[OMCL] ' . $e::class . ': ' . $e->getMessage() . ' em ' . $e->getFile() . ':' . $e->getLine());
        $depurando = Config::instalado() && Config::depuracao();
        self::erro(
            $depurando ? $e->getMessage() : 'Erro interno. A ocorrência foi registrada.',
            500,
            $depurando ? ['origem' => $e->getFile() . ':' . $e->getLine()] : [],
        );
    }
}
