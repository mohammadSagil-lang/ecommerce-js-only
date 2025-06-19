export let cart =JSON.parse(localStorage.getItem('cart')) || [];

//AddtoCart function is managing cart hence we kept it here
export function AddToCart(button,cart) {
  let matchingItem;
  cart.forEach((item, index) => {
    if (item.id === button.dataset.productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      id: button.dataset.productId,
      quantity: 1
    });
  }
}
