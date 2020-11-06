const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (client.queue.has(message.guild.id)) {
      const serverQueue = client.queue.get(message.guild.id);
      if (!client.queue.get(message.guild.id).songs) {
          return message.channel.send("There is nothing in queue");
      }
  if (args[0] === "clear" || args[0] === "wipe") {
    serverQueue.songs = [];
    client.queue.delete(message.guild.id);
    message.channel.send(":white_check_mark: The queue has been cleared!");
  } else if (args[0] === "list" || args[0] === "show" || !args[0]) {
    let pos = 0;
    let desc = "";
    serverQueue.songs.forEach(song => {
        pos++;
        desc += "\n" + `${pos}. **${song.title}**  (${song.length.minutes + ":" + song.length.seconds}) [${song.requester}]`;
    });
  const embed = new Discord.MessageEmbed()
  .setTitle("Current Queue")
  .setDescription(desc);
  message.channel.send(embed);
    
  } else if (args[0] === "remove" || args[0] === "delete") {
    if (!args[1]) {return message.channel.send("please use -q remove [position] to remove the song at the position specified");}
    if (args[1] > serverQueue.songs.length || args[1] == 0) {return message.reply("please send a valid selection.");}
    message.channel.send("removed song " + serverQueue.songs[args[1] - 1].title + " from the queue.");
    return serverQueue.songs.splice(args[1] -1, 1);
   };
  } else {return message.channel.send(client.errorEmbed("There is nothing in the queue"));}
};

exports.conf = {
  enabled: true,
  aliases: ["q"],
  permLevel: "User",
    premium: true
};

exports.help = {
  name: "queue",
  description: "See or modify the queue.",
  usage: "queue",
};

