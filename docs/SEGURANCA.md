# Segurança

Este documento separa com clareza **o que está implementado** do **que ainda
depende de decisão de operação** — porque tratar as duas coisas como
equivalentes é o erro que produz sistemas inseguros com aparência de seguros.

A plataforma roda em dois modos, e a diferença importa mais aqui do que em
qualquer outro documento:

| Modo | Quando ocorre | O que vale |
|---|---|---|
| **Servidor** | há back-end em PHP instalado (`api/config.php` presente) | as regras são aplicadas no servidor; a interface apenas reflete |
| **Demonstração** | não há back-end | tudo roda no navegador, sobre `localStorage`; **não há segurança nenhuma**, e não deve haver dado real |

O modo de demonstração existe para avaliar as telas antes de contratar
hospedagem, e para a página única e a publicação estática. Não é ambiente de
produção, e a tela de acesso o anuncia exibindo as contas de exemplo.

---

## 1. O princípio que organiza tudo

> O cliente decide **o que mostrar**. O servidor decide **o que permitir**.

`src/lib/rbac.ts` e `api/nucleo/Rbac.php` implementam a mesma regra, de
propósito. O primeiro esconde o que não interessa; o segundo é o que vale.
Quem quer burlar a regra não usa a tela — chama a API. Por isso nenhuma rota
confia em cargo, Núcleo ou escopo vindos da requisição: tudo é lido do banco a
partir da sessão apresentada.

O mesmo vale para `src/lib/deliberacao.ts` e `api/nucleo/Deliberacao.php`: uma
apuração que só existisse no cliente poderia ser reescrita por quem votou.

---

## 2. Implementado no servidor

### Senhas — `api/nucleo/Seguranca.php`

- **Argon2id** quando o servidor oferece; bcrypt como reserva, escolhido em
  tempo de execução por `algoritmoSenha()`.
- Recifragem oportunista: no único momento em que a senha existe em texto
  claro — a entrada bem-sucedida —, um resumo feito por algoritmo mais fraco é
  refeito.
- Política de senha em `criticarSenha()`: mínimo de 10 caracteres, ao menos uma
  letra e um número ou símbolo, recusa de sequências de teclado e de palavras
  previsíveis usadas como senha inteira, e recusa do próprio nome ou e-mail.
  A crítica é a mesma no instalador, no cadastro e na redefinição.

### Limitação de tentativas

Duas barreiras independentes, porque uma sozinha não cobre o outro caso:

- **por conta** — `{P}tentativas` conta as recusas de um identificador na
  janela de 15 minutos; `membros.tentativas_falhas` e `bloqueado_ate` mantêm a
  trava mesmo depois de a tabela ser podada;
- **por origem** — o mesmo endereço não tenta mais de 30 vezes na janela,
  o que a trava por conta não impediria em uma varredura de muitas contas.

### Sessão

- Token de 32 bytes aleatórios; o banco guarda **apenas o resumo SHA-256**
  (`sessoes.token_hash`). Uma cópia da tabela não permite entrar.
- Cookie `httpOnly`, `SameSite=Lax` e `Secure` quando a requisição chega por
  HTTPS — inclusive atrás de proxy, por `X-Forwarded-Proto`.
- Expiração absoluta de 14 dias, gravada no registro e conferida na consulta.
- Revogação com efeito imediato: `revogada_em` é verificado a cada requisição.
- Quem passa a `suspenso`, `inativo` ou `desligado` perde o acesso na
  requisição seguinte, sem depender da expiração do token.
- Trocar a senha e redefini-la derrubam as demais sessões — é o gesto de quem
  suspeita que alguém entrou.
- `GET /sessao/dispositivos` lista as sessões vivas; `DELETE /sessao/outras`
  encerra as demais.

### CSRF

