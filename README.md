# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## PostHog analytics

Set these environment variables in Vercel (and in `.env.local` for local
development):

- `VITE_POSTHOG_KEY`: your PostHog project token.
- `VITE_POSTHOG_HOST`: your PostHog ingestion host, such as
  `https://us.i.posthog.com`. It defaults to the US host if omitted.

Analytics stays disabled when `VITE_POSTHOG_KEY` is unset. When enabled, the
app captures SPA page views, click interactions, session recordings, frontend
exceptions, and successful sign-up and login events. Session recordings mask
form inputs, and query strings and URL fragments are removed before URL
properties are sent. Do not put a PostHog personal API key in frontend
environment variables; the project token is designed for client-side use.

## Search engine optimization

The public landing page, marketplace, and storefronts set page-specific titles,
descriptions, canonical URLs, and social metadata. The home page also publishes
Organization and WebSite structured data. Account, order, and dashboard routes
are marked `noindex` and excluded from crawling.

`public/robots.txt` and `public/sitemap.xml` use `https://www.bluespace.live`.
Update both files and the canonical/social URLs if the production domain changes.
The sitemap lists the static public pages; storefront URLs are dynamic and are
not enumerated there. Because this app uses client-side routing, dynamic metadata
is applied after JavaScript runs; server-side rendering or prerendering is needed
for crawlers that do not execute JavaScript.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
