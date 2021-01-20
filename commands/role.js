const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'role',
    description: 'Tilføjer/Fjerner en rolle fra en bestemt person',
    async execute(client, message, args, con) {

        let decision = args[0];

        let role = message.guild.roles.cache.find(r => r.name === args[2]);

        let member = message.mentions.members.first();

        let logchannel = message.client.guilds.cache.get(message.guild.id).channels.cache.get(config.logchannel)

        if (!logchannel)
            return message.channel.send("Kunne ikke finde log kanalen...");
    
        if(!message.member.roles.cache.find(r => r.name === config.bangroup)) {
            return message.reply("du har ikke tilladelse til at bruge denne kommando.");
        }
    
        if (!member) return message.reply("du skal tagge en person");
    
        if (!role) return message.reply("kunne ikke finde rollen");

        if (decision === "tilføj" || decision === "tilføje" || decision === "add") {
            message.delete()
            let embed = new Discord.MessageEmbed()
            .setTitle(`Rolle tilføjet af: ${message.author.username}`)
            .setDescription(`Rollen: **${role}** blev tilføjet til: **${member}** af **${message.author.username}**`)
            .setColor("#00FF00")
            .setFooter("Lavet af Ezague#0020");
            member.roles.add(role);
            logchannel.send(embed);
        }
        else if (decision === "fjern" || decision === "fjerne" || decision === "remove" || decision === "rem") {
            message.delete()
            let embed = new Discord.MessageEmbed()
            .setTitle(`Rolle fjernet af: ${message.author.username}`)
            .setDescription(`Rollen: **${role}** blev fjernet fra: **${member}** af **${message.author.username}**`)
            .setColor("#FF0000")
            .setFooter("Lavet af Ezague#0020");
            member.roles.remove(role);
            logchannel.send(embed);
        } else {
            message.reply(`Du skal vælge om du vil **tilføje** eller **fjerne** rollen fra brugeren.`)
        }
    },
};