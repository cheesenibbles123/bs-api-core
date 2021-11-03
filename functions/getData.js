const { checkResponse } = require("./checkNetworkResponse");
const fetch = require('node-fetch');
const endpoints = require("./../structs/endpoints");
const urlParams = require("./../structs/urlParams");

const lastFetchedData = {
	All_Players : {},
	All_Players_At : 0,
	All_Matches : {},
	All_Matches_At : 0,
	Single_Players : {}
};

const cacheFor = 1800000;

module.exports = {
	getDataFromEndpoint : (URL, endpoint, extraData) => {
		return checkCachedData(URL, endpoint, extraData);
	},
}

function checkCachedData(URL, endpoint, extraData){
	if (endpoint.includes(endpoints.ALL_PLAYERS)){
		if ((lastFetchedData.All_Players_At + cacheFor) > new Date().getTime()) return { isValid : true, content : lastFetchedData.All_Players.content};
		return getAllDataFromWeb(URL, endpoint);
	}else if (endpoint.includes(endpoints.ALL_MATCHES)){
		if ((lastFetchedData.All_Matches_At + cacheFor) > new Date().getTime()) return { isValid : true, content : lastFetchedData.All_Matches.content};
		return getAllDataFromWeb(URL, endpoint);
	}else if (endpoint.includes(endpoints.SINGLE_PLAYER)){
		if (lastFetchedData.Single_Players[extraData.steamID] && (lastFetchedData.Single_Players[extraData.steamID].Player_Info_At + cacheFor) > new Date().getTime()) return { isValid : true, content : lastFetchedData.Single_Players[extraData.steamID].Player_Info};
		return getDataFromWeb(URL, endpoint);
	}else{
		if (lastFetchedData.Single_Players[extraData.steamID] && (lastFetchedData.Single_Players[extraData.steamID].Player_Matches_At + cacheFor) > new Date().getTime()) return { isValid : true, content : lastFetchedData.Single_Players[extraData.steamID].Player_Matches};
		return getDataFromWeb(URL, endpoint);
	}
}

function getAllDataFromWeb(URL, endpoint){
	return new Promise(async (resolve, reject) => {
		fetch(`${URL}${endpoint}&${urlParams.LENGTH}=1`).then(async response => {
			let checkedResponse = await checkResponse(response);
			if (!checkedResponse.isValid){
				resolve(checkedResponse);
			}else{
				const totalRows = checkedResponse.content.data.available_row_count;
				fetch(`${URL}${endpoint}&${urlParams.LENGTH}=${totalRows}`).then(async data => {
					checkedResponse = await checkResponse(data);
					if (!checkedResponse.isValid){
						resolve(checkedResponse);
					}else{
						responseData = checkedResponse.content;

						if (endpoint.includes(endpoints.ALL_PLAYERS)){
							lastFetchedData.All_Players = responseData;
							lastFetchedData.All_Players_At = new Date().getTime();
						}else if (endpoint.includes(endpoints.ALL_MATCHES)){
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

function getDataFromWeb(URL, endpoint) {
	return new Promise((resolve,reject) => {
		fetch(`${URL}${endpoint}`).then(async response => {
			const checkedResponse = await checkResponse(response);
			if (!checkedResponse.isValid){
				resolve(checkedResponse);
			}else{
				let data = checkedResponse.content;

				if (endpoint.includes(endpoints.SINGLE_PLAYER)){
					if (lastFetchedData.Single_Players[data.steam_id]){
						lastFetchedData.Single_Players[data.steam_id].Player_Info = data;
						lastFetchedData.Single_Players[data.steam_id].Player_Info_At = new Date().getTime();
					}else{
						lastFetchedData.Single_Players[data.steam_id] = {
							Player_Info : data,
							Player_Info_At : new Date().getTime(),
							Player_Matches : [],
							Player_Matches_At : 0
						}
					}
				}else{
					if (lastFetchedData.Single_Players[data.steam_id]){
						lastFetchedData.Single_Players[data.steam_id].Player_Matches = data;
						lastFetchedData.Single_Players[data.steam_id].Player_Matches_At = new Date().getTime();
					}else{
						lastFetchedData.Single_Players[data.steam_id] = {
							Player_Info : {},
							Player_Info_At : 0,
							Player_Matches : data,
							Player_Matches_At : new Date().getTime()
						}
					}
				}

				resolve({ isValid : data.steam_id !== null ? true : false, content : data.steam_id !== null ? data : "User with given steam_id not found" });
			}
		}).catch(error => {
			resolve({ isValid : false, content : error });
		});
	});
}
