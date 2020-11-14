// #region INITILISATION
const requestDataFromAPI = require('./requestDataFromAPI');
// #endregion

// #region HELPER FUNCTIONS
function pushAndCollectTeamData(HomeAwayTeamInfo, teamData, mainTeam, promises, homeAwayID) {
	//* Push the home badge on to the home & away team info object
	HomeAwayTeamInfo.push({ [teamData]: { badge: mainTeam.strTeamBadge } });

	//* We don't want to do an async promise on a synchronous loop so
	//* push any promises into an array for later use
	promises.push(
		//* Get the data for the away team
		requestDataFromAPI('https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=', homeAwayID)
	);
}
// #endregion

async function acquireHomeAwayTeamInfo(matches, singleTeamData) {
	const homeAwayTeamInfo = [];
	const promises = [];
	const mainTeam = singleTeamData.teams[0];

	matches.forEach((match) => {
		//* If the home team for the specific match is equal to the preloaded team
		if (match.idHomeTeam === mainTeam.idTeam) {
			pushAndCollectTeamData(
				homeAwayTeamInfo,
				'homeTeamData',
				mainTeam,
				promises,
				match.idAwayTeam
			);
		} else {
			pushAndCollectTeamData(
				homeAwayTeamInfo,
				'awayTeamData',
				mainTeam,
				promises,
				match.idHomeTeam
			);
		}
	});

	//* Now we're out the loop, perform async task and collect all home/away teams
	const promisedTeamsData = await Promise.all(promises);

	//* Loop through all the promised teams
	for (let i = 0; i < promisedTeamsData.length; i++) {
		// *If there is home team data inside an iteration of home away info obj
		if ('homeTeamData' in homeAwayTeamInfo[i]) {
			//* We know the promised team is the away team
			homeAwayTeamInfo[i].awayTeamData = {
				badge: promisedTeamsData[i].teams[0].strTeamBadge,
				name: promisedTeamsData[i].teams[0].strTeam,
				id: promisedTeamsData[i].teams[0].idTeam,
			};
		} else {
			homeAwayTeamInfo[i].homeTeamData = {
				badge: promisedTeamsData[i].teams[0].strTeamBadge,
				name: promisedTeamsData[i].teams[0].strTeam,
				id: promisedTeamsData[i].teams[0].idTeam,
			};
		}
	}

	return homeAwayTeamInfo;
}

module.exports = acquireHomeAwayTeamInfo;
