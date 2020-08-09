const {Client, GuildMember} = require('discord.js');

/** Evenement "guildMemberUpdate"
 * Se déclenche lorsqu'un membre change de rôle, ou de nickname
 * @param {Client} 			client 		- Le Client du bot
 * @param {GuildMember} 	oldMember 	- Le membre, AVANT le changement
 * @param {GuildMember} 	newMember 	- Le membre, APRES le changement
*/

module.exports = (client, oldMember, newMember) => {
	console.log('MODIFICATION D\'UN MEMBER : event guildMemberUpdate');
	console.log('ancien nom : ' + oldMember.displayName + ' // nouveau nom : ' + newMember.displayName);
};