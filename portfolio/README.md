# Portfólio anti-repetição

Registro das decisões visuais de cada site entregue: conceito, fontes, paleta, estrutura, interação-assinatura. O pacote criativo (fase 2 do `/comecar`) lê este registro (sempre a versão mais nova, direto do repositório do template) para que um site novo não repita a mesma combinação.

## Como funciona

- **Um arquivo por site** em `portfolio/sites/<slug>.md`, no formato de `.claude/skills/comecar/modelos/portfolio-entrada.md`. Com um arquivo por site, dois projetos registrando ao mesmo tempo nunca editam o mesmo arquivo: não há conflito.
- **Entra por commit direto na `main`.** A fase 9 prepara a entrada. No modo de versionamento 1, o dev abre um link do GitHub que já traz o arquivo preenchido e só clica em "Commit changes"; nos modos 2 e 3, o Claude grava numa pasta de trabalho separada, faz commit com a identidade da empresa e push para a `main` deste repositório. Se a `main` tiver andado, faz `pull --rebase` e push de novo (sem conflito, pelo motivo acima).
- **Leitura sempre atualizada.** Cada projeto de site tem o remote `template` (configurado na fase 0); a fase 2 faz `git fetch template` e lê `template/main:portfolio/sites/`. Assim, um site criado em março enxerga o que o sócio entregou em abril.

## Por que aqui, e não em outro lugar

Cada site vira um repositório separado, e o template é o único repositório que todos os projetos conhecem. Guardar o portfólio nele não exige ferramenta nova (só git), fica versionado e todo mundo lê a mesma fonte.

## Escrever à mão

Se um site foi entregue fora do fluxo: copie o modelo para `portfolio/sites/<slug>.md`, preencha, faça commit (com a identidade da empresa) e push na `main`.
