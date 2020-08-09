/*
cette commande pourra être lancé pour définir :
- le channel de comptage
- le channel de vérification des erreurs (avec un channel par défaut, sur mon serveur STB)
- Renseigner l'ID du premier message de comptage (ça veut dire que le cmd "!start" ne peut etre lancé qu'après "config")
- Qui peut executer des actions "ADMIN" ???????
*/

const SQLite = require('better-sqlite3');
const db = new SQLite('./db/DB.db');

exports.run = (client, message, TheArgs) => {
    //Si un argument est présent, l'user veut modifier un seul paramètre
    message.reply('déso, commande pas encore terminé (fo que je finisse l\'architecture de la db');
    //return;

    //si table "GuildsParameters" n'existe pas, on la créé
    db.prepare('CREATE TABLE IF NOT EXISTS GuildsSettings (GuildID TEXT PRIMARY KEY UNIQUE NOT NULL, prefix TEXT NOT NULL DEFAULT \'\', CountingChanID TEXT NOT NULL , LastMessageID TEXT NOT NULL );').run();

    if (TheArgs) {
        //demande de modification d'un seul
        this.ModifySomeParameters(TheArgs);
    }
    else {
        this.ModifyEveryParameters();
    }

    //on créé la table "guild_NAMEGUILD"
};

this.ModifySomeParameters = (ParameterToModify) => {
    console.log(ParameterToModify);
};

/*this.ModifyEveryParameters = () => {

};*/