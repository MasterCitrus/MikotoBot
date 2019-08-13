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
    .setAuthor(`${message.guild.me.displayName} Bot Invite`, bot.user.displayAvatarURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Invite Link", "[Link](https://discordapp.com/api/oauth2/authorize?client_id=588004417341620244&permissions=8&scope=bot)");
    message.channel.send(embed);
  }
}
