# Prompt — Portfólio "Bruna Rodriguez" (Produtora Audiovisual)

Você vai trabalhar num site de portfólio pessoal de uma one-page para **Bruna Rodriguez**, produtora audiovisual brasileira (São Paulo/Santos). Abaixo está a descrição completa do projeto: stack, estrutura, design, conteúdo e cada seção. Use isso como fonte de verdade para recriar, manter ou evoluir o site. Todo o conteúdo visível e os comentários do código são em **português (pt-BR)**.

---

## 1. Stack e configuração

- **Next.js 16.2.12** (App Router, pasta `app/` na raiz), **React 19.2.4**, **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, sem `tailwind.config` — tema definido em CSS com `@theme inline`)
- **framer-motion 12** para animações de entrada
- **lucide-react** para ícones (`Play`, `Trophy`)
- **ESLint 9** + `eslint-config-next`
- Fontes via `next/font/google`: **Fraunces** (serifada, pesos 400/500/600, variável `--font-serif`) para títulos/nome e **Inter** (sans, variável `--font-sans`) para o corpo
- Alias `@/*` → `src/*`
- Scripts: `dev`, `build`, `start`, `lint`
- `next.config.ts`: `images.remotePatterns` liberando `picsum.photos`, `i.vimeocdn.com` e `img.youtube.com` (thumbnails remotas com `next/image`)

## 2. Estrutura de pastas

```
app/
  layout.tsx        # <html lang="pt-BR">, fontes, Header + {children} + Footer, metadata
  page.tsx          # Home: monta as seções na ordem
  globals.css       # Tokens de cor, @theme, textura de grão
src/
  components/
    layout/   Header.tsx, Footer.tsx
    project/  VideoCard.tsx, VideoLightbox.tsx, WorkCard.tsx
    sections/ Hero, FeaturedVideos, Bio, AwardsWithTrailer, MyStory,
              BehindTheScenes, Brands, (legado: Awards, FeaturedWorks)
  data/       videos.ts, awards.ts, brands.ts, works.ts
  lib/        site.ts (PRODUCER_NAME), palette.ts (accentForIndex)
  types/      project.ts (Work, Award, Brand, FeaturedVideo)
public/
  images/     bruna-bio.jpeg, bruna-hero-pb.jpeg, bruna-hero.png
  logos/      15 logos de marcas (png/jpg/svg)
  video/      video-prod.mp4 (vídeo vertical do banner)
```

Princípio de arquitetura: **conteúdo separado da apresentação**. Todo dado (vídeos, prêmios, marcas, trabalhos) fica em `src/data/*.ts`, tipado por `src/types/project.ts`; as seções só consomem. O nome da produtora é centralizado em `src/lib/site.ts` (`PRODUCER_NAME = "Bruna Rodriguez"`). A home (`app/page.tsx`) é um Server Component que apenas empilha as seções; as seções com animação/estado são `"use client"`.

## 3. Design system

**Estética:** editorial, limpa, minimalista, fundo branco com textura de grão sutil, tipografia serifada elegante nos títulos, um único azul como cor de destaque. Sem rosa (foi removido). Sem modo escuro.

**Tokens (`app/globals.css`):**
- `--background: #ffffff`, `--foreground: #0a0a0a`, `--muted: #6b6b6b`
- `--accent-blue: #2563eb` (azul Tailwind 600), `--accent: var(--accent-blue)`
- Expostos no Tailwind como `bg-background`, `text-foreground`, `text-muted`, `text-accent`, `bg-accent-blue`, `font-serif`, `font-sans`
- `body::before`: overlay fixo de ruído (SVG `feTurbulence` fractalNoise inline em data URI), `opacity: 0.035`, `mix-blend-mode: multiply`, `pointer-events: none` — tira a "frieza" do branco chapado

**`src/lib/palette.ts`:** `ACCENT_PALETTE` com uma variante azul (`solid`, `soft`, `border`, `tag`, `bar` em classes Tailwind) e `accentForIndex(i)` que alterna por índice (preparado para mais cores no futuro).

**Padrão de cabeçalho de seção (repetido em todas):**
- Eyebrow: `text-xs font-medium uppercase tracking-widest text-accent` (ex.: "Sobre", "Reconhecimento")
- Título: `font-serif text-4xl sm:text-5xl font-medium tracking-tight`

**Padrão de container:** `mx-auto w-full max-w-6xl px-6 sm:px-16 py-8 sm:py-14` (algumas usam `sm:px-12`). O `sm:px-16` é proposital para alinhar com o nome no Header.

