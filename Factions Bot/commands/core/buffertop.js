const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if (args[0] == "reset") {
        if (client.users.cache.find(u => u.username == message.author.username).permLevel > 2) {
            if (!args[1]) {
                return message.reply("You must type a user").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
            if (!client.bufferTop.has(args[1])) {
                return message.reply("This user is not on buffer top.").then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }
            client.bufferTop.set(args[1], 0);
            return message.reply(`${args[1]} buffer checks have been reset to 0`).then(msg => {
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
        if (!client.bufferTop.has(args[1])) {
            return message.reply("This user is not on buffer top, make sure you typed the name exactly.").then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }
        if (isNaN(args[2])) {
            return message.reply("That is not a number, please try again").then(msg => {
                msg.delete({ timeout: 5000 })
            })
        }
        client.bufferTop.set(args[1], args[2]);
        return message.reply(`${args[1]} buffer checks have been reset to ${args[2]}`).then(msg => {
            msg.delete({ timeout: 5000 })
        })
    }
} else if (args[0] == "resetall") {
    if (client.users.cache.find(u => u.username == message.author.username).permLevel > 2) {
        client.bufferTop.clear();
        return message.reply("buffer Top has been cleared").then(msg => {
            msg.delete({ timeout: 5000 })
        })
    }
} else {
    var bufferArray = [];

    for (let entity of client.bufferTop.entries()) {
        bufferArray.push(entity)
    }


    bufferArray.sort(function (a, b) {
        return b[1] - a[1];
    })

    console.log(bufferArray[0][0]);
    let embed = new Discord.MessageEmbed()
        .setAuthor("Checked Buffers Top")
        .setColor("BLUE")
        .setThumbnail(message.guild.iconURL)
    for (var i = 0; i < 6; i++) {
        if (!bufferArray[i]) { break; };
        if (bufferArray[i][0] == 0) { break; }
        // embed.addField(`${i + 1}. ${bufferArray[i][0]}: `, ` ${bufferArray[i][1]}`)
        embed.addField(`${i + 1}. ${bufferArray[i][0]}:    ${bufferArray[i][1]}`, '\u200b');
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
    description: "Check who did the most buffer checks!",
    usage: "buffertop"
}