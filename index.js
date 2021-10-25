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
	getSinglePlayer: (steamID) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL, `${endpoints.SINGLE_PLAYER}?${urlParams.API_KEY}=${apiKey}&${urlParams.STEAM_ID}=${steamID}`, { steamID : steamID });
	},
	getSinglePlayerForce: (steamID) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL, `${endpoints.SINGLE_PLAYER}?${urlParams.API_KEY}=${apiKey}&${urlParams.STEAM_ID}=${steamID}&${urlParams.FORCE_UPDATE}=true`, { steamID : steamID });
	},
	getSinglePlayerMatches: (steamID) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL, `${endpoints.SINGLE_PLAYER_MATCHES}?${urlParams.API_KEY}=${apiKey}&${urlParams.STEAM_ID}=${steamID}`, { steamID : steamID });
	},
	getSinglePlayerMatchesForce: (steamID) => {
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL, `${endpoints.SINGLE_PLAYER_MATCHES}?${urlParams.API_KEY}=${apiKey}&${urlParams.STEAM_ID}=${steamID}&${urlParams.FORCE_UPDATE}=true`, { steamID : steamID });
	},
	getAllPlayers: () =>{
		return getDataFromEndpoint(URL, `${endpoints.ALL_PLAYERS}?${urlParams.API_KEY}=${apiKey}&${urlParams.OFFSET}=0`, null);
	},
	getAllPlayersForce: () =>{
		return getDataFromEndpoint(URL, `${endpoints.ALL_PLAYERS}?${urlParams.API_KEY}=${apiKey}&${urlParams.OFFSET}=0&${urlParams.FORCE_UPDATE}=true`, null);
	},
	getAllMatches: () =>{
		return getDataFromEndpoint(URL, `${endpoints.ALL_MATCHES}?${urlParams.API_KEY}=${apiKey}&${urlParams.OFFSET}=0`, null);
	},
	getAllMatchesForce: () =>{
		return getDataFromEndpoint(URL, `${endpoints.ALL_MATCHES}?${urlParams.API_KEY}=${apiKey}&${urlParams.OFFSET}=0&${urlParams.FORCE_UPDATE}=true`, null);
	}
}
