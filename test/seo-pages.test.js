import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { seoPages, AFFILIATE_TAG } from '../src/seo-pages.js';

test('all requested SEO landing pages are configured', () => {
  assert.deepEqual(
    seoPages.map((page) => page.heading),
    [
      'Best Gadgets Under ₹499',
      'Best Gadgets Under ₹999',
      'Best Earbuds Under ₹999',
      'Best Smart Home Gadgets',
      'Best Mobile Accessories',
      'Best Kitchen Gadgets',
      'Trending Amazon Finds India'
    ]
  );
});

test('landing page data includes product cards, affiliate URLs, FAQs, and internal paths', () => {
  for (const page of seoPages) {
    assert.equal(page.path.endsWith('.html'), true);
    assert.ok(page.metaTitle.includes('GADGETS MELA'));
    assert.ok(page.metaDescription.length > 80);
    assert.equal(page.faqs.length, 3);
    assert.equal(page.products.length >= 4, true);

    for (const product of page.products) {
      const url = new URL(product.affiliateUrl);
      assert.equal(url.hostname, 'www.amazon.in');
      assert.equal(url.searchParams.get('tag'), AFFILIATE_TAG);
      assert.ok(product.title);
      assert.ok(product.imageUrl.startsWith('data:image/svg+xml'));
    }
  }
});

test('generated HTML files expose SEO metadata and FAQ schema', () => {
  for (const page of seoPages) {
    const html = readFileSync(page.path, 'utf8');
    assert.match(html, new RegExp(`<title>${escapeRegExp(page.metaTitle)}</title>`));
    assert.match(html, /<meta name="description"/);
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /FAQPage/);
    assert.match(html, /data-product-grid/);
    assert.match(html, /data-related-links/);
  }
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
