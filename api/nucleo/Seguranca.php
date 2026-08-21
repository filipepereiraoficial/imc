<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Senhas, sessões, CSRF e limitação de tentativas.
 *
 * Decisões que valem registro:
 *  - a senha é guardada com Argon2id quando disponível, bcrypt como reserva;
 *  - o token de sessão só existe em texto claro no navegador: o banco guarda
 *    o resumo SHA-256, de modo que uma cópia da tabela não permite entrar;
 *  - o token anti-CSRF é derivado do resumo da sessão por HMAC com a chave
 *    da instalação. Não precisa ser guardado e não pode ser forjado por quem
 *    apenas consegue escrever cookies.
 */
final class Seguranca
{
    public const DIAS_SESSAO          = 14;
    public const TENTATIVAS_ATE_TRAVA = 5;
    public const MINUTOS_TRAVA        = 15;
    public const JANELA_LIMITE        = 900;  // 15 minutos, em segundos
    public const LIMITE_POR_ORIGEM    = 30;   // tentativas por IP na janela
    public const MINIMO_SENHA         = 10;

    private static ?array $sessaoAtual = null;

    // -----------------------------------------------------------------
    // Identificadores e comparação
    // -----------------------------------------------------------------

    public static function uuid(): string
    {
        $b = random_bytes(16);
        $b[6] = chr((ord($b[6]) & 0x0f) | 0x40);
        $b[8] = chr((ord($b[8]) & 0x3f) | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($b), 4));
    }

    public static function tokenAleatorio(int $bytes = 32): string
    {
        return rtrim(strtr(base64_encode(random_bytes($bytes)), '+/', '-_'), '=');
    }

    public static function resumo(string $token): string
    {
        return hash('sha256', $token);
    }

    // -----------------------------------------------------------------
    // Senhas
    // -----------------------------------------------------------------

    public static function algoritmoSenha(): string
    {
        return defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_BCRYPT;
    }

    public static function cifrarSenha(string $senha): string
    {
        $hash = password_hash($senha, self::algoritmoSenha());
        if (!is_string($hash) || $hash === '') {
            throw new \RuntimeException('Não foi possível cifrar a senha.');
        }
        return $hash;
    }

    public static function conferirSenha(string $senha, string $hash): bool
    {
        return password_verify($senha, $hash);
    }

    /** Recifra quando o servidor passa a oferecer um algoritmo melhor. */
    public static function precisaRecifrar(string $hash): bool
    {
        return password_needs_rehash($hash, self::algoritmoSenha());
    }

    /**
     * Política de senha. Devolve a lista de exigências não atendidas —
     * vazia quando a senha serve.
     *
     * @return string[]
     */
    public static function criticarSenha(string $senha, string $email = '', string $nome = ''): array
    {
        $faltas = [];
        $tamanho = mb_strlen($senha);
        if ($tamanho < self::MINIMO_SENHA) {
            $faltas[] = sprintf('Use ao menos %d caracteres.', self::MINIMO_SENHA);
        }
        if ($tamanho > 200) {
            $faltas[] = 'Use no máximo 200 caracteres.';
        }
        if (!preg_match('/\p{L}/u', $senha)) {
            $faltas[] = 'Inclua ao menos uma letra.';
        }
        if (!preg_match('/[\d\p{P}\p{S}]/u', $senha)) {
            $faltas[] = 'Inclua ao menos um número ou símbolo.';
        }
        $baixa = mb_strtolower($senha);
        // Só as letras, para que "S3nh4!" não escape da mesma crítica.
        $letras = (string) preg_replace('/[^\p{L}]/u', '', $baixa);
        $comuns = [
            'senha', 'password', 'qwerty', 'admin', 'ordem', 'monarquia',
            'iloveyou', 'letmein', 'welcome', 'eunomia',
        ];
        $sequencias = ['12345678', '123456789', '1234567890', '87654321', '00000000', 'abcdefgh'];
        foreach ($comuns as $c) {
            // Palavra previsível pesa quando é a senha inteira ou quase toda
            // ela; contida numa frase longa, não diz nada.
            $ehQuaseTudo = $letras !== '' && mb_strlen($c) >= mb_strlen($letras) * 0.6;
            if (($letras === $c) || ($ehQuaseTudo && str_contains($letras, $c))) {
                $faltas[] = 'Evite palavras previsíveis como senha inteira.';
                break;
            }
        }
        foreach ($sequencias as $c) {
            if (str_contains($baixa, $c)) {
                $faltas[] = 'Evite sequências de teclado ou de números.';
                break;
            }
        }
        $local = strstr($email, '@', true);
        if (is_string($local) && mb_strlen($local) >= 4 && str_contains($baixa, mb_strtolower($local))) {
            $faltas[] = 'A senha não deve conter o seu endereço de e-mail.';
        }
        foreach (preg_split('/\s+/', trim($nome)) ?: [] as $parte) {
            if (mb_strlen($parte) >= 4 && str_contains($baixa, mb_strtolower($parte))) {
                $faltas[] = 'A senha não deve conter o seu nome.';
                break;
            }
        }
        return array_values(array_unique($faltas));
    }

    // -----------------------------------------------------------------
    // Limitação de tentativas
    // -----------------------------------------------------------------

    public static function ip(): string
    {
        $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
        return mb_substr($ip, 0, 45);
    }

    public static function agente(): string
    {
        return mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255);
    }

    public static function registrarTentativa(string $chave): void
    {
        Banco::inserir('tentativas', [
            'chave' => mb_substr($chave, 0, 190),
            'ip'    => self::ip(),
            'em'    => gmdate('Y-m-d H:i:s'),
        ]);
    }

    public static function tentativasRecentes(string $chave): int
    {
        return (int) Banco::valor(
            'SELECT COUNT(*) FROM {P}tentativas WHERE chave = ? AND em > ?',
            [mb_substr($chave, 0, 190), gmdate('Y-m-d H:i:s', time() - self::JANELA_LIMITE)],
        );
    }

    /**
     * Barreira por origem: protege contra varredura de muitas contas a partir
     * do mesmo endereço, que a trava por conta sozinha não impede.
     */
    public static function limitarPorOrigem(string $acao): void
    {
        $chave = $acao . ':ip:' . self::ip();
        if (self::tentativasRecentes($chave) >= self::LIMITE_POR_ORIGEM) {
            Resposta::erro('Muitas tentativas a partir deste dispositivo. Aguarde alguns minutos.', 429);
        }
        self::registrarTentativa($chave);
    }

    /** Limpeza oportunista das tentativas antigas. */
    public static function podarTentativas(): void
    {
        Banco::executar('DELETE FROM {P}tentativas WHERE em < ?', [gmdate('Y-m-d H:i:s', time() - 86400)]);
    }

    // -----------------------------------------------------------------
    // Sessões
    // -----------------------------------------------------------------

    public static function nomeCookie(): string
    {
        return 'omcl_sessao';
    }

    private static function seguro(): bool
    {
        return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
            || ((int) ($_SERVER['SERVER_PORT'] ?? 0) === 443);
    }

    private static function caminhoCookie(): string
    {
        $base = (string) Config::ler('base_url', '/');
        return $base === '' ? '/' : $base;
    }

    public static function abrirSessao(string $membroId): array
    {
        $token = self::tokenAleatorio();
        $agora = time();
        $expira = $agora + self::DIAS_SESSAO * 86400;

        Banco::inserir('sessoes', [
            'id'          => self::uuid(),
            'membro_id'   => $membroId,
            'token_hash'  => self::resumo($token),
            'dispositivo' => self::agente(),
            'ip'          => self::ip(),
            'criada_em'   => gmdate('Y-m-d H:i:s', $agora),
            'expira_em'   => gmdate('Y-m-d H:i:s', $expira),
        ]);

        setcookie(self::nomeCookie(), $token, [
            'expires'  => $expira,
            'path'     => self::caminhoCookie(),
            'secure'   => self::seguro(),
            'httponly' => true,   // fora do alcance de qualquer script na página
            'samesite' => 'Lax',
        ]);

        return ['token' => $token, 'csrf' => self::csrfDoToken($token), 'expira_em' => gmdate('c', $expira)];
    }

    public static function encerrarSessao(): void
    {
        $token = self::tokenRecebido();
        if ($token !== null) {
            Banco::executar(
                'UPDATE {P}sessoes SET revogada_em = ? WHERE token_hash = ? AND revogada_em IS NULL',
                [gmdate('Y-m-d H:i:s'), self::resumo($token)],
            );
        }
        setcookie(self::nomeCookie(), '', [
            'expires'  => time() - 3600,
            'path'     => self::caminhoCookie(),
            'secure'   => self::seguro(),
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        self::$sessaoAtual = null;
    }

    public static function encerrarTodasAsSessoes(string $membroId): void
    {
        Banco::executar(
            'UPDATE {P}sessoes SET revogada_em = ? WHERE membro_id = ? AND revogada_em IS NULL',
            [gmdate('Y-m-d H:i:s'), $membroId],
        );
    }

    /**
     * O token pode vir do cookie ou do cabeçalho Authorization — o segundo
     * atende clientes que não compartilham cookies com o servidor.
     */
    public static function tokenRecebido(): ?string
    {
        $cabecalho = (string) ($_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');
        if (preg_match('/^Bearer\s+(\S+)$/i', $cabecalho, $m)) {
            return $m[1];
        }
        $cookie = $_COOKIE[self::nomeCookie()] ?? null;
        return is_string($cookie) && $cookie !== '' ? $cookie : null;
    }

    /** @return array<string,mixed>|null sessão e membro, quando válidos */
    public static function sessao(): ?array
    {
        if (self::$sessaoAtual !== null) {
            return self::$sessaoAtual;
        }
        $token = self::tokenRecebido();
        if ($token === null) {
            return null;
        }
        $linha = Banco::primeiro(
            'SELECT s.id AS sessao_id, s.token_hash, s.expira_em, m.*
               FROM {P}sessoes s
               JOIN {P}membros m ON m.id = s.membro_id
              WHERE s.token_hash = ? AND s.revogada_em IS NULL AND s.expira_em > ?',
            [self::resumo($token), gmdate('Y-m-d H:i:s')],
        );
        if ($linha === null) {
            return null;
        }
        // Quem foi desligado ou suspenso perde o acesso na próxima requisição,
        // sem depender da expiração do token.
        if (in_array($linha['situacao'], ['desligado', 'inativo'], true)) {
            return null;
        }
        self::$sessaoAtual = $linha;
        return $linha;
    }

    public static function exigirSessao(): array
    {
        $s = self::sessao();
        if ($s === null) {
            Resposta::naoAutenticado();
        }
        return $s;
    }

    // -----------------------------------------------------------------
    // CSRF
    // -----------------------------------------------------------------

    public static function chaveSecreta(): string
    {
        $chave = (string) Config::ler('chave_secreta', '');
        if ($chave === '') {
            throw new \RuntimeException('Instalação sem chave secreta.');
        }
        return $chave;
    }

    public static function csrfDoToken(string $token): string
    {
        return hash_hmac('sha256', self::resumo($token), self::chaveSecreta());
    }

    /**
     * Exigido em toda requisição que altera estado. O token não é guardado:
     * é recalculado a partir da sessão apresentada, o que o mantém válido
     * apenas para aquela sessão.
     */
    public static function exigirCsrf(): void
    {
        $token = self::tokenRecebido();
        if ($token === null) {
            Resposta::naoAutenticado();
        }
        $enviado = (string) ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
        if ($enviado === '' || !hash_equals(self::csrfDoToken($token), $enviado)) {
            Resposta::erro('Requisição sem confirmação de origem. Recarregue a página e tente de novo.', 419);
        }
    }
}
