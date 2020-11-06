exports.run = async (client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');
    if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
    serverQueue.connection.dispatcher.end('Skip command has been used!');
    if (serverQueue.length == 0) { return message.channel.send("there was no other song in queue that i could skip to."); }
    message.channel.send(`Skipping..`);
};

exports.conf = {
    enabled: true,
    aliases: ["forceskip"],
    permLevel: "Moderator",
    premium: true
};

exports.help = {
    name: 'fskip',
    category: 'music',
    description: "Force skips the song in queue.",
    usage: "fskip",
};
