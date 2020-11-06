exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
    if (!args || args.length < 1) return message.reply("Must provide a command to reload. Derp.");

    let command = args[0];

    if (client.commands.has(command) || client.commands.get(client.aliases.get(command))) {

        command = client.commands.get(command) || client.commands.get(client.aliases.get(command));


        let response = await client.unloadCommand(command.help.name, command.help.category);
        if (response) return message.reply(`Error Unloading: ${response}`);

        response = client.loadCommand(command.help.category, command.help.name);
        if (response) return message.reply(`Error Loading: ${response}`);

        message.reply(`The command \`${command.help.name}\` has been reloaded`);
        client.logger.reload(`reloaded command: ${command.help.name}.`);
    }

};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    description: "Reloads a command that\"s been modified.",
    usage: "reload [command]"
};
