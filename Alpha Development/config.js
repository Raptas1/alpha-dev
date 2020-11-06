const config = {
    "ownerID": "344108155455799298",
    "admins": ["206577877536342017"],
    "token": "NzcyODY1Mzg5MzU1OTkxMDgw.X6A4-w.xGZcgA2Eet-apei2AcG1tC4Vzg4",


    permLevels: [

        {
            level: 0,
            name: "User",
            check: () => true
        },
        {
            level: 1,
            Name: "Member",
            check: (message) => {
                try {
                    const memberRole = message.guild.roles.cache.get(message.settings.memberRole);
                    return (memberRole && message.member.roles.cache.has(memberRole.id))
                } catch (e) {
                    return false;
                }
            }
        },
        {
            level: 2,
            name: "Moderator",
            check: (message) => {
                try {
                    const modRole = message.guild.roles.cache.get(message.settings.modRole);
                    return (modRole && message.member.roles.cache.has(modRole.id));
                } catch (e) {
                    return false;
                }
            }
        },
        {
            level: 3,
            name: "Admin",
            check: (message) => {
                try {
                    const adminRole = message.guild.roles.cache.get(message.settings.adminRole);
                    return (adminRole && message.member.roles.cache.has(adminRole.id));
                } catch (e) {
                    return false;
                }
            }

        },

        {
            level: 4,
            name: "Server Owner",
            check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
        },

        {
            level: 9,
            name: "Bot Admin",
            check: (message) => config.admins.includes(message.author.id) === true
        },

        {
            level: 10,
            name: "Bot Owner",
            check: (message) => message.client.config.ownerID === message.author.id
        }
    ]
};

module.exports = config;
