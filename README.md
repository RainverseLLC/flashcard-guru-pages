# flashcard-guru-pages

Marketing site + legal pages for [Flashcard Guru](https://flashcard-guru.flashify.app), the iOS spaced-repetition app from [Rainverse LLC](https://github.com/rainverseLLC).

Static HTML/CSS only — no build step, no JS framework. Deployed to Cloudflare Pages.

## Layout

```
public/                    # what gets deployed
├── _headers                 # Cloudflare Pages headers
├── _redirects               # Cloudflare Pages redirects
├── index.html               # marketing landing page
├── anki-remote/             # Flashcard Guru Remote add-on landing page
├── support/                 # support / FAQ
├── privacy/                 # main privacy policy
└── app-privacy-policy/      # alternate privacy policy URL referenced by App Store
```

## Local preview

```
npm install
npm run dev
# open http://localhost:8788
```

## Deploy

```
npm run deploy
```

This pushes `public/` to the Cloudflare Pages project named `flashcard-guru`, which is mapped to `flashcard-guru.flashify.app` in the Cloudflare dashboard.

For preview branches:

```
npm run deploy:preview
```

## Edit conventions

- One HTML file per route (`<route>/index.html`). The dir-name routing keeps URLs trailing-slash-friendly.
- Inline `<style>` per page is fine — pages share an aesthetic (Apple-system font, light bg, blue accent) but each is standalone for fast iteration.
- Keep the `_headers` security baseline: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Don't drop the `_redirects` mappings — App Store / TestFlight build references and the Anki AddOn listing point at specific URLs (`/privacy`, `/support`, `/anki-remote`).

## Related

- iOS app (private): see `flashifyIOS`.
- Anki Remote AddOn (LGPL-3.0): <https://github.com/jyehn/flashcard-guru-remote-addon>
- Anki Import Bridge (AGPL-3.0): <https://github.com/jyehn/flashcard-guru-anki-import-bridge>
