const chairProducts = [
  { id: 'revolt-chair', name: 'Revolt chair', price: 275, maker: 'Form & Field', color: 'Ivory', material: 'Metal', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85', alt: 'Light molded chair with slender dark legs', badge: 'New', href: '../../product/revolt/index.html' },
  { id: 'morrow-lounge', name: 'Morrow lounge chair', price: 480, maker: 'Atelier Noma', color: 'Olive', material: 'Upholstery', image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85', alt: 'Sculptural lounge chair upholstered in a soft neutral fabric' },
  { id: 'linden-dining', name: 'Linden dining chair', price: 510, maker: 'Juniper Studio', color: 'Natural', material: 'Wood', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85', alt: 'Warm oak dining chair with an arched back' },
  { id: 'soren-chair', name: 'Soren occasional chair', price: 390, maker: 'Alder Works', color: 'Ivory', material: 'Upholstery', image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85', alt: 'Relaxed upholstered chair in a light-filled room' },
  { id: 'field-side-chair', name: 'Field side chair', price: 330, maker: 'Form & Field', color: 'Natural', material: 'Wood', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85', alt: 'Simple wood chair with a softly rounded seat' },
  { id: 'studio-armchair', name: 'Studio armchair', price: 860, maker: 'Atelier Noma', color: 'Charcoal', material: 'Metal', image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85', alt: 'Contemporary armchair with a dark sculptural frame' },
  { id: 'rowan-chair', name: 'Rowan chair', price: 625, maker: 'Juniper Studio', color: 'Olive', material: 'Upholstery', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85', alt: 'Olive upholstered chair in a calm interior' },
  { id: 'curve-dining', name: 'Curve dining chair', price: 420, maker: 'Form & Field', color: 'Natural', material: 'Wood', image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85', alt: 'Curved wood-frame chair beside a dining table' },
  { id: 'haven-chair', name: 'Haven chair', price: 740, maker: 'Alder Works', color: 'Charcoal', material: 'Upholstery', image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85', alt: 'Deep charcoal lounge chair with generous cushions' },
  { id: 'alto-chair', name: 'Alto dining chair', price: 350, maker: 'Juniper Studio', color: 'Ivory', material: 'Metal', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85', alt: 'Light-toned dining chair with a minimal profile' },
  { id: 'noma-chair', name: 'Noma wood chair', price: 590, maker: 'Atelier Noma', color: 'Natural', material: 'Wood', image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85', alt: 'Natural wood chair with a woven, tactile seat' },
  { id: 'everyday-chair', name: 'Everyday chair', price: 295, maker: 'Form & Field', color: 'Olive', material: 'Wood', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85', alt: 'Everyday dining chair in a muted green finish' }
];

const catalogGrid = document.querySelector('.catalog-grid');
const catalogCount = document.querySelector('.catalog-count');
const priceRange = document.querySelector('#price-range');
const priceOutput = document.querySelector('#price-output');
const sortSelect = document.querySelector('#sort-products');
const savedChairs = new Set();
let showSavedOnly = false;

function selectedFilters(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value);
}

function getVisibleChairs() {
  const brands = selectedFilters('brand');
  const colors = selectedFilters('color');
  const materials = selectedFilters('material');
  const maxPrice = Number(priceRange.value);
  const result = chairProducts.filter(product =>
    product.price <= maxPrice &&
    (!brands.length || brands.includes(product.maker)) &&
    (!colors.length || colors.includes(product.color)) &&
    (!materials.length || materials.includes(product.material)) &&
    (!showSavedOnly || savedChairs.has(product.id))
  );
  const sort = sortSelect.value;
  if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
  if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

function renderChairs() {
  const visible = getVisibleChairs();
  catalogCount.textContent = showSavedOnly
    ? `${visible.length} saved ${visible.length === 1 ? 'piece' : 'pieces'}`
    : `Showing ${visible.length} thoughtful ${visible.length === 1 ? 'piece' : 'pieces'}`;
  catalogGrid.innerHTML = visible.length ? visible.map((product, index) => `
    <article class="product-card catalog-card">
      <div class="product-image-wrap">
        ${product.href ? `<a class="product-image-link" href="${product.href}"><img class="product-image" src="${product.image}" alt="${product.alt}" loading="${index < 3 ? 'eager' : 'lazy'}" fetchpriority="${index === 0 ? 'high' : 'auto'}"></a>` : `<img class="product-image" src="${product.image}" alt="${product.alt}" loading="${index < 3 ? 'eager' : 'lazy'}">`}
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button class="favorite-button${savedChairs.has(product.id) ? ' is-favorite' : ''}" type="button" aria-label="${savedChairs.has(product.id) ? 'Remove' : 'Save'} ${product.name}" aria-pressed="${savedChairs.has(product.id)}" data-save="${product.id}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" /></svg>
        </button>
        <button class="quick-add" type="button" data-add="${product.id}">Add to cart <span aria-hidden="true">+</span></button>
      </div>
      <div class="product-info">
        <h2 class="product-name">${product.href ? `<a href="${product.href}">${product.name}</a>` : product.name}</h2>
        <p class="product-category">${product.maker} · ${product.material}</p>
        <p class="product-price">$${product.price.toLocaleString('en-US')}.00</p>
      </div>
    </article>
  `).join('') : '<p class="catalog-empty">No chairs match these filters. Try clearing one to see more of the collection.</p>';
}

document.querySelector('.catalog-sidebar').addEventListener('change', event => {
  if (event.target.matches('input[type="checkbox"]')) {
    showSavedOnly = false;
    document.querySelector('.favorites-toggle').setAttribute('aria-pressed', 'false');
    renderChairs();
  }
});
priceRange.addEventListener('input', () => {
  priceOutput.value = `$${Number(priceRange.value).toLocaleString('en-US')}`;
  priceOutput.textContent = priceOutput.value;
  renderChairs();
});
sortSelect.addEventListener('change', renderChairs);
document.querySelector('.filter-clear').addEventListener('click', () => {
  document.querySelectorAll('.catalog-sidebar input[type="checkbox"]').forEach(input => { input.checked = false; });
  priceRange.value = priceRange.max;
  priceOutput.value = `$${Number(priceRange.value).toLocaleString('en-US')}`;
  priceOutput.textContent = priceOutput.value;
  sortSelect.value = 'featured';
  showSavedOnly = false;
  document.querySelector('.favorites-toggle').setAttribute('aria-pressed', 'false');
  renderChairs();
});

catalogGrid.addEventListener('click', event => {
  const favorite = event.target.closest('[data-save]');
  const add = event.target.closest('[data-add]');
  if (favorite) {
    const id = favorite.dataset.save;
    if (savedChairs.has(id)) savedChairs.delete(id);
    else savedChairs.add(id);
    document.querySelector('.favorite-count').textContent = savedChairs.size;
    renderChairs();
    return;
  }
  if (add) {
    const product = chairProducts.find(item => item.id === add.dataset.add);
    if (!product) return;
    window.addToStorefrontBag(1);
    window.storefrontToast(`${product.name} added to your cart.`);
  }
});

document.querySelector('.favorites-toggle').addEventListener('click', event => {
  showSavedOnly = !showSavedOnly;
  event.currentTarget.setAttribute('aria-pressed', String(showSavedOnly));
  document.querySelectorAll('.catalog-sidebar input[type="checkbox"]').forEach(input => { input.checked = false; });
  priceRange.value = priceRange.max;
  priceOutput.value = `$${Number(priceRange.value).toLocaleString('en-US')}`;
  priceOutput.textContent = priceOutput.value;
  renderChairs();
});

renderChairs();
