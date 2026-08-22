# Implantação

Há duas maneiras de publicar, e a escolha entre elas é a primeira decisão:

| | **Com servidor** | **Só estática** |
|---|---|---|
| O que se envia | a aplicação **e** a pasta `api/` | apenas a aplicação |
| O que a hospedagem precisa ter | PHP 8.1+ e MySQL/MariaDB | nada além de servir arquivos |
| Onde ficam os dados | no banco, no servidor | no navegador de cada pessoa |
| Serve para | a Ordem de verdade | avaliar as telas, demonstrar, arquivar |

A parte estática é a mesma nos dois casos. O que muda é a presença da pasta
`api/` ao lado dela — e a aplicação descobre sozinha, na partida, em qual dos
dois está.

**Para instalar de verdade, vá para [Com servidor](#com-servidor).** As seções
seguintes tratam da publicação estática, que continua valendo e não deixou de
funcionar.

---

## Com servidor

### 1. Monte o pacote

```bash
npm run pacote
```

Gera `dist-hospedagem/` com tudo lado a lado:

```
dist-hospedagem/
  index.html  assets/  fontes/  .htaccess    a aplicação
  api/                                        o servidor e o instalador
```

`api/config.php` **não** vai no pacote: ele é gerado no destino, pelo
instalador, e carrega a senha do banco daquela hospedagem.

### 2. Crie o banco

Pelo painel da hospedagem (cPanel, Plesk) ou pelo phpMyAdmin. Anote nome do
banco, usuário e senha. O instalador **não cria o banco**, para não exigir do
usuário do banco um poder que ele não deve ter no dia a dia.

Use `utf8mb4` com `utf8mb4_unicode_ci`.

### 3. Envie os arquivos

Copie **o conteúdo** de `dist-hospedagem/` para `public_html` (cPanel,
Hostinger, Locaweb) ou `htdocs` (XAMPP). Confira que os arquivos ocultos foram
junto: `.htaccess` na raiz e outro dentro de `api/`. Muitos clientes de FTP os
escondem por padrão.

### 4. Abra o endereço no navegador

A aplicação percebe que há servidor sem instalação e leva ao instalador. São
quatro passos:

1. **Requisitos** — o instalador confere versão do PHP, extensões, permissão de
   escrita e presença dos arquivos que ele mesmo vai usar.
2. **Banco de dados** — nome, usuário, senha, servidor, porta e prefixo das
   tabelas. O prefixo permite mais de uma instalação no mesmo banco, situação
   comum em hospedagem compartilhada. O instalador só avança depois de
   conseguir conectar.
3. **Identidade e administração** — nome do sistema, nome da organização, país
   e moeda, e a conta de administração: nome, e-mail e senha.
4. **Conclusão** — o que fazer em seguida.

Se a semeadura falhar no meio, as tabelas criadas são removidas: instalação
pela metade é pior que instalação nenhuma. Corrija o que a mensagem indicar e
recomece.

### 5. Depois de instalar

- **Apague `api/instalacao/` do servidor.** Ela não é necessária depois da
  última tela. O instalador já se tranca sozinho — a chave `instalado_em` na
  tabela de configuração é o trinco —, mas código que não está no servidor não
  tem falha a explorar.
- Confirme no navegador que `seu-dominio/api/config.php` **não** devolve
  conteúdo. O `.htaccess` da pasta já o impede no Apache; confirme no ar.
- Ative HTTPS. O cookie de sessão só recebe `Secure` quando a requisição chega
  por HTTPS; em HTTP simples ele trafega em claro.
- A conta criada na instalação é **técnica**: mantém a plataforma e não exerce
  autoridade institucional. Os cargos estatutários são atribuídos depois, pela
  via prevista no Estatuto.

### XAMPP — instalação local

Serve para experimentar antes de contratar hospedagem, e para uso em rede
interna.

1. Instale o XAMPP e inicie **Apache** e **MySQL** no painel de controle.
2. Abra `http://localhost/phpmyadmin` e crie um banco — por exemplo `omcl`,
   com `utf8mb4_unicode_ci`.
3. Copie o conteúdo de `dist-hospedagem/` para `C:\xampp\htdocs\ordem`
   (ou `/Applications/XAMPP/htdocs/ordem` no macOS).
4. Abra `http://localhost/ordem`.
5. No passo do banco: usuário `root`, **senha em branco**, servidor
   `localhost`, porta `3306`. É a configuração padrão do XAMPP.

Uma senha em branco no banco é aceitável numa máquina local e inaceitável em
servidor exposto. Se a instalação sair da sua máquina, crie um usuário próprio
com senha.

### Sem XAMPP, para experimentar

Basta ter PHP instalado:

```bash
npm run pacote
npm run api:local       # php -S localhost:8080 -t dist-hospedagem
```

`implantacao/servidor-local.php` reproduz, sem Apache, o que os arquivos
`.htaccess` fazem em produção.

### Requisitos do servidor

| | |
|---|---|
| PHP | 8.1 ou superior |
| Extensões | `pdo_mysql`, `mbstring`, `json`, `openssl`, `filter` |
| Banco | MySQL 5.7+ ou MariaDB 10.3+ |
| Desejável | Argon2id para senhas; `mail()` para recuperação de senha |

O instalador confere tudo isso na primeira tela e diz o que falta. Sem
Argon2id as senhas usam bcrypt, que é aceitável. Sem `mail()` a recuperação de
senha vai para o registro do servidor em vez de para a caixa do membro — o que
serve em desenvolvimento e não serve em produção.

### Atualizar uma instalação existente

```bash
npm run pacote
```

Envie tudo **menos** `api/config.php`, que é da instalação e não do código.
`dist-hospedagem/` nunca o contém, de modo que uma cópia integral da pasta já
faz a coisa certa.

---

## Publicação estática

Sem a pasta `api/`, a plataforma roda inteira no navegador, sobre
`localStorage`, com a massa de demonstração. Serve para avaliar as telas, para
demonstrar e para arquivar — **não para dados reais**, já que não há segurança
alguma nesse modo e cada visitante tem a sua própria cópia.

---

## A única exigência: reescrita de rota

A aplicação é de página única. O navegador conhece `/feed`, `/tesouraria` e
`/membros/:id`, mas **esses caminhos não existem como arquivos**. Sem
configuração, recarregar `/feed` devolve 404.

A regra é sempre a mesma, em qualquer plataforma:

> Se o caminho pedido não corresponde a um arquivo existente, devolva
> `index.html` com status 200.

Todos os adaptadores abaixo fazem exatamente isso. É o único ponto onde a
hospedagem precisa colaborar.

---

## Docker — qualquer servidor

O caminho mais portátil: funciona em VPS, Kubernetes, Cloud Run, Render, Fly.io,
Railway, EasyPanel, Coolify, Dokploy e qualquer painel que aceite um Dockerfile.

**Com back-end** — aplicação, PHP e banco:

```bash
docker compose -f implantacao/docker-compose-servidor.yml up -d
```

Abra `http://localhost:8080` e o instalador aparece. No passo do banco:
servidor `banco`, porta `3306`, base `omcl`, usuário `omcl`, e a senha de
`BANCO_SENHA`. A configuração da instalação fica num volume, apontada por
`OMCL_CONFIG`, e sobrevive à substituição da imagem.

**Só a parte estática** — sem PHP, sem banco:

```bash
docker build -t omcl .
docker run -d -p 8080:8080 --name omcl omcl
```

Ou com Compose:

```bash
docker compose -f implantacao/docker-compose.yml up -d
```

A imagem estática tem dois estágios: o primeiro compila com Node; o segundo
serve com Nginx. A imagem final não contém Node nem código-fonte — apenas os estáticos e o
servidor, em poucos megabytes. Escuta na porta **8080** (não privilegiada), o que
permite rodar sem root e atende ao padrão das plataformas gerenciadas.

Para publicar com HTTPS, ponha um proxy reverso à frente — Caddy, Traefik ou o
Nginx do próprio servidor — apontando para a 8080. Não termine TLS dentro do
contêiner.

---

## Vercel

Importe o repositório. O `vercel.json` já define build, diretório de saída,
reescrita de rota e cabeçalhos de segurança. Nada a configurar no painel.

## Netlify e Cloudflare Pages

Importe o repositório. Comando de build `npm run build`, diretório `dist` — o
`netlify.toml` já traz ambos, junto com cabeçalhos e reescrita. O
`public/_redirects` cobre o Cloudflare Pages, que lê o mesmo formato.

## GitHub Pages

Em **Settings → Pages**, escolha **GitHub Actions** como origem. O workflow
`.github/workflows/paginas.yml` compila e publica a cada envio para `main`.

Dois detalhes que o workflow já resolve:

- O Pages serve a partir de `/<repositório>/`, não da raiz do domínio; o build
  recebe `--base` com o caminho correto.
- O Pages não tem regra de reescrita. O workflow copia `index.html` para
  `404.html`, o que faz o Pages devolver a aplicação em vez de erro.

## Apache, cPanel e hospedagem compartilhada

Esta seção trata da publicação **sem** back-end. Com PHP e banco, use
[Com servidor](#com-servidor).

```bash
npm run build
```

Envie **o conteúdo** de `dist/` para `public_html` (ou a pasta que o painel
indicar). O `public/.htaccess` vai junto no build e cuida da reescrita, dos
cabeçalhos de segurança e do cache.

Se o `.htaccess` não surtir efeito, o `mod_rewrite` está desabilitado — peça a
ativação ao suporte da hospedagem. É um módulo padrão; a recusa é rara.

## Nginx próprio

```bash
npm run build
sudo cp -r dist/* /var/www/omcl/
sudo cp implantacao/nginx.conf /etc/nginx/sites-available/omcl
sudo ln -s /etc/nginx/sites-available/omcl /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Ajuste `root` e `server_name` conforme o servidor. O arquivo já traz reescrita,
cabeçalhos, compressão e política de cache.

## Sem servidor algum

```bash
npm run pagina-unica
```

Gera `dist-unico/a-ordem.html`: um arquivo de cerca de 740 KB com tudo embutido
— JavaScript, CSS e fontes como data URI. Abre direto do disco, vai por e-mail,
cabe num pen drive. O roteamento passa a ser por hash (`#/feed`), já que não há
servidor para responder aos caminhos.

---

## Configuração de cache

A política que os adaptadores aplicam:

| Recurso | Cache | Porquê |
|---|---|---|
| `/assets/*` | 1 ano, imutável | O nome do arquivo contém hash do conteúdo |
| `/fontes/*` | 1 ano, imutável | Só mudam quando o subconjunto é regenerado |
| `index.html` | Sem cache | É ele que aponta para a versão atual dos assets |

Cachear o `index.html` é o erro que faz o navegador continuar carregando a
versão antiga depois de um deploy.

---

## Cabeçalhos de segurança

Todos os adaptadores aplicam a mesma política. A **CSP pode ser restritiva**
porque a aplicação não usa CDN algum — fontes, ícones e scripts saem da própria
origem:

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self'
```

Mais `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` e
`Referrer-Policy: strict-origin-when-cross-origin`.

O `'unsafe-inline'` em `style-src` é necessário porque a aplicação define cores
calculadas via atributo `style` — barras de progresso e séries de gráfico. É a
única concessão da política.

**Ative o HSTS** quando o domínio servir exclusivamente por HTTPS. A linha está
comentada em `implantacao/nginx.conf`; ativá-la antes de o HTTPS estar estável
deixa o domínio inacessível pelo tempo do `max-age`.

---

## Verificação contínua

`.github/workflows/verificacao.yml` roda a cada envio: verificação de tipos,
conferência do subconjunto de ícones e compilação. A conferência de ícones
importa mais do que parece — um ícone fora do subconjunto simplesmente não é
desenhado, e o defeito passa despercebido em revisão de código.

---

## Depois de publicar

Com servidor, some a estes:

- [ ] `api/instalacao/` removida.
- [ ] `seu-dominio/api/config.php` não devolve conteúdo.
- [ ] `seu-dominio/api/estado` devolve JSON com `"instalado": true`.
- [ ] HTTPS ativo — sem ele o cookie de sessão trafega em claro.
- [ ] A tela de acesso **não** mostra perfis de demonstração. Se mostrar, a
      aplicação não encontrou a pasta `api/`.

Em qualquer modo:

- [ ] Recarregue uma rota interna diretamente (`/feed`) — deve carregar a
      aplicação, não 404.
- [ ] Confira no inspetor que **nenhuma requisição sai do seu domínio**.
- [ ] Verifique que as fontes carregaram: se os ícones aparecerem como texto
      (`home`, `search`), o diretório `/fontes/` não foi enviado.
- [ ] Teste o tema escuro e uma largura de celular.
- [ ] Confirme os cabeçalhos de segurança com
      `curl -I https://seu-dominio/`.
