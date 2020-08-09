const {Client, Message} = require('discord.js');
/**
 *
 * @param {Client}  client  - Le client du bot
 * @param {Message} message - Le message qui a été écrit dans un channel
 */
exports.run = (client, message) => {
    message.channel.send(`Pong ! Latence : ${Math.round(client.ws.ping)}ms`);
};
