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
		console.log(user);
		console.log(user.guild.id)
		console.log(user.user.id)
		const newprofile = {
			userID: user.user.id,
			guildID: user.guild.id
		};

		let profile = await bot.getProfile(user);
		if (!profile) await bot.createProfile(user);
		

		let embed = new RichEmbed()
			.setTitle(user.user.tag)
			.setThumbnail(user.user.displayAvatarUrl)
			.addField("Level", `${profile.level}`, true)
			.addField("XP", `${profile.xp}`, true)
			.setColor("#000000");

		message.channel.send(embed);
	}
}
