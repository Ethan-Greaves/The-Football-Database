//#region INITILISATION
//*Express
const express           = require("express");
const router            = express.Router();

const passport          = require('passport');
const passportLocal     = require(`passport-local`);
const user              = require(`../models/user`);

//*Body-Parser
const bodyParser        = require("body-parser");
                        router.use(bodyParser.urlencoded({ extended: true }));
                                    

passport.use(new passportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
//#endregion

//#region ROUTES
router.get(`/login`, (req, res) => {
    res.render(`Authentication/login.ejs`/*, {currentUser: req.user}*/);
})

router.post(`/login`, passport.authenticate(`local`, {
    successRedirect: `/`,
    failureRedirect: `/login`,
}), (req, res) => {})

router.get(`/register`, (req, res) => {
    res.render(`Authentication/register.ejs`);
})

router.post(`/register`, async (req, res) => {
    try {
        await user.register({ username: req.body.username }, req.body.password.toString()); 
        await passport.authenticate(`local`)(req, res, () => {
            res.redirect(`/`);
        });
        
    } catch (error) {
        console.error(error);
        return res.render(`Authentication/register.ejs`);
    }
})

router.get(`/logout`, (req, res) => {
    req.logOut();
    res.redirect(`/`);
})
//#endregion


module.exports = router;