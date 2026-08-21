# Design System da Ordem

A identidade nasce dos conceitos das referências visuais — ouro como destaque,
fundo claro e neutro, cartões arredondados, hierarquia forte, gamificação
discreta — mas é uma linguagem própria: mais sóbria, com tipografia maior,
contraste mais alto e nenhum elemento lúdico. O resultado deve parecer o
aplicativo oficial de uma instituição séria, não um jogo.

---

## 1. Cor

Os tokens vivem em `src/index.css` como variáveis CSS e são consumidos pelo
Tailwind (`tailwind.config.js`) via `rgb(var(--token) / <alpha-value>)`. Isso dá
tema claro e escuro sem duplicar utilitário algum.

### Superfícies e tinta

| Token | Papel | Claro | Escuro |
|---|---|---|---|
| `surface` | Fundo da página | `#FFFCF6` | `#12110E` |
| `surface-card` | Cartões e painéis | `#FFFFFF` | `#1C1A15` |
| `surface-muted` | Blocos internos, listras | `#F7F2E9` | `#25221C` |
| `surface-strong` | Trilhos de progresso | `#EEE7D9` | `#302C24` |
| `line` | Contorno padrão | `#E7DECD` | `#38332A` |
| `line-strong` | Contorno de campo | `#D6CAB2` | `#4E473A` |
| `ink` | Texto principal | `#1A160E` | `#F5F0E7` |
| `ink-soft` | Texto secundário | `#605847` | `#B7AFA0` |
| `ink-faint` | Rótulos e metadados | `#8E8572` | `#8A8273` |

O fundo é **creme quente**, não branco puro: reduz o cansaço em leitura longa e
dá ao conjunto um caráter documental, adequado a uma instituição.

### Ouro institucional

| Token | Uso | Claro | Escuro |
|---|---|---|---|
| `ouro` | Destaque, progresso, seleção | `#D69E0B` | `#F0C110` |
| `ouro-soft` | Botão secundário, selo de nível | `#F5C518` | `#FFD640` |
| `ouro-deep` | Texto sobre fundo dourado claro | `#6C4E00` | `#FFE08B` |
| `ouro-wash` | Fundo de destaque | `#FDF3D6` | `#3C300E` |

O ouro **marca**, não preenche: aparece em barras de progresso, no item de menu
ativo, no selo de nível e na carteira. Nunca como fundo de bloco extenso.

### Semânticas

`positivo` `#157A4C` · `atencao` `#B06E00` · `critico` `#BA2821` · `info` `#2160A8`

---

## 2. Tipografia

**Hanken Grotesk**, auto-hospedada (`public/fontes`), pesos 400–800.

| Escala | Tamanho / entrelinha | Uso |
|---|---|---|
| `display` | 40 / 48, −0.02em, 800 | Números heroicos |
| `titulo` | 28 / 36, −0.015em, 700 | Título de página |
| `secao` | 20 / 28, −0.01em, 700 | Título de cartão |
| base | 16 / 24, 400 | Corpo |
| `rotulo` | 12 / 16, +0.08em, 600, caixa alta | Rótulos institucionais |

A classe utilitária `.rotulo` aplica a variante de rótulo — caixa alta,
espaçamento aberto, tom `ink-faint`. É o que dá o caráter de documento oficial
sem recorrer a molduras ou serifas.

Números que precisam alinhar verticalmente (tabelas, eixos, valores monetários)
usam `tabular-nums`.

---

## 3. Forma e elevação

| Token | Valor | Uso |
|---|---|---|
| `rounded-card` | 20px | Cartões, campos, tabelas |
| `rounded-painel` | 28px | Carteira, modais |
| `shadow-suave` | difusa, curta | Cartão em repouso |
| `shadow-elevado` | difusa, longa | Cartão em foco, modal |
| `shadow-selo` | interna + externa | Carteira de membro |

Sombras são discretas e sempre acompanhadas de contorno de 1px: em fundo creme,
sombra sozinha some.

---

## 4. Componentes

### Primitivos (`src/components/ui`)

`Botao` · `BotaoLink` · `BotaoIcone` · `Cartao` · `CabecalhoCartao` ·
`TituloSecao` · `Selo` · `Ponto` · `Avatar` · `Campo` · `Selecao` · `AreaTexto` ·
`Alternador` · `CampoBusca` · `Modal` · `Gaveta` · `Confirmacao` · `Abas` ·
`BarraProgresso` · `AnelProgresso` · `Tabela` · `Paginacao` · `Vazio` ·
`Esqueleto` · `EsqueletoCartao` · `EsqueletoLista` · `SemAcesso` · `Icone`

