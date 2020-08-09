Infos par rapport avec le bot

=> Le Prefix est COMMUN à tous les serveurs (il est modifiable via la cmd "setprefix <newprefix>")

=> Event "Ready" : Si la table GuildsSettings n'existe pas, on peut la créer (mais on le fait pas)

db.prepare('SELECT COUNT(*) FROM sqlite_master WHERE type=\'table\' AND name = \'GuildsSettings\';').get();
=> permet de savoir si la table existe déjà

// Préparation des statements pour récupérer et mettre à jour les paramètres
	client.getParams = db.prepare('SELECT * FROM GuildsSettings WHERE GuildID = ?');
	client.setParams = db.prepare('INSERT OR REPLACE INTO GuildsSettings (GuildID, prefix, CountingChanID, LastMessageID) VALUES (@GuildID, @prefix, @CountChanID, @LastMsgID);');

db.prepare('CREATE TABLE IF NOT EXISTS GuildsSettings (GuildID TEXT PRIMARY KEY UNIQUE NOT NULL, prefix TEXT NOT NULL DEFAULT \'\', CountingChanID TEXT NOT NULL , LastMessageID TEXT NOT NULL);').run();