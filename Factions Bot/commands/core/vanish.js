const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    console.log(client.playersUpdated.size);
    let vanishStaff = client.playersUpdated.keys()
    for (var i = 0; i < client.playersUpdated.size; i++) {
        let staffMember = vanishStaff.next().value;
        let embed = new Discord.MessageEmbed()
            .setAuthor("Staff Vanished")
            .setColor("RED")
            .setTimestamp()
            .setThumbnail(`https://crafatar.com/avatars/${staffMember}`)
            .setDescription(`${client.VanishStaff.get(staffMember)} is in vanish`)
        message.channel.send(embed);
    }
    if (client.playersUpdated.size == 0) {
        return message.channel.send("No one in vanish.").then(msg => {msg.delete({timeout:3000})})
    }

}

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Member"
}

exports.help = {
    description: "Checks staff that are in vanish",
    usage: "vanish"
}