**Padrão de animação (framer-motion):** entrada `initial={{opacity:0, y:16–24}}` → `whileInView={{opacity:1, y:0}}`, `viewport={{ once: true, amount: 0.2 }}`, `duration 0.5–0.6`, `ease "easeOut"`. Grids usam variants `container`/`item` com `staggerChildren` (0.06–0.12) para efeito cascata.

**Hover:** thumbnails com `group-hover:scale-105` (`duration-500`); logos sobem `hover:-translate-y-1`; link de contato muda para azul.

**Responsivo:** mobile-first; grids de 1 coluna viram 2/3/5 colunas em `sm`/`lg`.

## 4. Tipos (`src/types/project.ts`)

```ts
interface Work { id; title; client; role; year?; videoSrc?; videoEmbedUrl?; thumbnailUrl; featured? }
interface Award { id; title; project; year? }
interface Brand { id; name; logoSrc; logoScale?; clipPath? }   // logoScale = zoom individual do logo
interface FeaturedVideo { id; title; badge?; embedUrl; thumbnailUrl } // embedUrl SEM ?autoplay
```

## 5. Componentes reutilizáveis

- **`VideoCard`** (client): o card inteiro é um `motion.button`. Thumbnail `aspect-[6/5]` com `next/image` `fill`, `object-cover`, fundo preto; botão de play circular branco (56px, `bg-white/90`, ícone `Play` preenchido) sempre visível no centro. Abaixo: badge do cliente (`text-xs font-semibold uppercase text-accent`, opcional) e título (`font-serif text-lg`). Prop `onOpen(video)`.
- **`VideoLightbox`** (client): modal fixo em tela cheia (`z-50`, `bg-black/90`), caixa `aspect-video max-w-4xl rounded-lg` com `<iframe src={embedUrl + "?autoplay=1"}>` (allow autoplay/fullscreen/pip/encrypted-media). Fecha com **Esc**, clique no fundo ou botão "×" (`aria-label="Fechar"`); clique dentro do vídeo faz `stopPropagation`. Animação fade + scale 0.94→1 (0.25s). Renderizado condicionalmente pelas seções (`activeVideo && <VideoLightbox/>`).
- **`WorkCard`** (legado, usado só por `FeaturedWorks`): variantes `large` (aspect-video, borda azul, badge do papel sobreposto) e `compact` (aspect-[4/3], play aparece só no hover, papel como texto azul).

## 6. Layout global

- **Header** (`sticky top-0 z-50`, `bg-background/80 backdrop-blur-md`, borda inferior `border-black/5`): à esquerda o nome em `text-xs uppercase tracking-[0.2em]`; à direita link "Contato" (`mailto:brunarodriguez_@hotmail.com`), cinza → azul no hover. Padding `px-6 sm:px-16`.
- **Footer** (borda superior): nome em serif, `brunarodriguez_@hotmail.com · @brurodriguezz`, `+55 (13) 99116-4282`, e "© {ano atual} Bruna Rodriguez. Todos os direitos reservados." (ano calculado com `new Date().getFullYear()`).
- **Metadata:** title "Portfólio | Produtora Audiovisual"; description "Portfólio de produção audiovisual: vídeos institucionais, documentários e conteúdo para marcas." (marcados como placeholder).

## 7. Seções da home (nesta ordem)

### 7.1 Hero
Banner full-bleed `min-h-[480px]`, fundo preto. Vídeo `/video/video-prod.mp4` em `autoPlay muted loop playsInline`, **sem controles** (pedido da cliente), `object-cover`, filtro **preto e branco** (`grayscale contrast-[1.08]`). Gradiente `from-black/5 via-transparent to-black/75`. Entrada: fade + scale 0.98→1 em 1.2s. Nome em `<h1>` no canto inferior esquerdo, branco, `font-serif font-semibold`, `text-[clamp(40px,6vw,80px)]`, quebrado em duas linhas: "Bruna" / "Rodriguez" (split de `PRODUCER_NAME`).

### 7.2 FeaturedVideos — `id="trabalhos"`
Cabeçalho centralizado: eyebrow "Vídeos em Destaque", título "Trabalhos com Grandes Marcas". Grid **full-bleed** (sem max-width) 1 → 3 colunas, `gap-4`, com `VideoCard`s e lightbox. Vídeos (YouTube, thumbnails `img.youtube.com/vi/{id}/hqdefault.jpg`):
1. Hospital Albert Einstein — "Retratos de Uma Pandemia | Trailer" — `qDrJCRrSQjE`
2. Mondial — "Mondial | Facilite sua rotina com o Mixer Turbo Inox" — `uDZPWJv9q5E`
3. Copag — "Copag | Dia do Trabalho" — `fC03EYfRzi8`

