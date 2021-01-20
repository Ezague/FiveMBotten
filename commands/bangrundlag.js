const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'bangrundlag',
    description: 'Se hvorfor en person er banned fra din server!',
    async execute(client, message, args, con) {
        var id = args[0];

        if(!message.member.roles.cache.find(r => r.name === config.bangroup)) {
            return message.reply("du har ikke tilladelse til at bruge denne kommando.");
        }
        if (!id)
            return message.reply("du skal definere en bruger du gerne vil finde");
        // console.log(message.member.user.id.toString(tUser))
    
        con.query("SELECT * FROM vrp_users WHERE id = ?", [id], function (
            err,
            result
        ) {
            if (err) throw err;
            if (result[0].banned == 0) {
                message.delete()
                let embed = new Discord.MessageEmbed()
                .setTitle(`Ban check af ${message.author.username}`)
                .setColor("#00FF00")
                .setDescription(`ID: **${id}** er ikke banned fra serveren.`)
                .setFooter("Lavet af Ezague#0020");
                return message.channel.send(embed)
            } else if (result[0].banned == 1) {
                message.delete()
                let embed = new Discord.MessageEmbed()
                .setTitle(`Ban check af ${message.author.username}`)
                .setColor("#FF0000")
                .setDescription(`ID: **${id}** er banned med grundlaget: **${result[0].reason}**`)
                .setFooter("Lavet af Ezague#0020");
                message.channel.send(embed);
            }
        });
    },
};