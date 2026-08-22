# Back-end

Servidor em **PHP puro, sem framework**, sobre MySQL ou MariaDB.

A escolha não é de gosto. A plataforma precisa ser instalável onde a Ordem
consegue hospedar: cPanel de R$ 15 por mês, Plesk, XAMPP na máquina de quem
administra. Nesses lugares não há Composer, nem terminal, nem serviço de fila —
há FTP e phpMyAdmin. Um framework moderno pressupõe tudo o que ali não existe.
Em troca, o que aqui se escreve à mão é pouco e está todo em `api/nucleo/`.

---

## 1. Disposição dos arquivos

```
api/
  index.php              ponto de entrada; encaminha para as rotas
  config.php             gerado pelo instalador; nunca versionado
  .htaccess              nega o que não é endereço; encaminha o resto
  nucleo/
    inicio.php           carregador de classes e tratamento de erros
    Config.php           leitura de config.php
    Banco.php            PDO, prefixo de tabelas, execução do esquema
    Seguranca.php        senhas, sessões, CSRF, limitação de tentativas
    Rbac.php             permissão e escopo — porte de src/lib/rbac.ts
    Deliberacao.php      quórum e apuração — porte de src/lib/deliberacao.ts
    Membros.php          serialização com a privacidade do Est. Art. 21, VI
    Requisicao.php       leitura e validação de toda entrada
    Resposta.php         JSON e cabeçalhos de segurança
    Auditoria.php        registro somente-acréscimo — Est. Art. 13
    Correio.php          envio de mensagens
    Semente.php          cargos, graus e órgãos vindos de src/data
    semente.json         gerado por `npm run semente`
  rotas/
    sessao.php  referencias.php  membros.php  nucleos.php
    publicacoes.php  assembleias.php  financeiro.php  administracao.php
  instalacao/
    index.php            o instalador, em quatro passos
    Instalador.php       requisitos, esquema e semeadura
    aparencia.php        HTML e CSS do instalador
    esquema.sql          31 tabelas, dialeto MySQL/MariaDB
```

`api/instalacao/` pode — e deve — ser apagada depois da instalação.
`api/nucleo/` não: a criação de um Núcleo precisa dos órgãos locais do
Est. Art. 59, que vêm de `semente.json`, muito depois de a instalação ter
terminado. Foi por isso que a semente saiu da pasta do instalador.

---

## 2. Uma verdade só, dois lugares

Cargos, permissões, graus e órgãos existem em `src/data/*.ts`. Copiá-los à mão
para dentro do PHP criaria duas verdades normativas que divergiriam na primeira
alteração do Estatuto. Em vez disso:

```bash
npm run semente     # src/data/*.ts  →  api/nucleo/semente.json
```

O instalador apenas grava o que o script exportou. Alterou um cargo em
`src/data/cargos.ts`? Rode `npm run semente` antes de montar o pacote —
`npm run pacote` já o faz.

O mesmo princípio, por outro caminho, vale para as regras: `Rbac.php` e
`Deliberacao.php` são portes deliberados de `src/lib/rbac.ts` e
`src/lib/deliberacao.ts`, escritos para serem lidos lado a lado. Quando uma
regra muda, muda nos dois — e o percurso de `testes/api.mjs` cobra a segunda.

---

## 3. O prefixo das tabelas

Toda tabela é criada com um prefixo escolhido na instalação (`omcl_` por
padrão). É prática comum em hospedagem compartilhada, onde o painel entrega um
banco só e nele convivem vários sistemas.

No SQL escrito à mão, o prefixo aparece como `{P}`:

```php
Banco::todos('SELECT * FROM {P}membros WHERE situacao = ?', ['ativo']);
```

`Banco::sql()` substitui. O nome da tabela é o **único** trecho de instrução
montado por interpolação em todo o servidor, e quando vem de fora passa por
`Banco::tabela()`, que só aceita `[a-z][a-z0-9_]*`.

---

## 4. Formato das respostas

Sempre JSON, inclusive nos erros — o cliente não precisa interpretar páginas de
erro do servidor.

```json
{ "ok": true,  "dados": { } }
{ "ok": false, "erro": "Confira os campos destacados.",
  "campos": { "senha": "Use ao menos 10 caracteres." } }
```

| Situação | Quando |
|---|---|
| 200 | êxito |
| 400 | requisição malformada, nada a alterar |
| 401 | sem sessão, ou credencial recusada |
| 403 | sem permissão, ou situação da membresia impede |
| 404 | recurso inexistente |
| 405 | método não aceito naquele endereço |
| 409 | conflito com o estado atual (votar duas vezes, instalar sem quórum) |
| 410 | link de recuperação expirado ou já usado |
| 419 | requisição sem confirmação de origem (CSRF) |
| 422 | campos rejeitados na validação — vem com `campos` |
| 429 | tentativas em excesso |
| 503 | plataforma ainda não instalada — vem com `instalador` |

