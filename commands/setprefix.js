/*
cette commande pourra être lancé pour :
- Définir le préfix GLOBAL (commun à tout les serveurs)
*/

const fs = require('fs');

exports.run = (client, message, TheArgs) => {

	//Vérifications
	if (message.author.id !== client.config.ownerID) 	return message.channel.send('ESPECE DE ! \n(seul l\'owner peut faire cela)');
	if (TheArgs.length !== 1) 							return message.channel.send('Cette commande n\'a qu\'__UN SEUL__ argument, sans espace !');
	if (TheArgs[0].length !== 1) 						return message.channel.send('le prefix doit faire __UN SEUL__ caractère !');
	if (TheArgs[0] === client.config.prefix) 			return message.channel.send('Le nouveau prefix doit __etre différent__ de l\'ancien !');
	if (TheArgs[0].search(/[^a-z0-9]/))					return message.channel.send('Le prefix doit être un caractère spéciale');

	//Chargement du nouveau préfix
	client.config.prefix = TheArgs[0];
	//Conversion du JSON-Obj en txt
	const newConfig = JSON.stringify(client.config);

	//écriture du nouveau prefix dans le fichier de config
	fs.writeFile('./BotConfig.json', newConfig, (err) => {
		if(err) return console.log(err);

		message.channel.send(`✅ Prefix modifié avec succès ! \nNouveau prefix => ${TheArgs[0]}`);
		client.user.setActivity(`Le Goulag (prefix => ${client.config.prefix})`, { type: 'WATCHING'});
	});
};