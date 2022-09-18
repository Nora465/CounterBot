const {Client, Message} = require('discord.js');


/**
 * Permet d'envoyer l'emote "dab" sur le même channel
 * @param {Client}	    client	- Le Client du bot
 * @param {Message}	    message	- Le Message envoyé dans un channel
 */
exports.run = (client, message) => {
	message.channel.send('<:dab:809113588170096670>').catch(console.error);
};