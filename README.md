# flashcard-guru-pages — MOVED (2026-07-06)

The site now lives in **flashifyWebV2/marketing/app-site/** and is served by
the main Worker at **https://guruowl.com/app/** (SEO consolidation: one domain,
one crawl surface).

This Pages project only serves `redirect/_redirects` — a blanket
`/* → https://guruowl.com/app/:splat 301`. Keep the project + custom domain
alive so old links, App Store Connect URLs, and indexed pages keep resolving.

Redeploy the redirects (rarely needed):

    npx wrangler@4 pages deploy redirect --project-name=flashcard-guru

Everything else in this repo (templates/, i18n/, content/, scripts/, public/)
is the pre-move snapshot — edit the copy in flashifyWebV2 instead.
