const { getMessageFromErrorCode } = require("./getNetworkError");
const fetch = require('node-fetch');
const endpoints = require("./../endpoints");

const lastFetchedData = {
	All_Players : {},
	All_Players_At : 0,
	All_Matches : {},
	All_Matches_At : 0
};

const cacheFor = 30000; // 10sec (1800000 = 30min)

module.exports = {
	getDataFromEndpoint : (URL, endpoint) => {
		switch (endpoint){
			case endpoints.ALL_MATCHES:
			case endpoints.ALL_PLAYERS:
				return checkCachedData(URL, endpoint);
			default:
				return getDataFromWeb(URL, endpoint);
		}
	}
}

function checkCachedData(URL, endpoint){
	if (endpoint === endpoints.ALL_PLAYERS){
		if ((lastFetchedData.All_Players_At + cacheFor) > new Date().getTime()) return { isValid : true, content : lastFetchedData.All_Players.content};
		return getDataFromWeb(URL, endpoint);
	}else if (endpoint === endpoints.ALL_MATCHES){
		if ((lastFetchedData.All_Matches_At + cacheFor) > new Date().getTime()) return { isValid : true, content : lastFetchedData.All_Matches.content};
		return getDataFromWeb(URL, endpoint);
	}
}

function getDataFromWeb(URL, endpoint) {
	return new Promise((resolve,reject) => {
		fetch(URL + endpoint).then(resp => resp.text()).then(response => {
			if (response.includes("<html>")){
				resolve({ isValid : false, content : getMessageFromErrorCode(response) }); // Filter for generic networking codes
			}else{
				data = JSON.parse(response);
				console.log(endpoint);
				if (endpoint === endpoints.ALL_PLAYERS){
					lastFetchedData.All_Players = data;
					lastFetchedData.All_Players_At = new Date().getTime();
				}else if (endpoint === endpoints.ALL_MATCHES){
					lastFetchedData.All_Matches = data;
					lastFetchedData.All_Matches_At = new Date().getTime();
				}

				resolve({ isValid : true, content : data.content });
			}
		}).catch(error => {
			resolve({ isValid : false, content : error });
		})
	})
}
