exports.run = async (client, message, args) => {
    let usernames = ["marielle.moraleja@gmail.com", "valelisset02@gmail.com", "ocinlp2000@gmail.com", "lamlynus@gmail.com", "kolinbird895@gmail.com", "markusroemer.007@gmail.com", "maxtulus@hotmail.com", "peterthetornado@live.com", "jacob58adkins@gmail.com", "honzikmanek@seznam.cz", "lucasursprung@yahoo.de", "leo-my@arcor.de", "trent.nolin@gmail.com", "Simar57.Panesar@gmail.com", "arnux2004@gmail.com", "KuyumchyanM@gmail.com", "stang.andrej@mail.ru", "victormo2002@gmail.com", "adrian.mitrus31@gmail.com", "dajamacanbacon@gmail.com", "theohuet.30@gmail.com", "Christophercarlon2004@gmail.com", "eimantasc11@gmail.com", "vnnouel@gmail.com", "Mikael.rinne33@gmail.com", "rozinszkyn@gmail.com", "invisible.panda15@gmail.com", "pvpwiredpvp@gmail.com", "c91@live.ca", "tdiakakis@gmail.com", "liemsf@gmail.com", "aaron13ni@gmail.com", "tobiashjyrgens@gmail.com", "rubenchuktm65@gmail.com", "rudis200@tvnet.lv", "Mokofuteam@Gmail.com", "stefansmallboss@gmail.com", "alexis.ledieu@icloud.com", "augustinechantf2@gmail.com", "killerzak18@yahoo.com", "Enno.kieper@gmx.de", "samgsung767@gmail.com", "dimi.agius@gmail.com", "oleopoien@hotmail.com", "MonsibdTheAdventurer@gmail.com", "feliipebr@outlook.com", "quickkings1@gmail.com", "Clipperzizo@gmail.com", "eyebrowpete@gmail.com", "retroracer510@yahoo.com", "Sidcovery@gmail.com", "fileerr2@gmail.com"]
    let passwords = ["ZebAlt123", "ZebAlt123", "nico2004", "Clam0705", "drawer28", "Indianajone142", "Ma19tu99", "Hotwheels03", "Foot58ball", "marenka2005", "3012Mama", "medusa12", "Dietrap712", "Panesar1974", "Diduva1211", "Mikael1999", "Murka2006", "pleaseno3", "Adiel2004", "banana14", "Theocraft1", "fordf250", "eimantusikas10", "cl271998", "posari33", "niko13noel", "Haydenf77", "Wired321", "Shark8krill", "td02091969", "Kacpersf03", "Ilovegoogle1212", "Legola58", "joseyeva2002", "robusisis7", "Pakico348", "afganistan12", "050100Al", "I1jityew", "sfp321As", "01Akrkek06!", "osh30243024", "Dimitri0104", "villaveien9", "Raian11209", "abreu4453", "sensiwu12", "ziad2016", "spaTula36912", "fangs711", "eddysajoe1", "Tukan102030"]


    var alt = 0;

    var interval = setInterval(function () {
        if (alt <= usernames.length) {
            message.channel.send(`${usernames[alt]}:${passwords[alt]}`)
            alt++;
        }
        else {
            clearInterval(interval);
        }
    }, 5000); 


}

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Bot Admin"
}

exports.help = {
    description: "lists alts",
    usage: "alts"
}