exports.run = async (client, message, args, level) => {

    let command = args[0];
    if (!command) { return message.channel.send("Oops! You must type a command!") }

    const disableCmd = client.commands.find(cmd => cmd.help.name == command);

    if (disableCmd) {
        client.status.set(command, false);
        return message.channel.send(`Successfully disabled the command: \`${command}\``)
    } else {
        message.channel.send(`Oops! It looks like \`${command}\` is not a command on this server.`);
    }
};


exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    description: "Disable a command.",
    usage: "disable [cmd]"
};
