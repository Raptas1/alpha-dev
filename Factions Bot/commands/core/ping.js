const ping = require("ping");

exports.run = async (client, message, args, level) => {
  
  var host = "8.8.8.8"; 
  const res = await ping.promise.probe(host);
  message.channel.send(`:zap: it took me \`${Math.ceil(res.avg)}ms\` to ping to \`google's dns\` !`)
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
  usage: "ping"
};

