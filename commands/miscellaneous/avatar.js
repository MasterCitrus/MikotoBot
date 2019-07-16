const { RichEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "avatar",
    description: "Gets yours or the mentioned users avatar.",
    usage: "<@mention>",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["icon", "pfp"]
  },
  run: async (bot, message, args) => {
    let user = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!args[0]) user = message.author;

    let embed = new RichEmbed()
    .setTitle(user.tag)
    .setDescription(`[Avatar URL](${user.avatarURL})`)
    .setImage(user.avatarURL)
    .setColor("#000000");

    message.channel.send(embed);
  }
}
