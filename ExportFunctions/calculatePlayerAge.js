const { Module } = require("module");

function calculatePlayerAge(playerBirthday) {
    let playerAge = 0;
    //* Get the current date
    const currentDate = new Date();
    //*Break it down to year/month/day
    const [currentYear, currentMonth, currentDay] = [currentDate.getFullYear(), (currentDate.getMonth() + 1), currentDate.getDate()];
    //*Break down players birthday
    const [playerBYear, playerBMonth, playerBDay] = playerBirthday.split("-");

    //*Calculate age

    //*First have the current year subtracted by the player year for a rough estimate of age
    playerAge = currentYear - playerBYear;

    //* if current month is less than player birth month, they havent reached birthday yet, so subtract one
    if (currentMonth < playerBMonth) {
        playerAge--;
    }
    //*If we are currently in the player birth month then we need to be more specific and check the day
    else if (currentMonth === playerBMonth && currentDay < playerBDay) {
        playerAge--;
    }

    return playerAge;
}

module.exports = calculatePlayerAge;