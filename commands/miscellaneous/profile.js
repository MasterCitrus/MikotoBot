const { RichEmbed } = require("discord.js");


module.exports = {
	config: {
		name: "profile",
		description: "Gets yours or the mentioned users profile.",
		usage: "<@mention>",
		category: "miscellaneous",
		accessableby: "Members"
	},
	run: async (bot, message, args) => {
		let user = message.mentions.users.first() || message.guild.members.get(args[0]) || message.guild.members.get(message.author.id);
		const newprofile = {
			userID: user.user.id,
			guildID: user.guild.id
		};

		let profile = await bot.getProfile(user);
		if (!profile) await bot.createProfile(user);
		let nextLevelXP = Math.floor((5 * (profile.level ^ 2) + (50 * profile.level) + 100) - profile.xp);

		let embed = new RichEmbed()
			.setTitle(user.user.tag)
			.setThumbnail(user.user.displayAvatarURL)
			.addField("Level", `${profile.level}`, true)
			.addField("XP", `${profile.xp}`, true)
			.addField("XP till next lvl", nextLevelXP)
			.setColor("#000000");

		message.channel.send(embed);
	}
}
