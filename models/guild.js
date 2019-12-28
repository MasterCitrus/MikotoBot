const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: String,
  welcomeChannel: String,
  welcomeMsg: String,
  modRole: String,
  adminRole: String,
  levels: Boolean,
  logChannel: String
});

module.exports = mongoose.model('Guild', guildSchema);
