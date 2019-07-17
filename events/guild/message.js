module.exports = async (bot, message) => {
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

    if(!message.content.startsWith(settings.prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args, settings)
}
