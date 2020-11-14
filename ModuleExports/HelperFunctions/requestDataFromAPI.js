// #region INITIALISATION
//* Fetch
const fetch = require('node-fetch');
// #endregion

async function requestDataFromAPI(APILink, variable) {
	try {
		//* Send request to the api and return parsed JSON
		const response = await fetch(`${APILink}${variable}`);
		if (response.ok) return await response.json();

		//* If response isn't ok then throw an error to be caught
		throw new Error('Fetch request failed!');
	} catch (error) {
		console.error(error);
	}

	return null;
}

module.exports = requestDataFromAPI;
