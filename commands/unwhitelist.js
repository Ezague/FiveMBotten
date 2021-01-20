const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'unwhitelist',
    description: 'Unwhitelister en person med et bestemt ID!',
    async execute(client, message, args, con) {
        var id = args[0];

        if(!message.member.roles.cache.find(r => r.name === config.whitelistgroup)) {
            return message.reply("du har ikke tilladelse til at bruge denne kommando.");
        }

        // Run Query
        var query = con.query(
            "UPDATE vrp_users SET whitelisted = ? WHERE id = ?",
            [0, id],
            function (error, result, fields) {
                if (error) throw error;
            }
        );

        message.delete()
    
        let unwhitelistEmbed = new Discord.MessageEmbed()
            .setTitle(`Unwhitelist ID: **${id}**`)
            .setColor("#FF0000")
            .setDescription(`ID ${id} blev unwhitelistet af ${message.author.username}`)
            .setFooter("Lavet af Ezague");
    
            let logchannel = message.client.guilds.cache.get(message.guild.id).channels.cache.get(config.logchannel)
            if (!logchannel)
                return message.channel.send("Kunne ikke finde log kanalen...");
    
        //message.guild.member(bUser).ban(kReason);
        logchannel.send(unwhitelistEmbed);
    
        return;
    },
};