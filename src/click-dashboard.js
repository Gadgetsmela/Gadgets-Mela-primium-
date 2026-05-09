import {
  CLICK_STORAGE_KEY,
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  GOOGLE_SEARCH_CONSOLE_VERIFICATION,
  clearClickEvents,
  getClickEvents,
  getClickSummary,
  isConfigured
} from './analytics.js';
import { seoPages } from './seo-pages.js';

const elements = {
  totalClicks: document.querySelector('[data-total-clicks]'),
  uniquePages: document.querySelector('[data-unique-pages]'),
  latestClick: document.querySelector('[data-latest-click]'),
  byProduct: document.querySelector('[data-product-clicks]'),
  byPage: document.querySelector('[data-page-clicks]'),
  eventRows: document.querySelector('[data-event-rows]'),
  analyticsStatus: document.querySelector('[data-analytics-status]'),
  searchConsoleStatus: document.querySelector('[data-search-console-status]'),
  storageKey: document.querySelector('[data-storage-key]'),
  clearButton: document.querySelector('[data-clear-clicks]')
};

renderDashboard();
elements.clearButton?.addEventListener('click', () => {
  clearClickEvents();
  renderDashboard();
});

function renderDashboard() {
  const events = getClickEvents();
  const summary = getClickSummary(events);

  elements.totalClicks.textContent = summary.totalClicks.toLocaleString('en-IN');
  elements.uniquePages.textContent = summary.uniquePages.toLocaleString('en-IN');
  elements.latestClick.textContent = summary.latestClick ? formatDate(summary.latestClick) : 'No clicks yet';
  elements.storageKey.textContent = CLICK_STORAGE_KEY;
  elements.analyticsStatus.textContent = isConfigured(GOOGLE_ANALYTICS_MEASUREMENT_ID)
    ? `Configured: ${GOOGLE_ANALYTICS_MEASUREMENT_ID}`
    : 'Add your GA4 Measurement ID in src/analytics.js';
  elements.searchConsoleStatus.textContent = isConfigured(GOOGLE_SEARCH_CONSOLE_VERIFICATION)
    ? 'Verification token is set in the static HTML head.'
    : 'Replace the Google Search Console token in each HTML meta tag.';

  elements.byProduct.innerHTML = renderCountList(summary.byLabel, 'No product clicks tracked yet.');
  elements.byPage.innerHTML = renderCountList(summary.byPage, 'No page clicks tracked yet.');
  elements.eventRows.innerHTML = events.length
    ? events.map(renderEventRow).join('')
    : '<tr><td colspan="4">No tracked affiliate clicks yet. Open a guide and click an Amazon button to populate this dashboard.</td></tr>';
}

function renderCountList(counts, emptyMessage) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return `<p class="empty">${emptyMessage}</p>`;

  return entries
    .map(([label, count]) => `<div class="metric-row"><span>${label}</span><strong>${count}</strong></div>`)
    .join('');
}

function renderEventRow(event) {
  return `
    <tr>
      <td>${formatDate(event.clickedAt)}</td>
      <td>${event.label}</td>
      <td>${pageTitle(event.pagePath)}</td>
      <td><a href="${event.targetUrl}" target="_blank" rel="nofollow sponsored noopener">Open link</a></td>
    </tr>
  `;
}

function pageTitle(path) {
  return seoPages.find((page) => page.path === path)?.heading || path || 'Unknown page';
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}
