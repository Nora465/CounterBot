//Liens Utiles :
//https://jsonformatter.org/
//https://regex101.com/
/*
									TODO-LIST
										- Mettre les commentaires correctes (/** *\) sur toutes les fonctions, pour lisibilité

*/

//Collection is temporary (used for debug)
const {Client, Message, Collection} = require('discord.js');
const sql = require('better-sqlite3');

const fs = require('fs');

/**
 * Permet la configuration d'une guild (Prefix (plus tard), Channel de comptage, et dernier message valide)
 * @param {Client}	client	- Le Client du bot
 * @param {Message}	message	- Le Message envoyé dans un channel
 * @param {Array}	TheArgs	- Les arguments, après la commande
 * @param {sql}		db		- Base de donnée
 */

exports.run = (client, message, TheArgs/*, db*/) => {

	console.log('Cmd "start" lancé dans ' + message.channel.name);

	//Si le message a plus d'un argument, on annule
	if (TheArgs.length !== 1) {
		message.channel.reply('la con de tes morts : c\'est un seul argument après la fonction !');
		return 'error: Args>1';
	}
	const IDFirstMsg = TheArgs[0];

    console.log('cache avant fetch : ' + message.channel.messages.cache.size);

	//Récupération de tout les messages du channel (où le cmd a été écrite)
	message.channel.messages.fetch({limit: 99, after: IDFirstMsg}) //{limit: 39, after: IDFirstMsg}
	.then(async messages => {

		//Set : On met le premier message à la fin de la collection (de la forme {snowflake, message})
		const FirstMessage = await message.channel.messages.fetch(IDFirstMsg);
        messages.set(IDFirstMsg, FirstMessage);

		//Mise en forme des messages (Filtrage & Arrangement)
		messages = this.MiseEnFormeMessages(client, messages);

		//console.debug('------ Taille de la collection récupérée (après tri) : ' + messages.size + ' ------');

		//Entrée des messages valides dans le fichier JSON
		messages = this.VerifComptage(client, messages, 0);

		//boucle pour écrire tout les messages
		/*messages.each(msg => {
			console.debug(msg.createdAt + ' ===> ' + msg.content);
		});*/

		//supprime le message de l'auteur (+ vérifie s'il peut le delete)
		if (message.deletable) message.delete();
		else console.log('Je n\'arrive pas à supprimer le message, vérifier les perms');

		console.debug('cache après fetch : ' + message.channel.messages.cache.size);
	})
	.catch(console.error);


	//TODO : Si c'est Fabou qui écrit un nombre, mettre la réaction :FabouLove: :)
	//TODO : Si Noé met son gif avec les flammes, mettre le <a:PanGFire:486353643080122378>
};

