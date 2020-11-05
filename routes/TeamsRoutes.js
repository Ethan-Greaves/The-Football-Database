// #region INITILISATION
const requestDataFromAPI = require(`../ModuleExports/requestDataFromAPI.js`);
const express = require('express');
const CustomError = require('../ModuleExports/Classes/customError.js');

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
				`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=`,
				req.params.id
			),
			requestDataFromAPI(
				`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=`,
				req.params.id
			),
			requestDataFromAPI(
				`https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=`,
				req.params.id
			),
		]);

		//* Render show page and pass through the team data
		res.render(`Teams/show.ejs`, { teamData: singleTeamData, teamFixturesData, teamResultsData });
	} catch (error) {
		next(error);
	}
});

router.post(`/`, async (req, res, next) => {
	try {
		multipleTeamsData = await requestDataFromAPI(
			`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=`,
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
