/* Toutes les commandes qui donnent des informations sur tout et n'importe quoi
 * Date Création : 15-07//00h56
 *
*/

const getUser = module.exports = {};


getUser.getUser = function(mention, client) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
};