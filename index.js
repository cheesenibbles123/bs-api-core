const endpoints = require("./structs/endpoints");
const urlParams = require("./structs/urlParams");
const { getDataFromEndpoint } = require("./functions/getData");

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
	getSinglePlayer: (steamID, forceUpdate = false) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		const endpointUrl = formatForce(`${endpoints.SINGLE_PLAYER}?${urlParams.API_KEY}=${apiKey}&${urlParams.STEAM_ID}=${steamID}`, forceUpdate);
		return getDataFromEndpoint(URL, endpointUrl, { steamID : steamID });
	},
	getSinglePlayerMatches: (steamID, forceUpdate = false) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		const endpointUrl = formatForce(`${endpoints.SINGLE_PLAYER_MATCHES}?${urlParams.API_KEY}=${apiKey}&${urlParams.STEAM_ID}=${steamID}`, forceUpdate);
		return getDataFromEndpoint(URL, endpointUrl, { steamID : steamID });
	},
	getAllPlayers: (forceUpdate = false) =>{
		const endpointUrl = formatForce(`${endpoints.ALL_PLAYERS}?${urlParams.API_KEY}=${apiKey}&${urlParams.OFFSET}=0`, forceUpdate);
		return getDataFromEndpoint(URL, endpointUrl, null);
	},
	getAllMatches: (forceUpdate = false) =>{
		const endpointUrl = formatForce(`${endpoints.ALL_MATCHES}?${urlParams.API_KEY}=${apiKey}&${urlParams.OFFSET}=0`, forceUpdate);
		return getDataFromEndpoint(URL, endpointUrl, null);
	}
}

function formatForce(endpointUrl, forceUpdate){
	if (forceUpdate){
		return endpointUrl += `&${urlParams.FORCE_UPDATE}=true`;
	}
	return endpointUrl;
}