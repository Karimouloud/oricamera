// recup des param de l'url
function getParamInUrl(paramName) {
	const searchParams = new URLSearchParams(window.location.search)
	return searchParams.get(paramName)
}

// affichage des param
function displayOrderSummary(){
    const orderId = getParamInUrl('id')
    const orderPrice = getParamInUrl('price')
    const orderUser = getParamInUrl('user')

    const orderSummary = document.getElementById('order__summary')

    const html =
    `        
        <div class="col__header">
            <p id="summary__thanks">Thank you </p>
            <span class="red">${orderUser} !</span>
        </div>
        <p class="green">Your order is in preparation</p>
        <div class="col__main">
            <p>Order ID: </p>
            <span id="summary__id">${orderId} !</span>
        </div>
        <div class="col__footer">
            <p>Cost: </p>
            <span id="summary__cost">${orderPrice}</span>
        </div>
    `
    orderSummary.innerHTML = html
}
displayOrderSummary()