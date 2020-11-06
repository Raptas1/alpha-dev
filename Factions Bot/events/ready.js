
module.exports = async client => {
    console.log(`We are online!`);
    client.user.setActivity(`Currently 23 walls in..`, { type: "PLAYING" });

};
