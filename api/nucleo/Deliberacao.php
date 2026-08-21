<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Convocação, quórum e apuração — Est. Arts. 27 a 32.
 *
 * Porte de src/lib/deliberacao.ts. O navegador mostra a contagem enquanto a
 * assembleia corre; quem a torna verdadeira é este arquivo. Uma apuração que
 * só existisse no cliente poderia ser reescrita por quem votou.
 */
final class Deliberacao
{
    /** Est. Art. 30 — antecedência mínima, salvo urgência justificada em ata. */
    public const DIAS_ANTECEDENCIA_CONVOCACAO = 15;

    /** Est. Art. 65, § 1.º e § 2.º. */
    public const DIAS_DEFESA_DISCIPLINAR = 3;
    public const DIAS_PERIODO_EXCECAO    = 30;

    public static function diasEntre(string $inicio, string $fim): int
    {
        return (int) floor((strtotime($fim) - strtotime($inicio)) / 86400);
    }

    /** @return array{regular:bool,diasDeAntecedencia:int,mensagem:string} */
    public static function conferirConvocacao(array $assembleia): array
    {
        $dias = self::diasEntre((string) $assembleia['convocada_em'], (string) $assembleia['inicio']);
        $regular = $dias >= self::DIAS_ANTECEDENCIA_CONVOCACAO;
        return [
            'regular'            => $regular,
            'diasDeAntecedencia' => $dias,
            'mensagem'           => $regular
                ? "Convocada com {$dias} dias de antecedência, na forma do Art. 30."
                : sprintf(
                    'Convocada com %d %s de antecedência. O Art. 30 exige %d, salvo urgência devidamente justificada em ata.',
                    $dias,
                    $dias === 1 ? 'dia' : 'dias',
                    self::DIAS_ANTECEDENCIA_CONVOCACAO,
                ),
        ];
    }

    /**
     * Membros com direito a voto — Est. Arts. 20, II e 27.
     * Fica fora quem está suspenso, quem é da categoria juvenil e o candidato.
     */
    public static function contarAptos(): int
    {
        return (int) Banco::valor(
            "SELECT COUNT(*) FROM {P}membros m
               JOIN {P}cargos c ON c.id = m.cargo_id
              WHERE m.situacao = 'ativo'
                AND m.categoria_associativa <> 'juvenil'
                AND c.codigo <> 'candidato'",
        );
    }

    public static function podeVotar(array $membro): bool
    {
        if ($membro['situacao'] !== 'ativo' || $membro['categoria_associativa'] === 'juvenil') {
            return false;
        }
        return (Rbac::cargo($membro['cargo_id'])['codigo'] ?? '') !== 'candidato';
    }

    /**
     * Est. Art. 31 — primeira convocação exige maioria absoluta dos aptos;
     * a segunda instala com qualquer número.
     *
     * @return array{presentes:int,aptos:int,exigido:int,atingido:float,instalavel:bool}
     */
    public static function quorumInstalacao(int $presentes, int $aptos, string $convocacao): array
    {
        $exigido = $convocacao === 'primeira' ? intdiv($aptos, 2) + 1 : 1;
        return [
            'presentes'  => $presentes,
            'aptos'      => $aptos,
            'exigido'    => $exigido,
            'atingido'   => $aptos > 0 ? $presentes / $aptos : 0.0,
            'instalavel' => $presentes >= $exigido,
        ];
    }

    /**
     * Apuração de uma matéria — Est. Art. 32.
     *
     * A abstenção conta na presença e não nos votos válidos: quem se abstém
     * compareceu, mas não formou maioria em nenhum sentido. Nas matérias de
     * dois terços (Arts. 39 § 2.º, 40, 48, 57, 67 e 68) o divisor continua
     * sendo o total de votos válidos.
     *
     * @return array<string,mixed>
     */
    public static function apurar(string $materiaId, string $quorum): array
    {
        $linhas = Banco::todos(
            'SELECT opcao, COUNT(*) AS n FROM {P}votos WHERE materia_id = ? GROUP BY opcao',
            [$materiaId],
        );
        $conta = ['favor' => 0, 'contra' => 0, 'abstencao' => 0];
        foreach ($linhas as $l) {
            $conta[$l['opcao']] = (int) $l['n'];
        }
        $validos = $conta['favor'] + $conta['contra'];
        $exigidos = $quorum === 'qualificado'
            ? (int) ceil($validos * 2 / 3)
            : intdiv($validos, 2) + 1;

        return [
            'favor'     => $conta['favor'],
            'contra'    => $conta['contra'],
            'abstencao' => $conta['abstencao'],
            'validos'   => $validos,
            'total'     => $validos + $conta['abstencao'],
            'exigidos'  => $exigidos,
            'aprovada'  => $validos > 0 && $conta['favor'] >= $exigidos,
            'quorum'    => $quorum,
        ];
    }

    /** Prazo de defesa a contar da notificação — Est. Art. 65, § 1.º e § 2.º. */
    public static function prazoDefesa(string $notificadoEm, bool $periodoExcecao): string
    {
        $dias = self::DIAS_DEFESA_DISCIPLINAR + ($periodoExcecao ? self::DIAS_PERIODO_EXCECAO : 0);
        return gmdate('Y-m-d H:i:s', strtotime($notificadoEm) + $dias * 86400);
    }
}
