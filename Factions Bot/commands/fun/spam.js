
exports.run = async (client, message, args, level) => {
    let user = message.mentions.users.first();
    var interval = setInterval(function () {
        message.channel.send(`hi ${user}`);

    }, 1000); 

};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Admin"
};

exports.help = {
    description: "spam a user.",
    usage: "spam"
};

