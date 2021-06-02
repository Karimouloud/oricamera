export const Request = {
	// URL
	URL_CAMERAS: "http://localhost:3000/api/cameras",

	getCameras: () => {
		return fetch(Request.URL_CAMERAS)
	},

	getCameraById: (id) => {
		return fetch(Request.URL_CAMERAS + `/${id}`)
	},

	sendOrder: (dataToSend) => {
		return fetch(Request.URL_CAMERAS + '/order', {
			method: "POST",
			body: JSON.stringify(dataToSend),
			headers: {
				"content-type": "application/json"
			}
		})
	}
}