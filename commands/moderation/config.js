

module.exports = {
  config: {
    name: "config",
    description: "Change bot settings.",
    usage: "<setting> <new setting>",
    category: "moderation",
    accessableby: "Administrators"
  },
  run: async (bot, message, args, settings) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("YOu don't have permission to use this command.");

    const setting = args[0];
    const newSetting = args.slice(1).join(" ");

    switch (setting) {
      case 'prefix': {
        if(newSetting) {
          try {
            await bot.updateGuild(message.guild, { prefix: newSetting });
            message.channel.send(`Prefix updated: \`${newSetting}\``);
          } catch(e) {
            message.channel.send(`An error occured: **${e.message}**`)
          }
        }

        message.channel.send(`Current prefix: \`${settings.prefix}\``);
        break;
      }
      default: {
        message.channel.send(`Please provide a setting to view/update`);
        break;
      }
    }
  }
}
