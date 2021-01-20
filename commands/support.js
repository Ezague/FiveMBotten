const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'support',
    description: 'Super smart support system!',
    async execute(client, message, args, con) {
        let supportchannel = message.guild.channels.cache.find(channel => channel.name === config.supportchannel);
        let ticketchannel = message.guild.channels.cache.find(channel => channel.name === config.ticketchannel);
        let supportRole = message.guild.roles.cache.find(role => role.name === config.supporterrole);
        let date_ob = new Date();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
    
        let caller = message.author;
    
        let reason = args.join(" ");
    
        if (message.channel.id !== supportchannel.id) {
            message.reply(`du kan kun oprette en support-case i ${supportchannel}.`);
            return
        }
        else {
            if (!reason) {
                message.reply(`du skal skrive en årsag til din support-case.`);
                return
            }
            else {
                message.delete();
                message.reply(`support-case oprettet.`);
                ticketchannel.send(`${supportRole}`);
    
                let supportEmbed = new Discord.MessageEmbed()
                    .setDescription(`Support: ${caller}`)
                    .setColor("#e56b00")
                    .addField("Grund:", `**${reason}**`)
                    .addField("Klokken:", `${hours}:${minutes}`);
                ticketchannel.send(supportEmbed);
            }
        }
    },
};