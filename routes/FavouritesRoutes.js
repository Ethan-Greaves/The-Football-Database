//#region INITILISATION
//*Express
const express               = require('express');
const router                = express.Router();

//*Models
const favouritesModel       = require(`../models/favourites/favourites.js`);  

//*Mehtod-override
const methodOverride        = require(`method-override`);
                            router.use(methodOverride(`_method`));
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

router.delete(`/:id/delete`, async (req, res) =>{
    try {

       await favouritesModel.find({ID: req.params.id}).deleteOne().exec();

        //*Go back to the index page
        res.redirect(`/`);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;