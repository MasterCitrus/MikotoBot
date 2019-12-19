const xpCooldown = new Set();

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

	let xpAmt = Math.floor((Math.random() * 15) + 10);
	if (message.author.bot || message.channel.type === "dm") return;
	if(settings.levels) {
        if (!xpCooldown.has(message.author.id)) {
            try {
                await updateXP(bot, message.member, xpAmt).catch((err) => { console.log(err) });
                xpCooldown.add(message.author.id);
                setTimeout(() => {
                    xpCooldown.delete(message.author.id)
                }, 60000)
            } catch (e) {
                console.log(e)
            }
        }
        await updateLVL(bot, message.member).catch((err) => { console.log(err) });
    }

    let args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let msg = message.content.toLowerCase();
    if(message.isMentioned(bot.user) && !message.content.startsWith(settings.prefix)) return message.channel.send(`The prefix is \`${settings.prefix}\``);
    if(responseObject[msg]) message.channel.send(responseObject[msg]);
    if(!message.content.startsWith(settings.prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
	if (commandfile) commandfile.run(bot, message, args, settings);

	 async function updateXP(bot, member, amount) {
       const newprofile = {
		   userID: member.user.id,
		   username: member.user.username,
		   guildID: member.guild.id
       };
       const profile = await bot.getProfile(member);
       if(!profile) await bot.createProfile(newprofile);
       const xpnewamt = profile ? profile.xp + amount : amount;
       await bot.updateProfile(member, { xp: xpnewamt });
       console.log(`updated: ${xpnewamt}`)
     }
    
     async function updateLVL(bot, member) {
       const profile = await bot.getProfile(member);
       let nextlvl = Math.floor(5 * (profile.level ^ 2) + (50 * profile.level) + 100);
       if(profile.xp >= nextlvl) {
         const lvlup = profile.level + 1;
         await bot.updateProfile(member, { level: lvlup });
         console.log(`${profile.userID} has levelled up. (level ${profile.level + 1})`);
         message.channel.send(`${message.author.tag} has levelled up to level ${profile.level + 1}`)
       }
     }
};
