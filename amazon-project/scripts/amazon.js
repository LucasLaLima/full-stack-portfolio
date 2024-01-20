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
        <select>
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

// Full HTML print out
// console.log(productsHTML);

// All imports
// Modules only work with Live Servers
import {cart} from '../data/cart.js';

// Puts HTML on page
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Add-To-Cart Functionality
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    // Debug
    // console.log('Added product');
    
    // Data Attributes revealed
    // console.log(button.dataset.productName);

    // *** CRUCIAL *** 
    // The button's "data-" name gets converted from kebab case
    // to camel case.
    const productId = button.dataset.productId;

    // Checks if product is already in cart array
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId){
        matchingItem = item;
      }
    });

    // If item is in cart, increase item quantity
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1
      });
    }

    console.log(cart);
  });
});