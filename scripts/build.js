#!/usr/bin/env node
// Minimal i18n static-site builder. Zero deps.
//
// Reads:
//   templates/<page>.tmpl.html   — Mustache-subset templates
//   i18n/<locale>.json            — strings per locale
//
// Writes:
//   public/index.html                  (default-locale landing)
//   public/<page>/index.html           (default-locale non-landing)
//   public/<locale>/index.html         (other-locale landing)
//   public/<locale>/<page>/index.html  (other-locale non-landing)
//
// Locale list lives below in LOCALES; default locale is the first one.
//
// Template syntax:
//   {{key}}              variable, dot-paths supported (e.g. {{hero.title}})
//   {{{key}}}            same as above (HTML strings pass through unchanged
//                        either way — there's no escaping)
//   {{#list}}...{{/list}}  iterate; inside, {{title}} and {{this}} both work

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const I18N_DIR = path.join(ROOT, 'i18n');
const PUBLIC_DIR = path.join(ROOT, 'public');

// ---------------------------------------------------------------------------
// Locale registry
// ---------------------------------------------------------------------------

const LOCALES = [
  { code: 'en',      name: 'English',         hreflang: 'en' },
  { code: 'zh-Hans', name: '简体中文',         hreflang: 'zh-Hans' },
  { code: 'zh-Hant', name: '繁體中文',         hreflang: 'zh-Hant' },
  { code: 'ja',      name: '日本語',           hreflang: 'ja' },
  { code: 'ko',      name: '한국어',           hreflang: 'ko' },
  { code: 'de',      name: 'Deutsch',          hreflang: 'de' },
  { code: 'fr',      name: 'Français',         hreflang: 'fr' },
  { code: 'es',      name: 'Español',          hreflang: 'es' },
];
const DEFAULT_LOCALE = LOCALES[0].code;
const SITE_ORIGIN = 'https://flashcard-guru.flashify.app';

// ---------------------------------------------------------------------------
// Tiny template engine (Mustache subset)
// ---------------------------------------------------------------------------

function lookup(scope, key) {
  if (key === '.' || key === 'this') return scope.__this;
  let cursor = scope;
  for (const part of key.split('.')) {
    if (cursor == null) return undefined;
    cursor = cursor[part];
  }
  return cursor;
}

function renderOnce(template, data) {
  // Sections first (greedy match against same name); supports nesting via
  // recursion on the captured body.
  template = template.replace(
    /\{\{#([\w.]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g,
    (_, key, body) => {
      const value = lookup(data, key);
      if (Array.isArray(value)) {
        return value
          .map((item) => {
            const childScope = typeof item === 'object' && item !== null
              ? { ...data, ...item, __this: item }
              : { ...data, __this: item };
            return render(body, childScope);
          })
          .join('');
      }
      return value ? render(body, data) : '';
    },
  );

  // Then plain variables. {{{key}}} and {{key}} are equivalent here (no
  // escaping; treat strings as HTML).
  template = template.replace(/\{\{\{?([\w.]+)\}?\}\}/g, (_, key) => {
    const v = lookup(data, key);
    return v == null ? '' : String(v);
  });

  return template;
}

function render(template, data) {
  // Loop until stable so that values containing further `{{...}}` (e.g.,
  // a feature body with `{{prefix}}/anki-remote`) are resolved.
  let prev;
  let current = template;
  let depth = 0;
  do {
    prev = current;
    current = renderOnce(current, data);
    depth++;
  } while (current !== prev && depth < 6);
  return current;
}

// ---------------------------------------------------------------------------
// Build context helpers
// ---------------------------------------------------------------------------

function loadJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function pageOutPath(localeCode, pageSlug) {
  const localeBase = localeCode === DEFAULT_LOCALE ? PUBLIC_DIR : path.join(PUBLIC_DIR, localeCode);
  if (pageSlug === 'landing') return { dir: localeBase, file: 'index.html' };
  return { dir: path.join(localeBase, pageSlug), file: 'index.html' };
}

function urlForPage(localeCode, pageSlug) {
  const base = localeCode === DEFAULT_LOCALE ? '' : `/${localeCode}`;
  if (pageSlug === 'landing') return `${base}/`;
  return `${base}/${pageSlug}/`;
}

function buildLangSwitcher(currentLocale, pageSlug) {
  const items = LOCALES.map((loc) => {
    const url = urlForPage(loc.code, pageSlug);
    const isActive = loc.code === currentLocale;
    const aria = isActive ? ' aria-current="true"' : '';
    return `      <li><a href="${url}" hreflang="${loc.hreflang}"${aria}>${loc.name}</a></li>`;
  }).join('\n');
  return `<details class="lang-switcher">
  <summary>${LOCALES.find((l) => l.code === currentLocale).name}</summary>
  <ul>
${items}
  </ul>
</details>`;
}

function buildHreflangAlternates(pageSlug) {
  const lines = LOCALES.map((loc) => {
    const url = SITE_ORIGIN + urlForPage(loc.code, pageSlug);
    return `<link rel="alternate" hreflang="${loc.hreflang}" href="${url}">`;
  });
  // x-default is the canonical fallback for unmatched locales.
  const xDefaultUrl = SITE_ORIGIN + urlForPage(DEFAULT_LOCALE, pageSlug);
  lines.push(`<link rel="alternate" hreflang="x-default" href="${xDefaultUrl}">`);
  return lines.join('\n    ');
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function loadTemplates() {
  return fs.readdirSync(TEMPLATES_DIR)
    .filter((f) => f.endsWith('.tmpl.html'))
    .map((f) => ({
      name: f.replace(/\.tmpl\.html$/, ''),
      body: fs.readFileSync(path.join(TEMPLATES_DIR, f), 'utf8'),
    }));
}

function loadLocaleStrings() {
  const out = {};
  for (const loc of LOCALES) {
    const p = path.join(I18N_DIR, `${loc.code}.json`);
    if (!fs.existsSync(p)) {
      throw new Error(`Missing translation file: ${p}`);
    }
    out[loc.code] = loadJSON(p);
  }
  return out;
}

function stripHtml(s) {
  return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function jsonLdBlock(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`;
}

function buildSoftwareApplicationJsonLd(strings, canonicalUrl) {
  return jsonLdBlock({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Flashcard Guru',
    operatingSystem: 'iOS 16+',
    applicationCategory: 'EducationApplication',
    description: stripHtml(strings.landing?.metaDescription || ''),
    url: canonicalUrl,
    image: `${SITE_ORIGIN}/icons/icon-512.png`,
    installUrl: 'https://apps.apple.com/app/flashcardguru/id6757980593',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '5.99',
      highPrice: '39.99',
      offerCount: '3',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FlashcardGuru',
      url: SITE_ORIGIN,
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/icons/icon-512.png` },
    },
  });
}

