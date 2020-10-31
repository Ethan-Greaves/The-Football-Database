const customError = require('../Classes/customError');

function isLoggedIn(req, res, next) {
    if (req.user)
        return next() || true;
    
    throw new customError(res).Unauthorised();
}

module.exports = isLoggedIn;