# Arquitetura da Plataforma da Ordem

Este documento descreve a arquitetura do sistema: camadas, estrutura de páginas,
fluxos de navegação, níveis de acesso e a organização do código.

---

## 1. Visão geral

A plataforma reúne, em um único aplicativo, cinco sistemas que costumam viver
separados:

| Sistema | O que resolve |
|---|---|
| Rede social privada | Feed, comentários, mensagens, propostas |
| Carteira digital de membro | Identidade institucional, registro, validação |
| Secretaria | Cadastro, aprovação, Núcleos, presença, documentos |
| Tesouraria | Receitas, despesas, contas, fluxo de caixa, prestação de contas |
| Formação e participação | Trilhas, cursos, XP, níveis, ranking territorial |

A experiência é **mobile-first**: a navegação primária no celular é a barra
inferior de cinco itens (Hoje, Feed, Propostas, Ranking, Perfil); no desktop,
uma barra lateral fixa expõe o menu completo, incluindo o bloco administrativo
filtrado por permissão.

---

## 2. Camadas

```
┌──────────────────────────────────────────────────────────────┐
│  Páginas (src/pages)                                          │
│  auth · app · admin — cada página aplica sua própria           │
│  verificação de permissão antes de renderizar                  │
├──────────────────────────────────────────────────────────────┤
│  Componentes                                                   │
│  ui/      primitivos do design system (Botao, Cartao, Tabela…) │
│  domain/  peças institucionais (CarteiraMembro, CartaoPublicacao) │
│  layout/  AppShell, navegação, busca global, cabeçalho         │
├──────────────────────────────────────────────────────────────┤
│  Contextos (src/context)                                       │
│  ServidorContext  há back-end? instalado?                      │
│  DadosContext     estado da base + auditoria + persistência    │
│  AuthContext      sessão, cadastro, RBAC aplicado              │
│  TemaContext   claro/escuro/sistema                            │
│  AvisoContext  notificações efêmeras (toasts)                  │
├──────────────────────────────────────────────────────────────┤
│  Regras (src/lib)                                              │
│  rbac · deliberacao · consultas · xp · formato · api · mapear  │
├──────────────────────────────────────────────────────────────┤
│  Modelo (src/types) + carga inicial (src/data)                 │
└──────────────────────────────────────────────────────────────┘
```

**Regra de dependência:** páginas dependem de componentes, contextos e regras;
regras dependem apenas do modelo. Nada em `lib/` importa React — são funções
puras, testáveis isoladamente.

### O servidor

```
┌──────────────────────────────────────────────────────────────┐
│  api/index.php                                                 │
│  cabeçalhos · verificação de instalação · CSRF · roteamento    │
├──────────────────────────────────────────────────────────────┤
│  api/rotas/                                                    │
│  sessão · referências · membros · núcleos · publicações        │
│  assembleias · financeiro · administração                      │
├──────────────────────────────────────────────────────────────┤
│  api/nucleo/                                                   │
│  Seguranca   senhas, sessões, CSRF, limitação de tentativas    │
│  Rbac        permissão + escopo — porte de src/lib/rbac.ts     │
│  Deliberacao quórum e apuração — porte de src/lib/deliberacao  │
│  Requisicao  toda entrada tipada e validada                    │
│  Membros     privacidade do Est. Art. 21, VI na serialização   │
│  Auditoria   somente acréscimo — Est. Art. 13                  │
├──────────────────────────────────────────────────────────────┤
│  api/nucleo/Banco.php  →  MySQL / MariaDB, 31 tabelas          │
└──────────────────────────────────────────────────────────────┘
```

PHP puro, sem framework, porque a plataforma precisa ser instalável onde a
Ordem consegue hospedar: cPanel barato, Plesk, XAMPP. Ver
[`BACKEND.md`](./BACKEND.md).

