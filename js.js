const cartBtn = document.querySelector(".cart-btn")
const clearCartBtn = document.querySelector(".btn-clear")
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".total-value")
const cartContent = document.querySelector(".cart-list")
const productsDOM = document.querySelector("#products-dom")
//console.log(clearCartBtn)
let buttonsDOM = [];
let cart = [];

class Products {
    async getProducts() {
        try {
            let response = await fetch('https://fakestoreapi.com/products');
            let result = await response.json();
            let products = result;
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
        productsDOM.innerHTML = result
    }

    getBagButtons() {
      const buttons = [...document.querySelectorAll(".btn-add-to-cart")];
      buttonsDOM = buttons;
      buttons.forEach(button => {
        let id = button.dataset.id
        let inCart = cart.find(item => item.id === id)
        if(inCart) {
          button.setAttribute("disabled", "disabled");
          button.opacity = ".3";
        } else {
          button.addEventListener("click", event => {
            event.target.disabled = true;
            event.target.style.opacity = "0.3"

            let cartItem = {...Storage.getProduct(id), amount:1};
            // add product to cart
            cart = [...cart, cartItem];
            // save cart in local storage
            Storage.saveCart(cart)
            // save cart values
            this.saveCartValues(cart)
          })
        }
      })
    }

    saveCartValues(cart) {
      let tempTotal = 0;
      let itemsTotal = 0;
      cart.map(item => {
        tempTotal += item.price * item.amount;
        console.log(item.price)
        console.log(tempTotal)
        itemsTotal += item.amount;
      });

      cartTotal.innerHTML = parseFloat(tempTotal.toFixed(2));
      cartItems.innerHTML = itemsTotal;
    }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("product", JSON.stringify(products))
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("product"));
    return products.find(product => product.id === id); 
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const products = new Products();
    const ui = new UI();

    products.getProducts().then(products =>  {
        ui.displayProducts(products)
        Storage.saveProducts(products)
    }).then(() => {
      ui.getBagButtons()
    })
})

