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

//#region PLAYERS
//TODO This is a global variable, kind of okay because seperation of concern has been used with routes so not really global global, but might be a better way
let playerData;

router.get(`/`, (req, res) => {
    //*Retrieve the playerData variable that was stored in the search/player route
    //const playerData = req.router.get('playerData');

    //*Go to the show page and pass through the json data
    res.render(`Players/results.ejs`, {playerData});

    console.log(playerData);
})

router.get(`/:id`, async (req, res) => {
    //*Retrieve the ID
    const playerID = req.params.id;

    //*Make a request to the api to retrieve data with the associated ID
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${playerID}`);
    const playerData = await response.json();

    //*Render the show page, pass through the data
    res.render(`Players/show.ejs`, {playerData});

    //requestDataByID(res, req.params.id, `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=`, `Players/show.ejs`);
})

router.post(`/`, async (req, res) => {
    try {
        //*Get the form data
        ////const team = requestBodyName;

        //*Send request to the api and parse to JSON
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${req.body.playerName}`);
        const data = await response.json();

        //*Store the variable in the Express instance
        //router.set(`playerData`, data);
        playerData = data;

        //*Redirect to another endpoint 
        res.redirect(`/players`);

    } catch (error) {
        console.error(error);
    }

    //requestDataByName(router, res, req.body.playerName, `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=`, `playerData`, `/players`);
})
//#endregion

module.exports = router;