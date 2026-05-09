import { writeFileSync } from 'node:fs';
import {
  SITE_NAME,
  buildArticleSchema,
  buildFaqSchema,
  buildProductSchema,
  getRelatedPages,
  getRelatedProducts,
  seoPages
} from '../src/seo-pages.js';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2).replace(/</g, '\\u003c')}</script>`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function navHtml(currentSlug = '') {
  return seoPages
    .map((page) => `<a href="${page.path}"${page.slug === currentSlug ? ' aria-current="page"' : ''}>${escapeHtml(page.heading)}</a>`)
    .concat(`<a href="click-dashboard.html"${currentSlug === 'click-dashboard' ? ' aria-current="page"' : ''}>Click Tracking Dashboard</a>`)
    .join('');
}

function productCard(product) {
  return `
          <article class="product-card">
            <div class="image-frame">
              <img src="${product.imageUrl}" alt="${escapeHtml(product.title)}" loading="lazy" decoding="async" />
            </div>
            <div class="card-body">
              <span class="status">${escapeHtml(product.badge)}</span>
              <h3>${escapeHtml(product.title)}</h3>
              <p class="muted">${escapeHtml(product.category)}</p>
              <p>${escapeHtml(product.description)}</p>
              <p class="price">${escapeHtml(product.priceLabel)}</p>
              <div class="actions">
                <a class="button-link primary" href="${escapeHtml(product.affiliateUrl)}" target="_blank" rel="nofollow sponsored noopener" data-track-click="true" data-track-category="amazon-affiliate" data-track-label="${escapeHtml(product.title)}">View on Amazon</a>
              </div>
            </div>
          </article>`;
}

function relatedProductCard(product) {
  return `
          <article class="related-product-card">
            <img src="${product.imageUrl}" alt="${escapeHtml(product.title)}" loading="lazy" decoding="async" />
            <div>
              <p class="eyebrow">${escapeHtml(product.sourceHeading)}</p>
              <h3>${escapeHtml(product.title)}</h3>
              <p>${escapeHtml(product.description)}</p>
              <a href="${escapeHtml(product.sourcePath)}">Read related guide</a>
            </div>
          </article>`;
}

function faqHtml(page) {
  return page.faqs
    .map((faq) => `<details><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`)
    .join('');
}

function relatedLinksHtml(page) {
  return getRelatedPages(page)
    .map((related) => `<a href="${related.path}">${escapeHtml(related.heading)}</a>`)
    .join('');
}

function landingPageHtml(page) {
  return `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="google-site-verification" content="replace-with-your-google-search-console-token" />
    <title>${escapeHtml(page.metaTitle)}</title>
    <meta name="description" content="${escapeHtml(page.metaDescription)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escapeHtml(page.metaTitle)}" />
    <meta property="og:description" content="${escapeHtml(page.metaDescription)}" />
    <meta property="article:modified_time" content="${page.updated}" />
    <link rel="canonical" href="${page.path}" />
    <link rel="stylesheet" href="src/styles.css" />
    ${jsonLd(buildArticleSchema(page))}
    ${jsonLd(buildFaqSchema(page))}
    ${jsonLd(buildProductSchema(page))}
  </head>
  <body data-page="${page.slug}">
    <header class="site-header landing-hero">
      <nav class="top-nav" aria-label="SEO landing pages" data-page-links>${navHtml(page.slug)}</nav>
      <div class="hero-grid">
        <div>
          <p class="eyebrow">${SITE_NAME}</p>
          <h1 data-landing-title>${escapeHtml(page.heading)}</h1>
          <p data-landing-intro>${escapeHtml(page.intro)}</p>
          <p class="updated" data-updated>Updated ${formatDate(page.updated)}</p>
        </div>
        <aside class="hero-card">
          <h2>Why this guide?</h2>
          <p>${escapeHtml(page.discoverAngle)}. Built as a quick, scannable guide for Google Discover and mobile shoppers.</p>
          <div class="keyword-pills" data-keywords>${page.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join('')}</div>
        </aside>
      </div>
    </header>

    <main class="layout landing-layout">
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Curated picks</p>
            <h2>Recommended products and categories</h2>
            <p class="muted">Prices and availability can change on Amazon India. Always check the live listing before buying.</p>
          </div>
        </div>
        <div class="card-grid" data-product-grid>${page.products.map(productCard).join('')}
        </div>
      </section>

      <section class="panel wide seo-copy">
        <h2>How to choose ${escapeHtml(page.heading.toLowerCase())}</h2>
        <p>Start with the problem you want to solve: charging, organization, audio, cooking, gaming, travel, or gifting. Then compare warranty, verified reviews, replacement policy, and whether the product supports Indian plugs, voltages, and phone models.</p>
        <p>${SITE_NAME} keeps these pages focused on buyer-friendly categories, internal links, fast SVG placeholders, and structured data so shoppers and search engines can understand each article quickly.</p>
      </section>

      <section class="panel wide related-products-panel">
        <h2>Auto related products</h2>
        <p class="muted">These suggestions are pulled automatically from other ${SITE_NAME} guides to keep visitors exploring relevant products.</p>
        <div class="related-product-grid" data-related-products>${getRelatedProducts(page).map(relatedProductCard).join('')}
        </div>
      </section>

      <section class="panel faq-panel">
        <h2>FAQs</h2>
        <div class="faq-list" data-faq-list>${faqHtml(page)}</div>
      </section>

      <section class="panel related-panel">
        <h2>Internal links</h2>
        <div class="related-links" data-related-links>${relatedLinksHtml(page)}</div>
      </section>
    </main>

    <footer class="site-footer">
      <p>As an Amazon Associate, ${SITE_NAME} may earn from qualifying purchases.</p>
      <a href="index.html">All landing pages</a>
    </footer>
    <script type="module" src="src/landing-app.js"></script>
  </body>
