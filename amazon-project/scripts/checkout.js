import {calculateCartQuantity, cart, removeFromCart, updateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// Generates HTML for checkout page
let cartSummaryHTML = '';
let cartQuantity = 0;
cart.forEach((cartItem) => {
  // Determines cart quantity
  cartQuantity += cartItem.quantity;

  // Stores product ID
  const productId = cartItem.productId;
  // Parses json for product info
  let matchingProduct;
  products.forEach((product) => {
    if(product.id == productId){
      matchingProduct = product;
    }
  });

  // Adds HTML
  cartSummaryHTML+=
  `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span">
              Quantity: <span class="quantity-label js-product-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

// Updates Checkout page cart quantity on initialization
calculateCartQuantity();

// Adds constructed HTML to page
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// Adds listeners to delete buttons
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    // Removes item from cart
    removeFromCart(productId);
    
    // Removes cart item's HTML
    let container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    
    // Recalculates cart quantity
    calculateCartQuantity();
  });
});

// Adds listeners to update buttons
document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    itemContainer.classList.add("is-editing-quantity");
  });
});

// Save functionality; used when enter is pressed or 'Save' is pressed
function updateProductEntryAndCheckoutPage(productId){
  // Reads updated value
  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
  const quantityValue = Number(quantityInput.value);

  // Validates input
  if (quantityValue < 0 || quantityValue >= 1000) {
    alert('Quantity must be at least 0 and less than 1000');
    return;
  }

  // Updates master cart
  updateCartQuantity(productId, quantityValue);

  // Hides .is-editing elements
  const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
  itemContainer.classList.remove("is-editing-quantity");

  // Updates HTML at product
  document.querySelector(`.js-product-quantity-${productId}`).innerHTML = quantityValue;

  // Updates HTML at top of page
  calculateCartQuantity();
}

// Adds listeners to the save buttons
document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    // Finds product id from save link
    const productId = link.dataset.productId;
    
    // Updates product on page + header
    updateProductEntryAndCheckoutPage(productId);
  });
});

// Adds listener to input field
document.querySelectorAll(".quantity-input").forEach((field) => {
  field.addEventListener("keypress", (event) => {
    if(event.key=="Enter") {
      // Prevent default action
      event.preventDefault();
      // Repeats functionality of save button listener
      updateProductEntryAndCheckoutPage(field.dataset.productId);
    }
  })
});