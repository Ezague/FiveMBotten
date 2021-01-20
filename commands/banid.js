const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'banid',
    description: 'Banner en person med et bestemt ID',
    async execute(client, message, args, con) {
        var id = args[0];
        var reason = args.splice(1).join(" ");
    
        if(!message.member.roles.cache.find(r => r.name === config.bangroup)) {
            return message.reply("du har ikke tilladelse til at bruge denne kommando.");
        }

        var query = con.query(
            "UPDATE vrp_users SET banned = ?, reason = ? WHERE id = ?",
            [1, reason, id],
            function (error, result, fields) {
                if (error) throw error;
            }
        );

        message.delete()
    
        let banEmbed = new Discord.MessageEmbed()
            .setTitle(`Ban ID: **${id}**`)
            .setColor("#FF0000")
            .setDescription(`ID ${id} blev banned af ${message.author.username} med grunden ${reason}`)
            .setFooter("Lavet af Ezague");
    
        let logchannel = message.client.guilds.cache.get(message.guild.id).channels.cache.get(config.logchannel)
        if (!logchannel)
            return message.channel.send("Kunne ikke finde log kanalen...");
    
        logchannel.send(banEmbed);
    
        return;
    },
};