# Revisão da execução autônoma — {{NOME DO NEGÓCIO}}

{{AAAA-MM-DD}} · fase 4. Preenchido durante a revisão autônoma, item por item, antes do `RELATORIO.md`.

## Revisor (`revisor`, só leitura)

| Item | Gravidade | Resultado | Ação |
|---|---|---|---|
| {{o que foi checado}} | {{crítica · alta · média · baixa}} | {{ok · corrigido · pendente humano}} | {{o que foi feito ou por que ficou pendente}} |

## Playwright — automáticas

| Checagem | 375px | 768px | 1920px |
|---|---|---|---|
| Imagens quebradas | {{ok}} | {{ok}} | {{ok}} |
| Scroll horizontal | {{ok}} | {{ok}} | {{ok}} |
| Um H1 | {{ok}} | — | — |
| Imagem sem alt | {{ok}} | — | — |
| Campo sem label | {{ok}} | — | — |
| Console sem erro | {{ok}} | — | — |
| Alvos de toque ≥ 44px | {{ok}} | — | — |
| Ordem de foco / teclado | {{ok}} | — | — |
| `prefers-reduced-motion` | {{ok}} | — | — |
| Hero sem JS | {{ok}} | — | — |

Screenshots relevantes em `projeto/referencias/`.

## Lighthouse (build de produção)

| Perfil | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Desktop | {{00}} | {{00}} | {{00}} | {{00}} |
| Mobile | {{00}} | {{00}} | {{00}} | {{00}} |

Abaixo de 85: investigado antes de seguir. {{nota ou —}}

## Segurança (`seguranca`, só leitura)

| Achado | Gravidade | Rota/integração | Ação |
|---|---|---|---|
| {{}} | {{crítica · alta · média · baixa}} | {{}} | {{corrigido · pendente humano}} |

**Trava:** {{sem item crítico · item crítico corrigido em DD/MM, relatório atualizado}}

## Checklist de entrega

Confira contra `referencias/checklist-entrega.md`: {{N ok · N corrigidos · N pendentes humanos}}, com a lista dos pendentes.

## Pendências não verificáveis nesta sessão

- {{item}} — motivo: {{sem acesso a X · depende de dado humano}} — responsável: {{cliente · dev}}
