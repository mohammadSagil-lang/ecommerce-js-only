import {cart} from '../../data/cart.js'
import { getProduct } from '../../data/products.js';
import { getOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from './utils/money.js';
export function renderPaymentSummary() {
  
  let priceCents = 0;
  let shipping=0;
  document.querySelector(".js-payment-summary").innerHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>
          <div class="payment-summary-title">
            Please Select Delivery Options To See Cost
          </div>
  `;

  cart.forEach((cartItem) => {
    //calculating totalpriceCents(excluding tax and shipping)
    let matchingProduct = getProduct(cartItem);
    priceCents += matchingProduct.priceCents * cartItem.quantity;
    let deliveryOption=getOption(cartItem) || {priceCents:0};
    shipping += deliveryOption.priceCents * cartItem.quantity;
  });
  let totalBeforeTax = priceCents + shipping;
  let estimatedTax=totalBeforeTax/10;
  let total=totalBeforeTax+estimatedTax;
  let html = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Price:</div>
            <div class="payment-summary-money">$${formatCurrency(
              priceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shipping
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              estimatedTax
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              total
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML=html;

}