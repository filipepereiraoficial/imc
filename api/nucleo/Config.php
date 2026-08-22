<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Configuração da instalação.
 *
 * O arquivo api/config.php é escrito pelo instalador e nunca versionado.
 * Sua ausência é o sinal de que a plataforma ainda não foi instalada — é
 * assim que o roteador decide desviar para a tela de instalação.
 */
final class Config
{
    private static ?array $dados = null;

    /**
     * Onde vive o arquivo de configuração.
     *
     * Por padrão, api/config.php — que é onde a hospedagem compartilhada o
     * espera. A variável OMCL_CONFIG permite tirá-lo dali: em contêiner, o
     * arquivo precisa sobreviver à substituição da imagem, e por isso mora
     * num volume, fora da árvore do código.
     */
    public static function caminho(): string
    {
        $doAmbiente = getenv('OMCL_CONFIG');
        if (is_string($doAmbiente) && $doAmbiente !== '') {
            return $doAmbiente;
        }
        return dirname(__DIR__) . '/config.php';
    }

    public static function instalado(): bool
    {
        return is_file(self::caminho());
    }

    /** @return array<string,mixed> */
    public static function tudo(): array
    {
        if (self::$dados === null) {
            if (!self::instalado()) {
                throw new \RuntimeException('A plataforma ainda não foi instalada.');
            }
            $lido = require self::caminho();
            if (!is_array($lido)) {
                throw new \RuntimeException('api/config.php inválido.');
            }
            self::$dados = $lido;
        }
        return self::$dados;
    }

    public static function ler(string $chave, mixed $padrao = null): mixed
    {
        return self::tudo()[$chave] ?? $padrao;
    }

    public static function prefixo(): string
    {
        return (string) self::ler('prefixo', 'omcl_');
    }

    /** Em desenvolvimento os erros aparecem; em produção só vão para o registro. */
    public static function depuracao(): bool
    {
        return (bool) self::ler('depuracao', false);
    }

    /**
     * Monta o conteúdo do arquivo de configuração.
     *
     * Gerado com var_export para que qualquer aspa ou barra invertida da
     * senha do banco seja escapada pelo próprio PHP, e não por concatenação.
     */
    public static function gerar(array $dados): string
    {
        $corpo = var_export($dados, true);
        return <<<PHP
        <?php
        // Arquivo gerado pelo instalador da Plataforma Institucional da OMCL.
        // Contém credenciais: mantenha fora de controle de versão e sem
        // permissão de leitura pública.
        return {$corpo};

        PHP;
    }
}
