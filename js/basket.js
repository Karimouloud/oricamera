import {Cart} from './cart.js';
import {calculTotalPrices} from './count.js';

// recup contenu localstorage
const cart = Cart.getCart();

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
            <div></div>
            <div>NONE</div>
            <div>0€</div>

        `
        basket.innerHTML = emptyBasket 
    } else {   
        let arrayBasket = []       
        console.log('je ne suis pas vide');
        for (let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            arrayBasket += `
                <div class="brown">${item.name}</div>
                <div class="min grid__3">${item.lense}</div>
                <div>${item.price/100} €</div>
            `
        }
        basket.innerHTML = arrayBasket        
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

// fonction principale
function main () {
    displayCart()
    deleteCart()
    calculTotalPrices()
}
main()