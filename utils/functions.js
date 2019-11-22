const mongoose = require('mongoose');
const { Guild, Profile } = require('../models');

module.exports = bot => {

    bot.getGuild = async (guild) => {
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return bot.config.defaultSettings;
    };

    bot.updateGuild = async (guild, settings) => {
        let data = await bot.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(`Guild "${data.guildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    bot.createGuild = async (settings) => {
        let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, bot.config.defaultSettings);
        let merged = Object.assign(defaults, settings);

        const newGuild = await new Guild(merged);
        return newGuild.save()
            .then(console.log(`Default settings saved for guild "${merged.guildName}" (${merged.guildID})`));
    };

    bot.clean = text => {
        if (typeof(text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };

	bot.createProfile = async profile => {
		const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, profile);

		const newProfile = await new Profile(merged);
		return newProfile.save()
			.then(console.log(`New profile saved for user ${merged.userID}`));
	};
	bot.getProfile = async user => {
		let data = await Profile.findOne({ userID: user.user.id, guildID: user.guild.id }, function (err, profile) { });
        if(data) return data;
        else console.log("User not found");
    };

	bot.updateProfile = async (user, data) => {
		let profile = await bot.getProfile(user);

		if (typeof profile !== 'object') profile = {};
		for (const key in data) {
			if (profile[key] !== data[key]) profile[key] = data[key];
			else return;
		}

		console.log(`Profile ${profile.userID} updated: ${Object.keys(data)}`);
		return await profile.updateOne(profile);
	}
};
