const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
require('dotenv-flow').config();
const bot = new Client();

require('./utils/functions')(bot);
bot.mongoose = require('./utils/mongoose');
bot.config = require('./config');

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.mongoose.init();
bot.login("NTg4MDA0NDE3MzQxNjIwMjQ0.XQNMUw.YUjTz7re9Vhx_VELhDeG7QMzrBc");
