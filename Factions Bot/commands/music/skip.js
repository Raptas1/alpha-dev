exports.run = async (client, message, args) => {
    let skipCount = client.skipCount.get('skipCount');
    const serverQueue = client.queue.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!');
    if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
    if (skipCount.count >= 2) {
        message.channel.send(`You voted to skip, ${skipCount.count + 1}/3`);
        serverQueue.connection.dispatcher.end('Skip command has been used!');
        if (serverQueue.length == 0) { return message.channel.send("there was no other song in queue that i could skip to."); }
        message.channel.send(`Skipping..`);
    } else {
        if (message.author.id == skipCount.author) {
            return message.reply("You already voted to skip.");
        } else {
            client.skipCount.set('skipCount', { count: skipCount.count + 1, author: message.author.id })
            console.log(skipCount.count)
            message.channel.send(`You voted to skip, ${skipCount.count + 1}/3`);
        }
       
    }
	
};

exports.conf = {
  enabled: true,
  aliases: ["next"],
  permLevel: "User",
    premium: true
};

exports.help = {
  name: 'skip',
  description: "Skips the song in queue.",
  usage: "skip",
};
