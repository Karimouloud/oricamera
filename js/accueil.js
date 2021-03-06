import {Request} from './cameras.service.js';

// recup des datas de l'API
function getDatas() {
	// envoi de la requete
	return Request.getCameras()
	.then(function(res) {
		return res.json()
	})
    .catch(function(error) {
		alert(error)
	})
}

// affichage type d'une camera
function displayCameras(camera) {
	document.getElementById('container').innerHTML += 
		`
			<a class="box" href="./html/item.html?id=${camera._id}">
				<img alt="${camera.name}" src="${camera.imageUrl}">
				<section class="box__subtitle">
					<h2 id="camera__name">${camera.name}</h2>
					<h3 id="camera__price">${camera.price/100} €</h3>
				</section>
			</a>
		
		`
}

// fonction principale
async function main() {
	const cameras = await getDatas ()
	// boucle pour afficher toutes les cameras
	for (let camera of cameras) {		
        displayCameras(camera)
	}
}
main()