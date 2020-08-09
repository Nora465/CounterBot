/*
cette commande pourra être lancé pour définir :
- le channel de comptage
- le channel de vérification des erreurs (avec un channel par défaut, sur mon serveur STB)
- Renseigner l'ID du premier message de comptage (ça veut dire que le cmd "!start" ne peut etre lancé qu'après "config")
- Qui peut executer des actions "ADMIN" ???????
*/

const {Client, Message} = require('discord.js');
const {prototype} = require('better-sqlite3');

/**
 * Permet la configuration d'une guild (Prefix (plus tard), Channel de comptage, et dernier message valide)
 * @param {Client}	    client	- Le Client du bot
 * @param {Message}	    message	- Le Message envoyé dans un channel
 * @param {Array}	    theArgs	- Les arguments, après la commande
 * @param {prototype}	db		- Base de donnée
 */

exports.run = (client, message, theArgs, db) => {
    //Si 2 arguments sont présents, l'user veut modifier un seul paramètre
    if (theArgs.length !== 2 && theArgs.length !== 0) return message.channel.send('Cette commande accepte 0 (modifie tous les paramètres) ou 2 argument (modifie juste un paramètre)');

    message.channel.send('déso, commande pas encore terminé (fo que je finisse l\'architecture de la db');
    //return;

    //Création de la table "GuildsParameters", si elle n'existe pas
    db.prepare('CREATE TABLE IF NOT EXISTS GuildsSettings (GuildID TEXT PRIMARY KEY UNIQUE NOT NULL, prefix TEXT NOT NULL DEFAULT \'\', CountingChanID TEXT NOT NULL , LastMessageID TEXT NOT NULL );').run();

    if (theArgs.length) {
        if (theArgs[0] !== 'prefix' && theArgs[0] !== 'channel') return message.channel.send('L\'argument doit être "prefix" ou "channel"');
        //demande de modification d'un seul paramètre
        this.ModifyOneParameters(theArgs);
    }
    else {
        this.ModifyEveryParameters();
    }

    //on créé la table "guild_NAMEGUILD"
    //TODO Query à faire !
};

this.ModifyOneParameters = ([param, value]) => {

    console.log(param + '   ' + value);
    /* TODO A VERIFIER / CONTINUER
    const query = db.prepare('UPDATE GuildSettings SET ? = ? WHERE GuildID = ?');

    return query.run(setting, value, guildID);
    */

};

this.ModifyEveryParameters = () => {

};