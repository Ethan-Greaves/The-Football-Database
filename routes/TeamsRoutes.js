//#region INITILISATION
//*Express
const express                       = require('express');
const router                        = express.Router(); 
//*Module Exports
const requestDataByName             = require(`../ExportFunctions/requestDataByName.js`);
const requestDataByID               = require(`../ExportFunctions/requestDataByID.js`);
//*Fetch
const fetch                         = require('node-fetch');
//#endregion

//#region TEAMS
let teamData;
let formData;

router.get(`/`, (req, res) => {
    //*Retrieve the playerData variable that was stored in the search/player route
    //const teamData = req.app.get('teamData');

    //*Go to the show page and pass through the json data
    res.render(`Teams/results.ejs`, {teamData, formData});
})

router.get(`/:id`, (req, res) => {
    res.send("working");
})

router.post(`/`, async (req, res) => {
    //requestDataByName(app, res, req.body.teamName, `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=`, `teamData`, `/teams`);

    try {
        //*Get the form data
        ////const team = requestBodyName;

        //*Send request to the api and parse to JSON
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${req.body.teamName}`);
        const data = await response.json();

        //*Store the variable in the Express instance
        //app.set(expressInstanceName, data);
        teamData = data;
        formData = req.body;

        //*Redirect to another endpoint 
        res.redirect(`/teams`);

    } catch (error) {
        console.error(error);
    }
})

//#endregion

module.exports = router;