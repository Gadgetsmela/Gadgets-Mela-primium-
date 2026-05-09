export const AFFILIATE_TAG = 'technicalco0e-21';

export const REQUIRED_FIELDS = [
  { key: 'title', label: 'Product title' },
  { key: 'amazonUrl', label: 'Amazon product URL' },
  { key: 'imageUrl', label: 'Product image URL or upload' },
  { key: 'priceINR', label: 'India price ₹' },
  { key: 'mrpINR', label: 'India MRP ₹' },
  { key: 'category', label: 'Category' },
  { key: 'shortDescription', label: 'Short description' }
];

export const PA_API_UNAVAILABLE_MESSAGE =
  'PA API unavailable. Please add title, image, and price manually before publishing.';

export function normalizeAsin(asin) {
  return String(asin || '').trim().toUpperCase();
}

export function generateAmazonAffiliateUrl({ asin, amazonUrl }) {
  const rawUrl = String(amazonUrl || '').trim();
  const normalizedAsin = normalizeAsin(asin);
  const baseUrl = rawUrl || (normalizedAsin ? `https://www.amazon.in/dp/${normalizedAsin}` : 'https://www.amazon.in/');
  const url = new URL(baseUrl);

  if (!/(^|\.)amazon\.in$/.test(url.hostname)) {
    throw new Error('Amazon product URL must be an amazon.in domain.');
  }

  url.searchParams.set('tag', AFFILIATE_TAG);
  return url.toString();
}

export function createFallbackAsinDraft(asin) {
  const normalizedAsin = normalizeAsin(asin);

  if (!normalizedAsin) {
    throw new Error('ASIN is required.');
  }

  return {
    id: cryptoSafeId(),
    asin: normalizedAsin,
    title: '',
    amazonUrl: '',
    affiliateUrl: generateAmazonAffiliateUrl({ asin: normalizedAsin }),
    imageUrl: '',
    uploadedImageDataUrl: '',
    priceINR: null,
    mrpINR: null,
    category: '',
    badge: '',
    shortDescription: '',
    status: 'draft',
    statusLabel: 'Draft / Needs details',
    paApiAvailable: false,
    adminMessage: PA_API_UNAVAILABLE_MESSAGE,
    createdAt: new Date().toISOString()
  };
}

export function getMissingRequiredFields(product) {
  return REQUIRED_FIELDS.filter((field) => !hasRequiredValue(product, field.key));
}

export function isPublishReady(product) {
  return getMissingRequiredFields(product).length === 0;
}

export function publishProduct(product) {
  if (!isPublishReady(product)) {
    const missing = getMissingRequiredFields(product).map((field) => field.label).join(', ');
    throw new Error(`Cannot publish until required fields are complete: ${missing}`);
  }

  return {
    ...product,
    affiliateUrl: generateAmazonAffiliateUrl(product),
    status: 'published',
    statusLabel: 'Published',
    publishedAt: new Date().toISOString()
  };
}

export function getStorefrontProducts(products) {
  return products.filter(
    (product) =>
      product.status === 'published' &&
      Number(product.priceINR) > 0 &&
      isPublishReady(product)
  );
}

export function parseBulkManualImport(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map(parseBulkLine);
}

export function buildManualImportProduct(row) {
  const asin = normalizeAsin(row.asin);
  const product = {
    id: cryptoSafeId(),
    asin,
    title: row.title.trim(),
    amazonUrl: row.amazonUrl.trim(),
    imageUrl: row.imageUrl.trim(),
    uploadedImageDataUrl: '',
    priceINR: parseCurrency(row.priceINR),
    mrpINR: parseCurrency(row.mrpINR),
    category: row.category.trim(),
    badge: row.badge.trim(),
    shortDescription: '',
    status: 'draft',
    statusLabel: 'Draft / Needs details',
    paApiAvailable: false,
    adminMessage: PA_API_UNAVAILABLE_MESSAGE,
    createdAt: new Date().toISOString()
  };

  product.affiliateUrl = generateAmazonAffiliateUrl(product);
  return product;
}

function parseBulkLine(line) {
  const [title = '', asin = '', amazonUrl = '', imageUrl = '', priceINR = '', mrpINR = '', category = '', badge = ''] =
    line.split('|').map((part) => part.trim());

  return { title, asin, amazonUrl, imageUrl, priceINR, mrpINR, category, badge };
}

function parseCurrency(value) {
  const cleaned = String(value || '').replace(/[^0-9.]/g, '');
  if (!cleaned) return null;
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function hasRequiredValue(product, key) {
  if (key === 'priceINR' || key === 'mrpINR') {
    return Number(product[key]) > 0;
  }

  if (key === 'imageUrl') {
    return Boolean(String(product.imageUrl || product.uploadedImageDataUrl || '').trim());
  }

  return Boolean(String(product[key] || '').trim());
}

function cryptoSafeId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `product-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
