const quantityOutput = document.querySelector('.quantity-value');
let quantity = 1;
document.querySelector('.favorites-toggle').addEventListener('click', () => {
  document.querySelector('.product-save').click();
});

document.querySelector('.purchase-row').addEventListener('click', event => {
  const quantityButton = event.target.closest('[data-quantity]');
  if (quantityButton) {
    quantity = Math.max(1, quantity + Number(quantityButton.dataset.quantity));
    quantityOutput.value = quantity;
    quantityOutput.textContent = quantity;
    return;
  }
  if (event.target.closest('.add-to-bag')) {
    window.addToStorefrontBag(quantity);
    window.storefrontToast(`${quantity} Revolt chair${quantity === 1 ? '' : 's'} added to your cart.`);
  }
  const saveButton = event.target.closest('.product-save');
  if (saveButton) {
    const saved = saveButton.getAttribute('aria-pressed') !== 'true';
    saveButton.setAttribute('aria-pressed', String(saved));
    saveButton.classList.toggle('is-saved', saved);
    document.querySelector('.favorite-count').textContent = saved ? '1' : '0';
    document.querySelector('.favorites-toggle').setAttribute('aria-pressed', String(saved));
    window.storefrontToast(saved ? 'Revolt chair saved.' : 'Revolt chair removed from saved pieces.');
  }
});

const galleryDialog = document.querySelector('.gallery-dialog');
const dialogImage = galleryDialog.querySelector('img');
document.querySelector('.revolt-gallery').addEventListener('click', event => {
  const tile = event.target.closest('[data-gallery-image]');
  if (!tile) return;
  dialogImage.src = tile.dataset.galleryImage;
  dialogImage.alt = tile.querySelector('img').alt;
  galleryDialog.showModal();
});
galleryDialog.querySelector('.gallery-dialog-close').addEventListener('click', () => galleryDialog.close());
galleryDialog.addEventListener('click', event => {
  if (event.target === galleryDialog) galleryDialog.close();
});

document.querySelector('.review-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const review = document.createElement('article');
  review.className = 'review-entry';
  const name = document.createElement('strong');
  name.textContent = form.elements.name.value.trim();
  const message = document.createElement('p');
  message.textContent = form.elements.message.value.trim();
  review.append(name, message);
  document.querySelector('.review-list').prepend(review);
  document.querySelector('.review-empty').textContent = 'Thank you for sharing your thoughts.';
  form.reset();
  window.storefrontToast('Your review is shown in this preview only.');
});
