# Gabriel Pimentel · Portfólio

Site pessoal publicado em **https://gabrielpimentel.pages.dev**, em português, inglês, espanhol e italiano.

Next.js 16 (export estático) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Cloudflare Pages.

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # gera a pasta out/ (HTML estático)
npm run images  # gera as cópias de 720px dos prints (rodar depois de trocar um print)
```

## Páginas

| Idioma | Início | Projeto |
|---|---|---|
| Português | `/` | `/projetos/<slug>` |
| Inglês | `/en` | `/en/projects/<slug>` |
| Espanhol | `/es` | `/es/proyectos/<slug>` |
| Italiano | `/it` | `/it/progetti/<slug>` |

Cada página é um HTML estático com `<html lang>`, canonical e `hreflang` próprios, e todas entram no
`sitemap.xml`. O português usa o layout raiz `src/app/(pt)/` e os outros idiomas `src/app/[lang]/`;
os dois usam `src/components/RootShell.tsx`.

## Onde fica cada coisa

```
src/
  app/
    (pt)/           layout raiz e páginas em português (sem prefixo na URL)
    [lang]/         layout raiz e páginas de /en, /es e /it
    sitemap.ts      todas as páginas com os idiomas alternativos
    global-not-found.tsx   página 404
  views/          HomePage e ProjectPage, usadas pelas rotas dos quatro idiomas
  data/           dados que não mudam com o idioma
    profile.ts      contatos, links e currículo por idioma
    projects.ts     projetos: slug, imagens, stack, link, cor de destaque
    career.ts       empresas e cargos (datas e tags), formação, cursos, grupos de skills
  i18n/
    locales/*.json  todos os textos; pt.json é a referência dos tipos
  lib/
    i18nPaths.ts    URLs por idioma e o script que leva para o idioma escolhido
    metadata.ts     títulos, descrições, canonical, hreflang e imagem de compartilhamento
  sections/       Hero, Projects, Experience, About, Education, Contact
  components/     Header, CommandPalette (Ctrl+K), SplashScreen, hero (nome e grade), projetos…
public/
  projects/       prints (1440×810 .webp) e as cópias -720.webp para celular
  og-image.png    imagem que aparece ao compartilhar o link (1200×630)
  curriculo*.pdf  currículo em pt, en, es e it
  robots.txt
docs/curriculo/   arquivos-fonte do currículo (.docx, um por idioma)
scripts/          resize-images.mjs (npm run images)
```

## Tarefas comuns

**Adicionar um projeto**

1. Coloque os prints em `public/projects/` (1440×810, `.webp`) e rode `npm run images`.
2. Adicione um item em `src/data/projects.ts`, com um `slug` para a página do projeto.
3. Adicione os textos com o mesmo `id` em `projects.items` dos quatro arquivos de `src/i18n/locales/`. O build falha se faltar algum idioma.

A página do projeto nos quatro idiomas e as entradas do sitemap saem sozinhas.

**Novo cargo:** adicione em `companies` (`src/data/career.ts`) e os textos em `experience.roles` dos quatro idiomas.

**Atualizar o currículo:** edite os `.docx` em `docs/curriculo/` (um por idioma: sem sufixo = português, `-en`, `-es`, `-it`), exporte em PDF e substitua `public/curriculo.pdf` (pt) e `public/curriculo-<idioma>.pdf`. O botão do site abre o PDF do idioma da página.

**Imagem de compartilhamento:** `public/og-image.png`, 1200×630.

## Comportamentos

- O idioma vem da URL. Quando a pessoa escolhe outro idioma, a escolha fica salva e as próximas visitas abrem direto nele. Sem escolha salva, ninguém é redirecionado (o Google sempre recebe a página que pediu); quem tem o navegador em outra língua vê um convite para trocar.
- O nome no topo muda de peso letra por letra conforme o cursor. Sem cursor por perto, e no celular, uma onda de peso percorre o nome.
- O splash aparece só na primeira visita da sessão e não aparece com "reduzir movimento" ligado.
- Links como `/#projetos` abrem direto na seção.
- No celular, os prints usam as cópias de 720px.
- Todas as animações respeitam a preferência de "reduzir movimento" do sistema.
- Visitas: Cloudflare Web Analytics, ativado no painel do Cloudflare Pages (o script é injetado no deploy).
