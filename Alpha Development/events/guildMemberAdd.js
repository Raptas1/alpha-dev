const Discord = require("discord.js");
module.exports = async (client, member) => {
    let settings = client.getSettings.get(client.currentGuild);
    member.roles.add(settings.memberRole);

    let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`\`${member.user.username}\` Has joined the server.`)
        .setColor(client.currentColor)
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())

    client.channels.cache.get(settings.serverLog).send(embed);
}