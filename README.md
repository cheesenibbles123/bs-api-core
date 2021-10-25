# bs-api-core

Local cache is updated only once every 30min *minimum* when a command uses a certain endpoint

### Implementation

```js
const bswrapper = require('bs-api-core');
bswrapper.setApiKey('MYAPIKEY');

// Need async to use await!
async function exampleFunction(steamID){


	const myself = await bswrapper.getSinglePlayer(steamID); // Returns single user data (Currently not working due to formatting differences)

    const myMatches = await bswrapper.getSinglePlayerMatches(steamID); // Returns all matches for a single user

	const all = await bswrapper.getAllPlayers(); // Returns all player data
		
	const allMatches = await bswrapper.getAllMatches(); // Returns all match data
}

exampleFunction('MYSTEAMID64');
```

### All Functions

- **setApiKey** => Sets the BS api key
- **getSinglePlayer** => Returns the data for a single user (Takes their steamID64 as input)
- **getSinglePlayerMatches** => Returns all matches for a single user (Takes their steamID64 as input)
- **getAllPlayers** => Returns the data for all players
- **getAllMatches** => Returns the data for all matches

### Example Responses

**getSinglePlayer**

```js
{
  isValid: true,
  content: {
    id: '1',
    steam_id: '7659999999999999',
    display_name: 'Display_Name',
    level: '999',
    total_experience: '999999',
    br_games_played: '99',
    br_games_won: '66',
    conquest_games_played: '99',
    conquest_games_won: '66',
    cursed_games_played: '99',
    cursed_games_won: '66',
    first_seen: '1970-08-23 18:11:30',
    last_seen: '1970-10-20 21:19:56'
  }
}
```

**getSinglePlayerMatches**

```js
{
    isValid : true,
    content: [
        {
            id: '1',
            display_name: 'Display_Name',
            player_steam_id: '7659999999999999',
            level: '999',
            experience: '999999',
            duration: '99',
            date: '1970-10-20 21:19:56'
        }
    ...]
}
```

**getAllPlayers**

```js
{
    isValid : true,
    content: [
        {
            id: '1',
            steam_id: '7659999999999999',
            display_name: 'Display_Name',
            level: '999',
            total_experience: '999999',
            br_games_played: '99',
            br_games_won: '66',
            conquest_games_played: '99',
            conquest_games_won: '66',
            cursed_games_played: '99',
            cursed_games_won: '66',
            first_seen: '1970-08-23 18:11:30',
            last_seen: '1970-10-20 21:19:56'
        }
    ...]
}
```

**getAllMatches**

```js
{
    isValid : true,
    content: [
        {
            id: '1',
            display_name: 'Display_Name',
            player_steam_id: '7659999999999999',
            level: '999',
            experience: '999999',
            duration: '99',
            date: '1970-10-20 21:19:56'
        }
    ...]
}
```
