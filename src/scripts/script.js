const URL = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1"
const selectedProducts = document.getElementById("products")
let nextPage
fetchProducts(URL)

document.getElementById('showMoreProducts').addEventListener('click', showMoreProducts)
let box = document.getElementById('box'),
    btn = document.getElementById("hide-button")



function arrowToggle () {
    if (box.classList.contains('hidden')) {
      box.classList.remove('hidden');
      setTimeout(function () {
        box.classList.remove('visuallyhidden');
      }, 20);
    } else {
      box.classList.add('visuallyhidden');    
      box.addEventListener('transitionend', function(e) {
        box.classList.add('hidden');
      }, {
        capture: false,
        once: true,
        passive: false
      });
    }
    
}
function createCard(product) {
    let card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
        <img class="cardImg" src=http:${product.image}>
        <div class="cardBody">
        <div class="cardName">${product.name}</div>
        <div class="cardDesc">${product.description}</div>
        <div class="cardOldPrice">De: R$${product.oldPrice}</div>
        <div class="cardPrice">Por: R$${product.price}</div>
        <div class="cardInstallment">ou ${product.installments.count}x de R$${product.installments.value}</div>
        <button>Comprar</button>
        </div>`
    selectedProducts.appendChild(card)
}

async function fetchProducts(endpoint) {
    const res = await fetch(endpoint)
    const data = await res.json()
    const products = data.products
    nextPage = "https://" + data.nextPage
    products.forEach(createCard)
}

function showMoreProducts(){
    fetchProducts(nextPage)
}
btn.addEventListener('click', arrowToggle,false);
