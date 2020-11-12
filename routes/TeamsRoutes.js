// #region INITIALISATION
const requestDataFromAPI = require(`../ModuleExports/requestDataFromAPI.js`);
const express = require('express');
const CustomError = require('../ModuleExports/Classes/customError.js');
const checkIsFav = require('../ModuleExports/checkIsFav.js');
const countryFlags = require('../ModuleExports/CountryFlags');
const swapFixtureDateAround = require('../ModuleExports/swapFixtureDateAround');

const router = express.Router();
// #endregion

// #region HELPER FUNCTIONS
async function acquireHomeAwayBadges(fixtures, singleTeamData) {
	const HomeAwayBadges = [];
	const fixtureBadges = {};
	const promises = [];

	for (let i = 0; i < fixtures.length; i++) {
		if (fixtures[i].idHomeTeam === singleTeamData.teams[0].idTeam) {
			fixtureBadges.home = singleTeamData.teams[0].strTeamBadge;

			promises.push(
				requestDataFromAPI(
					'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=',
					fixtures[i].idAwayTeam
				)
			);

			HomeAwayBadges.push({ home: fixtureBadges.home });
		} else {
			fixtureBadges.away = singleTeamData.teams[0].strTeamBadge;

			promises.push(
				requestDataFromAPI(
					'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=',
					fixtures[i].idHomeTeam
				)
			);

			HomeAwayBadges.push({ away: fixtureBadges.away });
		}
	}

	const promisedBadges = await Promise.all(promises);

	for (let i = 0; i < promisedBadges.length; i++) {
		if ('home' in HomeAwayBadges[i]) {
			HomeAwayBadges[i].away = promisedBadges[i].teams[0].strTeamBadge;
		} else {
			HomeAwayBadges[i].home = promisedBadges[i].teams[0].strTeamBadge;
		}
	}

	return HomeAwayBadges;
}
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
		const fixtures = teamFixturesData.events;
		const { results } = teamResultsData;
		const isFav = checkIsFav(req);
		const resultBadges = await acquireHomeAwayBadges(results, singleTeamData);
		const fixtureBadges = await acquireHomeAwayBadges(fixtures, singleTeamData);

		console.log(resultBadges);

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
