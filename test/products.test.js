import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AFFILIATE_TAG,
  PA_API_UNAVAILABLE_MESSAGE,
  buildManualImportProduct,
  createFallbackAsinDraft,
  getMissingRequiredFields,
  getStorefrontProducts,
  isPublishReady,
  parseBulkManualImport,
  publishProduct
} from '../src/products.js';

test('fallback ASIN import creates a hidden draft with PA API guidance', () => {
  const draft = createFallbackAsinDraft(' b0ffbmbpf3 ');

  assert.equal(draft.asin, 'B0FFBMBPF3');
  assert.equal(draft.status, 'draft');
  assert.equal(draft.statusLabel, 'Draft / Needs details');
  assert.equal(draft.title, '');
  assert.equal(draft.priceINR, null);
  assert.equal(draft.imageUrl, '');
  assert.equal(draft.adminMessage, PA_API_UNAVAILABLE_MESSAGE);
  assert.equal(isPublishReady(draft), false);
  assert.equal(getStorefrontProducts([draft]).length, 0);
});

test('product cannot publish until required manual details are filled', () => {
  const draft = createFallbackAsinDraft('B0FFBMBPF3');
  const missingLabels = getMissingRequiredFields(draft).map((field) => field.label);

  assert.deepEqual(missingLabels, [
    'Product title',
    'Amazon product URL',
    'Product image URL or upload',
    'India price ₹',
    'India MRP ₹',
    'Category',
    'Short description'
  ]);
  assert.throws(() => publishProduct(draft), /Cannot publish/);
});

test('publish-ready products get affiliate links and appear on storefront', () => {
  const draft = {
    ...createFallbackAsinDraft('B0FFBMBPF3'),
    title: 'Noise Cancelling Earbuds',
    amazonUrl: 'https://www.amazon.in/dp/B0FFBMBPF3?psc=1',
    imageUrl: 'https://m.media-amazon.com/images/I/example.jpg',
    priceINR: 1499,
    mrpINR: 3999,
    category: 'Audio',
    shortDescription: 'Compact earbuds with long battery life.'
  };

  const published = publishProduct(draft);

  assert.equal(published.status, 'published');
  assert.equal(new URL(published.affiliateUrl).searchParams.get('tag'), AFFILIATE_TAG);
  assert.deepEqual(getStorefrontProducts([published]), [published]);
});

test('zero rupee products stay hidden from storefront even if published', () => {
  const product = {
    ...createFallbackAsinDraft('B0FFBMBPF3'),
    status: 'published',
    statusLabel: 'Published',
    title: 'Incomplete price product',
    amazonUrl: 'https://www.amazon.in/dp/B0FFBMBPF3',
    imageUrl: 'https://m.media-amazon.com/images/I/example.jpg',
    priceINR: 0,
    mrpINR: 3999,
    category: 'Audio',
    shortDescription: 'Should not be visible.'
  };

  assert.equal(getStorefrontProducts([product]).length, 0);
});

test('bulk manual import parses pipe-delimited products as drafts', () => {
  const [row] = parseBulkManualImport(
    'Wireless Earbuds | b0example12 | https://www.amazon.in/dp/B0EXAMPLE12 | https://m.media-amazon.com/images/I/example.jpg | ₹1,299 | ₹2,999 | Audio | Deal'
  );
  const product = buildManualImportProduct(row);

  assert.equal(product.title, 'Wireless Earbuds');
  assert.equal(product.asin, 'B0EXAMPLE12');
  assert.equal(product.priceINR, 1299);
  assert.equal(product.mrpINR, 2999);
  assert.equal(product.category, 'Audio');
  assert.equal(product.badge, 'Deal');
  assert.equal(product.status, 'draft');
  assert.equal(new URL(product.affiliateUrl).searchParams.get('tag'), AFFILIATE_TAG);
});