O token não é guardado em lugar nenhum: é derivado da própria sessão, por
HMAC-SHA256 do resumo do token com a chave da instalação
(`Seguranca::csrfDoToken`). Não pode ser forjado por quem apenas consegue
escrever cookies, e vale só para aquela sessão. É exigido em toda requisição
que altera estado, com quatro exceções que ainda não têm sessão de onde
derivá-lo — entrada, cadastro, pedido e uso do link de recuperação —, e que se
defendem pela limitação de tentativas.

No navegador o token vive **só em memória** (`src/lib/api.ts`): guardá-lo em
`localStorage` o deixaria ao alcance de qualquer script injetado na página,
que é justamente o que ele existe para conter.

### Autorização

- `Rbac::pode()` repete as duas verificações independentes — posse da permissão
  **e** escopo territorial. Ver [`RBAC.md`](./RBAC.md).
- `Rbac::podeAtribuirCargo()` impede escalonamento vertical: ninguém atribui
  cargo de precedência superior à sua.
- `PUT /cargos/:id/permissoes` recusa conceder permissão que o próprio autor
  não possui — sem isso, quem administra um cargo abaixo do seu poderia
  dar-lhe poderes e depois assumi-lo.
- Autorização no nível da consulta, não do endpoint: quem tem escopo de Núcleo
  recebe apenas os lançamentos e os membros do próprio Núcleo porque a
  condição entra no `WHERE`, não porque a tela esconde.
- Receita e despesa são permissões distintas; Secretaria e Tesouraria têm
  conjuntos disjuntos nas áreas sensíveis.
- Tentar alterar campo administrativo sem permissão devolve recusa explícita e
  fica na auditoria — ignorar em silêncio faria a tentativa passar por "nada a
  alterar".

### Privacidade dos dados pessoais — Est. Art. 21, VI

`api/nucleo/Membros.php` aplica a faixa de visibilidade escolhida pelo membro
na própria serialização. O campo restrito **não trafega**: esconder apenas na
interface deixaria o dado disponível a quem lesse a resposta da API. Uma lista
de campos nunca sai do servidor sob nenhuma permissão — resumo de senha,
segredo de dois fatores, contadores de trava.

### Entrada

`api/nucleo/Requisicao.php` é o único caminho de leitura: nenhuma rota lê
`$_POST` ou `$_GET` diretamente. Cada valor é convertido para o tipo esperado,
recusado quando não cabe, e o que não é declarado não chega ao banco.
Caracteres de controle são removidos; a codificação é conferida; a senha não é
aparada nem filtrada, porque espaços fazem parte dela.

### Banco de dados

- Declarações realmente preparadas (`ATTR_EMULATE_PREPARES => false`): sem
  emulação não há como um valor ser reinterpretado como parte da instrução.
- O nome da tabela é o único trecho montado por interpolação, e passa por
  `Banco::tabela()`, que só aceita identificadores conhecidos.
- Voto único por matéria garantido por chave do banco, não por verificação
  prévia — duas requisições simultâneas não passam.
- A auditoria é somente-acréscimo: `Auditoria` não tem método de alteração nem
  de remoção, e nenhuma rota expõe um.

### Cabeçalhos e exposição

- `Resposta::cabecalhosSeguranca()` em toda resposta: `nosniff`, `DENY`,
  `Referrer-Policy`, `Cross-Origin-Resource-Policy`, `Permissions-Policy`
  mínima, `Cache-Control: no-store` e uma CSP que nega tudo — a API não é um
  documento.
- Erros nunca são exibidos: vão para o registro do servidor, e o cliente
  recebe uma frase genérica. A depuração, quando ligada em `api/config.php`,
  devolve a mensagem em JSON.
- `api/.htaccess` nega `config.php`, `.sql`, `.json` e a pasta `nucleo/`; a
  API não é um índice navegável.

### Não vazamento de informação

- A entrada recusada responde sempre "Credenciais não conferem", e gasta o
  mesmo tempo de uma verificação real quando a conta não existe — a duração da
  resposta não deve denunciar a existência da conta.
- A recuperação de senha responde igual para endereço existente e inexistente.
- O cadastro público responde igual quando o e-mail já está no quadro; a
  Secretaria vê a duplicidade na análise.

