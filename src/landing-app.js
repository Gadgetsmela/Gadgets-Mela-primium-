import { initGoogleAnalytics, registerClickTracking } from './analytics.js';
import { SITE_NAME, getPageBySlug, seoPages } from './seo-pages.js';

const pageSlug = document.body.dataset.page;
const currentPage = pageSlug ? getPageBySlug(pageSlug) : null;
const formatLinks = (page) => page.path;
const dashboardLink = '<a href="click-dashboard.html">Click Tracking Dashboard</a>';

initGoogleAnalytics();
registerClickTracking();

renderNavigation();

if (currentPage) {
  renderLandingPage(currentPage);
} else {
  renderDirectory();
}

function renderNavigation() {
  const nav = document.querySelector('[data-page-links]');
  if (!nav) return;

  nav.innerHTML = seoPages
    .map((page) => `<a href="${formatLinks(page)}"${page.slug === pageSlug ? ' aria-current="page"' : ''}>${page.heading}</a>`)
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

  document.querySelector('[data-related-links]').innerHTML = seoPages
    .filter((related) => related.slug !== page.slug)
    .slice(0, 6)
    .map((related) => `<a href="${related.path}">${related.heading}</a>`)
    .join('');
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
        <img src="${product.imageUrl}" alt="${product.title}" loading="lazy" />
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
