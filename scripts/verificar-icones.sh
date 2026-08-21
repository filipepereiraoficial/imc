#!/usr/bin/env bash
# Acusa ícones referenciados no código que não estejam em scripts/icones.txt.
# Sem eles no subconjunto da fonte, o símbolo simplesmente não é desenhado.
#
# Termos que a busca captura mas não são ícones ficam em scripts/nao-icones.txt.
set -euo pipefail
cd "$(dirname "$0")/.."

USADOS=$(
  {
    grep -rhoE '(nome|icone)="[a-z_0-9]+"' src --include='*.tsx' | grep -oE '"[a-z_0-9]+"' | tr -d '"'
    grep -rhoE "icone: '[a-z_0-9]+'" src --include='*.ts' --include='*.tsx' | sed "s/icone: '//;s/'//"
    grep -rhoE '(nome|icone)=\{[^}]*\}' src --include='*.tsx' | grep -oE "'[a-z_0-9]{3,}'" | tr -d "'"
    grep -rhoE '"icone": "[a-z_0-9]+"' src/data --include='*.ts' | sed 's/"icone": "//;s/"//'
  } | sort -u
)

CONHECIDOS=$(
  {
    grep -vE '^\s*(#|$)' scripts/icones.txt
    grep -vE '^\s*(#|$)' scripts/nao-icones.txt
  } | sort -u
)

FALTANDO=$(comm -23 <(echo "$USADOS") <(echo "$CONHECIDOS") || true)

if [ -n "$FALTANDO" ]; then
  echo "Ícones ausentes de scripts/icones.txt:"
  echo "$FALTANDO" | sed 's/^/  - /'
  echo
  echo "Se forem ícones, acrescente-os àquele arquivo e rode ./scripts/fontes.sh."
  echo "Se não forem, acrescente-os a scripts/nao-icones.txt."
  exit 1
fi

echo "Todos os ícones usados estão no subconjunto ($(echo "$USADOS" | wc -l) referências)."
