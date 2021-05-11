import {Cart} from './cart.js'


function getItem(id) {
	return fetch(`http://localhost:3000/api/cameras/${id}`)
		.then((res) => res.json())
		.then((item) => item)
		.catch((error) => console.log(error))
}

function getParamInUrl(paramName) {
	const searchParams = new URLSearchParams(window.location.search)
	return searchParams.get(paramName)
}

function displayItem(item) {

	const section = document.querySelector('.item')

	const html = `
		<img src="${item.imageUrl}">                           
		<section class="box__subtitle">
			<h2 id="camera__name">${item.name}</h2>            
			<h3 id="camera__price">${item.price/100} , 00€</h3>
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
	// injection HTML
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
		// quantité produit dans une variable
		const itemQuantity = document.getElementById('quantity')
		const quantity = itemQuantity.value
		const options = document.getElementById('choose')
		//const option = options.textContent
		const selectedOption = options.value
		// popup
		const popupConfirm = () => {
			if(window.confirm(
				`${item.name} option: ${selectedOption} has been added to cart 
Consulter le panier: OK
Ou revenir à l'accueil: ANNULER`
)) {
				window.location.href ='/html/basket.html'
			} else {
				window.location.href = '../index.html'
			}
		}
		popupConfirm()
		
		const itemWithSpec = 
			{
				name: item.name,
				quantity: quantity,
				price: item.price * quantity,
				_id: item._id
			};
			console.log(itemWithSpec);
		Cart.addItem(itemWithSpec)
	})	
}

async function main() {
	const itemId = getParamInUrl('id')
	const item = await getItem(itemId)
	displayItem(item)
	addCartButtonEvent(item)
}

main()