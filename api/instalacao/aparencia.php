<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Aparência do instalador.
 *
 * O instalador roda antes de existir build, banco ou sessão: por isso é HTML
 * e CSS embutidos, sem nenhum recurso externo. As cores são as mesmas fichas
 * de src/index.css, para que a primeira tela já pareça a plataforma.
 */
final class Aparencia
{
    public static function e(?string $texto): string
    {
        return htmlspecialchars((string) $texto, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    /** @param array<int,array{rotulo:string,estado:string}> $passos */
    public static function abrir(string $titulo, array $passos = [], string $subtitulo = ''): void
    {
        header('Content-Type: text/html; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('Referrer-Policy: same-origin');
        header('Cache-Control: no-store');
        // O instalador recebe senhas: nada de recurso externo nesta página.
        header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");

        $t = self::e($titulo);
        echo "<!doctype html>\n<html lang=\"pt-BR\"><head><meta charset=\"utf-8\">";
        echo "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
        echo "<meta name=\"robots\" content=\"noindex, nofollow\">";
        echo "<title>{$t} — Instalação</title>";
        echo '<style>' . self::css() . '</style></head><body>';
        echo '<div class="folha">';
        echo '<header class="marca"><div class="selo" aria-hidden="true">OM</div>';
        echo '<div><p class="marca-nome">Ordem dos Monarquistas Conservadores-Liberais</p>';
        echo '<p class="marca-sub">Instalação da plataforma institucional</p></div></header>';

        if ($passos !== []) {
            echo '<ol class="trilha">';
            foreach ($passos as $i => $p) {
                $n = $i + 1;
                $classe = self::e($p['estado']);
                $rotulo = self::e($p['rotulo']);
                $marca = $p['estado'] === 'feito' ? '&#10003;' : (string) $n;
                $atual = $p['estado'] === 'atual' ? ' aria-current="step"' : '';
                echo "<li class=\"passo {$classe}\"{$atual}><span class=\"bolha\">{$marca}</span><span class=\"rotulo\">{$rotulo}</span></li>";
            }
            echo '</ol>';
        }

        echo '<main class="cartao"><h1>' . $t . '</h1>';
        if ($subtitulo !== '') {
            echo '<p class="subtitulo">' . self::e($subtitulo) . '</p>';
        }
    }

    public static function fechar(): void
    {
        echo '</main>';
        echo '<footer class="rodape"><p>Instalador da plataforma. Após concluir, esta pasta pode ser removida do servidor.</p></footer>';
        echo '</div></body></html>';
    }

    public static function aviso(string $tipo, string $texto, bool $bruto = false): void
    {
        $conteudo = $bruto ? $texto : self::e($texto);
        echo '<div class="aviso ' . self::e($tipo) . '">' . $conteudo . '</div>';
    }

    /**
     * Campo de formulário.
     *
     * @param array<string,mixed> $opcoes
     */
    public static function campo(string $nome, string $rotulo, array $opcoes = []): void
    {
        $tipo = (string) ($opcoes['tipo'] ?? 'text');
        $valor = (string) ($opcoes['valor'] ?? '');
        $ajuda = (string) ($opcoes['ajuda'] ?? '');
        $erro = (string) ($opcoes['erro'] ?? '');
        $obrigatorio = ($opcoes['obrigatorio'] ?? true) ? ' required' : '';
        $auto = isset($opcoes['autocomplete']) ? ' autocomplete="' . self::e((string) $opcoes['autocomplete']) . '"' : '';
        $extra = isset($opcoes['placeholder']) ? ' placeholder="' . self::e((string) $opcoes['placeholder']) . '"' : '';
        $id = 'c_' . preg_replace('/[^a-z0-9_]/i', '', $nome);
        $descrito = [];
        if ($ajuda !== '') {
            $descrito[] = $id . '_ajuda';
        }
        if ($erro !== '') {
            $descrito[] = $id . '_erro';
        }
        $aria = $descrito === [] ? '' : ' aria-describedby="' . implode(' ', $descrito) . '"';
        $invalido = $erro !== '' ? ' aria-invalid="true"' : '';

        echo '<div class="campo' . ($erro !== '' ? ' com-erro' : '') . '">';
        echo '<label for="' . $id . '">' . self::e($rotulo) . '</label>';
        echo '<input type="' . self::e($tipo) . '" id="' . $id . '" name="' . self::e($nome) . '"';
        echo ' value="' . self::e($valor) . '"' . $obrigatorio . $auto . $extra . $aria . $invalido . ' spellcheck="false">';
        if ($ajuda !== '') {
            echo '<p class="ajuda" id="' . $id . '_ajuda">' . self::e($ajuda) . '</p>';
        }
        if ($erro !== '') {
            echo '<p class="erro" id="' . $id . '_erro">' . self::e($erro) . '</p>';
        }
        echo '</div>';
    }

    private static function css(): string
    {
        return <<<'CSS'
        :root{
          --superficie:#fffcf6; --cartao:#ffffff; --suave:#f7f2e9; --forte:#eee7d9;
          --borda:#e7decd; --borda-forte:#d6caa2;
          --tinta:#1a160e; --tinta-suave:#605847; --tinta-fraca:#8e8572;
          --ouro:#d69e0b; --ouro-fundo:#fdf3d6; --ouro-profundo:#6c4e00;
          --bom:#157a4c; --alerta:#b06e00; --erro:#ba2821; --info:#2160a8;
          --raio:14px;
        }
        @media (prefers-color-scheme: dark){
          :root{
            --superficie:#12110e; --cartao:#1c1a15; --suave:#25221c; --forte:#302c24;
            --borda:#38332a; --borda-forte:#4e473a;
            --tinta:#f5f0e7; --tinta-suave:#b7afa0; --tinta-fraca:#8a8273;
            --ouro:#f0c110; --ouro-fundo:#3c300e; --ouro-profundo:#ffe08b;
            --bom:#3eac76; --alerta:#e0a028; --erro:#f0746a; --info:#6ca6ec;
          }
        }
        *,*::before,*::after{box-sizing:border-box}
        body{margin:0;background:var(--superficie);color:var(--tinta);
          font:16px/1.55 "Hanken Grotesk",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
          -webkit-text-size-adjust:100%}
        .folha{max-width:640px;margin:0 auto;padding:24px 20px 56px}
        .marca{display:flex;gap:14px;align-items:center;margin:16px 0 26px}
        .selo{width:46px;height:46px;flex:none;border-radius:12px;display:grid;place-items:center;
          background:var(--ouro-fundo);color:var(--ouro-profundo);border:1px solid var(--borda-forte);
          font-weight:700;letter-spacing:.04em}
        .marca-nome{margin:0;font-weight:650;font-size:.95rem;line-height:1.3}
        .marca-sub{margin:2px 0 0;color:var(--tinta-fraca);font-size:.82rem}
        .trilha{list-style:none;display:flex;gap:6px;margin:0 0 18px;padding:0;flex-wrap:wrap}
        .passo{display:flex;align-items:center;gap:7px;padding:6px 11px;border-radius:999px;
          background:var(--suave);color:var(--tinta-fraca);font-size:.79rem;border:1px solid transparent}
        .passo .bolha{width:19px;height:19px;flex:none;border-radius:50%;display:grid;place-items:center;
          background:var(--forte);color:var(--tinta-suave);font-size:.7rem;font-weight:700}
        .passo.atual{background:var(--ouro-fundo);color:var(--ouro-profundo);border-color:var(--borda-forte);font-weight:600}
        .passo.atual .bolha{background:var(--ouro);color:#1a160e}
        .passo.feito{color:var(--bom)}
        .passo.feito .bolha{background:var(--bom);color:#fff}
        .cartao{background:var(--cartao);border:1px solid var(--borda);border-radius:var(--raio);
          padding:26px 24px;box-shadow:0 1px 2px rgba(26,22,14,.05)}
        h1{margin:0 0 6px;font-size:1.4rem;line-height:1.25;letter-spacing:-.01em}
        h2{margin:26px 0 10px;font-size:1rem;letter-spacing:.02em;text-transform:uppercase;color:var(--tinta-fraca)}
        .subtitulo{margin:0 0 20px;color:var(--tinta-suave);font-size:.93rem}
        p{margin:0 0 12px}
        .campo{margin:0 0 16px}
        label{display:block;font-size:.86rem;font-weight:600;margin-bottom:5px}
        input{width:100%;padding:11px 12px;border:1px solid var(--borda-forte);border-radius:10px;
          background:var(--superficie);color:var(--tinta);font:inherit;font-size:.95rem}
        input:focus-visible{outline:2px solid var(--ouro);outline-offset:1px;border-color:var(--ouro)}
        .campo.com-erro input{border-color:var(--erro)}
        .ajuda{margin:5px 0 0;font-size:.8rem;color:var(--tinta-fraca)}
        .erro{margin:5px 0 0;font-size:.82rem;color:var(--erro);font-weight:600}
        .acoes{display:flex;gap:10px;align-items:center;margin-top:22px;flex-wrap:wrap}
        button,.botao{appearance:none;border:0;border-radius:10px;padding:12px 20px;font:inherit;
          font-weight:650;cursor:pointer;background:var(--ouro);color:#1a160e;text-decoration:none;display:inline-block}
        button:hover,.botao:hover{filter:brightness(1.05)}
        button:focus-visible,.botao:focus-visible{outline:2px solid var(--tinta);outline-offset:2px}
        .secundario{background:var(--suave);color:var(--tinta)}
        .aviso{padding:12px 14px;border-radius:10px;margin:0 0 18px;font-size:.9rem;border:1px solid}
        .aviso p:last-child{margin-bottom:0}
        .aviso.erro{background:color-mix(in srgb,var(--erro) 9%,transparent);border-color:var(--erro);color:var(--tinta)}
        .aviso.bom{background:color-mix(in srgb,var(--bom) 10%,transparent);border-color:var(--bom);color:var(--tinta)}
        .aviso.info{background:var(--suave);border-color:var(--borda);color:var(--tinta-suave)}
        .aviso.alerta{background:color-mix(in srgb,var(--alerta) 12%,transparent);border-color:var(--alerta);color:var(--tinta)}
        .lista{list-style:none;margin:0 0 8px;padding:0}
        .lista li{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--borda);align-items:baseline}
        .lista li:last-child{border-bottom:0}
        .lista .nome{flex:1;min-width:0}
        .lista .valor{color:var(--tinta-fraca);font-size:.85rem;text-align:right}
        .sinal{font-weight:700;flex:none;width:1.2em}
        .sinal.ok{color:var(--bom)}
        .sinal.nao{color:var(--erro)}
        .sinal.talvez{color:var(--alerta)}
        pre{background:var(--suave);border:1px solid var(--borda);border-radius:10px;padding:14px;
          overflow-x:auto;font-size:.8rem;line-height:1.5;margin:0 0 14px}
        code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
        .rodape{margin-top:20px;text-align:center;color:var(--tinta-fraca);font-size:.78rem}
        .grade2{display:grid;grid-template-columns:1fr 1fr;gap:0 14px}
        .grade2>*{min-width:0}
        @media (max-width:520px){.grade2{grid-template-columns:1fr}}
        CSS;
    }
}