### 7.3 Bio — "Sobre mim"
Grid 2 colunas no desktop: foto à esquerda (`/images/bruna-bio.jpeg`, `aspect-[3/4] rounded-2xl`), texto à direita. No mobile o texto vem primeiro e a foto depois (`order-*`). Eyebrow "Sobre", título "Sobre mim". Texto (`text-lg text-muted`), com nomes de marcas em **negrito** (sem cor, via helper `<Brand>`):

> Com mais de 10 anos de estrada na produção audiovisual, já passei por praticamente todas as etapas de um set: produção, coordenação e direção de produção, produção executiva e assistência de direção. Esse trânsito entre funções resultou em projetos para marcas como **Starbucks**, **Disney**, **Natura**, **Copag**, **Mary Kay** e **Hospital Albert Einstein**, além de dois filmes autorais premiados internacionalmente.
>
> Formada em Cinema e Audiovisual, atualmente curso pós-graduação em Produção Audiovisual Multiplataforma.

Selos (pílulas com contorno azul `border-accent-blue/60`, fundo branco, texto azul uppercase — discretos, não parecem botões): "10+ anos de experiência", "2 filmes premiados", "20+ marcas atendidas".

### 7.4 AwardsWithTrailer — "Prêmios e Reconhecimentos"
Grid `lg:grid-cols-[1.1fr_0.9fr]`. **Esquerda:** eyebrow "Reconhecimento", título, lista editorial (sem cards: cada item separado por `border-t border-black/8`, `py-5`), com "🏆 " + título em serif, projeto em cinza e ano em azul. Stagger 0.08. **Direita:** card do trailer de "Demônio de Maxwell" (Vimeo `257190582`), imagem com `opacity-75` sobre fundo escuro e play de 60px; no desktop a imagem usa `flex-1` para **esticar até a altura da lista**; no mobile usa `aspect-[3/4]` (senão colapsa para 0px). Abaixo: "Trailer" (azul) e "Demônio de Maxwell" (serif). Abre no lightbox.

Prêmios:
| Prêmio | Projeto | Ano |
|---|---|---|
| The Gold Movie Award – Melhor Filme | O Demônio de Maxwell | 2017 |
| Los Angeles Film Awards – Melhor Filme Indie | O Demônio de Maxwell | 2017 |
| Dada Saheb Phalke Film Festival – Melhor curta-metragem | O Demônio de Maxwell | 2017 |
| Santos Film Festival – Melhor Filme Documentário | Pink Panther | 2018 |
| Reconhecimento Guia do Estudante – canal mais inovador | Canal Sistema Anglo de Ensino | 2020 |

### 7.5 MyStory — "Minha História"
Grid 2 colunas, `items-start` (importante: centralizar causaria sobreposição com a seção seguinte). Desktop: foto P&B (`/images/bruna-hero-pb.jpeg`, `aspect-[3/4] rounded-2xl`) à esquerda com **`sticky top-24`** acompanhando o scroll; texto à direita. Eyebrow "Trajetória", título "Minha História", 3 parágrafos `text-[15px] text-muted`:

1. Produtora audiovisual e de eventos — MKT Virtual/ Mokotó Filmes. Responsável por coordenar todas as produções da empresa, entre suas funções estão produção de base e set, alimentação, objetos, figurino e elenco. Sua principal função é dar vida a todas as ideias, pautas e briefings, cuidando de toda equipe, fornecedores, logística e qualquer item necessário para que o produto audiovisual seja materializado com sucesso entre a pré, a pós e durante a produção.
2. É responsável pela elaboração de parte dos orçamentos da casa e de todas as programações de pagamentos. Em alguns vídeos atua como diretora de cena (especialmente os com entrevistas), assistente de direção e produção executiva. Participa das reuniões de criação, briefing e organização, e atua na tratativa direta com clientes como Copag, Mary Kay, Estrella Galicia, Natura, Hospital Albert Einstein, Santa Helena, Galápagos, Sistema Anglo de Ensino, Aunt Jackie's, entre muitas outras.
3. Realizou dois filmes autorais premiados: "Os Demônios de Maxwell", em coparceria com o cineasta de Los Angeles Marcos Vaz, e o documentário "Pink Panther", contemplado no 6º FACULT da cidade de Santos (Setembro 2016 / Outubro 2023).

