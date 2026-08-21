# A Ordem — Plataforma Institucional

Plataforma digital de uma Ordem filosófico-política, destinada exclusivamente
aos seus membros. Reúne em um só aplicativo o que costuma viver em cinco
sistemas separados: **rede social privada**, **carteira digital de membro**,
**secretaria**, **tesouraria** e **formação**, sobre uma organização territorial
por Núcleos que já nasce preparada para múltiplos países.

Mobile-first, com adaptação plena a tablets, notebooks e monitores grandes.

---

## Começando

```bash
npm install
npm run dev      # http://localhost:5173
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Verificação de tipos + build de produção |
| `npm run preview` | Serve o build |
| `npm run typecheck` | Só a verificação de tipos |
| `npm run pagina-unica` | Empacota tudo em um único arquivo HTML |
| `npm run fontes` | Regenera as fontes auto-hospedadas |
| `npm run icones:verificar` | Acusa ícones fora do subconjunto |

### Distribuir sem servidor

`npm run pagina-unica` gera dois arquivos em `dist-unico/`, ambos sem nenhuma
requisição externa — JavaScript e CSS embutidos, fontes em data URI:

| Arquivo | Para quê |
|---|---|
| `a-ordem.html` | Documento completo: abre direto do disco ou de qualquer hospedagem estática |
| `a-ordem-embutida.html` | Fragmento, para hospedagens que fornecem o esqueleto do documento |

Nesse modo o roteamento passa a ser por hash (`#/feed`), já que não há servidor
para responder aos caminhos. A exportação de CSV detecta se o ambiente medeia a
gravação de arquivos e usa o canal adequado — ver `src/lib/baixar.ts`.

### Contas de demonstração

Senha única: **`ordem2026`**

| E-mail | Perfil | O que demonstra |
|---|---|---|
| `filipeedito@gmail.com` | Membro | A experiência do membro comum |
| `helenacastro@aordem.org` | Administrador | Acesso integral, permissões, auditoria |
| `beatrizalves@aordem.org` | Secretário | Cadastros, Núcleos, documentos — **sem valores financeiros** |
| `marcosteixeira@aordem.org` | Tesoureiro | Financeiro integral — **sem alteração cadastral** |
| `rafaellins@aordem.org` | Presidente | Visão institucional completa |

A tela de acesso traz esses perfis como atalho. Entrar com cada um mostra o RBAC
em funcionamento: o menu, as páginas e as ações mudam conforme o cargo.

---

## O que existe

**Do membro** — Painel inicial com carteira digital, indicadores e pendências ·
Feed com categorias, comentários, enquetes e comunicados oficiais · Propostas com
apoio e tramitação · Ranking global, por país, estado, município e Núcleo ·
Perfil com carteira, conquistas e histórico de XP · Formação em trilhas com
progresso e certificado · Documentos com versões e acesso por cargo · Mensagens
diretas, de grupo e de Núcleo · Eventos com inscrição e presença · Notificações ·
Painel do usuário com privacidade e segurança.

**Administrativo** — Painel da Secretaria com aprovação de cadastros e
indicadores · Cadastro de membros com filtros territoriais, edição, suspensão,
transferência e exportação · Cadastro de Núcleos com direção e quadro · Painel da
Tesouraria com fluxo de caixa, categorias e contas · Painel do Administrador com
configuração de XP, níveis e conquistas · Relatórios de membresia, participação,
financeiro e territorial · Cargos e permissões · Auditoria.

---

## Arquitetura em uma página

```
src/
├─ types/         modelo de domínio (35 entidades)
├─ data/          catálogo de cargos + carga institucional de demonstração
├─ lib/           regras puras: rbac · consultas · xp · formato · senha
├─ context/       Dados · Auth · Tema · Aviso
├─ components/
│  ├─ ui/         design system (Botao, Cartao, Tabela, Graficos…)
│  ├─ domain/     peças institucionais (CarteiraMembro, CartaoPublicacao…)
│  └─ layout/     AppShell, navegação, busca global
└─ pages/         auth · app · admin
```

**Regra de dependência:** páginas → componentes → contextos → regras → modelo.
Nada em `lib/` importa React; são funções puras, compartilháveis com um backend.

**Onde entra o servidor.** `DadosContext` é a única camada que conhece a origem
dos dados: hoje carrega a massa de demonstração e persiste no `localStorage`. Os
tipos de `src/types` espelham `docs/schema.sql`, e cada função de
`src/lib/consultas.ts` tem correspondência direta com uma query — a troca por uma
API é mecânica.

---

## Documentação

| Documento | Conteúdo |
|---|---|
| [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) | Camadas, páginas, fluxos, extensões previstas |
| [`docs/MODELO-DADOS.md`](docs/MODELO-DADOS.md) | As 35 entidades e seus relacionamentos |
| [`docs/schema.sql`](docs/schema.sql) | DDL PostgreSQL correspondente |
| [`docs/RBAC.md`](docs/RBAC.md) | Cargos, permissões, escopo e precedência |
| [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) | Cor, tipografia, componentes, dataviz, acessibilidade |
| [`docs/SEGURANCA.md`](docs/SEGURANCA.md) | O que está feito e o que exige servidor |

---

## Decisões que valem explicação

**Tudo auto-hospedado.** Tipografia e ícones vêm da própria aplicação (84 KB no
total), não de CDN. Uma plataforma institucional precisa funcionar em rede
restrita e sob CSP severa; e um ícone que não carrega deixa a interface
ilegível. `scripts/fontes.sh` regenera o subconjunto de ícones a partir de
`scripts/icones.txt`.

**Nenhuma biblioteca de gráficos.** As figuras são SVG desenhado em pixels
reais, medidos por `ResizeObserver` — assim a tipografia dos eixos tem o mesmo
tamanho no celular e no monitor. As cores das séries foram validadas para
daltonismo nos dois temas contra as superfícies reais da aplicação. Toda figura
oferece visão em tabela.

**RBAC verifica duas coisas.** Posse da permissão **e** escopo territorial. Sem a
segunda, um Dirigente de Núcleo com `membros.editar` editaria membros de
qualquer Núcleo.

**Secretaria e Tesouraria são disjuntas.** Mesma precedência, permissões que não
se sobrepõem nas áreas sensíveis. A Secretaria não vê valores; a Tesouraria não
altera cadastros.

**XP tem saldo e razão.** `Membro.xp` é o saldo; `TransacaoXP` é o lançamento.
Manter os dois permite auditar a pontuação e recalcular tudo se uma regra mudar.

---

## Limites deste estágio

O sistema roda inteiramente no navegador, sem backend. Portanto:

- A verificação de permissão é **de interface**. Em produção, cada regra precisa
  ser repetida no servidor — ver [`docs/SEGURANCA.md`](docs/SEGURANCA.md).
- Não há hash de senha real, nem 2FA, nem upload de arquivos.
- Os dados vivem no `localStorage` do navegador. O Painel do Administrador tem
  a opção de restaurar a massa original.
- O QR Code da carteira é uma marca visual determinística; a validação real
  exige assinatura emitida pelo servidor.

Nada disso é acidental: são exatamente os pontos onde a arquitetura já deixou o
encaixe pronto.
