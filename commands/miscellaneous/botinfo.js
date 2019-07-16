const { RichEmbed} = require("discord.js");

module.exports = {
  config: {
    name: "botinfo",
    description: "Gets the bot info.",
    category: "miscellaneous",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    let botembed = new RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    message.channel.send(botembed);
  }
}
