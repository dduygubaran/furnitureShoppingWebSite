const cartBtn = document.querySelector(".cart-btn")
const clearCartBtn = document.querySelector(".btn-clear")
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".total-value")
const cartContent = document.querySelector(".cart-list")
const productDOM = document.querySelector("#products-dom")
//console.log(clearCartBtn)

class Products {
    async getProducts() {
        try {
            let response = await fetch('https://fakestoreapi.com/products');
            let result = await response.json();
            let products = result;
            console.log(products)
            return products;
        } catch (error) {
            console.log(error)
        }
    }
}

class UI {
    displayProducts(products) {
        console.log(products)
        let result = ""
        products.forEach(item => {
            result += `
              <div class="col-lg-4 col-md-6">
            <div class="product">
              <div class="product-image">
                <img src="${item.image}" alt="product"/>
              </div>
              <div class="product-hover">
                <span class="product-title"> ${item.category} </span>
                <span class="product-price">$ ${item.price} </span>
                <button class="btn-add-to-cart" data-id=${item.id}>
                  <i class="fas fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          </div>
          `
        });
        productDOM.innerHTML = result
    }
}

class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const products = new Products();
    const ui = new UI();
    products.getProducts().then(products =>  {
        ui.displayProducts(products)
    });
})

