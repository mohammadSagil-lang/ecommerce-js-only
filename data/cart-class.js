import { renderCartPage } from "../scripts/checkout.js";
class Cart {
  cartItems;
  localStorageKey;
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  }
  AddToCart(button) 
  {
    let matchingItem;
    this.cartItems.forEach((item, index) => {
      if (item.id === button.dataset.productId) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      this.cartItems.push({
        id: button.dataset.productId,
        quantity: 1
      });
    }
  }
  GetItems()
  {
    return this.cartItems;
  }
  RemoveFromCart()
  {
    document.querySelectorAll(".js-delete").forEach((deletebutton, index) => {
      deletebutton.addEventListener("click", () => {
        this.cartItems.splice(index, 1);
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
        renderCartPage();
      });
    });
  }
}
export let cart=new Cart('cart');

console.log("cart.GetItems()",cart.GetItems());