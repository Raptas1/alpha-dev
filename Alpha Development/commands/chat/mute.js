const ms = require('ms');
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])); if (!tomute) return message.reply("Couldn't find the user to mute.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("I can't mute this user.");
    //start of create role 
    try {
        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.createOverwrite(tomute, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    } catch (e) {
        console.log(e.stack);
    }
    //end of create role   
    let mutetime = args[1];
    if (!mutetime) return message.reply("You need to specify a time to mute.");

    let reason = args.slice(2).join(' ');
    if (!reason) {
        reason = "No reason specified."
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    let moderationLog = client.getMod.get(client.currentGuild, tomute.id)
    if (!moderationLog) {
        moderationLog = {
            guild: client.currentGuild,
            user: tomute.id,
            punishment: "Mute",
            punishedBy: message.author.id,
            reason: reason,
            date: today
        }
    } else {
        moderationLog.guild = client.currentGuild;
        moderationLog.user = tomute.id;
        moderationLog.punishment = "Mute";
        moderationLog.punishedBy = message.author.id;
        moderationLog.reason = reason;
        moderationLog.date = today;
    }

    client.setMod.run(moderationLog);

    message.reply(`<@${tomute.id}> has been muted! :white_check_mark:`);

    moderationLog = client.getMod.get(client.currentGuild, tomute.id)
    let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor(client.currentColor)
        .setTimestamp()
        .setThumbnail(tomute.user.displayAvatarURL())
        .setDescription(`**Case:** ${moderationLog.id}\n**Punishment:** Mute\n**User**: ${tomute.user.username}#${tomute.user.discriminator}\n**Staff**: ${message.author.tag}\n**Reason**: ${reason}\n**Duration**: ${mutetime}`)

    client.channels.cache.get(client.settings.moderationLog).send(embed);

    setTimeout(function () {
        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.permissionOverwrites.get(tomute.id).delete();
        });
    }, ms(mutetime));

}
exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    description: "mute a user",
    usage: "mute <@user> time reason"
};

