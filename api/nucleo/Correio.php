<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Envio de mensagens.
 *
 * Usa a função mail() do PHP, presente em praticamente toda hospedagem
 * compartilhada. Quando o servidor não a oferece — caso comum no XAMPP em
 * máquina local —, a mensagem vai para o registro em vez de se perder em
 * silêncio: em desenvolvimento é assim que se recupera o link enviado.
 */
final class Correio
{
    public static function remetente(): string
    {
        $config = (string) Config::ler('email_remetente', '');
        if ($config !== '') {
            return $config;
        }
        $servidor = (string) ($_SERVER['SERVER_NAME'] ?? 'localhost');
        return 'nao-responda@' . preg_replace('/^www\./', '', $servidor);
    }

    public static function enviar(string $para, string $assunto, string $corpo): bool
    {
        $cabecalhos = [
            'From: ' . self::remetente(),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'Auto-Submitted: auto-generated',
        ];
        // Cabeçalhos injetados por quebra de linha no assunto são o vetor
        // clássico deste ponto; o assunto vai codificado e em uma só linha.
        $assunto = '=?UTF-8?B?' . base64_encode(str_replace(["\r", "\n"], ' ', $assunto)) . '?=';

        if (!function_exists('mail')) {
            error_log("[OMCL] correio indisponível — para {$para}: {$corpo}");
            return false;
        }
        $enviado = @mail($para, $assunto, $corpo, implode("\r\n", $cabecalhos));
        if (!$enviado) {
            error_log("[OMCL] falha ao enviar para {$para}. Conteúdo: {$corpo}");
        }
        return $enviado;
    }

    public static function enderecoBase(): string
    {
        $esquema = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $servidor = (string) ($_SERVER['HTTP_HOST'] ?? 'localhost');
        $base = rtrim((string) Config::ler('base_url', '/'), '/');
        return $esquema . '://' . $servidor . $base;
    }

    public static function enviarRecuperacao(string $para, string $nome, string $token): void
    {
        $sistema = (string) (Banco::valor('SELECT valor FROM {P}config WHERE chave = ?', ['nome_sistema']) ?? 'Plataforma da Ordem');
        $link = self::enderecoBase() . '/#/redefinir?token=' . rawurlencode($token);
        $corpo = <<<TEXTO
        {$nome},

        Recebemos um pedido para redefinir a sua senha de acesso.

        {$link}

        O link vale por uma hora e serve uma única vez. Se não foi você quem
        pediu, ignore esta mensagem: nada muda enquanto o link não for usado.

        {$sistema}
        TEXTO;

        self::enviar($para, 'Redefinição de senha', $corpo);
    }
}
