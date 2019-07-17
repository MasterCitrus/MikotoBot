const { RichEmbed, Attachment } = require('discord.js');

module.exports = {
  config: {
    name: "fullsubject",
    description: "Sends a picture of a dog!",
    usage: "<@mention>",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["fs"]
  },
  run: async (bot, message, args) => {
    let fsUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!fsUser) return message.channel.send("Can't find user!");

    let fsEmbed = new RichEmbed()
      .setTitle("Full Subjectivist!")
      .setImage('https://i.imgur.com/U7pfcbD.jpg');
    message.channel.send(fsEmbed);
  }
}
