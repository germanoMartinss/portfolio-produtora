# Bruna Rodriguez — Portfólio de Produção Audiovisual

Site de página única com o portfólio de **Bruna Rodriguez**, produtora audiovisual com mais de 10 anos de set: vídeos para marcas (Hospital Albert Einstein, Copag, Mondial, C&A, Anglo…), prêmios, trajetória e as marcas atendidas. Visual editorial: preto, branco e um único azul de destaque (`#2563eb`), tipografia serifada e textura de grão.

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Estilo | Tailwind CSS v4 (tema em CSS com `@theme`, sem `tailwind.config`) |
| Animação | framer-motion 12 (só em componentes client pequenos) + CSS |
| Ícones | lucide-react |
| Fontes | Fraunces (títulos) e Inter (texto) via `next/font`, auto-hospedadas |
| Qualidade | ESLint 9 (`eslint-config-next`) |

## Como rodar

Requer Node 20+ (testado com Node 22).

```bash
npm ci            # instala as dependências exatas do package-lock
npm run dev       # desenvolvimento em http://localhost:3000
npm run lint      # ESLint
npm run build     # build de produção (também checa os tipos)
npm run start     # serve o build de produção
```

### Variável de ambiente

| Variável | Para quê | Padrão |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (canonical, Open Graph, sitemap, robots, JSON-LD) | `https://dominio-provisorio.example` (provisória) |

> ⚠️ **Antes de publicar**, defina `NEXT_PUBLIC_SITE_URL` com o domínio real (ex.: nas variáveis de ambiente da Vercel). Com o valor provisório, o canonical e a imagem de compartilhamento apontam para um domínio que não existe.

## Estrutura

```
app/
  layout.tsx            # <html lang="pt-BR">, fontes, metadata, Header/Footer, skip link
  page.tsx              # Home: JSON-LD + seções na ordem
  globals.css           # Tokens de cor, @theme, grão, foco visível, movimento reduzido
  opengraph-image.tsx   # Imagem de compartilhamento 1200x630 (gerada no build)
  twitter-image.tsx     # Mesma imagem para o X/Twitter
  icon.tsx, apple-icon.tsx  # Monograma "BR" (favicon e ícone do iOS)
  sitemap.ts, robots.ts
assets/fonts/           # Fraunces/Inter em .woff para as imagens geradas
public/
  images/               # Fotos da Bio, de Minha História e o pôster do Hero
  logos/                # Logos das marcas
  video/video-prod.mp4  # Vídeo do topo
src/
  components/
    layout/             # Header, Footer
    sections/           # Uma seção da home por arquivo (Server Components)
    project/            # Ilhas client: VideoGallery, VideoCard, TrailerCard, VideoLightbox
    motion/             # Wrappers de animação (Reveal, RevealGroup, RevealItem) e MotionProvider
    seo/                # PersonJsonLd
  data/                 # CONTEÚDO: videos.ts, awards.ts, brands.ts
  lib/                  # site.ts (nome, URL, textos, contatos), monogram.tsx
  types/                # Tipos dos dados
```

**Regra principal:** conteúdo fica em `src/data/` e `src/lib/site.ts`; os componentes só leem esses dados. Na maioria das atualizações não é preciso mexer em componente nenhum.

## Manutenção passo a passo

### Adicionar um vídeo

1. Pegue o ID do vídeo no YouTube: em `https://www.youtube.com/watch?v=qDrJCRrSQjE`, o ID é `qDrJCRrSQjE`.
2. Abra `src/data/videos.ts` e escolha a lista:
   - `featuredVideos` → seção "Vídeos em Destaque";
   - `behindTheScenesVideos` → seção "Direção de Cena e Depoimentos".
3. Adicione um objeto trocando `ID` pelo ID do vídeo:

   ```ts
   {
     id: "marca-nome-do-video",          // único, sem espaços
     title: "Marca | Título do vídeo",
     badge: "Marca",                      // opcional: aparece em azul acima do título
     embedUrl: "https://www.youtube-nocookie.com/embed/ID",
     thumbnailUrl: "https://img.youtube.com/vi/ID/hqdefault.jpg",
   },
   ```

4. Use sempre `youtube-nocookie.com` e **não** coloque `?autoplay=1`: o modal acrescenta sozinho.
5. Para Vimeo: `embedUrl: "https://player.vimeo.com/video/NUMERO?dnt=1"`. A thumbnail fica em `i.vimeocdn.com`; copie a URL da imagem de capa do vídeo.
6. Os grids têm 3 colunas no desktop; prefira múltiplos de 3.
7. Rode `npm run build` para conferir.

### Adicionar um prêmio

Em `src/data/awards.ts`, acrescente:

