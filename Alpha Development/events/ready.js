
module.exports = async client => {
    console.log(`We are online!`);
    client.user.setActivity(`Managing the server...`, { type: "PLAYING" });

};
