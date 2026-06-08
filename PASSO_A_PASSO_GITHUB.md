# Passo a Passo - Subir o Projeto no GitHub

Este projeto já está pronto para subir no GitHub e executar o pipeline DevSecOps.

## 1. Baixar e extrair

1. Baixe o arquivo ZIP.
2. Extraia a pasta `gs-cybersecurity-spaceclimate`.
3. Abra a pasta no VS Code ou terminal.

## 2. Testar localmente

Entre na pasta do projeto:

```bash
cd gs-cybersecurity-spaceclimate
```

Instale as dependências:

```bash
npm install
```

Rode os testes:

```bash
npm test
```

Rode a API:

```bash
npm start
```

Acesse:

```text
http://localhost:3000/health
```

## 3. Criar repositório no GitHub

Sugestão de nome:

```text
gs-cybersecurity-spaceclimate
```

No GitHub:

1. Clique em `New repository`.
2. Nomeie como `gs-cybersecurity-spaceclimate`.
3. Deixe público ou privado conforme orientação do professor.
4. Não precisa criar README, porque o projeto já possui um.
5. Crie o repositório.

## 4. Subir usando terminal

Dentro da pasta do projeto:

```bash
git init
git branch -M main
git add .
git commit -m "feat: cria projeto SpaceClimate com modulo DevSecOps"
git remote add origin https://github.com/SEU_USUARIO/gs-cybersecurity-spaceclimate.git
git push -u origin main
```

Troque `SEU_USUARIO` pelo seu usuário do GitHub.

## 5. Conferir o GitHub Actions

Após o push:

1. Entre no repositório no GitHub.
2. Clique em `Actions`.
3. Abra o workflow `DevSecOps Security Pipeline`.
4. Aguarde a execução.

Se tudo estiver certo, o pipeline deve passar.

## 6. Tirar prints de sucesso

Tire prints de:

1. Aba `Actions` mostrando o workflow;
2. Pipeline com sucesso;
3. Etapa `Verificar exposição de arquivos sensíveis`;
4. Etapa do Trivy;
5. Artefato `trivy-security-report`;
6. Estrutura de arquivos do repositório.

Salve os prints em:

```text
docs/evidencias/
```

Depois faça commit dos prints:

```bash
git add docs/evidencias
git commit -m "docs: adiciona evidencias do pipeline"
git push
```

## 7. Simulação de falha

A simulação recomendada é criar uma branch com um arquivo `.env` falso.

Nunca coloque senhas reais.

```bash
git checkout -b simulacao/segredo-exposto
echo "SPACE_DATA_PROVIDER_TOKEN=token_falso_para_simulacao" > .env
git add .env -f
git commit -m "test: simula segredo exposto"
git push -u origin simulacao/segredo-exposto
```

Depois:

1. Abra o GitHub.
2. Crie um Pull Request da branch `simulacao/segredo-exposto` para a branch `main`.
3. Espere o GitHub Actions rodar.
4. O pipeline deve falhar na etapa de segredos.
5. Tire print da falha.
6. Salve como `docs/evidencias/pipeline-falha.png`.

## 8. Corrigir a simulação

No terminal:

```bash
rm .env
git add .
git commit -m "fix: remove arquivo sensivel da simulacao"
git push
```

O pipeline deve rodar novamente e passar.

## 9. Atualizar o relatório técnico

Abra:

```text
docs/relatorio/RELATORIO_TECNICO_MODELO.md
```

Substitua:

- Nomes dos integrantes;
- RMs;
- Prints/evidências;
- Link do repositório;
- Detalhes específicos do grupo.

Depois transforme em PDF de até 6 páginas.

## 10. Entrega final

A entrega final deve conter:

1. PDF técnico de até 6 páginas;
2. Link do repositório no GitHub.

O repositório deve conter:

- Código da API modelo;
- Workflow YAML;
- Script de segurança;
- README;
- Evidências;
- Modelo do relatório;
- Simulação documentada.
