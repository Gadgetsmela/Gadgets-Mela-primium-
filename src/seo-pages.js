export const SITE_NAME = 'GADGETS MELA';
export const AFFILIATE_TAG = 'technicalco0e-21';

const imagePalette = {
  budget: ['#fff3d7', '#f59e0b'],
  audio: ['#e0f2fe', '#0284c7'],
  home: ['#dcfce7', '#16a34a'],
  mobile: ['#ede9fe', '#7c3aed'],
  kitchen: ['#fee2e2', '#dc2626'],
  trend: ['#fce7f3', '#db2777']
};

function amazonSearchUrl(keyword) {
  const url = new URL('https://www.amazon.in/s');
  url.searchParams.set('k', keyword);
  url.searchParams.set('tag', AFFILIATE_TAG);
  return url.toString();
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

const landingProducts = {
  budget499: [
    product('Cable Organizer Clips', 'Tidy chargers, desk wires, and bedside cables without drilling.', 'Under ₹499', 'Desk Setup', 'amazon cable organizer clips under 499', 'budget'),
    product('Mobile Stand for Desk', 'A compact stand for video calls, recipes, and hands-free streaming.', 'Value Pick', 'Mobile', 'mobile stand for desk under 499', 'mobile'),
    product('USB LED Light', 'Portable light for laptops, power banks, reading corners, and travel bags.', 'Travel Essential', 'Everyday Tech', 'usb led light under 499', 'budget'),
    product('Screen Cleaning Kit', 'Keep phones, laptops, tablets, and camera lenses looking fresh.', 'Quick Clean', 'Accessories', 'screen cleaning kit under 499', 'mobile')
  ],
  budget999: [
    product('Fast Charging Cable', 'Durable braided cable options for Android and Type-C devices.', 'Under ₹999', 'Charging', 'fast charging cable under 999', 'mobile'),
    product('Mini Power Extension Board', 'Useful for desks, hostels, kitchen counters, and travel stays.', 'Space Saver', 'Home Tech', 'mini extension board under 999', 'home'),
    product('Bluetooth Speaker Mini', 'Pocket-friendly speaker choices for small rooms and outdoor plans.', 'Audio Deal', 'Audio', 'mini bluetooth speaker under 999', 'audio'),
    product('Rechargeable Table Lamp', 'A simple lighting upgrade for study tables and bedside use.', 'Study Pick', 'Smart Living', 'rechargeable table lamp under 999', 'home')
  ],
  earbuds999: [
    product('Low-Latency Earbuds', 'Entry-level earbuds for calls, reels, casual gaming, and workouts.', 'Under ₹999', 'Audio', 'low latency earbuds under 999', 'audio'),
    product('ENC Calling Earbuds', 'Budget earbuds focused on clearer calling in everyday conditions.', 'Calling Pick', 'Audio', 'enc calling earbuds under 999', 'audio'),
    product('Bass-Focused Earbuds', 'Affordable true wireless options for playlists, movies, and commutes.', 'Bass Pick', 'Audio', 'bass earbuds under 999', 'audio'),
    product('Compact Case Earbuds', 'Small charging cases that fit easily in jeans and sling bags.', 'Pocket Fit', 'Audio', 'compact earbuds under 999 india', 'audio')
  ],
  smartHome: [
    product('Smart Plug', 'Turn lamps, chargers, and appliances into app-controlled routines.', 'Automation', 'Smart Home', 'smart plug india', 'home'),
    product('Wi-Fi Smart Bulb', 'Change brightness and colours from your phone or voice assistant.', 'Lighting', 'Smart Home', 'wifi smart bulb india', 'home'),
    product('Motion Sensor Light', 'Add automatic lighting to wardrobes, staircases, and hallways.', 'Safety Pick', 'Smart Home', 'motion sensor light india', 'home'),
    product('Video Doorbell Options', 'Compare connected doorbell choices for apartments and independent homes.', 'Security', 'Smart Home', 'video doorbell india', 'home')
  ],
  mobileAccessories: [
    product('Tempered Glass Combo', 'Protect phone screens with budget packs for popular models.', 'Protection', 'Mobile', 'tempered glass combo india', 'mobile'),
    product('Magnetic Car Holder', 'Hands-free navigation support for daily city drives.', 'Car Essential', 'Mobile', 'magnetic car mobile holder india', 'mobile'),
    product('Type-C OTG Adapter', 'Move files, connect peripherals, and expand phone utility.', 'Utility', 'Mobile', 'type c otg adapter india', 'mobile'),
    product('20W Charger Options', 'Compact chargers for faster daily top-ups and travel kits.', 'Charging', 'Mobile', '20w charger india', 'mobile')
  ],
  kitchenGadgets: [
    product('Mini Vegetable Chopper', 'Speed up prep for onions, salads, chutneys, and quick snacks.', 'Prep Helper', 'Kitchen', 'mini vegetable chopper india', 'kitchen'),
    product('Digital Kitchen Scale', 'Measure ingredients accurately for baking, diets, and meal prep.', 'Accuracy', 'Kitchen', 'digital kitchen scale india', 'kitchen'),
    product('USB Rechargeable Lighter', 'A flameless upgrade for stoves, candles, and camping kits.', 'Modern Pick', 'Kitchen', 'usb rechargeable lighter india', 'kitchen'),
    product('Oil Dispenser Bottle', 'Control pouring and keep counters cleaner while cooking.', 'Organizer', 'Kitchen', 'oil dispenser bottle kitchen india', 'kitchen')
  ],
  amazonFinds: [
    product('Viral Desk Vacuum', 'A tiny cleaner for keyboards, crumbs, drawers, and study desks.', 'Trending', 'Amazon Finds', 'viral desk vacuum amazon india', 'trend'),
    product('Foldable Travel Hanger', 'Simple travel utility for hostels, hotels, and monsoon drying.', 'Travel Find', 'Amazon Finds', 'foldable travel hanger amazon india', 'trend'),
    product('LED Strip Light', 'An affordable way to upgrade desks, shelves, and TV backlights.', 'Room Upgrade', 'Amazon Finds', 'led strip light amazon india', 'trend'),
    product('3-in-1 Cleaning Brush', 'Clean earbuds, keyboards, laptops, and phone speaker grills.', 'Useful Find', 'Amazon Finds', '3 in 1 cleaning brush amazon india', 'trend')
  ]
};

function product(title, description, badge, category, keyword, imageType) {
  return {
    title,
    description,
    badge,
    category,
    imageUrl: svgImage(title, imageType),
    affiliateUrl: amazonSearchUrl(keyword),
    priceLabel: badge
  };
}

export const seoPages = [
  page('best-gadgets-under-499', 'Best Gadgets Under ₹499', 'Best Gadgets Under ₹499 in India | GADGETS MELA', 'Discover useful gadgets under ₹499 in India, including mobile stands, cable organisers, USB lights, and cleaning kits with Amazon affiliate picks.', landingProducts.budget499, ['budget gadgets', 'under ₹499', 'amazon india']),
  page('best-gadgets-under-999', 'Best Gadgets Under ₹999', 'Best Gadgets Under ₹999 in India | GADGETS MELA', 'Shop smart gadgets under ₹999 in India across charging, audio, lighting, and everyday utility categories with curated Amazon affiliate links.', landingProducts.budget999, ['gadgets under ₹999', 'daily utility', 'budget tech']),
  page('best-earbuds-under-999', 'Best Earbuds Under ₹999', 'Best Earbuds Under ₹999 in India | GADGETS MELA', 'Compare budget earbuds under ₹999 in India for calls, bass, compact cases, and casual gaming with quick Amazon shopping links.', landingProducts.earbuds999, ['earbuds under ₹999', 'budget audio', 'wireless earbuds']),
  page('best-smart-home-gadgets', 'Best Smart Home Gadgets', 'Best Smart Home Gadgets in India | GADGETS MELA', 'Explore smart home gadgets in India including smart plugs, Wi-Fi bulbs, sensor lights, and connected security picks for easy automation.', landingProducts.smartHome, ['smart home', 'automation', 'wifi gadgets']),
  page('best-mobile-accessories', 'Best Mobile Accessories', 'Best Mobile Accessories in India | GADGETS MELA', 'Find practical mobile accessories in India such as chargers, OTG adapters, tempered glass, and car holders curated by GADGETS MELA.', landingProducts.mobileAccessories, ['mobile accessories', 'charging', 'phone protection']),
  page('best-kitchen-gadgets', 'Best Kitchen Gadgets', 'Best Kitchen Gadgets in India | GADGETS MELA', 'Upgrade daily cooking with useful kitchen gadgets in India including choppers, scales, oil dispensers, and rechargeable lighters.', landingProducts.kitchenGadgets, ['kitchen gadgets', 'cooking tools', 'home utility']),
  page('trending-amazon-finds-india', 'Trending Amazon Finds India', 'Trending Amazon Finds India | GADGETS MELA', 'Browse trending Amazon finds in India, from desk cleaners and LED strips to travel utilities and viral everyday gadgets.', landingProducts.amazonFinds, ['amazon finds india', 'trending gadgets', 'viral products'])
];

function page(slug, heading, metaTitle, metaDescription, products, keywords) {
  const faqs = [
    {
      question: `How does GADGETS MELA choose ${heading.toLowerCase()}?`,
      answer: 'We focus on practical use cases, buyer intent, budget fit, and product categories that are easy to compare on Amazon India.'
    },
    {
      question: 'Do the buttons use affiliate links?',
      answer: 'Yes. Shopping buttons may include an Amazon affiliate tag, which can earn GADGETS MELA a commission at no extra cost to you.'
    },
    {
      question: 'Should I check the current price before buying?',
      answer: 'Yes. Amazon prices, coupons, stock, and delivery dates can change, so verify the live listing before checkout.'
    }
  ];

  return {
    slug,
    path: `${slug}.html`,
    heading,
    metaTitle,
    metaDescription,
    keywords,
    products,
    faqs,
    intro: `${heading} curated for Indian shoppers who want useful, giftable, and value-focused gadgets without wasting time scrolling through endless listings.`,
    updated: '2026-05-09'
  };
}

export function getPageBySlug(slug) {
  return seoPages.find((pageData) => pageData.slug === slug) || seoPages[0];
}
