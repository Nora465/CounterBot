/* Logger pour afficher des informations dans la console
 * Date Création : 16-08//20h57
 *
*/
//const prefix = require('./../botconfig/config.json');


const logger = module.exports = {};

logger.info = (debug_msg) => {
  const date = new date();
  console.log(`${date.toLocaleDateString()} [${date.toLocaleTimeString()}] [INFO] [${debug_msg}]`);
};