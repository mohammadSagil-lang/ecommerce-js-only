import { cart } from "../../data/cart.js";
import { deliveryOptions, getOption } from "../../data/deliveryOptions.js";
import { products, getProduct } from "../../data/products.js";
// import { updateCartQuantitiy } from "../amazon.js";
import { renderCartPage } from "../cart/cartPage.js";


import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; //this is a default export ,each file can have only one default export function
let today = dayjs();
let deliveryDate = today.add(7, "days");

// let cart = JSON.parse(localStorage.getItem("cart")) || [];//slow as compared to import

export function renderOrderSummary() {
  if (cart.length == 0) {
    document.querySelector(".js-order-summary").innerHTML = "cart is empty";
    return;
  }
  let cartHTML = ``;
  cart.forEach((cartItem) => {
    let matchingProduct=getProduct(cartItem);
    let deliveryOption=getOption(cartItem);
    let deliveryDate;
    if (deliveryOption) {
      let today = dayjs();
      today = today.add(deliveryOption.days, "day");
      deliveryDate = "Delivery Date: " + today.format("dddd, MMMM D");
    } else deliveryDate = "Please Select A Delivery Date";
    cartHTML += `
		<div class="cart-item-container">
			<div class="delivery-date">
					${deliveryDate}
			</div>
			<div class="cart-item-details-grid">
				<img class="product-image"
				src="${matchingProduct.image}">
				<div class="cart-item-details">
				<div class="product-name">${matchingProduct.name}</div>
				<div class="product-price">$${matchingProduct.priceCents / 100}</div>
				<div class="product-quantity">
						<span>
						Quantity: <span class="quantity-label">${cartItem.quantity}</span>
						</span>
						<span class="update-quantity-link link-primary">
						Update
						</span>
						<span class="delete-quantity-link link-primary js-delete">
						Delete
						</span>
				</div>
				</div>

				<div class="delivery-options">
				<div class="delivery-options-title">
						Choose a delivery option:
				</div>
				${deliveryOptionhtml(matchingProduct, cartItem)}

				</div>
			</div>
		</div>
		`;
  });
  document.querySelector(".js-order-summary").innerHTML = cartHTML;
  document.querySelectorAll(".js-delete").forEach((deletebutton, index) => {
    deletebutton.addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartPage();
    });
  });
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      cart.forEach((cartItem) => {
        if (cartItem.id === element.dataset.productId)
          cartItem.deliveryId = element.dataset.deliveryId;
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartPage();
    });
  });
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-checkout-page-cart-quantity").innerHTML =
    cartQuantity + " Items";
}
function deliveryOptionhtml(matchingProduct, cartItem) {
  let html = ``;
  deliveryOptions.forEach((deliveryOption) => {
    let today = dayjs();
    today = today.add(deliveryOption.days, "day");
    const deliveryDate = today.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents == 0
        ? "FREE "
        : `$${deliveryOption.priceCents / 100}-`;
    const isChecked = deliveryOption.deliveryId === cartItem.deliveryId;
    html += `
		<div class="delivery-option js-delivery-option" data-delivery-id="${
      deliveryOption.deliveryId
    }" data-product-id="${matchingProduct.id}">
			<input type="radio" 
			class="delivery-option-input" ${isChecked ? "checked" : ""}
			name="delivery-option-${matchingProduct.id} ">
			<div>
			<div class="delivery-option-date">
					${deliveryDate}
			</div>
			<div class="delivery-option-price">
					${priceString}Shipping
			</div>
			</div>
		</div>
		`;
  });
  return html;
}
