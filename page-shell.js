const siteRoot = new URL('./', document.currentScript.src);
const siteLink = path => new URL(path, siteRoot).href;

const shellHeader = `
  <header class="site-header" id="top">
    <div class="header-main">
      <button class="icon-button menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path class="menu-line menu-line-top" d="M3 7h18" />
          <path class="menu-line menu-line-middle" d="M3 12h18" />
          <path class="menu-line menu-line-bottom" d="M3 17h18" />
        </svg>
      </button>
      <a class="wordmark" href="${siteLink('index.html#top')}" aria-label="Home Scape home">
        <img class="wordmark-image" src="${siteLink('img/logo.png')}" alt="Home Scape" />
      </a>
      <div class="header-actions">
        <a class="search-toggle" href="#main-content" aria-label="Browse the collection">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
          <span>Explore the collection</span>
        </a>
        <button class="favorites-toggle" type="button" aria-label="Show saved pieces" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" /></svg>
          <span class="favorites-label">Saved</span>
          <span class="favorite-count" aria-live="polite">0</span>
        </button>
        <a class="account-link" href="${siteLink('index.html#footer')}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c.7-4.2 3.4-6.3 8-6.3s7.3 2.1 8 6.3" /></svg>
          <span>Account</span>
        </a>
        <button class="bag-button" type="button" aria-label="Open shopping cart">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1.2 12H3.8L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          <span>Cart</span><span class="bag-count" aria-live="polite">0</span>
        </button>
      </div>
    </div>
    <div class="nav-row">
      <nav class="main-nav" aria-label="Shop categories">
        <a href="${siteLink('index.html#collection')}">Shop all</a>
        <a class="current-category" href="${siteLink('product-category/chairs/index.html')}">Chairs</a>
        <a href="${siteLink('index.html#rooms')}">Dining</a>
        <a href="${siteLink('index.html#rooms')}">Bedroom</a>
        <a href="${siteLink('index.html#collection')}">Lighting</a>
        <a href="${siteLink('index.html#collection')}">Objects</a>
      </nav>
      <p class="shipping-note"><span aria-hidden="true">✳</span> Complimentary delivery over $1500</p>
    </div>
  </header>
`;

const shellFooter = `
  <footer class="site-footer" id="footer">
    <div class="footer-inner">
      <div class="footer-brand-row">
        <a class="wordmark footer-wordmark" href="${siteLink('index.html#top')}" aria-label="Home Scape home">
          <img class="wordmark-image" src="${siteLink('img/logo.png')}" alt="Home Scape" />
        </a>
        <div class="footer-socials" aria-label="Follow Form and Field">
          <strong>Follow us:</strong>
          <a class="footer-social-link social-facebook" href="#footer" aria-label="Facebook">f</a>
          <a class="footer-social-link social-x" href="#footer" aria-label="X">X</a>
          <a class="footer-social-link social-instagram" href="#footer" aria-label="Instagram"><span aria-hidden="true">◎</span></a>
          <a class="footer-social-link social-video" href="#footer" aria-label="Video channel"><span aria-hidden="true">▶</span></a>
        </div>
      </div>
      <div class="footer-main">
        <nav class="footer-column" aria-label="Useful links">
          <h2>Useful links</h2>
          <div class="footer-links">
            <a href="${siteLink('index.html#story')}">About us</a>
            <a href="${siteLink('index.html#footer')}">Contact us</a>
            <a href="${siteLink('index.html#rooms')}">Studio visits</a>
            <a href="${siteLink('index.html#journal')}">Journal</a>
            <a href="${siteLink('index.html#collection')}">Gift cards</a>
          </div>
        </nav>
        <div class="footer-column footer-categories">
          <h2>Categories</h2>
          <div class="footer-category-links">
            <div>
              <a href="${siteLink('product-category/chairs/index.html')}">Chairs</a>
              <a href="${siteLink('index.html#collection')}">Tables</a>
              <a href="${siteLink('index.html#collection')}">Sofas</a>
              <a href="${siteLink('index.html#collection')}">Armchairs</a>
              <a href="${siteLink('index.html#collection')}">Beds</a>
            </div>
            <div>
              <a href="${siteLink('index.html#collection')}">Storage</a>
              <a href="${siteLink('index.html#collection')}">Textiles</a>
              <a href="${siteLink('index.html#collection')}">Lighting</a>
              <a href="${siteLink('index.html#collection')}">Toys</a>
              <a href="${siteLink('index.html#collection')}">Decor</a>
            </div>
          </div>
        </div>
        <div class="footer-column footer-discovery">
          <h2>Explore the collection</h2>
          <p>Thoughtful pieces for the spaces you live in.</p>
          <div class="footer-store-links">
            <a class="footer-store-badge" href="${siteLink('product-category/chairs/index.html')}">
              <span class="footer-store-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 11V6.5A2.5 2.5 0 0 1 9.5 4h5A2.5 2.5 0 0 1 17 6.5V11M5 11h14v4H5zM5 11V9m14 2V9M7 15v5m10-5v5" /></svg></span>
              <span><small>Shop the</small><strong>Furniture edit</strong></span>
            </a>
            <a class="footer-store-badge" href="${siteLink('index.html#collection')}">
              <span class="footer-store-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 12V4M12 9C9 9 7 7.5 7 5c2.8 0 5 1.5 5 4Zm0 1c3 0 5-1.5 5-4-2.8 0-5 1.5-5 4Z" /><path d="M7.5 13h9l-1 6h-7zM10 19v1h4v-1" /></svg></span>
              <span><small>Discover</small><strong>Home accents</strong></span>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Form &amp; Field. All rights reserved.</span>
        <div class="footer-payments" aria-label="Payment method examples">
          <span>VISA</span><span>MC</span><span>AMEX</span><span>PAY</span>
        </div>
      </div>
    </div>
  </footer>
  <a class="back-to-top" href="#top" aria-label="Back to top">↑</a>
  <p class="toast" role="status" aria-live="polite"></p>
`;

document.body.insertAdjacentHTML('afterbegin', shellHeader);
document.querySelector('main').insertAdjacentHTML('afterend', shellFooter);

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
mainNav.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  mainNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
});

const toast = document.querySelector('.toast');
let toastTimer;
window.storefrontToast = message => {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
};

let bagCount = 0;
window.addToStorefrontBag = amount => {
  bagCount += amount;
  document.querySelector('.bag-count').textContent = bagCount;
};
document.querySelector('.bag-button').addEventListener('click', () => {
  window.storefrontToast(bagCount ? `${bagCount} piece${bagCount === 1 ? '' : 's'} in your cart` : 'Your cart is waiting for its first piece.');
});

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelector('.back-to-top').addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
