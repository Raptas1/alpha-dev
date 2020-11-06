const mineflayer = require("mineflayer");
//let usernames = ["l.xilam01@gmail.com","retroracer510@yahoo.com", "cristianinter.cf@gmail.com", "halo_bat@hotmail.com", "gill.veugelen1@outlook.com", "magnusmeldj@gmail.com","malachi2buck@gmail.com","marielle.moraleja@gmail.com", "valelisset02@gmail.com", "ocinlp2000@gmail.com", "lamlynus@gmail.com", "kolinbird895@gmail.com", "markusroemer.007@gmail.com", "maxtulus@hotmail.com", "peterthetornado@live.com", "jacob58adkins@gmail.com", "honzikmanek@seznam.cz", "lucasursprung@yahoo.de", "leo-my@arcor.de", "trent.nolin@gmail.com", "Simar57.Panesar@gmail.com", "arnux2004@gmail.com", "KuyumchyanM@gmail.com", "stang.andrej@mail.ru", "victormo2002@gmail.com", "adrian.mitrus31@gmail.com", "dajamacanbacon@gmail.com", "theohuet.30@gmail.com", "Christophercarlon2004@gmail.com", "eimantasc11@gmail.com", "vnnouel@gmail.com", "Mikael.rinne33@gmail.com", "rozinszkyn@gmail.com", "invisible.panda15@gmail.com", "pvpwiredpvp@gmail.com", "c91@live.ca", "tdiakakis@gmail.com", "liemsf@gmail.com", "aaron13ni@gmail.com", "tobiashjyrgens@gmail.com", "rubenchuktm65@gmail.com", "rudis200@tvnet.lv", "Mokofuteam@Gmail.com", "stefansmallboss@gmail.com", "alexis.ledieu@icloud.com", "augustinechantf2@gmail.com", "killerzak18@yahoo.com", "Enno.kieper@gmx.de", "samgsung767@gmail.com", "dimi.agius@gmail.com", "oleopoien@hotmail.com", "MonsibdTheAdventurer@gmail.com", "feliipebr@outlook.com", "quickkings1@gmail.com", "Clipperzizo@gmail.com", "eyebrowpete@gmail.com", "Sidcovery@gmail.com", "fileerr2@gmail.com"]
//let passwords = ["King2000","fangs711", "zanetti22", "Xenophon82gqx", "Gillmax23", "mmj12zeus","Kelsey11!!","ZebAlt123", "ZebAlt123", "nico2004", "Clam0705", "drawer28", "Indianajone142", "Ma19tu99", "Hotwheels03", "Foot58ball", "marenka2005", "3012Mama", "medusa12", "Dietrap712", "Panesar1974", "Diduva1211", "Mikael1999", "Murka2006", "pleaseno3", "Adiel2004", "banana14", "Theocraft1", "fordf250", "eimantusikas10", "cl271998", "posari33", "niko13noel", "Haydenf77", "Wired321", "Shark8krill", "td02091969", "Kacpersf03", "Ilovegoogle1212", "Legola58", "joseyeva2002", "robusisis7", "Pakico348", "afganistan12", "050100Al", "I1jityew", "sfp321As", "01Akrkek06!", "osh30243024", "Dimitri0104", "villaveien9", "Raian11209", "abreu4453", "sensiwu12", "ziad2016", "spaTula36912", "eddysajoe1","Tukan102030"]
let usersN = ["zebrymc@gmail.com", "stephanie.simmons1991@gmail.com", "NarcosAlt1@gmail.com", "NarcosAlt2@gmail.com", "NarcosAlt3@gmail.com", "NarcosAlt4@gmail.com", "NarcosAlt5@gmail.com", "NarcosAlt6@gmail.com", "NarcosAlt7@gmail.com", "NarcosAlt8@gmail.com", "marielle.moraleja@gmail.com", "valelisset02@gmail.com", "xekofortnite@gmail.com", "botyanova.lyudmila@mail.ru", "Mikesofli1@icloud.com", "Rnb_bwoi@live.co.uk", "georgekarman@gmail.com", "rhys.zera@gmail.com", "Scottb2k30@gmail.com", "Jakemichaellewis@gmail.com", "leon_denz@web.de", "Iperdragonyellowchannel@gmail.com"]
let passP = ["NarcosOP", "Cassie100", "NarcosOnTop", "NarcosIsDaBest", "7akStinks", "RaptasBetterThan7ak", "ZebryIsGod", "RaptasBad", "Supergay", "PassIsNow1", "ZebAlt123", "ZebAlt123", "LobsterAlt", "N6ny5O6$", "NarcosSlave!!!!8", "NarcosSlave!!!11", "NarcosSlave!!!!12", "NarcosSlave!!14", "NarcosSlave!!!15", "NarcosSlave!17", "NarcosSlave!!18", "NarcosSlave!!!19"]
 
/*
const bot = mineflayer.createBot({
    host: "play.maplecraftmc.net", // optional
    username: "victormo2002@gmail.com", // email and password are required only for
    password: "pleaseno3",          // online-mode=true servers
    version: "1.8"               // false corresponds to auto version detection (that"s the default), put for example "1.8.8" if you need a specific version
})
    bot.on("login", () => {
        console.log(bot.username + "Logged in!");
    });


bot.on("error", err => console.log(err)) */
/*
let bots = mineflayer.createBot({
    host: "play.maplecraftmc.net", // optional
    username: `${usernames[7]}`, // email and password are required only for
    password: `${passwords[7]}`,          // online-mode=true servers
    version: "1.8"
})

bots.on("error", err => console.log(err))
bots.on("login", () => {
    console.log(bots.username + "Logged in!");
    bots.chat("/tpahere Raptas");
});
*/


var alt = 0;
var interval = setInterval(function () {
    if (alt <= usersN.length) {
        let bots = mineflayer.createBot({
            host: "play.dominionmc.net", // optional
            username: `${usersN[alt]}`, // email and password are required only for
            password: `${passP[alt]}`,          // online-mode=true servers
            version: "1.8"
        })
        bots.chatAddPattern(/(.+) -> You » (.+)/, 'whisper', 'starcade chat pattern')
        bots.on("error", err => console.log(usersN[alt] + " could not be logged in"))
        bots.on("login", () => {
            console.log(bots.username + " Logged in!");
            bots.chat("/hades")
            bots.chat("/f altjoin narcos");
        });

        bots.on('whisper', () => {
            bots.chat('/f altjoin narcos')
        })
        alt++;
    }
    else {
        clearInterval(interval);
    }
}, 5000); 
