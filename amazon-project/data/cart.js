// Export for modules
export const cart = [];

// Add to cart object function
export function addToCart(productId) {
  // Checks if product is already in cart array
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  // If item is in cart, increase item quantity
  // testing
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
}