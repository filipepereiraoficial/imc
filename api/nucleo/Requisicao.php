<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Leitura e validação da entrada.
 *
 * Nenhuma rota lê $_POST ou $_GET diretamente: tudo passa por aqui, onde o
 * valor é convertido para o tipo esperado e recusado quando não cabe. O que
 * não é declarado não chega ao banco.
 */
final class Requisicao
{
    private array $corpo = [];
    private array $erros = [];

    public function __construct()
    {
        $tipo = (string) ($_SERVER['CONTENT_TYPE'] ?? '');
        if (str_contains($tipo, 'application/json')) {
            $bruto = file_get_contents('php://input') ?: '';
            if ($bruto !== '') {
                $decodificado = json_decode($bruto, true);
                if (!is_array($decodificado)) {
                    Resposta::erro('Corpo da requisição não é JSON válido.', 400);
                }
                $this->corpo = $decodificado;
            }
        } else {
            $this->corpo = $_POST;
        }
    }

    public static function metodo(): string
    {
        return strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
    }

    public static function alteraEstado(): bool
    {
        return !in_array(self::metodo(), ['GET', 'HEAD', 'OPTIONS'], true);
    }

    public function bruto(string $campo): mixed
    {
        return $this->corpo[$campo] ?? $_GET[$campo] ?? null;
    }

    public function tem(string $campo): bool
    {
        return array_key_exists($campo, $this->corpo) || array_key_exists($campo, $_GET);
    }

    private function faltando(string $campo, string $motivo): void
    {
        $this->erros[$campo] = $motivo;
    }

    // -----------------------------------------------------------------
    // Acessores tipados
    // -----------------------------------------------------------------

