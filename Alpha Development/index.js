const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const { promisify } = require("util");
const fs = require("fs");

const client = new Discord.Client({ disabledEvents: ["TYPING_START"] });
client.sql = new SQLite('./settings.sqlite');
client.coins = new SQLite('./coins.sqlite');
client.mod = new SQLite('./moderation.sqlite');

require('./core/init.js')(client);

const init = async () => {
    cacheLevels();
    loadEvents();
    loadCommands();
    await client.login(client.config.token);

};

const loadEvents = async () => {
    const evtFiles = await fs.readdirSync("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    });
};

const loadCommands = async () => {
    this.coms = 0;
    const categories = fs.readdirSync("./commands/");
    for (let category of categories) {
        let commands = fs.readdirSync(`./commands/${category}/`);
        for (let file of commands) {

            this.coms++;
            if (!file.endsWith(".js")) return;
            let commandName = file.slice(0, -3);
            const response = client.loadCommand(category, file);
            if (response) return console.log(response);
        };
    };
    console.log(`Loading a total of ${this.coms} commands.`);
};

const cacheLevels = () => {
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelsCache.set(thisLevel.name, thisLevel.level);
    }
};

init();
