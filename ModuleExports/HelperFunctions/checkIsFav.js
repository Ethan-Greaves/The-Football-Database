// #region INITILISATION
const merge = require('../Sorting/MergeSort/merge');
// #endregion

function checkIsFav(req) {
	let isFav = false;

	if (req.user) {
		//* Merge the user favourites into one array. Doesnt have to be sorted.
		const favourites = merge(req.user.favouritePlayers, req.user.favouriteTeams);

		//* Loop through merged array
		for (let i = 0; i < favourites.length; i++) {
			if (favourites[i].ID === Number(req.params.id)) {
				isFav = true;
			}
		}
	}

	return isFav;
}

module.exports = checkIsFav;
