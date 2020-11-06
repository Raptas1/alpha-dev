const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    let aEmbed = new Discord.MessageEmbed()
        .setAuthor("⚠︎︎ ATTENTION ⚠︎︎")
        .setColor("YELLOW")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL())
    .setDescription(`${message.author.username}#${message.author.discriminator} used sudo saying: \`${args.join(" ")}\``)
    client.minecraft.chat(args.join(" "));
    message.channel.send(`\`Successfully sent message: ${args.join(" ")}\``)
    client.channels.cache.get(client.settings.logsChannel).send(aEmbed);
}

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Admin"
}

exports.help = {
    description: "Make minecraft commands through discord",
    usage: "sudo [args]"
}
