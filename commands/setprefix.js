const {Client, Message} = require('discord.js');
const {prototype} = require('better-sqlite3');

const fs = require('fs');
//TODO après avoir gérer la fonctionnalité "un prefix par guild" (stocké dans la db), suppression de cette commande
/**
 * Permet la configuration du prefix global (plus tard, faire guild-related)
 * @param {Client}		client	- Le Client du bot
 * @param {Message}		message	- Le Message envoyé dans un channel
 * @param {Array}		theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */

exports.run = (client, message, theArgs/*, db*/) => {
	//Vérifications
	if (message.author.id !== client.config.ownerID) 	return message.channel.send('ESPECE DE ! \n(seul l\'owner peut faire cela)');
	if (theArgs.length !== 1) 							return message.channel.send('Cette commande n\'a qu\'__UN SEUL__ argument, sans espace !');
	if (theArgs[0].length !== 1) 						return message.channel.send('le prefix doit faire __UN SEUL__ caractère !');
	if (theArgs[0] === client.config.prefix) 			return message.channel.send('Le nouveau prefix doit __etre différent__ de l\'ancien !');
	if (theArgs[0].search(/[^a-z0-9]/))					return message.channel.send('Le prefix doit être un caractère spéciale');

	//Chargement du nouveau préfix
	client.config.prefix = theArgs[0];
	//Conversion du JSON-Obj en txt
	const newConfig = JSON.stringify(client.config);

	//écriture du nouveau prefix dans le fichier de config
	fs.writeFile('./BotConfig.json', newConfig, (err) => {
		if(err) return console.log(err);

		message.channel.send(`✅ Prefix modifié avec succès ! \nNouveau prefix => ${theArgs[0]}`);
		client.user.setActivity(`Le Goulag (prefix => ${client.config.prefix})`, { type: 'WATCHING'});
	});
};