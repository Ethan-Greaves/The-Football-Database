// #region INITILISATION
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user');

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
	session({
		secret: 'hello world',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use(flash());
// #endregion

// #region MIDDLEWARE
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.darkMode = req.session.darkMode;
	res.locals.successMessage = req.flash('success');
	res.locals.errorMessage = req.flash('error');
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
