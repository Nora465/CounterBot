const {Client} = require('discord.js');

/** Evenement "ready" :
 * Se déclenche lorsque le Bot est connecté, et prêt
 * @param {Client} client - Le Client du bot
*/

module.exports = (client) => {
    console.log(`BOT CONNECTÉ POUR : ${client.channels.cache.size.toString()} channels // ${client.guilds.cache.size.toString()} ${(client.guilds.cache.size === 1) ? 'serveur' : 'serveurs'} // ${client.users.cache.filter(mem => !mem.bot).size.toString()} users\n`);
	client.user.setActivity(`Le Goulag (prefix => ${client.config.prefix})`, { type: 'WATCHING'});
};