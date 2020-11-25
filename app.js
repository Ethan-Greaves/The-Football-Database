// #region INITILISATION
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const dotenv = require('dotenv');
const User = require('./models/user');

//* Routes
const indexRoutes = require(`./routes/index`);
const playerRoutes = require(`./routes/PlayersRoutes`);
const teamRoutes = require(`./routes/TeamsRoutes`);
const favouritesRoutes = require(`./routes/FavouritesRoutes`);
const authRoutes = require(`./routes/AuthRoutes`);
const settingsRoutes = require('./routes/SettingsRoutes');

const app = express();

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const dbURL = String(process.env.DB_URL) || `mongodb://localhost/footballDatabase`;
mongoose.connect(dbURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const secret = process.env.SECRET || 'hello world';

const store = new MongoStore({
	url: dbURL,
	secret,
	touchAfter: 24 * 3600,
});

//* Setup passport and the session
app.use(
	session({
		store,
		secret,
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
const port = process.env.PORT;
app.listen(port, () => console.log(`Server has started on port ${port}`));
// #endregion