```ts
{ id: "festival-ano", title: "Nome do Festival – Categoria", project: "Nome do filme", year: "2025" },
```

O prêmio aparece na lista da home **e** entra automaticamente no JSON-LD (dados estruturados para o Google).

### Adicionar uma marca

1. Salve o logo em `public/logos/` (PNG com fundo transparente ou SVG; nome em minúsculas com hífens, ex.: `minha-marca.png`).
2. Em `src/data/brands.ts`, acrescente:

   ```ts
   { id: "minha-marca", name: "Minha Marca", logoSrc: "/logos/minha-marca.png" },
   ```

3. Se o logo ficar pequeno no cartão (arquivo com muita borda vazia), use `logoScale: 1.3` (valores típicos entre 1.2 e 1.45).
4. O `name` é o texto alternativo da imagem, então escreva o nome da marca como ela se apresenta.

### Trocar textos e contatos

- Nome, URL do site, título/descrição para o Google e contatos: `src/lib/site.ts`.
- Texto de "Sobre mim" e os selos: `src/components/sections/Bio.tsx`.
- Texto de "Minha História": `src/components/sections/MyStory.tsx`.

### Trocar o vídeo do topo

O vídeo é mudo, roda em loop e é exibido em preto e branco por CSS. Para manter o site leve, re-encode antes de substituir (H.264, sem áudio, *faststart*) e gere de novo o pôster (o primeiro quadro):

```bash
ffmpeg -i novo.mp4 -an -c:v libx264 -profile:v high -preset veryslow -crf 23 \
  -pix_fmt yuv420p -movflags +faststart public/video/video-prod.mp4
ffmpeg -i public/video/video-prod.mp4 -frames:v 1 -q:v 3 public/images/hero-poster.jpg
```

## Decisões técnicas

- **Server Components por padrão, client só em "ilhas".** As seções são renderizadas no servidor. Só têm `"use client"` os wrappers de animação (`components/motion`) e o que tem estado (grid de vídeos, trailer, modal, vídeo do Hero). O framer-motion não força a seção inteira a ser client: o wrapper recebe `children`.
- **Vídeos externos sem iframe na carga.** A home mostra só thumbnails otimizadas; o iframe do YouTube/Vimeo é criado ao clicar, já no modal. YouTube via `youtube-nocookie.com` e Vimeo com `dnt=1`.
- **Hero leve e rápido.** Vídeo re-encodado (3,18 MB → 1,34 MB), primeiro quadro como pôster com `preload` do `next/image` (no Next 16, `preload` substitui o antigo `priority`) e animação de entrada em CSS, que não espera a hidratação do JS.
- **Modal acessível sem biblioteca.** `role="dialog"`, `aria-modal`, portal no `body` com o resto da página `inert`, foco preso com sentinelas (o iframe é de outra origem, então não dá para interceptar o Tab dentro dele) e foco devolvido ao card.
- **Cards com título em `<h3>`.** Heading não pode ficar dentro de `<button>`, então o botão fica dentro do título e se estica sobre o card com `after:absolute after:inset-0`. O clique continua funcionando no card inteiro.
- **Movimento reduzido respeitado** em três lugares: regra CSS, `MotionConfig reducedMotion="user"` e vídeo do Hero pausado.
- **CSS global sempre em `@layer base`.** No Tailwind v4, CSS fora de camada vence os utilitários.
- **Imagens de compartilhamento e ícones gerados no build** (`next/og`), com as mesmas fontes do site, então mudar o nome em `site.ts` atualiza tudo. A imagem de Open Graph é convertida de PNG para JPEG *baseline* com `sharp` (~95 KB), porque o WhatsApp ignora prévias acima de ~300 KB.

## Problemas encontrados e como foram resolvidos

