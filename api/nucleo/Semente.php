<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Dados normativos de origem: cargos, permissões, graus e órgãos.
 *
 * O arquivo semente.json é gerado de src/data por `npm run semente`. Mantê-lo
 * fora do instalador é deliberado: a criação de um Núcleo precisa dos órgãos
 * locais obrigatórios do Est. Art. 59 muito depois de a pasta de instalação
 * ter sido removida do servidor, como o próprio instalador recomenda.
 */
final class Semente
{
    private static ?array $dados = null;

    /** @return array<string,mixed> */
    public static function tudo(): array
    {
        if (self::$dados === null) {
            $caminho = __DIR__ . '/semente.json';
            $bruto = is_file($caminho) ? file_get_contents($caminho) : false;
            if ($bruto === false) {
                throw new \RuntimeException('api/nucleo/semente.json não encontrado. Rode `npm run semente`.');
            }
            $dados = json_decode($bruto, true);
            if (!is_array($dados)) {
                throw new \RuntimeException('api/nucleo/semente.json está corrompido.');
            }
            self::$dados = $dados;
        }
        return self::$dados;
    }

    public static function disponivel(): bool
    {
        return is_file(__DIR__ . '/semente.json');
    }

    /** @return array<int,array<string,mixed>> */
    public static function cargos(): array
    {
        return self::tudo()['cargos'] ?? [];
    }

    /** @return array<int,array<string,mixed>> */
    public static function graus(): array
    {
        return self::tudo()['graus'] ?? [];
    }

    /** @return array<int,array<string,mixed>> */
    public static function orgaosCentrais(): array
    {
        return self::tudo()['orgaosCentrais'] ?? [];
    }

    /** Est. Art. 59 — os três órgãos que todo Núcleo precisa ter. */
    public static function orgaosLocais(): array
    {
        return self::tudo()['orgaosLocais'] ?? [];
    }

    /** @return string[] */
    public static function permissoes(): array
    {
        return self::tudo()['permissoes'] ?? [];
    }
}
