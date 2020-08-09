const {Client, Message} = require('discord.js');
const sql = require('better-sqlite3');

/**
 * Affiche l'uptime du bot (le temps qui s'est écoulé depuis que le bot a été lancé)
 * @param {Client}	client	- Le Client du bot
 * @param {Message}	message	- Le Message envoyé dans un channel
 * @param {Array}	TheArgs	- Les arguments, après la commande
 * @param {sql}		db		- Base de donnée
 */

exports.run = (client, message/*, theArgs, db*/) => {

	console.log('Cmd "uptime" lancé dans ' + message.channel.name);

	//Nombre de secondes totale
	let totalSeconds = (client.uptime / 1000);

	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor(totalSeconds / 3600);

	totalSeconds %= 3600;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);

	message.channel.send(`Le bot a été lancé il y a ${days} jours, ${hours} heures, ${minutes} minutes and ${seconds} secondes`);
};