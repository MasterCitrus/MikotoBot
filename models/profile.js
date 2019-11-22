const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userID: String,
	username: String,
	guildID: String,
	credits: { type: Number, default: 0 },
	level: { type: Number, default: 0 },
	xp: { type: Number, default: 0 }
});

module.exports = mongoose.model("Profile", profileSchema);