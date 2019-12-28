module.exports = {
  config: {
    name: "role",
    description: "Add or remove role from a user",
    usage: "<add|remove> <user> <role>",
    category: "moderation",
    accessableby: "Moderators",
    aliases: []
  },
  run: async (bot, message, args, settings) => {
    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command... baka!");
    let command = args[0];
    let user;
    let role;

    switch (command) {
      case "add": {
        user = message.mentions.members.first() || message.guild.members.get(args[1]) || message.guild.members.find(m => m.user.tag === args[1]);
        if(!user) return message.channel.send("Please provide a user.");
        role = message.guild.roles.find(r => r.name == args[2]) || message.guild.roles.find(r => r.id == args[2]) || message.mentions.roles.first();
        if(!role) return message.channel.send("Please provide a role");
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.");
        if(user.roles.has(role.id)) {
            return message.channel.send(`${user.displayName}, already has that role!`)
        } else {
            await user.addRole(role.id).catch(e => console.log(e.message));
            message.channel.send(`The role, ${role.name}, has been added to ${user.displayName}.`)
        }
        break;
      }
      case "remove": {
        user = message.mentions.members.first() || message.guild.members.get(args[1]) || message.guild.members.find(m => m.user.tag === args[1]);
        if(!user) return message.channel.send("Please provide a user.");
        role = message.guild.roles.find(r => r.name == args[2]) || message.guild.roles.find(r => r.id == args[2]) || message.mentions.roles.first();
        if(!role) return message.channel.send("Please provide a role");
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.");
        if(!user.roles.has(role.id)) {
            return message.channel.send(`${user.displayName}, does not have that role!`)
        } else {
            await user.removeRole(role.id).catch(e => console.log(e.message));
            message.channel.send(`The role, ${role.name}, has been removed from ${user.displayName}.`)
        }
        break;
      }
      default: {
        message.channel.send(`Proper usage is \`${settings.prefix}role <add|remove> <user> <role>\``)
      }
    }
  }
};
