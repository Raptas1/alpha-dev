exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  if ( args[0] == "soft") {
  await message.reply("Bot is reloading.");
  client.commands.forEach( async cmd => {
      await client.unloadCommand(cmd);
  });
  await client.loadCommands();  
  return;
  }; 
  await message.reply("Bot is shutting down.");
  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });
  client.destroy();
  process.exit(1);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Admin"
};

exports.help = {
  description: "Shuts down the bot.",
  usage: "reboot"
};
