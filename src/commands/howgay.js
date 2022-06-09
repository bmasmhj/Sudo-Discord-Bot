const Discord = require('discord.js')

module.exports = {
    name: "howgay",
    description: "a howgay command",

    async run (bot, message, args) {
        const messagedata = message.content.split(" ")[1];
        let member = message.mentions.users.first() || messagedata

        let rng = Math.floor(Math.random() * 101);

        let name = '';
        if(member.username == undefined){
            name = messagedata;
        }
        else {
            name = member.username;
        }

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${name} is ` + rng + "% Gay🌈")
        .setColor("GREEN")

        message.channel.send(howgayembed);
    }
}