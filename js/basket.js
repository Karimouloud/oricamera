import {Cart} from './cart.js';

// recup contenu localstorage
const cart = Cart.getCart();
console.log(cart);

// affichage des items au panier
function displayCart() {
    // div ou afficher le panier
    const basket = document.getElementById('array__main')
    // si panier vide + tableau vide après suppression des articles du panier
    if(cart === null || cart.items == 0) {
        console.log('je suis vide');
        const emptyBasket = 
        `
            <div>EMPTY</div>
            <div>..</div>
            <div>0€</div>

        `
        basket.innerHTML = emptyBasket 
    } else {   
        let basketCount = document.getElementById('basket__count')
        let arrayBasket = []       
        console.log('je ne suis pas vide');
        for (let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            arrayBasket += `
                <div>${item.name} + ${item.lense}</div>
                <div>${item.quantity}</div>
                <div>${item.price/100} €</div>
            `
        }
        basket.innerHTML = arrayBasket
        basketCount.textContent = cart.items.length
    }
}

function deleteCart() {
    // selection du bouton de suppression du panier
    const deleteCart = document.getElementById('delete__cart')
    // suppression key 'cart' du local storage
    deleteCart.addEventListener('click', (event) => {
        event.preventDefault()
        // removeItem key local storage
        localStorage.removeItem('cart')
        // alerte panier vidé
        alert("Yourt cart has been deleted")
        // rechargement de la page
        window.location.href = 'basket.html'
    })
}

// calcul du prix total du panier
function calculTotalPrices() {    
    // div du total
    let divTotalPrice = document.getElementById('total__prices')
    let totalPrices = 0
    for (let k = 0; k < cart.items.length; k++) {
        let item = cart.items[k];
        totalPrices += item.price/100
    }
    divTotalPrice.textContent = `${totalPrices} €`
}

// fonction principale
function main () {
    displayCart()
    deleteCart()
    calculTotalPrices()
}
main()