# Blazing Sails Api Wrapper

(name **TBD**)

## Implementation

```js
const bswrapper = require('BlazingSailsWrapper');

bswrapper.init('API URL');

exampleFunction('MYSTEAMID64');

// Need async to use await!
async function exampleFunction(steamID){


	const myself = await bswrapper.getSinglePlayer(steamID); // Returns single user data (Currently not working due to formatting differences)

	const all = await bswrapper.getAllPlayers(); // Returns all player data
		
	const allMatches = await bswrapper.getAllMatches(); // Returns all match data
}
```
