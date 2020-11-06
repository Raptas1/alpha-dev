const Discord = require("discord.js");

exports.run = async (bot, message, args, level) => {

    let mentioneduser = message.mentions.members.first();
    let mentionedduser = message.mentions.users.first();
    

    let fetchMembers = message.guild.members.cache.array()
    fetchMembers.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
    let joinedPosition = fetchMembers.indexOf(message.member)
    let mentionedPosition = fetchMembers.indexOf(mentioneduser)

    if (!mentioneduser) {
        let createdAtRaw = message.author.createdAt.toDateString();
        let createdAtt = createdAtRaw.split(" ");
        let joinedAtRaw = message.member.joinedAt.toDateString();
        let joinedAtt = joinedAtRaw.split(" ");
        let useravatar = message.author.displayAvatarURL();
        let GuildMember = message.guild.member(message.author);
        const userembed = new Discord.MessageEmbed()
            .setTitle('User Infomation')
            .setColor("BLUE")
            .setFooter(`Requested By: ${message.author.tag}`)
            .setThumbnail(useravatar)
            .setTimestamp()
            .addField("Username", message.author.username)
            .addField("Status", message.author.presence.status)
            .addField("Joined On", `${joinedAtt[1]} ${joinedAtt[2]}, ${joinedAtt[3]}`)
            .addField("Join Position", joinedPosition + 1)
            .addField("Registered", `${createdAtt[1]} ${createdAtt[2]}, ${createdAtt[3]}`)
            .addField(`Roles: [${GuildMember.roles.cache.size}]`, GuildMember.roles.cache.map(r => r.toString()))

        message.channel.send(userembed);
    } else {

        let mentionedavatar = mentionedduser.displayAvatarURL();
        let mCreatedAtRaw = mentionedduser.createdAt.toDateString();
        let mCreatedAt = mCreatedAtRaw.split(" ");
        let GuildMMember = message.guild.member(mentioneduser);
        const mentuserembed = new Discord.MessageEmbed()
            .setTitle("User Information")
            .setColor("BLUE")
            .setFooter(`Requested By: ${message.author.tag}`)
            .setThumbnail(mentionedavatar)
            .setTimestamp()
            .addField("Username", mentioneduser.user.username)
            .addField("Status", mentioneduser.presence.status)
            .addField("Joined On", mentioneduser.joinedAt)
            .addField("Joined Position", mentionedPosition + 1)
            .addField("Registered", `${mCreatedAt[1]} ${mCreatedAt[2]}, ${mCreatedAt[3]}`)
            .addField(`Roles: [${GuildMMember.roles.cache.size}]`, GuildMMember.roles.cache.map(r => r.toString()));


        message.channel.send(mentuserembed);

    }
}




exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    description: "Shows a users info",
    usage: "userinfo"
};