//----------------------------------------------------------------------------------------------------------------------
//Met en forme <Collection> messages pour :
//- enlever les commandes précédentes, et les messages des bots
//- Mettre les messages dans l'ordre d'écriture
this.MiseEnFormeMessages = function(client, messages) {

	const debut = new Collection();
	messages.each(m => {
		debut.set(m.id, m.content);
	});

	//On enlève tous les messages qui :
	//- Commence par : le préfix OU http(s):// OU www.
	//- Est écrit par un bot
	//- Qui contient un fichier/img...etc en pièce jointe
	messages = messages.filter(mess => {
		return ( //msg qu'on garde
			!mess.content.startsWith(client.config.prefix) &&
			!mess.author.bot &&
			mess.content.search(/(https?)|www./) && //Démarre avec http://, https://, ou www.
			mess.attachments.size === 0 &&
			//enlever cette ligne après avoir fais la conversion 'vingt trois' en '23'
			mess.content.search(/[0-9]+/) !== -1
		);
	});

	//tri des messages par timestamp (donc transforme 54321 en 12345)
	messages.sort((msgA, msgB) => msgA.createdTimestamp - msgB.createdTimestamp);

	//Suppression des messages inutiles
	messages.each(m => {

		//suppression de la partie 'citation' d'un message -- str.replace() remplace le regex par ''
		m.content = m.content.replace(/> .+\n/g, '');

		//on supprime les mentions
		m.content = m.content.replace(/<(a?:[a-z]+:|#|@&?!?)[0-9]+>/ig, '');

		//Suppression des espaces au début et à la fin
		m.content = m.content.trim();

		//Suppression du message, s'il est vide ou sans nombre
		if (m.content.search(/[0-9]+/) === -1 || !m.content) {
			messages.delete(m.id);
			return;
		}

		//Supprime les espaces
		m.content = m.content.replace(/ /g, '');

		//Recherche un msg avec chiffres et lettres (on veut isoler le nombre uniquement)
		// regex : ^ = Inversion
		if ((m.content.search(/[^0-9]+/) !== -1)) {

			const InfoForLog = 'NON FULL-CHIFFRE (isolation) : ' + m.content;
			m.content = m.content.match(/[0-9]+/g)[0]; //va isoler la première suite de chiffres présente dans la chaine
			console.log(InfoForLog + ' ==> ' + m.content);
		}

		//Convertion Binaire -> Décimal
		if (m.content.search(/\b[01]+\b/) !== -1) {
			m.content = String(parseInt(m.content, 2));
		}

		/*------------------------------------------------------------------------
		//TODO (fin du projet) : Faire la fct de conversion 'vingt-trois' en '23'
		//et revoir le code pour inclure cette possibilité
		//Si message sans chiffre (peut etre : une nombre en lettres // du blabla)
		if (m.content.search(/\d/) === -1) {

			////////////// fct de conversion 'vingt-trois' en '23' //////////////
			//const ResConvert = this.ConvertStringNumberToNumber(m);
			//console.log(ResConvert);

			//Cas : Message Inutile, SUPPRESSION
			if (ResConvert === undefined) {
				messages.delete(m.id);
			}
			else {
				m = ResConvert;
			}
		}*/
	});

	const fin = new Collection;
	messages.each(m => {
		fin.set(m.id, m.content);
	});

	console.log('début puis fin');
	console.log(debut);
	console.log(fin);

	const jsonData1 = JSON.stringify(debut);
	const jsonData2 = JSON.stringify(fin);

	//écriture fichier
	fs.writeFile('./dabdabdab/debut.json', jsonData1, function(err) {
		if(err) return console.error(err);
		console.log('DEBUT WRITED CORRECTLY');
	});

	fs.writeFile('./dabdabdab/fin.json', jsonData2, function(err) {
		if(err) return console.error(err);
		console.log('FIN WRITED CORRECTLY');
	});
	return messages;
};

//---------------------------------------------------------
//Demande à l'admin si le bot ne sait pas quoi faire
//client : bot discord
//m = message à vérifier
//
//
this.askIfError = function(client, m) {
	//Recupération du channel sur le serveur STB
	/*client.channels.fetch('722131925850128434') //ID du channel STB
	.then(channel => {
		const embed = new MessageEmbed()
			.setTitle(`Erreur détectée sur la CMD start de la guild ${m.guild.name} !`)
			.setDescription(`[Message en question](${m.url}) => ${m.author} : ${m.content}`)
			.setColor(3447003);

		channel.send(embed).then((botMsg) => {
			botMsg.react('❌');
			botMsg.react('✅');
			//comment faire pour attendre un evenement particulier (la réaction à ce message) avant de continuer ce code ??
		});
	})
	.catch(console.error);*/
};

//----------------------------------------------------------------------------------------------------------------------
//vérifie les conditions pour le comptage
//@Arg      : <collection> messages, triés, dans l'ordre (1,2,3,4,5) ///
//@return   : <Bool> erreur dans le comptage ? /// <string> Erreur
this.VerifComptage = function(client, messages, dernierComptage) {
	const dab = {
		table: [],
	};
	//https://prograide.com/pregunta/15820/ecrire--ajouter-des-donnees-dans-un-fichier-json-en-utilisant-nodejs

	//boucle de vérification des messages
	messages.each(msg => {
		if (msg.content == dernierComptage + 1) { //msg.content=String //derniercomptage=INT => donc pas '===' pour comparer
			dab.table.push({id: msg.author.username, data: msg.content});
		}
		else {
			//console.log('FS : ERROR : est-ce que ' + msg.content + ' = ' + dernierComptage + '+1 ??');

			//DEBUG test pour la nouvelle fonction
			this.askIfError(client, msg);

			//msg.channel.send('bla');
		}

		dernierComptage++;
	});
	//console.log(dab.table);

	const jsonData = JSON.stringify(dab);

	//écriture fichier
	fs.writeFile('./test.json', jsonData, function(err) {
		if(err) return console.error(err);
		console.log('FILE WRITED CORRECTLY');
	});
};

/*
//----------------------------------------------------------------------------------------------------------------------
//Converti un nombre en lettre (quatre-vingt) en nombre (80)
START_FCTS.ConvertStringNumberToNumber = function(message) {
	const chiffres = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
	const dizaines = ['dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
	let returnTab;

	//recupère le tableau à partir du message : ['vingt', 'quatre']
	const arr = message.content.split(/ +/); //Regex : cherche un espace pour séparer les mots

	//si le premier mot est "cent" => on met un 1 sur la première case
	if (arr[0] === 'cent') returnTab[0] = 1;

	//on boucle dans ce tableau (on commence par vingt, puis quatre)
	for (let i = 0; i < arr.length; i++) {
		//on cherche s'il correspond à un chiffre (0-9)
		let result = chiffres.find(element => element === arr[i]);
		//Si c pas un chiffre, on vérifie les dizaines
		if (result === undefined) {
			result = dizaines.find(element => element === arr[i]);
		}
	}
};
*/