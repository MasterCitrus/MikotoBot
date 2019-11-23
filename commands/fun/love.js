const { RichEmbed } = require('discord.js')
const { pink } = require('../../colours.json')
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags')

/**
 * @return {string}
 */
function GetResponse(int) {
  let response;
  if(int <= 20) {response = "You're a fool if you think it will work."}
  else if(int > 20 && int <= 40) {response = "I have no hopes for you."}
  else if(int > 40 && int <= 60) {response = "It could probably work."}
  else if(int > 60 && int <= 80) {response = "Just try it baka."}
  else if(int > 80 && int <= 100) {response = "It's almost like you were made for each other."}
  else {console.log("Something is probably wrong")}
  return response;
}

module.exports = {
  config: {
    name: "love",
    description: "See users love compatibility",
    usage: "<name 1> <name 2>",
    category: "fun",
    accessableby: "Members",
    aliases: []
  },
  run: async (bot, message, args) => {
    let percentage = Math.floor(Math.random() * 99) + 1;
    if (args.length >= 3) {
      message.channel.send("BAKA! Who said you could have a harem?!")
    } else if (args.length === 2) {
      let response = GetResponse(percentage);
      console.log(response);
      const embed = new RichEmbed()
          .setColor(pink)
          .setTitle('LOVE COMPATIBILITY')
          .addField("Person 1", args[0], true)
          .addField("Person 2", args[1], true)
          .addField("Compatibility", percentage)
          .addField("Reading", response)
          .setTimestamp()
          .setFooter(message.author.tag, message.author.displayAvatarURL);
      message.channel.send(embed);
    } else if (args.length === 1) {
      message.channel.send("You're letting them be alone, rude baka.")
    } else message.channel.send("There is no one to love baka.")
  }
};



