const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'template',
    description: 'Template!',
    async execute(client, message, args, con) {
        message.channel.send("test");
    },
};