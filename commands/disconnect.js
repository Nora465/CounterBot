const {Client, Message, Permissions} = require('discord.js');
const {prototype} = require('better-sqlite3');

/**
 * Permet la configuration du prefix global (plus tard, faire guild-related)
 * @param {Client}		client	- Le Client du bot
 * @param {Message}		message	- Le Message envoyé dans un channel
 * @param {Array}		theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */
exports.run = (client, message/*, theArgs, db*/) => {
	if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
		message.channel.send('fermeture des connexions.........').then(() => {
			client.destroy();
		}).catch(console.error);
	}
	else {
		message.channel.send('no').catch(console.error);
	}
};