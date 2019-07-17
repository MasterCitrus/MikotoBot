module.exports = async (bot, guild) =>{
  try {
    const newGuild = {
      guildID: guild.id,
      guildName: guild.name
    };

    await bot.createGuild(newGuild);
  } catch(e) {
    console.error(e);
  }
};
