require('dotenv-flow').config();

module.exports = {
    token: process.env.BOT_TOKEN,
    ownerid: process.env.OWNERID,
    prefix: process.env.PREFIX,
    defaultSettings: {
        prefix: process.env.PREFIX,
        welcomeChannel: 'welcome',
        welcomeMsg: 'Welcome {{user}} to {{guild}}!',
        modRole: 'Moderator',
        adminRole: 'Administrator',
        levels: false
    }
};
