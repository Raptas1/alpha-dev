exports.run = async (client, message, args) => {	
	const searchString = args.slice(0).join(' ');
	const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = client.queue.get(message.guild.id);

  
    const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}
  
  //if  (serverQueue.isLoop) {return message.channel.send("");}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await client.youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await client.youtube.getVideoByID(video.id); 
				await client.handleVideo(video2, message, voiceChannel, true); 
			}
			return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await client.youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await client.youtube.searchVideos(searchString, 1);
					
					var video = await client.youtube.getVideoByID(videos[0].id);
				} catch (err) {
					console.error(err);
					return message.reply('Hmm, I could not obtain any search results.');
				}
			}
			return client.handleVideo(video, message, voiceChannel);
		}
};

exports.conf = {
  enabled: true,
  aliases: ["p"],
  permLevel: "User"
};

exports.help = {
  name: "play",
  description: "Plays music in a voice channel",
  usage: "play [song title]",
};
