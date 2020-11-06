exports.run = async (client, message, args) => {
  if (!client.queue.has(message.guild.id)) return message.channel.send('There is nothing playing.');
  const serverQueue = client.queue.get(message.guild.id);
  if (serverQueue && serverQueue.onLoop && serverQueue.playing) {
			serverQueue.onLoop = false;
			return message.channel.send(':repeat: loop: **Disabled**');
		} else {
      if (serverQueue && serverQueue.onLoop !== true && serverQueue.playing) {
      serverQueue.onLoop = true;
			return message.channel.send(':repeat: loop: **Enabled**');
      }
    }
};

exports.conf = {
  enabled: true,
  aliases: ["repeat"],
  permLevel: "User",
    premium: true
};

exports.help = {
  name: "loop",
  description: "Loops the current music playback.",
  usage: "loop",
};

