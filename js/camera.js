async function main() {
	const cameras = await getCameras ()
    console.log(cameras)
    
	for (let camera of cameras) {
		
        displayCameras(camera)
	}

}
main ()

function getCameras () {

	return fetch("http://localhost:3000/api/cameras")
	.then(function(res) {
		return res.json()
	})	
	.then(function(cameras) {
		return cameras
	})
    .catch(function(error) {
		alert(error)
	})
}

function displayCameras(camera) {
	document.getElementById('container').innerHTML += 
		`
			<a class="box" href="/html/item.html?id=${camera._id}">
				<img alt="${camera.name}" src="${camera.imageUrl}">
				<section class="box__subtitle">
					<h2 id="camera__name">${camera.name}</h2>
					<h3 id="camera__price">${camera.price/100} €</h3>
				</section>
			</a>
		
		`
}