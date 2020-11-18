// #region INITILISATION
// #region REQUIRE STATEMENTS
//* Express
const express = require('express');

//* Module Exports
const merge = require('../ModuleExports/Sorting/MergeSort/merge');
const mergeSort = require('../ModuleExports/Sorting/MergeSort/mergeSort');

// #endregion

const router = express.Router();
// #endregion

router.get(`/`, (req, res) => {
	let favourites = [];

	if (req.user) {
		favourites = mergeSort(merge(req.user.favouritePlayers, req.user.favouriteTeams));
	}

	res.render('index.ejs', { favourites });
});

module.exports = router;
