const { RichEmbed } = require('discord.js');

module.exports = {
  config: {
    name: "invite",
    description: "Get the bot invite.",
    category: "miscellaneous",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    let embed = new RichEmbed()
    .setTitle("Bot Invite")
    .setAuthor(message.guild.me.displayName, bot.user.displayAvatarURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Invite Link", "https://discordapp.com/api/oauth2/authorize?client_id=588004417341620244&scope=bot&permissions=8");
    message.channel.send(embed);
  }
}
