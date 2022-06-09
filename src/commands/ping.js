const Discord = require('discord.js');

module.exports = {
    name: "ping",
    description : "Check users ping",

    async run(bot, message , args){

        const ping = new Discord.MessageEmbed()
        .setDescription(`Your ping is :\`${Date.now()-message.createdTimestamp} ms\``);
        message.channel.send(ping);
    } 

}