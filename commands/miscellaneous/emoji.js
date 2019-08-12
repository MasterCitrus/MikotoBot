module.exports = {
  config: {
    name: "emoji",
    description: "",
    usage: "",
    category: "",
    accessableby: "",
    aliases: []
  },
  run: async (bot, message, args) => {
    const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
   message.channel.send(emojiList);
  }
}
