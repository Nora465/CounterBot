/*
cette commande pourra être lancé pour définir :
- le channel de comptage
- le channel de vérification des erreurs (avec un channel par défaut, sur mon serveur STB)
- Renseigner l'ID du premier message de comptage (ça veut dire que le cmd "!start" ne peut etre lancé qu'après "config")
- Qui peut executer des actions "ADMIN" ???????
*/

const {Client, Message, EmbedBuilder} = require('discord.js');
const {prototype} = require('better-sqlite3');

/**
 * Permet la configuration d'une guild (Prefix (plus tard), Channel de comptage, et dernier message valide)
 * @param {Client}	    client	- Le Client du bot
 * @param {Message}	    message	- Le Message envoyé dans un channel
 * @param {Array}	    theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */

exports.run = async (client, message, theArgs, db) => {
	//Si 2 arguments sont présents, l'user veut modifier un seul paramètre
	if (theArgs.length !== 2 && theArgs.length !== 0) return message.channel.send('Cette commande accepte 0 (modifie tous les paramètres) ou 2 argument (modifie juste un paramètre)').catch(console.log);

	//Création de la table "GuildsParameters", si elle n'existe pas
	db.prepare('CREATE TABLE IF NOT EXISTS GuildsSettings (GuildID TEXT PRIMARY KEY UNIQUE NOT NULL, prefix TEXT NOT NULL DEFAULT \'\', CountingChanID TEXT NOT NULL , LastMessageID TEXT NOT NULL );').run();

	let error;
	if (theArgs.length) {
		if (theArgs[0] !== 'prefix' && theArgs[0] !== 'channel') return message.channel.send('L\'argument doit être __prefix__ ou __channel__').catch(console.log);
		//demande de modification d'un seul paramètre
		error = this.ModifyOneParameters(message, theArgs, db);
	}
	else {
		error = await this.ModifyEveryParameters(client, message, theArgs, db);
	}

	//Si erreur, on envoi le message sur discord
	if (error !== '' && typeof error === 'string') return message.channel.send(error).catch(console.log);

	//on créé la table "guild_NAMEGUILD" si pas d'erreur
	/*if (error === '') {
		//const guildName = 'Guild_' + message.guild.name.replace(/ +/g, '_');
		//db.prepare('CREATE TABLE IF NOT EXISTS Guild_' + guildName + '("UserID" TEXT NOT NULL UNIQUE, "Pseudo" TEXT NOT NULL, "NumOfCount" INTEGER NOT NULL, "NumOfErrors"	INTEGER NOT NULL,)').run();
	}*/
	//TODO Query à faire !
};

/**
 * Modifier un seul paramètre (prefix, ou channel de comptage)
 * @param {Message} message - Le Message envoyé dans un channel
 * @param {Number} param 	- Paramètre à modifier
 * @param {Number} value 	- Nouvelle valeur du paramètre
 * @param {prototype} db 	- Base de donnée
 * @returns {String} 		- Signale une erreur
 */
this.ModifyOneParameters = (message, [param, value], db) => {

	//Vérifs : Si le param à changer = channel
	if (param === 'channel') {
		if (message.guild.channels.cache.get(value.toString()) === undefined) return 'Le 2eme argument doit être un __snowflake__ et l\'ID d\'un channel de cette guild !';
		param = 'CountingChanID'; //remplacement de 'channel' par CountingChanID pour la db
	}
	//Vérifs : Si le param à changer = prefix
	else if (param === 'prefix') {
		return 'La modification d\'un __préfixe interne à une guild__ n\'est pas encore programmé ! \nLe préfixe est global, et ne peut etre modifié que par le proprio du bot';
		/*
		const oldPrefix = db.prepare('SELECT prefix FROM GuildsSettings WHERE GuildID = ?').get(message.guild.id);
		//Vérifications
		//TODO mettre en place une recherche d'admin interne à la guild pour la ligne suivante ??????
		//if (message.author.id !== client.config.ownerID) 	return message.channel.send('ESPECE DE ! \n(seul l\'owner peut faire cela)');
		if (value.length !== 1) 		return message.channel.send('le préfixe doit faire __UN SEUL__ caractère !');
		if (value === oldPrefix) 		return message.channel.send('Le nouveau préfixe doit __etre différent__ de l\'ancien !');
		if (value.search(/[^a-z0-9]/))	return message.channel.send('Le préfixe doit être un __caractère spécial__');
		*/
	}

	// FIXME A VERIFIER / CONTINUER
	db.prepare('UPDATE GuildsSettings SET ' + param + ' = ? WHERE GuildID = ?').run(value, message.guild.id);
	return ''; //pas d'erreur
};

/**
 * Modifier tous les paramètres
 * @param {Client} client - Le client du Bot
 * @param {Message} message - Le Message envoyé dans un channel
 * @param {prototype} db - Base de donnée
 */
this.ModifyEveryParameters = async (client, message, db) => {
	const embed = new EmbedBuilder()
	.setTitle('Bienvenue dans la configuration du bot "Comptage"')
	.setDescription('Veuillez entrer le préfixe voulu pour ce serveur [La cmd est pas finie \:()]')
	.setColor(0x00AE86)
	.setThumbnail(client.user.avatarURL({format : 'png'}));

	await message.channel.send({embeds: [embed]}).catch(console.log);//.then(() => {

	//Création d'un collecteur (pour collecter les message écrit après l'affichage du embed)
	const collectorFilter = (m) => m.author === message.author;
	const collector = message.channel.createMessageCollector({collectorFilter, time: 10000});

	collector.on('collect', m => {
		if (m.author.bot) return;
		console.log('collected "' + m.content + '"');
		//TODO virer la modif du prefix et mettre en place les slashs cmd
		const error = '';//this.ModifyOneParameters(message, ['prefix', m.content], db);

		if (error !== '' && typeof error === 'string') {
			message.channel.send(error).catch(console.log);
			collector.resetTimer();
		}
		else {
			embed.setDescription('Veuillez entrer l\'ID du channel de comptage');
			//TODO finir ça
		}
	});

	collector.on('end', collected => {
		console.log(`Collected ${collected.size} items`);
		message.channel.send('Timeout... Try again');
	});
	/*
	const filter = m => m.content.includes('discord');
	const collector = message.channel.createMessageCollector({filter, time: 10000 });

	collector.on('collect', m => {
		console.log(`Collected ${m.content}`);
	});

	collector.on('end', collected => {
		console.log(`Collected ${collected.size} items`);
	});
	*/
	//});


	return '';
/*
	this.ModifyOneParameters(message, , db);
	this.ModifyOneParameters(message, , db);*/
};