module.exports = async (bot, message) => {
    responseObject = {
      "loli": "Jail Time!",
      "lolis": "Jail Time!",
      "yare yare": "daze",
      "ayy": "lmao",
      "69": "nice"
    }
    if (!message.guild) return;

    let settings;
    try {
      settings = await bot.getGuild(message.guild);
    } catch (error) {
      console.error(error);
    }
    if(message.author.bot || message.channel.type === "dm") return;
    let args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let msg = message.content.toLowerCase()
    if(responseObject[msg]) message.channel.send(responseObject[msg])
    if(!message.content.startsWith(settings.prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args, settings)
}
