const endpoints = require("./structs/endpoints");
const urlParams = require("./structs/urlParams");
const { getDataFromEndpoint, getDataFromEndpointAll, setCache } = require("./functions/getData");

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
	setCacheTimeout: (newTimeout) => { // For debug
		setCache(newTimeout);
	},
	getSinglePlayer: (steamID) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL, `${endpoints.SINGLE_PLAYER}?${urlParams.API_KEY}=${apiKey}&${urlParams.STEAM_ID}=${steamID}`);
	},
	getSinglePlayerMatches: (steamID) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL, `${endpoints.SINGLE_PLAYER_MATCHES}?${urlParams.API_KEY}=${apiKey}&${urlParams.STEAM_ID}=${steamID}`);
	},
	getAllPlayers: () =>{
		return getDataFromEndpointAll(URL, `${endpoints.ALL_PLAYERS}?${urlParams.API_KEY}=${apiKey}&${urlParams.OFFSET}=0`);
	},
	getAllMatches: () =>{
		return getDataFromEndpointAll(URL, `${endpoints.ALL_MATCHES}?${urlParams.API_KEY}=${apiKey}&${urlParams.OFFSET}=0`);
	}
}
