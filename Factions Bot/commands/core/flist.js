const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    client.fListCounter = 0;
    client.listeningFlist = true;
    client.minecraft.chat("/f list");
    client.Lchannel = message.channel;

}

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Member"
}

exports.help = {
    description: "Checks F List!",
    usage: "flist"
}