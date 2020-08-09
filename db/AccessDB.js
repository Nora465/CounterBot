/*
	Utiliser ce document pour accéder à la db (pour éviter d'avoir plusieurs require('better-sqlite3') et de charger la db plusieurs fois)
*/
const SQLite = require('better-sqlite3');
const db = new SQLite('./db/DB.db');

/**
 * Contient les paramètres de la guild
 * @typedef {object} GuildSettings
 * @property {string} GuildID			- L'ID de la guild
 * @property {string} prefix			- Le prefix utilisé sur cette guild
 * @property {string} CountingChanID	- L'ID du channel utilisé pour la comptage
 * @property {string} LastMessageID		- L'ID du dernier message valide, et enregistré dans la db

 * Vérifie que le bot est "actif" sur la guild passée en paramètre
 * @param 	{string} 		GuildIDToTest 	- L'ID de la guild à vérifier
 * @returns {GuildSettings}					- La config de cette guild
 */
/* exports.GetGuildSettings = (GuildIDToTest) => {
	return db.prepare('SELECT * FROM GuildsSettings WHERE GuildID = ?').get(GuildIDToTest);
}; */

/**
 * Modification d'un paramètre de Guild
 * @param {string} setting
 * @param {string} value
 * @param {string} guildID
 */
/* exports.ModifyAGuildSettings = (setting, value, guildID) => {
	const query = db.prepare('UPDATE GuildSettings SET ? = ? WHERE GuildID = ?');

	return query.run(setting, value, guildID);
}; */