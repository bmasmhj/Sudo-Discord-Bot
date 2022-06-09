const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "stats",
    description: "8ball command",

    async run (bot, message, args) {
            const member = message.mentions.members.first()

            const messagedata = args.slice(1).join(" ");

            console.log(messagedata);
            if(!member) {
                const { guild } = message;
                const owner = '<@'+guild.ownerID+'>';
                const embed = new MessageEmbed()
                  .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
                  .setThumbnail(guild.iconURL())
                  .addField('Created On', guild.createdAt.toLocaleString(), true)
                  .addField('Guild Owner', owner)
                  .addField('Total Members', guild.memberCount, true)
                  .addField('Total Real Members', guild.members.cache.filter(member => !member.user.bot).size, true)
                  .addField('Total Bots', guild.members.cache.filter(member => member.user.bot).size, true)
                  .addField('Total Channels', guild.channels.cache.size, true)
                  .addField('Total Text Channels', guild.channels.cache.filter(ch => ch.type === 'text').size, true)
                  .addField('Total Voice Channels', guild.channels.cache.filter(ch => ch.type === 'voice').size, true)
                  .setColor('#5CC5FF')
                  .setDescription(`${guild.roles.cache.map(role => role.toString()).join(' ')}`);
                message.channel.send(embed);
            } else if(member) {
              const members = message.mentions.members.size === 1 ? 
                message.mentions.members.first() :
                message.guild.members.cache.get(messagedata[1]);
              if(members) {
                const embed = new MessageEmbed()
                  .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
                  .setThumbnail(member.user.displayAvatarURL())
                  .addField('Created On', member.user.createdAt.toLocaleString(), true)
                  .addField('Joined On', member.joinedAt, true)
                  .addField('Kickable', member.kickable, false)
                  .addField('Voice Channel', member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'None')
                  .addField('Presence', member.presence.status)
                  .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`);
                message.channel.send(embed);
              } else {
                message.channel.send(`I couldn't find that member with ID ${args[1]}`);
              }
              
            } else {
              message.channel.send(`Incorrect Usage: !stats | !stats <user_id> | !stats @mention`);

             
            }
          }
    }   