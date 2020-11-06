const Enmap = require("enmap");
const fs = require('fs');
const YouTube = require('simple-youtube-api');
const Discord = require("discord.js");
const ping = require("ping");
const ms = require('ms');
const prettyMs = require("pretty-ms");

module.exports = async (client) => {
    client.settings = new Enmap({ name: 'settings', fetchAll: false, pollingInterval: 200 });

    // @my server client.serverID = "762132262728105994";
    client.serverID = "758737217492877323";
    client.ftopID = "762158907199979542";
    client.flistID = "760361664821985341";


    /* Misc */
    client.config = require("../config.js");
    client.logger = require("./logger");
    client.ytdl = require('ytdl-core');
    client.youtube = new YouTube("AIzaSyAO2V3CewbXWTPeYv3X5kIrUYpJvCv3Cl0");

    /* Helpers */
    client.listeningFtop = false;
    client.listeningFlist = false;
    client.fList = new Discord.MessageEmbed().setAuthor("F LIST").setColor("GREEN").setTimestamp()
    client.fTop = new Discord.MessageEmbed().setAuthor("F TOP").setColor("GREEN").setTimestamp()
    client.Lchannel;
    client.Fchannel;
    client.visiblePlayers = new Map();
    client.playersUpdated = new Map();
    client.hiddenPlayers = []

    client.uuidMap = new Map();
    client.uuidMap.set('f61027ef-c737-479a-9d97-3aafa8b073c0', "GorillaEvolved");
    client.uuidMap.set('45e9d463-f1e2-4acc-a9e2-271ac7b79092', "Taleeko");
    client.uuidMap.set('6ae192bc-a233-4ca3-a378-e9535aae31e8', "Cookouts");
    client.uuidMap.set('110db4b4-f6bb-4ef2-87ff-6b4e88abde28', "Cougarz");
    client.uuidMap.set('fd5ec48b-8897-4905-94cf-5c07f051c193', "Chewy_Bear");
    client.uuidMap.set('1edd0f19-752f-410d-9ce5-4853cc888e77', "OhDave");
    client.uuidMap.set('39815cc7-2ee7-46da-82c0-717c5c369c5c', "OffCourseYT");

/* Functions */
    require("./database.js")(client);
    require("./functions.js")(client);
    require("./embedHelper.js")(client);
    require("./music.js")(client);
    require("./minecraft.js")(client);
    wallsTimerId();
    buffersTimerId();
    fListTimer();

    /*Embeds */
    wallTime = 0;
    bufferTime = 0;



/* Data Stores */




    client.wallChecks = false;
    client.bufferChecks = false;
    client.weewoo = false;
    client.wallsTimer = false;
    client.wallTimerMin = 0;
    client.wallTop = new Enmap({ name: 'wallTop' });
    client.wallTop.set(0, 0);
    client.buffersTimer = false;
    client.bufferTimerMin = 0;
    client.bufferTop = new Enmap({ name: 'bufferTop' });
    client.bufferTop.set(0, 0);
    client.fTopCounter = 0;
    client.fListCounter = 0;
    client.skipCount = new Map();
    client.skipCount.set('skipCount', { count: 0, author: null })
    client.whitelist = new Enmap({ name: 'whitelist', fetchAll: false });
    client.whitelist.set(0, 0);
    client.pendingWhitelist = new Map();
    client.afk = new Map();
    client.levelsCache = new Map();
    client.status = new Enmap({name: 'status', fetchAll: false});
    client.commands = new Enmap({ fetchAll: false, pollingInterval: 0 });
    client.aliases = new Enmap({ fetchAll: false, pollingInterval: 0 });
    client.cooldowns = new Map();
    client.clusters = new Enmap({ fetchAll: false, pollingInterval: 2000 });
    client.queue = new Map();
    client.levelCache = new Map();

    /* Saved Data stores */

    //client.actions = new Enmap({ name: 'actions' }); <- breaks bot
   // client.userProfiles = new Enmap({ name: 'userProfiles' });

    /* Timers */
    client.weewooId = setInterval(function () {
        let wEmbed = new Discord.MessageEmbed()
            .setAuthor("⚠︎︎ ATTENTION ⚠︎︎")
            .setColor("RED")
            .setTimestamp()
            .setDescription("WEEWOO, We are getting raided! \n☞︎ 𝔾𝔼𝕋 𝕆ℕ 𝔸ℕ𝔻 ℙ𝔸𝕋ℂℍ!")
        if (client.weewoo) {
            client.channels.cache.find(n => n.name == client.settings.get(client.serverID, "weewooChannel")).send(wEmbed);
            client.channels.cache.find(n => n.name == client.settings.get(client.serverID, "weewooChannel")).send("@everyone");
            
        }
    }, 3000);

    function wallsTimerId() {
        client.wallsTimerId = setInterval(function () {
           // client.minecraft.chat('/hades')
            if (client.wallChecks) {
                if (client.wallTimerReset == 1) {
                    client.wallTimerReset = 0;
                    client.wallTimerMin = 0
                    wallsTimerReset()
                } else {
                    client.wallTimerMin++;
                    wallTime = prettyMs(30000 * client.wallTimerMin, { verbose: true });
                    let wMessage = `Walls were last checked by ${client.lastWallChecker}`;
                    if (!client.lastWallChecker) { wMessage = "Walls have not been checked yet" }
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Wall Check Alert")
                        .setColor("RED")
                        .setDescription(`Walls have not been checked for ${wallTime}`)
                        .setTimestamp()
                        .setFooter(`${wMessage}`);
                    if (client.wallTimerMin >= 4) {
                        client.channels.cache.find(n => n.name == client.settings.get(client.serverID, "wallCheckChannel")).send(embed);
                        client.minecraft.chat(`/ff Walls have not been checked for ${wallTime}`);
                       // client.minecraft.chat(`Walls have not been checked for ${wallTime}`);
                        //  client.channels.cache.find(n => n.name == client.settings.get(client.guilds.cache.firstKey(), "wallCheckChannel")).send(`@everyone`);
                    } else {
                        client.channels.cache.find(n => n.name == client.settings.get(client.serverID, "wallCheckChannel")).send(embed);
                    }

                }
            }
        }, 30000)

            //if (client.wallsTimer) {
          //      client.wallTimerMin = 0;
            //    client.wallsTimer = false;
           // }     
    }

    function wallsTimerReset() {
        clearInterval(client.wallsTimerId)
        wallsTimerId();
    }

    function buffersTimerId() {
        client.buffersTimerId = setInterval(function () {
            client.listeningFtop = true;
            client.minecraft.chat('/f top');
            client.Fchannel = client.channels.cache.get(client.ftopID);
           // client.fListCounter = 0;
           // client.listeningFlist = true;
           // client.minecraft.chat('/f list');
            client.Lchannel = client.channels.cache.get(client.flistID);
            if (client.bufferChecks) {
                if (client.buffersTimerReset == 1) {
                    client.buffersTimerReset = 0;
                    client.bufferTimerMin = 0
                    bufferTimerReset()
                } else {
                    client.bufferTimerMin++;
                    bufferTime = prettyMs(300000 * client.bufferTimerMin, { verbose: true });
                    let bMessage = `Buffers were last checked by ${client.lastBufferChecker}`;
                    if (!client.lastBufferChecker) { bMessage = `Buffers have not been checked yet` };
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Buffer Check Alert")
                        .setColor("RED")
                        .setDescription(`Buffers have not been checked for ${bufferTime}`)
                        .setTimestamp()
                        .setFooter(`${bMessage}`)
                    if (client.bufferTimerMin >= 4) {
                        client.channels.cache.find(n => n.name == client.settings.get(client.serverID, "bufferCheckChannel")).send(embed);
                        client.minecraft.chat(`/ff Buffers have not been checked for ${bufferTime}`);
                        // client.channels.cache.find(n => n.name == client.settings.get(client.guilds.cache.firstKey(), "bufferCheckChannel")).send(`@everyone`);
                    } else {
                        client.channels.cache.find(n => n.name == client.settings.get(client.serverID, "bufferCheckChannel")).send(embed);
                    }

                }
            }
        }, 300000)

    }

    function bufferTimerReset() {
        clearInterval(client.buffersTimerId);
        buffersTimerId();
    }


    function fListTimer() {
        client.flistTimerId = setInterval(function () {
        client.fListCounter = 0;
        client.listeningFlist = true;
        client.minecraft.chat('/f list');
        client.Lchannel = client.channels.cache.get(client.flistID);
        }, 420000)

    }
};
