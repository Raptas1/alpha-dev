module.exports = async (client, message) => {

    event = this;
    if (message.author.bot) return;
    client.status.set('coins', true);
    if (message.guild) {
        message.settings = client.settings;
    } else {
        return message.channel.send("I only work in guilds, sorry.");
    };

    client.playerCoins = client.getCoins.get(client.currentGuild, message.author.id);
    if (!client.playerCoins) {
        client.playerCoins = {
            id: message.author.id-client.currentGuild,
            guild: client.currentGuild,
            user: message.author.id,
            points: 0,
        }
    }
    if (client.coinCooldown.has(message.author.id)) {
        let hey = "hi";
    } else {
        let points = Math.floor(Math.random() * 15 + 1)
        client.playerCoins.user = message.author.id
        client.playerCoins.points += points
        client.setCoins.run(client.playerCoins);
        client.coinCooldown.set(message.author.id, message.author.id);
    }

    setTimeout(function () {
        client.coinCooldown.delete(message.author.id)
    }, 60000)

    if (message.content.indexOf(message.settings.prefix) !== 0) return;

    const args = message.content.slice(message.settings.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    if (message.guild && !message.member) await message.guild.fetchMember(message.author);

    const level = client.permlevel(message);

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    client.status.set('eval', true);
    client.status.set('enable', true);
    client.status.set('disable', true);

    if (message.author.permLevel < 1) {
        if ((client.status.get(cmd.help.name) !== true)) { return message.channel.send("I'm sorry, this command is disabled either temporarily or permanently."); }
    }

    if (cmd && client.cooldowns.has(cmd.help.name)) {
        if (Array.from(client.cooldowns.get(cmd.help.name)).includes(message.author.id)) {
            message.delete();
            return message.reply("Slow down! You are on a cooldown.").then(m => { m.delete(3000) })
        }
    }


    if (level < client.levelsCache.get(cmd.conf.permLevel)) {
        return message.channel.send(`You do not have permission to use this command.`);
    }
    message.author.permLevel = level;
    message.flags = [];
    while (args[0] && args[0][0] === "-") {
        message.flags.push(args.shift().slice(1));
    }
    cmd.run(client, message, args, level);


    let arr = [];
    if (message.author.permLevel >= 2) return;

    if (client.cooldowns.get(cmd.help.name) == null) {
        client.cooldowns.set(cmd.help.name, [`${message.author.id}`]);
    } else {
        console.log(client.cooldowns.get(cmd.help.name));
        let gotten = Array.from(client.cooldowns.get(cmd.help.name));
        gotten.forEach(aritem => { arr.push(aritem) });

        client.cooldowns.set(cmd.help.name, arr.push(`${message.author.id}`));
    }

    setTimeout(function () { client.cooldowns.delete(cmd.help.name) }, cmd.conf.cooldown * 3000);


}; 