const {Client, Message} = require('discord.js');
const {prototype} = require('better-sqlite3');

/**
 * Permet la configuration d'une guild (Prefix (plus tard), Channel de comptage, et dernier message valide)
 * @param {Client}  	client	- Le Client du bot
 * @param {Message}	    message	- Le Message envoyé dans un channel
 * @param {Array}	    theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */

exports.run = (client, message/*, theArgs, db*/) => {
	message.channel.send(`Pong ! Latence : ${Math.round(client.ws.ping).toString()}ms`);
};