| Problema | Causa | Solução |
| --- | --- | --- |
| Vulnerabilidade **crítica** no Next 16.2.12 (RCE no otimizador de imagens, usado pelo site) | Versão fixada exata no `package.json`; o `npm audit fix` só resolveria com `--force` (para a 16.4.2, lançada no mesmo dia) | Atualização explícita para a 16.3.8, a menor versão corrigida, com ~2 semanas de lançamento. `npm audit --omit=dev`: 0 vulnerabilidades |
| Regra `body { background; color }` anulava as classes do Tailwind no `<body>` | CSS fora de `@layer` tem prioridade sobre `@layer utilities` no Tailwind v4 | Regras globais movidas para `@layer base` |
| Seções inteiras rodando no navegador só por causa de animação | `motion.div` direto na seção obrigava `"use client"` | Wrappers `Reveal`/`RevealGroup`/`RevealItem`; JS da home 196 → 180 KB |
| LCP alto no celular (2,8 s em 4G lento) | Hero começava com `opacity:0` no HTML e só aparecia após o JS hidratar; o vídeo de 3,2 MB era o elemento LCP | Pôster com preload, animação em CSS, vídeo 58% menor: LCP 1,1 s |
| Vídeo do Hero com faixa de áudio | Arquivo original exportado com áudio, mas sempre tocado mudo | Faixa removida no re-encode |
| Títulos dos vídeos não eram headings; modal sem semântica de diálogo | `<p>` dentro de `<button>`; modal sem `role`/foco | Ver "Decisões técnicas" |
| Foco "escapava" do modal pelo iframe | Tab dentro de iframe de outra origem não pode ser interceptado | Página de fundo `inert` + sentinelas de foco |
| Nome no `<h1>` lido como "BrunaRodriguez" | `<br />` sem espaço entre as palavras | Espaço antes do `<br />` |
| Favicon era o triângulo da Vercel | Sobra do `create-next-app` | Monograma "BR" gerado no build |
| Prévia do link não aparecia no WhatsApp (funcionava no Facebook) | `ImageResponse` gera PNG: 393 KB com a foto, acima do limite de ~300 KB do WhatsApp | Conversão para JPEG baseline (qualidade 85) com `sharp`: 95 KB, SSIM 0,992. Sem a opção `mozjpeg`, que força JPEG progressivo |
| Rodapé com 6 pixels diferentes após centralizar contatos | Texto em vários nós muda o kerning na emenda | Uma string única |

### Como as mudanças foram verificadas

- **HTML:** o `index.html` do build foi comparado antes e depois de cada refatoração. Na Etapa 2 (Server Components) o diff foi vazio.
- **Regressão visual:** screenshots de página inteira (390 e 1440px) comparados pixel a pixel com o commit original. Única diferença: as thumbnails de "Bastidores", agora baixadas no tamanho certo (0,009% dos pixels).
- **Métricas:** Chrome *headless* no build de produção, cache desligado, 3 a 5 execuções por cenário.

| Métrica (390px) | Antes | Depois |
| --- | --- | --- |
| Peso total transferido | 3.532 KB | 1.707 KB |
| Vídeo do Hero | 3.180 KB | 1.339 KB |
| JavaScript | 196 KB | 180 KB |
| LCP (4G lento + CPU 4x) | 2.776 ms | 1.088 ms |
| iframes na carga | 0 | 0 |

### Teste manual de teclado

1. `npm run build && npm run start` e abra `http://localhost:3000`.
2. Clique na barra de endereço e aperte **Tab**: deve aparecer "Pular para o conteúdo" no canto superior esquerdo.
3. Continue com **Tab**: Contato → 3 vídeos em destaque → trailer → 3 vídeos de bastidores, sempre com contorno azul visível.
4. Em um vídeo, aperte **Enter**: o modal abre com o foco no **×**.
5. **Tab**/**Shift+Tab** circulam entre o × e o player, sem sair do modal; a página de fundo não rola.
6. **Esc** fecha, e o foco volta ao card que abriu o vídeo.
7. Movimento reduzido: no Chrome, DevTools → ⋮ → *More tools* → *Rendering* → *Emulate CSS prefers-reduced-motion: reduce*, e recarregue. O vídeo do topo fica parado.

### Responsividade

Testado em 320, 360, 375, 390, 414, 480, 640, 768, 820, 1024, 1180, 1280, 1366 e 1440px: sem rolagem horizontal e nenhum texto abaixo de 12px.

### Dependências

`npm audit --omit=dev` (produção): **0 vulnerabilidades**. Restam 5 alertas *high* **só de desenvolvimento**, na cadeia `braces → micromatch → fast-glob → @next/eslint-plugin-next`. Afetam apenas o ESLint local, nunca o site publicado. A única "correção" oferecida é `npm audit fix --force`, que rebaixaria o `eslint-config-next` para a v14, incompatível. Aguardar atualização do `eslint-config-next`.

## Próximos passos

- [ ] Comprar o domínio e definir `NEXT_PUBLIC_SITE_URL`.
- [ ] Confirmar e-mail, Instagram e telefone; tornar Instagram e telefone clicáveis (com aviso de "abre em nova aba").
- [ ] Contraste do eyebrow azul sobre o fundo preto em "Marcas" (3,8:1, abaixo do AA 4,5:1): usar um azul mais claro só nessa seção.
- [ ] Botão discreto de pausar o vídeo do topo (critério WCAG 2.2.2 para movimento automático com mais de 5 s).
- [ ] Validar o JSON-LD em validator.schema.org depois de publicar.
- [ ] Testes automatizados (Playwright) para o modal e a navegação por teclado.
- [ ] Atualizar o ESLint quando o `eslint-config-next` corrigir a cadeia vulnerável.
