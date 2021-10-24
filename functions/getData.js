const { getMessageFromErrorCode } = require("./getNetworkError");
const fetch = require('node-fetch');
const endpoints = require("./../structs/endpoints");
const urlParams = require("./../structs/urlParams");

const lastFetchedData = {
	All_Players : {},
	All_Players_At : 0,
	All_Matches : {},
	All_Matches_At : 0
};

const cacheFor = 30000; // 10sec (1800000 = 30min)

module.exports = {
	getDataFromEndpoint : (URL, apiKey, endpoint) => {
		return getDataFromWeb(URL, apiKey, endpoint);
	},
	getDataFromEndpointAll : (URL, apiKey, endpoint) => {
		return checkCachedData(URL, apiKey, endpoint);
	}
}

function checkCachedData(URL, apiKey, endpoint){
	if (endpoint === endpoints.ALL_PLAYERS){
		if ((lastFetchedData.All_Players_At + cacheFor) > new Date().getTime()) return { isValid : true, content : lastFetchedData.All_Players.content};
		return getAllDataFromWeb(URL, apiKey, endpoint);
	}else if (endpoint === endpoints.ALL_MATCHES){
		if ((lastFetchedData.All_Matches_At + cacheFor) > new Date().getTime()) return { isValid : true, content : lastFetchedData.All_Matches.content};
		return getAllDataFromWeb(URL, apiKey, endpoint);
	}
}

function getAllDataFromWeb(URL, apiKey, endpoint){
	return new Promise(async (resolve, reject) => {
		fetch(`${URL}${endpoint}?${urlParams.API_KEY}=${apiKey}&${urlParams.OFFSET}=0&${urlParams.LENGTH}=1`).then(resp => resp.text()).then(response => {
			if (response.includes("<html>")){
				resolve({ isValid : false, content : getMessageFromErrorCode(response) }); // Filter for generic networking codes
			}else{
				const totalRows = JSON.parse(response).data.available_row_count;
				fetch(URL + endpoint + `?${urlParams.OFFSET}=0&${urlParams.LENGTH}=${totalRows}`).then(resp => resp.text()).then(data => {
					if (data.includes("<html>")){
						resolve({ isValid : false, content : getMessageFromErrorCode(response) }); // Filter for generic networking codes
					}else{
						responseData = JSON.parse(data);

						if (endpoint === endpoints.ALL_PLAYERS){
							lastFetchedData.All_Players = responseData;
							lastFetchedData.All_Players_At = new Date().getTime();
						}else if (endpoint === endpoints.ALL_MATCHES){
							lastFetchedData.All_Matches = responseData;
							lastFetchedData.All_Matches_At = new Date().getTime();
						}

						resolve({ isValid : true, content : responseData.content });
					}
				}).catch(error => {
					resolve({ isvalid : false, content : error });
				});
			}
		}).catch(error => {
			resolve({ isvalid : false, content : error });
		});
	});
}

function getDataFromWeb(URL, apiKey, endpoint) {
	return new Promise((resolve,reject) => {
		fetch(`${URL}${endpoint}?${urlParams.API_KEY}=${apiKey}`).then(resp => resp.text()).then(response => {
			if (response.includes("<html>")){
				resolve({ isValid : false, content : getMessageFromErrorCode(response) }); // Filter for generic networking codes
			}else{
				resolve({ isValid : true, content : JSON.parse(response).content });
			}
		}).catch(error => {
			resolve({ isValid : false, content : error });
		})
	})
}
