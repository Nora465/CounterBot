//
//

const {Client, Message, GuildMember, PermissionsBitField} = require('discord.js');
const {prototype} = require('better-sqlite3');

/** ID du rôle pour le goulag */
this.goulagRoleID = '660193387936219166';

/**
 * Permet d'envoyer et de ramener des gens au goulag
 * @param {Client}		client	- Le Client du bot
 * @param {Message}		message	- Le Message envoyé dans un channel
 * @param {Array}		theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */

exports.run = async (client, message, theArgs/*, db*/) => {
	//1 bot a les droits de mettre/enlever des roles
	//2 on recupere le guildMember ciblé par la commande
	//3 on empêche les auto-goulag
	//4 on vérifie si c'est un admin qui demande le toogle => goulaguer si non
	//5 Toogle de la personne goulagué

	//1 Vérification : Le bot a les droits pour mettre/enlever des rôles
	if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
		return message.channel.send('Je n\'ai pas les permissions nécessaires : "MANAGE_ROLES" \nAnnulation...').catch(console.error);
	}

	//2 : On cherche le GuildMember ciblé
	let goulagGuildMember;

	if (message.mentions.members.size === 1) {
		//Soit on a une mention dans le message, donc on recupère ce GuildMember
		goulagGuildMember = message.mentions.members.first();
	}
	else {
		//Soit on en a pas, donc on vérifie si les arguments correspondent à un GuildMember
		const username = theArgs.join(' ').toLowerCase();
		//fetch the member that start by "username", and load the GuildMember()
		goulagGuildMember = await message.guild.members.fetch({query: username}).catch(console.error);

		//Si on n'a pas trouvé de GuildMember dans les arguments de la commande
		if (goulagGuildMember.size != 1) {
			console.error('err CMDgoulag : user not found');
			return message.react('❌').catch(console.error);
		}

		goulagGuildMember = goulagGuildMember.entries().next().value[1];
		//Debug
		console.log(`Goulag Username : ${username}`);
		console.log(goulagGuildMember);
	}

	//3 on empêche les auto-goulag
	if (message.author.id === goulagGuildMember.id) {
		return message.reply('Tu veux aller au goulag ? Bah non \\:)').catch(console.error);
	}

	//4 La commande a été émise par l'owner (sinon on goulag la personne)
	if (message.author.id !== client.config.ownerID) {
		//Non autorisé
		this.ToogleRoleOfUser(message, goulagGuildMember, false);
	}
	else {
		//5 Autorisé : On toogle le role goulag de la personne ciblée
		this.ToogleRoleOfUser(message, goulagGuildMember, true);
	}
};

/**
 * Inverse le rôle Goulag de l'utilisateur selectionné
 * @param {Message} 	message				- Le channel dans lequel écrire le message
 * @param {GuildMember} goulagGuildMember 	- Membre de guild spécifié dans la commande
 * @param {boolean} 	autorizedOwner		- Est-ce que l'initiateur de commande est autorisé ?
 */
this.ToogleRoleOfUser = async (message, goulagGuildMember, autorizedOwner) => {
	//Est-ce que l'user a déjà le role du goulag ?
	const HasGoulagRole = goulagGuildMember.roles.cache.get(this.goulagRoleID);

	//le GuildMember a le rôle
	if (HasGoulagRole) {
		if (autorizedOwner) {
			//Remove the role
			goulagGuildMember.roles.remove(this.goulagRoleID, 'punition annulée').then(()=> {
				message.channel.send(`${goulagGuildMember.displayName} est revenu du goulag (Sad UwU) !`).catch(console.error);
				console.log(`${goulagGuildMember.displayName} est revenu du goulag !`);
			}).catch(console.error);
		}
		else {
			return message.reply('T\'as cru ?').catch(console.error);
		}
	}
	//Le guildMember n'a pas le rôle ET c'est l'owner qui a fait la commande
	else if (autorizedOwner) {
			goulagGuildMember.roles.add(this.goulagRoleID, 'pas gentil d\'etre méchant').then(() =>{
				message.channel.send(`${goulagGuildMember.displayName} est parti au goulag (UwU) !`).catch(console.error);
				console.log(`${goulagGuildMember.displayName} => GOULAG (par ${message.member.displayName})`);
			}).catch(console.error);
	}
	//Le guildMember n'a pas le rôle ET ce n'est pas l'owner qui a fait la commande
	else {
		return message.member.roles.add(this.goulagRoleID, 'a essayer de goulag qqun sans les perms').then(() => {
			//message.channel.send(`${message.member.displayName} a essayé d'envoyer ${goulagGuildMember} au goulag, mais c'est lui qui s'y retrouve (UwU) !`).catch(console.error);
			message.reply('T\'as cru la vie c\'est un biscuit ? Au goulag pour la peine ').catch(console.error);
			console.log(`${message.member.displayName} => GOULAG (a essayé de goulag ${goulagGuildMember.displayName} sans les perms)`);
		}).catch(console.error);
	}
};