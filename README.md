# OMCL — Plataforma Institucional

Plataforma digital da **Ordem dos Monarquistas Conservadores-Liberais**,
destinada exclusivamente aos seus associados — os **Eunomitas** (Est. Art. 15).

A estrutura segue o **Estatuto Social** (75 artigos) e o **Códice Verde**
(117 capítulos): cargos, categorias associativas, graus de formação, hierarquia
normativa e modalidades de contribuição vêm dos documentos da Ordem, não de
convenções genéricas de software. O mapeamento artigo a artigo está em
[`docs/MAPEAMENTO-NORMATIVO.md`](docs/MAPEAMENTO-NORMATIVO.md). Reúne em um só aplicativo o que costuma viver em cinco
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
| `npm run semente` | Exporta cargos, graus e órgãos de `src/data` para o servidor |
| `npm run pacote` | Monta `dist-hospedagem/` — aplicação **e** back-end |
| `npm run api:local` | Serve o pacote com o PHP embutido, para experimentar |
| `npm run api:testes` | Percorre a API |

### Hospedar

Há dois modos, e a escolha é a primeira decisão:

**Com servidor** — PHP 8.1+ e MySQL/MariaDB. É como a Ordem usa de verdade: os
dados ficam no banco, as senhas são cifradas com Argon2id e cada regra é
aplicada no servidor.

```bash
npm run pacote      # gera dist-hospedagem/
```

Envie o conteúdo de `dist-hospedagem/` para `public_html` (cPanel, Plesk,
Hostinger) ou `htdocs` (XAMPP), crie um banco vazio pelo painel, e abra o
endereço: a aplicação leva ao instalador. São quatro passos — requisitos,
conexão com o banco, nome do sistema e da organização com a conta de
administração, e conclusão.

**Só estática** — sem PHP nem banco. A aplicação roda inteira no navegador, com
a massa de demonstração. Serve para avaliar as telas, demonstrar e arquivar;
não para dados reais.

| Plataforma | O que usar | Já configurado |
|---|---|---|
| Apache · cPanel · XAMPP **com back-end** | Enviar `dist-hospedagem/` | `public/.htaccess`, `api/.htaccess` |
| Docker **com back-end** | `docker compose -f implantacao/docker-compose-servidor.yml up -d` | `implantacao/Dockerfile.servidor` |
| Docker (só estática) | `docker build -t omcl . && docker run -p 8080:8080 omcl` | `Dockerfile`, `implantacao/nginx.conf` |
| Vercel | Importar o repositório | `vercel.json` |
| Netlify · Cloudflare Pages | Importar o repositório | `netlify.toml`, `public/_redirects` |
| GitHub Pages | Settings → Pages → GitHub Actions | `.github/workflows/paginas.yml` |
| Nginx próprio | Copiar `implantacao/nginx.conf` | ✓ |
| Sem servidor algum | `npm run pagina-unica` | arquivo único de 740 KB |

As quatro últimas linhas servem apenas o modo estático: não executam PHP.

Detalhes e passo a passo em [`docs/IMPLANTACAO.md`](docs/IMPLANTACAO.md).

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

| E-mail | Cargo | O que demonstra |
|---|---|---|
| `filipeedito@gmail.com` | Eunomita · Membro | A experiência do associado comum |
| `rafaellins@aordem.org` | Grão-Mestre | Visão institucional completa (Est. Art. 33) |
| `beatrizalves@aordem.org` | Secretário-Geral | Cadastros, Núcleos, documentos — **sem valores financeiros** |
| `marcosteixeira@aordem.org` | Tesoureiro-Geral | Financeiro integral — **sem alteração cadastral** |
| `helenacastro@aordem.org` | Administrador | Função técnica da plataforma, sem previsão estatutária |

A tela de acesso traz esses perfis como atalho. Entrar com cada um mostra o RBAC
em funcionamento: o menu, as páginas e as ações mudam conforme o cargo.

---

## O que existe

**Do membro** — Painel inicial com carteira digital, indicadores e pendências ·
Assembleias com quórum, votação nominal e apuração · Portal de Transparência ·
Leitourgia (serviço honorífico) · Arbitragem de Honra ·
Feed com categorias, comentários, enquetes e comunicados oficiais · Propostas com
apoio e tramitação · Ranking global, por país, estado, município e Núcleo ·
Perfil com carteira, conquistas e histórico de XP · Formação em trilhas com
progresso e certificado · Documentos com versões e acesso por cargo · Mensagens
diretas, de grupo e de Núcleo · Eventos com inscrição e presença · Notificações ·
Painel do usuário com privacidade e segurança.

**Administrativo** — Governança com órgãos, assentos, mandatos e linha de
sucessão · Processos
disciplinares com o rito do CDEG · Painel da Secretaria com aprovação de cadastros e
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

```
api/
├─ nucleo/        Banco · Seguranca · Rbac · Deliberacao · Requisicao · Resposta
├─ rotas/         sessão · referências · membros · núcleos · feed · assembleias
│                 · tesouraria · administração
└─ instalacao/    o instalador em quatro passos, e o esquema SQL
```

**Onde entra o servidor.** A aplicação descobre na partida se há back-end. Com
ele, identidade, cargos, permissões, quadro, Núcleos, feed, assembleias,
tesouraria e auditoria vêm do banco; sem ele, tudo roda sobre a massa de
demonstração no `localStorage`.

`api/nucleo/Rbac.php` e `api/nucleo/Deliberacao.php` são portes deliberados de
`src/lib/rbac.ts` e `src/lib/deliberacao.ts` — escritos para serem lidos lado a
lado, porque a regra que vale é a do servidor e a do cliente não pode divergir
dela. Cargos, graus e órgãos têm uma fonte só: `npm run semente` os exporta de
`src/data` para o instalador.

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
| [`docs/MAPEAMENTO-NORMATIVO.md`](docs/MAPEAMENTO-NORMATIVO.md) | Estatuto e Códice → funções do sistema |
| [`docs/BACKEND.md`](docs/BACKEND.md) | O servidor em PHP: disposição, rotas, respostas |
| [`docs/IMPLANTACAO.md`](docs/IMPLANTACAO.md) | Como hospedar e instalar, em qualquer plataforma |

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

**Sem back-end**, o sistema roda inteiramente no navegador. A verificação de
permissão é então **de interface**, não há senha cifrada, e os dados vivem no
`localStorage` de cada visitante. Esse modo é para avaliar e demonstrar.

**Com back-end**, o que ainda falta:

- Autenticação em dois fatores. O campo e a tela existem; falta o serviço TOTP.
- Envio de arquivos. O esquema guarda as URLs, mas não há rota de upload:
  fotos de perfil e comprovantes ainda não sobem.
- Áreas cujo esquema existe e cujas rotas não foram escritas — eventos,
  documentos, formação, propostas, mensagens, notificações, processos
  disciplinares, arbitragem e serviço honorífico. Funcionam, e o que se guarda
  nelas continua no navegador. Ver [`docs/BACKEND.md`](docs/BACKEND.md).
- HTTPS é responsabilidade da hospedagem, e é a pendência mais séria: sem ele o
  cookie de sessão trafega em claro.
- O QR Code da carteira é uma marca visual determinística; a validação real
  exige assinatura emitida pelo servidor.

Nada disso é acidental: são exatamente os pontos onde a arquitetura já deixou o
encaixe pronto.
