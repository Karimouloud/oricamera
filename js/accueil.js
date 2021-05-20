import {fetchCameras} from './fetch.js';

// recup des datas de l'API
function getCameras () {
	// envoi de la requete
	return fetch(fetchCameras())
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
	const cameras = await getCameras ()
    console.log(cameras)
    
	// boucle pour afficher toutes les cameras
	for (let camera of cameras) {		
        displayCameras(camera)
	}
}
main ()