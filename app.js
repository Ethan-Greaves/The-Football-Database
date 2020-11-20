// #region INITILISATION
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

//* Routes
const indexRoutes = require(`./routes/index`);
const playerRoutes = require(`./routes/PlayersRoutes`);
const teamRoutes = require(`./routes/TeamsRoutes`);
const favouritesRoutes = require(`./routes/FavouritesRoutes`);
const authRoutes = require(`./routes/AuthRoutes`);
const settingsRoutes = require('./routes/SettingsRoutes');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
mongoose.connect(`mongodb://localhost/footballDatabase`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//* Setup passport and the session
app.use(
	require(`express-session`)({
		secret: 'hello world',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
// #endregion

// #region MIDDLEWARE
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});
// #endregion

// #region ROUTES
app.use(indexRoutes);
app.use(`/players`, playerRoutes);
app.use(`/teams`, teamRoutes);
app.use(`/favourites`, favouritesRoutes);
app.use(`/settings`, settingsRoutes);
app.use(authRoutes);
// #endregion

// #region SERVER
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server has started on port ${port}`));
// #endregion
