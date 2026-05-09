import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  GOOGLE_SEARCH_CONSOLE_VERIFICATION,
  buildClickEventFromLink,
  getClickSummary,
  isConfigured,
  trackAffiliateClick
} from '../src/analytics.js';

test('analytics placeholders are intentionally not treated as configured', () => {
  assert.equal(isConfigured(GOOGLE_ANALYTICS_MEASUREMENT_ID), false);
  assert.equal(isConfigured(GOOGLE_SEARCH_CONSOLE_VERIFICATION), false);
  assert.equal(isConfigured('G-ABC123DEF4'), true);
});

test('click summary groups events by label and page', () => {
  const events = [
    { label: 'Cable Organizer Clips', pagePath: 'best-gadgets-under-499.html', clickedAt: '2026-05-09T10:00:00.000Z' },
    { label: 'Cable Organizer Clips', pagePath: 'best-gadgets-under-499.html', clickedAt: '2026-05-09T10:01:00.000Z' },
    { label: 'Smart Plug', pagePath: 'best-smart-home-gadgets.html', clickedAt: '2026-05-09T10:02:00.000Z' }
  ];

  const summary = getClickSummary(events);

  assert.equal(summary.totalClicks, 3);
  assert.equal(summary.uniquePages, 2);
  assert.equal(summary.byLabel['Cable Organizer Clips'], 2);
  assert.equal(summary.byPage['best-smart-home-gadgets.html'], 1);
});

test('click tracking is safe during server-side tests', () => {
  const event = trackAffiliateClick({
    pagePath: 'best-gadgets-under-999.html',
    label: 'Fast Charging Cable',
    category: 'amazon-affiliate',
    targetUrl: 'https://www.amazon.in/s?k=fast+charging+cable&tag=technicalco0e-21',
    clickedAt: '2026-05-09T10:00:00.000Z'
  });

  assert.equal(event.label, 'Fast Charging Cable');
  assert.equal(event.category, 'amazon-affiliate');
});

test('click events can be built from tracked links', () => {
  const link = {
    href: 'https://www.amazon.in/s?k=desk+stand&tag=technicalco0e-21',
    textContent: 'View on Amazon',
    dataset: {
      trackLabel: 'Mobile Stand for Desk',
      trackCategory: 'amazon-affiliate'
    }
  };

  const event = buildClickEventFromLink(link, 'best-gadgets-under-499.html');

  assert.equal(event.label, 'Mobile Stand for Desk');
  assert.equal(event.category, 'amazon-affiliate');
  assert.equal(event.pagePath, 'best-gadgets-under-499.html');
});
