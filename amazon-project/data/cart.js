// Export for modules
export const cart = [
  // {
  //   productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  //   quantity: 1
  // },
  // {
  //   productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  //   quantity: 20
  // }
];

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
  let quantityValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  // If item is in cart, increase item quantity
  if (matchingItem) {
    matchingItem.quantity += quantityValue;
  } else {
    cart.push({
      productId: productId,
      quantity: quantityValue
    });
  }
}