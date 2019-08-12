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
    let item = data
    let dataLength = data.length
    let word = args[0]
    const url = `https://owlbot.info/api/v3/dictionary/${word}`
    if(!args[0]) return message.channel.send("Provide a word to define... baka!")
    try {
      fetch(url, {
        headers: { Authorization: `Token ${process.env.OWLBOTAPIT}` }
      }).then(res => res.json()).then(body => {
        console.log(body)
        if(body[0].message) {
          message.channel.send(body[0].message)
        } else {
          data.push(...body.definitions).catch(e => console.log(e))
          console.log(data)
          let embed = new RichEmbed()
          .setColor(blue_dark)
          .setTitle(`Definition: ${body.word}`)
          .setDescription(`**PRONOUNCIATION:** ${body.pronounciation || "none"}`)
          .setFooter(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp();
          console.log(data[0].type)
          for(i of item) {
            let index = item.indexOf(i) + 1
            let type = i.type
            let definition = i.definition
            let example = i.example
            embed.addField(`${index}`, `**TYPE:** ${type}\n**DEFINITION:** ${definition}\n**EXAMPLE:** ${example || "none"}`)
          }
          message.channel.send(embed)
        }
      })
    } catch(e) {
      console.log(e.stack)
    }
  }
}
