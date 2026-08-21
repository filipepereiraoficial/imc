<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Registro de auditoria — Est. Art. 13 (transparência).
 *
 * Somente acréscimo: não há método de alteração nem de remoção, e nenhuma
 * rota expõe um. A tabela é lida pelo painel de Auditoria e nada mais.
 */
final class Auditoria
{
    public static function registrar(?string $membroId, string $acao, string $modulo, string $detalhe = ''): void
    {
        try {
            Banco::inserir('auditoria', [
                'membro_id' => $membroId,
                'acao'      => mb_substr($acao, 0, 120),
                'modulo'    => mb_substr($modulo, 0, 60),
                'detalhe'   => mb_substr($detalhe, 0, 2000),
                'ip'        => Seguranca::ip(),
                'agente'    => Seguranca::agente(),
                'em'        => gmdate('Y-m-d H:i:s'),
            ]);
        } catch (\Throwable $e) {
            // O registro nunca deve derrubar a ação que o originou.
            error_log('[OMCL] auditoria: ' . $e->getMessage());
        }
    }
}
