

module.exports = {
  config: {
    name: "config",
    description: "Change bot settings.",
    usage: "<setting> <new setting>",
    category: "moderation",
    accessableby: "Administrators"
  },
  run: async (bot, message, args, settings) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permission to use this command.");

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

        message.channel.send(`Old prefix: \`${settings.prefix}\``);
        break;
      }
      case 'levels': {
        let data = await bot.getGuild(message.guild);
        let levels = data.levels;
        if(!levels) {
            try {
              await bot.updateGuild(message.guild, {levels: !levels});
              message.channel.send("Levels enabled");
            } catch(e) {
              message.channel.send(`An error occured\`${e.message}\``);
            }
        } else if(levels) {
          try {
            await bot.updateGuild(message.guild, { levels: !levels });
            message.channel.send("Levels disabled");
          } catch(e) {
            message.channel.send(`An error occured\`${e.message}\``);
          }
        }
        break;
      }
      case 'logs': {
        let channel = message.guild.channels.get(newSetting) || message.guild.channels.find(c => c.name === newSetting);
        console.log(channel.id);
          if(channel) {
            try {
              await bot.updateGuild(message.guild, { logChannel: channel.id });
              message.channel.send(`Log channel updated: \`${channel.name}\``);
            } catch(e) {
              message.channel.send(`An error occured: **${e.message}**`)
            }
          }
        break;
      }
      default: {
        message.channel.send(`Please provide a setting to view/update`);
        break;
      }
    }
  }
}