### De domínio (`src/components/domain`)

`CarteiraMembro` · `PlacaIndicador` · `CartaoPublicacao` · `ItemRanking` ·
`CartaoEvento` · `ItemNotificacao` · `CartaoProposta` · `CartaoMembro`

### De dados (`src/components/ui/Graficos.tsx`)

`CartaoEstatistica` · `CartaoGrafico` · `Legenda` · `GraficoBarrasDuplas` ·
`GraficoBarrasRanqueadas` · `TabelaDeApoio`

### Variantes de botão

| Variante | Quando usar |
|---|---|
| `primario` | A ação principal da tela (fundo tinta) |
| `secundario` | Ação afirmativa em contexto dourado |
| `contorno` | Ação secundária ao lado da principal |
| `sutil` | Ação terciária, barras de ferramenta |
| `perigo` | Ação destrutiva, sempre com confirmação |

---

## 5. Visualização de dados

As figuras seguem regras verificáveis, não gosto:

**Formas.** Comparação de duas séries no tempo → barras agrupadas. Comparação de
grandeza entre categorias → barras ranqueadas em **matiz único**, com o valor
rotulado diretamente. Valor isolado → cartão de indicador, não gráfico.

**Cores.** Duas séries usam slots categóricos fixos:

| Papel | Claro | Escuro |
|---|---|---|
| Série 1 (Receitas) | `#2a78d6` | `#3987e5` |
| Série 2 (Despesas) | `#eb6834` | `#d95926` |
| Sequencial (grandeza) | `#2a78d6` | `#3987e5` |
| Delta positivo | `#006300` | `#0ca30c` |
| Delta negativo | `#d03b3b` | `#e66767` |

O par de séries foi **validado** para daltonismo nos dois temas contra as
superfícies reais da aplicação (`#FFFFFF` e `#1C1A15`): ΔE CVD 24,7 no claro e
26,8 no escuro, contra um piso de 8; contraste ≥ 3:1 em ambos.

As cores de delta (variação percentual nos cartões de indicador) são de
**estado**, não de série — vêm sempre acompanhadas de ícone e rótulo, nunca
sozinhas. É por isso que receitas e despesas usam azul e laranja em vez do par
verde/vermelho: verde e vermelho estão reservados para "melhorou" e "piorou".

**Regras firmes:**

- Um eixo por gráfico. Nunca duas escalas verticais.
- Legenda sempre presente a partir de duas séries.
- A cor segue a entidade, nunca a posição no ranking.
- Toda figura oferece **visão em tabela** (`CartaoGrafico`, botão "Ver tabela") —
  é a alternativa acessível e também o caminho para conferir números exatos.
- Marcas finas, extremidades arredondadas em 4px, 2px de respiro entre barras
  adjacentes, grade recessiva.
- Os gráficos são desenhados em pixels reais (`useLargura` + `ResizeObserver`),
  não escalando um `viewBox` fixo: assim a tipografia dos eixos tem o mesmo
  tamanho no celular e no monitor grande.

---

## 6. Responsividade

| Faixa | Comportamento |
|---|---|
| < 640px | Coluna única, navegação inferior de 5 itens, tabelas viram cartões |
| 640–1023px | Duas colunas onde couber, gaveta lateral pelo menu |
| ≥ 1024px | Barra lateral fixa de 17rem, painéis lado a lado |
| ≥ 1280px | Dashboards em 4 colunas, feed com coluna auxiliar |

**Tabelas.** O componente `Tabela` aceita `cartaoMobile`: abaixo de `md` a mesma
lista é renderizada como cartões, e a tabela propriamente dita só aparece quando
há largura para ela. Colunas marcadas como `secundaria` desaparecem antes das
demais.

O corpo da página nunca rola horizontalmente; conteúdo largo rola dentro do
próprio contorno.

---

## 7. Acessibilidade

- Contraste do texto sobre todas as superfícies acima de 4.5:1.
- Foco visível em todo elemento interativo (`:focus-visible` com anel dourado).
- Ícones decorativos com `aria-hidden`; ícones informativos com `role="img"` e
  rótulo.
- Alternadores como `role="switch"` com `aria-checked`.
- Abas com `role="tab"` e `aria-selected`.
- Barras de progresso com `role="progressbar"` e os três valores ARIA.
- Link "Ir para o conteúdo" no início de cada página.
- Tabelas com `<caption>` (visualmente oculto) e `<th scope="col">`.
- `prefers-reduced-motion` desliga transições e animações.
- Nenhuma informação transmitida só por cor.
