# Segurança

Este documento separa com clareza **o que a plataforma já implementa** do **que
depende de um servidor** — porque tratar as duas coisas como equivalentes é o
erro que produz sistemas inseguros com aparência de seguros.

---

## 1. O princípio que organiza tudo

> O cliente decide **o que mostrar**. O servidor decide **o que permitir**.

Toda verificação de permissão feita nesta aplicação é uma decisão de interface.
Ela impede que um Secretário veja o painel da Tesouraria por engano; ela **não**
impede que alguém com conhecimento técnico chame a API diretamente. Enquanto não
houver servidor com as mesmas regras, o controle é organizacional, não técnico.

---

## 2. Implementado nesta aplicação

### Autenticação e sessão

- Credenciais validadas contra a base; situação da membresia verificada no
  acesso — `suspenso`, `inativo` e `desligado` não entram, com mensagem
  específica para cada caso.
- "Lembrar-me" controla explicitamente a persistência da sessão.
- Sessões ativas listadas por dispositivo e local, com revogação individual e
  "encerrar todos os dispositivos".
- Toda entrada e saída registrada na trilha de auditoria.

### RBAC com escopo

- Duas verificações independentes: posse da permissão **e** escopo territorial
  (`src/lib/rbac.ts`). Ver [`RBAC.md`](./RBAC.md).
- Precedência de cargos impede escalonamento de privilégio: ninguém atribui
  cargo superior ao próprio, nem altera permissões de cargo acima do seu.
- Separação de funções entre Secretaria (cadastral) e Tesouraria (financeira).
- Documentos filtrados por cargo na própria consulta da biblioteca.
- Tesouraria restringe Dirigentes de Núcleo aos lançamentos do próprio Núcleo.

### Privacidade dos dados pessoais

- Cada membro controla a visibilidade de e-mail, telefone, endereço, data de
  nascimento, perfil e publicações, em quatro níveis: público, Núcleo,
  administração, privado.
- O perfil de terceiros aplica essas preferências campo a campo — o dado
  restrito aparece como "Restrito pelo titular", nunca é enviado à tela.
- Dados sensíveis não são expostos em listagens públicas nem em rankings.

### Auditoria

Registra **usuário, ação, data, horário, módulo e alteração realizada** para:
aprovação e indeferimento de cadastro, edição e suspensão de membro,
transferência de Núcleo, criação e edição de Núcleo, lançamentos financeiros,
alteração de permissões, publicação de comunicado, tramitação de proposta,
registro de presença, exportação de dados, alteração de senha e de perfil,
revogação de sessões, entrada e saída.

A trilha é somente-acréscimo na interface: não há caminho para editar ou apagar
um registro.

### Validação de formulários

- Validação por etapa no cadastro, com mensagem específica por campo.
- Regras de negócio verificadas: idade mínima, e-mail único, nome de usuário
  único, formato de código de Núcleo, valor financeiro positivo.
- Medidor de força de senha com exigência mínima antes do envio.
- Confirmação obrigatória antes de ações destrutivas (`Confirmacao`).

### Não vazamento de informação

- A recuperação de senha responde sempre de forma genérica: não revela se o
  e-mail existe na base.
- O acesso responde "e-mail ou senha incorretos" sem distinguir os dois casos.

### Proteção do cliente

- React escapa todo conteúdo por padrão; não há `dangerouslySetInnerHTML` em
  lugar nenhum do código.
- Acesso ao `localStorage` isolado em `src/lib/armazenamento.ts`, com
  `try/catch` — modo privado, cota excedida ou storage bloqueado degradam sem
  quebrar a aplicação.
- Nenhuma dependência de CDN: tipografia e ícones são auto-hospedados, o que
  permite uma CSP restritiva sem `unsafe-inline` de terceiros.

---

## 3. Obrigatório no servidor, antes de produção

Nada abaixo é opcional.

### Senhas

O protótipo aceita uma senha única de demonstração e não persiste senha alguma.
`src/lib/senha.ts` deriva um resumo apenas para evitar texto claro no navegador
e **não é** um esquema de autenticação.

Em produção:

- **Argon2id** (ou bcrypt com custo ≥ 12), sal por usuário, verificação
  exclusivamente no servidor.
- Limite de tentativas por conta e por IP, com atraso progressivo.
- Token de redefinição de senha de uso único, com validade curta, armazenado
  como resumo.

### Sessão

- Cookie `httpOnly`, `Secure`, `SameSite=Strict`; nunca token em
  `localStorage`.
- Rotação do identificador de sessão na autenticação e na troca de senha.
- Expiração absoluta e por inatividade; revogação com efeito imediato no
  servidor.
- Proteção CSRF em toda requisição que altera estado.

### Autorização

- **Repetir cada verificação de RBAC no servidor.** As funções de
  `src/lib/rbac.ts` foram escritas sem dependência de React exatamente para
  serem compartilhadas com o backend.
- Autorização no nível da consulta, não apenas do endpoint: um Dirigente que
  pede `/api/lancamentos` recebe apenas os do próprio Núcleo porque a query
  filtra, não porque a tela esconde.

### Dois fatores

O campo e a interface de ativação existem; falta o serviço: TOTP (RFC 6238),
segredo cifrado em repouso, códigos de recuperação de uso único. Recomenda-se
exigi-lo dos cargos de precedência 1 a 4.

### Upload e documentos

- Validação de tipo por conteúdo, não por extensão; limite de tamanho;
  varredura antivírus.
- Armazenamento fora da raiz web, servido por URL assinada de validade curta.
- Autorização verificada **no download**, não apenas na listagem.

### Cabeçalhos e transporte

- HTTPS obrigatório com HSTS.
- CSP restritiva — viável sem exceções para terceiros, já que não há CDN.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: DENY`, `Permissions-Policy` mínima.

### Banco de dados

- Consultas parametrizadas, sempre.
- Menor privilégio por papel de aplicação.
- `REVOKE UPDATE, DELETE` na tabela de auditoria (já em `schema.sql`).
- Cifragem em repouso e backups testados por restauração, não só por execução.

### Dados pessoais (LGPD)

- Base legal registrada para cada finalidade de tratamento.
- Retenção definida e expurgo automatizado.
- Atendimento aos direitos do titular: acesso, correção, portabilidade e
  eliminação.
- Registro de consentimento e de sua revogação.
- Exportação de dados de membros restrita por permissão — como já está — **e**
  registrada em auditoria, como já está.

---

## 4. Verificação recomendada antes de publicar

- [ ] Teste de autorização por papel em **todos** os endpoints, incluindo os que
      a interface não expõe.
- [ ] Tentativa de escalonamento horizontal: acessar registro de outro Núcleo
      alterando o identificador na requisição.
- [ ] Tentativa de escalonamento vertical: promover-se a Administrador.
- [ ] Verificação de que a auditoria não pode ser alterada pela aplicação.
- [ ] Revisão de dependências (`npm audit`) e fixação de versões.
- [ ] Teste de restauração de backup.
