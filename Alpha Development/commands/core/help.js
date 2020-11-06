const Discord = require("discord.js");
exports.run = (client, message, args, level) => {
    let nArray = []
    let currentCat = "";
    let counter = 0;
    if (!args[0]) {
        let cmds = client.commands.keyArray();
        const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
        sorted.forEach(c => {
            let cat = c.help.category.toProperCase();
            if (currentCat != cat) {
                nArray[counter + 1]++
                currentCat = cat;
            }
            nArray[counter] = nArray[counter] + 1;
        })
        console.log(nArray);
    }
}

exports.conf = {
    aliases: ["h", "halp"],
    permLevel: "User"
};

exports.help = {
    name: "help",
    description: "Displays all the available commands",
    usage: "help [command]"
};
