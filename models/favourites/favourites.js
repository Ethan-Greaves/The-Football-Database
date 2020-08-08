//#region INITILISATION
const mongoose = require('mongoose');
//#endregion

//*Save the ID of the 
const favouritesSchema = new mongoose.Schema({
    ID: Number
})

module.exports = mongoose.model("Favourites", favouritesSchema);