### 7.6 BehindTheScenes — "Direção de Cena e Depoimentos"
Mesmo card de vídeo da 7.2, mas **contido em `max-w-6xl`** (diferença intencional) e `gap-2`. Eyebrow "Bastidores". Vídeos (YouTube):
1. Hospital Albert Einstein — "Nossa história: Hospital Israelita Albert Einstein" — `rlAmbwA6nfU`
2. C&A — "Curadoria Inclusiva – Costurando vivências para desenhar novos futuros | Episódio 1" — `oV7XwlCkDps`
3. Anglo Sistema de Ensino — "RECONHECIMENTO FACIAL: controle ou segurança? | Caverna do Leão - EP. 36" — `eAvWDtT2G-8`

### 7.7 Brands — "Marcas com quem já trabalhei"
Única seção com **fundo escuro** (`bg-foreground`, full-width). Barrinha azul decorativa (`h-1.5 w-12 rounded-full`), eyebrow "Trajetória" azul, título branco. Grid 2 → 3 → 5 colunas; cada logo num cartão branco `h-24 sm:h-28 rounded-xl p-6 shadow-md` com `next/image fill object-contain`, `transform: scale(logoScale)` e `clipPath` opcional. Stagger 0.06.

Marcas (arquivo em `/logos/`, escala): Copag (`copag.png`), Mary Kay (`mary-kay.png`, 1.3), Estrella Galicia (`estrella-galicia.png`, 1.3), Natura (`natura.png`), Hospital Albert Einstein (`hospital-albert-einstein.png`, 1.45), Santa Helena (`santa-helena.png`), Galápagos (`galapagos.svg`), Sistema Anglo de Ensino (`anglo-logo.png`, 1.25), Aunt Jackie's (`aunt-jackies.png`), Starbucks (`starbucks.png`), Disney (`disney.png`), Hotel Emiliano (`hotel-emiliano.png`), Oggi Sorvetes (`oggi-sorvetes.jpg`, 1.3), PremieR Pet (`premier-pet.png`), Bitso (`bitso.png`, 1.4).

## 8. Código legado (mantido, fora da home)

- **`Awards.tsx`**: versão anterior dos prêmios em grid de cards com ícone `Trophy` e fundo `accent.soft`. Substituída por `AwardsWithTrailer`.
- **`FeaturedWorks.tsx`** + **`WorkCard.tsx`** + **`data/works.ts`**: portfólio "clássico" com cliente/papel/ano (2 trabalhos `featured` em cards grandes + grade compacta). Substituído por `FeaturedVideos` + `BehindTheScenes`. Trabalhos (todos Vimeo): Demônio de Maxwell | Trailer (Mokotó Filmes, 2017), Danki Curaçao (Curaçao Tourist Board, 2017), Positivo | Dia das Mães 2018, Positivo | Manifesto Democracia Digital, Copag | Dia do Baralho 2015/2016/2017, Estrella Galicia 00 – Grafite em SP, Rosecler Costa | IronMãe – Manifesto, Sorali Cosmetic | Institucional, Mary Kay | Você Expert em Fragrâncias — cada um com o papel exercido (coordenação de produção, produção de set, locação, casting, figurino etc.).

## 9. Convenções a seguir

- Comentários em português, explicando o **porquê** das decisões de layout (alinhamentos, `order`, `sticky`, `items-start`, aspect-ratios).
- Novo conteúdo = editar só `src/data/*.ts` (adicionar objeto no array). `embedUrl` sempre sem parâmetros.
- Novas seções seguem o padrão de eyebrow + título serif, container `max-w-6xl`, animação `whileInView once`.
- Cor de destaque só o azul `#2563eb`; destaques em texto corrido usam negrito, não cor.
- Imagens sempre via `next/image` (com `sizes`); domínios remotos precisam estar em `next.config.ts`.
- Cards clicáveis são `<button type="button">` inteiros; vídeos abrem no `VideoLightbox`.

## 10. Pendências conhecidas

- Metadata (title/description) ainda marcada como placeholder.
- Comentários "PLACEHOLDER" em Header/Footer sobre contatos (os dados atuais parecem reais: e-mail, Instagram @brurodriguezz e telefone).
- `public/images/bruna-hero.png` e o domínio `picsum.photos` não são mais usados.
- Comentário em `MyStory.tsx` diz "texto à esquerda, foto à direita", mas com os `order` atuais o desktop mostra foto à esquerda e texto à direita.
- Sem SEO extra (Open Graph, sitemap), sem links de redes sociais clicáveis, página única sem rotas adicionais.
