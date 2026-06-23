#!/usr/bin/env node
// Minimal i18n static-site builder.
//
// Reads:
//   templates/<page>.tmpl.html   — Mustache-subset templates (page templates)
//   templates/blog-*.tmpl.html    — blog post / index shells (handled by buildBlog)
//   i18n/<locale>.json            — strings per locale
//   content/blog/<slug>/meta.json — blog post metadata (date, tags, per-locale title…)
//   content/blog/<slug>/<loc>.md  — blog post body, Markdown (rendered via `marked`)
//
// Writes:
//   public/index.html                  (default-locale landing)
//   public/<page>/index.html           (default-locale non-landing)
//   public/<locale>/...                (other-locale pages)
//   public/blog/, public/<locale>/blog/        (blog index + posts)
//   public/sitemap.xml
//
// Locale list lives below in LOCALES; default locale is the first one.
//
// Template syntax:
//   {{key}} / {{{key}}}     variable, dot-paths supported (no escaping — HTML strings)
//   {{#list}}...{{/list}}   iterate (or render-if-truthy for non-arrays)

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const I18N_DIR = path.join(ROOT, 'i18n');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

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
const ORG_ID = `${SITE_ORIGIN}/#org`;
const BRAND = 'Guru';                       // short brand (nav, footer, Organization)
const APP_NAME = 'Guru: AI Flashcard Study'; // full App Store name (titles, SoftwareApplication)

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

function blogIndexUrl(localeCode) {
  const base = localeCode === DEFAULT_LOCALE ? '' : `/${localeCode}`;
  return `${base}/blog/`;
}

function postUrl(localeCode, slug) {
  const base = localeCode === DEFAULT_LOCALE ? '' : `/${localeCode}`;
  return `${base}/blog/${slug}/`;
}

// Localized long-date, e.g. "May 9, 2026" / "2026年5月9日". Noon-UTC avoids
// off-by-one shifts in negative-offset locales.
function formatDate(iso, hreflang) {
  try {
    const d = new Date(`${iso}T12:00:00Z`);
    return new Intl.DateTimeFormat(hreflang, { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
  } catch {
    return iso;
  }
}

// Language switcher / hreflang block, parameterized by a (localeCode) -> path fn
// so blog pages (which don't follow the page-slug URL scheme) can reuse them.
function buildLangSwitcher(currentLocale, urlFn, localeList = LOCALES) {
  const items = localeList.map((loc) => {
    const isActive = loc.code === currentLocale;
    const aria = isActive ? ' aria-current="true"' : '';
    return `      <li><a href="${urlFn(loc.code)}" hreflang="${loc.hreflang}"${aria}>${loc.name}</a></li>`;
  }).join('\n');
  return `<details class="lang-switcher">
  <summary>${LOCALES.find((l) => l.code === currentLocale).name}</summary>
  <ul>
${items}
  </ul>
</details>`;
}

function buildHreflangAlternates(urlFn, localeList = LOCALES) {
  const lines = localeList.map(
    (loc) => `<link rel="alternate" hreflang="${loc.hreflang}" href="${SITE_ORIGIN + urlFn(loc.code)}">`,
  );
  lines.push(`<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN + urlFn(DEFAULT_LOCALE)}">`);
  return lines.join('\n    ');
}

// ---------------------------------------------------------------------------
// Structured data (JSON-LD)
// ---------------------------------------------------------------------------

function stripHtml(s) {
  return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function jsonLdBlock(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`;
}

// Site-wide Organization + WebSite. Emitted on every page; @id references let
// Google dedupe across pages.
function buildSiteJsonLd() {
  return [
    jsonLdBlock({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': ORG_ID,
      name: BRAND,
      url: SITE_ORIGIN,
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/icons/icon-512.png` },
    }),
    jsonLdBlock({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      name: APP_NAME,
      url: SITE_ORIGIN,
      publisher: { '@id': ORG_ID },
    }),
  ].join('\n');
}

function buildBreadcrumbJsonLd(items) {
  return jsonLdBlock({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => {
      const li = { '@type': 'ListItem', position: i + 1, name: it.name };
      if (it.item) li.item = it.item;
      return li;
    }),
  });
}

