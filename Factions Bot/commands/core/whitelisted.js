exports.run = async (client, message, args) => {
    if (!args[0]) {
        return message.reply("Cant find if a user is whitelisted without their discord id!");
    } 

    if (client.whitelist.has(args[0])) {
        return message.channel.send(`${args[0]} is whitelisted on the bot`);
    } else {
        return message.channel.send(`${args[0]} is NOT whitelisted on the bot`);
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Moderator"
}

exports.help = {
    description: "Check if a user is whitelisted on the bot",
    usage: "whitelisted [id]"
}