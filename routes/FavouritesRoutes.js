// #region INITIALISATION
const methodOverride = require(`method-override`);
const express = require('express');
const requestDataFromAPI = require('../ModuleExports/HelperFunctions/requestDataFromAPI');
const calculatePlayerAge = require('../ModuleExports/HelperFunctions/calculatePlayerAge');
const turnStringIntoAcrynom = require('../ModuleExports/HelperFunctions/turnStringIntoAcronym');
const formatPlayerHeight = require('../ModuleExports/HelperFunctions/formatPlayerHeight');
const formatPlayerGender = require('../ModuleExports/HelperFunctions/formatPlayerGender');
const merge = require('../ModuleExports/Sorting/MergeSort/merge');

// *Middleware
const isLoggedIn = require(`../ModuleExports/Middleware/isLoggedIn`);
const router = express.Router();
router.use(methodOverride(`_method`));
// #endregion

// #region HELPER FUNCTIONS
function checkTypeRedirect(req, res) {
	if (req.params.type === 'player') res.redirect(`/players/${req.params.id}`);
	else res.redirect(`/teams/${req.params.id}`);
}

function removeFavourite(req) {
	if (req.user) {
		// *Obtain the ID of the favourite that needs to be removed
		const favID = req.params.id;
		const favs = merge(req.user.favouritePlayers, req.user.favouriteTeams);
		//* Loop through user's favourites
		for (let i = 0; i < favs.length; i++) {
			//* Identify the fav to be removed
			if (favs[i].ID === Number(favID)) {
				//* Check type
				if (favs[i].Type === 'team') {
					//* Cut out of array
					req.user.favouriteTeams.splice(i, 1);
				} else {
					req.user.favouritePlayers.splice(i, 1);
				}

				req.user.save();
				break;
			}
		}
	}
}
// #endregion

router.post(`/:id/:type`, isLoggedIn, async (req, res, next) => {
	try {
		//* push the favourite onto their schema
		if (req.params.type === 'team') {
			const teamData = await requestDataFromAPI(
				`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/lookupteam.php?id=`,
				req.params.id
			);

			const team = teamData.teams[0];

			req.user.favouriteTeams.push({
				ID: req.params.id,
				Type: req.params.type,
				Name: team.strTeam,
				Badge: team.strTeamBadge,
				Founded: team.intFormedYear,
				Nation: team.strCountry,
				Gender: formatPlayerGender(team.strGender),
				Kit: team.strTeamJersey,
				League: turnStringIntoAcrynom(team.strLeague),
				Added: new Date(),
			});
		} else {
			//* Make an API request to get the player's data
			const playerData = await requestDataFromAPI(
				`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/lookupplayer.php?id=`,
				req.params.id
			);

			//* Shorten player variable
			const player = playerData.players[0];

			//* Make another API request to get the player's team data
			const playersTeamData = await requestDataFromAPI(
				`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/lookupteam.php?id=`,
				player.idTeam
			);

			const playersTeam = playersTeamData.teams[0];

			const playerfavouriteInfo = {
				ID: req.params.id,
				Type: req.params.type,
				Name: player.strPlayer,
				Picture: player.strCutout,
				BackupPicture: player.strThumb,
				Age: calculatePlayerAge(player.dateBorn),
				Nation: player.strNationality,
				Position: turnStringIntoAcrynom(player.strPosition),
				Club: { Badge: playersTeam.strTeamBadge, name: playersTeam.strTeam },
				Height: formatPlayerHeight(player.strHeight),
				Gender: formatPlayerGender(player.strGender),
				Added: new Date(),
			};

			req.user.favouritePlayers.push(playerfavouriteInfo);
		}
		req.user.save();
		checkTypeRedirect(req, res);
	} catch (error) {
		next(error);
	}
});

// TODO reconfigure the routes to align with the user auth
router.delete(`/deleteAll`, (req, res) => {
	try {
		req.user.favouritePlayers = [];
		req.user.favouriteTeams = [];
		req.user.save();

		// *Go back to the index page
		res.redirect(`/`);
	} catch (error) {
		console.error(error);
	}
});

router.delete(`/:id/deleteOnCard`, (req, res) => {
	removeFavourite(req);
	res.redirect(`/`);
});

router.delete(`/:id/deleteOnShow/:type`, (req, res) => {
	removeFavourite(req);
	checkTypeRedirect(req, res);
});

module.exports = router;
