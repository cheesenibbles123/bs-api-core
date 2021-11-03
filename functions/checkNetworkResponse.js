module.exports = {
	checkResponse: async (response, source) => {
		if (response.ok && (response.headers.get('content-type') === "application/json")){
			const jsonResponse = await response.json();
			let obj = {
				isValid : jsonResponse.success,
				content : jsonResponse.content
			}

			if (jsonResponse['data']){
				obj['data'] = jsonResponse.data;
			}
			return obj;
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

