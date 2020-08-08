//#region INITILISATION
//*Express
const express               = require('express');
const router                = express.Router();

//*Models
const favouritesModel       = require(`../models/favourites/favourites.js`);  
//#endregion

router.post(`/:id`, async (req, res) => {   
    try {
        //*Add the ID to the favourites database
        const createdID = await favouritesModel.create({ID: req.params.id});

        //*Go back to the index page
        res.redirect(`/`);

    } catch (error) {
        console.error(error);
    }
    
})

module.exports = router;