function buildPricingJsonLd(strings, canonicalUrl) {
  return jsonLdBlock({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Flashcard Guru',
    operatingSystem: 'iOS 16+',
    applicationCategory: 'EducationApplication',
    description: stripHtml(strings.pricing?.metaDescription || ''),
    url: canonicalUrl,
    image: `${SITE_ORIGIN}/icons/icon-512.png`,
    installUrl: 'https://apps.apple.com/app/flashcardguru/id6757980593',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '5.99',
      highPrice: '39.99',
      offerCount: '3',
    },
  });
}

function buildFaqJsonLd(items) {
  if (!Array.isArray(items) || items.length === 0) return '';
  return jsonLdBlock({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: stripHtml(item.q),
      acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.a) },
    })),
  });
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const TEMPLATE_PAGES = ['landing', 'anki-remote', 'pricing'];
  const STATIC_PAGES = [
    { path: '/blog/', changefreq: 'weekly', priority: '0.7' },
    { path: '/blog/free-wireless-anki-remote/', changefreq: 'monthly', priority: '0.6' },
    { path: '/support', changefreq: 'monthly', priority: '0.5' },
    { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
    { path: '/app-privacy-policy', changefreq: 'yearly', priority: '0.3' },
  ];

  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  lines.push('        xmlns:xhtml="http://www.w3.org/1999/xhtml">');

  for (const slug of TEMPLATE_PAGES) {
    for (const loc of LOCALES) {
      const url = SITE_ORIGIN + urlForPage(loc.code, slug);
      lines.push('  <url>');
      lines.push(`    <loc>${url}</loc>`);
      lines.push(`    <lastmod>${today}</lastmod>`);
      lines.push(`    <changefreq>weekly</changefreq>`);
      lines.push(`    <priority>${loc.code === DEFAULT_LOCALE ? '1.0' : '0.9'}</priority>`);
      for (const alt of LOCALES) {
        const altUrl = SITE_ORIGIN + urlForPage(alt.code, slug);
        lines.push(`    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${altUrl}"/>`);
      }
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN + urlForPage(DEFAULT_LOCALE, slug)}"/>`);
      lines.push('  </url>');
    }
  }

  for (const p of STATIC_PAGES) {
    lines.push('  <url>');
    lines.push(`    <loc>${SITE_ORIGIN}${p.path}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(`    <changefreq>${p.changefreq}</changefreq>`);
    lines.push(`    <priority>${p.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return lines.join('\n') + '\n';
}

function build() {
  const templates = loadTemplates();
  const localeStrings = loadLocaleStrings();
  let written = 0;

  for (const tmpl of templates) {
    for (const loc of LOCALES) {
      const strings = localeStrings[loc.code];
      const langSwitcher = buildLangSwitcher(loc.code, tmpl.name);
      const hreflangAlternates = buildHreflangAlternates(tmpl.name);
      const canonicalUrl = SITE_ORIGIN + urlForPage(loc.code, tmpl.name);

      // Per-page JSON-LD
      let jsonLd = '';
      if (tmpl.name === 'landing') {
        jsonLd = buildSoftwareApplicationJsonLd(strings, canonicalUrl);
      } else if (tmpl.name === 'anki-remote') {
        jsonLd = buildFaqJsonLd(strings.ankiRemote?.faq?.items);
      } else if (tmpl.name === 'pricing') {
        jsonLd = [
          buildPricingJsonLd(strings, canonicalUrl),
          buildFaqJsonLd(strings.pricing?.faq?.items),
        ]
          .filter(Boolean)
          .join('\n');
      }

      const data = {
        ...strings,
        site: { ...(strings.site || {}), origin: SITE_ORIGIN },
        locale: loc.code,
        localeName: loc.name,
        prefix: loc.code === DEFAULT_LOCALE ? '' : `/${loc.code}`,
        canonicalUrl,
        hreflangAlternates,
        langSwitcher,
        jsonLd,
      };

      const html = render(tmpl.body, data);
      const { dir, file } = pageOutPath(loc.code, tmpl.name);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, file), html, 'utf8');
      written++;
    }
  }

  // Emit sitemap.xml at site root
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemap(), 'utf8');

  console.log(`Built ${written} pages (${templates.length} templates × ${LOCALES.length} locales) + sitemap.xml.`);
}

build();
