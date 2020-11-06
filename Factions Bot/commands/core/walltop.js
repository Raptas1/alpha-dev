const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if (args[0] == "reset") {
        if (client.users.cache.find(u => u.username == message.author.username).permLevel > 2) {
            if (!args[1]) {
                return message.reply("You must type a user").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
            if (!client.wallTop.has(args[1])) {
                return message.reply("This user is not on wall top.").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
            client.wallTop.set(args[1], 0);
            return message.reply(`${args[1]} wall checks have been reset to 0`).then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }
    } else if (args[0] == "set") {
        if (client.users.cache.find(u => u.username == message.author.username).permLevel > 2) {
            if (!args[1]) {
                return message.reply("You must type a user").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
            if (!client.wallTop.has(args[1])) {
                return message.reply("This user is not on wall top, make sure you typed the name exactly.").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
            if (isNaN(args[2])) {
                return message.reply("That is not a number, please try again").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
            client.wallTop.set(args[1], args[2]);
            return message.reply(`${args[1]} wall checks have been reset to ${args[2]}`).then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }
    } else if (args[0] == "resetall") {
        if (client.users.cache.find(u => u.username == message.author.username).permLevel > 2) {
            client.wallTop.clear();
            return message.reply("Wall Top has been cleared").then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }
    } else {

        var wallArray = [];

        for (let entity of client.wallTop.entries()) {
            wallArray.push(entity)
        }


        wallArray.sort(function (a, b) {
            return b[1] - a[1];
        })

        console.log(wallArray[0][0]);
        let embed = new Discord.MessageEmbed()
            .setAuthor("Checked Walls Top")
            .setColor("BLUE")
            .setThumbnail(message.guild.iconURL)
        for (var i = 0; i < 6; i++) {
            if (!wallArray[i]) { break; };
            if (wallArray[i][0] == 0) { break; }
            // embed.addField(`${i + 1}. ${wallArray[i][0]}: `, ` ${wallArray[i][1]}`)
            embed.addField(`${i + 1}. ${wallArray[i][0]}:    ${wallArray[i][1]}`, '\u200b');
        }

        message.channel.send(embed);
    }
}

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Member"
}

exports.help = {
    description: "Check who did the most wall checks!",
    usage: "walltop"
}