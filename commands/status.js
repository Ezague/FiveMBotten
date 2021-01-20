const Discord = require("discord.js");
const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'status',
    description: 'Template!',
    async execute(client, message, args, con) {
        axios.get(`https://servers-frontend.fivem.net/api/servers/single/${config.cfx}`)
        .then(function (response) {
            let online = response['data']['Data']['clients']
            let max = response['data']['Data']['sv_maxclients']
            let hostname = response['data']['Data']['hostname']
            let statusEmbed = new Discord.MessageEmbed()
            .setColor("#d42c20")
            .setDescription(`**Server Navn:** ${hostname}\n**CFX Ip:** ${config.cfx}\n**Online:** ${online}/${max}`)
            if (response['data']['Data']['vars']['Uptime']) {
                var uptime = response['data']['Data']['vars']['Uptime']
                statusEmbed.addField("**Uptime:**", `${uptime}`)
            } if (response['data']['Data']['vars']['Discord']) {
                var discord = response['data']['Data']['vars']['Discord']
            statusEmbed.addField("**Discord:**", `${discord}`)
            } if (response['data']['Data']['vars']['Discord']) {
                var hjemmeside = response['data']['Data']['vars']['Hjemmeside']
                statusEmbed.addField("**Hjemmeside:**", `${hjemmeside}`)
            } if (response['data']['Data']['vars']['Forum']) {
                var hjemmeside = response['data']['Data']['vars']['Forum']
                statusEmbed.addField("**Hjemmeside:**", `${hjemmeside}`)
            } if (response['data']['Data']['vars']['onesync_enabled']) {
                var onesync = response['data']['Data']['vars']['onesync_enabled']
                statusEmbed.addField("**Onesync:**", `${onesync}`)
            }
    
            message.channel.send(statusEmbed);
        });
    }
};