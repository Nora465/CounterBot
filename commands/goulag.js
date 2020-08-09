//
//

const {Client, Message} = require('discord.js');
const {prototype} = require('better-sqlite3');

/**
 * Permet d'envoyer et de ramener des gens au goulag
 * @param {Client}		client	- Le Client du bot
 * @param {Message}		message	- Le Message envoyé dans un channel
 * @param {Array}		theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */

exports.run = (client, message, theArgs/*, db*/) => {
	//Vérif des permissions
	if (message.author.id !== client.config.ownerID) {
		return message.channel.send('t\'as cru la vie c un biscuit \naller, au goulag pour la peine \n(non, jrigole, g la flm pour l\'instant');
	}

	//membre à goulaguer OU dégoulaguer
	let GoulagGuildMember;

	//Si on a une mention dans le message
	if (message.mentions.members.size === 1) {
		GoulagGuildMember = message.mentions.members.first();
	//Si pas de mention, on vérifie si les arguments correspondent à un utilisateur
	}
	else {
		GoulagGuildMember = message.guild.members.cache.find(User => User.displayName.toLowerCase().includes(theArgs.join(' ').toLowerCase()));
		if (!GoulagGuildMember) return message.react('❌');
	}

	//ID du rôle pour le goulag // Est-ce que l'user a déjà le role GOULAG ?
	const RoleID = '660193387936219166';
	const HasGoulagRole = GoulagGuildMember.roles.cache.get(RoleID);

	//Remove the Role
	if (HasGoulagRole) {
		GoulagGuildMember.roles.remove(RoleID, 'punition annulée').catch(console.error);
		message.channel.send(`${GoulagGuildMember.displayName} est revenu du goulag (Sad UwU) !`);
		console.log(`${GoulagGuildMember.displayName} est revenu du goulag !`);
	}
	//Give the Role
	else {
		GoulagGuildMember.roles.add(RoleID, 'pas gentil d\'etre méchant').catch(console.error);
		message.channel.send(`${GoulagGuildMember.displayName} est parti au goulag (UwU) !`);
		console.log(`${GoulagGuildMember.displayName} est parti au goulag !`);
	}
};