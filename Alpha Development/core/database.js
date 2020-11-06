module.exports = async (client) => {
    client.currentGuild = "771824143321923585";
    client.currentColor = "BLUE";
    client.table = client.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'settings';").get();
    if (!client.table['count(*)']) {
        client.sql.prepare("CREATE TABLE settings (guild TEXT PRIMARY KEY, prefix TEXT, memberRole TEXT, modRole TEXT, adminRole TEXT, moderationLog TEXT, serverLog TEXT, ticketLog TEXT);").run();
        client.sql.pragma("synchronous = 1");
        client.sql.pragma("journal_mode = wal");
    }
    client.getSettings = client.sql.prepare("SELECT * FROM settings WHERE guild = ?");
    client.setSettings = client.sql.prepare("INSERT OR REPLACE INTO settings (guild, prefix, memberRole, modRole, adminRole, moderationLog, serverLog, ticketLog) VALUES (@guild, @prefix, @memberRole, @modRole, @adminRole, @moderationLog, @serverLog, @ticketLog);");
    client.settings = client.getSettings.get(client.currentGuild);
    if (!client.settings) {
        client.settings = {
            guild: client.currentGuild,
            prefix: "-",
            memberRole: "MemberID",
            modRole: "modID",
            adminRole: "adminID",
            moderationLog: "ModerationID",
            serverLog: "serverID",
            ticketLog: "ticketID"
        }
    }

    client.coinTable = client.coins.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' and name = 'coins';").get();
    if (!client.coinTable['count(*)']) {
        client.coins.prepare("CREATE TABLE coins (id TEXT PRIMARY KEY, guild TEXT, user TEXT, points INTEGER);").run();
        client.coins.prepare("CREATE UNIQUE INDEX idx_coins_id ON coins (id);").run();
        client.coins.pragma("synchronous = 1");
        client.coins.pragma("journal_mode = wal");
    }
    client.getCoins = client.coins.prepare("SELECT * FROM coins WHERE guild = ? AND user = ?");
    client.setCoins = client.coins.prepare("INSERT OR REPLACE INTO coins (id, guild, user, points) VALUES (@id, @guild, @user, @points);");

    client.modTable = client.mod.prepare("SELECT count(*) FROM sqlite_master where type='table' and name = 'moderation';").get();
    if (!client.modTable['count(*)']) {
        client.mod.prepare("CREATE TABLE moderation (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, guild TEXT, punishment TEXT, punishedBy TEXT, reason TEXT, date TEXT);").run();
        client.mod.pragma("synchronous = 1");
        client.mod.pragma("journal_mode = wal");
    }
    client.getMod = client.mod.prepare("SELECT * FROM moderation WHERE guild = ? AND user = ?");
    client.setMod = client.mod.prepare("INSERT INTO moderation (user, guild, punishment, punishedBy, reason, date) VALUES (@user, @guild, @punishment, @punishedBy, @reason, @date);");
}