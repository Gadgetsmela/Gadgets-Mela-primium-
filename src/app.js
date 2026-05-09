import {
  PA_API_UNAVAILABLE_MESSAGE,
  buildManualImportProduct,
  createFallbackAsinDraft,
  getMissingRequiredFields,
  getStorefrontProducts,
  isPublishReady,
  parseBulkManualImport,
  publishProduct
} from './products.js';

const state = {
  products: []
};

const elements = {
  asinForm: document.querySelector('#asin-import-form'),
  asinInput: document.querySelector('#asin-input'),
  bulkForm: document.querySelector('#bulk-import-form'),
  bulkInput: document.querySelector('#bulk-input'),
  draftList: document.querySelector('#draft-list'),
  storefrontList: document.querySelector('#storefront-list'),
  template: document.querySelector('#product-card-template'),
  dialog: document.querySelector('#edit-dialog'),
  closeEditor: document.querySelector('#close-editor'),
  saveEditor: document.querySelector('#save-editor'),
  imagePreview: document.querySelector('#image-preview'),
  imagePreviewPlaceholder: document.querySelector('#image-preview-placeholder'),
  edit: {
    id: document.querySelector('#edit-id'),
    title: document.querySelector('#edit-title'),
    amazonUrl: document.querySelector('#edit-amazon-url'),
    imageUrl: document.querySelector('#edit-image-url'),
    imageUpload: document.querySelector('#edit-image-upload'),
    price: document.querySelector('#edit-price'),
    mrp: document.querySelector('#edit-mrp'),
    category: document.querySelector('#edit-category'),
    badge: document.querySelector('#edit-badge'),
    shortDescription: document.querySelector('#edit-description')
  }
};

elements.asinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const draft = createFallbackAsinDraft(elements.asinInput.value);
  state.products.unshift(draft);
  elements.asinInput.value = '';
  render();
});

elements.bulkForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const products = parseBulkManualImport(elements.bulkInput.value).map(buildManualImportProduct);
  state.products.unshift(...products);
  elements.bulkInput.value = '';
  render();
});

elements.closeEditor.addEventListener('click', () => elements.dialog.close());
elements.saveEditor.addEventListener('click', saveEditor);
elements.edit.imageUrl.addEventListener('input', updateImagePreview);
elements.edit.imageUpload.addEventListener('change', handleUploadPreview);

function render() {
  renderProductList(elements.draftList, state.products.filter((product) => product.status !== 'published'), true);
  renderProductList(elements.storefrontList, getStorefrontProducts(state.products), false);
}

function renderProductList(container, products, showDraftControls) {
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = `<p class="empty">${showDraftControls ? 'No draft products yet.' : 'No published products are eligible for storefront display.'}</p>`;
    return;
  }

  for (const product of products) {
    const card = elements.template.content.cloneNode(true);
    const image = card.querySelector('[data-field="image"]');
    const imagePlaceholder = card.querySelector('[data-field="imagePlaceholder"]');
    const publishButton = card.querySelector('[data-action="publish"]');
    const editButton = card.querySelector('[data-action="edit"]');
    const missingFields = getMissingRequiredFields(product);
    const displayImage = product.uploadedImageDataUrl || product.imageUrl;

    card.querySelector('[data-field="status"]').textContent = product.statusLabel;
    card.querySelector('[data-field="title"]').textContent = product.title || 'Needs product title';
    card.querySelector('[data-field="asin"]').textContent = product.asin ? `ASIN: ${product.asin}` : 'Manual product';
    card.querySelector('[data-field="message"]').textContent = product.paApiAvailable === false ? PA_API_UNAVAILABLE_MESSAGE : '';
    card.querySelector('[data-field="price"]').textContent = Number(product.priceINR) > 0 ? `₹${Number(product.priceINR).toLocaleString('en-IN')}` : 'Price required';
    card.querySelector('[data-field="missing"]').textContent = missingFields.length ? `Needs: ${missingFields.map((field) => field.label).join(', ')}` : 'Ready to publish';

    image.hidden = !displayImage;
    imagePlaceholder.hidden = Boolean(displayImage);
    if (displayImage) image.src = displayImage;

    if (showDraftControls) {
      editButton.addEventListener('click', () => openEditor(product.id));
      publishButton.hidden = !isPublishReady(product);
      publishButton.addEventListener('click', () => publishDraft(product.id));
    } else {
      editButton.hidden = true;
      publishButton.hidden = true;
    }

    container.append(card);
  }
}

function openEditor(productId) {
  const product = findProduct(productId);
  elements.edit.id.value = product.id;
  elements.edit.title.value = product.title || '';
  elements.edit.amazonUrl.value = product.amazonUrl || '';
  elements.edit.imageUrl.value = product.imageUrl || '';
  elements.edit.imageUpload.value = '';
  elements.edit.price.value = product.priceINR || '';
  elements.edit.mrp.value = product.mrpINR || '';
  elements.edit.category.value = product.category || '';
  elements.edit.badge.value = product.badge || '';
  elements.edit.shortDescription.value = product.shortDescription || '';
  setPreview(product.uploadedImageDataUrl || product.imageUrl);
  elements.dialog.showModal();
}

function saveEditor() {
  const product = findProduct(elements.edit.id.value);
  Object.assign(product, {
    title: elements.edit.title.value.trim(),
    amazonUrl: elements.edit.amazonUrl.value.trim(),
    imageUrl: elements.edit.imageUrl.value.trim(),
    priceINR: Number(elements.edit.price.value) || null,
    mrpINR: Number(elements.edit.mrp.value) || null,
    category: elements.edit.category.value.trim(),
    badge: elements.edit.badge.value.trim(),
    shortDescription: elements.edit.shortDescription.value.trim(),
    status: 'draft',
    statusLabel: 'Draft / Needs details'
  });

  if (elements.imagePreview.dataset.uploadedDataUrl) {
    product.uploadedImageDataUrl = elements.imagePreview.dataset.uploadedDataUrl;
  }

  elements.dialog.close();
  render();
}

function publishDraft(productId) {
  const index = state.products.findIndex((product) => product.id === productId);
  state.products[index] = publishProduct(state.products[index]);
  render();
}

function updateImagePreview() {
  delete elements.imagePreview.dataset.uploadedDataUrl;
  setPreview(elements.edit.imageUrl.value.trim());
}

function handleUploadPreview() {
  const [file] = elements.edit.imageUpload.files;
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    elements.imagePreview.dataset.uploadedDataUrl = reader.result;
    setPreview(reader.result);
  });
  reader.readAsDataURL(file);
}

function setPreview(src) {
  elements.imagePreview.hidden = !src;
  elements.imagePreviewPlaceholder.hidden = Boolean(src);
  if (src) elements.imagePreview.src = src;
}

function findProduct(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) throw new Error(`Product not found: ${productId}`);
  return product;
}

render();
