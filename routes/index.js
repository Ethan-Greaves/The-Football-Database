//#region INITILISATION
//*Express
const express                       = require('express');
const router                        = express.Router();

//*Models
const favouritesModel               = require(`../models/favourites/favourites`);

//*Module Exports
const requestDataFromAPI            = require(`../ExportFunctions/requestDataFromAPI.js`);
const countryFlags                  = require(`../ExportFunctions/CountryFlags`)
//#endregion

router.get(`/`, async (req, res) => {
    //*Create empty array to store objects of favourites which can be passed through to index.ejs
    var favouritesToDisplay = [];
    let fav;

    try {
        const favourites = await favouritesModel.find({});

        for (const element of favourites) {
            //*return an array of objects
            fav = await Promise.all([
                requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=`, element.ID.toString()),
                requestDataFromAPI(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=`, element.ID.toString())
            ])

            //*Loop through the array of fav objects
            for (let i = 0; i < fav.length; i++) {
                //*Loop and access the key for each object in fav
                for (const key in fav[i]) {
                    //*If the value of the key in the current iterated object is not null
                    if (fav[i][key] != null) {
                        //*Add the object to the list of favourites to be displayed
                        favouritesToDisplay.push(fav[i]);
                        //*break out of the loop, becasue we know the rest will be null
                        break;
                    }
                }
            }
        }

        res.render(`index.ejs`, {listOfFavourites: favouritesToDisplay, countryFlags});

    } catch (error) {
        console.error(error);
    }

})

module.exports = router;