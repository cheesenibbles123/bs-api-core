# Blazing Sails Api Wrapper

(name **TBD**)

### Implementation

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

### All Functions

- **getSinglePlayer** => Returns the data for a single user (Takes their steamID64 as input)
- **getAllPlayers** => Returns the data for all players
- **getAllMatches** => Returns the data for all matches

### Example Responses

**getSinglePlayer**

```json
{
	"content" : {
        "id": "1",
        "steam_id": "1234",
        "display_name": "test",
        "level": "15",
        "total_experience": "99999999",
        "first_seen": "2021-08-23 16:16:52",
        "last_seen": "2021-10-14 16:51:01"
    }
}
```

**getAllPlayers()**, **getAllMatches()**

```json
{
    "data": {
        "row_count": 123456789,
        "update_time": "2021-10-20 17:05:34"
    },
    "content": [{
        "id": "1",
        "steam_id": "1234",
        "display_name": "test",
        "level": "15",
        "total_experience": "99999999",
        "first_seen": "2021-08-23 16:16:52",
        "last_seen": "2021-10-14 16:51:01"
    }
```