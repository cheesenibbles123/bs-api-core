module.exports = {
	checkResponse: async (response, source) => {
		console.log(response.headers.raw());
		if (response.ok && (response.headers.get('content-type') === "application/json")){
			return { isValid : true, content : await response.json() };
		}else{
			return { 
				isValid : false,
				content : {
					causedByUser : response.ok ? true : false,
					code : response.status,
					message : response.ok ? await response.text() : response.statusText,
					source : source
				}
			};
		}
	}
}