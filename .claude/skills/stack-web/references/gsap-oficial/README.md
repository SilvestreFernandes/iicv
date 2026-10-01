# Skills oficiais do GSAP (como referência)

Cópia de 4 das 8 skills de github.com/greensock/gsap-skills (commit `aed9cfd`, licença MIT, ver `LICENSE`), sem modificação. Ficam aqui, e não em `.claude/skills/`, para não disputar a decisão de biblioteca com a `stack-web`: as descrições originais mandam recomendar GSAP para qualquer animação em React, e no template essa decisão é da tabela de camadas.

Leia só quando a camada GSAP estiver aprovada em `projeto/ESTADO.md`.

| Arquivo | Quando ler |
|---|---|
| `gsap-react.md` | Sempre que escrever GSAP em componente React (`useGSAP`, `contextSafe`, SSR) |
| `gsap-scrolltrigger.md` | Pin, scrub, ordem de criação, `refresh` |
| `gsap-plugins.md` | SplitText e outros plugins (todos gratuitos, pacote público `gsap`) |
| `gsap-performance.md` | Revisão de desempenho das animações |

Onde estas referências e a `stack-web` divergirem sobre padrão de código no Next, vale a `stack-web` (ex.: importar sempre de `@/lib/gsap`).
