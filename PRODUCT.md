# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two equally weighted audiences: (1) recruiters, engineers and collaborators judging Himanshu's craft through the portfolio and About page; (2) developers reading the blog, arriving via search, RSS or shared links, looking for practical articles on JavaScript, Go, Svelte, git and computational geometry.

## Product Purpose

Personal blog and portfolio of Himanshu Chhabra (himanshusb.in), a fullstack developer at QuillBot based in New Delhi. It shows his work and thinking, publishes technical writing, and gives people a way to reach or hire him. Success: visitors trust his craft and either read on, subscribe via RSS, or get in touch.

## Positioning

Fullstack developer with web3 interest who writes with a wit and self-deprecating voice ("articles of insignificance"). His stated strengths are rendering performance, accessibility and the unglamorous details that make a product feel fast.

## Capabilities and Constraints

- MDX posts with frontmatter (`slug`, `date`, `title`, `tags`, `seoDescription`); tag `upcoming` marks unpublished posts.
- Blog listing, search, tags, RSS (`/rss.xml`), sitemap, light/dark theme, comments, subscribe.
- Gatsby 5 + React 18 + TypeScript, deployed on Netlify. The stack is fixed; no framework migration.
- Open decision: the public headline is inconsistent (SEO title says "Fullstack Developer & Web3 Enthusiast", About says "senior frontend engineer"). The user chose fullstack + web3 as the positioning; hero copy still leans frontend/performance.

## Brand Commitments

- Name "Himanshu's Bin" and the trash-can logo stay.
- Keep the witty, self-deprecating voice in copy.
- The availability badge stays and must reflect a real, maintained status.

## Evidence on Hand

- Published posts in `src/content/` (git, JS arrays/maps, Svelte state/stores, hello-world).
- Projects on the About page and a PullCord project component; profile photo at `src/images/dp.webp`.
- No testimonials or case-study metrics exist; do not fabricate them.

## Product Principles

- Craft is the proof: the site's own performance, accessibility and detail must demonstrate what it claims.
- Portfolio and writing carry equal weight; neither is a footnote to the other.
- Personality is a feature: voice stays human and wry, never corporate.
- Claims stay honest: availability, roles and projects reflect reality.

## Accessibility & Inclusion

Accessibility is a stated professional strength, so the site should meet WCAG 2.1 AA at minimum and honor reduced-motion and system color-scheme preferences.
