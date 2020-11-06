const minecraft = require('mineflayer');
module.exports = async (client, message) => {


    event = this;
    if (message.author.bot) return;
    if (message.guild) {
        message.settings = client.settings;
    } else { return message.channel.send("I only work in guilds, sorry."); };
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) { return message.reply(`My prefix on this guild is \`${message.settings.prefix}\``); }
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
    console.log(message.author.permlevel);
    if (message.author.permLevel < 4) {
        if ((client.status.get(cmd.help.name) !== true)) { return message.channel.send("I'm sorry, this command is disabled either temporarily or permanently."); }
    }

    if (cmd && client.cooldowns.has(cmd.help.name)) { if (Array.from(client.cooldowns.get(cmd.help.name)).includes(message.author.id)) { message.delete(); return message.reply("chill, you are still on cooldown for this command.").then(m => { m.delete(3000) }) } }
    // if (cmd && cmd.conf.enabled !== true) { return message.channel.send("I'm sorry, this command is disabled either temporarily or permanently."); }
    console.log(client.levelsCache.get("Bot Owner"));
    if (level < client.levelsCache.get(cmd.conf.permLevel)) { return message.channel.send(`You do not have permission to use this command.`); }
    message.author.permLevel = level;
    message.flags = [];
    while (args[0] && args[0][0] === "-") { message.flags.push(args.shift().slice(1)); }
    client.logger.cmd(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} ran command ${command} | ${message.guild.name}`);
    cmd.run(client, message, args, level);


    let arr = [];
    if (message.author.permLevel >= 2) return;
    if (client.cooldowns.get(cmd.help.name) == null) {
        client.cooldowns.set(cmd.help.name, [`${message.author.id}`]);
    } else {
        console.log(client.cooldowns.get(cmd.help.name));
        let gotten = Array.from(client.cooldowns.get(cmd.help.name));
        gotten.forEach(aritem => { arr.push(aritem) });

        console.log(arr);
        client.cooldowns.set(cmd.help.name, arr.push(`${message.author.id}`));
    }

    setTimeout(function () { client.cooldowns.delete(cmd.help.name) }, cmd.conf.cooldown * 3000);

    
}; 
