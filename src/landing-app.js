import { initGoogleAnalytics, registerClickTracking } from './analytics.js';
import { SITE_NAME, getPageBySlug, getRelatedPages, getRelatedProducts, seoPages } from './seo-pages.js';

initGoogleAnalytics();

const currentSlug = document.body.dataset.page;

renderNavigation();
renderDirectory();

if (currentSlug) {
  renderLandingPage(getPageBySlug(currentSlug));
}

registerClickTracking();

function renderNavigation() {
  const nav = document.querySelector('[data-page-links]');
  if (!nav) return;

  const dashboardLink = `<a href="click-dashboard.html"${currentSlug === 'click-dashboard' ? ' aria-current="page"' : ''}>Click Tracking Dashboard</a>`;
  nav.innerHTML = seoPages
    .map((page) => `<a href="${page.path}"${page.slug === currentSlug ? ' aria-current="page"' : ''}>${page.heading}</a>`)
    .concat(dashboardLink)
    .join('');
}

function renderLandingPage(page) {
  document.querySelector('[data-landing-title]').textContent = page.heading;
  document.querySelector('[data-landing-intro]').textContent = page.intro;
  document.querySelector('[data-updated]').textContent = `Updated ${new Date(page.updated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  document.querySelector('[data-keywords]').innerHTML = page.keywords.map((keyword) => `<span>${keyword}</span>`).join('');

  const productGrid = document.querySelector('[data-product-grid]');
  productGrid.innerHTML = page.products.map(renderProductCard).join('');

  document.querySelector('[data-faq-list]').innerHTML = page.faqs
    .map((faq) => `<details><summary>${faq.question}</summary><p>${faq.answer}</p></details>`)
    .join('');

  document.querySelector('[data-related-links]').innerHTML = getRelatedPages(page)
    .map((related) => `<a href="${related.path}">${related.heading}</a>`)
    .join('');

  const relatedProducts = document.querySelector('[data-related-products]');
  if (relatedProducts) {
    relatedProducts.innerHTML = getRelatedProducts(page).map(renderRelatedProduct).join('');
  }
}

function renderDirectory() {
  const directory = document.querySelector('[data-directory]');
  if (!directory) return;

  directory.innerHTML = seoPages
    .map((page) => `
      <article class="directory-card">
        <p class="eyebrow">${SITE_NAME}</p>
        <h2><a href="${page.path}">${page.heading}</a></h2>
        <p>${page.metaDescription}</p>
        <a class="button-link" href="${page.path}">Open guide</a>
      </article>
    `)
    .concat(`
      <article class="directory-card">
        <p class="eyebrow">Analytics</p>
        <h2><a href="click-dashboard.html">Click Tracking Dashboard</a></h2>
        <p>Review locally tracked Amazon affiliate clicks by product and page while GA4 records live affiliate_click events.</p>
        <a class="button-link" href="click-dashboard.html">Open dashboard</a>
      </article>
    `)
    .join('');
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <div class="image-frame">
        <img src="${product.imageUrl}" alt="${product.title}" loading="lazy" decoding="async" />
      </div>
      <div class="card-body">
        <span class="status">${product.badge}</span>
        <h3>${product.title}</h3>
        <p class="muted">${product.category}</p>
        <p>${product.description}</p>
        <p class="price">${product.priceLabel}</p>
        <div class="actions">
          <a class="button-link primary" href="${product.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener" data-track-click="true" data-track-category="amazon-affiliate" data-track-label="${product.title}">View on Amazon</a>
        </div>
      </div>
    </article>
  `;
}

function renderRelatedProduct(product) {
  return `
    <article class="related-product-card">
      <img src="${product.imageUrl}" alt="${product.title}" loading="lazy" decoding="async" />
      <div>
        <p class="eyebrow">${product.sourceHeading}</p>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <a href="${product.sourcePath}">Read related guide</a>
      </div>
    </article>
  `;
}
