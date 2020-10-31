//#region INITILISATION
const   mongoose    = require('mongoose'),
        PLM         = require("passport-local-mongoose");

//#endregion

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    //favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Favourites'}]
    favourites: [{
        ID: Number
    }]
});

userSchema.plugin(PLM);

module.exports = mongoose.model("User", userSchema);