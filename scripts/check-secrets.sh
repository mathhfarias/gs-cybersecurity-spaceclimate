#!/usr/bin/env bash

set -euo pipefail

echo "Iniciando verificação de arquivos sensíveis..."

ENV_FILES=$(find . -type f -name ".env" -not -path "./.git/*" || true)

if [ -n "$ENV_FILES" ]; then
  echo "::error::Arquivo .env encontrado no repositório. Remova o arquivo e use .env.example + GitHub Secrets."
  echo "Arquivos encontrados:"
  echo "$ENV_FILES"
  exit 1
fi

echo "Nenhum arquivo .env real foi encontrado."
echo "Verificação de segredos concluída com sucesso."
