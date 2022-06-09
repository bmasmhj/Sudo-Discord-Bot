const Discord = require('discord.js')
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "heck",
    description: "ban command",

    async run (bot, message, args) {
        const mentionMember = message.mentions.members.first();
        if(!mentionMember) return message.channel.send("This user is not a valid user / is no-longer in the server!");
       
        var h = 0;
        message.channel.send(`Hecking`);
        await timeout(1000);
        let mesg = await checker();
        await timeout(1000);
        await mesg.edit("We are on...");
        await timeout(1000);
        let leadmsg = await message.channel.send(`0%`);
        for(var i = 1 ; i <= 100 ;){
            await loadeffect(i);
            i = i+ Math.floor(Math.random() * 20);
            if(i==100){  break; }
            if(i > 100 ){   i = 100;  }
            else{
                await ranmsg(h);
            }
            h++;
        }
        await timeout(1000);
        await mesg.edit(`Hecking Completed`);


        const embed = new MessageEmbed()
        .setTitle(`Hecked @${mentionMember.user.username}`)
        .setThumbnail(mentionMember.user.displayAvatarURL())
        .addField(`User id `,mentionMember.user.id )
        .addField(`Username :`,mentionMember.user.username)
        .addField(`Discriminator:`,mentionMember.user.discriminator)
        .addField('Created On', mentionMember.user.createdAt.toLocaleString(), true)
        .addField('Joined On', mentionMember.joinedAt, true)
        .addField('Kickable', mentionMember.kickable, false)
        .addField('Voice Channel', mentionMember.voice.channel ? mentionMember.voice.channel.name + `(${mentionMember.voice.channel.id})` : 'None')
        .addField('Presence', mentionMember.presence.status)
        .setColor("RANDOM")
        .setTimestamp();
        message.channel.send(embed);
        console.log(mentionMember.user.username)
        function checker(){
            const mentionMember = message.mentions.members.first();
            if (!args[0]) 
            { 
                return message.channel.send("You need to specify a user to heck");
            }
            else{
                return message.channel.send(`Hecking ${mentionMember}`);
            }
        }
        function loadeffect(i){
            var p = " ";
            for(l=0 ; l<i ;l++){
                var k = k+" ";
            }
            return leadmsg.edit(`||`+k+`||`+i+`%`);
        }
        function ranmsg(h){
            const heckword = require("./hack.json");
            if(h>16){
                return mesg.edit(`Hecking Completed`);
            }else {
                console.log(heckword[h]);
            }
            return mesg.edit(heckword[h]);
        }


      

    }
}
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
