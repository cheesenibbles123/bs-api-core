const endpoints = require("./structs/endpoints");
const urlParams = require("./structs/urlParams");
const { getDataFromEndpoint, getDataFromEndpointAll } = require("./functions/getData");

let URL = "https://blazing-sails.bitnamiapp.com/php_rest_blazingsails/api/post/";
let apiKey;

module.exports = {
	setURL : (url) => {
		if (typeof(url) === "string"){

			if ( url[url.length - 1] !== "/"){
				url += "/";
			}

			URL = url;

		}else{
			return { isValid : false, content : "Please enter a string URL input" };
		}
	},
	setApiKey: (newApiKey) => {
		apiKey = newApiKey;
	},
	getSinglePlayer: (steamID) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL, apiKey, `${endpoints.SINGLE_PLAYER}?${urlParams.STEAM_ID}=${steamID}`);
	},
	getSinglePlayerMatches: (steamID) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL, apiKey, `${endpoints.SINGLE_PLAYER_MATCHES}?${urlParams.STEAM_ID}=${steamID}`);
	},
	getAllPlayers: () =>{
		return getDataFromEndpointAll(URL, apiKey, endpoints.ALL_PLAYERS);
	},
	getAllMatches: () =>{
		return getDataFromEndpointAll(URL, apiKey, endpoints.ALL_MATCHES);
	}
}
