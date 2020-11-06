
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if (args[0] == "remove") {
        if (client.users.cache.get(message.author.id).permLevel > 2) {
            let user = args[1];
            if (!client.users.cache.find(u => u.username == user)) {
                return message.reply("This user is not in the discord.").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
            let fUser = client.users.cache.find(u => u.username == user).id
            client.getUser = client.wSql.prepare("SELECT * FROM whitelist WHERE username = ?");
            if (client.getUser.get(fUser)) {
                let wEmbed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTimestamp()
                    .setDescription(`${client.users.cache.find(u => u.username == user).username} has been removed from the whitelist by: \`${message.author.username}#${message.author.discriminator}\``)
                    .setThumbnail(client.users.cache.get(fUser).avatarURL())

                let deleteWhitelist = client.wSql.prepare("DELETE FROM whitelist WHERE username = ?");
                deleteWhitelist.run(fUser);

                client.channels.cache.get(client.settings.logsChannel).send(wEmbed);
                return message.reply(`The user: \`${user}\` was removed from the whitelist.`).then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            } else {
                return message.reply("This user was never whitelisted on the bot").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
        }
    } else {

        let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTimestamp()
        if (!client.whitelist.has(message.author.id) && !client.pendingWhitelist.has(message.author.id)) {
            var randomCode = Math.floor((Math.random() * 9000) + 1000);
            try {
                embed.setDescription(`**──────────────────────────────**

    **⚠︎︎ Account Verification ⚠︎︎**

    ☻︎ Please message **\`botName\`** the following code ➪ whitelist \`${randomCode}\` on *${client.settings.server}* in order to get whitelisted ✔︎

    \`\`\`asciidoc
= /msg \`BotName\` whitelist ${randomCode}\`\`\`

    **──────────────────────────────**`)
                embed.setFooter("Make sure to be in the same realm as the bot!");
                await message.author.send(embed);
            } catch (e) {
                return message.reply("Open your dms and try the command again").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }

            message.reply("Please check your DM's for a code to whitelist yourself").then(msg => {
                msg.delete({ timeout: 5000 })
            });
            client.pendingWhitelist.set(message.author.id, randomCode);



        } else {
            message.reply("Your account is already whitelisted.").then(msg => {
                msg.delete({ timeout: 5000 })
            });
        }
    }
}


exports.conf = {
enabled: true,
aliases: [],
permLevel: "User"
}

exports.help = {
    description: "Whitelist your discord to the bot",
    usage: "whitelist"
}