const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let lb = client.coins.prepare("SELECT * FROM coins ORDER BY points DESC");
    let lbArray = lb.all();
    let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor(client.currentColor)
        .setTimestamp()
    if (lbArray.length > 25) {
        lbArray.length = 25;
    }
    for (var i = 0; i < lbArray.length; i++) {
        let username = client.users.cache.get(lbArray[i].user).username
        embed.addField(`${i+1}. ${username}`, `${lbArray[i].points} coins :coin:`)
    }

    message.channel.send(embed);
}

exports.help = {
    description: "Check who has the most coins!",
    usage: "coinslb <page>"
}

exports.conf = {
    aliases: ["clb"],
    permLevel: "User"
}