<?php
declare(strict_types=1);

/**
 * Instalador da plataforma.
 *
 * Quatro passos, na ordem em que as decisões precisam ser tomadas:
 *   1. requisitos   — o servidor tem o que é preciso?
 *   2. banco        — endereço, base, usuário, senha e prefixo
 *   3. identidade   — nome do sistema, nome da organização e a conta de administração
 *   4. concluído    — o que fazer em seguida
 *
 * Depois de concluído, o instalador se recusa a rodar de novo: a existência
 * da chave `instalado_em` na tabela de configuração é o trinco.
 */

namespace OMCL;

require_once dirname(__DIR__) . '/nucleo/inicio.php';
require_once __DIR__ . '/aparencia.php';
require_once __DIR__ . '/Instalador.php';

// Erros do instalador são páginas, não JSON: quem está instalando está no
// navegador e precisa ler o que houve.
set_exception_handler(static function (\Throwable $e): void {
    error_log('[OMCL instalador] ' . $e->getMessage() . ' em ' . $e->getFile() . ':' . $e->getLine());
    if (!headers_sent()) {
        http_response_code(500);
    }
    Aparencia::abrir('Não foi possível continuar');
    Aparencia::aviso('erro', $e->getMessage());
    echo '<p>Corrija o que está indicado e volte a esta página. Nada foi deixado pela metade: '
       . 'o instalador desfaz o que tiver começado antes de falhar.</p>';
    echo '<div class="acoes"><a class="botao secundario" href="?passo=requisitos">Recomeçar</a></div>';
    Aparencia::fechar();
});

session_set_cookie_params([
    'httponly' => true,
    'samesite' => 'Strict',
    'secure'   => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
]);
session_name('omcl_instalacao');
session_start();

function chaveDoFormulario(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = Seguranca::tokenAleatorio(24);
    }
    return (string) $_SESSION['csrf'];
}

function conferirFormulario(): void
{
    $enviado = (string) ($_POST['csrf'] ?? '');
    if ($enviado === '' || !hash_equals(chaveDoFormulario(), $enviado)) {
        throw new \RuntimeException('A página expirou. Recarregue e preencha de novo.');
    }
}

function campoChave(): void
{
    echo '<input type="hidden" name="csrf" value="' . Aparencia::e(chaveDoFormulario()) . '">';
}

/** @return array<int,array{rotulo:string,estado:string}> */
function trilha(string $atual): array
{
    $ordem = ['requisitos' => 'Requisitos', 'banco' => 'Banco de dados', 'identidade' => 'Identidade', 'concluido' => 'Conclusão'];
    $indiceAtual = array_search($atual, array_keys($ordem), true);
    $saida = [];
    foreach (array_values($ordem) as $i => $rotulo) {
        $saida[] = [
            'rotulo' => $rotulo,
            'estado' => $i < $indiceAtual ? 'feito' : ($i === $indiceAtual ? 'atual' : 'futuro'),
        ];
    }
    return $saida;
}

function irPara(string $passo): never
{
    header('Location: ?passo=' . rawurlencode($passo), true, 303);
    exit;
}

$passo = (string) ($_GET['passo'] ?? '');
$metodo = Requisicao::metodo();

// -----------------------------------------------------------------------
// Trinco: instalação já concluída
// -----------------------------------------------------------------------
// A tela final é a exceção: quem acabou de instalar precisa vê-la, e a
// prova de que foi ele é o registro deixado na sessão do instalador.
$recemInstalado = ($_GET['passo'] ?? '') === 'concluido' && !empty($_SESSION['concluido']);

if (!$recemInstalado && Instalador::jaInstalado()) {
    http_response_code(403);
    Aparencia::abrir('A plataforma já está instalada');
    Aparencia::aviso('alerta', 'Existe uma instalação concluída neste endereço. Rodar o instalador de novo apagaria o quadro de membros, as deliberações e a escrituração — por isso ele para aqui.');
    echo '<p>Para recomeçar do zero, é preciso, deliberadamente: remover <code>api/config.php</code> '
       . 'e apagar as tabelas com o prefixo desta instalação. Para entrar, use a tela de acesso.</p>';
    echo '<div class="acoes"><a class="botao" href="../../">Ir para a plataforma</a></div>';
    Aparencia::fechar();
    exit;
}

