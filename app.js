//#region INITILISATION
//*Express
const express               = require('express');
const app                   = express();
                            app.use(express.static("public"));
//*Body-Parser
const bodyParser            = require("body-parser");
                            app.use(bodyParser.urlencoded({extended: true}));
//*Fetch
const fetch                 = require('node-fetch');

//#endregion

//#region ROUTES
app.get(`/`, (req, res) => {
    res.render(`index.ejs`);
})

app.get(`/players`, (req, res) => {
    //*Retrieve the playerData variable that was stored in the search/player route
    const playerData = req.app.get('playerData');

    //*Go to the show page and pass through the json data
    res.render(`results.ejs`, {playerData});
})

app.get(`/players/:id`, async (req, res) => {
    //*Retrieve the ID
    const playerID = req.params.id;

    //*Make a request to the api to retrieve data with the associated ID
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${playerID}`);
    const playerData = await response.json();

    console.log(playerData);

    //*Render the show page, pass through the data
    res.render(`show.ejs`, {playerData});
})

app.post(`/search/player`, async (req, res) => {
    try {
        //*Get the form data
        const player = req.body.playerName;

        //*Send request to the api and parse the data sent back to JSON
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${player}`);
        const playerData = await response.json();
        
        //*Store the variable in the Express instance
        app.set('playerData', playerData);

        //*Redirect to players endpoint 
        res.redirect(`/players`);
        
    } catch (error) {
        console.error(error);
    }
})

app.post(`/search/team`, (req, res) => {
    //*Get the form data
    
    //*Send request to the api and parse to JSON
})
//#endregion

//#region SERVER
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server has started on port ${port}`));
//#endregion
