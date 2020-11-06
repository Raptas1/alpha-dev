module.exports = (client) => {
  
  client.logger.log("loaded functions. (version: Minimal / 1.0.2)");
  
  client.permlevel = message => {let permlvl = 0;const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);while (permOrder.length) {const currentLevel = permOrder.shift(); if (message.guild && currentLevel.guildOnly) continue;if (currentLevel.check(message)) {permlvl = currentLevel.level;break;}}return permlvl;};
  
  client.getSettings = (guild) => {const defaults = client.config.defaultSettings || {};if (!guild) return defaults;const guildData = client.settings.get(guild) || {};const returnObject = {};Object.keys(defaults).forEach((key) => {  returnObject[key] = guildData[key] ? guildData[key] : defaults[key];});return returnObject;};

  client.awaitReply = async (msg, question, limit = 60000) => {const filter = m => m.author.id === msg.author.id;await msg.channel.send(question);try {const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });return collected.first().content;} catch (e) {return false;}};

  client.clean = async (client, text) => {if (text && text.constructor.name == "Promise")text = await text;if (typeof evaled !== "string")text = require("util").inspect(text, {depth: 1});text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace(client.token, "Nice Try.");return text;};
  
  
  client.loadCommand = (category, commandName) => {
    try {
      const props = require(`../commands/${category}/${commandName}`);
      if (props.init) {props.init(client);}
      if (props.conf.hasOwnProperty('cooldown') !== true) { Object.assign(props.conf, {cooldown: 3}); };
      Object.assign(props.help, { category: category, name: commandName.split(".js")[0] });  
      client.commands.set(commandName.split(".js")[0], props);
      props.conf.aliases.forEach(alias => {client.aliases.set(alias, commandName.split(".js")[0]);}); return false;
    } catch (e) {return `Unable to load command ${commandName}: ${e}`;}
  };

  client.unloadCommand = async (commandName) => {let command;
    if (client.commands.has(commandName)) {command = client.commands.get(commandName);} else if (client.aliases.has(commandName)) {command = client.commands.get(client.aliases.get(commandName));}
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
    if (command.shutdown) {await command.shutdown(client);}console.log(command);const mod = require.cache[require.resolve(`../commands/${command.help.category}/${commandName}`)];delete require.cache[require.resolve(`../commands/${command.help.category}/${commandName}.js`)];for (let i = 0; i < mod.parent.children.length; i++) {if (mod.parent.children[i] === mod) {mod.parent.children.splice(i, 1);break;}} return false;
  };

  Object.defineProperty(String.prototype, "toProperCase", {value: function() {return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());}});

  Object.defineProperty(Array.prototype, "random", {value: function() {return this[Math.floor(Math.random() * this.length)];}});

  client.wait = require("util").promisify(setTimeout);

  //process.on("uncaughtException", (err) => {const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");client.logger.error(`Uncaught Exception: ${errorMsg}`); process.exit(1);});

  process.on("unhandledRejection", error => {client.logger.error(`Unhandled rejection: ${error.stack || error.message || error}`);});
   
  
};
