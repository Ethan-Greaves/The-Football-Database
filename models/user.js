// #region INITILISATION
const mongoose = require('mongoose');
const PLM = require('passport-local-mongoose');

// #endregion

const userSchema = new mongoose.Schema({
	username: String,
	password: String,

	favouritePlayers: [
		{
			_id: false,
			ID: Number,
			Type: String,
			Name: String,
			Picture: String,
			BackupPicture: String,
			Age: Number,
			Nation: String,
			Position: String,
			Club: { Badge: String, name: String },
			Height: String,
			Gender: String,
			Added: Date,
		},
	],
	favouriteTeams: [
		{
			_id: false,
			ID: Number,
			Type: String,
			Name: String,
			Badge: String,
			Founded: Number,
			Nation: String,
			Gender: String,
			Kit: String,
			League: String,
			Added: Date,
		},
	],
});

userSchema.plugin(PLM);

module.exports = mongoose.model('User', userSchema);
