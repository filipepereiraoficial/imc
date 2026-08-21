# Modelo de Dados

As entidades abaixo estão declaradas em `src/types/index.ts` e têm DDL
correspondente em [`schema.sql`](./schema.sql).

## 1. Território

Base da organização territorial e do ranking por âmbito.

| Entidade | Campos principais | Relações |
|---|---|---|
| `Pais` | nome, codigoISO, moeda | 1:N `Estado` |
| `Estado` | paisId, nome, sigla | 1:N `Municipio` |
| `Municipio` | estadoId, nome | 1:N `Nucleo`, `Membro` |
| `Endereco` | logradouro, número, bairro, CEP + IDs territoriais | embutido em `Membro` |

O membro guarda `paisId`, `estadoId` e `municipioId` desnormalizados além do
endereço — isso permite ranking e relatórios territoriais sem junções em cadeia.

## 2. Cargos e permissões

| Entidade | Campos principais |
|---|---|
| `Cargo` | codigo, nome, escopo, precedencia, permissoes[], sistema |

`Permissao` é uma união de literais — o conjunto fechado de ações do sistema.
Ver [`RBAC.md`](./RBAC.md).

## 3. Membros

| Entidade | Campos principais | Relações |
|---|---|---|
| `Membro` | numeroMembro, nomeCompleto, nomeExibicao, usuario, e-mail, telefone, sexo, nascimento, endereço, situação, dataIngresso, biografia, interesses, áreas, xp, nível, sequenciaDias, aliados[], conquistas[], privacidade, 2FA | N:1 `Nucleo`, N:1 `Cargo` |
| `Sessao` | membroId, dispositivo, local, criadaEm, atual | N:1 `Membro` |
| `PreferenciasPrivacidade` | visibilidade de e-mail, telefone, endereço, nascimento, perfil, publicações | embutido |

`SituacaoMembresia`: `ativo` · `pendente` · `suspenso` · `inativo` · `desligado`.

`NivelVisibilidade`: `publico` · `nucleo` · `administracao` · `privado`.

## 4. Núcleos

| Entidade | Campos principais |
|---|---|
| `Nucleo` | nome, código, território, endereço, dataFundacao, dirigenteId, secretarioId, tesoureiroId, situação, descrição, contatos |

`SituacaoNucleo`: `ativo` · `em_formacao` · `suspenso` · `encerrado`.

## 5. Feed

| Entidade | Campos principais | Relações |
|---|---|---|
| `Publicacao` | autorId, emitidoPor, oficial, categoria, nucleoId, título, conteúdo, anexos[], fixado, destaque, curtidas[], salvoPor[], compartilhamentos, visibilidade | N:1 `Membro`, N:1 `Nucleo` |
| `Comentario` | publicacaoId, autorId, conteúdo, curtidas[] | N:1 `Publicacao` |
| `Anexo` | tipo, título, url, tamanho, duração, opções[] | embutido |
| `OpcaoEnquete` | texto, votos | embutido em `Anexo` |

`CategoriaPublicacao`: `comunicado` · `formacao` · `evento` · `nucleo` ·
`noticia` · `membro`.

`TipoAnexo`: `imagem` · `video` · `documento` · `link` · `evento` · `enquete`.

A distinção `oficial` + `emitidoPor` separa a fala institucional (Presidência,
Secretaria-Geral, Tesouraria) da publicação pessoal do membro.

## 6. Eventos e presença

| Entidade | Campos principais |
|---|---|
| `Evento` | título, descrição, início, fim, local, modalidade, responsávelId, nucleoId, limiteParticipantes, xpParticipacao, inscriçõesAbertas |
| `InscricaoEvento` | eventoId, membroId, situação, inscritoEm |
| `RegistroPresenca` | eventoId, membroId, presente, registradoPor, registradoEm |

A presença é sempre registrada **por alguém** (`registradoPor`), nunca
autodeclarada — é o que dá lastro ao XP e ao ranking.

## 7. Documentos

| Entidade | Campos principais |
|---|---|
| `Documento` | título, descrição, categoria, responsávelId, nivelAcesso[], versaoAtual, atualizadoEm, arquivo, tamanho |
| `VersaoDocumento` | documentoId, versão, notas, publicadoEm, publicadoPor |

