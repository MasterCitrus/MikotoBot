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
    const names = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
    let zodiac = args[0];
    let day = args[1];
    if(!args[0]) return message.channel.send("Please include a zodiac.");
    if(!args[1]) day = "today";
    let sign = FindName(zodiac);
    const url = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`;
    if(sign) {
      fetch(url, {
        method: 'post'
      }).then(res => res.json()).then(body => {
        console.log(body);
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
      });
    } else {
      message.channel.send("You didn't give me a proper sign baka.")
    }

    function FindName(input) {
      for( let i = 0, j = names.length; i < j; i++) {
        if (names[i].toLowerCase().indexOf(input.toLowerCase()) === 0) {
          return names[i]
        }
      }
      return null;
    }
  }
};