    public function texto(string $campo, bool $obrigatorio = true, int $maximo = 255, int $minimo = 0): string
    {
        $v = $this->bruto($campo);
        if ($v === null || $v === '') {
            if ($obrigatorio) {
                $this->faltando($campo, 'Campo obrigatório.');
            }
            return '';
        }
        if (!is_scalar($v)) {
            $this->faltando($campo, 'Formato inválido.');
            return '';
        }
        // Remove caracteres de controle, que só entram por engano ou por má-fé.
        $texto = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string) $v) ?? '');
        if (!mb_check_encoding($texto, 'UTF-8')) {
            $this->faltando($campo, 'Texto com codificação inválida.');
            return '';
        }
        if (mb_strlen($texto) < $minimo) {
            $this->faltando($campo, sprintf('Use ao menos %d caracteres.', $minimo));
        }
        if (mb_strlen($texto) > $maximo) {
            $this->faltando($campo, sprintf('Use no máximo %d caracteres.', $maximo));
        }
        return $texto;
    }

    /** Texto longo: preserva quebras de linha, remove os demais controles. */
    public function textoLongo(string $campo, bool $obrigatorio = false, int $maximo = 20000): string
    {
        $v = $this->bruto($campo);
        if ($v === null || $v === '') {
            if ($obrigatorio) {
                $this->faltando($campo, 'Campo obrigatório.');
            }
            return '';
        }
        $texto = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string) $v) ?? '');
        if (mb_strlen($texto) > $maximo) {
            $this->faltando($campo, sprintf('Use no máximo %d caracteres.', $maximo));
        }
        return $texto;
    }

    public function email(string $campo, bool $obrigatorio = true): string
    {
        $v = mb_strtolower($this->texto($campo, $obrigatorio, 190));
        if ($v !== '' && !filter_var($v, FILTER_VALIDATE_EMAIL)) {
            $this->faltando($campo, 'Endereço de e-mail inválido.');
            return '';
        }
        return $v;
    }

    /** Senha: não é aparada nem filtrada — espaços fazem parte dela. */
    public function senha(string $campo, bool $obrigatorio = true): string
    {
        $v = $this->bruto($campo);
        if (!is_string($v) || $v === '') {
            if ($obrigatorio) {
                $this->faltando($campo, 'Campo obrigatório.');
            }
            return '';
        }
        return $v;
    }

    public function inteiro(string $campo, bool $obrigatorio = true, int $minimo = PHP_INT_MIN, int $maximo = PHP_INT_MAX): int
    {
        $v = $this->bruto($campo);
        if ($v === null || $v === '') {
            if ($obrigatorio) {
                $this->faltando($campo, 'Campo obrigatório.');
            }
            return 0;
        }
        if (!is_numeric($v) || (int) $v != $v) {
            $this->faltando($campo, 'Informe um número inteiro.');
            return 0;
        }
        $n = (int) $v;
        if ($n < $minimo || $n > $maximo) {
            $this->faltando($campo, sprintf('Informe um valor entre %d e %d.', $minimo, $maximo));
        }
        return $n;
    }

    public function decimal(string $campo, bool $obrigatorio = true, float $minimo = -1e12, float $maximo = 1e12): float
    {
        $v = $this->bruto($campo);
        if ($v === null || $v === '') {
            if ($obrigatorio) {
                $this->faltando($campo, 'Campo obrigatório.');
            }
            return 0.0;
        }
        if (!is_numeric($v)) {
            $this->faltando($campo, 'Informe um número.');
            return 0.0;
        }
        $n = (float) $v;
        if ($n < $minimo || $n > $maximo) {
            $this->faltando($campo, 'Valor fora da faixa aceita.');
        }
        return round($n, 2);
    }

    public function booleano(string $campo, bool $padrao = false): bool
    {
        $v = $this->bruto($campo);
        if ($v === null) {
            return $padrao;
        }
        return filter_var($v, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE) ?? $padrao;
    }

    public function id(string $campo, bool $obrigatorio = true): ?string
    {
        $v = $this->bruto($campo);
        if ($v === null || $v === '') {
            if ($obrigatorio) {
                $this->faltando($campo, 'Campo obrigatório.');
            }
            return null;
        }
        $texto = (string) $v;
        if (!preg_match('/^[A-Za-z0-9_-]{1,64}$/', $texto)) {
            $this->faltando($campo, 'Identificador inválido.');
            return null;
        }
        return $texto;
    }

    /** @param string[] $aceitos */
    public function opcao(string $campo, array $aceitos, bool $obrigatorio = true, ?string $padrao = null): ?string
    {
        $v = $this->bruto($campo);
        if ($v === null || $v === '') {
            if ($obrigatorio) {
                $this->faltando($campo, 'Campo obrigatório.');
            }
            return $padrao;
        }
        $texto = (string) $v;
        if (!in_array($texto, $aceitos, true)) {
            $this->faltando($campo, 'Opção não reconhecida.');
            return $padrao;
        }
        return $texto;
    }

    public function data(string $campo, bool $obrigatorio = true): ?string
    {
        $v = $this->texto($campo, $obrigatorio, 10);
        if ($v === '') {
            return null;
        }
        $d = \DateTimeImmutable::createFromFormat('!Y-m-d', $v);
        if ($d === false || $d->format('Y-m-d') !== $v) {
            $this->faltando($campo, 'Informe a data no formato AAAA-MM-DD.');
            return null;
        }
        return $v;
    }

    public function dataHora(string $campo, bool $obrigatorio = true): ?string
    {
        $v = $this->texto($campo, $obrigatorio, 40);
        if ($v === '') {
            return null;
        }
        try {
            return (new \DateTimeImmutable($v))->setTimezone(new \DateTimeZone('UTC'))->format('Y-m-d H:i:s');
        } catch (\Exception) {
            $this->faltando($campo, 'Data e hora inválidas.');
            return null;
        }
    }

    /** @return string[] */
    public function listaDeIds(string $campo): array
    {
        $v = $this->bruto($campo);
        if ($v === null || $v === '') {
            return [];
        }
        $itens = is_array($v) ? $v : explode(',', (string) $v);
        $saida = [];
        foreach ($itens as $item) {
            $item = trim((string) $item);
            if ($item !== '' && preg_match('/^[A-Za-z0-9_-]{1,64}$/', $item)) {
                $saida[] = $item;
            }
        }
        return array_values(array_unique($saida));
    }

    // -----------------------------------------------------------------

    public function valido(): bool
    {
        return $this->erros === [];
    }

    /** Interrompe com 422 e a lista de campos rejeitados. */
    public function conferir(): void
    {
        if ($this->erros !== []) {
            Resposta::erro('Confira os campos destacados.', 422, ['campos' => $this->erros]);
        }
    }

    public function rejeitar(string $campo, string $motivo): never
    {
        Resposta::erro('Confira os campos destacados.', 422, ['campos' => [$campo => $motivo]]);
    }
}
