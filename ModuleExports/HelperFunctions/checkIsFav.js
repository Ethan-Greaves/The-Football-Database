function checkIsFav(req) {
	let isFav = false;

	if (req.user) {
		for (let i = 0; i < req.user.favourites.length; i++) {
			if (req.user.favourites[i].ID === Number(req.params.id)) {
				isFav = true;
			}
		}
	}

	return isFav;
}

module.exports = checkIsFav;
