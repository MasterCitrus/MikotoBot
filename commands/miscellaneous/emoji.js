module.exports = {
  config: {
    name: "emoji",
    description: "",
    usage: "",
    category: "",
    accessableby: "Members",
    aliases: []
  },
  run: async (bot, message, args) => {
    let emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
   message.channel.send(emojiList);
  }
}
