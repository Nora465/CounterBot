A rajouter à la fin : 
- Un logger (fichier .log pour stocker les evenements important)
- pouvoir taguer le bot pour remplacer le prefix ?

Infos par rapport avec le bot

=> Le Prefix est COMMUN à tous les serveurs (il est modifiable via la cmd "setprefix <newprefix>")

db.prepare('SELECT COUNT(*) FROM sqlite_master WHERE type=\'table\' AND name = \'GuildsSettings\';').get();
=> permet de savoir si la table existe déjà

// Préparation des statements pour récupérer et mettre à jour les paramètres ?
	client.getParams = db.prepare('SELECT * FROM GuildsSettings WHERE GuildID = ?');
	client.setParams = db.prepare('INSERT OR REPLACE INTO GuildsSettings (GuildID, prefix, CountingChanID, LastMessageID) VALUES (@GuildID, @prefix, @CountChanID, @LastMsgID);');

db.prepare('CREATE TABLE IF NOT EXISTS GuildsSettings (GuildID TEXT PRIMARY KEY UNIQUE NOT NULL, prefix TEXT NOT NULL DEFAULT \'\', CountingChanID TEXT NOT NULL , LastMessageID TEXT NOT NULL);').run();

On peut utiliser message.guild.me.client pour récupérer le client du bot (dans message.js), ça évite de passer en argument qqch d'inutile
(message.guild.me.client === client) ==> TRUE
TODO VOIR pour supprimer le "client.config = require('botconfig')" etc... (ça permettrait d'enlever le client des arguments)