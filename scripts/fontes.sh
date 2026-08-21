#!/usr/bin/env bash
# Regenera as fontes auto-hospedadas em public/fontes.
#
# A tipografia e os ícones são servidos pela própria aplicação, sem CDN: a
# interface precisa renderizar corretamente em rede restrita, offline ou sob
# políticas que bloqueiem terceiros.
#
# A fonte de ícones é um SUBCONJUNTO, montado a partir de scripts/icones.txt.
# Ao usar um ícone novo no código, acrescente o nome àquele arquivo e rode:
#
#   ./scripts/fontes.sh
#
# `npm run icones:verificar` acusa ícones usados no código que faltem na lista.
set -euo pipefail

cd "$(dirname "$0")/.."
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
mkdir -p public/fontes

ICONES=$(grep -vE '^\s*(#|$)' scripts/icones.txt | sort -u | paste -sd, -)
echo "→ $(echo "$ICONES" | tr ',' '\n' | wc -l) ícones no subconjunto"

echo "→ Baixando a fonte de ícones…"
CSS_ICONES=$(curl -sf -A "$UA" \
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0..1,0&icon_names=${ICONES}&display=block")
URL_ICONES=$(echo "$CSS_ICONES" | grep -oE 'https://fonts.gstatic.com/[^)]*' | head -1)
[ -n "$URL_ICONES" ] || { echo "falha: nenhuma URL de fonte retornada"; exit 1; }
curl -sf -A "$UA" "$URL_ICONES" -o public/fontes/simbolos.woff2

echo "→ Baixando Hanken Grotesk (latin e latin-ext)…"
CSS_TEXTO=$(curl -sf -A "$UA" \
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400..800&display=swap")
mapfile -t URLS < <(echo "$CSS_TEXTO" | grep -oE 'https://fonts.gstatic.com/[^)]*')
# Ordem devolvida pelo Google: cirílico, vietnamita, latin-ext, latin.
curl -sf -A "$UA" "${URLS[2]}" -o public/fontes/texto-latin-ext.woff2
curl -sf -A "$UA" "${URLS[3]}" -o public/fontes/texto-latin.woff2

echo "→ Pronto:"
ls -lh public/fontes
