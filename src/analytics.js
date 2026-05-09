export const GOOGLE_ANALYTICS_MEASUREMENT_ID = 'G-REPLACE-WITH-YOUR-ID';
export const GOOGLE_SEARCH_CONSOLE_VERIFICATION = 'replace-with-your-google-search-console-token';
export const CLICK_STORAGE_KEY = 'gadgets-mela-click-events';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const PLACEHOLDER_PATTERN = /REPLACE|replace-with/i;

export function isConfigured(value) {
  return Boolean(String(value || '').trim()) && !PLACEHOLDER_PATTERN.test(value);
}

export function initGoogleAnalytics(measurementId = GOOGLE_ANALYTICS_MEASUREMENT_ID) {
  if (!isBrowser || !isConfigured(measurementId) || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);
}

export function buildClickEventFromLink(link, pagePath = currentPagePath()) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    pagePath,
    label: link.dataset.trackLabel || link.textContent.trim() || link.href,
    category: link.dataset.trackCategory || inferCategory(link),
    targetUrl: link.href,
    clickedAt: new Date().toISOString()
  };
}

export function trackAffiliateClick(eventData) {
  const clickEvent = normalizeClickEvent(eventData);
  const events = getClickEvents();
  events.unshift(clickEvent);
  saveClickEvents(events.slice(0, 250));

  if (isBrowser && typeof window.gtag === 'function') {
    window.gtag('event', 'affiliate_click', {
      event_category: clickEvent.category,
      event_label: clickEvent.label,
      page_path: clickEvent.pagePath,
      link_url: clickEvent.targetUrl
    });
  }

  return clickEvent;
}

export function getClickEvents() {
  if (!isBrowser) return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CLICK_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getClickSummary(events = getClickEvents()) {
  const totalClicks = events.length;
  const uniquePages = new Set(events.map((event) => event.pagePath)).size;
  const latestClick = events[0]?.clickedAt || '';
  const byLabel = countBy(events, 'label');
  const byPage = countBy(events, 'pagePath');

  return { totalClicks, uniquePages, latestClick, byLabel, byPage };
}

export function clearClickEvents() {
  if (!isBrowser) return;
  window.localStorage.removeItem(CLICK_STORAGE_KEY);
}

export function registerClickTracking(root = document) {
  if (!isBrowser || !root?.addEventListener) return;

  root.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !shouldTrackLink(link)) return;

    trackAffiliateClick(buildClickEventFromLink(link));
  });
}

function shouldTrackLink(link) {
  if (link.dataset.trackClick === 'true') return true;

  try {
    const url = new URL(link.href);
    return /(^|\.)amazon\.in$/.test(url.hostname) && url.searchParams.has('tag');
  } catch {
    return false;
  }
}

function normalizeClickEvent(eventData) {
  return {
    id: eventData.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    pagePath: eventData.pagePath || currentPagePath(),
    label: eventData.label || 'Affiliate click',
    category: eventData.category || 'affiliate',
    targetUrl: eventData.targetUrl || '',
    clickedAt: eventData.clickedAt || new Date().toISOString()
  };
}

function saveClickEvents(events) {
  if (!isBrowser) return;
  window.localStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify(events));
}

function countBy(events, key) {
  return events.reduce((summary, event) => {
    const value = event[key] || 'Unknown';
    summary[value] = (summary[value] || 0) + 1;
    return summary;
  }, {});
}

function inferCategory(link) {
  if (link.href.includes('amazon.in')) return 'amazon-affiliate';
  return 'outbound-link';
}

function currentPagePath() {
  if (!isBrowser) return '';
  return window.location.pathname.split('/').pop() || 'index.html';
}
