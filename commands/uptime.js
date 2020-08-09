//Liens Utiles :

/**
 * Affiche l'uptime du bot (le temps qui s'est écoulé depuis que le bot a été lancé)
 * @param {Discord.client} client - le client du bot
 * @param {Discord.Message} message - Le message qui a déclenché la commande
*/
//----------------------------------------------------------------------------------------------------------------------
exports.run = (client, message) => {

	console.log('Cmd "uptime" lancé dans ' + message.channel.name);

	//Nombre de secondes totale
	let totalSeconds = (client.uptime / 1000);

	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor(totalSeconds / 3600);

	totalSeconds %= 3600;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);

	message.channel.send(`Le bot a été lancé il y a ${days} jours, ${hours} heures, ${minutes} minutes and ${seconds} secondes`);
};