# Global Solution 2026 - Cybersecurity

## Módulo DevSecOps aplicado ao projeto SpaceClimate

**Curso:** Engenharia de Software  
**Disciplina:** Cybersecurity  
**Professor:** MSc. Oerton Fernandes  
**Tema Integrador:** Segurança Cibernética em Soluções Baseadas no Ecossistema Espacial  

**Integrantes:**  
- Nome do integrante - RM  
- Nome do integrante - RM  
- Nome do integrante - RM  
- Nome do integrante - RM  
- Nome do integrante - RM  

**Repositório GitHub:** inserir link do repositório

---

## 1. Contexto do Projeto

O projeto SpaceClimate é uma API modelo baseada no ecossistema espacial. A solução simula o uso de dados de telemetria, clima e alertas ambientais, representando um sistema que poderia consumir informações orbitais e apoiar tomadas de decisão relacionadas a riscos climáticos.

Como esse tipo de aplicação pode utilizar APIs externas, tokens de acesso, infraestrutura em nuvem e dados sensíveis, foi criado um módulo DevSecOps para incluir segurança no ciclo de desenvolvimento.

O objetivo é demonstrar como práticas de segurança podem ser aplicadas desde o início do projeto, reduzindo riscos no pipeline e impedindo que falhas críticas sejam integradas à branch principal.

---

## 2. Mapeamento de Riscos no Pipeline

| Risco | Impacto no Projeto | Tema Relacionado | Controle Sugerido |
|---|---|---|---|
| Vazamento de tokens, chaves de API ou arquivo `.env` | Acesso indevido a APIs externas, dados climáticos ou serviços em nuvem | Gestão de Segredos | Uso de `.env.example`, GitHub Secrets e bloqueio de arquivos sensíveis no pipeline |
| Dependências vulneráveis | Exploração de falhas em bibliotecas utilizadas pela API | Ferramentas de Segurança CI/CD | Scan automatizado com Trivy no GitHub Actions |
| Configurações inseguras | Exposição desnecessária de serviços ou execução com padrões inseguros | Segurança como Código / Segurança em Contêineres | Análise de configuração e uso de Dockerfile com boas práticas |
| Permissões excessivas no pipeline | Ações automatizadas com acesso maior do que o necessário | Zero Trust | Definição de permissões mínimas no workflow |
| Falta de auditoria no processo de entrega | Falhas de segurança podem passar sem registro | Monitoria e Auditoria Contínua | Logs, artefatos e histórico de execução no GitHub Actions |

Os riscos mapeados mostram que o projeto precisa proteger tanto o código quanto o processo de entrega. Por isso, os controles foram aplicados diretamente no pipeline.

---

## 3. Controles de Segurança Escolhidos

### 3.1 Análise de Vulnerabilidades com Trivy

O Trivy foi utilizado no GitHub Actions para analisar o repositório em busca de vulnerabilidades, segredos e configurações inseguras.

O controle roda automaticamente em pushes, pull requests e execuções manuais. Caso o scan encontre vulnerabilidades altas ou críticas, o pipeline é interrompido pelo Security Gate.

### 3.2 Gestão de Segredos

O projeto utiliza `.env.example` apenas como modelo de configuração. Arquivos reais como `.env`, `.env.local` e `.env.production` não devem ser versionados.

Além disso, o script `scripts/check-secrets.sh` verifica automaticamente se um arquivo `.env` foi incluído no repositório. Caso isso aconteça, o pipeline falha antes das próximas etapas.

### 3.3 Zero Trust no Pipeline

O conceito de Zero Trust foi aplicado considerando que nenhuma alteração enviada ao repositório deve ser confiável automaticamente.

Antes de ser integrada à branch principal, a alteração precisa passar por testes, verificação de segredos e análise de vulnerabilidades. O workflow também utiliza permissões reduzidas, respeitando o princípio do menor privilégio.

---

## 4. Diagrama do Pipeline

```text
Desenvolvedor
     |
     v
Push ou Pull Request no GitHub
     |
     v
GitHub Actions
     |
     v
Checkout do Código
     |
     v
Verificação de Segredos
     |
     v
Testes Automatizados
     |
     v
Trivy Security Scan
     |
     v
Security Gate
     |
     +-----------------------------+
     |                             |
     v                             v
Sem falhas críticas         Falhas altas/críticas
Merge permitido             Pipeline bloqueado
```

O pipeline funciona como uma barreira de segurança, impedindo que alterações com riscos graves avancem para a branch principal.

---

## 5. Implementação Prática

A implementação prática escolhida foi a criação de uma checagem automatizada no pipeline usando GitHub Actions, Trivy e um script de bloqueio de segredos.

O arquivo principal está em:

`.github/workflows/security-scan.yml`

Esse workflow executa:

1. Checkout do repositório;
2. Configuração do Node.js;
3. Verificação de arquivos sensíveis;
4. Instalação de dependências;
5. Execução de testes;
6. Scan com Trivy;
7. Geração de artefato com relatório;
8. Bloqueio em caso de vulnerabilidades altas ou críticas.

Também foi criado o script:

`scripts/check-secrets.sh`

Trecho principal:

```bash
ENV_FILES=$(find . -type f -name ".env" -not -path "./.git/*" || true)

if [ -n "$ENV_FILES" ]; then
  echo "::error::Arquivo .env encontrado no repositório."
  exit 1
fi
```

As evidências foram registradas na pasta `docs/evidencias`, incluindo prints do pipeline, falha simulada e relatório do Trivy.

---

## 6. Mini Simulação do Pipeline

Foi realizada uma simulação de falha envolvendo a exposição de um arquivo `.env`.

### Problema

Foi criada uma branch de teste com um arquivo `.env` falso, representando o risco de vazamento de segredos.

### Controle que Detectou

O controle responsável pela detecção foi o script `check-secrets.sh`, executado pelo GitHub Actions.

### Ação Tomada

O pipeline identificou o arquivo `.env`, exibiu uma mensagem de erro e interrompeu a execução.

Após a remoção do arquivo sensível, o pipeline foi executado novamente e aprovado.

---

## 7. Conexão com os ODS

O projeto se conecta principalmente com:

- ODS 9 - Indústria, Inovação e Infraestrutura;
- ODS 11 - Cidades e Comunidades Sustentáveis;
- ODS 13 - Ação Contra a Mudança Global do Clima.

A segurança cibernética contribui para aumentar a confiabilidade da solução, protegendo APIs, dados e integrações utilizadas para análise climática e tomada de decisão.

---

## 8. Conclusão

A integração do módulo DevSecOps ao projeto SpaceClimate demonstra a aplicação prática de segurança desde o início do desenvolvimento.

Com GitHub Actions, Trivy, verificação de segredos, testes automatizados e permissões reduzidas, a solução passa a ter um processo de entrega mais seguro e auditável.

A entrega atende aos requisitos da Global Solution ao apresentar mapeamento de riscos, controles de segurança, implementação prática, simulação de pipeline e organização no GitHub.
