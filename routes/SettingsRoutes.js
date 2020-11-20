// #region INITILISATION
//* Express
const express = require('express');

const router = express.Router();

// #endregion

router.get('/', (req, res) => {
	res.render('Settings/settings.ejs');
});

router.post('/configureSettings', (req, res) => {
	if (req.body.darkMode === 'on') {
		req.session.darkMode = true;
	} else req.session.darkMode = false;
	res.redirect('/settings');
});

module.exports = router;