---

## 5. Rotas

Autenticação e conta:

| | |
|---|---|
| `POST /sessao` | entrar; devolve o membro e o token anti-CSRF |
| `GET /sessao` | quem sou eu, cargo e permissões |
| `DELETE /sessao` | sair |
| `DELETE /sessao/outras` | encerrar os demais dispositivos |
| `GET /sessao/dispositivos` | sessões vivas |
| `POST /sessao/senha` | trocar a própria senha |
| `POST /sessao/recuperar` | pedir link de redefinição |
| `POST /sessao/redefinir` | redefinir com o link |
| `POST /cadastro` | cadastro público — Est. Art. 17 |

Quadro e território:

| | |
|---|---|
| `GET /referencias` | cargos, graus, órgãos, território e configuração |
| `GET /membros` | listagem com filtro e escopo |
| `GET /membros/:id` | um membro, com a privacidade aplicada |
| `PATCH /membros/:id` | edição; campos administrativos exigem permissão |
| `POST /membros/:id/situacao` | deferir, suspender, desligar |
| `GET /ranking` | por XP, nunca por valor contribuído |
| `POST /estados`, `POST /municipios` | território |
| `GET /nucleos`, `GET /nucleos/:id` | Núcleos |
| `POST /nucleos` | cria o Núcleo **e** os três órgãos do Art. 59 |
| `PATCH /nucleos/:id` | edição e designação da direção local |

Feed:

| | |
|---|---|
| `GET /publicacoes` | feed, com filtros |
| `POST /publicacoes` | publicar; `oficial` exige permissão própria |
| `PATCH /publicacoes/:id` | fixar e destacar — ato de moderação |
| `DELETE /publicacoes/:id` | o autor apaga o seu; os demais moderam |
| `GET/POST /publicacoes/:id/comentarios` | comentários |
| `POST /publicacoes/:id/curtida` | alterna o reconhecimento |

Governança:

| | |
|---|---|
| `GET /assembleias`, `GET /assembleias/:id` | com convocação e quórum apurados |
| `POST /assembleias` | convocar |
| `POST /assembleias/:id/presenca` | registrar presença |
| `POST /assembleias/:id/situacao` | instalar, segunda convocação, encerrar |
| `POST /assembleias/:id/materias` | pautar matéria |
| `POST /materias/:id/voto` | votar — único por matéria |
| `POST /materias/:id/encerrar` | encerrar e apurar |

Tesouraria:

| | |
|---|---|
| `GET /financeiro/contas` | contas e categorias |
| `POST /financeiro/contas`, `/financeiro/categorias` | cadastro |
| `GET /financeiro/lancamentos` | escrituração, limitada pelo escopo |
| `POST /financeiro/lancamentos` | receita e despesa são permissões distintas |
| `POST /financeiro/lancamentos/:id/cancelar` | cancela; não apaga |
| `GET /transparencia` | agregados abertos a todo membro — Est. Art. 13 |
| `GET/POST /compromissos` | compromisso de contribuição — C106:7 |

Administração:

| | |
|---|---|
| `GET /auditoria` | trilha, com filtros |
| `GET /permissoes` | catálogo, e quais o autor possui |
| `PUT /cargos/:id/permissoes` | não concede o que o autor não tem |
| `PUT /configuracoes` | lista fechada de chaves |
| `POST /xp`, `GET /membros/:id/xp` | razão da participação |
| `POST /ritos`, `GET /membros/:id/ritos` | registro dos ritos |

E `GET /estado`, que responde mesmo antes da instalação — é por ela que a
aplicação descobre em que modo está.

---

## 6. O que ainda vive no navegador

Com servidor, passaram para o back-end: identidade, cargos, permissões, quadro
de membros, Núcleos, feed, assembleias, tesouraria, auditoria, XP e ritos.

Continuam no `localStorage`, também no modo com servidor, as áreas cujo esquema
existe mas cujas rotas ainda não foram escritas: eventos e inscrições,
documentos e versões, formação, propostas, mensagens e notificações, processos
disciplinares, arbitragem, células e serviço honorífico. Elas funcionam, e o
que se guarda nelas é do navegador de quem usou — não da Ordem.

A tabela correspondente já existe em `esquema.sql`, de modo que a rota é o
único trabalho que falta em cada uma.

---

## 7. Como exercitar

```bash
npm run pacote
npm run api:local            # php -S localhost:8080 -t dist-hospedagem
testes/instalar.sh http://localhost:8080
node testes/api.mjs http://localhost:8080
```

`testes/instalar.sh` percorre o instalador pelo terminal, como faria um
navegador. `testes/api.mjs` exercita 76 verificações — as regras que só o
servidor pode garantir: escopo, precedência, quórum, unicidade do voto e as
restrições normativas que a tela não alcança. Pressupõe instalação recém-feita,
e recusa-se a continuar sobre uma base já usada.
