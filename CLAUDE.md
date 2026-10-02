# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal blog/portfolio (himanshusb.in), a Gatsby 5 + React 18 + TypeScript site. Posts are MDX. Deployed on Netlify (`netlify.toml`: `npm run build`, publish `public`, Node 20). `README.md` holds the author's running roadmap/task checklist.

## Commands

- `npm run develop` — dev server
- `npm run build` — `gatsby clean && gatsby build`
- `npm run serve` — serve the production build (use this to check production-only issues; the README notes syntax highlighting has had production-only problems)
- `npm run typecheck` — `tsc --noEmit`
- No test runner or linter is configured. Prettier config: single quotes, semicolons, 100 cols, 2-space indent.
- `.npmrc` sets `legacy-peer-deps=true`; keep it when installing. `package.json` overrides `lmdb` to 3.5.2.

## Architecture

- **Content pipeline.** MDX files in `src/content/` are sourced by `gatsby-source-filesystem`. `gatsby-node.js` (plain JS, not TS) adds a `fields.slug` on each `Mdx` node via `createFilePath` and creates pages at `/blog<slug>` using `src/templates/BlogArticle.tsx`. The component path carries a `?__contentFilePath=` query, which is required by gatsby-plugin-mdx v5.
- **Frontmatter** on posts: `slug`, `date`, `title`, `tags`, `seoDescription`. Tag `upcoming` marks unpublished/coming-soon posts (see `postListing/status`). Post images live in `src/content/images/` and are referenced relatively (`images/foo.png`).
- **Two Markdown transformers** are configured (`gatsby-plugin-mdx` and `gatsby-transformer-remark`), each with `gatsby-remark-images`. Only MDX nodes get pages. Listing and RSS queries use `allMdx`, not `allMarkdownRemark`.
- **Config** is `gatsby-config.ts`. It also builds the RSS feed (`/rss.xml`), sitemap, robots.txt, PWA/offline, fonts (Google Fonts via omni-font-loader), and GoatCounter analytics (script injected in `gatsby-ssr.js`, production only; route changes counted in `gatsby-browser.tsx`). `.env.<NODE_ENV>` is loaded with dotenv.
- **Pages/layout.** `src/pages/` (index, about, blog, 404) use `src/containers/base` as the shared layout. `src/components/*` are per-component folders with `index.tsx` and a colocated `.scss`. Note that both `Logo/` and `logo/` exist (case-differing directories). `src/hooks/usePostsData.tsx` is the static query feeding post listings, and `useSiteMetaData` reads site metadata.
- **Theming.** Dark mode is class-based (`dark` on `<html>`). `gatsby-ssr.js` injects an inline script that sets the class before paint from `localStorage.theme` or the system preference. `gatsby-browser.tsx` wraps the app in `ThemeProvider` (`src/hooks/themeContext.tsx`) and imports `src/styles/global.scss`. Keep the SSR script and the provider in sync.
- `src/drafts/` holds unpublished writing outside the content pipeline. `SASS_BASICS.md` and `requirements.md` are author notes.

## Gotchas

- `tsconfig.json` `include` references `gatsby-node.ts`, `gatsby-config.js` and `gatsby-browser.js`, which don't exist under those names (actual files: `gatsby-node.js`, `gatsby-config.ts`, `gatsby-browser.tsx`), so `typecheck` doesn't cover those files.
- `package.json` has several overlapping libraries (multiple syntax highlighters, theme toggles, typing animations, font loaders). Check what's actually imported before assuming one is in use.
