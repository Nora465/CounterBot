const {Client, Message, MessageEmbed} = require('discord.js');

/**
 * Permet d'afficher les stats du bot
 * @param {Client}		client	- Le Client du bot
 * @param {Message}		message	- Le Message envoyé dans un channel
 * @param {Array}		theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */

exports.run = async (client, message/*, theArgs, db*/) => {
	const j = Math.floor((process.uptime() % 31536000) / 86400).toString();
	const h = Math.floor((process.uptime() % 86400) / 3600).toString();
	const m = Math.floor((process.uptime() % 3600) / 60).toString();
	const s = Math.round(process.uptime() % 60).toString();

	const embedComposer = new MessageEmbed()
	.setTitle('Bot Stats')
	.addFields(
		{ name: 'Nombre de serveur(s)', value: client.guilds.cache.size.toString(), inline: true},
		{ name: 'Nombre d\'utilisateur(s)', value: client.users.cache.size.toString(), inline: true },
		{ name: 'Ping', value: client.ws.ping.toString() + ' ms', inline: true },
		{ name: 'RAM utilisée', value: ((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)).toString() + 'MB', inline: true },
		{ name: 'Uptime', value: `${j}j ${h}h ${m}m ${s}s`, inline: true },
	)
	.setFooter({text:'Démarrer le '})
	.setTimestamp(client.readyTimestamp);
	await message.channel.send({embeds: [embedComposer]});
};
