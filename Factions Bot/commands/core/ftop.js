const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    client.minecraft.chat("/f top");
    client.Fchannel = message.channel;

}

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Member"
}

exports.help = {
    description: "Checks FTop!",
    usage: "ftop"
}