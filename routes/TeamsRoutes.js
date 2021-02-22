// #region INITIALISATION
const requestDataFromAPI = require(`../ModuleExports/HelperFunctions/requestDataFromAPI.js`);
const express = require('express');
const CustomError = require('../ModuleExports/Classes/customError.js');
const checkIsFav = require('../ModuleExports/HelperFunctions/checkIsFav.js');
const countryFlags = require('../ModuleExports/CountryFlags');
const swapFixtureDateAround = require('../ModuleExports/HelperFunctions/swapFixtureDateAround');
const acquireHomeAwayTeamInfo = require('../ModuleExports/HelperFunctions/acquireHomeAwayTeamInfo');

const router = express.Router();
// #endregion

let multipleTeamsData;
let formData;

router.get(`/`, (req, res) => {
	//* Go to the show page and pass through the json data
	res.render(`Teams/results.ejs`, { teamData: multipleTeamsData, formData });
});

router.get(`/:id`, async (req, res, next) => {
	try {
		const [singleTeamData, teamFixturesData, teamResultsData] = await Promise.all([
			requestDataFromAPI(
				`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/lookupteam.php?id=`,
				req.params.id
			),
			requestDataFromAPI(
				`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/eventsnext.php?id=`,
				req.params.id
			),
			requestDataFromAPI(
				`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/eventslast.php?id=`,
				req.params.id
			),
		]);
		const fixtures = teamFixturesData.events;
		const { results } = teamResultsData;
		const isFav = checkIsFav(req);
		const resultBadges = await acquireHomeAwayTeamInfo(results, singleTeamData);
		const fixtureBadges = await acquireHomeAwayTeamInfo(fixtures, singleTeamData);

		//* Render show page and pass through the team data
		res.render(`Teams/show.ejs`, {
			teamData: singleTeamData,
			isFav,
			countryFlags,
			fixtures,
			results,
			swapFixtureDateAround,
			resultBadges,
			fixtureBadges,
		});
	} catch (error) {
		next(error);
	}
});

router.post(`/`, async (req, res, next) => {
	try {
		multipleTeamsData = await requestDataFromAPI(
			`https://www.thesportsdb.com/api/v1/json/${process.env.APIKEY}/searchteams.php?t=`,
			req.body.teamName
		);

		if (multipleTeamsData.teams)
			//* Redirect to another endpoint
			res.redirect(`/teams`);
		else throw new CustomError(res).NotFound(req.body.teamName);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
