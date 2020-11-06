const Discord = require("discord.js")
exports.run = async (client, message, args) => { 

    let settings = client.settings

    if (!args[0]) {
        let embed = new Discord.MessageEmbed()
            .setAuthor("Server Settings", client.user.displayAvatarURL())
            .setDescription("Change the roles of perms, the channels, and other things necessary for this bot to work!")
            .setColor(client.currentColor)
            .setTimestamp()
            .addField("Prefix:", settings.prefix, true)
            .addField("Member:", settings.memberRole, true)
            .addField("Moderator:", settings.modRole, true)
            .addField("Admin:", settings.adminRole, true)
            .addField("ModerationLog:", settings.moderationLog, true)
            .addField("ServerLog:", settings.serverLog, true)
            .addField("TicketLog:", settings.ticketLog, true)

        message.channel.send(embed);
    } else if (args[0] == "edit") {
        switch (args[1].toLowerCase()) {
            case "prefix":
                if (!args[2]) {
                    return message.reply("You must include a prefix.");
                }
                settings.prefix = args[2];
                message.reply(`Successfully changed the Prefix to: \`${settings.prefix}\``);
                break;
            case "member":
                if (!args[2]) {
                    return message.reply("You must include a Role ID")
                }
                if (isNaN(args[2])) {
                    return message.reply("Role ID's are just numbers!")
                }
                settings.memberRole = args[2];
                message.reply(`Successfully changed the Member Role to: \`${settings.memberRole}\``);
                break;
            case "moderator":
                if (!args[2]) {
                    return message.reply("You must include a Role ID")
                }
                if (isNaN(args[2])) {
                    return message.reply("Role ID's are just numbers!")
                }
                settings.modRole = args[2];
                message.reply(`Successfully changed the Mod Role to: \`${settings.modRole}\``);
                break;
            case "admin":
                if (!args[2]) {
                    return message.reply("You must include a Role ID")
                }
                if (isNaN(args[2])) {
                    return message.reply("Role ID's are just numbers!")
                }
                settings.adminRole = args[2];
                message.reply(`Successfully changed the Admin Role to: \`${settings.adminRole}\``);
                break;
            case "moderationlog":
                if (!args[2]) {
                    return message.reply("You must include a Channel ID")
                }
                if (isNaN(args[2])) {
                    return message.reply("Channel ID's are just numbers!")
                }
                settings.moderationLog = args[2];
                message.reply(`Successfully changed the Moderation Log Channel to: \`${settings.moderationLog}\``);
                break;
            case "serverlog":
                if (!args[2]) {
                    return message.reply("You must include a Channel ID")
                }
                if (isNaN(args[2])) {
                    return message.reply("Channel ID's are just numbers!")
                }
                settings.serverLog = args[2];
                message.reply(`Successfully changed the Server Log Channel to: \`${settings.serverLog}\``);
                break;
            case "ticketlog":
                if (!args[2]) {
                    return message.reply("You must include a Channel ID")
                }
                if (isNaN(args[2])) {
                    return message.reply("Channel ID's are just numbers!")
                }
                settings.ticketLog = args[2];
                message.reply(`Successfully changed the Ticket Log Channel to: \`${settings.ticketLog}\``);
                break;
            default:
                message.reply("That is not a setting.")
        }
    }
    client.setSettings.run(settings);
};

exports.conf = {
    aliases: ["setting", "settings", "conf"],
    permLevel: "Admin"
};

exports.help = {
    name: "set",
    category: "Core",
    description: "View or change settings for your server.",
    usage: "set <edit> <key> <value>"
};
