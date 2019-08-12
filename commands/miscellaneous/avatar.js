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
    let user = message.mentions.users.first() || message.guild.members.get(args[0]) || message.guild.members.get(message.author.id);

    let embed = new RichEmbed()
    .setTitle(user.user.tag)
    .setDescription(`[Avatar URL](${user.user.displayAvatarURL})`)
    .setImage(user.user.displayAvatarURL)
    .setColor("#000000");

    message.channel.send(embed);
  }
}
