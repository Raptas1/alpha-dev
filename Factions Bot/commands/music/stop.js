exports.run = async (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id);
  if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.end();
      message.member.voice.channel.leave();
			return message.channel.send(`⏸ Stopped the music and left ${message.member.voice.channel.name}.`);
		}
		return message.channel.send('There is nothing playing.');
};

exports.conf = {
  enabled: true,
  aliases: ["pause"],
  permLevel: "User",
  premium: true
};

exports.help = {
  name: "stop",
  description: "Stops music playback.",
  usage: "stop",
};

