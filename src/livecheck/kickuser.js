
const fetch = require("node-fetch")
const Discord = require('discord.js')

module.exports = (client) => {
    const { Client, MessageEmbed } = require('discord.js');


client.on('message', (message) => {
    if(message.author.bot){
    if(message.channel.type === 'dm') return;

        var thisguild = message.guild.id;
        let preixcheck = () => {
        fetch("http://localhost/Sudo/api/moderation?guildid="+thisguild)
            .then(response =>{
            return response.json()
        })
        .then (data =>{
            if(data.prefix != ""){
                var prefix = data.prefix; 
            }else{
                var prefix = '.';
            }
            if(message.content.toLowerCase().startsWith(prefix+'kick')) {
                const mentionMember = message.mentions.members.first();
                let reason = "Breaking Rule";
                const kickembed = new Discord.MessageEmbed()
                .setTitle(`You were kicked from **${message.guild.name}**`)
                .setDescription(`Reason: ${reason}`)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(message.author.username+`#`+message.author.discriminator, message.author.displayAvatarURL())
                if(!mentionMember) return message.channel.send("This user is not a valid user / is no-longer in the server!");
                if(!mentionMember.kickable) return message.channel.send("I was unable to kick this user!");
                try {
                     mentionMember.send(kickembed);
                } catch (err) {
                }
                try {
                     mentionMember.kick({
                        reason: reason
                    }).then(() => message.channel.send(mentionMember.user.tag + `has been kicked for breaking rules`));
                } catch (err) {
                    return message.channel.send("I was unabe to kick this user! Sorry...")
                }

            }else if(message.content.toLowerCase().startsWith(prefix+'ban')){
                const mentionMember = message.mentions.members.first();
                reason = "Breaking Rules";
        
                const embed = new Discord.MessageEmbed()
                .setTitle(`You were banned from **${message.guild.name}**`)
                .setDescription(`Reason: ${reason}`)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(message.author.username+`#`+message.author.discriminator, message.author.displayAvatarURL())
        
        
                if(!mentionMember) return message.channel.send("This user is not a valid user / is no-longer in the server!");
        
                if(!mentionMember.bannable) return message.channel.send("I was unable to ban this user!");
        
                mentionMember.send(embed);
                mentionMember.ban({
                    reason: reason
                }).then(() => message.channel.send(mentionMember.user.tag + `has been banned for breaking rules`));
            }
        })
        }
        preixcheck();
    
    }
        
        
});
}

;