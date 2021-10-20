const { getMessageFromErrorCode } = require("./getNetworkError");
const fetch = require('node-fetch');

module.exports = {
	getDataFromEndpoint: (URL, endpoint) => {
		return new Promise((resolve,reject) => {
			console.log(URL + endpoint);
			fetch(URL + endpoint).then(resp => resp.text()).then(response => {
				if (response.includes("<html>")){
					resolve({ isValid : false, content : getMessageFromErrorCode(response) }); // Filter for generic networking codes
				}else{
					data = JSON.parse(response);
					resolve({ isValid : true, content : data.content });
				}
			}).catch(error => {
				resolve({ isValid : false, content : error });
			})
		})
	}
}