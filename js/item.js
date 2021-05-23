import {Cart} from './cart.js';
import {getParamInUrl} from './cart.js';
import {urlCameras} from './cameras.service.js';
import {countUnitInHeader} from './count.js';

// envoi requete specifique avec l'id
function getItem(id) {
	return fetch(urlCameras() + `/${id}`)
		.then((res) => res.json())
		.then((item) => item)
		.catch((error) => console.log(error))
}

// affichage de l'item specifique
function displayItem(item) {
	const section = document.querySelector('.item')
	const html = `
		<img src="${item.imageUrl}">                           
		<section class="box__subtitle">
			<h2 id="camera__name">${item.name}</h2>            
			<h3 id="camera__price">${item.price/100} €</h3>
		</section>            
		</div>
		<p class="camera__description">${item.description}</p>
		<div class="camera__options">
			<div class="options">
				<label>LENSES</label>
				<div>
					<select id="choose">						
					</select>
				</div>
			</div>
			<div class="options">
				<label>QUANTITY</label>
				<div>
					<select id="quantity">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
					</select>
				</div>
			</div>			
		</div>
		<button id="add__to__cart" type="submit" name="add__ToCard">ADD TO CART</button>
	`
	// injection HTML dans la section
	section.innerHTML = html
	// selection de l'id des options
	const options = document.getElementById('choose')
	// nombre d'options adaptatif
	const listOptions = item.lenses
	let arrayOptions = []
	// boucle for
	for (let i = 0; i < listOptions.length; i++) {
		arrayOptions += `<option value="${listOptions[i]}">${listOptions[i]}</option>`
	}
	// injection HTML
	options.innerHTML = arrayOptions	
}

function addCartButtonEvent(item) {
	// selection du bouton 
	const addToCartButton = document.getElementById('add__to__cart')
	// ------ ajout un evenement au click du bouton ------
	addToCartButton.addEventListener('click', (event) => {
		event.preventDefault()
		// variable quantité
		const itemQuantity = document.getElementById('quantity')
		const quantity = itemQuantity.value
		// variable option
		const options = document.getElementById('choose')
		const selectedOption = options.value
		// popup
		const popupConfirm = () => {
			if(window.confirm(
				`${item.name} 
option: ${selectedOption} 
has been added to cart 
Consulter le panier: OK
Ou revenir à l'accueil: ANNULER`
)) {
				window.location.href ='/html/basket.html'
			} else {
				window.location.href = '../index.html'
			}
		}
		popupConfirm()
		// obj avec quantité et option
		const itemWithSpec = 
			{
				name: item.name,
				lense: selectedOption,
				quantity: quantity,
				price: item.price * quantity,
				_id: item._id
			};
			console.log(itemWithSpec);
		// ajout dans localstoragfe
		Cart.addItem(itemWithSpec)
	})	
}

// fonction principale async await
async function main() {
	const itemId = getParamInUrl('id')
	const item = await getItem(itemId)
	displayItem(item)
	addCartButtonEvent(item)
	countUnitInHeader()
}
main()