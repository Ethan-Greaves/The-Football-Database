function isLoggedIn(req, res, next) {
    if (req.user)
        return next() || true;
    
    res.redirect(`/login`);
}

module.exports = isLoggedIn;