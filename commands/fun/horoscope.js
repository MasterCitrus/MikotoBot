const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { purple_medium } = require("../../colours.json");

module.exports = {
  config: {
    name: "horoscope",
    description: "Get your horoscope!",
    usage: "<sign> <today|yesterday|tomorrow> (Defaults to today if not specified)",
    category: "fun",
    accessableby: "Members",
    aliases: ["hs", "astrology", "astro"]
  },
  run: async (bot, message, args, info) => {
    let sign = args[0];
    let day = args[1];
    if(!args[0]) return message.channel.send("Please include a zodiac.");
    if(!args[1]) day = "today";
    const url = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`;
    fetch(url, {
      method: 'post'
    }).then(res => res.json()).then(body => {
      console.log(body)
      const embed = new RichEmbed()
      .setColor(purple_medium)
      .setTitle(`HOROSCOPE: ${sign}`)
      .setDescription(`${body.current_date}`)
      .addField('Your Mood:', `${body.mood}`, true)
      .addField("Your Lucky Number:", `${body.lucky_number}`, true)
      .addField("Your Lucky Time", `${body.lucky_time}`, true)
      .addField("Today's Compatibility", `${body.compatibility}`, true)
      .addField("Today's Colour:", `${body.color}`, true)
      .addField("Horoscope", `${body.description}`)
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp();


      message.channel.send(embed);
    })
  }
}
