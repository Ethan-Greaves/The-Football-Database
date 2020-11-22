// #region INITIALISATION
// *Express
const PassportLocal = require(`passport-local`);
const User = require(`../models/user`);
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// #endregion

// #region ROUTES
router.get(`/login`, (req, res) => {
	res.render(`Authentication/login.ejs`);
});

router.post(
	`/login`,
	passport.authenticate(`local`, {
		successRedirect: `/`,
		failureRedirect: `/login`,
		failureFlash: true,
	})
);

router.get(`/register`, (req, res) => {
	res.render(`Authentication/register.ejs`);
});

router.post(`/register`, async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = new User({ username });

		//* Register the user onto the database
		const registeredUser = await User.register(user, password);

		//* Automatically log them in after registering
		req.logIn(registeredUser, (error) => {
			if (!error) {
				req.flash('success', `Welcome, ${req.user.username}!`);
				res.redirect('/');
			} else next(error);
		});
	} catch (error) {
		req.flash('error', error.message);
		res.redirect('/register');
	}
});

router.get(`/logout`, (req, res) => {
	req.logOut();
	res.redirect(`/`);
});
// #endregion

module.exports = router;
