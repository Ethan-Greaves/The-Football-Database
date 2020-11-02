// #region INITILISATION
//* Express
const express                       = require('express');
const router                        = express.Router(); 
//* Module Exports
const requestDataFromAPI            = require(`../ModuleExports/requestDataFromAPI.js`);

//* Classes
const CustomError = require('../ModuleExports/Classes/customError.js');

// #endregion
let teamData;
let formData;

router.get(`/`, (req, res) => {
    //* Go to the show page and pass through the json data
    res.render(`Teams/results.ejs`, {teamData, formData});
})

router.get(`/:id`, async (req, res, next) => {
    try {
        const [teamData, teamFixturesData, teamResultsData] = await Promise.all([
            requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=`, req.params.id),
            requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=`, req.params.id),
            requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=`, req.params.id)
        ]);

        //* Render show page and pass through the team data
        res.render(`Teams/show.ejs`, {teamData, teamFixturesData, teamResultsData});

    } catch (error) {
        next(error);
    }
})

router.post(`/`, async (req, res, next) => {
    try {
        teamData = await requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=`, req.body.teamName);
        
        if (teamData.teams)
            //* Redirect to another endpoint 
            res.redirect(`/teams`);
        else throw new CustomError(res).NotFound(req.body.teamName);
    } catch (error) {
        next(error);
    }
})

module.exports = router;