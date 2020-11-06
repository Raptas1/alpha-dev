const mineflayer = require("mineflayer");
const Discord = require('discord.js');

module.exports = async (client, message) => {

    client.logger.log(`Loaded Minecraft Api (version 1.0.0) By Raptas & Martosis `)

    client.wallCooldown = new Map();
    client.bufferCooldown = new Map();
    let settings = client.settings;
    let hostServer = settings.server
    client.minecraft = mineflayer.createBot({
        host: hostServer,
        //port:"25598",
        username: "igudino2002@gmail.com",
        password: 'Raptas1!',
        version: "1.8"
    });
      
    client.minecraft.on("login", () => {
        console.log("Logged in!");
        client.minecraft.chat(`/onyx`);
       // client.minecraft.chat('/onyx');
        //client.minecraft.setControlState('jump', true);

    });

   // if (!client.minecraft.username) {
        // return client.channels.cache.get(settings.logsChannel).send("The bot could not be logged in, please reboot\nif this is a continous error please make a ticket in Alpha Development");
   // }
    //client.bot.username = client.minecraft.username;

    client.minecraft.on("end", () => {
        client.minecraft = mineflayer.createBot({
            host: hostServer,
            username: "igudino2002@gmail.com",
            password: 'Raptas1!',
            version: "1.8"
        });
        client.minecraft.on("login", () => {
            console.log("Logged in!");
            client.minecraft.chat(`/onyx`);
        });
    })

    client.VanishStaff = new Map();
   // @Template client.VanishStaff.set("UUID", "IGN");


    client.minecraft._client.on('player_info', (packet) => {

        if (packet.action == 0) {
            for (let i = 0; i < packet.data.length; i++) {
                if (packet.data[i].UUID == undefined) return;
                if (client.playersUpdated.has(packet.data[i].UUID)) {
                    client.channels.cache.find(n => n.name == "vanish").send(`${client.VanishStaff.get(packet.data[i].UUID)} is no longer in vanish`)
                    client.playersUpdated.delete(packet.data[i].UUID);
                    client.visiblePlayers.delete(packet.data[i].UUID);
                }
               // client.visiblePlayers.push(packet.data[i].UUID);
                //client.minecraft.chat(`${packet.data[i].UUID} has joined the server`)
            }
        }

        else if (packet.action == 4) {
            for (let i = 0; i < packet.data.length; i++) {
                //client.minecraft.chat(`${packet.data[i].UUID} has left the server`)
                // client.visiblePlayers.splice(client.visiblePlayers.indexOf(packet.data[i].UUID, 1));
                client.visiblePlayers.set(packet.data[i].UUID, 0);
            }
        }

        else if (packet.action == 2) {
            for (let i = 0; i < packet.data.length; i++) {
               // client.minecraft.chat(`${packet.data[i].UUID} latency updated`)
                // client.playersUpdated.push(packet.data[i].UUID);
                if (!client.playersUpdated.has(packet.data[i].UUID)) {
                    if (client.VanishStaff.has(packet.data[i].UUID)) {
                        if (client.visiblePlayers.has(packet.data[i].UUID)) {
                            client.playersUpdated.set(packet.data[i].UUID, 0)
                            client.channels.cache.find(n => n.name == "vanish").send(`${client.VanishStaff.get(packet.data[i].UUID)} is in vanish`)
                        }
                    }
                }

            }
        }
    })
    if (settings.server.toLowerCase().includes("archon")) {
        client.minecraft.chatAddPattern(/\((.+) ➥ me\) (.+)/, 'whisper', 'Archon chat pattern');
        client.minecraft.chatAddPattern(/#(.+) - (.+) - (.+)/, 'message', 'Archon fTop');
        client.minecraft.chatAddPattern(/(.+) - (.+) online \| Power (.+)/, 'message', 'Archon flist');
        client.minecraft.chatAddPattern(/(.*) \- ([0-9]+)\/([0-9]+) online \| Power ([0-9]+) \/ ([0-9]+) \/ ([0-9]+)/, 'faction_entry')
    }

   // client.minecraft.chatAddPattern(/(.+) -> You » (.+)/, 'whisper', 'starcade chat pattern')
    // client.minecraft.chatAddPattern(/\[(.+) --> You\] (.+)/, 'whisper', 'dominion chat pattern');
   // client.minecraft.chatAddPattern(/\[FactionsRed\]\[(.+) -> You\] » (.+)/, 'whisper', 'maplecraft chat pattern');
   // client.minecraft.chatAddPattern(/(.+)\. (.+) Total: (.+\s) (.+)/, 'chat', 'Ftop');
    //client.minecraft.chatAddPattern(/(.+) Total: (.+)/, 'chat', 'fTop');

    await client.minecraft.on("message", message => {
        if (!client.channels.cache.get(settings.serverchatChannel)) {
            return;
        } else {
           client.channels.cache.get(settings.serverchatChannel).send(`\`${message}\``);
        }
    });

    client.minecraft.on('faction_entry', (factionName, online, maxOnline, power1, power2, power3) => {
        if (client.fListCounter < 9) {
            client.fList.addField(factionName, `${online}/${maxOnline} online | Power ${power1}/${power2}/${power3}`)
            client.fListCounter++;
        } else if (client.fListCounter == 9) {
            if (!client.Lchannel) {
                client.channels.cache.get(client.flistID).send(client.fList);
            } else {
                client.Lchannel.send(client.fList);
            }
            client.fList = new Discord.MessageEmbed().setAuthor("F LIST").setColor("GREEN")
        }
    });

    client.minecraft.on('message', (fPosition, faction, worth, matches) => {
        if (!client.listeningFtop) return;
        if (isNaN(fPosition)) return;
        if (fPosition < 9) {
            client.fTop.addField(`#${fPosition}. ${faction}`, `Total Worth: ${worth}`)
        } else if (fPosition == 9) {
            client.fTop.addField(`${fPosition}. ${faction}`, `Total Worth: ${worth}`)
            if (!client.Fchannel) {
                client.channels.cache.get(client.ftopID).send(client.fTop);
            } else {
                client.Fchannel.send(client.fTop);
            }

            client.fTop = new Discord.MessageEmbed().setAuthor("F TOP").setColor("GREEN").setTimestamp()
             client.listeningFtop = false;
            }

    });

    //client.minecraft.chatAddPattern(/(.+) (.+) Land\/Power \/ Max Power(.+)/, 'chat', 'Flist');
   // client.minecraft.chatAddPattern(/(.+) (.+)  Land \/ Power \/ Max Power(.+)/, 'chat', 'Flist');


 

    

    client.minecraft.on('whisper', (username, message, matches) => {
        client.getUuid = client.wSql.prepare("SELECT * FROM whitelist WHERE uuid = ?");
        if (message == "walls" && client.getUuid.get(client.minecraft.players[username].uuid)) {
            // client.minecraft.chat(`/ff walls have been checked by ${client.minecraft.players[username].username}`);
            client.lastWallChecker = client.minecraft.players[username].username;
            client.wallTimerReset = 1;
            if (client.wallCooldown.has(client.minecraft.players[username].uuid)) {
                let aEmbed = new Discord.MessageEmbed()
                    .setAuthor("⚠︎︎ ATTENTION ⚠︎︎")
                    .setColor("YELLOW")
                    .setTimestamp()
                    .setThumbnail(`https://crafatar.com/avatars/${client.minecraft.players[username].uuid}`)
                    .setDescription(`➪ ${client.minecraft.players[username].username} has checked walls again in less than 10 seconds. \n__𝐵𝐸 𝐴𝑊𝐴𝑅𝐸__`)
                client.channels.cache.get(settings.logsChannel).send(aEmbed);
            } else {
                client.wallCooldown.set(client.minecraft.players[username].uuid, client.minecraft.players[username].uuid)
                setTimeout(function () {
                    client.wallCooldown.delete(client.minecraft.players[username].uuid);
                }, 10000)
            }

            if (!client.wallTop.has(client.minecraft.players[username].username)) {
                client.wallTop.set(client.minecraft.players[username].username, 1);
            } else {
                client.wallTop.set(client.minecraft.players[username].username, client.wallTop.get(client.minecraft.players[username].username) + 1);
            }

            let embed = new Discord.MessageEmbed()
                .setAuthor("Walls Checked")
                .setColor('GREEN')
                .setDescription(`${client.minecraft.players[username].username} has checked the walls ${client.emojis.cache.find(emojis => emojis.name === "checkmark")}`)
                .setThumbnail(`https://crafatar.com/avatars/${client.minecraft.players[username].uuid}`)
                .addField(`${client.minecraft.players[username].username} has ${client.wallTop.get(client.minecraft.players[username].username)} wall checks`, "\u200b")
                .setTimestamp()
            client.channels.cache.get(settings.wallsChannel).send(embed);
            client.minecraft.chat(`/msg ${client.minecraft.players[username].username} You, have checked walls`);
            client.minecraft.chat(`/ff ${client.minecraft.players[username].username} has checked the walls, with ${client.wallTop.get(client.minecraft.players[username].username)} walls checked`);

        }

        if (message == "buffers" && client.getUuid.get(client.minecraft.players[username].uuid)) {

            client.lastBufferChecker = client.minecraft.players[username].username;
            client.buffersTimerReset = 1;
            if (client.bufferCooldown.has(client.minecraft.players[username].uuid)) {
                let aEmbed = new Discord.MessageEmbed()
                    .setAuthor("⚠︎︎ ATTENTION ⚠︎︎")
                    .setColor("YELLOW")
                    .setTimestamp()
                    .setThumbnail(`https://crafatar.com/avatars/${client.minecraft.players[username].uuid}`)
                    .setDescription(`➪ ${client.minecraft.players[username].username} has checked buffers again in less than 5 minutes. \n__𝐵𝐸 𝐴𝑊𝐴𝑅𝐸__`)
                client.channels.cache.get(settings.logsChannel).send(aEmbed);
            } else {
                client.bufferCooldown.set(client.minecraft.players[username].uuid, client.minecraft.players[username].uuid)
                setTimeout(function () {
                    client.bufferCooldown.delete(client.minecraft.players[username].uuid);
                }, 300000)
            }

            if (!client.bufferTop.has(client.minecraft.players[username].username)) {
                client.bufferTop.set(client.minecraft.players[username].username, 1);
            } else {
                client.bufferTop.set(client.minecraft.players[username].username, client.bufferTop.get(client.minecraft.players[username].username) + 1);
            }

            client.minecraft.chat(`/ff buffers have been checked by ${client.minecraft.players[username].username}`);
            let embed = new Discord.MessageEmbed()
                .setAuthor("Buffer Checked")
                .setColor('GREEN')
                .setDescription(`${client.minecraft.players[username].username} has checked the buffers ${client.emojis.cache.find(emojis => emojis.name === "checkmark")}`)
                .setThumbnail(`https://crafatar.com/avatars/${client.minecraft.players[username].uuid}`)
                .addField(`${client.minecraft.players[username].username} has ${client.bufferTop.get(client.minecraft.players[username].username)} buffer checks`, "\u200b")
                .setTimestamp()
            client.channels.cache.get(settings.buffersChannel).send(embed);
            client.minecraft.chat(`/msg ${client.minecraft.players[username].username} You, have checked buffers`);
            client.minecraft.chat(`/ff ${client.minecraft.players[username].username} has checked the buffers, with ${client.bufferTop.get(client.minecraft.players[username].username)} buffers checked`);
        }

        if (message == "weewoo" && client.getUuid.get(client.minecraft.players[username].uuid)) {
            client.weewoo = !client.weewoo;

            let color;
            let word;
            if (client.weewoo) {
                color = "RED";
                word = "activated"
            } else {
                color = "GREEN"
                word = "deactivated"
            }
            let wEmbed = new Discord.MessageEmbed()
                .setAuthor("⚠︎︎ ATTENTION ⚠︎︎")
                .setColor(color)
                .setTimestamp()
                .setDescription(`**${client.minecraft.players[username].username}** has ${word} weewoo.`)
                .setThumbnail(`https://crafatar.com/avatars/${client.minecraft.players[username].uuid}`)
            client.minecraft.chat(`/msg ${client.minecraft.players[username].username} You have ${word} weewoo`);
            client.channels.cache.get(settings.logsChannel).send(wEmbed);
         }
        
         command = message.split(" ", 2);

        if (command.length >= 2) {
            let wEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTimestamp()
            if (command[0] == "whitelist") {
                for (let [key, value] of client.pendingWhitelist.entries()) {
                    if (command[1] == value) {
                        let whitelists = client.whitelists;
                        whitelists.guild = client.currentGuild;
                        whitelists.username = key
                        whitelists.uuid = client.minecraft.players[username].uuid
                        client.setWhitelist.run(whitelists);
                        client.whitelist.set(key, client.minecraft.players[username].uuid);
                        client.whitelist.set(client.minecraft.players[username].uuid, key);

                        wEmbed.setDescription(`${username} has whitelisted themselves to the bot under: \`${client.users.cache.get(key).username}#${client.users.cache.get(key).discriminator}\``)
                        wEmbed.setThumbnail(client.users.cache.get(key).avatarURL())
                        client.channels.cache.get(settings.logsChannel).send(wEmbed);
                        client.minecraft.chat(`/msg ${username} You have successfully linked your account.`);
                        client.pendingWhitelist.delete(key);
                        return;
                    }
                }
            }
        }
        
    });
  
}
