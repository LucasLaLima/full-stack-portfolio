// Export for modules
export let cart = JSON.parse(localStorage.getItem('cart'));

// Default cart value
if (!cart) {
  cart = 
  [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 10,
      deliveryOptionId: '2'
    }
  ];
}

// Function to store cart to local storage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart object function
const addedMessageTimeouts = {};
export function addToCart(productId) {
  // Checks if product is already in cart array
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  // Finds quantity to add to cart
  let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  // Causes Added[Check] to appear on screen
  let addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add('added-to-cart-appear');

  // Causes Added[Check] to refresh
  setTimeout(() => {
    // Check to see if there is a running process
    const previousTimeoutId = addedMessageTimeouts[productId];

    // If running process, clear it 
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    // Sets timeout and introduces to the masterlist
    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-appear');
    }, 2000);
    addedMessageTimeouts[productId] = timeoutId;
  });

  // If item is in cart, increase item quantity
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      // ---Redundancy
      // productId: productId,
      // quantity: quantityValue
      // ---
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  // Saves cart to storage
  saveToStorage();
}

// Removes product from cart
export function removeFromCart(productId) {
  const new_cart = [];

  // Removal
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      new_cart.push(cartItem);
    }
  });

  // Replaces master cart
  cart = new_cart;

  // Saves cart to storage
  saveToStorage();
};

// Calculates cart quantity
export function calculateCartQuantity() {
  // Recalcualtes cart quantity
  let new_cart_quantity=0;
  cart.forEach((cartItem) => {
    // Determines cart quantity
    new_cart_quantity += cartItem.quantity;
  });
  
  // Resets cart quantity html at top of page
  document.querySelector('.js-cart-quantity').innerHTML = new_cart_quantity;
};

// Updates cart quantity
export function updateCartQuantity(productId, newQuantity) {
  // Updates matching cart item's quantity
  cart.forEach((cartItem) => {
    if(cartItem.productId===productId){
      cartItem.quantity = newQuantity;
    }
  })

  // Saves to storage
  saveToStorage();
};

//Updates cart item delivery option
export function updateDeliveryOption(productId, deliveryOptionId) {
  // Finds matching item
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  // Updates cart item delivery option id
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}