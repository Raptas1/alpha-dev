let Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete();
    let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor(client.currentColor)
        .setTimestamp()
        .setDescription("Thank you for making a ticket in Alpha Development!\nPlease choose a category:\n1. General\n2. Purchase Issues\n3. Bot Issues")

    try {
        await message.author.send(embed);
    } catch (err) {
        return message.reply("oops! It looks like I cannot DM you, make sure to open your dms.").then(msg => {
            msg.delete({ timeout: 3000 })
        });
    }
    /*
    message.channel.send("Generating Ticket...").then(msg => {
        msg.delete({ timeout: 5000 });
    });
    client.ticket.inc('ticketNum');
    let ticketParent = client.channels.cache.get('734090871288365069')
    let ticketChannel = message.guild.channels.create(`ticket-${client.ticket.get('ticketNum')}`, { type: 'text', parent: ticketParent }).then(c => {
        c.createOverwrite(message.author, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        })
        client.ticketTracker.set(c.id, message.author.id);
        c.send(`${message.author}, Thank you for making a ticket in Kathi's Graphic discord! Please fill out the following and a member of our crew will help you as soon as they can!\`\`\`\nName:\nRequest:\nDetails:\n\`\`\``);
    })

    */


}

exports.help = {
    description: "Make a new ticket",
    usage: "new"
}

exports.conf = {
    aliases: ["ticket"],
    permLevel: "User"
}