import {cart} from '../data/cart-class.js';
import {products ,loadProducts} from '../data/products.js';
// let cart = JSON.parse(localStorage.getItem('cart')) || [];
//module only work in live server 
//it has no naming conflicts we can do {cart as myCart}
async function renderProductsGrid()
{
  await loadProducts();
  let cartQuantity ;//= JSON.parse(localStorage.getItem('cartQuantity')) || 0
  updateCartQuantitiy();
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
  let productsHTML=``;
  products.forEach((product) =>{
      const html = `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product["image"]}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product["name"]}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
              ${product["rating"].count}
              </div>
            </div>

            <div class="product-price">
            $${product["priceCents"] / 100}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            ${product.extraHTML()} 
            <!-- since product is a instance of clothing class so extraHTML() of clothing class will run  -->
            <div class="product-spacer"></div>  

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
              product["id"]
            }" >Add to Cart</button>
          </div>`;
    productsHTML+=html;
  });

  //adding to cart
  document.querySelector(".products-grid").innerHTML=productsHTML;
  document.querySelectorAll(".js-add-to-cart").forEach((button) =>{
    button.addEventListener('click',() =>{
      cart.AddToCart(button);
      updateCartQuantitiy();
    })
  })

  function updateCartQuantitiy()//this fucntion updates the webpage hence we kept it here
  {
    cartQuantity=0;
    cart.cartItems.forEach((item)=>{
      cartQuantity+=item.quantity;
    })
    document.querySelector(".cart-quantity").innerHTML=cartQuantity;
    localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));
    localStorage.setItem("cart", JSON.stringify(cart.cartItems));
  }
}
renderProductsGrid();