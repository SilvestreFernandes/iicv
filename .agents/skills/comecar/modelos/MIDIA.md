# Plano de mídia — {{NOME DO NEGÓCIO}}

## Bloco de estilo compartilhado

{{Estilo, paleta, textura, luz, enquadramento, movimento/câmera e restrições comuns. Copiar este bloco para cada prompt.}}

**Regra do nicho:** {{não regulado · regulado: IA só gera textura, atmosfera ou objetos; sem pessoas/equipe/clientes, estabelecimento identificável ou resultado real}}

**Imagem de pessoa com IA:** {{autorizada em ESTADO.md · não autorizada — não gerar pessoa, usar textura/objeto · não se aplica}}

## Mídias planejadas

Preencha um bloco por arquivo ou variação, inclusive imagens/vídeos planejados além do hero. Todo prompt deve estar pronto para colar no Google Flow e repetir o bloco de estilo acima. Use 16:9 para hero desktop e 9:16 para mobile; informe duração/loop para vídeo e marque duração/câmera como não aplicável para imagem estática.

### {{Hero desktop · nome da mídia}}

- **Uso e composição:** {{local no site, enquadramento e área reservada ao texto}}
- **Tipo e formato:** {{vídeo · imagem}} · {{MP4 + WebM · JPG/AVIF}}
- **Proporção e duração:** {{16:9 · N segundos em loop sem áudio / proporção estática}}
- **Movimento de câmera:** {{movimento ou não se aplica}}
- **Prompt Google Flow (sem texto):**
  > {{bloco de estilo compartilhado}} {{cena e movimento específicos; instrução explícita para não inserir letras, logotipos ou marcas}}
- **Caminho do original/final:** `public/media/hero/hero-desktop.mp4` · `public/media/hero/hero-desktop.webm`
- **Poster:** `public/media/hero/hero-desktop-poster.jpg`
- **Reserva na página:** {{proporção e dimensões usadas enquanto não chega}}
- **Status:** {{pendente · recebida · processada}}

### {{Hero mobile · nome da mídia}}

- **Uso e composição:** {{corte vertical e área reservada ao texto}}
- **Tipo e formato:** {{vídeo · imagem}} · {{MP4 + WebM · JPG/AVIF}}
- **Proporção e duração:** {{9:16 · N segundos em loop sem áudio / proporção estática}}
- **Movimento de câmera:** {{movimento ou não se aplica}}
- **Prompt Google Flow (sem texto):**
  > {{bloco de estilo compartilhado}} {{cena vertical e movimento específicos; sem letras, logotipos ou marcas}}
- **Caminho do original/final:** `public/media/hero/hero-mobile.mp4` · `public/media/hero/hero-mobile.webm`
- **Poster:** `public/media/hero/hero-mobile-poster.jpg`
- **Reserva na página:** {{proporção e dimensões usadas enquanto não chega}}
- **Status:** {{pendente · recebida · processada}}

## Mídia do cliente

| Arquivo recebido | Uso | Tratamento | Destino no site | Status |
|---|---|---|---|---|
| {{arquivo}} | {{seção}} | {{recortar/comprimir/otimizar}} | `public/media/{{caminho}}` | {{recebida · processada}} |

Mídias pendentes do cliente: {{lista ou nenhuma}}. Para toda mídia pendente, mantenha a reserva de proporção/dimensões acima durante a construção e substitua o arquivo sem alterar a composição aprovada.
