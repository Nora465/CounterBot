const {MessageEmbed} = require('discord.js');
/**
 *
 * @param {import('discord.js').Message} message
 * @param  {Lang} lang
 * @return {Promise<void>}
 */
module.exports = async (message) => {
    const j = Math.floor((process.uptime() % 31536000) / 86400);
    const h = Math.floor((process.uptime() % 86400) / 3600);
    const m = Math.floor((process.uptime() % 3600) / 60);
    const s = Math.round(process.uptime() % 60);
    const embedComposer = new MessageEmbed();
    
    embedComposer.setTitle('Bot Stats');
    embedComposer.addField('nombre de serveur', message.client.guilds.cache.size, true);
    embedComposer.addField('nombre d\'utilisateur', message.client.users.cache.size, true);
    embedComposer.addField('ping', message.client.ws.ping + ' ms', true);
    embedComposer.addField('ram utiliser', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB', true);
    embedComposer.addField('uptime', `${j}j ${h}h ${m}m ${s}s`, true);
    embedComposer.setFooter('demarer le');
    embedComposer.setTimestamp(message.client.readyTimestamp);
    await message.channel.send(embedComposer);
};