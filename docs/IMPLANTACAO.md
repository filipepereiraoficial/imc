# Implantação

A plataforma compila para **arquivos estáticos**: HTML, JavaScript, CSS e
fontes. Não exige Node em produção, nem banco de dados, nem runtime algum no
servidor. Qualquer hospedagem capaz de servir arquivos serve a plataforma.

Isso vale enquanto os dados vivem no navegador. Ao introduzir o backend descrito
em [`SEGURANCA.md`](./SEGURANCA.md), a parte estática continua igual — o que
muda é o serviço de API ao lado dela.

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

```bash
docker build -t omcl .
docker run -d -p 8080:8080 --name omcl omcl
```

Ou com Compose:

```bash
docker compose -f implantacao/docker-compose.yml up -d
```

A imagem tem dois estágios: o primeiro compila com Node; o segundo serve com
Nginx. A imagem final não contém Node nem código-fonte — apenas os estáticos e o
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

- [ ] Recarregue uma rota interna diretamente (`/feed`) — deve carregar a
      aplicação, não 404.
- [ ] Confira no inspetor que **nenhuma requisição sai do seu domínio**.
- [ ] Verifique que as fontes carregaram: se os ícones aparecerem como texto
      (`home`, `search`), o diretório `/fontes/` não foi enviado.
- [ ] Teste o tema escuro e uma largura de celular.
- [ ] Confirme os cabeçalhos de segurança com
      `curl -I https://seu-dominio/`.
