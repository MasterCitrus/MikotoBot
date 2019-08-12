const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { blue_dark } = require('../../colours.json')

module.exports = {
  config: {
    name: "dictionary",
    description: "Get word definitions",
    usage: "",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["define", "d", "def"]
  },
  run: async (bot, message, args) => {
    let data = []
    let dataLength = data.length
    let word = args[0]
    const url = `https://owlbot.info/api/v3/dictionary/${word}`
    if(!args[0]) return message.channel.send("Provide a word to define... baka!")
    fetch(url, {
      headers: { Authorization: `Token ${process.env.OWLBOTAPIT}` }
    }).then(res => res.json()).then(body => {
      console.log(body)
      data.push(body)
      console.log(data)
      let item = data[0]
      let item2 = data[0][0]
      console.log(item, item2)
      if(!item2) {
        let embed = new RichEmbed()
        .setColor(blue_dark)
        .setTitle(`Definition: ${body.word}`)
        .setDescription(`**PRONUNCIATION:** ${body.pronunciation || "none"}`)
        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp();
        for(i of item.definitions) {
          let index = item.definitions.indexOf(i) + 1
          let type = i.type
          let definition = i.definition
          let example = i.example
          embed.addField(`${index}`, `**TYPE:** ${type}\n**DEFINITION:** ${definition}\n**EXAMPLE:** ${example || "none"}`)
        }
        message.channel.send(embed)
      } else {
        message.channel.send(item2.message)
      }
    })
  }
}
