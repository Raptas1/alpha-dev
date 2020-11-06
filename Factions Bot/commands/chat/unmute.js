
exports.run = async (client, message, args, level) => {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!tomute) return message.reply("Couldn't find user.");

    message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.permissionOverwrites.get(tomute.id).delete();
    });
    message.channel.send(`<@${tomute.id}> has been unmuted!`);

}
exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Mod"
};

exports.help = {
    description: "unmute a user",
    usage: "unmute <@user> "
};

