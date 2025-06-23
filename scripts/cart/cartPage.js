import { renderOrderSummary } from "../checkout/orderSummary.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";
import { loadProducts } from "../../data/products.js";

export function renderCartPage(){
  loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    console.log("inside cartPage.js");
  }) 
}