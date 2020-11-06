const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    let mUser = message.mentions.users.first();

    let historyFetch = client.mod.prepare("SELECT * FROM moderation WHERE user = ?");
    let history = historyFetch.all(mUser.id);
    if (!history) {
        let noEmbed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(client.currentColor)
            .setTimestamp()
            .setDescription(`Punishments for: **${mUser.username}#${mUser.discriminator}**`)
            .addField("No punishments found..", "\u200b")
        message.channel.send(noEmbed);
    }

    let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor(client.currentColor)
        .setTimestamp()
    .setDescription(`Punishments for: **${mUser.username}#${mUser.discriminator}**`)
    for (var i = 0; i < history.length; i++) {
        history[i].punishedBy = client.users.cache.get(history[i].punishedBy).username
        embed.addField(`Case ${history[i].id}: ${history[i].punishment}`,`Punished by \`${history[i].punishedBy}\` for \`${history[i].reason}\` on \`${history[i].date}\``)
    }

    message.channel.send(embed);
}
exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    description: "Check a users punishment history",
    usage: "history <@user>"
};

