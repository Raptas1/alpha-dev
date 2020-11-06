const Discord = require("discord.js")
exports.run = async (client, message, args, ) => { // eslint-disable-line no-unused-vars
/*
 * [action, key, ...value]
  // Retrieve current guild settings (merged) and overrides only.
  const settings = message.settings;
  const defaults = client.config.defaultSettings;
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
  
  // Edit an existing key value
  if (action === "edit") {
    // User must specify a key.
    if (!key) return message.reply("Please specify a key to edit");
    // User must specify a key that actually exists!
    if (!defaults[key]) return message.reply("This key does not exist in the settings");
    const joinedValue = value.join(" ");
    // User must specify a value to change.
    if (joinedValue.length < 1) return message.reply("Please specify a new value");
    // User must specify a different value than the current one.
    if (joinedValue === settings[key]) return message.reply("This setting already has that value!");
    
    // If the guild does not have any overrides, initialize it.
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    // Modify the guild overrides directly.
    client.settings.set(message.guild.id, joinedValue, key);

    // Confirm everything is fine!
    message.reply(`${key} successfully edited to ${joinedValue}`);
  } else
  
  // Resets a key to the default value
  if (action === "del" || action === "reset") {
    if (!key) return message.reply("Please specify a key to reset.");
    if (!defaults[key]) return message.reply("This key does not exist in the settings");
    if (!overrides[key]) return message.reply("This key does not have an override and is already using defaults.");
    
    // Good demonstration of the custom awaitReply method in `./modules/functions.js` !
    const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response.toLowerCase())) {
      // We delete the `key` here.
      client.settings.delete(message.guild.id, key);
      message.reply(`${key} was successfully reset to default.`);
    } else
    // If they respond with n or no, we inform them that the action has been cancelled.
    if (["n","no","cancel"].includes(response)) {
      message.reply(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
    }
  } else
  
  if (action === "get") {
    if (!key) return message.reply("Please specify a key to view");
    if (!defaults[key]) return message.reply("This key does not exist in the settings");
    const isDefault = !overrides[key] ? "\nThis is the default global default value." : "";
    message.reply(`The value of ${key} is currently ${settings[key]}${isDefault}`);
  } else {
    // Otherwise, the default action is to return the whole configuration;
    const array = [];
    Object.entries(settings).forEach(([key, value]) => {
      array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
    });
    await message.channel.send(`= Current Guild Settings =\n${array.join("\n")}`, {code: "asciidoc"});
  }
  */
    let settings = client.settings
    
if (!args[0]) {
    let embed = new Discord.MessageEmbed()
        .setAuthor("Server Settings")
        .setDescription("Change the roles of perms, the channels, and other things necessary for this faction bot to work!")
        .setColor("GREEN")
        .setTimestamp()
        .addField("Server:", settings.server, true)
        .addField("Prefix:", settings.prefix, true)
        .addField("Member:", settings.memberRole, true)
        .addField("Moderator:", settings.modRole, true)
        .addField("Admin:", settings.adminRole, true)
        .addField("Weewoo:", settings.weewooChannel, true)
        .addField("Walls:", settings.wallsChannel, true)
        .addField("Buffers:", settings.buffersChannel, true)
        .addField("Serverchat:", settings.serverchatChannel, true)
        .addField("Logs:", settings.logsChannel, true)

    message.channel.send(embed);
} else if (args[0] == "edit") {
    switch (args[1].toLowerCase()) {
        case "prefix":
            if (!args[2]) {
                return message.reply("You must include a prefix.");
            }
            settings.prefix = args[2];
            message.reply(`Successfully changed the Prefix to: \`${settings.prefix}\``);
            break;
        case "server":
            if (!args[2]) {
                return message.reply("You must include a Server IP")
            }
            settings.server = args[2];
            message.reply(`Successfully changed the Server IP to: \`${settings.server}\``);
            break;
        case "member":
            if (!args[2]) {
                return message.reply("You must include a Role ID")
            }
            if (isNaN(args[2])) {
                return message.reply("Role ID's are just numbers!")
            }
            settings.memberRole = args[2];
            message.reply(`Successfully changed the Member Role to: \`${settings.memberRole}\``);
            break;
        case "mod":
            if (!args[2]) {
                return message.reply("You must include a Role ID")
            }
            if (isNaN(args[2])) {
                return message.reply("Role ID's are just numbers!")
            }
            settings.modRole = args[2];
            message.reply(`Successfully changed the Mod Role to: \`${settings.modRole}\``);
            break;
        case "admin":
            if (!args[2]) {
                return message.reply("You must include a Role ID")
            }
            if (isNaN(args[2])) {
                return message.reply("Role ID's are just numbers!")
            }
            settings.adminRole = args[2];
            message.reply(`Successfully changed the Admin Role to: \`${settings.adminRole}\``);
            break;
        case "weewoo":
            if (!args[2]) {
                return message.reply("You must include a Channel ID")
            }
            if (isNaN(args[2])) {
                return message.reply("Channel ID's are just numbers!")
            }
            settings.weewooChannel = args[2];
            message.reply(`Successfully changed the Weewoo Channel to: \`${settings.weewooChannel}\``);
            break;
        case "walls":
            if (!args[2]) {
                return message.reply("You must include a Channel ID")
            }
            if (isNaN(args[2])) {
                return message.reply("Channel ID's are just numbers!")
            }
            settings.wallsChannel = args[2];
            message.reply(`Successfully changed the Walls Channel to: \`${settings.wallsChannel}\``);
            break;
        case "buffers":
            if (!args[2]) {
                return message.reply("You must include a Channel ID")
            }
            if (isNaN(args[2])) {
                return message.reply("Channel ID's are just numbers!")
            }
            settings.buffersChannel = args[2];
            message.reply(`Successfully changed the Buffers Channel to: \`${settings.buffersChannel}\``);
            break;
        case "serverchat":
            if (!args[2]) {
                return message.reply("You must include a Channel ID")
            }
            if (isNaN(args[2])) {
                return message.reply("Channel ID's are just numbers!")
            }
            settings.serverchatChannel = args[2];
            message.reply(`Successfully changed the Server Chat Channel to: \`${settings.serverchatChannel}\``);
            break;
        case "logs":
            if (!args[2]) {
                return message.reply("You must include a Channel ID")
            }
            if (isNaN(args[2])) {
                return message.reply("Channel ID's are just numbers!")
            }
            settings.logsChannel = args[2];
            message.reply(`Successfully changed the Logs Channel to: \`${settings.logsChannel}\``);
            break;
        default:
            message.reply("That is not a setting.")
    }
}
client.setSettings.run(settings);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["setting", "settings", "conf"],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "set",
    category: "System",
    description: "View or change settings for your server.",
    usage: "set <view/get/edit> <key> <value>"
};
