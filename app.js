const slides = [
  {
    image: 'img/wd-furniture-slider-111.jpg.webp',
    alt: 'Sculptural objects arranged on a dark oak console',
    eyebrow: 'The art of coming home',
    title: 'A softer way<br>to <em>live.</em>',
    description: 'Considered pieces, honest materials, and room to make them your own.',
    cta: 'Discover the collection'
  },
  {
    image: 'img/wd-furniture-slider-112.jpg.webp',
    alt: 'A sculptural chair and table in a calm, sunlit interior',
    eyebrow: 'Made for the everyday',
    title: 'A place to<br><em>linger.</em>',
    description: 'Pull up a chair. Stay for another cup. Let the day find its own pace.',
    cta: 'Find your favourite'
  },
  {
    image: 'img/wd-furniture-slider-113.jpg.webp',
    alt: 'A quiet living room with a generous sofa and natural textures',
    eyebrow: 'Room to be yourself',
    title: 'Come in.<br>Settle <em>down.</em>',
    description: 'Easy silhouettes and warm details make a house feel like yours.',
    cta: 'Get inspired'
  }
];

const products = [
  { id: 'revolt-chair', name: 'Revolt chair', category: 'Seating', price: 275, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85', alt: 'Light molded chair with slender dark legs', badge: 'New', href: 'product/revolt/index.html' },
  { id: 'morrow-sofa', name: 'Morrow sofa', category: 'Seating', price: 2480, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85', alt: 'Low-profile olive sofa in a light-filled room', badge: 'Bestseller' },
  { id: 'alto-chair', name: 'Alto lounge chair', category: 'Seating', price: 890, image: 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85', alt: 'Sculptural upholstered lounge chair' },
  { id: 'field-table', name: 'Field coffee table', category: 'Tables', price: 640, image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85', alt: 'Minimal coffee table in a warm living room', badge: 'New' },
  { id: 'sol-pendant', name: 'Sol pendant light', category: 'Lighting', price: 420, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85', alt: 'Warm pendant light above a dining table' },
  { id: 'cedar-stool', name: 'Cedar side stool', category: 'Tables', price: 290, image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85', alt: 'Natural wood stool and decor beside a sofa' },
  { id: 'lyra-floor-lamp', name: 'Lyra floor lamp', category: 'Lighting', price: 580, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', alt: 'Elegant floor lamp casting a soft glow' },
  { id: 'linden-chair', name: 'Linden dining chair', category: 'Seating', price: 510, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85', alt: 'Oak dining chair with a softly curved back' },
  { id: 'arc-console', name: 'Arc console', category: 'Tables', price: 1120, image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=900&q=85', alt: 'Warm wood console in a considered interior' },
  { id: 'soren-loveseat', name: 'Soren loveseat', category: 'Seating', price: 1980, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85', alt: 'Warm, softly styled living room with a loveseat' },
  { id: 'hearth-side-table', name: 'Hearth side table', category: 'Tables', price: 390, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85', alt: 'Natural wood furniture in a light-filled dining room' }
];

const heroImage = document.querySelector('.hero-image');
const nextHeroImage = heroImage.cloneNode(false);
nextHeroImage.classList.remove('is-active');
nextHeroImage.classList.add('hero-image-next');
nextHeroImage.alt = '';
nextHeroImage.setAttribute('aria-hidden', 'true');
heroImage.insertAdjacentElement('afterend', nextHeroImage);
const heroEyebrow = document.querySelector('.hero-eyebrow');
const heroTitle = document.querySelector('.hero-title');
const heroDescription = document.querySelector('.hero-description');
const heroCta = document.querySelector('.hero-cta');
const heroCopy = document.querySelector('.hero-copy');
const slideCurrent = document.querySelector('.slide-current');
const sliderDots = document.querySelector('.slider-dots');
const sliderProgress = document.querySelector('.slider-progress');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeSlide = 0;
let visibleHeroImage = heroImage;
let incomingHeroImage = nextHeroImage;
let imageTransitionId = 0;
let heroCopyTimer;
let slideTimer;
let toastTimer;
const bag = [];
const favorites = new Set();
let activeCategory = 'All';
let showingFavorites = false;

function renderDots() {
  sliderDots.innerHTML = slides.map((slide, index) =>
    `<button class="slider-dot${index === activeSlide ? ' is-active' : ''}" type="button" aria-label="Show slide ${index + 1}" aria-pressed="${index === activeSlide}"></button>`
  ).join('');
}

function showSlide(index, restart = true) {
  activeSlide = (index + slides.length) % slides.length;
  const slide = slides[activeSlide];
  const transitionId = ++imageTransitionId;
  const previousImage = visibleHeroImage;
  const nextImage = incomingHeroImage;
  const activateImage = () => {
    if (transitionId !== imageTransitionId) return;
    nextImage.alt = slide.alt;
    nextImage.classList.add('is-active');
    previousImage.classList.remove('is-active');
    visibleHeroImage = nextImage;
    incomingHeroImage = previousImage;
    nextImage.onload = null;
  };

  nextImage.onload = activateImage;
  nextImage.src = slide.image;
  if (nextImage.complete && nextImage.naturalWidth > 0) activateImage();

  heroCopy.classList.add('is-changing');
  window.clearTimeout(heroCopyTimer);
  heroCopyTimer = window.setTimeout(() => {
    if (transitionId !== imageTransitionId) return;
    heroEyebrow.innerHTML = `${slide.eyebrow} <span></span>`;
    heroTitle.innerHTML = slide.title;
    heroDescription.textContent = slide.description;
    heroCta.innerHTML = `${slide.cta} <span aria-hidden="true">↗</span>`;
    window.requestAnimationFrame(() => heroCopy.classList.remove('is-changing'));
  }, 220);
  slideCurrent.textContent = String(activeSlide + 1).padStart(2, '0');
  renderDots();
  if (restart) startSlider();
}

function startSlider() {
  window.clearInterval(slideTimer);
  sliderProgress.classList.remove('is-running');
  void sliderProgress.offsetWidth;
  if (prefersReducedMotion.matches) return;
  sliderProgress.classList.add('is-running');
  slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 6500);
}

document.querySelector('.slider-prev').addEventListener('click', () => showSlide(activeSlide - 1));
document.querySelector('.slider-next').addEventListener('click', () => showSlide(activeSlide + 1));
sliderDots.addEventListener('click', event => {
  const dot = event.target.closest('.slider-dot');
  if (dot) showSlide(Number(dot.getAttribute('aria-label').replace(/\D/g, '')) - 1);
});
document.querySelector('.hero').addEventListener('mouseenter', () => {
  window.clearInterval(slideTimer);
  sliderProgress.classList.remove('is-running');
});
document.querySelector('.hero').addEventListener('mouseleave', startSlider);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    window.clearInterval(slideTimer);
    sliderProgress.classList.remove('is-running');
  } else {
    startSlider();
  }
});
renderDots();
startSlider();

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

function renderProductHotspots() {
  document.querySelectorAll('.hotspot-item').forEach((item, index) => {
    const product = products.find(candidate => candidate.id === item.dataset.product);
    const trigger = item.querySelector('.product-hotspot');
    if (!product || !trigger) throw new Error(`Missing product or trigger for hotspot: ${item.dataset.product}`);

    const popover = document.createElement('span');
    popover.className = 'hotspot-popover';
    popover.id = `product-hotspot-${index + 1}`;
    popover.setAttribute('role', 'group');
    popover.setAttribute('aria-label', `${product.name} details`);
    popover.innerHTML = `
      <img src="${product.image}" alt="">
      <span class="hotspot-copy">
        <strong>${product.name}</strong>
        <small>${product.category}</small>
        <b>${formatPrice(product.price)}</b>
        <a href="#collection">Shop piece <span aria-hidden="true">↗</span></a>
      </span>
    `;
    trigger.setAttribute('aria-label', `Show ${product.name} details, ${formatPrice(product.price)}`);
    trigger.setAttribute('aria-controls', popover.id);
    item.append(popover);
  });
}

function alignHotspotPopovers() {
  const viewportWidth = document.documentElement.clientWidth;
  const maxWidth = Math.min(window.matchMedia('(max-width: 720px)').matches ? 205 : 218, viewportWidth - 36);

  document.querySelectorAll('.hotspot-item').forEach(item => {
    const bounds = item.getBoundingClientRect();
    const spaceToLeft = bounds.left - 18;
    const spaceToRight = viewportWidth - 18 - bounds.right;
    const leftWidth = Math.min(maxWidth, spaceToRight);
    const rightWidth = Math.min(maxWidth, spaceToLeft);
    if (leftWidth >= rightWidth) {
      item.dataset.align = 'left';
      item.style.setProperty('--hotspot-popover-width', `${leftWidth}px`);
    } else {
      item.dataset.align = 'right';
      item.style.setProperty('--hotspot-popover-width', `${rightWidth}px`);
    }
  });
}

function closeHotspots(except = null) {
  document.querySelectorAll('.hotspot-item.is-open').forEach(item => {
    if (item === except) return;
    item.classList.remove('is-open');
    item.querySelector('.product-hotspot').setAttribute('aria-expanded', 'false');
  });
}

renderProductHotspots();
alignHotspotPopovers();
window.addEventListener('resize', alignHotspotPopovers);
document.querySelector('.editorial-collections').addEventListener('click', event => {
  const trigger = event.target.closest('.product-hotspot');
  if (trigger) {
    const item = trigger.closest('.hotspot-item');
    closeHotspots(item);
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    return;
  }
  if (event.target.closest('.hotspot-popover a')) closeHotspots();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.hotspot-item')) closeHotspots();
});

function renderProducts(filter = activeCategory) {
  const categoryProducts = filter === 'All' ? products : products.filter(product => product.category === filter);
  const visibleProducts = showingFavorites ? categoryProducts.filter(product => favorites.has(product.id)) : categoryProducts;
  document.querySelector('.product-grid').innerHTML = visibleProducts.length ? visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        ${product.href ? `<a class="product-image-link" href="${product.href}"><img class="product-image" src="${product.image}" alt="${product.alt}" loading="lazy"></a>` : `<img class="product-image" src="${product.image}" alt="${product.alt}" loading="lazy">`}
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button class="favorite-button${favorites.has(product.id) ? ' is-favorite' : ''}" type="button" aria-label="${favorites.has(product.id) ? 'Remove' : 'Add'} ${product.name} ${favorites.has(product.id) ? 'from' : 'to'} favourites" aria-pressed="${favorites.has(product.id)}" data-favorite="${product.id}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" /></svg>
        </button>
        <button class="quick-add" type="button" data-add="${product.id}">Add to cart <span aria-hidden="true">+</span></button>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.href ? `<a href="${product.href}">${product.name}</a>` : product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">${formatPrice(product.price)}</p>
      </div>
    </article>
  `).join('') : `<p class="empty-products">${showingFavorites ? 'Save a few pieces with the heart icons and they will be waiting here.' : 'No pieces found in this category.'}</p>`;
}

renderProducts();
document.querySelector('.category-filters').addEventListener('click', event => {
  const button = event.target.closest('.filter-chip');
  if (!button) return;
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const active = chip === button;
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-pressed', String(active));
  });
  activeCategory = button.dataset.filter;
  showingFavorites = false;
  document.querySelector('.favorites-toggle').setAttribute('aria-pressed', 'false');
  renderProducts();
});

const scrim = document.querySelector('.drawer-scrim');
const drawers = [...document.querySelectorAll('.side-drawer')];
let activeDrawer = null;

function openDrawer(drawer) {
  if (activeDrawer === drawer) return;
  closeDrawer();
  activeDrawer = drawer;
  scrim.hidden = false;
  requestAnimationFrame(() => {
    scrim.classList.add('is-visible');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    drawer.querySelector('input, button')?.focus();
  });
}

function closeDrawer() {
  if (!activeDrawer) return;
  activeDrawer.classList.remove('is-open');
  activeDrawer.setAttribute('aria-hidden', 'true');
  scrim.classList.remove('is-visible');
  document.body.classList.remove('drawer-open');
  const closingDrawer = activeDrawer;
  activeDrawer = null;
  window.setTimeout(() => {
    if (!activeDrawer) scrim.hidden = true;
  }, 300);
  return closingDrawer;
}

document.querySelector('.search-toggle').addEventListener('click', () => openDrawer(document.querySelector('.search-drawer')));
document.querySelector('.favorites-toggle').addEventListener('click', event => {
  showingFavorites = !showingFavorites;
  activeCategory = 'All';
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const active = chip.dataset.filter === 'All';
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-pressed', String(active));
  });
  event.currentTarget.setAttribute('aria-pressed', String(showingFavorites));
  renderProducts();
  document.querySelector('#collection').scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
});
document.querySelector('.bag-button').addEventListener('click', () => openDrawer(document.querySelector('.cart-drawer')));
document.querySelectorAll('.drawer-close').forEach(button => button.addEventListener('click', closeDrawer));
scrim.addEventListener('click', closeDrawer);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeDrawer();
    closeMobileMenu();
    closeHotspots();
  }
});

function showToast(message) {
  const toast = document.querySelector('.toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function renderBag() {
  const itemsContainer = document.querySelector('.cart-items');
  document.querySelector('.bag-count').textContent = bag.length;
  document.querySelector('.drawer-bag-count').textContent = `(${bag.length})`;
  document.querySelector('.cart-subtotal').textContent = formatPrice(bag.reduce((sum, item) => sum + item.price, 0));
  if (!bag.length) {
    itemsContainer.innerHTML = '<p class="cart-empty">Your cart is waiting for something lovely.</p>';
    return;
  }
  itemsContainer.innerHTML = bag.map((item, index) => `
    <article class="cart-item">
      <img src="${item.image}" alt="">
      <div><h3>${item.name}</h3><p>${formatPrice(item.price)}</p></div>
      <button type="button" data-remove="${index}">Remove</button>
    </article>
  `).join('');
}

document.querySelector('.product-grid').addEventListener('click', event => {
  const addButton = event.target.closest('[data-add]');
  const favoriteButton = event.target.closest('[data-favorite]');
  if (addButton) {
    const product = products.find(item => item.id === addButton.dataset.add);
    if (!product) return;
    bag.push(product);
    renderBag();
    showToast(`${product.name} added to your cart`);
  }
  if (favoriteButton) {
    const product = products.find(item => item.id === favoriteButton.dataset.favorite);
    if (!product) return;
    const isFavorite = !favorites.has(product.id);
    if (isFavorite) favorites.add(product.id);
    else favorites.delete(product.id);
    document.querySelector('.favorite-count').textContent = favorites.size;
    favoriteButton.classList.toggle('is-favorite', isFavorite);
    favoriteButton.setAttribute('aria-pressed', String(isFavorite));
    favoriteButton.setAttribute('aria-label', `${isFavorite ? 'Remove' : 'Add'} ${product.name} ${isFavorite ? 'from' : 'to'} favourites`);
    if (showingFavorites && !isFavorite) renderProducts();
  }
});

document.querySelector('.cart-items').addEventListener('click', event => {
  const removeButton = event.target.closest('[data-remove]');
  if (!removeButton) return;
  bag.splice(Number(removeButton.dataset.remove), 1);
  renderBag();
});
document.querySelector('.checkout-button').addEventListener('click', () => showToast(bag.length ? 'Checkout is a front-end preview for now' : 'Your cart is empty'));
renderBag();

const searchInput = document.querySelector('#site-search');
const searchResults = document.querySelector('.search-results');
function updateSearch(query) {
  const normalized = query.trim().toLowerCase();
  const matches = normalized ? products.filter(product => `${product.name} ${product.category}`.toLowerCase().includes(normalized)).slice(0, 5) : [];
  searchResults.innerHTML = matches.map(product => `<a class="search-result" href="#collection"><span>${product.name}</span><span>${formatPrice(product.price)}</span></a>`).join('');
  if (normalized && !matches.length) searchResults.innerHTML = '<p class="drawer-hint">No pieces found. Try another search.</p>';
}
searchInput.addEventListener('input', () => updateSearch(searchInput.value));
document.querySelector('.search-form').addEventListener('submit', event => {
  event.preventDefault();
  updateSearch(searchInput.value);
});
searchResults.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  closeDrawer();
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
function closeMobileMenu() {
  mainNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
mainNav.addEventListener('click', event => {
  if (event.target.closest('a')) closeMobileMenu();
});

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

document.querySelector('.back-to-top').addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

prefersReducedMotion.addEventListener?.('change', startSlider);
