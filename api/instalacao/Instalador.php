<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Verificações e semeadura da instalação.
 *
 * A semente vem de semente.json, gerado por `npm run semente` a partir de
 * src/data. Cargos, permissões, graus e órgãos têm uma fonte só; o
 * instalador apenas os grava.
 */
final class Instalador
{
    public const VERSAO_ESQUEMA = '1';

    // -----------------------------------------------------------------
    // Requisitos
    // -----------------------------------------------------------------

    /**
     * @return array<int,array{nome:string,exigido:bool,atende:bool,detalhe:string}>
     */
    public static function requisitos(): array
    {
        $itens = [];
        $itens[] = [
            'nome'    => 'PHP 8.1 ou superior',
            'exigido' => true,
            'atende'  => PHP_VERSION_ID >= 80100,
            'detalhe' => 'Encontrado ' . PHP_VERSION,
        ];
        foreach ([
            'pdo_mysql' => 'Conexão com MySQL ou MariaDB',
            'mbstring'  => 'Textos com acentuação',
            'json'      => 'Troca de dados com a interface',
            'openssl'   => 'Geração de tokens e chaves',
            'filter'    => 'Validação de entrada',
        ] as $ext => $porque) {
            $itens[] = [
                'nome'    => 'Extensão ' . $ext,
                'exigido' => true,
                'atende'  => extension_loaded($ext),
                'detalhe' => $porque,
            ];
        }
        $itens[] = [
            'nome'    => 'Cifra Argon2id para senhas',
            'exigido' => false,
            'atende'  => defined('PASSWORD_ARGON2ID'),
            'detalhe' => defined('PASSWORD_ARGON2ID')
                ? 'Disponível'
                : 'Ausente — as senhas usarão bcrypt, que é aceitável',
        ];
        $itens[] = [
            'nome'    => 'Envio de mensagens (mail)',
            'exigido' => false,
            'atende'  => function_exists('mail'),
            'detalhe' => function_exists('mail')
                ? 'Disponível'
                : 'Ausente — a recuperação de senha ficará no registro do servidor',
        ];

        // A configuração pode viver fora de api/ — ver Config::caminho().
        $arquivo = Config::caminho();
        $pasta = dirname($arquivo);
        $podeGravar = is_file($arquivo) ? is_writable($arquivo) : is_writable($pasta);
        $itens[] = [
            'nome'    => 'Escrita da configuração',
            'exigido' => false,
            'atende'  => $podeGravar,
            'detalhe' => $podeGravar
                ? 'O instalador poderá gravar ' . $arquivo
                : 'Sem permissão em ' . $pasta . ' — o arquivo terá de ser criado à mão',
        ];
        $itens[] = [
            'nome'    => 'Semente de cargos e graus',
            'exigido' => true,
            'atende'  => Semente::disponivel(),
            'detalhe' => 'api/nucleo/semente.json',
        ];
        $itens[] = [
            'nome'    => 'Esquema do banco',
            'exigido' => true,
            'atende'  => is_file(__DIR__ . '/esquema.sql'),
            'detalhe' => 'api/instalacao/esquema.sql',
        ];
        return $itens;
    }

    public static function requisitosAtendidos(): bool
    {
        foreach (self::requisitos() as $i) {
            if ($i['exigido'] && !$i['atende']) {
                return false;
            }
        }
        return true;
    }

    // -----------------------------------------------------------------
    // Estado da instalação
    // -----------------------------------------------------------------

    /** Já existe uma instalação concluída? Se sim, o instalador se recusa a rodar. */
    public static function jaInstalado(): bool
    {
        if (!Config::instalado()) {
            return false;
        }
        try {
            Banco::pdo();
            Banco::definirPrefixo(Config::prefixo());
            $pronto = Banco::valor('SELECT valor FROM {P}config WHERE chave = ?', ['instalado_em']);
            return $pronto !== null;
        } catch (\Throwable) {
            // Configuração presente mas banco inacessível ou vazio: a
            // instalação pode prosseguir e refazer o que falta.
            return false;
        }
    }

