// #region INITILISATION
//* Fetch
const fetch = require('node-fetch');
// #endregion

async function requestDataFromAPI(APILink, variable){
    try {
        //* Send request to the api and return parsed JSON
        const response = await fetch(`${APILink}${variable}`);
        return await response.json();

    } catch (error) {
        console.error(error);
    }

    return null;
}

module.exports = requestDataFromAPI;