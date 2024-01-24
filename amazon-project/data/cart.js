// Export for modules
export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 20
  }
];

const addedMessageTimeouts = {};

// Add to cart object function
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
      quantity
    });
  }
}