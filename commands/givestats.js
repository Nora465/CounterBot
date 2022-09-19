/*
Cette fonction devra donner les stats actuel de la guild :
- global (!stats global) : les stats du serveur
- User (!stats <user>(ou rien pour soi-meme)) : les stats d'un membre
*/
const {Client, Message, Permissions} = require('discord.js');
const {prototype} = require('better-sqlite3');

/**
 * Permet la configuration du prefix global (plus tard, faire guild-related)
 * @param {Client}		client	- Le Client du bot
 * @param {Message}		message	- Le Message envoyé dans un channel
 * @param {Array}		theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */
exports.run = (client, message, TheArgs, db) => {
	message.reply('cette commande ne marche pas encore');
};
