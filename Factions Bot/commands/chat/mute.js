
const ms = require('ms');
exports.run = async (client, message, args, level) => {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])); if (!tomute) return message.reply("Couldn't find user.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
    //start of create role 
    try {
        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.createOverwrite(tomute, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    } catch (e) {
        console.log(e.stack);
    }
    //end of create role   
    let mutetime = args[1];
    if (!mutetime) return message.reply("You didn't specify a time!");

    let reason = args.slice(2).join(' ');

    message.reply(`<@${tomute.id}> has been muted for ${mutetime}\nReason: ${reason}`);

    setTimeout(function () {
        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.permissionOverwrites.get(tomute.id).delete();
        });
    }, ms(mutetime));

}
exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Mod"
};

exports.help = {
    description: "mute a user",
    usage: "mute <@user> time reason"
};

