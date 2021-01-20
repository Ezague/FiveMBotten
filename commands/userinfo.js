const Discord = require("discord.js");
const config = require("../config.json");
const moment = require("moment");

module.exports = {
    name: 'userinfo',
    description: 'Viser info om en bruger',
    async execute(client, message, args, con) {
        let user = message.mentions.users.first() || message.author;

        let botIcon = client.user.displayAvatarURL;
        let userInfoEmbed = new Discord.MessageEmbed()
        .setDescription(`**User Info**`)
        .setImage(botIcon)
        .setFooter(`Lavet af Ezague#0020`)
        .addField(`**Navn:**`, `${user.username}`)
        .addField(`**Identitetsnumre:**`,`${user.discriminator}`)
        .addField(`**ID:**`, `${user.id}`)
        .addField(`**Status:**`, `${user.presence.status}`)
        .addField(`**Joinede:**`, moment(message.guild.members.cache.get(user.id).user.joinedAt).format("MMMM Do YYYY, h:mm a"))
        .addField(`**Konto oprettet:**`, moment(message.guild.members.cache.get(user.id).user.createdAt).format("MMMM Do YYYY, h:mm a"))
    
        message.channel.send(userInfoEmbed);
    
    },
};