// Configuração já gravada mas banco ainda sem dados: retoma na identidade.
if ($passo === '' && Config::instalado()) {
    $passo = 'identidade';
}
if ($passo === '') {
    $passo = 'requisitos';
}

switch ($passo) {

    // -------------------------------------------------------------------
    // 1. Requisitos
    // -------------------------------------------------------------------
    case 'requisitos':
        $itens = Instalador::requisitos();
        $pode = Instalador::requisitosAtendidos();

        Aparencia::abrir(
            'Antes de começar',
            trilha('requisitos'),
            'A instalação leva poucos minutos. Tenha à mão os dados do banco de dados — o painel da sua hospedagem os fornece; no XAMPP, o usuário costuma ser "root" sem senha.',
        );

        if (!$pode) {
            Aparencia::aviso('erro', 'O servidor não atende a tudo o que é necessário. Os itens marcados em vermelho precisam ser resolvidos antes de continuar.');
        }

        echo '<h2>Verificação do servidor</h2><ul class="lista">';
        foreach ($itens as $i) {
            $classe = $i['atende'] ? 'ok' : ($i['exigido'] ? 'nao' : 'talvez');
            $marca = $i['atende'] ? '&#10003;' : ($i['exigido'] ? '&#10007;' : '!');
            echo '<li><span class="sinal ' . $classe . '" aria-hidden="true">' . $marca . '</span>';
            echo '<span class="nome">' . Aparencia::e($i['nome']) . '</span>';
            echo '<span class="valor">' . Aparencia::e($i['detalhe']) . '</span></li>';
        }
        echo '</ul>';

        echo '<div class="acoes">';
        if ($pode) {
            echo '<a class="botao" href="?passo=banco">Continuar</a>';
        } else {
            echo '<a class="botao secundario" href="?passo=requisitos">Verificar de novo</a>';
        }
        echo '</div>';
        Aparencia::fechar();
        break;

    // -------------------------------------------------------------------
    // 2. Banco de dados
    // -------------------------------------------------------------------
    case 'banco':
        $valores = [
            'servidor' => 'localhost',
            'porta'    => '3306',
            'base'     => '',
            'usuario'  => '',
            'senha'    => '',
            'prefixo'  => 'omcl_',
        ];
        $erros = [];
        $recado = '';

        if ($metodo === 'POST') {
            conferirFormulario();
            foreach (array_keys($valores) as $campo) {
                $valores[$campo] = trim((string) ($_POST[$campo] ?? ''));
            }
            // A senha não é aparada: espaços podem fazer parte dela.
            $valores['senha'] = (string) ($_POST['senha'] ?? '');

            if ($valores['servidor'] === '') {
                $erros['servidor'] = 'Informe o endereço do servidor.';
            }
            if ($valores['base'] === '') {
                $erros['base'] = 'Informe o nome do banco de dados.';
            }
            if ($valores['usuario'] === '') {
                $erros['usuario'] = 'Informe o usuário do banco.';
            }
            if ($valores['porta'] === '' || !ctype_digit($valores['porta'])) {
                $erros['porta'] = 'A porta é um número; o padrão do MySQL é 3306.';
            }
            if (!preg_match('/^[a-z][a-z0-9_]{0,20}$/', $valores['prefixo'])) {
                $erros['prefixo'] = 'Use apenas letras minúsculas, números e sublinhado, começando por letra.';
            }

            if ($erros === []) {
                try {
                    Banco::conectar(
                        $valores['servidor'],
                        $valores['porta'],
                        $valores['base'],
                        $valores['usuario'],
                        $valores['senha'],
                        $valores['prefixo'],
                    );
                } catch (\PDOException $e) {
                    $erros['base'] = Banco::explicarFalha($e);
                }
            }

            if ($erros === []) {
                $existentes = Instalador::tabelasExistentes($valores['prefixo']);
                if ($existentes !== [] && ($_POST['confirmar_prefixo'] ?? '') !== '1') {
                    $recado = sprintf(
                        'Já existem %d tabelas com o prefixo "%s" neste banco. Escolha outro prefixo — ou confirme abaixo, ciente de que a instalação falhará se elas forem da plataforma.',
                        count($existentes),
                        $valores['prefixo'],
                    );
                } else {
                    $_SESSION['bd'] = $valores;
                    $_SESSION['chave_secreta'] = $_SESSION['chave_secreta'] ?? bin2hex(random_bytes(32));
                    irPara('identidade');
                }
            }
        }

        Aparencia::abrir(
            'Conexão com o banco de dados',
            trilha('banco'),
            'Estes dados vêm do painel da sua hospedagem. O instalador só os grava depois de conseguir conectar.',
        );

        if ($recado !== '') {
            Aparencia::aviso('alerta', $recado);
        }
        if (isset($erros['base']) && str_contains($erros['base'], 'não existe')) {
            Aparencia::aviso('info', 'O banco de dados precisa ser criado antes, pelo painel da hospedagem ou pelo phpMyAdmin. O instalador não o cria, para não exigir do usuário do banco um poder que ele não deve ter no dia a dia.');
        }

        echo '<form method="post" action="?passo=banco" novalidate>';
        campoChave();
        Aparencia::campo('base', 'Nome do banco de dados', [
            'valor' => $valores['base'],
            'erro'  => $erros['base'] ?? '',
            'ajuda' => 'O banco precisa existir. Crie-o no painel da hospedagem, se ainda não existir.',
            'autocomplete' => 'off',
        ]);
        Aparencia::campo('usuario', 'Usuário do banco', [
            'valor' => $valores['usuario'],
            'erro'  => $erros['usuario'] ?? '',
            'autocomplete' => 'off',
        ]);
        Aparencia::campo('senha', 'Senha do banco', [
            'tipo'  => 'password',
            'valor' => $valores['senha'],
            'erro'  => $erros['senha'] ?? '',
            'obrigatorio' => false,
            'ajuda' => 'Deixe em branco se o usuário não tiver senha, como no XAMPP recém-instalado.',
            'autocomplete' => 'off',
        ]);
        echo '<div class="grade2">';
        Aparencia::campo('servidor', 'Servidor', [
            'valor' => $valores['servidor'],
            'erro'  => $erros['servidor'] ?? '',
            'ajuda' => 'Quase sempre localhost.',
            'autocomplete' => 'off',
        ]);
        Aparencia::campo('porta', 'Porta', [
            'valor' => $valores['porta'],
            'erro'  => $erros['porta'] ?? '',
            'ajuda' => 'Padrão: 3306.',
            'autocomplete' => 'off',
        ]);
        echo '</div>';
        Aparencia::campo('prefixo', 'Prefixo das tabelas', [
            'valor' => $valores['prefixo'],
            'erro'  => $erros['prefixo'] ?? '',
            'ajuda' => 'Permite mais de uma instalação no mesmo banco, situação comum em hospedagem compartilhada.',
            'autocomplete' => 'off',
        ]);
        if ($recado !== '') {
            echo '<div class="campo"><label for="c_confirmar"><input type="checkbox" id="c_confirmar" name="confirmar_prefixo" value="1" style="width:auto;margin-right:8px"> Entendi e quero usar este prefixo mesmo assim</label></div>';
        }
        echo '<div class="acoes"><button type="submit">Testar conexão e continuar</button>';
        echo '<a class="botao secundario" href="?passo=requisitos">Voltar</a></div>';
        echo '</form>';
        Aparencia::fechar();
        break;

    // -------------------------------------------------------------------
    // 3. Identidade e conta de administração
    // -------------------------------------------------------------------
    case 'identidade':
        if (!Config::instalado() && empty($_SESSION['bd'])) {
            irPara('banco');
        }

        $valores = [
            'nome_sistema'     => 'Plataforma da Ordem',
            'nome_organizacao' => 'Ordem dos Monarquistas Conservadores-Liberais',
            'pais_nome'        => 'Brasil',
            'pais_iso'         => 'BR',
            'moeda'            => 'BRL',
            'admin_nome'       => '',
            'admin_email'      => '',
            'admin_usuario'    => '',
        ];
        $erros = [];

        if ($metodo === 'POST') {
            conferirFormulario();
            foreach (array_keys($valores) as $campo) {
                if (isset($_POST[$campo])) {
                    $valores[$campo] = trim((string) $_POST[$campo]);
                }
            }
            $senha = (string) ($_POST['admin_senha'] ?? '');
            $repetida = (string) ($_POST['admin_senha_repetida'] ?? '');

            if ($valores['nome_sistema'] === '') {
                $erros['nome_sistema'] = 'Dê um nome ao sistema.';
            }
            if ($valores['nome_organizacao'] === '') {
                $erros['nome_organizacao'] = 'Informe o nome da organização.';
            }
            if ($valores['admin_nome'] === '') {
                $erros['admin_nome'] = 'Informe o nome de quem administra.';
            }
            if (!filter_var($valores['admin_email'], FILTER_VALIDATE_EMAIL)) {
                $erros['admin_email'] = 'Informe um endereço de e-mail válido.';
            }
            if ($valores['admin_usuario'] === '') {
                // Derivado do e-mail quando não informado.
                $valores['admin_usuario'] = strtolower((string) preg_replace('/[^a-z0-9._-]/i', '', (string) strstr($valores['admin_email'], '@', true)));
            }
            if (!preg_match('/^[a-z0-9._-]{3,60}$/', $valores['admin_usuario'])) {
                $erros['admin_usuario'] = 'Use de 3 a 60 caracteres: letras minúsculas, números, ponto, hífen ou sublinhado.';
            }
            if ($senha !== $repetida) {
                $erros['admin_senha_repetida'] = 'As senhas não coincidem.';
            }
            $faltas = Seguranca::criticarSenha($senha, $valores['admin_email'], $valores['admin_nome']);
            if ($faltas !== []) {
                $erros['admin_senha'] = implode(' ', $faltas);
            }
            if (!preg_match('/^[A-Za-z]{2}$/', $valores['pais_iso'])) {
                $erros['pais_iso'] = 'Use o código de duas letras, como BR ou PT.';
            }
            if (!preg_match('/^[A-Za-z]{3}$/', $valores['moeda'])) {
                $erros['moeda'] = 'Use o código de três letras, como BRL ou EUR.';
            }

            if ($erros === []) {
                $bd = $_SESSION['bd'] ?? null;
                if ($bd === null) {
                    // Configuração escrita à mão numa tentativa anterior.
                    $bd = [
                        'servidor' => (string) Config::ler('bd_servidor'),
                        'porta'    => (string) Config::ler('bd_porta'),
                        'base'     => (string) Config::ler('bd_base'),
                        'usuario'  => (string) Config::ler('bd_usuario'),
                        'senha'    => (string) Config::ler('bd_senha'),
                        'prefixo'  => Config::prefixo(),
                    ];
                }

                Banco::conectar($bd['servidor'], $bd['porta'], $bd['base'], $bd['usuario'], $bd['senha'], $bd['prefixo']);

                $configuracao = [
                    'bd_servidor'   => $bd['servidor'],
                    'bd_porta'      => $bd['porta'],
                    'bd_base'       => $bd['base'],
                    'bd_usuario'    => $bd['usuario'],
                    'bd_senha'      => $bd['senha'],
                    'prefixo'       => $bd['prefixo'],
                    'chave_secreta' => (string) ($_SESSION['chave_secreta'] ?? bin2hex(random_bytes(32))),
                    'base_url'      => rtrim(str_replace('/api/instalacao', '', dirname((string) ($_SERVER['SCRIPT_NAME'] ?? '/'))), '/'),
                    'depuracao'     => false,
                ];

                // Ordem deliberada: o esquema e a semente primeiro. Se algo
                // falhar, não fica um config.php apontando para um banco meio
                // construído — o instalador desfaz e o usuário tenta de novo.
                Instalador::criarEsquema($bd['prefixo']);
                try {
                    Instalador::semear([
                        'nome_sistema'     => $valores['nome_sistema'],
                        'nome_organizacao' => $valores['nome_organizacao'],
                        'pais_nome'        => $valores['pais_nome'],
                        'pais_iso'         => strtoupper($valores['pais_iso']),
                        'moeda'            => strtoupper($valores['moeda']),
                    ]);
                    Instalador::criarAdministrador([
                        'nome'    => $valores['admin_nome'],
                        'email'   => strtolower($valores['admin_email']),
                        'usuario' => $valores['admin_usuario'],
                        'senha'   => $senha,
                    ]);
                } catch (\Throwable $e) {
                    // Instalação pela metade é pior que instalação nenhuma:
                    // o banco volta ao estado em que estava.
                    Instalador::removerTabelas($bd['prefixo']);
                    throw $e;
                }

                $conteudo = Config::gerar($configuracao);
                $gravado = @file_put_contents(Config::caminho(), $conteudo) !== false;
                if ($gravado) {
                    @chmod(Config::caminho(), 0640);
                    unset($_SESSION['bd'], $_SESSION['chave_secreta']);
                    $_SESSION['concluido'] = [
                        'usuario' => $valores['admin_usuario'],
                        'email'   => strtolower($valores['admin_email']),
                        'sistema' => $valores['nome_sistema'],
                    ];
                    irPara('concluido');
                }
                $_SESSION['config_manual'] = $conteudo;
                $_SESSION['concluido'] = [
                    'usuario' => $valores['admin_usuario'],
                    'email'   => strtolower($valores['admin_email']),
                    'sistema' => $valores['nome_sistema'],
                ];
                irPara('concluido');
            }
        }

        Aparencia::abrir(
            'Identidade e administração',
            trilha('identidade'),
            'O nome do sistema aparece na tela de acesso e nas mensagens automáticas. A conta de administração é técnica: mantém a plataforma, e não substitui os cargos previstos no Estatuto.',
        );

        echo '<form method="post" action="?passo=identidade" novalidate>';
        campoChave();

        echo '<h2>O sistema</h2>';
        Aparencia::campo('nome_sistema', 'Nome do sistema', [
            'valor' => $valores['nome_sistema'],
            'erro'  => $erros['nome_sistema'] ?? '',
            'ajuda' => 'Como a plataforma se apresenta aos membros.',
        ]);
        Aparencia::campo('nome_organizacao', 'Nome da organização', [
            'valor' => $valores['nome_organizacao'],
            'erro'  => $erros['nome_organizacao'] ?? '',
            'ajuda' => 'Razão ou denominação da Ordem, usada em documentos e relatórios.',
        ]);
        echo '<div class="grade2">';
        Aparencia::campo('pais_nome', 'País da sede', ['valor' => $valores['pais_nome'], 'erro' => $erros['pais_nome'] ?? '']);
        Aparencia::campo('pais_iso', 'Código do país', ['valor' => $valores['pais_iso'], 'erro' => $erros['pais_iso'] ?? '', 'ajuda' => 'Duas letras: BR, PT.']);
        echo '</div>';
        Aparencia::campo('moeda', 'Moeda', [
            'valor' => $valores['moeda'],
            'erro'  => $erros['moeda'] ?? '',
            'ajuda' => 'Três letras, usada na Tesouraria: BRL, EUR, USD.',
        ]);

        echo '<h2>Conta de administração</h2>';
        Aparencia::campo('admin_nome', 'Nome', [
            'valor' => $valores['admin_nome'],
            'erro'  => $erros['admin_nome'] ?? '',
            'autocomplete' => 'name',
        ]);
        Aparencia::campo('admin_email', 'E-mail', [
            'tipo'  => 'email',
            'valor' => $valores['admin_email'],
            'erro'  => $erros['admin_email'] ?? '',
            'ajuda' => 'Serve para entrar e para receber o link de redefinição de senha.',
            'autocomplete' => 'email',
        ]);
        Aparencia::campo('admin_usuario', 'Nome de usuário', [
            'valor' => $valores['admin_usuario'],
            'erro'  => $erros['admin_usuario'] ?? '',
            'obrigatorio' => false,
            'ajuda' => 'Opcional. Em branco, é deduzido do e-mail.',
            'autocomplete' => 'username',
        ]);
        Aparencia::campo('admin_senha', 'Senha', [
            'tipo'  => 'password',
            'erro'  => $erros['admin_senha'] ?? '',
            'ajuda' => 'Ao menos ' . Seguranca::MINIMO_SENHA . ' caracteres, com letra e número ou símbolo. Evite o próprio nome.',
            'autocomplete' => 'new-password',
        ]);
        Aparencia::campo('admin_senha_repetida', 'Repita a senha', [
            'tipo' => 'password',
            'erro' => $erros['admin_senha_repetida'] ?? '',
            'autocomplete' => 'new-password',
        ]);

        echo '<div class="acoes"><button type="submit">Instalar</button>';
        if (!Config::instalado()) {
            echo '<a class="botao secundario" href="?passo=banco">Voltar</a>';
        }
        echo '</div></form>';
        Aparencia::fechar();
        break;

    // -------------------------------------------------------------------
    // 4. Conclusão
    // -------------------------------------------------------------------
    case 'concluido':
        $dados = $_SESSION['concluido'] ?? null;
        if ($dados === null) {
            irPara('requisitos');
        }
        $manual = $_SESSION['config_manual'] ?? null;
        unset($_SESSION['concluido'], $_SESSION['config_manual']);

        Aparencia::abrir('Instalação concluída', trilha('concluido'));

        if ($manual !== null) {
            Aparencia::aviso('alerta', 'O banco foi preparado, mas o instalador não conseguiu gravar api/config.php — a pasta não tem permissão de escrita. Crie o arquivo com o conteúdo abaixo e a plataforma estará pronta.');
            echo '<pre><code>' . Aparencia::e($manual) . '</code></pre>';
        } else {
            Aparencia::aviso('bom', 'A plataforma está instalada e pronta para receber os membros da Ordem.');
        }

        echo '<h2>Sua conta</h2><ul class="lista">';
        echo '<li><span class="nome">Sistema</span><span class="valor">' . Aparencia::e($dados['sistema']) . '</span></li>';
        echo '<li><span class="nome">E-mail</span><span class="valor">' . Aparencia::e($dados['email']) . '</span></li>';
        echo '<li><span class="nome">Usuário</span><span class="valor">' . Aparencia::e($dados['usuario']) . '</span></li>';
        echo '<li><span class="nome">Senha</span><span class="valor">a que você escolheu</span></li>';
        echo '</ul>';

        echo '<h2>Antes de convidar os membros</h2>';
        echo '<ul class="lista">';
        echo '<li><span class="nome">Apague a pasta <code>api/instalacao</code> do servidor. Ela não é necessária depois desta tela.</span></li>';
        echo '<li><span class="nome">Confirme que <code>api/config.php</code> não é acessível pelo navegador — o <code>.htaccess</code> da pasta já o impede no Apache.</span></li>';
        echo '<li><span class="nome">Atribua os cargos estatutários pela via prevista no Estatuto. A conta criada aqui é técnica.</span></li>';
        echo '</ul>';

        echo '<div class="acoes"><a class="botao" href="../../">Entrar na plataforma</a></div>';
        Aparencia::fechar();
        break;

    default:
        irPara('requisitos');
}
