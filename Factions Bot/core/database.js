  module.exports = async (client) => {
    client.currentGuild = "762132262728105994"
    client.table = client.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'factions';").get();
    if (!client.table['count(*)']) {
        client.sql.prepare("CREATE TABLE factions (guild TEXT PRIMARY KEY, username TEXT, server TEXT, prefix TEXT, memberRole TEXT, modRole TEXT, adminRole TEXT, weewooChannel TEXT, serverchatChannel TEXT, logsChannel TEXT, wallsChannel TEXT, buffersChannel TEXT);").run();
        //client.sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        client.sql.pragma("synchronous = 1");
        client.sql.pragma("journal_mode = wal");
    }
    client.getSettings = client.sql.prepare("SELECT * FROM factions WHERE guild = ?");
    client.setSettings = client.sql.prepare("INSERT OR REPLACE INTO factions (guild, username, server, prefix, memberRole, modRole, adminRole, weewooChannel, serverchatChannel, logsChannel, wallsChannel, buffersChannel) VALUES (@guild, @username, @server, @prefix, @memberRole, @modRole, @adminRole, @weewooChannel, @serverchatChannel, @logsChannel, @wallsChannel, @buffersChannel);");
    client.settings = client.getSettings.get(client.currentGuild);
    if (!client.settings) {
        client.settings = {
            guild: client.currentGuild,
            username: "username",
            server: "pvp.serverip.net",
            prefix: "-",
            memberRole: "0123456790123456789",
            modRole: "0123456790123456789",
            adminRole: "0123456790123456789",
            weewooChannel: "weewoo channel id",
            serverchatChannel: "server-chat channel id",
            logsChannel: "logs channel id",
            wallsChannel: "walls channel id",
            buffersChannel: "buffer channel id"
        }
    }

    client.db = client.wSql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' and name ='whitelist';").get();
    if (!client.db['count(*)']) {
        client.wSql.prepare("CREATE TABLE whitelist (guild TEXT, username TEXT, uuid TEXT);").run();
        client.wSql.pragma("synchronous = 1");
        client.wSql.pragma("journal_mode = wal");
    }
    client.getWhitelist = client.wSql.prepare("SELECT * FROM whitelist WHERE guild = ?");
    client.setWhitelist = client.wSql.prepare("INSERT INTO whitelist (guild, username, uuid) VALUES (@guild, @username, @uuid);");
    client.whitelists = client.getWhitelist.get(client.currentGuild);
    if (!client.whitelists) {
        client.whitelists = {
            guild: client.currentGuild,
            username: "default",
            uuid: "default"
        }
    }
}