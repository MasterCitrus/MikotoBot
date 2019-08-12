const { RichEmbed } = require('discord.js')
const { pink } = require('../../colours.json')
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags')

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
    if(!args[0] && !args[1]) return message.channel.send("You didn't provide any names.")
    let name1 = args[0]
    let name2 = args[1]
    const url = `https://apis.duncte123.me/love/${name1}/${name2}`
    fetch(url).then(res => res.json()).then(body => {
      const embed = new RichEmbed()
      .setColor(pink)
      .setTitle("Love Compatibility")
      .setDescription(stripIndents`${body.data.names}
        ${body.data.score}
        ${body.data.message}`)
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()

      message.channel.send(embed)
    })
  }
}
