const {Client, GuildMember} = require('discord.js');

/** Evenement "guildMemberUpdate"
 * Se déclenche lorsqu'un membre change de rôle, ou de nickname
 * @param {Client} 			client 		- Le Client du bot
 * @param {GuildMember} 	oldMember 	- Le membre, AVANT le changement
 * @param {GuildMember} 	newMember 	- Le membre, APRES le changement
*/

module.exports = (client, oldMember, newMember) => {
	/*//Empêche le changement de nickname
	if (newMember.user.id === '424563119763750912') {
		if (newMember.nickname !== 'Je suis un S, frappez moi') {
			const newNick = newMember.nickname;
			newMember.setNickname('Je suis un S, frappez moi').then(() => {
				newMember.guild.channels.cache.get('616686954095968256').fetch().then((channel) => {
					//channel.send('Chat pas gentil >:(');
					newMember.guild.channels.cache.get('715563589972525159').fetch().then((channelle) => {
						channelle.send('phéno tried to rename in ' + newNick).catch(console.error);
					}).catch(console.error);
				}).catch(console.error);
			}).catch(console.error);
		}
	}*/
	console.log('MODIFICATION D\'UN MEMBER : event guildMemberUpdate');
	console.log(`ancien nom : ${oldMember.displayName} // nouveau nom : ${newMember.displayName}`);
};