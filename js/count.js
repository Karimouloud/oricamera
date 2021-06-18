import {Cart} from './cart.js';

// recup contenu localstorage
const cart = Cart.getCart();

// calcul du prix total du panier
export function calculTotalPrices() {    
    // div du total
    let divTotalPrice = document.getElementById('total__prices')
    let totalPrices = 0
    for (let k = 0; k < cart.items.length; k++) {
        let item = cart.items[k];
        totalPrices += item.price/100
    }
    divTotalPrice.textContent = `${totalPrices} €`
}