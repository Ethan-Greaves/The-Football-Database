//#region INITILISATION
//*Express
const express               = require('express');
const router                = express.Router();

//*Models
const favouritesModel       = require(`../models/favourites/favourites.js`);  
const userModel             = require(`../models/user`);

//*Mehtod-override
const methodOverride        = require(`method-override`);
                            router.use(methodOverride(`_method`));
                            
//*Middleware
const isLoggedIn            = require(`../ExportFunctions/Middleware/isLoggedIn`);


//#endregion

router.post(`/:id`, isLoggedIn, async (req, res) => {   
    try {
        // //*Check if the favourite has already been added
        // const isAlreadyFav = await favouritesModel.exists({ ID: req.params.id });

        // //*If not...
        // if (!isAlreadyFav) {
        //     //*Add the ID to the favourites database
        //     await favouritesModel.create({ID: req.params.id});
        // }

        // //*check if the user already has this favourite associated with their account
        // const isAlreadyFav = await userModel.findOne({ "favourites.ID": req.params.id });

        // if (!isAlreadyFav) {
        //     userModel.favourites.push({ ID: req.params.id });              
        // }

        //*Get the current user using req.user
        const user = req.user;

        if (!user.favourites.filter(fav => fav.ID == req.params.id).length > 0) {
             //*push the favourite onto their schema
             user.favourites.push({ ID: req.params.id });
             user.save();
          }
        
        //*Go back to the index page
        res.redirect(`/`);

    } catch (error) {
        console.error(error);
    }
})

//TODO reconfigure the routes to align with the user auth 
router.delete(`/deleteAll`, async (req, res) => {
    try {
        req.user.favourites = [];
        req.user.save();

         //*Go back to the index page
        res.redirect(`/`);
        
     } catch (error) {
         console.error(error);
     }

})

router.delete(`/:id/delete`, async (req, res) =>{
    try {
        if (req.user) {
            //*Obtain the ID of the favourite that needs to be removed
            const favID = req.params.id;
            const favs = req.user.favourites;

            console.log(favID);
            for (let i = 0; i < favs.length; i++) {
                if (favs[i].ID == favID) {
                    favs.splice(i, 1);
                    req.user.save();
                    break;
                }
            }
             
             //*Go back to the index page
             res.redirect(`/`);
        }
        
    } catch (error) {
        console.error(error);
    }
})



module.exports = router;