# Como evoluir o template

Toda mudança acontece neste repositório (`template_sites`), com commit na `main` feito com a identidade da empresa (conta única, ver README). Mudança grande pode ir numa branch local para testar antes, mas entra na `main` por merge local + push; não há PR. Depois do push, todo site novo já nasce com ela; sites em andamento puxam com o comando do README ("Atualizar o template").

Conferência da identidade neste repositório (uma vez por máquina):
```
git config --local user.name     # BrandForge
git config --local user.email    # brandforge.contato@gmail.com
git remote get-url origin        # https://brandforgecontato-oss@github.com/brandforgecontato-oss/template_sites.git
```

Antes de cada push, rode sempre:
```
npm install
npm run verificar
node .claude/skills/comecar/scripts/checar-ambiente.mjs
```

## Mudar o processo (fases, perguntas, regras)

- Cada fase é um arquivo em `.claude/skills/comecar/fases/`. Mude só o arquivo da fase; o `SKILL.md` do orquestrador só muda se a lista de fases ou as regras gerais mudarem.
- Mantenha cada arquivo curto: ele entra no contexto toda vez que a fase roda. Detalhe longo vai para `referencias/` e é citado pela fase.
- Mudou o formato de um arquivo de `projeto/`? Atualize o modelo em `modelos/` e as fases que o preenchem.

## Adicionar referência visual

Edite `referencias/sites.md`. Use somente sites que os sócios ou o cliente forneceram e siga as regras do topo do arquivo. Copie uma entrada existente e preencha nome, URL, nicho, se é referência principal, o que impressiona, técnica observada e ousadia. A referência principal do nicho deve aparecer em uma direção criativa. Na primeira análise, confira a página com Playwright em desktop e celular e troque `Técnica: a analisar` por uma observação concreta. Não acrescente listas de inspiração de terceiros nem recomende buscar referências fora do arquivo.

## Adicionar uma skill

1. **Leia a skill inteira antes**, inclusive scripts. Recuse o que baixa e executa coisas, lê credenciais ou envia dados para fora.
2. **Confira a licença.** MIT e Apache-2.0: copie o arquivo de licença junto (`LICENSE` ou `LICENSE.txt`). Sem licença: registre o que o autor declara e decida conscientemente.
3. Copie para `.claude/skills/<nome>/` (o nome da pasta vira o comando `/<nome>`). O `SKILL.md` precisa começar com frontmatter válido com `name` e `description`.
4. **Veja se ela conflita** com a tabela de precedência da `stack-web` ou se a descrição vai disparar no meio do fluxo. Se conflitar só no gatilho, prefira guardá-la como referência dentro da skill dona do assunto (como `stack-web/references/gsap-oficial/`).
5. Diga em qual fase ela entra (arquivo da fase e `referencias/trilhas.md`).
6. Registre em `.claude/skills/ATTRIBUTION.md`: origem, caminho, commit, licença, modificada ou não.
7. Anote no `CHANGELOG.md`.

## Atualizar uma skill de terceiros

```
git clone --depth 1 https://github.com/<dono>/<repo> /tmp/<repo>
```
Compare com a versão atual (`diff`), leia o que mudou, copie por cima, atualize o commit e a data em `ATTRIBUTION.md`. No Windows, se o clone falhar com "Filename too long", clone numa pasta de caminho curto (`C:\tmp\...`).

**Caso especial `web-design-guidelines`:** as regras ficam em `references/command.md`, cópia de
`https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`. Baixe o arquivo novo, leia o diff (são instruções que o Claude vai seguir) e atualize o commit citado no `SKILL.md` e no `ATTRIBUTION.md`.

## Remover uma skill

`git rm -r .claude/skills/<nome>` (e `.agents/skills/<nome>` — ou rode `npm run skills:sync` depois) e adicione uma linha em `ATTRIBUTION.md`, seção "Avaliadas e não incluídas", com o motivo. O histórico do git já preserva o conteúdo — não existe mais pasta `_arquivo/` para mover a skill para dentro; reativar é `git log -- .claude/skills/<nome>` e restaurar a versão antiga. Se a skill tinha um `LICENSE`/`LICENSE.txt` próprio, mencione na mesma linha. Procure referências quebradas:
```
grep -rn "<nome>" .claude CLAUDE.md README.md docs
```

## Mudar a stack

- A decisão de stack é da skill `stack-web`: atualize o `SKILL.md` (tabelas e versões) e a referência da camada.
- Versões: confira com `npm view <pacote> version` e na documentação oficial; nunca de memória.
- Scaffold: mude `package.json`, rode `npm install` do zero (`rm -rf node_modules package-lock.json`) e `npm run verificar`. A página inicial continua em branco e sem fonte, cor ou componente: visual não entra no template.
- Next.js: o `AGENTS.md` é regenerado pelo próprio `next dev`; mantenha-o commitado.
- Playwright MCP: a versão fica fixada no `package.json` (`@playwright/mcp`) e o `.mcp.json` roda `node node_modules/@playwright/mcp/cli.js`, igual no Windows e no macOS. Ao subir a versão, rode `npx playwright install chromium`.

## Atualizar o portfólio

- Caminho normal: a fase 6 de cada projeto envia `portfolio/sites/<slug>.md` para a `main` daqui (link do GitHub no modo 1; commit nos modos 2 e 3, com push sujeito à autorização). Um arquivo por site, então não há conflito entre projetos.
- À mão: copie `.claude/skills/comecar/modelos/portfolio-entrada.md` para `portfolio/sites/<slug>.md`, preencha, commit e push na `main`.
- Corrigir uma entrada: edite o arquivo do site, commit e push.
- Antes de push, `git pull --rebase origin main` se o outro sócio tiver enviado algo.

## Mudar o endereço do template

Se o repositório for renomeado, atualize a URL em `CLAUDE.md` (linha "Repositório do template") e em `.claude/skills/comecar/fases/00-ambiente.md` (comando do remote `template`), sempre no formato com o usuário da empresa: `https://brandforgecontato-oss@github.com/brandforgecontato-oss/<nome>.git`. Aqui: `git remote set-url origin <URL nova>`. Nos projetos existentes: `git remote set-url template <URL nova>`.
