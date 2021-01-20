const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'unbanid',
    description: 'Unbanner en person med et bestemt ID',
    async execute(client, message, args, con) {
            // Set id and reason
    var id = args[0];

    if(!message.member.roles.cache.find(r => r.name === config.bangroup)) {
        return message.reply("du har ikke tilladelse til at bruge denne kommando.");
    }

    var query = con.query(
        "UPDATE vrp_users SET banned = ?, reason = null WHERE id = ?",
        [0, id],
        function (error, result, fields) {
            if (error) throw error;
        }
    );

    message.delete()

    let unbanEmbed = new Discord.MessageEmbed()
            .setTitle(`Unban ID: **${id}**`)
            .setColor("#00FF00")
            .setDescription(`ID ${id} blev unbanned af ${message.author.username}`)
            .setFooter("Lavet af Ezague");

            let logchannel = message.client.guilds.cache.get(message.guild.id).channels.cache.get(config.logchannel)
            if (!logchannel)
                return message.channel.send("Kunne ikke finde log kanalen...");
        
            logchannel.send(unbanEmbed);

    return;
    },
};