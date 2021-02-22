// #region INITIALISATION
const requestDataFromAPI = require(`../ModuleExports/HelperFunctions/requestDataFromAPI.js`);
const CustomError = require(`../ModuleExports/Classes/customError`);
const express = require('express');
const countryFlags = require('../ModuleExports/CountryFlags');
const checkIsFav = require('../ModuleExports/HelperFunctions/checkIsFav.js');
const calculatePlayerAge = require('../ModuleExports/HelperFunctions/calculatePlayerAge');

const router = express.Router();
// #endregion

let playerData;

router.get(`/`, (req, res) => {
	//* Go to the show page and pass through the json data
	res.render(`Players/results.ejs`, { playerData, countryFlags });
});

router.post(`/`, async (req, res, next) => {
	try {
		playerData = await requestDataFromAPI(
			`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/searchplayers.php?p=`,
			req.body.playerName
		);
		if (playerData.player != null) res.redirect(`/players`);
		else throw new CustomError(res).NotFound(req.body.playerName);
	} catch (error) {
		next(error);
	}
});

router.get(`/:id`, async (req, res, next) => {
	try {
		let playersTeam = null;

		playerData = await requestDataFromAPI(
			`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/lookupplayer.php?id=`,
			req.params.id
		);

		//* Check if player has a club
		if (
			playerData.players[0].strTeam !== '_Retired Soccer' &&
			playerData.players[0].strTeam !== '_Free Agent Soccer' &&
			playerData.players[0].strTeam !== '_Deceased Soccer'
		) {
			playersTeam = await requestDataFromAPI(
				`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/searchteams.php?t=`,
				playerData.players[0].strTeam
			);
		}

		const isFav = checkIsFav(req);

		//* Render the show page, pass through the data
		res.render(`Players/show.ejs`, {
			playerData,
			playersTeam,
			countryFlags,
			isFav,
			calculatePlayerAge,
		});
	} catch (error) {
		next(error);
	}
});

router.get(`/goToTeam/:id`, (req, res) => {
	res.redirect(`/teams/${req.params.id}`);
});
module.exports = router;
