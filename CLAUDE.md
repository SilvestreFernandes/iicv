# Site de cliente BrandForge

A BrandForge cria sites para clientes. Todo projeto novo começa neste template: cada cliente ganha um repositório próprio, criado com "Use this template", e o site é conduzido em fases, do briefing ao site no ar, pela skill `comecar`. O objetivo do template é entregar cada site com o máximo de eficiência, sem refazer a infraestrutura nem o processo a cada vez.

- **O site é do cliente, não da BrandForge.** Nome, marca, visual, textos e dados vêm do negócio do cliente (briefing em `projeto/`, dados em `lib/site.ts`). A BrandForge aparece só como a conta dona do repositório e do deploy.
- **Qual repositório é este:** se o remote `origin` aponta para `template_sites`, este é o próprio template. Aqui se muda o processo, as skills e o scaffold para todos os sites futuros (guia em `docs/EVOLUIR-TEMPLATE.md`), e nenhum site de cliente é construído. Em qualquer outro repositório, é o site de um cliente.

## Como trabalhar aqui

- Quando a pessoa disser **"vamos começar"**, "começar", "continuar", "onde paramos", "próxima fase" ou algo parecido, **invoque a skill `comecar`** antes de qualquer outra coisa. Ela lê `projeto/ESTADO.md` e retoma do ponto certo.
- Fluxo: **planejamento** (fases 0–2) → **portão** (fase 3, um único "pode construir") → **execução autônoma** (fase 4, construção + revisão sem perguntas) → **refinamento** (fase 5) → **entrega** (fase 6). Dúvidas autônomas ficam em `projeto/DECISOES.md`; execução encerra com `projeto/RELATORIO.md`.
- Pedido avulso fora do fluxo (corrigir um bug, trocar um texto): atenda, e registre em `projeto/ESTADO.md` se mudar alguma decisão aprovada.
- Nenhum código do site antes do "pode construir" do portão de planejamento (fase 3).
- Commit e push seguem o modo gravado em `projeto/ESTADO.md`. No modo 1, Claude nunca faz commit nem push. Push pede autorização no controle de permissões; exclusão de pastas e comandos destrutivos são bloqueados.
- Nunca invente dados do negócio; nunca faça push, deploy em produção ou mudança fora deste repositório sem ok explícito.

## Comunicação

O output style `Enxuto` está ligado por padrão em `.claude/settings.json`. Não narre antes de agir; progresso só nos marcos, em uma linha; fim de etapa em até 5 linhas; explique só quando houver decisão ou desvio; indique caminhos em vez de resumir arquivos; reúna perguntas com opções numeradas.
- Conflito entre skills: vale a tabela de precedência da skill `stack-web`.
- Os dados do negócio vivem só em `lib/site.ts`. O estado e as decisões vivem em `projeto/`.

## Referências

- Repositório do template (remote `template`, usado pelo portfólio e para puxar melhorias): https://brandforgecontato-oss@github.com/brandforgecontato-oss/template_sites.git
- Conta única: GitHub e Vercel só com a conta da empresa `brandforgecontato-oss`. Neste repositório o git usa `user.name` "BrandForge" e `user.email` "brandforge.contato@gmail.com" (config local, nunca global), e os remotes levam o usuário `brandforgecontato-oss` na URL. A fase 0 confere.
- Comandos: `npm run dev` · `npm run lint` · `npm run build` · `npm run verificar` (skills:sync + sintaxe dos scripts + lint + build) · `npm run skills:sync` (copia `.claude/skills` → `.agents/skills`)
- Origem e licença das skills: `.claude/skills/ATTRIBUTION.md`

@AGENTS.md
