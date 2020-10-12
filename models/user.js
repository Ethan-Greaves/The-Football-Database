//#region INITILISATION
const   mongoose    = require('mongoose'),
        PLM         = require("passport-local-mongoose");

//#endregion

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(PLM);

module.exports = mongoose.model("User", userSchema);