function buildArticleJsonLd(p) {
  return jsonLdBlock({
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': p.url },
    headline: p.title,
    description: p.description,
    image: [p.image],
    datePublished: p.date,
    dateModified: p.updated || p.date,
    author: { '@type': 'Organization', name: BRAND, url: SITE_ORIGIN },
    publisher: { '@id': ORG_ID },
  });
}

function buildSoftwareApplicationJsonLd(strings, canonicalUrl) {
  return jsonLdBlock({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: APP_NAME,
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
      name: BRAND,
      url: SITE_ORIGIN,
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/icons/icon-512.png` },
    },
  });
}

function buildPricingJsonLd(strings, canonicalUrl) {
  return jsonLdBlock({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: APP_NAME,
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

// ---------------------------------------------------------------------------
// Loaders
// ---------------------------------------------------------------------------

function loadTemplates() {
  // blog-* templates are rendered by buildBlog(), not the generic page loop.
  return fs.readdirSync(TEMPLATES_DIR)
    .filter((f) => f.endsWith('.tmpl.html') && !f.startsWith('blog-'))
    .map((f) => ({
      name: f.replace(/\.tmpl\.html$/, ''),
      body: fs.readFileSync(path.join(TEMPLATES_DIR, f), 'utf8'),
    }));
}

function loadTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, `${name}.tmpl.html`), 'utf8');
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

// Returns posts sorted newest-first. Each: { slug, meta, bodies:{loc->md} }.
function loadBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const posts = fs.readdirSync(BLOG_DIR)
    .filter((d) => fs.statSync(path.join(BLOG_DIR, d)).isDirectory())
    .map((slug) => {
      const dir = path.join(BLOG_DIR, slug);
      const meta = loadJSON(path.join(dir, 'meta.json'));
      const bodies = {};
      for (const loc of LOCALES) {
        const mp = path.join(dir, `${loc.code}.md`);
        if (fs.existsSync(mp)) bodies[loc.code] = fs.readFileSync(mp, 'utf8');
      }
      if (!bodies[DEFAULT_LOCALE] || !meta.i18n?.[DEFAULT_LOCALE]) {
        throw new Error(`Blog post "${slug}" must have a ${DEFAULT_LOCALE}.md body and i18n.${DEFAULT_LOCALE} metadata`);
      }
      return { slug, meta, bodies };
    });
  posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
  return posts;
}

// Locales a post is actually published in (has both a body and metadata).
function postLocales(post) {
  return LOCALES.filter((loc) => post.bodies[loc.code] && post.meta.i18n[loc.code]);
}

// ---------------------------------------------------------------------------
// Blog builder
// ---------------------------------------------------------------------------

function buildBlog(posts, localeStrings, marked) {
  const blogPostTmpl = loadTemplate('blog-post');
  const blogIndexTmpl = loadTemplate('blog-index');
  let written = 0;

  // Individual posts (only in locales they're translated into).
  for (const post of posts) {
    const locs = postLocales(post);
    const postUrlFn = (code) => (locs.some((l) => l.code === code) ? postUrl(code, post.slug) : blogIndexUrl(code));
    for (const loc of locs) {
      const strings = localeStrings[loc.code];
      const i18n = post.meta.i18n[loc.code];
      const url = postUrl(loc.code, post.slug);
      const canonicalUrl = SITE_ORIGIN + url;
      const ogImage = SITE_ORIGIN + post.meta.image;

      const jsonLd = [
        buildSiteJsonLd(),
        buildArticleJsonLd({
          title: i18n.title,
          description: i18n.description,
          url: canonicalUrl,
          image: ogImage,
          date: post.meta.date,
          updated: post.meta.updated,
        }),
        buildBreadcrumbJsonLd([
          { name: strings.site?.name || BRAND, item: SITE_ORIGIN + urlForPage(loc.code, 'landing') },
          { name: strings.blog?.indexTitle || 'Blog', item: SITE_ORIGIN + blogIndexUrl(loc.code) },
          { name: i18n.title },
        ]),
      ].join('\n');

      const data = {
        ...strings,
        site: { ...(strings.site || {}), origin: SITE_ORIGIN },
        locale: loc.code,
        prefix: loc.code === DEFAULT_LOCALE ? '' : `/${loc.code}`,
        canonicalUrl,
        hreflangAlternates: buildHreflangAlternates((c) => postUrl(c, post.slug), locs),
        langSwitcher: buildLangSwitcher(loc.code, postUrlFn),
        jsonLd,
        post: {
          title: i18n.title,
          description: i18n.description,
          canonicalUrl,
          ogImage,
          section: post.meta.section || (strings.blog?.indexTitle || 'Blog'),
          tags: post.meta.tags || [],
          dateISO: post.meta.date,
          dateDisplay: formatDate(post.meta.date, loc.hreflang),
          updatedISO: post.meta.updated || post.meta.date,
          updatedDisplay: formatDate(post.meta.updated || post.meta.date, loc.hreflang),
          showUpdated: Boolean(post.meta.updated && post.meta.updated !== post.meta.date),
          readingTime: i18n.readingTime || '',
          body: marked.parse(post.bodies[loc.code]),
        },
      };

      const html = render(blogPostTmpl, data);
      const localeBase = loc.code === DEFAULT_LOCALE ? PUBLIC_DIR : path.join(PUBLIC_DIR, loc.code);
      const dir = path.join(localeBase, 'blog', post.slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
      written++;
    }
  }

  // Blog index — generated for every locale so the nav link works everywhere.
  // Posts not yet translated into a locale link to their default-locale URL.
  for (const loc of LOCALES) {
    const strings = localeStrings[loc.code];
    const canonicalUrl = SITE_ORIGIN + blogIndexUrl(loc.code);
    const list = posts.map((post) => {
      const has = Boolean(post.bodies[loc.code] && post.meta.i18n[loc.code]);
      const i18n = (has ? post.meta.i18n[loc.code] : post.meta.i18n[DEFAULT_LOCALE]);
      return {
        url: postUrl(has ? loc.code : DEFAULT_LOCALE, post.slug),
        title: i18n.title,
        excerpt: i18n.excerpt || i18n.description || '',
        readingTime: i18n.readingTime || '',
        dateISO: post.meta.date,
        dateDisplay: formatDate(post.meta.date, loc.hreflang),
      };
    });

    const jsonLd = [
      buildSiteJsonLd(),
      buildBreadcrumbJsonLd([
        { name: strings.site?.name || BRAND, item: SITE_ORIGIN + urlForPage(loc.code, 'landing') },
        { name: strings.blog?.indexTitle || 'Blog' },
      ]),
    ].join('\n');

    const data = {
      ...strings,
      site: { ...(strings.site || {}), origin: SITE_ORIGIN },
      locale: loc.code,
      prefix: loc.code === DEFAULT_LOCALE ? '' : `/${loc.code}`,
      hreflangAlternates: buildHreflangAlternates(blogIndexUrl),
      langSwitcher: buildLangSwitcher(loc.code, blogIndexUrl),
      jsonLd,
      blog: {
        ...(strings.blog || {}),
        canonicalUrl,
        ogImage: `${SITE_ORIGIN}/assets/og/landing.png`,
        posts: list,
      },
    };

    const html = render(blogIndexTmpl, data);
    const localeBase = loc.code === DEFAULT_LOCALE ? PUBLIC_DIR : path.join(PUBLIC_DIR, loc.code);
    const dir = path.join(localeBase, 'blog');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    written++;
  }

  return written;
}

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------

function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const TEMPLATE_PAGES = ['landing', 'anki-remote', 'pricing'];
  const STATIC_PAGES = [
    { path: '/support', changefreq: 'monthly', priority: '0.5' },
    { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
    { path: '/app-privacy-policy', changefreq: 'yearly', priority: '0.3' },
  ];

  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  lines.push('        xmlns:xhtml="http://www.w3.org/1999/xhtml">');

  const emitAlternates = (urlFn, locList) => {
    for (const alt of locList) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${SITE_ORIGIN + urlFn(alt.code)}"/>`);
    }
    lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN + urlFn(DEFAULT_LOCALE)}"/>`);
  };

  // Template pages × locales.
  for (const slug of TEMPLATE_PAGES) {
    for (const loc of LOCALES) {
      lines.push('  <url>');
      lines.push(`    <loc>${SITE_ORIGIN + urlForPage(loc.code, slug)}</loc>`);
      lines.push(`    <lastmod>${today}</lastmod>`);
      lines.push('    <changefreq>weekly</changefreq>');
      lines.push(`    <priority>${loc.code === DEFAULT_LOCALE ? '1.0' : '0.9'}</priority>`);
      emitAlternates((c) => urlForPage(c, slug), LOCALES);
      lines.push('  </url>');
    }
  }

  // Blog index × locales.
  for (const loc of LOCALES) {
    lines.push('  <url>');
    lines.push(`    <loc>${SITE_ORIGIN + blogIndexUrl(loc.code)}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push('    <changefreq>weekly</changefreq>');
    lines.push(`    <priority>${loc.code === DEFAULT_LOCALE ? '0.7' : '0.6'}</priority>`);
    emitAlternates(blogIndexUrl, LOCALES);
    lines.push('  </url>');
  }

  // Blog posts × translated locales.
  for (const post of posts) {
    const locs = postLocales(post);
    for (const loc of locs) {
      lines.push('  <url>');
      lines.push(`    <loc>${SITE_ORIGIN + postUrl(loc.code, post.slug)}</loc>`);
      lines.push(`    <lastmod>${post.meta.updated || post.meta.date || today}</lastmod>`);
      lines.push('    <changefreq>monthly</changefreq>');
      lines.push('    <priority>0.6</priority>');
      emitAlternates((c) => postUrl(c, post.slug), locs);
      lines.push('  </url>');
    }
  }

  // Flat static pages.
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

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

async function build() {
  const { marked } = await import('marked');
  marked.setOptions({ gfm: true });

  const templates = loadTemplates();
  const localeStrings = loadLocaleStrings();
  let written = 0;

  for (const tmpl of templates) {
    for (const loc of LOCALES) {
      const strings = localeStrings[loc.code];
      const canonicalUrl = SITE_ORIGIN + urlForPage(loc.code, tmpl.name);
      const homeUrl = SITE_ORIGIN + urlForPage(loc.code, 'landing');

      // Per-page JSON-LD (site-wide Organization/WebSite first).
      const blocks = [buildSiteJsonLd()];
      if (tmpl.name === 'landing') {
        blocks.push(buildSoftwareApplicationJsonLd(strings, canonicalUrl));
      } else if (tmpl.name === 'anki-remote') {
        blocks.push(buildFaqJsonLd(strings.ankiRemote?.faq?.items));
        blocks.push(buildBreadcrumbJsonLd([
          { name: strings.site?.name || BRAND, item: homeUrl },
          { name: strings.nav?.ankiRemote || 'Anki Remote' },
        ]));
      } else if (tmpl.name === 'pricing') {
        blocks.push(buildPricingJsonLd(strings, canonicalUrl));
        blocks.push(buildFaqJsonLd(strings.pricing?.faq?.items));
        blocks.push(buildBreadcrumbJsonLd([
          { name: strings.site?.name || BRAND, item: homeUrl },
          { name: strings.pricing?.eyebrow || 'Pricing' },
        ]));
      }
      const jsonLd = blocks.filter(Boolean).join('\n');

      const data = {
        ...strings,
        site: { ...(strings.site || {}), origin: SITE_ORIGIN },
        locale: loc.code,
        localeName: loc.name,
        prefix: loc.code === DEFAULT_LOCALE ? '' : `/${loc.code}`,
        canonicalUrl,
        hreflangAlternates: buildHreflangAlternates((c) => urlForPage(c, tmpl.name)),
        langSwitcher: buildLangSwitcher(loc.code, (c) => urlForPage(c, tmpl.name)),
        jsonLd,
      };

      const html = render(tmpl.body, data);
      const { dir, file } = pageOutPath(loc.code, tmpl.name);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, file), html, 'utf8');
      written++;
    }
  }

  // Blog (index + posts, per locale).
  const posts = loadBlogPosts();
  written += buildBlog(posts, localeStrings, marked);

  // Sitemap at site root.
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemap(posts), 'utf8');

  console.log(`Built ${written} pages (${templates.length} page templates + ${posts.length} blog post(s)) × ${LOCALES.length} locales + sitemap.xml.`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
