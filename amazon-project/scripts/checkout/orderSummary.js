import {calculateCartQuantity, cart, removeFromCart, updateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';


// Daytime object
// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary() {
  // Generates HTML for checkout page
  let cartSummaryHTML = '';
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    // Determines cart quantity
    cartQuantity += cartItem.quantity;

    // Stores product ID
    const productId = cartItem.productId;
    // Parses json for product info
    const matchingProduct = getProduct(productId);

    // Finds delivery option/shipping method
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    // Adds HTML
    cartSummaryHTML+=
    `
      <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
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
            ${generateDeliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // Function that generates delivery options html
  function generateDeliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents===0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id===cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }

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

  // Adds listener to radio delivery options, visible after refresh
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    const {productId, deliveryOptionId} = element.dataset; // shorthand to extract
    element.addEventListener('click', ()=> {
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); // re-render
    });
  });
}