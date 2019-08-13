const { RichEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "userinfo",
        description: "Pulls the userinfo of yourself or a user!",
        usage: "<@mention>",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["ui"]
    },
    run: async (bot, message, args) => {
      let user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.get(message.author.id)
      let embed = new RichEmbed()
        .setColor(red_light)
        .setTitle("User Info")
        .setThumbnail(user.user.displayAvatarURL)
        .addField("**Username:**", `${user.user.username}`, true)
        .addField("**Discriminator:**", `${user.user.discriminator}`, true)
        .addField("**ID:**", `${user.id}`, true)
        .addField("**Created At:**", `${user.user.createdAt}`, true)
        .addField("**Joined At:**", `${user.joinedAt}`, true)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp();

      message.channel.send(embed);
    }
}
