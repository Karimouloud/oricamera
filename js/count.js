import {Cart} from './cart.js';

// recup contenu localstorage
const cart = Cart.getCart();

export function countUnitInHeader(){
    let basketCount = document.getElementById('basket__count')
    let totalBasket = 0
    for (let i = 0; i < cart.items.length; i++){
        let item = cart.items[i].quantity;
        totalBasket += parseFloat(item)
    }
    basketCount.textContent = totalBasket
}

export function countUnitInBasket(){
    let divTotalUnit = document.getElementById('total__unit')
    let totalUnit = 0
    for (let j = 0; j < cart.items.length; j++){
        let item = cart.items[j].quantity;
        totalUnit += parseFloat(item)
    }
    divTotalUnit.textContent = totalUnit
}

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