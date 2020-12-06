const URL = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1"
const selectedProducts = document.getElementById("products")
let nextPage
fetchProducts(URL)

document.getElementById('showMoreProducts').addEventListener('click', showMoreProducts)

function createCard(product) {
    let card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
        <img class="cardImg" src=http:${product.image}>
        <div class="cardName">${product.name}</div>
        <div class="cardDesc">${product.description}</div>
        <div class="cardOldPrice">De: R$${product.oldPrice}</div>
        <div class="cardPrice">Por: R$${product.price}</div>
        <div class="cardInstallment">ou ${product.installments.count}x de R$${product.installments.value}</div>
        <button>Comprar</button>`
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

