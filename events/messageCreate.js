const {Client, Message} = require('discord.js');
const CountHelper = require('../utils/CountingCheck.js');
const db = require('better-sqlite3')(__dirname + '/../db/DB.db');


/** Evenement "message"
 * Se déclenche à chaque fois qu'un message est écrit
 * @param {Client} 		client 	- Le Client du bot
 * @param {Message} 	message - Le Message écrit sur Discord
*/
module.exports = (client, message) => {
	// Ignore les bots & les messages qui commencent pas par le prefix
	if (message.author.bot) return;

	//Ignore si le message vient d'autre chose qu'un channel texte (plus besoin avec les Intents)
	//if (message.channel.type != 'GUILD_TEXT') return message.channel.send('Je n\'accepte pas de message ici, uniquement sur un serveur').catch(console.error);

	/*
	if (message.author.id === 390178998442786816) {
		message.react('816635706733494273').error(console.error);
	} //Si c'est @chat, réagir avec l'emote Emilien
	*/

	// =====ANCHOR Message commence par le prefix ==========
	if (message.content.startsWith(client.config.prefix)) {

		//Définition standard de la commande et des arguments
		const TheArgs = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
		const TheCommand = TheArgs.shift().toLowerCase();

		//Recupère les données de la commande, à partir de la Enmap "client.commands"
		const cmd = client.commands.get(TheCommand);

		// Si la commande n'existe pas, on exit
		if (!cmd) return;

		// run the command
		cmd.run(client, message, TheArgs, db);
	}
	// =====ANCHOR Message lambda ==========
	else {
		//Remplace automatiquement les embeds vidéos de media.discordapp.net par cdn.discordapp.com
		//Les embeds media ne marchent pas
		if (/https:\/\/media.discordapp.net\/attachments\/[0-9]{18,19}\/[0-9]{18,19}\/.*\.(mp4|mpeg|mov|flv|mov)/gm.test(message.content)) {
			const betterLink = message.content.replaceAll('media.discordapp.net', 'cdn.discordapp.com');
			message.reply(`tiens batard, voici un lien fonctionnel : \n ${betterLink}`)
				.then(()=> {
					if (message.deletable) message.delete().catch(console.error);
				})
				.catch(console.error);
		}

		if (message.content.endsWith('quoi')) {
			const res = Math.floor(Math.random() * 2);
			if (res == 0) {
				return message.channel.send('feur \\:)');
			} else {
				return message.channel.send('coubeh \\:)');
			}
		}
		if (message.content.endsWith('non')) {
			return message.channel.send('bril \\:)');
		}
		if (message.content.endsWith('oui')) {
			return message.channel.send('stiti \\:)');
		}
		if (message.content.endsWith('toi')) {
			return message.channel.send('ture \\:)');
		}

		//TODO l'intellisense est baisé, à modifier !
		/**
		 * Contient les paramètres de la guild où a été écrit le message
		 * @typedef {object} guildSettings
		 * @property {string} GuildID			- L'ID de la guild
		 * @property {string} prefix			- Le prefix utilisé sur cette guild
		 * @property {string} CountingChanID	- L'ID du channel utilisé pour la comptage
		 * @property {string} LastMessageID		- L'ID du dernier message valide, et enregistré dans la db
		*/
		const guildSettings = db.prepare('SELECT * FROM GuildsSettings WHERE GuildID = ?').get(message.guild.id);

		//La guild doit exister dans la db
		if (guildSettings === undefined) return;
		//Le channel du message doit être le channel de comptage
		if (message.channel.id !== guildSettings.countingChanID) return;

		//Check : le dernier message du channel n'est pas le même que celui dans la db ?
		//puis vérifier s'il est bon
		//FIXME supprimer cette partie ! (déjà faite sur index.js)
		message.channel.messages.fetch({limit: 1, before: guildSettings.lastMessageID})
			.then(messages => {
				console.log(messages.first());
			});
		console.log('le message est dans le bon channel, pret à vérifier le contenu');

		//--- input : le message a vérifier
		// Partie vérification du message
		//--- output : le message, vérifié
		CountHelper.CheckTheMessage(message, db);

	}
};