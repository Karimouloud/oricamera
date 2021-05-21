export const Cart = {
	// key
	LOCAL_STORAGE_CART_KEY: 'cart',

   	getCart: () => {
		const cartString = localStorage.getItem(Cart.LOCAL_STORAGE_CART_KEY)
		if (cartString)  {
			const cartObj = JSON.parse(cartString)
			return cartObj;
		}
		else {
			return {items: []}
		}
   	},

   	setCart: (cartObj) => {
		const cartString = JSON.stringify(cartObj)
		localStorage.setItem(Cart.LOCAL_STORAGE_CART_KEY, cartString)
   	},

   	addItem: (item) => {
		const cart = Cart.getCart();
		cart.items.push(item);
		Cart.setCart(cart)
   	}	
}

export function getParamInUrl(paramName) {
	const searchParams = new URLSearchParams(window.location.search)
	return searchParams.get(paramName)
}