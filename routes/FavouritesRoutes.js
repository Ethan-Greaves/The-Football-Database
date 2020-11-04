// #region INITILISATION
const methodOverride        = require(`method-override`);
const express               = require('express');

// *Middleware
const isLoggedIn            = require(`../ModuleExports/Middleware/isLoggedIn`);

const router                = express.Router();

router.use(methodOverride(`_method`));
// #endregion

router.post(`/:id`, isLoggedIn, async (req, res, next) => {   
    try {
        if (!req.user.favourites.filter(fav => fav.ID === req.params.id).length > 0) {
             //* push the favourite onto their schema
             req.user.favourites.push({ ID: req.params.id });
             req.user.save();
          }
        
        //* Go back to the index page
        res.redirect(`/`);
    } catch (error) {
        next(error);
    }
})

// TODO reconfigure the routes to align with the user auth 
router.delete(`/deleteAll`, (req, res) => {
    try {
        req.user.favourites = [];
        req.user.save();

         // *Go back to the index page
        res.redirect(`/`);
        
     } catch (error) {
         console.error(error);
     }

})

router.delete(`/:id/delete`, (req, res) =>{
    try {
        if (req.user) {
            // *Obtain the ID of the favourite that needs to be removed
            const favID = req.params.id;
            const favs = req.user.favourites;
            //* Loop through user's favourites
            for (let i = 0; i < favs.length; i++) {
                //* Identify the fav to be reomved
                if (favs[i].ID === Number(favID)) {
                    //* Cut out of array and save
                    favs.splice(i, 1);
                    req.user.save();
                    break;
                }
            }
             
             // *Go back to the index page
             res.redirect(`/`);
        }
        
    } catch (error) {
        console.error(error);
    }
})



module.exports = router;