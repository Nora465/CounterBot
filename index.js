//pour lancer le bot : "node index.js" dans un terminal

//On vérifie que le version de Node est >= à 12.0.0
//sinon, erreur
if (Number(process.versions.node.split('.')[0]) < 12) throw new Error('Node 12.0.0 or higher is required. Update Node on your system.');


const Discord = require('discord.js');
const fs = require('fs');

const Enmap = require('enmap');

const client = new Discord.Client();

//on attache la config et les commandes au BotClient, pour qu'il soit tjs accessible
client.config = require(__dirname + '/BotConfig.json');
client.commands = new Enmap();

//-------------- CONNECTION A DISCORD ------------------------------------------
client.login(client.config.token);

//Boucle qui lit le contenu du dossier /events/ et lie chaque fichier à son evenement
fs.readdir(__dirname + '/events', (err, files) => {
	if (err) return console.error(err);

	//Boucle de lecture de tous les fichiers du dossier
	files.forEach(file => {
		// Si le fichier est pas *.js, on l'ignore
		if (!file.endsWith('.js')) return;

		// Charge le fichier event
		const event = require(`${__dirname}/events/${file}`);

		// Recupère le nom de l'event via le nom du fichier
		const eventName = file.split('.')[0];

		// super-secret recipe to call events with all their proper arguments *after* the `client` var.
		// without going into too many details, this means each event will be called with the client argument,
		// followed by its "normal" arguments, like message, member, etc etc.
		// This line is awesome by the way. Just sayin'.
		client.on(eventName, event.bind(null, client));

		//Suppression du require('./events/fileEvent.js') (on supprime uniquement le reference, les fonctions restent)
		delete require.cache[require.resolve(`${__dirname}/events/${file}`)];
	});
});

//Boucle qui lit le contenu du dossier /commands/ et stocke chaque commande dans une Enmap
fs.readdir(__dirname + '/commands', (err, files) => {
	if (err) return console.error(err);

	////Boucle de lecture de tous les fichiers du dossier
	files.forEach(file => {
		//Si le fichier n'est pas *.js, on l'ignore
		if (!file.endsWith('.js')) return;

		// Charge le fichier de commande
		const props = require(`${__dirname}/commands/${file}`);

		// Recupère le nom de la commande via le nom du fichier
		const commandName = file.split('.')[0];

		console.log(`Chargement de la commande "${commandName}" ...`);

		// Stocke le tout dans la map "commands"
		client.commands.set(commandName, props);
	});

	/*TODO Au démarrage du bot, vérifier (sur toutes les guilds) que le bot est à jour concernant le dernier comptage
	const query = db.prepare('SELECT LastMessageID, CountingChanID FROM GuildsSettings WHERE GuildID = ?') //on récupèrerait pas plutot toutes les guilds d'un coup ?
	client.guilds.cache.each((guild) => {
		const [lastMessageID, countingChanID] = query.get(guild.id);
		const countingChan = guild.channels.cache.get(countingChanID);
		if (countingChan === undefined) display error!

		countingChan.

	});
	*/
});