    /**
     * Tabelas já criadas com este prefixo — evita sobrescrever dados alheios.
     *
     * A consulta vai a information_schema, e não a SHOW TABLES, porque esta
     * última não aceita parâmetro preparado no MySQL nem no MariaDB.
     */
    public static function tabelasExistentes(string $prefixo): array
    {
        $como = str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $prefixo) . '%';
        $linhas = Banco::todos(
            'SELECT TABLE_NAME AS t FROM information_schema.TABLES
              WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME LIKE ?
              ORDER BY TABLE_NAME',
            [$como],
        );
        return array_map(static fn (array $l) => (string) $l['t'], $linhas);
    }

    /**
     * Desfaz uma instalação interrompida.
     *
     * As chaves estrangeiras são suspensas durante a remoção: sem isso a
     * ordem de exclusão importaria, e uma tabela presa deixaria restos.
     */
    public static function removerTabelas(string $prefixo): void
    {
        $tabelas = self::tabelasExistentes($prefixo);
        if ($tabelas === []) {
            return;
        }
        $pdo = Banco::pdo();
        $pdo->exec('SET FOREIGN_KEY_CHECKS = 0');
        try {
            foreach ($tabelas as $tabela) {
                $pdo->exec('DROP TABLE IF EXISTS `' . str_replace('`', '', $tabela) . '`');
            }
        } finally {
            $pdo->exec('SET FOREIGN_KEY_CHECKS = 1');
        }
    }

    // -----------------------------------------------------------------
    // Execução
    // -----------------------------------------------------------------

    public static function criarEsquema(string $prefixo): int
    {
        return Banco::executarArquivo(__DIR__ . '/esquema.sql', $prefixo);
    }

    /**
     * Grava cargos, permissões, graus, órgãos centrais e o território
     * inicial. Idempotente por chave: rodar de novo não duplica.
     */
    public static function semear(array $identidade): void
    {
        foreach (Semente::cargos() as $cargo) {
            Banco::inserir('cargos', [
                'id'          => $cargo['id'],
                'codigo'      => $cargo['codigo'],
                'nome'        => $cargo['nome'],
                'descricao'   => $cargo['descricao'],
                'escopo'      => $cargo['escopo'],
                'precedencia' => (int) $cargo['precedencia'],
                'sistema'     => (int) $cargo['sistema'],
            ]);
            foreach ($cargo['permissoes'] as $permissao) {
                Banco::inserir('cargo_permissoes', [
                    'cargo_id'  => $cargo['id'],
                    'permissao' => $permissao,
                ]);
            }
        }

        foreach (Semente::graus() as $grau) {
            Banco::inserir('graus', [
                'id'          => $grau['id'],
                'codigo'      => $grau['codigo'],
                'nome'        => $grau['nome'],
                'categoria'   => $grau['categoria'],
                'ordem'       => (int) $grau['ordem'],
                'descricao'   => $grau['descricao'],
                'xp_sugerido' => (int) $grau['xpSugerido'],
            ]);
        }

        foreach (Semente::orgaosCentrais() as $orgao) {
            Banco::inserir('orgaos', [
                'id'             => $orgao['id'],
                'codigo'         => $orgao['codigo'],
                'nome'           => $orgao['nome'],
                'descricao'      => $orgao['descricao'],
                'ambito'         => $orgao['ambito'],
                'nucleo_id'      => null,
                'minimo_membros' => $orgao['minimoMembros'] ?? null,
                'maximo_membros' => $orgao['maximoMembros'] ?? null,
                'mandato_anos'   => $orgao['mandatoAnos'] ?? null,
                'fundamento'     => $orgao['fundamento'] ?? '',
            ]);
            foreach (($orgao['competencias'] ?? []) as $ordem => $competencia) {
                Banco::inserir('orgao_competencias', [
                    'orgao_id'    => $orgao['id'],
                    'ordem'       => $ordem + 1,
                    'competencia' => $competencia,
                ]);
            }
        }

        // Território inicial: o país da sede. Estados e municípios são
        // cadastrados pela Secretaria conforme a Ordem se expande.
        $paisId = Seguranca::uuid();
        Banco::inserir('paises', [
            'id'         => $paisId,
            'nome'       => $identidade['pais_nome'],
            'codigo_iso' => $identidade['pais_iso'],
            'moeda'      => $identidade['moeda'],
        ]);

        foreach ([
            'nome_sistema'      => $identidade['nome_sistema'],
            'nome_organizacao'  => $identidade['nome_organizacao'],
            'pais_sede'         => $paisId,
            'moeda'             => $identidade['moeda'],
            'versao_esquema'    => self::VERSAO_ESQUEMA,
            'cadastro_aberto'   => '1',
            'aprovacao_manual'  => '1',
        ] as $chave => $valor) {
            Banco::inserir('config', ['chave' => $chave, 'valor' => (string) $valor]);
        }
    }

    /**
     * Cria a conta de administração.
     *
     * Recebe o cargo `administrador`, que é técnico: mantém a plataforma e
     * não exerce autoridade institucional. O Grão-Mestre e os demais cargos
     * estatutários são atribuídos depois, pela via prevista no Estatuto.
     */
    public static function criarAdministrador(array $admin): string
    {
        $cargo = Banco::primeiro('SELECT id FROM {P}cargos WHERE codigo = ?', ['administrador']);
        $grau  = Banco::primeiro('SELECT id FROM {P}graus WHERE ordem = (SELECT MIN(ordem) FROM {P}graus)');
        if ($cargo === null || $grau === null) {
            throw new \RuntimeException('Cargos e graus não foram semeados.');
        }

        $id = Seguranca::uuid();
        Banco::inserir('membros', [
            'id'                    => $id,
            'numero_membro'         => '0001',
            'nome_completo'         => $admin['nome'],
            'nome_exibicao'         => $admin['nome'],
            'usuario'               => $admin['usuario'],
            'email'                 => $admin['email'],
            'cargo_id'              => $cargo['id'],
            'grau_id'               => $grau['id'],
            'categoria_associativa' => 'efetivo',
            'situacao'              => 'ativo',
            'data_ingresso'         => gmdate('Y-m-d'),
            'senha_hash'            => Seguranca::cifrarSenha($admin['senha']),
            // O contato de quem administra não é dado de vitrine.
            'vis_email'             => 'administracao',
            'vis_telefone'          => 'privado',
        ]);

        Banco::inserir('config', ['chave' => 'instalado_em', 'valor' => gmdate('c')]);
        Auditoria::registrar($id, 'instalacao.concluida', 'sistema', 'Conta de administração criada.');
        return $id;
    }
}
