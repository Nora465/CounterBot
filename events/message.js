const {Client, Message} = require('discord.js');
const AccessDB = require('../db/AccessDB.js');

/** Evenement "message"
 * Se déclenche à chaque fois qu'un message est écrit
 * @param {Client} 	client 	- Le Client du bot
 * @param {Message} message - Le Message écrit sur Discord
*/

module.exports = (client, message) => {

	// Ignore les bots & les messages qui commencent pas par le prefix
	if (message.author.bot) return;

	//Si c'est une commande
	if (message.content.startsWith(client.config.prefix)) {

		//Définition standard de la commande et des arguments
		const TheArgs = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
		const TheCommand = TheArgs.shift().toLowerCase();

		//Recupère les données de la commande, à partir de la Enmap "client.commands"
		const cmd = client.commands.get(TheCommand);

		// Si la commande n'existe pas, on exit
		if (!cmd) return;

		// run the command
		cmd.run(client, message, TheArgs);
	}
	//Si c'est un message lambda
	else {
		//Recupère la config pour la guild où a été écrit le message
		const GuildSettings = AccessDB.GetGuildSettings(message.guild.id);

		//Vérifie si la guild (et sa config) existe dans la db
		if (GuildSettings === undefined) return;
		//Vérifie si le channel utilisé est un channel de comptage
		if (message.channel.id !== GuildSettings.CountingChanID) return;

		console.log('le message est dans le bon channel, pret à vérifier le contenu');

		//--- input : le message a vérifier
		// Partie vérification du message
		//--- output : le message, vérifié

		

	}

  };