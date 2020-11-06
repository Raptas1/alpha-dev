exports.run = async (client, message, args) => {
    client.wallChecks = !client.wallChecks;

    if (client.wallChecks == true) {
        message.channel.send("`Wall Checks` have been enabled :white_check_mark:")
    } else {
        message.channel.send("`Wall Checks` have been disabled :x:")
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Moderator"
}

exports.help = {
    description: "toggles wall check messages",
    usage: "wallchecks"
}