# Gabriel Pimentel · Portfólio

Site pessoal em página única, publicado em **https://gabrielpimentel.pages.dev**.

Next.js 16 (export estático) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Cloudflare Pages.

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # gera a pasta out/ (HTML estático)
```

## Onde fica cada coisa

```
src/
  app/            layout (metadados, JSON-LD, script de idioma/splash), página, robots.txt, sitemap.xml
  data/           dados que não mudam com o idioma
    profile.ts      contatos, links e caminho do currículo
    projects.ts     projetos: imagens, stack, links, cor de destaque
    career.ts       empresas e cargos (datas e tags), formação, cursos, grupos de skills
  i18n/
    locales/*.json  todos os textos, em pt, en, es e it
    dictionaries.ts tipos e utilitários; pt.json é a referência dos tipos
    LanguageProvider.tsx
  sections/       Hero, Projects, Experience, About, Education, Contact
  components/     Header, CommandPalette (Ctrl+K), SplashScreen, projetos (card, moldura, modal)…
public/
  projects/       prints dos projetos (1440×810, webp)
  curriculo.pdf
docs/curriculo/   arquivo-fonte do currículo (.docx)
```

## Tarefas comuns

**Adicionar um projeto**

1. Coloque os prints em `public/projects/` (1440×810, `.webp`).
2. Adicione um item em `src/data/projects.ts`.
3. Adicione os textos com o mesmo `id` em `projects.items` dos quatro arquivos de `src/i18n/locales/`. O build falha se faltar algum idioma.

**Novo cargo:** adicione em `companies` (`src/data/career.ts`) e os textos em `experience.roles` dos quatro idiomas.

**Atualizar o currículo:** edite `docs/curriculo/curriculo-gabriel-pimentel.docx`, exporte em PDF e substitua `public/curriculo.pdf`.

## Comportamentos

- O splash aparece só na primeira visita da sessão e não aparece com "reduzir movimento" ligado.
- O idioma vem do que a pessoa escolheu antes ou do navegador. Um script no `<head>` aplica o idioma antes da primeira pintura.
- Links como `/#projetos` abrem direto na seção.
- Todas as animações respeitam a preferência de "reduzir movimento" do sistema.
