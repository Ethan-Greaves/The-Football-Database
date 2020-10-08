//#region INITILISATION
//*Express
const express                       = require('express');
const app                           = express();
                                    app.use(express.static("public"));
//*Body-Parser
const bodyParser                    = require("body-parser");
                                    app.use(bodyParser.urlencoded({extended: true}));
//*Fetch
const fetch                         = require('node-fetch');

//*Mongoose
const mongoose                      = require('mongoose');
                                    mongoose.connect(`mongodb://localhost/footballDatabase`, { useNewUrlParser: true, useUnifiedTopology: true});

//*Routes
const indexRoutes                   = require(`./routes/index`);
const playerRoutes                  = require(`./routes/PlayersRoutes`);
const teamRoutes                    = require(`./routes/TeamsRoutes`);
const favouritesRoutes              = require(`./routes/FavouritesRoutes`);

app.set("view engine", "ejs");
//#endregion

//#region ROUTES
app.use(indexRoutes);
app.use(`/players`, playerRoutes);
app.use(`/teams`, teamRoutes);
app.use(`/favourites`, favouritesRoutes);
//#endregion

//#region SERVER
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server has started on port ${port}`));
//#endregion
