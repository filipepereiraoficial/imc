<?php
declare(strict_types=1);

namespace OMCL;

/**
 * Conversão de um registro de membro para o formato que o cliente recebe.
 *
 * Aqui mora a privacidade do Est. Art. 21, VI: cada campo de contato tem uma
 * faixa de visibilidade escolhida pelo próprio membro, e é o servidor que a
 * aplica. Esconder o campo apenas na interface deixaria o dado disponível a
 * quem lesse a resposta da API.
 */
final class Membros
{
    /** Campos que nunca saem do servidor, sob nenhuma permissão. */
    private const RESERVADOS = [
        'senha_hash', 'dois_fatores_segredo', 'tentativas_falhas', 'bloqueado_ate',
        'token_hash', 'sessao_id', 'expira_em',
    ];

    /**
     * @param array<string,mixed>      $membro    registro a exibir
     * @param array<string,mixed>|null $observador quem está olhando
     * @return array<string,mixed>
     */
    public static function paraCliente(array $membro, ?array $observador): array
    {
        $proprio = $observador !== null && $observador['id'] === $membro['id'];
        $administra = Rbac::possuiAlguma($observador, ['membros.ver_completo', 'membros.editar']);
        $mesmoNucleo = $observador !== null
            && $membro['nucleo_id'] !== null
            && $observador['nucleo_id'] === $membro['nucleo_id'];

        $ve = static function (string $faixa) use ($proprio, $administra, $mesmoNucleo): bool {
            if ($proprio || $administra) {
                return true;
            }
            return match ($faixa) {
                'publico'       => true,
                'nucleo'        => $mesmoNucleo,
                'administracao' => false,
                'privado'       => false,
                default         => false,
            };
        };

        $saida = [
            'id'                   => $membro['id'],
            'numeroMembro'         => $membro['numero_membro'],
            'nomeCompleto'         => $membro['nome_completo'],
            'nomeExibicao'         => $membro['nome_exibicao'],
            'usuario'              => $membro['usuario'],
            'fotoUrl'              => $membro['foto_url'],
            'nucleoId'             => $membro['nucleo_id'],
            'cargoId'              => $membro['cargo_id'],
            'grauId'               => $membro['grau_id'],
            'categoriaAssociativa' => $membro['categoria_associativa'],
            'situacao'             => $membro['situacao'],
            'dataIngresso'         => $membro['data_ingresso'],
            'biografia'            => $ve((string) $membro['vis_perfil']) ? $membro['biografia'] : null,
            'xp'                   => (int) $membro['xp'],
            'sequenciaDias'        => (int) $membro['sequencia_dias'],
            'paisId'               => $membro['pais_id'],
            'estadoId'             => $membro['estado_id'],
            'municipioId'          => $membro['municipio_id'],
        ];

        $saida['email']    = $ve((string) $membro['vis_email'])      ? $membro['email'] : null;
        $saida['telefone'] = $ve((string) $membro['vis_telefone'])   ? $membro['telefone'] : null;
        $saida['dataNascimento'] = $ve((string) $membro['vis_nascimento']) ? $membro['data_nascimento'] : null;

        if ($ve((string) $membro['vis_endereco'])) {
            $saida['endereco'] = [
                'logradouro'  => $membro['logradouro'],
                'numero'      => $membro['numero_endereco'],
                'complemento' => $membro['complemento'],
                'bairro'      => $membro['bairro'],
                'cep'         => $membro['cep'],
            ];
        }

        if ($proprio) {
            $saida['sexo'] = $membro['sexo'];
            $saida['privacidade'] = [
                'email'       => $membro['vis_email'],
                'telefone'    => $membro['vis_telefone'],
                'endereco'    => $membro['vis_endereco'],
                'nascimento'  => $membro['vis_nascimento'],
                'perfil'      => $membro['vis_perfil'],
                'publicacoes' => $membro['vis_publicacoes'],
            ];
            $saida['doisFatoresAtivo'] = (bool) $membro['dois_fatores_ativo'];
            $saida['ultimoAcesso'] = $membro['ultimo_acesso'];
        }

        if ($administra) {
            $saida['observacoesAdmin'] = $membro['observacoes_admin'] ?? null;
            $saida['ultimoAcesso'] = $membro['ultimo_acesso'];
        }

        $saida['titulos'] = array_column(
            Banco::todos('SELECT titulo FROM {P}membro_titulos WHERE membro_id = ?', [$membro['id']]),
            'titulo',
        );

        foreach (self::RESERVADOS as $campo) {
            unset($saida[$campo]);
        }
        return $saida;
    }

    /**
     * Lista resumida — para feed, ranking e listagens, onde carregar títulos
     * de cada membro custaria uma consulta por linha.
     *
     * @return array<string,mixed>
     */
    public static function resumo(array $membro): array
    {
        return [
            'id'           => $membro['id'],
            'nomeExibicao' => $membro['nome_exibicao'],
            'usuario'      => $membro['usuario'],
            'fotoUrl'      => $membro['foto_url'],
            'nucleoId'     => $membro['nucleo_id'] ?? null,
            'cargoId'      => $membro['cargo_id'] ?? null,
            'grauId'       => $membro['grau_id'] ?? null,
            'xp'           => isset($membro['xp']) ? (int) $membro['xp'] : 0,
        ];
    }
}
