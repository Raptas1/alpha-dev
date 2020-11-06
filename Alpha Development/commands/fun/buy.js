const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    let coins = client.getCoins.get(client.currentGuild, message.author.id);
    if (!args[0]) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(client.currentColor)
            .setTimestamp()
            .setDescription(`*Alpha Development Coin Shop :shopping_cart:*\n*To buy type ${client.settings.prefix}buy <id>*`)
            .addField("ID: 1", "Purple Role: 200 coins :coin:")
            .addField("ID: 2", "Blue Role: 400 coins :coin:")
            .addField("ID: 3", "Green Role: 600 coins :coin:")
            .addField("ID: 4", "Orange Role: 800 coins :coin:")
            .addField("ID: 5", "Black Role: 1000 coins :coin:")

        message.channel.send(embed);
    } else {
        switch (args[0]) {
            case "1":
                if (coins.points < 200) {
                    return message.reply("You do not have enough coins to buy this!")
                }
                if (message.member.roles.cache.has("773410130866733058")) {
                    return message.reply("You can't buy this role, you already have it!")
                }
                coins.points -= 200;
                message.member.roles.add("773410130866733058");
                message.channel.send(`Successfully bought the role for 200 coins! :white_check_mark:\n New Balance: ${coins.points} coins :coin:`)
                break;
            case "2":
                if (coins.points < 400) {
                    return message.reply("You do not have enough coins to buy this!")
                }
                if (message.member.roles.cache.has("773410438243156000")) {
                    return message.reply("You can't buy this role, you already have it!")
                }
                coins.points -= 400;
                message.member.roles.add("773410438243156000");
                message.channel.send(`Successfully bought the role for 400 coins! :white_check_mark:\n New Balance: ${coins.points} coins :coin:`)
                break;
            case "3":
                if (coins.points < 600) {
                    return message.reply("You do not have enough coins to buy this!")
                }
                if (message.member.roles.cache.has("773410456634392606")) {
                    return message.reply("You can't buy this role, you already have it!")
                }
                coins.points -= 600;
                message.member.roles.add("773410456634392606");
                message.channel.send(`Successfully bought the role for 600 coins! :white_check_mark:\n New Balance: ${coins.points} coins :coin:`)
                break;
            case "4":
                if (coins.points < 800) {
                    return message.reply("You do not have enough coins to buy this!")
                }
                if (message.member.roles.cache.has("773410490566705153")) {
                    return message.reply("You can't buy this role, you already have it!")
                }
                coins.points -= 800;
                message.member.roles.add("773410490566705153");
                message.channel.send(`Successfully bought the role for 800 coins! :white_check_mark:\n New Balance: ${coins.points} coins :coin:`)
                break;
            case "5":
                if (coins.points < 1000) {
                    return message.reply("You do not have enough coins to buy this!")
                }
                if (message.member.roles.cache.has("773412432264822786")) {
                    return message.reply("You can't buy this role, you already have it!")
                }
                coins.points -= 1000;
                message.member.roles.add("773412432264822786");
                message.channel.send(`Successfully bought the role for 1,000 coins! :white_check_mark:\n New Balance: ${coins.points} coins :coin:`)
                break;
            default:
                return message.reply("That is not a valid ID!");
        }

        client.setCoins.run(coins);
    }
}

exports.conf = {
    enabled: true,
    aliases: ['shop'],
    permLevel: "User"
};

exports.help = {
    description: "Buy items from the shop",
    usage: "buy <id>"
};