### Instalação

- O instalador se tranca depois de concluído: a chave `instalado_em` na tabela
  de configuração é o trinco, e reabri-lo devolve 403.
- Se a semeadura falha, as tabelas criadas são removidas — instalação pela
  metade é pior que instalação nenhuma.
- `api/config.php` é gerado com `var_export`, de modo que aspas e barras na
  senha do banco são escapadas pelo próprio PHP, e recebe modo `0640`.
- A chave da instalação são 32 bytes de `random_bytes`, distinta por
  instalação.
- Formulários do instalador protegidos por token de sessão próprio.

---

## 3. Implementado na interface

Vale como conveniência e clareza, **nunca** como controle:

- Validação por etapa no cadastro, com mensagem específica por campo.
- Medidor de força de senha antes do envio.
- Confirmação obrigatória antes de ações destrutivas.
- React escapa todo conteúdo por padrão; não há `dangerouslySetInnerHTML` em
  lugar nenhum do código.
- Acesso ao `localStorage` isolado em `src/lib/armazenamento.ts`, com
  `try/catch`.
- Nenhuma dependência de CDN: tipografia e ícones são auto-hospedados, o que
  permite a CSP restritiva de `public/.htaccess` sem exceções de terceiros.
- Com servidor, a troca rápida de perfil da vitrine é desligada e a massa de
  demonstração sai de cena.

---

## 4. Ainda pendente

Nada abaixo está implementado. Não confundir com o que está.

### Dois fatores

O campo `dois_fatores_ativo` e `dois_fatores_segredo` existem no esquema e a
interface de ativação existe; falta o serviço: TOTP (RFC 6238), segredo
cifrado em repouso, códigos de recuperação de uso único. Recomenda-se exigi-lo
dos cargos de precedência 1 a 4.

### Upload e documentos

O esquema guarda `comprovante_url` e `foto_url`, mas não há rota de envio de
arquivo. Quando houver:

- validação de tipo por conteúdo, não por extensão; limite de tamanho;
- armazenamento fora da raiz web, servido por URL assinada de validade curta;
- autorização verificada **no download**, não apenas na listagem.

### Transporte

- **HTTPS obrigatório com HSTS.** O cookie de sessão só recebe `Secure` quando
  a requisição chega por HTTPS; em HTTP simples ele trafega em claro. Isto é
  configuração de hospedagem, e é a pendência mais séria desta lista.
- Redirecionamento de HTTP para HTTPS no servidor web.

### Operação do banco

- Menor privilégio: o usuário da aplicação não precisa de `DROP` nem de
  `CREATE` depois da instalação.
- `REVOKE UPDATE, DELETE` na tabela de auditoria — a garantia hoje é do código,
  e convém que seja também do banco.
- Cifragem em repouso e backups testados por restauração, não só por execução.

### Dados pessoais (LGPD)

- Base legal registrada para cada finalidade de tratamento.
- Retenção definida e expurgo automatizado.
- Atendimento aos direitos do titular: acesso, correção, portabilidade e
  eliminação.
- Registro de consentimento e de sua revogação.

---

## 5. Verificação antes de publicar

O percurso `testes/api.mjs` já cobre os quatro primeiros itens; os demais são
de operação.

- [x] Escalonamento vertical: promover-se a Grão-Mestre pela API.
- [x] Concessão de permissão que o autor não possui.
- [x] Acesso à escrituração sem permissão de Tesouraria.
- [x] Resumo de senha ausente de toda resposta.
- [ ] HTTPS com HSTS ativo e redirecionamento de HTTP.
- [ ] `api/instalacao/` removida do servidor.
- [ ] `api/config.php` inacessível pelo navegador (confirmar no ar, não só
      pelo `.htaccess`).
- [ ] Escalonamento horizontal: acessar registro de outro Núcleo alterando o
      identificador na requisição, com cargo de escopo local.
- [ ] Revisão de dependências (`npm audit`) e fixação de versões.
- [ ] Teste de restauração de backup.
