exports.run = async (client, message, args) => {
    client.bufferChecks = !client.bufferChecks;

    if (client.bufferChecks == true) {
        message.channel.send("`buffer Checks` have been enabled :white_check_mark:")
    } else {
        message.channel.send("`buffer Checks` have been disabled :x:")
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Moderator"
}

exports.help = {
    description: "toggles buffer check messages",
    usage: "bufferchecks"
}