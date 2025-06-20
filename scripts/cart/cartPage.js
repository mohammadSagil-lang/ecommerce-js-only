import { renderOrderSummary } from "../checkout/orderSummary.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";

export function renderCartPage(){
  renderOrderSummary();
  renderPaymentSummary();
  console.log("inside cartPage.js")
}