**Dois lugares, uma verdade.** `Rbac.php` e `Deliberacao.php` são portes
deliberados de `src/lib/rbac.ts` e `src/lib/deliberacao.ts`, escritos para
serem lidos lado a lado. Foi para isso que as regras nasceram sem dependência
de React. Cargos, graus e órgãos têm fonte única em `src/data`, exportada por
`npm run semente`.

**Dois modos.** `ServidorContext` descobre na partida se há back-end. Com ele,
`AuthContext` autentica pela API e a base local é esvaziada — uma Ordem
recém-instalada não deve abrir com membros fictícios. Sem ele, a aplicação
segue sobre `localStorage`, com a massa de demonstração.

`src/lib/consultas.ts` reúne as consultas derivadas (ranking territorial, fluxo
de caixa, indicadores). Cada função ali tem correspondência direta com uma query
SQL — o que resta migrar é mecânico.

---

## 3. Estrutura de páginas

### Públicas

| Rota | Página | Descrição |
|---|---|---|
| `/entrar` | Entrar | Autenticação, "lembrar-me", perfis de demonstração |
| `/cadastro` | Cadastro | Solicitação em três etapas com validação por etapa |
| `/cadastro-enviado` | CadastroEnviado | Confirmação e explicação do rito de aprovação |
| `/recuperar-senha` | RecuperarSenha | Redefinição com resposta genérica (não revela e-mails) |

### Do membro

| Rota | Página | Conteúdo |
|---|---|---|
| `/hoje` | Hoje | Carteira, indicadores, atividades, comunicados, eventos, atalhos |
| `/feed` | Feed | Publicações com categorias, busca, composição |
| `/propostas` · `/propostas/:id` | Propostas | Apresentação, apoio, tramitação |
| `/ranking` | Ranking | Global, país, estado, município, Núcleo |
| `/perfil` · `/membros/:id` | Perfil | Carteira, dados, publicações, conquistas, atividade |
| `/painel` | Painel do usuário | Conta, dados pessoais, institucionais, privacidade, segurança |
| `/eventos` · `/eventos/:id` | Eventos | Inscrição, lista de presença, registro de presença |
| `/formacao` · `/formacao/:id` | Formação | Trilhas, módulos, aulas, progresso, certificado |
| `/documentos` | Documentos | Biblioteca com versões e nível de acesso por cargo |
| `/mensagens` | Mensagens | Conversas diretas, grupos, Núcleo e canais oficiais |
| `/notificacoes` | Notificações | Central com filtros por tipo |
| `/meu-nucleo` | Núcleo | Página do Núcleo do próprio membro |
| `/configuracoes` | Configurações | Tema, notificações, segurança, sobre |

### Administrativas

| Rota | Página | Permissão exigida |
|---|---|---|
| `/admin` | Painel do Administrador | `configuracoes.gerenciar` ou `permissoes.gerenciar` |
| `/secretaria` | Painel da Secretaria | `membros.criar`, `membros.aprovar` ou `membros.editar` |
| `/tesouraria` | Painel da Tesouraria | `tesouraria.visualizar` |
| `/membros` | Cadastro de membros | `membros.visualizar` |
| `/nucleos` · `/nucleos/:id` | Cadastro de Núcleos | `nucleos.visualizar` |
| `/relatorios` | Relatórios | `relatorios.gerar` |
| `/permissoes` | Cargos e permissões | `permissoes.gerenciar` |
| `/auditoria` | Auditoria | `auditoria.visualizar` |

---

## 4. Fluxos de navegação

### Ingresso

```
/cadastro  →  3 etapas (identificação → localização → acesso)
           →  registro criado com situação "pendente" e cargo "candidato"
           →  /cadastro-enviado
           ↓
Secretaria (/secretaria)  →  aprova ou indefere
           ↓ aprovação
situação "ativo" + cargo "membro" + notificação ao candidato
```

O modo de aprovação é configurável (automática, pela Secretaria, pelo
Administrador, ou cadastro direto pela Secretaria em `/membros`).

### Sessão

