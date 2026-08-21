<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Controle de acesso baseado em cargos — versão do servidor.
 *
 * Reproduz src/lib/rbac.ts. A verificação no navegador existe só para
 * esconder o que não interessa; a que vale é esta. Nenhuma rota confia em
 * cargo, núcleo ou escopo vindos da requisição: tudo é lido do banco a
 * partir da sessão apresentada.
 *
 * São duas etapas independentes:
 *  1. o cargo do membro possui a permissão?
 *  2. o alvo da ação está dentro do escopo territorial do cargo?
 */
final class Rbac
{
    /** @var array<string,array<string,mixed>>|null */
    private static ?array $cargos = null;

    /** @return array<string,array<string,mixed>> indexado por id */
    public static function cargos(): array
    {
        if (self::$cargos === null) {
            $mapa = [];
            foreach (Banco::todos('SELECT * FROM {P}cargos') as $c) {
                $c['permissoes'] = [];
                $mapa[$c['id']] = $c;
            }
            foreach (Banco::todos('SELECT cargo_id, permissao FROM {P}cargo_permissoes') as $p) {
                if (isset($mapa[$p['cargo_id']])) {
                    $mapa[$p['cargo_id']]['permissoes'][] = $p['permissao'];
                }
            }
            self::$cargos = $mapa;
        }
        return self::$cargos;
    }

    public static function cargo(?string $cargoId): ?array
    {
        if ($cargoId === null) {
            return null;
        }
        return self::cargos()[$cargoId] ?? null;
    }

    public static function cargoPorCodigo(string $codigo): ?array
    {
        foreach (self::cargos() as $c) {
            if ($c['codigo'] === $codigo) {
                return $c;
            }
        }
        return null;
    }

    /** @return string[] */
    public static function permissoesDe(?array $membro): array
    {
        if ($membro === null) {
            return [];
        }
        if (!in_array($membro['situacao'], ['ativo', 'pendente'], true)) {
            return [];
        }
        return self::cargo($membro['cargo_id'])['permissoes'] ?? [];
    }

    /** Posse da permissão, sem considerar escopo. */
    public static function possui(?array $membro, string $permissao): bool
    {
        return in_array($permissao, self::permissoesDe($membro), true);
    }

    /** @param string[] $lista */
    public static function possuiAlguma(?array $membro, array $lista): bool
    {
        $atuais = self::permissoesDe($membro);
        foreach ($lista as $p) {
            if (in_array($p, $atuais, true)) {
                return true;
            }
        }
        return false;
    }

    /**
     * O alvo está no alcance territorial do cargo?
     *
     * @param array{nucleoId?:?string,estadoId?:?string,paisId?:?string,membroId?:?string} $alvo
     */
    public static function dentroDoEscopo(string $escopo, array $membro, array $alvo = []): bool
    {
        $nucleo = $alvo['nucleoId'] ?? null;
        $estado = $alvo['estadoId'] ?? null;
        $pais   = $alvo['paisId']   ?? null;
        $alvoM  = $alvo['membroId'] ?? null;

        return match ($escopo) {
            'global'  => true,
            'pais'    => $pais === null   || $pais === $membro['pais_id'],
            'estado'  => $estado === null || $estado === $membro['estado_id'],
            'nucleo'  => ($alvoM !== null && $alvoM === $membro['id'])
                         || $nucleo === null || $nucleo === $membro['nucleo_id'],
            'proprio' => $alvoM === null  || $alvoM === $membro['id'],
            default   => false,
        };
    }

    /** Verificação completa: permissão e escopo. */
    public static function pode(?array $membro, string $permissao, array $alvo = []): bool
    {
        if ($membro === null) {
            return false;
        }
        $cargo = self::cargo($membro['cargo_id']);
        if ($cargo === null) {
            return false;
        }
        if (!in_array($permissao, self::permissoesDe($membro), true)) {
            return false;
        }
        return self::dentroDoEscopo((string) $cargo['escopo'], $membro, $alvo);
    }

    /** Interrompe a requisição quando falta permissão. */
    public static function exigir(array $membro, string $permissao, array $alvo = []): void
    {
        if (!self::pode($membro, $permissao, $alvo)) {
            Auditoria::registrar($membro['id'], 'acesso.negado', 'seguranca', $permissao);
            Resposta::proibido();
        }
    }

    /**
     * Um cargo só pode ser atribuído por quem tem precedência igual ou
     * superior. Sem isso, qualquer tela administrativa vira caminho para
     * escalonamento de privilégio.
     */
    public static function podeAtribuirCargo(?array $autor, string $cargoAlvoId): bool
    {
        if ($autor === null) {
            return false;
        }
        if (!self::possui($autor, 'permissoes.gerenciar') && !self::possui($autor, 'membros.editar')) {
            return false;
        }
        $cargoAutor = self::cargo($autor['cargo_id']);
        $cargoAlvo  = self::cargo($cargoAlvoId);
        if ($cargoAutor === null || $cargoAlvo === null) {
            return false;
        }
        return (int) $cargoAutor['precedencia'] <= (int) $cargoAlvo['precedencia'];
    }
}
