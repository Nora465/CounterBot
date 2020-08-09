const SQLite = require('better-sqlite3');
const db = new SQLite('./db/DB.db');

const {Client} = require('discord.js');

/** Evenement "ready"
 * Se déclenche lorsque le Bot est connecté, et prêt
 * @param {Client} client - Le Client du bot
*/

module.exports = (client) => {
    console.log(`BOT CONNECTÉ POUR : ${client.channels.cache.size} channels // ${client.guilds.cache.size} ${(client.guilds.cache.size === 1) ? 'serveur' : 'serveurs'} // ${client.users.cache.filter(mem => !mem.bot).size} users\n`);
	client.user.setActivity(`Le Goulag (prefix => ${client.config.prefix})`, { type: 'WATCHING'});

    //--------- DB SHIT ------------------------------------
    // Vérifie si la table "GuildsSettings" existe
	const CountOfTable = db.prepare('SELECT COUNT(*) FROM sqlite_master WHERE type=\'table\' AND name = \'GuildsSettings\';').get();

	if (!CountOfTable) {

		// Si la table n'existe pas, on la créée (non) et on setup la db correctement
		//db.prepare('CREATE TABLE IF NOT EXISTS GuildsSettings (GuildID TEXT PRIMARY KEY UNIQUE NOT NULL, prefix TEXT NOT NULL DEFAULT \'\', CountingChanID TEXT NOT NULL , LastMessageID TEXT NOT NULL);').run();

		db.pragma('synchronous = 1');
		db.pragma('journal_mode = wal');
	}

	// Préparation des statements pour récupérer et mettre à jour les paramètres
	client.getParams = db.prepare('SELECT * FROM GuildsSettings WHERE GuildID = ?');
	client.setParams = db.prepare('INSERT OR REPLACE INTO GuildsSettings (GuildID, prefix, CountingChanID, LastMessageID) VALUES (@GuildID, @prefix, @CountChanID, @LastMsgID);');
	//--------- END DB -------------------------
};