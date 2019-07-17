const { RichEmbed } = require('discord.js');

module.exports = {
  config: {
    name: "8ball",
    description: "The magic 8ball!",
    usage: "<question>",
    category: "fun",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    if(!args[0]) return message.reply("You didn't give a question.")
    let replies = ["Yes", "No", "Maybe", "I don't know", "Ask again later", "You'll be the judge", "No... b-baka!"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballEmbed = new RichEmbed()
      .setAuthor(message.author.tag)
      .setThumbnail("https://i.imgur.com/58RN9h8.jpg")
      .setColor("#FF9900")
      .addField("Question", question)
      .addField("Answer", replies[result]);

    message.channel.send(ballEmbed);
  }
}
