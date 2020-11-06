const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    if (!args[0]) {
        let coins = client.getCoins.get(client.currentGuild, message.author.id);
        let embed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(client.currentColor)
            .setTimestamp()
            .setDescription(`**${message.author.username}** has ${coins.points} coins! :coin:`)
        message.channel.send(embed);

    } else {
        let mUser = message.mentions.users.first()
        if (!mUser) {
            return message.reply("Mention a user to see their coins.");
        }
        let coins = client.getCoins.get(client.currentGuild, mUser.id)
        if (!coins) {
            return message.reply("This user is not in the discord.");
        }
        let embed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(client.currentColor)
            .setTimestamp()
            .setDescription(`**${mUser.username}** has ${coins.points} coins! :coin:`)
        message.channel.send(embed);
    }
}

exports.conf = {
    aliases: ["coin", "bal", "balance"],
    permLevel: "Member"
};

exports.help = {
    name: "coins",
    category: "Fun",
    description: "View your balance of coins!",
    usage: "coins"
};