</html>
`;
}

function directoryHtml() {
  return `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="google-site-verification" content="replace-with-your-google-search-console-token" />
    <title>${SITE_NAME} SEO Article Hub</title>
    <meta name="description" content="Browse ${SITE_NAME} SEO articles for budget gadgets, Amazon finds India, kitchen gadgets, trending tech, mobile accessories, and gaming setup products." />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="stylesheet" href="src/styles.css" />
  </head>
  <body>
    <header class="site-header landing-hero">
      <nav class="top-nav" aria-label="SEO landing pages" data-page-links>${navHtml()}</nav>
      <div>
        <p class="eyebrow">${SITE_NAME}</p>
        <h1>Automatic SEO article hub for Amazon India gadget shoppers</h1>
        <p>Choose a guide to browse curated product cards, affiliate shopping buttons, FAQs, product schema, and internal links.</p>
      </div>
    </header>
    <main class="layout landing-layout">
      <section class="panel wide">
        <h2>All guides</h2>
        <div class="directory-grid" data-directory>
          ${seoPages.map((page) => `
          <article class="directory-card">
            <p class="eyebrow">${SITE_NAME}</p>
            <h2><a href="${page.path}">${escapeHtml(page.heading)}</a></h2>
            <p>${escapeHtml(page.metaDescription)}</p>
            <a class="button-link" href="${page.path}">Open guide</a>
          </article>`).join('')}
          <article class="directory-card">
            <p class="eyebrow">Analytics</p>
            <h2><a href="click-dashboard.html">Click Tracking Dashboard</a></h2>
            <p>Review locally tracked Amazon affiliate clicks by product and page while GA4 records live affiliate_click events.</p>
            <a class="button-link" href="click-dashboard.html">Open dashboard</a>
          </article>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <p>As an Amazon Associate, ${SITE_NAME} may earn from qualifying purchases.</p>
    </footer>
    <script type="module" src="src/landing-app.js"></script>
  </body>
</html>
`;
}

for (const page of seoPages) {
  writeFileSync(page.path, landingPageHtml(page));
}

writeFileSync('index.html', directoryHtml());
