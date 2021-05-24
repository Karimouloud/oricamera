export const Fetch = {
	// URL
	URL_CAMERAS: "http://localhost:3000/api/cameras",

	fetchCameras: () => {
		return fetch(Fetch.URL_CAMERAS)
	},

	fetchCameraById: (id) => {
		return fetch(Fetch.URL_CAMERAS + `/${id}`)
	},

	fetchOrder: (dataToSend) => {
		return fetch(Fetch.URL_CAMERAS + '/order', {
			method: "POST",
			body: JSON.stringify(dataToSend),
			headers: {
				"content-type": "application/json"
			}
		})
	}

}