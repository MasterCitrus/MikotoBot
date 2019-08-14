const { RichEmbed } = require('discord.js');
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");
const { URLSearchParams } = require('url');
const params = new URLSearchParams();

module.exports = {
  config: {
    name: "imgflip",
    description: "Generate a meme.",
    category: "fun",
    usage: "",
    accessableby: "Members",
    aliases: []
  },
  run: async (bot, message, args, settings) => {
    let command = args[0];
    let mid = args[1];
    const memes = []

    switch (command) {
      case "get": {
        if(!mid) {
          let embed = new RichEmbed()
          .setColor(cyan);
        } else {
          let embed = new RichEmbed()
          .setColor(cyan);

        }
        break;
      }
      case "make": {
        if(!mid) return message.channel.send("Please include a meme id.");

        try {
          let text0 = '';
          let text1 = '';
          let Author = message.author;
          let Authorid = Author.id;
          message.channel.send("Text for first box")
          const filter1 = response1 => {
          return response1.author.id === Authorid;
          }
          message.channel.awaitMessages(filter1, { max: 1 })
          .then(collected1 => {
          const response1 = collected1.first();
          let text0 = response1.content
          message.channel.send("Text for second box")
          const filter2 = response2 => {
          return response2.author.id === Authorid;
          }
          message.channel.awaitMessages(filter2, { max: 1 })
          .then(collected2 => {
          const response2 = collected2.first();
          let text1 = response2.content;

          params.append('template_id', `${mid}`)
          params.append('username', process.env.IMGFLIP_USER)
          params.append('password', process.env.IMGFLIP_PASS)
          params.append('text0', `${text0}`)
          params.append('text1', `${text1}`)
          fetch("https://api.imgflip.com/caption_image", {
            method: 'post',
            body: params
          }).then(res => res.json()).then(body => {
            console.log(body)
            message.channel.send(body.data.url)
          })})})
        } catch (e) {
          console.log(e)
        }
        break;
      }
      default: {
        message.channel.send(`Correct usage is ${settings.prefix}imgflip <get|make>`)
        break;
      }
    }
  }
}
