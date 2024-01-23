// Test print to console
// console.log('hello');

/*
Goal of this file is to generate all the HTMl for the Amazon page here,
rather than writing it all in the amazon.html file.

Steps to making a website with JavaScript:
1. Save the data
2. Generate the HTMl
3. Make it interactive
*/

/*
// Decided to import products from ./data/products.js
const products = [
  {
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090
  },
  {
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095
  },
  {
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799
  },
  {
    image: 'images/products/black-2-slot-toaster.jpg',
    name: '2 Slot Toaster - Black',
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899
  }
];
*/

// All imports
// Modules only work with Live Servers
import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

// Store final
let productsHTML = '';

/* Data Attributes
- Buttons below have data attributes
- Attributes need to start with 'data-'
- Hyphenated names are colloquially known as kebab-case
- The entire data attribute name needs to be kebab case
*/

// Looping through products
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${ (product.priceCents/100).toFixed(2) }
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;
});

// Puts HTML on page
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Updates Cart Count on main page
function updateCartQuantity(){
  // Updats master cart count
  let cartQunatity = 0;
  cart.forEach((cartItem) => {
    cartQunatity += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQunatity;
}

// Add-To-Cart Button Functionality
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    // Data Attributes revealed
    // console.log(button.dataset.productName);

    // *** CRUCIAL *** 
    // The button's "data-" name gets converted from kebab case
    // to camel case.

    // Exchanged for deconstruction approach
    // const productId = button.dataset.productId;
    let {productId} = button.dataset;
  
    addToCart(productId);
    console.log(cart);
    updateCartQuantity();
  });
});