`nivelAcesso` é a lista de códigos de cargo autorizados; vazia significa aberto
a todos os membros.

## 8. Formação

| Entidade | Campos principais |
|---|---|
| `Curso` | título, descrição, trilha, cargaHoraria, responsávelId, xpConclusao, emiteCertificado |
| `Modulo` | cursoId, título, ordem |
| `Aula` | moduloId, título, tipo, duração, ordem, conteúdo |
| `ProgressoAula` | membroId, aulaId, concluidaEm |

## 9. Propostas

| Entidade | Campos principais |
|---|---|
| `Proposta` | título, resumo, conteúdo, categoria, autorId, nucleoId, situação, apoios[], respostaAdministracao, tramitacao[] |
| `TramiteProposta` | situação, em, porId, nota |

Fluxo: `recebida` → `em_analise` → `em_discussao` → `aprovada` ·
`rejeitada` · `arquivada`.

Cada transição acrescenta um `TramiteProposta` — o histórico é imutável por
construção.

## 10. Gamificação

| Entidade | Campos principais |
|---|---|
| `RegraXP` | origem, nome, descrição, pontos, ativa |
| `TransacaoXP` | membroId, origem, descrição, pontos, registradoPor, criadoEm |
| `Nivel` | numero, título, xpMinimo |
| `Conquista` | nome, descrição, ícone, critério |

`Membro.xp` é o saldo; `TransacaoXP` é o razão. Manter os dois permite auditar a
pontuação e recalcular o saldo se uma regra mudar.

`OrigemXP`: `reuniao` · `evento` · `formacao` · `debate` · `publicacao` ·
`nucleo` · `projeto` · `atividade` · `ajuste_administrativo`.

## 11. Comunicação

| Entidade | Campos principais |
|---|---|
| `Conversa` | tipo, título, participantes[], nucleoId, atualizadaEm, fixada |
| `Mensagem` | conversaId, autorId, conteúdo, criadaEm, lidaPor[], anexo |
| `Notificacao` | membroId, tipo, título, descrição, criadaEm, lida, destino |

`TipoConversa`: `direta` · `grupo` · `nucleo` · `oficial`.

## 12. Tesouraria

| Entidade | Campos principais |
|---|---|
| `ContaFinanceira` | nome, instituição, saldoInicial, nucleoId |
| `CategoriaFinanceira` | nome, tipo, cor |
| `Lancamento` | tipo, data, descrição, categoriaId, contaId, valor, responsávelId, nucleoId, situação, observação, comprovante |

`nucleoId` nulo significa âmbito nacional. Receita e despesa vivem na mesma
tabela, discriminadas por `tipo` — o que simplifica fluxo de caixa e conciliação.

## 13. Atividades e auditoria

| Entidade | Campos principais |
|---|---|
| `Atividade` | título, descrição, prazo, membroId, origem, xp, concluída, destino |
| `RegistroAuditoria` | membroId, ação, módulo, detalhe, em, ip |

A auditoria registra **usuário, ação, data, horário, módulo e alteração
realizada** — os cinco eixos exigidos para rastreabilidade institucional.

## 14. Diagrama de relacionamentos centrais

```
Pais ──< Estado ──< Municipio ──< Nucleo ──< Membro >── Cargo
                                    │          │
                                    │          ├──< TransacaoXP
                                    │          ├──< Publicacao ──< Comentario
                                    │          ├──< Proposta ──< TramiteProposta
                                    │          ├──< InscricaoEvento >── Evento
                                    │          ├──< RegistroPresenca >── Evento
                                    │          ├──< ProgressoAula >── Aula >── Modulo >── Curso
                                    │          ├──< Mensagem >── Conversa
                                    │          ├──< Notificacao
                                    │          ├──< Atividade
                                    │          ├──< Sessao
                                    │          └──< RegistroAuditoria
                                    │
                                    ├──< Evento
                                    ├──< ContaFinanceira
                                    └──< Lancamento >── CategoriaFinanceira
```
