# Imagem de produção da plataforma da OMCL.
#
# Dois estágios: o primeiro compila; o segundo serve estáticos com Nginx, numa
# imagem final de poucos megabytes, sem Node nem código-fonte.
#
#   docker build -t omcl .
#   docker run -p 8080:8080 omcl

# ---------- Estágio 1: compilação ----------
FROM node:22-alpine AS compilacao
WORKDIR /app

# As dependências mudam menos que o código: copiadas antes, aproveitam o cache.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Estágio 2: serviço ----------
FROM nginx:1.27-alpine AS servico

COPY --from=compilacao /app/dist /usr/share/nginx/html
COPY implantacao/nginx.conf /etc/nginx/conf.d/default.conf

# Porta não privilegiada: permite rodar sem root e atende ao padrão da maioria
# das plataformas gerenciadas.
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
