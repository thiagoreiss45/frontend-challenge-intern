// API URL
const URL = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1"
fetchProducts(URL)

const selectedProducts = document.getElementById("products")
let nextPage

//  Arrow to toggle the Lorem Ipsum text on mobile
let box = document.getElementById('box'),
    btn = document.getElementById("hideButton")

function arrowToggle () {

    //  If is hidden, remove the hidden and visuallyHidden classes
    if (box.classList.contains('hidden')) {
      box.classList.remove('hidden');
      setTimeout(function () {
        box.classList.remove('visuallyhidden');
      }, 20);

    //  Else, add them
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


//  Create the HTML product card
function createCard(product) {

    //  Create a card div
    let card = document.createElement("div")
    card.className = "card"
    
    //  Create cardBody to separete cardImg from the rest
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

//  Loads more products
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



//  Alerts you that the information was sent
function submitInfo(event) {
  event.preventDefault();

  alert("Formulário enviado!");
}

//  Add event listeners
document.getElementById('showMoreProducts').addEventListener('click', showMoreProducts)
btn.addEventListener('click', arrowToggle,false);
document.getElementById("sign").addEventListener("submit", submitInfo);
document.getElementById("news").addEventListener("submit", submitInfo);

