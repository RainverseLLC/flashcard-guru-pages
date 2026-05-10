# flashcard-guru-pages

Marketing site + legal pages for [Flashcard Guru](https://flashcard-guru.flashify.app), the iOS spaced-repetition app from [Rainverse LLC](https://github.com/rainverseLLC).

Static HTML/CSS only — no build step, no JS framework. Deployed to Cloudflare Pages.

## Layout

```
templates/                  # i18n source HTML — Mustache-subset templates
├── landing.tmpl.html
└── anki-remote.tmpl.html

i18n/                       # one JSON per supported locale (8 total)
├── en.json                  # canonical (default locale)
├── zh-Hans.json
├── zh-Hant.json
├── ja.json
├── ko.json
├── de.json
├── fr.json
└── es.json

scripts/
└── build.js                # zero-dep template engine + locale builder

public/                     # what gets deployed (generated + static)
├── _headers                  # Cloudflare Pages headers
├── _redirects                # Cloudflare Pages redirects
├── index.html               ← generated (en landing)
├── anki-remote/             ← generated (en anki-remote)
├── zh-Hans/, zh-Hant/, ja/, ko/, de/, fr/, es/   ← generated per locale
├── blog/                    # static — SEO long-form posts (English-only for now)
├── assets/screenshots/      # static — ASO hero shots
├── support/, privacy/, app-privacy-policy/        # static — legal/support
```

The `public/<locale>/...` directories and `public/{index.html,anki-remote/}` are **generated** by `npm run build` from the templates + i18n JSON. They're gitignored — source of truth lives in `templates/` and `i18n/`.

## Local preview

```
npm install
npm run dev
# open http://localhost:8788
```

`dev` runs the build first so all 8 locales render correctly under `/`, `/zh-Hans/`, `/ja/`, etc.

## Build

```
npm run build
```

Reads every `templates/*.tmpl.html` and every `i18n/*.json`, generates the cross-product into `public/`. Idempotent.

## Deploy

```
npm run deploy
```

Chains:
1. `npm run build` — regenerate per-locale HTML + sitemap.xml
2. `wrangler pages deploy public --project-name=flashcard-guru` — push to Cloudflare Pages
3. `scripts/ping-indexnow.sh` — push every URL in the sitemap to IndexNow (Bing / Yandex / Naver / Seznam / Mojeek pick it up; Google is reached via Search Console + organic crawl)

The Pages project is mapped to `flashcard-guru.flashify.app` in the Cloudflare dashboard.

For preview branches (no IndexNow ping — preview URLs aren't canonical):

```
npm run deploy:preview
```

To ping IndexNow without a fresh deploy (e.g., after a Cloudflare config change):

```
npm run indexnow
```

### IndexNow setup

The protocol authenticates ownership via a key file served at the site root:

- `.indexnow-key` (committed) — single line, the canonical key
- `public/<KEY>.txt` (committed) — file named after the key, content = the key

Both must move together. Rotating the key = generate new hex, save to `.indexnow-key`, rename the public file. Cloudflare's automatic IndexNow integration (Speed → Optimization → IndexNow in the dashboard) reads the same key file, so enabling it is one click and complementary to the manual ping.

## Adding a locale

1. Add an entry to `LOCALES` in `scripts/build.js` (BCP 47 code + display name).
2. Create `i18n/<code>.json` — start by copying `i18n/en.json` and translating the values (keys must match exactly).
3. `npm run build` — the new locale's pages will appear under `public/<code>/`.

## Editing copy

- **String change in one locale** → edit `i18n/<locale>.json` and rebuild.
- **Layout/structural change** → edit `templates/<page>.tmpl.html` and rebuild. All 8 locales pick up the change.
- **New translatable string** → add the key to *every* `i18n/*.json` (start with English, then translate). Reference it in the template as `{{path.to.key}}`.

Template syntax (Mustache subset, no escaping — strings are HTML):

- `{{key}}` or `{{nested.key}}` — variable substitution.
- `{{#list}}…{{/list}}` — iterate over an array; inside the body, `{{title}}` etc. refer to fields of the current item, and `{{this}}` is the raw item (for string arrays).
- `{{prefix}}` is auto-injected per locale (`""` for default, `/zh-Hans` etc. for others). Use it on internal i18n'd links: `href="{{prefix}}/anki-remote"`. Substitution is recursive, so it works inside locale strings too.

## Edit conventions

- One HTML file per route (`<route>/index.html`). The dir-name routing keeps URLs trailing-slash-friendly.
- Inline `<style>` per page is fine — pages share an aesthetic (Apple-system font, light bg, blue accent) but each is standalone for fast iteration.
- Keep the `_headers` security baseline: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Don't drop the `_redirects` mappings — App Store / TestFlight build references and the Anki AddOn listing point at specific URLs (`/privacy`, `/support`, `/anki-remote`).
- **Screenshots** live under `public/assets/screenshots/` and are sourced from the ASO automation pipeline (`flashifyIOS/artifacts/appstore/<locale>/local_full_single/`). Re-export and replace when ASO finalizes.

## Adding a blog post

1. Create `public/blog/<slug>/index.html`. Keep one dir per post for trailing-slash-friendly URLs.
2. Match the `Blog post` head/style block — copy from an existing post and adjust meta tags. Important: set `og:type=article`, `article:published_time`, and at least one `article:tag`.
3. Aim for ~1500 words on long-form / SEO posts. Naturally link to `/anki-remote` or other internal pages where relevant.
4. Add an entry at the top of `public/blog/index.html` with title, date, and 1-sentence excerpt.
5. Cross-link from related landing pages where appropriate.

## Related

- iOS app (private): see `flashifyIOS`.
- Anki Remote AddOn (LGPL-3.0): <https://github.com/jyehn/flashcard-guru-remote-addon>
- Anki Import Bridge (AGPL-3.0): <https://github.com/jyehn/flashcard-guru-anki-import-bridge>
