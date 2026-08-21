# Controle de Cargos e Permissões (RBAC)

## 1. Princípio

O acesso é decidido por **duas verificações independentes**, ambas obrigatórias:

1. **Posse da permissão** — o cargo do membro contém a permissão solicitada?
2. **Escopo territorial** — o alvo da ação está no alcance do cargo?

```ts
// src/lib/rbac.ts
export function pode(cargos, membro, permissao, alvo = {}): boolean {
  const cargo = encontrarCargo(cargos, membro.cargoId);
  if (!cargo) return false;
  if (!cargo.permissoes.includes(permissao)) return false;   // etapa 1
  return dentroDoEscopo(cargo.escopo, membro, alvo);          // etapa 2
}
```

Omitir a etapa 2 é o erro clássico de RBAC: um Dirigente de Núcleo com
`membros.editar` passaria a editar membros de qualquer Núcleo da Ordem.

Na interface há dois auxiliares com propósitos distintos:

- `tem(permissao)` — só a etapa 1. Serve para **exibir ou ocultar menus e
  botões**, quando ainda não existe alvo concreto.
- `pode(permissao, alvo)` — as duas etapas. Serve para **autorizar a ação**.

## 2. Escopos

| Escopo | Alcance |
|---|---|
| `global` | Toda a Ordem |
| `pais` | Membros e registros do próprio país |
| `estado` | Membros e registros do próprio estado/província |
| `nucleo` | Membros e registros do próprio Núcleo (mais o próprio registro) |
| `proprio` | Apenas o próprio registro |

## 3. Precedência e escalonamento

Cada cargo tem uma `precedencia` (1 = mais alto). Um cargo **só pode ser
atribuído por quem tem precedência igual ou superior**:

```ts
podeAtribuirCargo(cargos, autor, cargoAlvoId)
  → cargoAutor.precedencia <= cargoAlvo.precedencia
```

Assim um Secretário (precedência 4) não promove ninguém a Administrador
(precedência 1). A mesma regra vale na tela de permissões: um cargo de
precedência superior à do autor não pode ter suas permissões alteradas.

## 4. Catálogo de cargos

| Precedência | Cargo | Escopo | Natureza do acesso |
|---|---|---|---|
| 1 | Administrador | global | Integral, incluindo permissões e auditoria |
| 2 | Presidente | global | Institucional completo; consulta financeira, sem lançamento |
| 3 | Vice-Presidente | global | Acompanhamento e execução |
| 4 | Secretário | global | Cadastral, documental e de eventos — **sem valores financeiros** |
| 4 | Tesoureiro | global | Financeiro integral — **sem alteração cadastral** |
| 5 | Dirigente de Núcleo | nucleo | Membros e atividades do próprio Núcleo |
| 6 | Coordenador | nucleo | Apoio em formação, eventos e presença |
| 7 | Membro | proprio | Participação plena, sem funções administrativas |
| 8 | Candidato | proprio | Cadastro em análise; conteúdo público apenas |

**Separação deliberada:** Secretário e Tesoureiro têm a mesma precedência e
conjuntos de permissões disjuntos nas áreas sensíveis. A Secretaria não vê
valores; a Tesouraria não altera cadastros. Essa separação de funções é o
principal controle contra concentração indevida de poder administrativo.

## 5. Catálogo de permissões

### Membros
`membros.visualizar` · `membros.criar` · `membros.editar` · `membros.aprovar` ·
`membros.suspender` · `membros.transferir` · `membros.exportar`

### Núcleos
`nucleos.visualizar` · `nucleos.criar` · `nucleos.editar`

### Conteúdo
`publicacoes.criar` · `publicacoes.publicarOficial` · `publicacoes.moderar` ·
`documentos.visualizar` · `documentos.gerenciar` · `formacao.gerenciar`

### Eventos
`eventos.visualizar` · `eventos.gerenciar` · `presenca.registrar`

### Tesouraria
`tesouraria.visualizar` · `tesouraria.lancarReceita` ·
`tesouraria.lancarDespesa` · `tesouraria.gerenciarContas`

### Governança
`propostas.criar` · `propostas.tramitar` · `gamificacao.configurar` ·
`relatorios.gerar` · `auditoria.visualizar` · `permissoes.gerenciar` ·
`configuracoes.gerenciar`

## 6. Onde a verificação acontece

| Camada | O que faz |
|---|---|
| Barra lateral (`AppShell`) | Oculta itens administrativos sem permissão |
| Página administrativa | Bloqueia com `<SemAcesso>` na ausência da permissão |
| Ação dentro da página | Verifica `pode(permissao, alvo)` antes de executar |
| Documentos | `documentoVisivel(nivelAcesso, cargo)` filtra a biblioteca |
| Tesouraria | Dirigente vê apenas lançamentos do próprio Núcleo |
| Perfil de terceiros | Preferências de privacidade do titular filtram cada campo |

Ocultar um item de menu **não é** controle de acesso — é conveniência. O
bloqueio real está na página e na ação.

> **Nota sobre o protótipo.** Como não há servidor, a verificação é
> exclusivamente no cliente. Em produção, **toda** decisão de acesso precisa ser
> repetida no servidor: o cliente só decide o que mostrar, nunca o que permitir.
> Ver [`SEGURANCA.md`](./SEGURANCA.md).
