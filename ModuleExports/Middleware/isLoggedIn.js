const CustomError = require('../Classes/customError');

function isLoggedIn(req, res, next) {
	if (req.user) return next() || true;

	throw new CustomError(res).Unauthorised();
}

module.exports = isLoggedIn;
