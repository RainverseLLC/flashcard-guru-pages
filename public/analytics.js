(function () {
  'use strict';

  function cleanText(text) {
    return String(text || '').replace(/\s+/g, ' ').trim().slice(0, 120);
  }

  function linkDomain(url) {
    try {
      return new URL(url, window.location.href).hostname;
    } catch (_) {
      return '';
    }
  }

  function classifyLink(anchor) {
    const href = anchor.getAttribute('href') || '';
    const url = new URL(href, window.location.href);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (url.hostname === 'apps.apple.com' && url.pathname.includes('/id6757980593')) {
      return 'app_store_click';
    }

    if (url.hostname === window.location.hostname && path.endsWith('/pricing')) {
      return 'pricing_click';
    }

    if (url.hostname === window.location.hostname && path.endsWith('/support')) {
      return 'support_click';
    }

    if (url.hostname === 'ankiweb.net') {
      return 'anki_addon_click';
    }

    if (url.hostname && url.hostname !== window.location.hostname) {
      return 'outbound_click';
    }

    return null;
  }

  function sendEvent(eventName, anchor) {
    if (typeof window.gtag !== 'function') return;

    const href = anchor.href;
    window.gtag('event', eventName, {
      link_url: href,
      link_domain: linkDomain(href),
      link_text: cleanText(anchor.innerText || anchor.getAttribute('aria-label')),
      page_path: window.location.pathname,
      page_location: window.location.href,
    });
  }

  document.addEventListener('click', function (event) {
    const anchor = event.target.closest && event.target.closest('a[href]');
    if (!anchor) return;

    let eventName;
    try {
      eventName = classifyLink(anchor);
    } catch (_) {
      return;
    }

    if (eventName) sendEvent(eventName, anchor);
  }, { capture: true });
}());