```
/entrar → AuthContext.entrar()
        → valida credenciais e situação da membresia
        → grava sessão (localStorage) se "lembrar-me"
        → registra na auditoria
        → /hoje
```

Rotas internas ficam sob `<Protegida>`, que redireciona para `/entrar` sem sessão.

### Participação e XP

```
Evento → confirmar participação → presença registrada pelo dirigente
                                → +XP conforme a regra do evento
Curso  → concluir aulas → conclusão do curso → +XP + certificado
Atividade designada → concluir → +XP
                     ↓
        TransacaoXP registrada → saldo do membro → nível → ranking
```

### Deliberação

```
Proposta: Recebida → Em análise → Em discussão → Aprovada
                                               → Rejeitada
                                               → Arquivada
```

Cada transição grava um `TramiteProposta` (situação, data, responsável, nota) e
uma entrada de auditoria.

---

## 5. Níveis de acesso

O controle é **RBAC com escopo territorial** — duas verificações independentes:

1. **Posse da permissão.** O cargo do membro contém a permissão?
2. **Escopo.** O alvo da ação está no alcance territorial do cargo?

```ts
pode(cargos, membro, 'membros.editar', { nucleoId: alvo.nucleoId })
```

Sem a segunda etapa, um Dirigente de Núcleo com `membros.editar` poderia editar
membros de qualquer Núcleo. Os escopos são: `global`, `pais`, `estado`,
`nucleo`, `proprio`.

Há ainda a **precedência**: um cargo só pode ser atribuído por quem tem
precedência igual ou superior (`podeAtribuirCargo`), o que impede escalonamento
de privilégio pelas telas administrativas.

Detalhamento completo em [`RBAC.md`](./RBAC.md).

---

## 6. Modelo de dados

35 entidades, agrupadas em: território, cargos e permissões, membros, Núcleos,
feed, eventos e presença, documentos, formação, propostas, gamificação,
comunicação, tesouraria, atividades e auditoria.

Detalhamento em [`MODELO-DADOS.md`](./MODELO-DADOS.md) e DDL em
[`schema.sql`](./schema.sql).

---

## 7. Design system

Tokens de cor expostos como variáveis CSS (`src/index.css`), consumidos pelo
Tailwind (`tailwind.config.js`) — o que dá tema claro/escuro sem duplicar
utilitários. Componentes reutilizáveis em `src/components/ui`.

Detalhamento em [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).

---

## 8. Segurança

Autenticação, sessão, RBAC, auditoria, validação e proteção de dados pessoais —
com a distinção explícita entre o que o servidor aplica, o que a interface
apenas exibe e o que ainda depende de decisão de operação. Ver
[`SEGURANCA.md`](./SEGURANCA.md).

---

## 9. Crescimento previsto

A arquitetura já acomoda múltiplos países, estados/províncias, municípios e
Núcleos: todo membro carrega `paisId`, `estadoId`, `municipioId` e `nucleoId`,
e o ranking e os relatórios operam sobre esses eixos sem alteração de código.

Pontos de extensão preparados:

- **Aplicativos Android e iOS** — a interface é mobile-first e a API já existe;
  um cliente nativo consome as mesmas rotas.
- **QR Code e validação de carteira** — o componente já existe; falta a
  assinatura verificável emitida pelo servidor.
- **Certificados e assinatura digital** — `Curso.emiteCertificado` e o registro
  de progresso são a base.
- **Dois fatores** — o campo existe no membro e a interface de ativação está
  pronta; falta o serviço TOTP.
- **Rotas que faltam** — eventos, documentos, formação, propostas, mensagens,
  notificações, processos disciplinares e serviço honorífico têm tabela em
  `esquema.sql` e ainda vivem no navegador. A rota é o único trabalho pendente
  em cada um.
- **Integrações** (e-mail, calendário, sistemas financeiros) e **API pública ou
  privada** — as consultas de `src/lib/consultas.ts` delimitam o contrato.
