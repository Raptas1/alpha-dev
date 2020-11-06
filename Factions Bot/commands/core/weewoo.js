
exports.run = async (client, message, args, level) => {
    /*
    let weewooActive = client.perks.get("weewooCheck");

    if (weewooActive == true) {
        client.weewoo.filter((wewooOBJ) => {
            if (wewooOBJ.author === message.author.id) {
                clearInterval(wewooOBJ.weewooId)
                message.channel.send(`${message.author} has disabled weewoo`)
                return true
            }
        });
        client.perks.set("weewooCheck", false);
    } else {
        message.channel.send(`${message.author} has enabled weewoo`);
        let weewoo = setInterval(function () {
            message.channel.send("WEEWOO WE ARE GETTING RAIDED! @everyone");
        }, 3000)
        client.weewoo.push({ author: message.author.id, weewooId: weewoo })
        client.perks.set("weewooCheck", true);
        }
        */


    client.weewoo = !client.weewoo
    if (client.weewoo) {
        message.channel.send(`\`${message.author.tag} has enabled weewoo\``)
    } else {
        message.channel.send(`\`${message.author.tag} has disabled weewoo\``)
    }

 
}


exports.conf = {
    enabled: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    description: "WE GETTING RAIDED!!!",
    usage: "weewoo"
};

