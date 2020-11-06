const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    let aChannel = args[0];
    if (!args[0]) {
        return message.reply("You need to type a channels name or ID")
    }
    if (isNaN(aChannel)) {
        aChannel = client.channels.cache.find(c => c.name == aChannel);
        if (!aChannel) {
            return message.reply("That is not a channel.")
        }
    } else {
        aChannel = client.channels.cache.get(aChannel);
        if (!aChannel) {
            return message.reply("That is not a channel.")
        }
    }

    let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor(client.currentColor)
        .setTimestamp()
        .setDescription(args.slice(1).join(' '))
    aChannel.send(embed);
    message.delete();
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Admin"
};

exports.help = {
    description: "Announce a message to a channel in an embed",
    usage: "announce <channel> <message>"
};
