//#region INITILISATION
//*Express
const express                       = require('express');
const app                           = express();
                                    app.use(express.static("public"));
//*Body-Parser
const bodyParser                    = require("body-parser");
                                    app.use(bodyParser.urlencoded({extended: true}));
//*Fetch
const fetch                         = require('node-fetch');

//*Module Exports
const requestDataByName             = require(`./ExportFunctions/requestDataByName.js`);
const requestDataByID               = require(`./ExportFunctions/requestDataByID.js`);

//#endregion

//#region ROUTES
app.get(`/`, (req, res) => {
    res.render(`index.ejs`);
})
//#region PLAYERS
app.get(`/players`, (req, res) => {
    //*Retrieve the playerData variable that was stored in the search/player route
    const playerData = req.app.get('playerData');

    //*Go to the show page and pass through the json data
    res.render(`Players/results.ejs`, {playerData});
})

app.get(`/players/:id`, (req, res) => {
    // //*Retrieve the ID
    // const playerID = req.params.id;

    // //*Make a request to the api to retrieve data with the associated ID
    // const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${playerID}`);
    // const playerData = await response.json();

    // //*Render the show page, pass through the data
    // res.render(`show.ejs`, {playerData});

    const data = requestDataByID(res, req.params.id, `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=`, `show.ejs`);
})

app.post(`/players`, (req, res) => {
    requestDataByName(app, res, req.body.playerName, `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=`, `playerData`, `/players`);
})
//#endregion
//#region TEAMS
app.get(`/teams`, (req, res) => {
    //*Retrieve the playerData variable that was stored in the search/player route
    const teamData = req.app.get('teamData');

    //*Go to the show page and pass through the json data
    res.render(`Teams/results.ejs`, {teamData});

})

app.get(`/teams/:id`, (req, res) => {
    res.send("working");
})

app.post(`/teams`, (req, res) => {
    requestDataByName(app, res, req.body.teamName, `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=`, `teamData`, `/teams`);
})

//#endregion
//#endregion

//#region SERVER
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server has started on port ${port}`));
//#endregion
