// #region INITILISATION
// *Express
const PassportLocal     = require(`passport-local`);
const user              = require(`../models/user`);
const express           = require("express");
const passport          = require('passport');
const bodyParser        = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
passport.use(new PassportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
// #endregion

// #region ROUTES
router.get(`/login`, (req, res) => {
    res.render(`Authentication/login.ejs`);
})

router.post(`/login`, passport.authenticate(`local`, {
    successRedirect: `/`,
    failureRedirect: `/login`,
}))

router.get(`/register`, (req, res) => {
    res.render(`Authentication/register.ejs`);
})

router.post(`/register`, async (req, res, next) => {
    try {
        await user.register({ username: req.body.username }, req.body.password.toString()); 
        await passport.authenticate(`local`)(req, res, () => {
            res.redirect(`/`);
        });
        
    } catch (error) {
        next(error);
    }
})

router.get(`/logout`, (req, res) => {
    req.logOut();
    res.redirect(`/`);
})
// #endregion


module.exports = router;