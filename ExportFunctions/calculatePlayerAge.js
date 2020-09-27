const { Module } = require("module");

function calculatePlayerAge(playerBirthday) {
    let playerAge = 0;
    //* Get the current date
    let todaysDate = new Date();
    let [year, month, day] = playerBirthday.split("-");

    console.log([year, month, day]);
    console.log(todaysDate);
}

module.exports = calculatePlayerAge;