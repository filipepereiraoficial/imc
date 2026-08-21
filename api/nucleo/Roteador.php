<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Roteador mínimo.
 *
 * Padrões usam :nome para trechos variáveis. O caminho é obtido de PATH_INFO
 * quando o servidor o fornece (Apache com reescrita, ou o servidor embutido
 * do PHP) e do parâmetro ?rota= como reserva — algumas hospedagens
 * compartilhadas não preenchem PATH_INFO.
 */
final class Roteador
{
    /** @var array<int,array{metodo:string,partes:string[],alvo:callable}> */
    private array $rotas = [];

    public function add(string $metodo, string $padrao, callable $alvo): void
    {
        $this->rotas[] = [
            'metodo' => strtoupper($metodo),
            'partes' => self::partir($padrao),
            'alvo'   => $alvo,
        ];
    }

    public function get(string $p, callable $a): void    { $this->add('GET', $p, $a); }
    public function post(string $p, callable $a): void   { $this->add('POST', $p, $a); }
    public function put(string $p, callable $a): void    { $this->add('PUT', $p, $a); }
    public function patch(string $p, callable $a): void  { $this->add('PATCH', $p, $a); }
    public function delete(string $p, callable $a): void { $this->add('DELETE', $p, $a); }

    /** @return string[] */
    private static function partir(string $caminho): array
    {
        return array_values(array_filter(explode('/', trim($caminho, '/')), static fn ($p) => $p !== ''));
    }

    public static function caminhoAtual(): string
    {
        $bruto = (string) ($_SERVER['PATH_INFO'] ?? '');
        if ($bruto === '' && isset($_GET['rota'])) {
            $bruto = (string) $_GET['rota'];
        }
        if ($bruto === '') {
            // Servidor embutido do PHP e alguns CGI só trazem REQUEST_URI.
            $uri = parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH) ?: '';
            $script = (string) ($_SERVER['SCRIPT_NAME'] ?? '');
            $base = str_ends_with($script, '/index.php') ? substr($script, 0, -10) : dirname($script);
            $base = rtrim($base, '/');
            if ($base !== '' && str_starts_with($uri, $base)) {
                $uri = substr($uri, strlen($base));
            }
            $bruto = $uri;
        }
        return '/' . trim(preg_replace('#/+#', '/', $bruto) ?? '', '/');
    }

    public function despachar(): never
    {
        $metodo = Requisicao::metodo();
        $partes = self::partir(self::caminhoAtual());
        $caminhoExiste = false;

        foreach ($this->rotas as $rota) {
            if (count($rota['partes']) !== count($partes)) {
                continue;
            }
            $parametros = [];
            $casa = true;
            foreach ($rota['partes'] as $i => $esperado) {
                if (str_starts_with($esperado, ':')) {
                    $parametros[substr($esperado, 1)] = $partes[$i];
                    continue;
                }
                if ($esperado !== $partes[$i]) {
                    $casa = false;
                    break;
                }
            }
            if (!$casa) {
                continue;
            }
            $caminhoExiste = true;
            if ($rota['metodo'] !== $metodo) {
                continue;
            }
            ($rota['alvo'])($parametros, new Requisicao());
            Resposta::ok();
        }

        if ($caminhoExiste) {
            Resposta::erro('Método não aceito neste endereço.', 405);
        }
        Resposta::naoEncontrado('Endereço não existe nesta API.');
    }
}
