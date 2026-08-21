<?php
declare(strict_types=1);

namespace OMCL;

use PDO;
use PDOException;
use PDOStatement;

/**
 * Acesso ao banco.
 *
 * Toda consulta passa por declaração preparada: os métodos abaixo não
 * aceitam valores concatenados. O nome da tabela é o único trecho montado
 * por interpolação, e vem sempre de `tabela()`, que só aceita identificadores
 * conhecidos.
 */
final class Banco
{
    private static ?PDO $pdo = null;
    private static string $prefixo = '';

    public static function conectar(
        string $servidor,
        string $porta,
        string $base,
        string $usuario,
        string $senha,
        string $prefixo = '',
        string $soquete = '',
    ): PDO {
        $dsn = $soquete !== ''
            ? sprintf('mysql:unix_socket=%s;dbname=%s;charset=utf8mb4', $soquete, $base)
            : sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $servidor, $porta, $base);

        $pdo = new PDO($dsn, $usuario, $senha, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            // Declarações realmente preparadas no servidor: sem emulação não
            // há como um valor ser reinterpretado como parte da instrução.
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_STRINGIFY_FETCHES  => false,
        ]);
        $pdo->exec("SET SESSION sql_mode = 'STRICT_ALL_TABLES,NO_ENGINE_SUBSTITUTION'");
        self::$pdo = $pdo;
        self::$prefixo = $prefixo;
        return $pdo;
    }

    /** Conecta usando api/config.php; usado por todas as rotas. */
    public static function pdo(): PDO
    {
        if (self::$pdo === null) {
            self::conectar(
                (string) Config::ler('bd_servidor', 'localhost'),
                (string) Config::ler('bd_porta', '3306'),
                (string) Config::ler('bd_base', ''),
                (string) Config::ler('bd_usuario', ''),
                (string) Config::ler('bd_senha', ''),
                Config::prefixo(),
                (string) Config::ler('bd_soquete', ''),
            );
        }
        return self::$pdo;
    }

    public static function definirPrefixo(string $prefixo): void
    {
        self::$prefixo = $prefixo;
    }

    /**
     * Nome completo da tabela. Recusa qualquer identificador que não seja
     * composto de letras minúsculas, dígitos e sublinhado.
     */
    public static function tabela(string $nome): string
    {
        if (!preg_match('/^[a-z][a-z0-9_]*$/', $nome)) {
            throw new \InvalidArgumentException('Identificador de tabela inválido.');
        }
        return self::$prefixo . $nome;
    }

    /** Substitui {P} pelo prefixo — usado em SQL escrito à mão e no esquema. */
    public static function sql(string $sql): string
    {
        return str_replace('{P}', self::$prefixo, $sql);
    }

    public static function executar(string $sql, array $parametros = []): PDOStatement
    {
        $st = self::pdo()->prepare(self::sql($sql));
        $st->execute($parametros);
        return $st;
    }

    /** @return array<int,array<string,mixed>> */
    public static function todos(string $sql, array $parametros = []): array
    {
        return self::executar($sql, $parametros)->fetchAll();
    }

    /** @return array<string,mixed>|null */
    public static function primeiro(string $sql, array $parametros = []): ?array
    {
        $linha = self::executar($sql, $parametros)->fetch();
        return $linha === false ? null : $linha;
    }

    public static function valor(string $sql, array $parametros = []): mixed
    {
        $v = self::executar($sql, $parametros)->fetchColumn();
        return $v === false ? null : $v;
    }

    public static function inserir(string $tabela, array $campos): void
    {
        $nomes = array_keys($campos);
        foreach ($nomes as $n) {
            if (!preg_match('/^[a-z][a-z0-9_]*$/', (string) $n)) {
                throw new \InvalidArgumentException('Coluna inválida: ' . $n);
            }
        }
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            self::tabela($tabela),
            implode(', ', $nomes),
            implode(', ', array_map(static fn ($n) => ':' . $n, $nomes)),
        );
        $st = self::pdo()->prepare($sql);
        $st->execute($campos);
    }

    public static function atualizar(string $tabela, array $campos, string $onde, array $parametros): void
    {
        $partes = [];
        foreach (array_keys($campos) as $n) {
            if (!preg_match('/^[a-z][a-z0-9_]*$/', (string) $n)) {
                throw new \InvalidArgumentException('Coluna inválida: ' . $n);
            }
            $partes[] = $n . ' = :c_' . $n;
        }
        $valores = [];
        foreach ($campos as $n => $v) {
            $valores['c_' . $n] = $v;
        }
        $sql = sprintf('UPDATE %s SET %s WHERE %s', self::tabela($tabela), implode(', ', $partes), $onde);
        $st = self::pdo()->prepare($sql);
        $st->execute($valores + $parametros);
    }

    public static function transacao(callable $corpo): mixed
    {
        $pdo = self::pdo();
        $pdo->beginTransaction();
        try {
            $r = $corpo($pdo);
            $pdo->commit();
            return $r;
        } catch (\Throwable $e) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            throw $e;
        }
    }

    /**
     * Executa um arquivo .sql instrução a instrução.
     *
     * Divisor simples e suficiente para o esquema da plataforma: não há
     * gatilhos nem rotinas com ponto e vírgula interno.
     */
    public static function executarArquivo(string $caminho, string $prefixo): int
    {
        $bruto = file_get_contents($caminho);
        if ($bruto === false) {
            throw new \RuntimeException('Não foi possível ler ' . basename($caminho));
        }
        $bruto = str_replace('{P}', $prefixo, $bruto);
        $bruto = preg_replace('/^\s*--.*$/m', '', $bruto) ?? $bruto;

        $conta = 0;
        foreach (explode(';', $bruto) as $instrucao) {
            $instrucao = trim($instrucao);
            if ($instrucao === '') {
                continue;
            }
            self::pdo()->exec($instrucao);
            $conta++;
        }
        return $conta;
    }

    /** Mensagem de erro de conexão em termos que o instalador possa exibir. */
    public static function explicarFalha(PDOException $e): string
    {
        // Em falha de conexão o PDO ora traz o código do driver em getCode(),
        // ora um SQLSTATE textual com o número real em errorInfo[1].
        $codigo = (int) ($e->errorInfo[1] ?? 0);
        if ($codigo === 0 && ctype_digit((string) $e->getCode())) {
            $codigo = (int) $e->getCode();
        }
        return match ($codigo) {
            1045    => 'Usuário ou senha do banco de dados recusados.',
            1049    => 'O banco de dados informado não existe.',
            2002    => 'Não foi possível alcançar o servidor de banco de dados. Confira servidor e porta.',
            2005    => 'Servidor de banco de dados desconhecido.',
            default => 'Falha ao conectar ao banco de dados: ' . $e->getMessage(),
        };
    }
}
