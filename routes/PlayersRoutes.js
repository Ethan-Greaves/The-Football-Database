// #region INITILISATION
//* Express
const express                       = require('express');
const router                        = express.Router(); 
//* Module Exports
const requestDataFromAPI            = require(`../ModuleExports/requestDataFromAPI.js`);
const CustomError                   = require(`../ModuleExports/Classes/customError`);
// #endregion

// TODO This is a global variable, kind of okay because seperation of concern has been used with routes so not really global global, but might be a better way
let playerData;

router.get(`/`, (req, res) => {
    //* Go to the show page and pass through the json data
    res.render(`Players/results.ejs`, {playerData});
})

router.post(`/`, async (req, res, next) => {
    try {
        playerData = await requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=`, req.body.playerName);
        if (playerData.player != null)
            res.redirect(`/players`);
        else throw new CustomError(res).NotFound(req.body.playerName);
        
    } catch (error) {
        next(error);
    }
})

// router.use(`/`, (req, res) => {
//     res.status(404).render(`error.ejs`, { data: req.body.playerName });
// })

router.get(`/:id`, async (req, res, next) => {
    try {
        playerData = await requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=`, req.params.id );

        //* Render the show page, pass through the data
        res.render(`Players/show.ejs`, {playerData});

    } catch (error) {
        next(error);
    }
})



module.exports = router;