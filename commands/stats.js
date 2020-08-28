const {Message, MessageEmbed} = require('discord.js');

/**
 * Permet d'afficher les stats du bot
 * @param {Client}		client	- Le Client du bot
 * @param {Message}		message	- Le Message envoyé dans un channel
 * @param {Array}		theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */

exports.run = async (client, message/*, theArgs, db*/) => {
    const j = Math.floor((process.uptime() % 31536000) / 86400);
    const h = Math.floor((process.uptime() % 86400) / 3600);
    const m = Math.floor((process.uptime() % 3600) / 60);
    const s = Math.round(process.uptime() % 60);
    const embedComposer = new MessageEmbed();

    embedComposer.setTitle('Bot Stats');
    embedComposer.addField('Nombre de serveur(s)', client.guilds.cache.size, true);
    embedComposer.addField('Nombre d\'utilisateur(s)', client.users.cache.size, true);
    embedComposer.addField('Ping', client.ws.ping + ' ms', true);
    embedComposer.addField('RAM utilisée', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB', true);
    embedComposer.addField('Uptime', `${j}j ${h}h ${m}m ${s}s`, true);
    embedComposer.setFooter('Démarrer le ');
    embedComposer.setTimestamp(client.readyTimestamp);
    await message.channel.send(embedComposer);
};
