export const SITE_NAME = 'GADGETS MELA';
export const AFFILIATE_TAG = 'technicalco0e-21';
export const SITE_ORIGIN = 'https://gadgetsmela.example.com';
export const UPDATED_AT = '2026-05-09';

const imagePalette = {
  budget: ['#fff3d7', '#f59e0b'],
  audio: ['#e0f2fe', '#0284c7'],
  home: ['#dcfce7', '#16a34a'],
  mobile: ['#ede9fe', '#7c3aed'],
  kitchen: ['#fee2e2', '#dc2626'],
  trend: ['#fce7f3', '#db2777'],
  gaming: ['#e0e7ff', '#4f46e5']
};

const commonFaqs = [
  {
    question: 'Do the buttons use affiliate links?',
    answer: 'Yes. Shopping buttons may include an Amazon affiliate tag, which can earn GADGETS MELA a commission at no extra cost to you.'
  },
  {
    question: 'Should I check the current price before buying?',
    answer: 'Yes. Amazon prices, coupons, stock, and delivery dates can change, so verify the live listing before checkout.'
  }
];

function amazonSearchUrl(keyword) {
  const url = new URL('https://www.amazon.in/s');
  url.searchParams.set('k', keyword);
  url.searchParams.set('tag', AFFILIATE_TAG);
  return url.toString();
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/₹/g, 'rs')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function svgImage(label, type = 'budget') {
  const [background, accent] = imagePalette[type] || imagePalette.budget;
  const encoded = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img" aria-label="${label}">
      <rect width="640" height="480" rx="38" fill="${background}"/>
      <circle cx="505" cy="96" r="70" fill="${accent}" opacity="0.18"/>
      <circle cx="114" cy="388" r="86" fill="${accent}" opacity="0.14"/>
      <rect x="132" y="112" width="376" height="240" rx="42" fill="#ffffff" stroke="${accent}" stroke-width="12"/>
      <rect x="196" y="174" width="248" height="34" rx="17" fill="${accent}" opacity="0.75"/>
      <rect x="196" y="236" width="168" height="28" rx="14" fill="#231f20" opacity="0.18"/>
      <text x="320" y="405" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="800" fill="#231f20">${label}</text>
    </svg>
  `);
  return `data:image/svg+xml,${encoded}`;
}

function product(title, description, badge, category, keyword, imageType, price = null) {
  return {
    id: slugify(`${category}-${title}`),
    title,
    description,
    badge,
    category,
    imageUrl: svgImage(title, imageType),
    affiliateUrl: amazonSearchUrl(keyword),
    priceLabel: badge,
    price,
    searchKeyword: keyword
  };
}

const landingProducts = {
  budget499: [
    product('Cable Organizer Clips', 'Tidy chargers, desk wires, and bedside cables without drilling.', 'Under ₹499', 'Desk Setup', 'amazon cable organizer clips under 499', 'budget', 499),
    product('Mobile Stand for Desk', 'A compact stand for video calls, recipes, and hands-free streaming.', 'Value Pick', 'Mobile', 'mobile stand for desk under 499', 'mobile', 499),
    product('USB LED Light', 'Portable light for laptops, power banks, reading corners, and travel bags.', 'Travel Essential', 'Everyday Tech', 'usb led light under 499', 'budget', 499),
    product('Screen Cleaning Kit', 'Keep phones, laptops, tablets, and camera lenses looking fresh.', 'Quick Clean', 'Accessories', 'screen cleaning kit under 499', 'mobile', 499)
  ],
  budget999: [
    product('Fast Charging Cable', 'Durable braided cable options for Android and Type-C devices.', 'Under ₹999', 'Charging', 'fast charging cable under 999', 'mobile', 999),
    product('Mini Power Extension Board', 'Useful for desks, hostels, kitchen counters, and travel stays.', 'Space Saver', 'Home Tech', 'mini extension board under 999', 'home', 999),
    product('Bluetooth Speaker Mini', 'Pocket-friendly speaker choices for small rooms and outdoor plans.', 'Audio Deal', 'Audio', 'mini bluetooth speaker under 999', 'audio', 999),
    product('Rechargeable Table Lamp', 'A simple lighting upgrade for study tables and bedside use.', 'Study Pick', 'Smart Living', 'rechargeable table lamp under 999', 'home', 999)
  ],
  amazonFinds: [
    product('Viral Desk Vacuum', 'A tiny cleaner for keyboards, crumbs, drawers, and study desks.', 'Trending', 'Amazon Finds', 'viral desk vacuum amazon india', 'trend'),
    product('Foldable Travel Hanger', 'Simple travel utility for hostels, hotels, and monsoon drying.', 'Travel Find', 'Amazon Finds', 'foldable travel hanger amazon india', 'trend'),
    product('LED Strip Light', 'An affordable way to upgrade desks, shelves, and TV backlights.', 'Room Upgrade', 'Amazon Finds', 'led strip light amazon india', 'trend'),
    product('3-in-1 Cleaning Brush', 'Clean earbuds, keyboards, laptops, and phone speaker grills.', 'Useful Find', 'Amazon Finds', '3 in 1 cleaning brush amazon india', 'trend')
  ],
  kitchenGadgets: [
    product('Mini Vegetable Chopper', 'Speed up prep for onions, salads, chutneys, and quick snacks.', 'Prep Helper', 'Kitchen', 'mini vegetable chopper india', 'kitchen'),
    product('Digital Kitchen Scale', 'Measure ingredients accurately for baking, diets, and meal prep.', 'Accuracy', 'Kitchen', 'digital kitchen scale india', 'kitchen'),
    product('USB Rechargeable Lighter', 'A flameless upgrade for stoves, candles, and camping kits.', 'Modern Pick', 'Kitchen', 'usb rechargeable lighter india', 'kitchen'),
    product('Oil Dispenser Bottle', 'Control pouring and keep counters cleaner while cooking.', 'Organizer', 'Kitchen', 'oil dispenser bottle kitchen india', 'kitchen')
  ],
  trendingTech: [
    product('GaN Fast Charger', 'Compact high-wattage charging for phones, earbuds, tablets, and office bags.', 'Trending Tech', 'Charging', 'gan fast charger india', 'mobile'),
    product('Bluetooth Item Finder', 'Track keys, wallets, backpacks, and travel pouches from your phone.', 'Smart Utility', 'Everyday Tech', 'bluetooth item finder india', 'trend'),
    product('Portable SSD Case', 'Protect SSDs, cables, memory cards, and adapters in a compact carry pouch.', 'Creator Pick', 'Storage', 'portable ssd case india', 'trend'),
    product('Smart RGB Light Bar', 'Add mood lighting to desks, shelves, streaming corners, and TV units.', 'Setup Upgrade', 'Smart Lighting', 'rgb light bar india', 'gaming')
  ],
  mobileAccessories: [
    product('Tempered Glass Combo', 'Protect phone screens with budget packs for popular models.', 'Protection', 'Mobile', 'tempered glass combo india', 'mobile'),
    product('Magnetic Car Holder', 'Hands-free navigation support for daily city drives.', 'Car Essential', 'Mobile', 'magnetic car mobile holder india', 'mobile'),
    product('Type-C OTG Adapter', 'Move files, connect peripherals, and expand phone utility.', 'Utility', 'Mobile', 'type c otg adapter india', 'mobile'),
    product('20W Charger Options', 'Compact chargers for faster daily top-ups and travel kits.', 'Charging', 'Mobile', '20w charger india', 'mobile')
  ],
  gamingSetup: [
    product('RGB Mouse Pad', 'Brighten a budget desk setup while giving your mouse more glide area.', 'Desk Glow', 'Gaming Setup', 'rgb mouse pad india', 'gaming'),
    product('Laptop Cooling Pad', 'Improve airflow during long gaming, editing, or study sessions.', 'Cooling', 'Gaming Setup', 'laptop cooling pad india', 'gaming'),
    product('Controller Mobile Clip', 'Turn supported controllers into a cleaner mobile gaming setup.', 'Mobile Gaming', 'Gaming Setup', 'controller mobile clip india', 'mobile'),
    product('Headphone Stand', 'Keep gaming headsets, cables, and desk accessories organized.', 'Organizer', 'Gaming Setup', 'headphone stand gaming india', 'gaming')
  ]
};

export const seoPages = [
  page({ slug: 'best-gadgets-under-499', heading: 'Best Gadgets Under ₹499', metaTitle: 'Best Gadgets Under ₹499 in India | GADGETS MELA', metaDescription: 'Discover useful gadgets under ₹499 in India, including mobile stands, cable organisers, USB lights, and cleaning kits with Amazon affiliate picks.', products: landingProducts.budget499, keywords: ['budget gadgets', 'under ₹499', 'amazon india'], discoverAngle: 'small problem-solving gadgets, gifting ideas, and daily-use accessories at impulse-friendly prices' }),
  page({ slug: 'best-gadgets-under-999', heading: 'Best Gadgets Under ₹999', metaTitle: 'Best Gadgets Under ₹999 in India | GADGETS MELA', metaDescription: 'Shop smart gadgets under ₹999 in India across charging, audio, lighting, and everyday utility categories with curated Amazon affiliate links.', products: landingProducts.budget999, keywords: ['gadgets under ₹999', 'daily utility', 'budget tech'], discoverAngle: 'useful upgrades that feel premium without crossing a budget-tech price point' }),
  page({ slug: 'amazon-finds-india', heading: 'Amazon Finds India', metaTitle: 'Amazon Finds India: Useful Viral Products | GADGETS MELA', metaDescription: 'Browse Amazon finds in India, from desk cleaners and LED strips to travel utilities and viral everyday gadgets curated by GADGETS MELA.', products: landingProducts.amazonFinds, keywords: ['amazon finds india', 'viral products', 'useful gadgets'], discoverAngle: 'viral, practical products Indian shoppers can use at home, work, hostels, and while travelling' }),
  page({ slug: 'best-kitchen-gadgets', heading: 'Best Kitchen Gadgets', metaTitle: 'Best Kitchen Gadgets in India | GADGETS MELA', metaDescription: 'Upgrade daily cooking with useful kitchen gadgets in India including choppers, scales, oil dispensers, and rechargeable lighters.', products: landingProducts.kitchenGadgets, keywords: ['kitchen gadgets', 'cooking tools', 'home utility'], discoverAngle: 'quick-prep products that make everyday Indian kitchens faster, cleaner, and easier to organize' }),
  page({ slug: 'trending-tech-products', heading: 'Trending Tech Products', metaTitle: 'Trending Tech Products in India | GADGETS MELA', metaDescription: 'Explore trending tech products in India, including GaN chargers, item finders, RGB lights, and creator-friendly accessories with Amazon links.', products: landingProducts.trendingTech, keywords: ['trending tech products', 'new gadgets india', 'creator tech'], discoverAngle: 'fast-moving tech accessories that work well for creators, students, commuters, and work-from-home setups' }),
  page({ slug: 'best-mobile-accessories', heading: 'Best Mobile Accessories', metaTitle: 'Best Mobile Accessories in India | GADGETS MELA', metaDescription: 'Find practical mobile accessories in India such as chargers, OTG adapters, tempered glass, and car holders curated by GADGETS MELA.', products: landingProducts.mobileAccessories, keywords: ['mobile accessories', 'charging', 'phone protection'], discoverAngle: 'phone upgrades that protect devices, simplify travel, and improve charging or connectivity' }),
  page({ slug: 'gaming-setup-products', heading: 'Gaming Setup Products', metaTitle: 'Gaming Setup Products in India | GADGETS MELA', metaDescription: 'Build a cleaner gaming setup with RGB mouse pads, cooling pads, mobile clips, and headset stands picked for Indian gamers.', products: landingProducts.gamingSetup, keywords: ['gaming setup products', 'rgb setup', 'mobile gaming'], discoverAngle: 'affordable setup upgrades that make desks, laptops, and mobile gaming corners more comfortable' })
];

function page({ slug, heading, metaTitle, metaDescription, products, keywords, discoverAngle }) {
  const faqs = [
    {
      question: `How does GADGETS MELA choose ${heading.toLowerCase()}?`,
      answer: `We focus on practical use cases, buyer intent, budget fit, product quality signals, and categories that are easy to compare on Amazon India.`
    },
    ...commonFaqs
  ];

  return {
    slug,
    path: `${slug}.html`,
    canonicalUrl: `${SITE_ORIGIN}/${slug}.html`,
    heading,
    metaTitle,
    metaDescription,
    keywords,
    products,
    faqs,
    intro: `${heading} curated for Indian shoppers who want useful, giftable, and value-focused gadgets without wasting time scrolling through endless listings.`,
    discoverAngle,
    updated: UPDATED_AT
  };
}

export function getPageBySlug(slug) {
  return seoPages.find((pageData) => pageData.slug === slug) || seoPages[0];
}

export function getRelatedPages(page, limit = 6) {
  return seoPages.filter((related) => related.slug !== page.slug).slice(0, limit);
}

export function getRelatedProducts(page, limit = 4) {
  return getRelatedPages(page, seoPages.length)
    .flatMap((relatedPage) => relatedPage.products.slice(0, 1).map((relatedProduct) => ({
      ...relatedProduct,
      sourceHeading: relatedPage.heading,
      sourcePath: relatedPage.path
    })))
    .slice(0, limit);
}

export function buildFaqSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function buildProductSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${page.heading} product shortlist`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: page.products.length,
    itemListElement: page.products.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.affiliateUrl,
      item: {
        '@type': 'Product',
        name: item.title,
        description: item.description,
        category: item.category,
        image: item.imageUrl,
        sku: item.id,
        brand: {
          '@type': 'Brand',
          name: SITE_NAME
        },
        offers: {
          '@type': 'Offer',
          url: item.affiliateUrl,
          priceCurrency: 'INR',
          ...(item.price ? { price: item.price } : {}),
          availability: 'https://schema.org/InStock'
        }
      }
    }))
  };
}

export function buildArticleSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.metaTitle,
    description: page.metaDescription,
    datePublished: page.updated,
    dateModified: page.updated,
    author: {
      '@type': 'Organization',
      name: SITE_NAME
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME
    },
    mainEntityOfPage: page.canonicalUrl
  };
}
