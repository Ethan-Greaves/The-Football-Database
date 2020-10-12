//#region INITILISATION
//*Express
const express               = require('express');
const router                = express.Router();

//*Models
const favouritesModel       = require(`../models/favourites/favourites.js`);  

//*Mehtod-override
const methodOverride        = require(`method-override`);
                            router.use(methodOverride(`_method`));
                            
//*Middleware
const isLoggedIn = require(`../ExportFunctions/Middleware/isLoggedIn`);


//#endregion

router.post(`/:id`, isLoggedIn, async (req, res) => {   
    try {
        //*Check if the favourite has already been added
        const isAlreadyFav = await favouritesModel.exists({ ID: req.params.id });

        //*If not...
        if (!isAlreadyFav) {
            //*Add the ID to the favourites database
            await favouritesModel.create({ID: req.params.id});
        }

        //*Go back to the index page
        res.redirect(`/`);

    } catch (error) {
        console.error(error);
    }
})

router.delete(`/deleteAll`, async (req, res) => {
    try {
        //*Remove all favourites from the database model
        await favouritesModel.deleteMany({});
        
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