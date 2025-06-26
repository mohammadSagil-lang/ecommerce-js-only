import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
function loadCart(fun){
  //here request can be made
  console.log('cart lodading');
  fun();
}
// loadProducts(renderCartPage);
/*
export async function renderCartPage() {

  //way 1
  loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
    console.log("inside cartPage.js");
  });//this means first the loadProducts is complete then renderOrderSummary() till inside cartPage.js will be run. This way is callback which reduces the readability of code ,Promises are a better approach
  
 /*
 //way2
  new Promise((resolve) =>{
    loadProducts(()=>{
      console.log('promise1 done')
      resolve();
    });
    
  }).then(()=>{
    return new Promise((resolve)=>{
      loadCart(()=>{
        console.log("promise2 done");
        resolve();
      })
    });

  }).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    console.log("3payment and order rendered successfully");
  });
  
  //way 3
  
  Promise.all([
    new Promise((resolve) => {
      loadProducts(() => {
        console.log("promise1 done");
        resolve('value1');
      });
    }),
    new Promise((resolve)=>{
      loadCart(()=>{
        console.log("promise2 done");
        resolve('value2');
      })
    }),
  ]).then((values)=>{
    console.log(values);//values=['value1','value2']
    renderOrderSummary();
    renderPaymentSummary();
    console.log("3payment and order rendered successfully");
  })
    
  await loadProducts();
  renderOrderSummary();
  renderPaymentSummary();
}
*/
//waits for all the promises to complete inside the array then goes for then.
export async function renderCartPage() {
  // await Promise.all([loadProducts(), loadCart(()=>{
  //   console.log('cart loaded')
  // })]);
  // renderOrderSummary();
  // renderPaymentSummary();
  // console.log("3payment and order rendered successfully");
  await loadProducts();
  renderOrderSummary();
  renderPaymentSummary();
  console.log("inside cartPage.js");
}
renderCartPage();

// export function renderCartPage() {
//   Promise.all([
//     new Promise((resolve) => {
//       loadProducts();
//       resolve();
//     }),
//     new Promise((resolve) => {
//       loadCart(() => {
//         console.log("promise2 done");
//         resolve("value2");
//       });
//     }),
//   ]).then((values) => {
//     console.log(values); //values=['value1','value2']
//     renderOrderSummary();
//     renderPaymentSummary();
//     console.log("3payment and order rendered successfully");
//   });
// }

// //waits for all the promises to complete inside the array then goes for then.

// renderCartPage();
