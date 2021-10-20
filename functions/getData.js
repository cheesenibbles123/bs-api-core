module.exports = {
	getDataFromEndpoint: (endpoint) => {
		return new Promise((resolve,reject) => {
			console.log(URL + endpoint);
			fetch(URL + endpoint).then(resp => resp.text()).then(response => {
				if (response.contains("<html>")){
					resolve({ isValid : false, content : "Fetching data error."});
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