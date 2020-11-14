function calculatePlayerAge(playerBirthday) {
	// #region INITIALISATION
	let playerAge = 0;
	//* Get the current date
	const currentDate = new Date();
	//* Break it down to year/month/day
	const [currentYear, currentMonth, currentDay] = [
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		currentDate.getDate(),
	];
	//* Break down players birthday
	const [playerBYear, playerBMonth, playerBDay] = playerBirthday.split('-');
	// #endregion

	// #region CALCULATE AGE
	//* First have the current year subtracted by the player year for a rough estimate of age
	playerAge = currentYear - playerBYear;

	//* if current month is less than player birth month, they haven't reached birthday yet, so subtract one
	if (currentMonth < playerBMonth) {
		playerAge -= 1;
	}
	//* If we are currently in the player birth month then we need to be more specific and check the day
	else if (currentMonth === playerBMonth && currentDay < playerBDay) {
		playerAge -= 1;
	}

	return playerAge;
	// #endregion
}

module.exports = calculatePlayerAge;
