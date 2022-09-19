const {Client, Message} = require('discord.js');
const {prototype} = require('better-sqlite3');

/**
 * Permet de recharger le fichier *.js d'une commande, sans redemarrer le bot
 * @param {Client}		client  - Le client du bot
 * @param {Message}		message - Le message qui a été écrit dans un channel
 * @param {Array}		theArgs - Arguments inclus après la commande
 * @param {prototype}	db      - base de donnée
 */

exports.run = (client, message, theArgs/*, db*/) => {

	if (!theArgs || theArgs.length < 1) return message.reply('Must provide a command name to reload.').catch(console.error);
	const commandName = theArgs[0];

	// Check if the command exists and is valid
	if (!client.commands.has(commandName)) {
		//message.react('⁉️');
		message.react('❌').catch(console.error);
		console.log(`CMD_RELOAD_ERR : "${commandName}" does not exist`);
		return;
	}

	// the path is relative to the *current folder*, so just ./filename.js
	delete require.cache[require.resolve(`./${commandName}.js`)];

	// We also need to delete and reload the command from the client.commands Enmap
	client.commands.delete(commandName);
	const props = require(`./${commandName}.js`);
	client.commands.set(commandName, props);

	console.log(`CMD_RELOAD_OK : "${commandName}"`);
	message.react('✅').catch(console.error);
};