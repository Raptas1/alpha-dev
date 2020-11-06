let Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    if (!args[0]) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}#${message.author.discriminator}`)
            .setColor("BLUE")
            .setTimestamp()
            .setImage(`${message.author.displayAvatarURL({ dynamic: true, size: 256 })}`)
        message.channel.send(embed);
    } else {
        let user = message.mentions.users.first()
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${user.username}#${user.discriminator}`)
            .setColor("BLUE")
            .setTimestamp()
            .setImage(`${user.displayAvatarURL({ dynamic: true, size: 256 })}`)
        message.channel.send(embed);
    }

};

exports.conf = {
    enabled: true,
    aliases: ['pfp', 'av'],
    permLevel: "User"
};

exports.help = {
    description: "Enlarges your pfp",
    usage: "avatar"
};

