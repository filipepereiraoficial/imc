#!/usr/bin/env bash
# Acusa ícones referenciados no código que não estejam em scripts/icones.txt.
# Sem eles no subconjunto, o símbolo simplesmente não é desenhado.
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

FALTANDO=$(comm -23 <(echo "$USADOS") <(sort -u scripts/icones.txt) || true)

if [ -n "$FALTANDO" ]; then
  echo "Ícones ausentes de scripts/icones.txt:"
  echo "$FALTANDO" | sed 's/^/  - /'
  echo
  echo "Acrescente-os ao arquivo e rode ./scripts/fontes.sh."
  echo "Se algum item acima não for um ícone (é uma string qualquer capturada"
  echo "pela busca), pode ser ignorado."
  exit 1
fi

echo "Todos os ícones usados estão no subconjunto."
