// #region INITIALISATION
const methodOverride = require(`method-override`);
const express = require('express');

// *Middleware
const isLoggedIn = require(`../ModuleExports/Middleware/isLoggedIn`);

const router = express.Router();

router.use(methodOverride(`_method`));
// #endregion

// #region HELPER FUNCTIONS
function checkTypeRedirect(req, res) {
	if (req.params.type === 'player') res.redirect(`/players/${req.params.id}`);
	else res.redirect(`/teams/${req.params.id}`);
}

function removeFavourite(req) {
	if (req.user) {
		// *Obtain the ID of the favourite that needs to be removed
		const favID = req.params.id;
		const favs = req.user.favourites;
		//* Loop through user's favourites
		for (let i = 0; i < favs.length; i++) {
			//* Identify the fav to be removed
			if (favs[i].ID === Number(favID)) {
				//* Cut out of array and save
				favs.splice(i, 1);
				req.user.save();
				break;
			}
		}
	}
}
// #endregion

router.post(`/:id/:type`, isLoggedIn, async (req, res, next) => {
	try {
		if (!req.user.favourites.filter((fav) => fav.ID === req.params.id).length > 0) {
			//* push the favourite onto their schema
			req.user.favourites.push({ ID: req.params.id });
			req.user.save();
		}

		checkTypeRedirect(req, res);
	} catch (error) {
		next(error);
	}
});

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
});

router.delete(`/:id/deleteOnCard`, (req, res) => {
	removeFavourite(req);
	res.redirect(`/`);
});

router.delete(`/:id/deleteOnShow/:type`, (req, res) => {
	removeFavourite(req);
	checkTypeRedirect(req, res);
});

module.exports = router;
