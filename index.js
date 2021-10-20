const fetch = require('node-fetch');
const endpoints = require("./endpoints");

let URL;

module.exports = {
	init : (url) => {
		if (typeof(url) === "string"){

			if ( url[url.length - 1] !== "/"){
				url += "/";
			}

			URL = url;

		}else{
			return { isValud : false, content : "Please enter a string URL input" };
		}
	},
	getSinglePlayer: (steamID) =>{
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(`${endpoints.SINGLE_PLAYER}?steam_id=${steamID}`);
	},
	getAllPlayers: () =>{
		return getDataFromEndpoint(endpoints.ALL_PLAYERS);
	},
	getAllMatches: () =>{
		return getDataFromEndpoint(endpoints.ALL_MATCHES);
	}
}

function getDataFromEndpoint(endpoint){
	return new Promise((resolve,reject) => {
		console.log(URL + endpoint);
		fetch(URL + endpoint).then(resp => resp.text()).then(response => {
			if (false){
				resolve({ isValid : false, content : "Fetching data error."});
			}else{
				data = JSON.parse(response);
				resolve({ isValid : true, content : data.data });
			}
		}).catch(error => {
			resolve({ isValid : false, content : error });
		})
	})
}

