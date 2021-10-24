const endpoints = require("./endpoints");
const { getDataFromEndpoint, getDataFromEndpointAll } = require("./functions/getData");

let URL;

module.exports = {
	init : (url) => {
		if (typeof(url) === "string"){

			if ( url[url.length - 1] !== "/"){
				url += "/";
			}

			URL = url;

		}else{
			return { isValid : false, content : "Please enter a string URL input" };
		}
	},
	getSinglePlayer: (steamID) =>{
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL,`${endpoints.SINGLE_PLAYER}?steam_id=${steamID}`);
	},
	getSinglePlayerMatches: (steamID) =>{
		if (isNaN(parseInt(steamID))){
			return { isValid : false, content : "Please enter a valid steamID64" };
		}
		return getDataFromEndpoint(URL,`${endpoints.SINGLE_PLAYER_MATCHES}?steam_id=${steamID}`);
	},
	getAllPlayers: () =>{
		return getDataFromEndpointAll(URL,endpoints.ALL_PLAYERS);
	},
	getAllMatches: () =>{
		return getDataFromEndpointAll(URL,endpoints.ALL_MATCHES);
	}
}
