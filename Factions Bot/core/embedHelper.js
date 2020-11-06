const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = client => {


    client.musicEmbed = (title, channel, thumbnail, req, length) => {
        let emb = new MessageEmbed()
            .setTitle(channel)
            .setColor(0x00ccff)
            .setThumbnail(thumbnail)
            .setDescription(`🎶 now playing: **${title}**`)
            .setFooter(`requested by: ${req} | ${length}`);

        return emb;
    };

    client.nowplayingEmbed = (title, channel, thumbnail, req, left, length) => {
        let emb = new MessageEmbed()
            .setTitle(channel)
            .setColor(0x00ccff)
            .setThumbnail(thumbnail)
            .setDescription(`🎶 now playing: **${title}**`)
            .setFooter(`requested by: ${req} | ${left}/${length}`);

        return emb;
    };

    client.errorEmbed = (error) => {
        let emb = new MessageEmbed()
            .setTitle("error")
            .setColor(12)
            .setDescription(`error`)
        return emb;
    }

    /* 
        @Params event == channel, ban, kick, ecctt... 
        
        @Params data  == any data in a {} block. example:  client.eventEmbed('MakeChannel', {channel: message.channel});
    */
    client.eventEmbed = (event, data) => {
        let emb = new MessageEmbed()
        if (!event == String) { throw new TypeError("the type is not a string.") }
        switch (event) {
            case "ban": {
                emb.setTitle(" :no_entry: User was banned.");
                emb.setDescription(`**Target Name:** ${data.user.user.username}\n**Target ID:** ${data.user.id}\n**Additional Info:** None.`)
                emb.setFooter(`Triggered at: ${moment().format("YYYY-MM-DD HH:mm")}`);
            }

            case "kick": {
                emb.setTitle(" :no_entry: User was kicked.");
                emb.setDescription(`**Target Name:** ${data.user.user.username}\n**Target ID:** ${data.user.id}\n**Additional Info:** None.`)
                emb.setFooter(`Triggered at: ${moment().format("YYYY-MM-DD HH:mm")}`);
            }
        }

        return emb;
    }

    exports.music = (title, channel, thumbnail, req, length) => {
        let emb = new MessageEmbed()
            .setTitle(channel)
            .setColor(0x00ccff)
            .setThumbnail(thumbnail)
            .setDescription(`🎶 now playing: **${title}**`)
            .setFooter(`requested by: ${req} | ${length}`);

        return emb;
    };




    client.logger.log("Loaded embedHelper (version : 0.0.1) by Raptas & TuxyDev.");
}

