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

app.post(`/search/player`, async (req, res) => {
    try {
        //*Get the form data
        const player = req.body.playerName;

        //*Send request to the api and parse to JSON
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${player}`);
        const playerData = await response.json();
        
        //*Go to the show page and pass through the json data
        res.render(`show.ejs`, {playerData});
    } catch (error) {
        console.error(error);
    }
    

    //? Maybe save data to the database
})

app.post(`/search/team`, (req, res) => {
    //*Get the form data
    
    //*Send request to the api and parse to JSON

    //? Maybe save data to the database (rather than having a global variable be floating around)


})
//#endregion

//#region SERVER
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server has started on port ${port}`));
//#endregion
