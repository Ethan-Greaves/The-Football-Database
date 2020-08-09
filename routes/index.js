//#region INITILISATION
//*Express
const express                       = require('express');
const router                        = express.Router();

//*Models
const favouritesModel           = require(`../models/favourites/favourites`);

//*Module Exports
const requestDataFromAPI            = require(`../ExportFunctions/requestDataFromAPI.js`);
//#endregion

router.get(`/`, async (req, res) => {
    //*Create empty array to store objects of favourites which can be passed through to index.ejs
    var listOfFavourites = [];
    let fav;

    try {
        const favourites = await favouritesModel.find({});

        for (const element of favourites) {
            //TODO Not sure if the two fetch calls can be done asynchronously to increase speed (is taking about FIVE SECONDS currently to load page with 15 favourites)
            //*Search through the IDs of teams
            fav = await requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=`, element.ID.toString());
            //*If teams returns null
            if (fav.teams === null) {
                //*Search through the players instead
                fav = await requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=`, element.ID.toString());
            }
            listOfFavourites.push(fav);
        }

        res.render(`index.ejs`, {listOfFavourites});

    } catch (error) {
        console.error(error);
    }

})

module.exports = router;