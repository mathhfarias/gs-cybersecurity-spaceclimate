# SpaceClimate API - Global Solution 2026 Cybersecurity

## Visão Geral

Este repositório contém uma API modelo da Global Solution 2026 para a disciplina de Cybersecurity da FIAP.

A proposta do projeto é simular uma solução baseada no ecossistema espacial, chamada **SpaceClimate**, com endpoints de telemetria climática, alertas ambientais e monitoramento de saúde da aplicação.

O foco principal do repositório é demonstrar a integração de um **módulo DevSecOps** ao ciclo de desenvolvimento, conforme solicitado na atividade da Global Solution.

---

## Contexto do Projeto

O SpaceClimate representa uma API que poderia consumir dados orbitais, telemetria de satélites e informações climáticas para apoiar análises de risco e emissão de alertas.

Como esse tipo de solução pode lidar com APIs externas, dados estratégicos e infraestrutura em nuvem, foram aplicados controles de segurança no pipeline de desenvolvimento.

---

## Tecnologias Utilizadas

- Node.js
- Express
- Helmet
- CORS
- GitHub Actions
- Trivy
- Shell Script
- Dockerfile demonstrativo

---

## Endpoints da API

Após instalar e executar o projeto, a API ficará disponível em:

```text
http://localhost:3000
```

### Health Check

```http
GET /health
```

### Telemetria Simulada

```http
GET /api/telemetry
```

### Alertas Simulados

```http
GET /api/alerts
```

### Criar Alerta Simulado

```http
POST /api/alerts/simulate
Content-Type: application/json

{
  "region": "Sudeste do Brasil",
  "severity": "HIGH",
  "message": "Alerta simulado para teste da API."
}
```

---

## Como Executar Localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar a API

```bash
npm start
```

### 3. Rodar os testes

```bash
npm test
```

### 4. Testar no navegador

Acesse:

```text
http://localhost:3000/health
```

---

## Módulo DevSecOps

O módulo DevSecOps foi implementado com GitHub Actions e Trivy.

O arquivo principal do pipeline está em:

```text
.github/workflows/security-scan.yml
```

O pipeline executa:

1. Checkout do código;
2. Configuração do Node.js;
3. Verificação de arquivos sensíveis;
4. Instalação de dependências;
5. Execução de testes automatizados;
6. Scan de vulnerabilidades, segredos e configurações com Trivy;
7. Geração de relatório;
8. Bloqueio automático caso existam falhas altas ou críticas.

---

## Controles de Segurança Aplicados

### 1. Análise de Vulnerabilidades no CI/CD

O Trivy analisa o repositório em busca de vulnerabilidades em dependências, segredos e configurações inseguras.

### 2. Gestão de Segredos

O projeto utiliza `.env.example` apenas como modelo.

Arquivos reais como `.env`, `.env.local`, `.env.production` e `.env.development` são bloqueados pelo `.gitignore` e pela etapa `check-secrets.sh` do pipeline.

### 3. Zero Trust no Pipeline

Nenhuma alteração é considerada confiável automaticamente.

O código precisa passar pelo pipeline antes de ser integrado à branch principal. O workflow também usa permissões reduzidas.

---

## Simulação de Falha

A simulação recomendada é adicionar um arquivo `.env` falso em uma branch de teste.

O pipeline deve detectar o arquivo e bloquear a execução.

Exemplo:

```bash
git checkout -b simulacao/segredo-exposto
echo "SPACE_DATA_PROVIDER_TOKEN=token_falso_para_simulacao" > .env
git add .env -f
git commit -m "test: simula segredo exposto"
git push -u origin simulacao/segredo-exposto
```

Depois, abra um Pull Request para `main`.

A etapa **Verificar exposição de arquivos sensíveis** deve falhar.

Para corrigir:

```bash
rm .env
git add .
git commit -m "fix: remove arquivo sensivel da simulacao"
git push
```

---

## Evidências

As evidências devem ser salvas em:

```text
docs/evidencias/
```

Sugestões:

- `pipeline-sucesso.png`
- `pipeline-falha.png`
- `trivy-log.txt`
- `artefato-trivy.png`
- `pull-request-aprovado.png`

---

## Relação com ODS

O projeto se relaciona principalmente com:

- ODS 9 - Indústria, Inovação e Infraestrutura;
- ODS 11 - Cidades e Comunidades Sustentáveis;
- ODS 13 - Ação Contra a Mudança Global do Clima.

A segurança cibernética fortalece a confiabilidade da solução, protegendo dados, APIs e serviços utilizados para análise climática e tomada de decisão.

---

## Estrutura do Repositório

```text
.github/
  workflows/
    security-scan.yml

src/
  app.js
  server.js

tests/
  app.test.js

scripts/
  check-secrets.sh

security/
  pipeline-policy.yml

docs/
  diagramas/
  evidencias/
  relatorio/
  simulacao/

.env.example
.gitignore
Dockerfile
README.md
PASSO_A_PASSO_GITHUB.md
```

---

## Conclusão

Este repositório demonstra uma implementação prática de DevSecOps aplicada a uma solução baseada no ecossistema espacial.

A entrega contempla mapeamento de riscos, controles de segurança no pipeline, implementação prática automatizada e simulação de falha, atendendo aos principais pontos solicitados na Global Solution de Cybersecurity.
