
module.exports = (client) => {
	console.log("loaded music modules. (version: 0.4.0) By Raptas");

	client.handleVideo = async (video, msg, voiceChannel, playlist = false) => {
		const serverQueue = client.queue.get(msg.guild.id);
		const song = {
			elapsed: 0,
			length: video.duration,
			requester: msg.author.username,
			id: video.id,
			title: video.title.replace(/\\(\*|_|`|~|\\)/g, '$1').replace(/(\*|_|`|~|\\)/g, '\\$1'),
			url: `https://www.youtube.com/watch?v=${video.id}`,
			thumbnailURL: video.thumbnails.medium.url,
			channel: video.channel.title
		};
		if (!serverQueue) {
			const queueConstruct = {
				textChannel: msg.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 3,
				playing: true,
				onLoop: false
			};
			client.queue.set(msg.guild.id, queueConstruct);

			queueConstruct.songs.push(song);
			try {
				var connection = await voiceChannel.join();
				queueConstruct.connection = connection;
				client.play(msg.guild, queueConstruct.songs[0]);
			} catch (error) {
				console.error(`I could not join the voice channel: ${error}`);
				client.queue.delete(msg.guild.id);
				return msg.channel.send(`I could not join the voice channel: ${error}`);
			}
		} else {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			if (playlist) return undefined;
			else return msg.channel.send(`:white_check_mark: **${song.title}** has been added to the queue!`);
		}
		return undefined;
	};

	client.play = (guild, song) => {

		const serverQueue = client.queue.get(guild.id);

		if (!song) {
			serverQueue.voiceChannel.leave();
			client.queue.delete(guild.id);
			return;
		}

		const dispatcher = serverQueue.connection.play(client.ytdl(song.url, { quality: "highestaudio", highWaterMark: 1 << 25, filter: 'audioonly' }), { highWaterMark: 1 })
			.on('finish', reason => {
				if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
				else console.log(reason);
				if (serverQueue.onLoop !== true) {
					serverQueue.songs.shift();
				}
				client.play(guild, serverQueue.songs[0]);
			})
			.on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

		if (serverQueue.onLoop !== true) {
			serverQueue.textChannel.send(client.musicEmbed(song.title, song.channel, song.thumbnailURL, song.requester, song.length.minutes + ":" + song.length.seconds));
		}


	};

};