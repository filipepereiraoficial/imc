#!/usr/bin/env bash
# Percorre o instalador pelo terminal, como faria um navegador.
# Serve para preparar uma instalacao limpa antes de testes/api.mjs.
#
#   testes/instalar.sh [base] [porta-do-banco]
set -euo pipefail

BASE="${1:-http://127.0.0.1:8088}"
PORTA_BD="${2:-3307}"
BD="${BD:-omcl_teste}"
BD_USUARIO="${BD_USUARIO:-omcl}"
BD_SENHA="${BD_SENHA:-senha_teste}"
PREFIXO="${PREFIXO:-omcl_}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@ordem.test}"
ADMIN_SENHA="${SENHA_ADMIN:-Outra-Senha-Firme-8}"

BISCOITOS="$(mktemp)"
trap 'rm -f "$BISCOITOS"' EXIT

chave() {
  curl -s -b "$BISCOITOS" -c "$BISCOITOS" "$1" \
    | grep -o 'name="csrf" value="[^"]*"' | sed 's/.*value="//;s/"//'
}

echo "1/2 conexao com o banco"
TOK="$(chave "$BASE/api/instalacao/?passo=banco")"
curl -sS -b "$BISCOITOS" -c "$BISCOITOS" -X POST "$BASE/api/instalacao/?passo=banco" \
  -d "csrf=$TOK" -d "base=$BD" -d "usuario=$BD_USUARIO" -d "senha=$BD_SENHA" \
  -d "servidor=127.0.0.1" -d "porta=$PORTA_BD" -d "prefixo=$PREFIXO" \
  -o /dev/null -w '   resposta %{http_code}\n'

echo "2/2 identidade e conta de administracao"
TOK="$(chave "$BASE/api/instalacao/?passo=identidade")"
curl -sS -b "$BISCOITOS" -c "$BISCOITOS" -X POST "$BASE/api/instalacao/?passo=identidade" \
  -d "csrf=$TOK" \
  -d "nome_sistema=Plataforma da Ordem" \
  -d "nome_organizacao=Ordem dos Monarquistas Conservadores-Liberais" \
  -d "pais_nome=Brasil" -d "pais_iso=BR" -d "moeda=BRL" \
  -d "admin_nome=Filipe Pereira" -d "admin_email=$ADMIN_EMAIL" \
  --data-urlencode "admin_senha=$ADMIN_SENHA" \
  --data-urlencode "admin_senha_repetida=$ADMIN_SENHA" \
  -o /dev/null -w '   resposta %{http_code}\n'

curl -s "$BASE/api/estado"
echo
