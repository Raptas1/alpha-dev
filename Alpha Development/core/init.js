const Enmap = require("enmap");
const fs = require('fs');
const YouTube = require('simple-youtube-api');
const Discord = require("discord.js");
const ping = require("ping");
const ms = require('ms');
const prettyMs = require("pretty-ms");

module.exports = async (client) => {

    /* Misc */
    client.config = require("../config.js");
    client.ytdl = require('ytdl-core');
    client.youtube = new YouTube("AIzaSyAO2V3CewbXWTPeYv3X5kIrUYpJvCv3Cl0");
    

    /* Helpers */


/* Functions */
    require("./database.js")(client);
    require("./functions.js")(client);
  //  require("./embedHelper.js")(client);
    require("./music.js")(client);


    /*Embeds */




/* Data Stores */

    client.coinCooldown = new Map();
    client.skipCount = new Map();
    client.skipCount.set('skipCount', { count: 0, author: null })
    client.afk = new Map();
    client.levelsCache = new Map();
    client.status = new Enmap({name: 'status', fetchAll: false});
    client.commands = new Enmap({ fetchAll: false, pollingInterval: 0 });
    client.aliases = new Enmap({ fetchAll: false, pollingInterval: 0 });
    client.cooldowns = new Map();
    client.clusters = new Enmap({ fetchAll: false, pollingInterval: 2000 });
    client.queue = new Map();
    client.levelCache = new Map();




};
