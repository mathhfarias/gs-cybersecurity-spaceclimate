# Simulação do Pipeline DevSecOps

## Cenário

Foi simulada a exposição de um arquivo `.env` no repositório.

Esse cenário representa um risco comum no desenvolvimento de software, pois arquivos `.env` podem conter tokens, senhas, strings de conexão e chaves de APIs.

## Problema Simulado

Foi criada uma branch chamada:

```text
simulacao/segredo-exposto
```

Nessa branch, foi adicionado um arquivo `.env` falso com conteúdo apenas demonstrativo.

## Controle que Detectou

O controle responsável foi o script:

```text
scripts/check-secrets.sh
```

Esse script é executado automaticamente pelo GitHub Actions.

## Resultado Esperado

O pipeline deve falhar na etapa:

```text
Verificar exposição de arquivos sensíveis
```

## Ação Tomada

Após a detecção, o arquivo `.env` foi removido e o pipeline foi executado novamente.

Com a correção, o pipeline voltou a ser aprovado.
