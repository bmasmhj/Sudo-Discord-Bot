const fetch = require("node-fetch")
module.exports = (client) => {
const Discord = require("discord.js")
const { Client, MessageEmbed } = require('discord.js');


client.on('message', (message) => {
       var user = message.author.id
    if(message.author.bot) return;
        const stopwords = require("./stopwords.json");
        const badwords = require("./badwords.json");
        const text = bad_word(message.content);

        if(text === false){
            var thisguild = message.guild.id;
            let check = () => {
            fetch("http://localhost/Sudo/api/moderation?moderation="+thisguild+"&user="+user)
                .then(response =>{
                return response.json()
            })
            .then (data =>{
                if(data.count < data.mutelevel && data.action == 'mute'){ 
                    var chance =  data.mutelevel-data.count;
                    if(data.guildId !='' && data.rolenormal!= '' && data.rolemute != ''){

                        const roledata1 = data.rolenormal;
                        const roledata2 = data.rolemute;
                    
                        const role = message.guild.roles.cache.get(roledata1);
                        const role2 = message.guild.roles.cache.get(roledata2 );
                        message.member.roles.remove(role);
                        message.member.roles.add(role2);
                        const ping = new Discord.MessageEmbed()
                        .setDescription(`${message.author}, You have been muted for using Badwords, ${chance} chances left`);
                        message.reply(ping);
                        message.delete();

                        setTimeout(() => {  
                        message.member.roles.add(role);
                        message.member.roles.remove(role2);
                        const unmutemsg = new Discord.MessageEmbed()
                        .setDescription(`${message.author}, You have been unmuted.`);
                        message.reply(unmutemsg);
                        }, data.mutetimeout);
                    }
                }
                else if(data.count == 'full' && data.action == 'kick')
                {
                    let member = `<@`+message.author.id+`>`;
                    message.channel.send(`$kick ${member}` )
                }
                else if(data.count == 'full' && data.action == 'ban')
                {
                    let member = `<@`+message.author.id+`>`;
                    message.channel.send(`$ban ${member}` )
                }

                })
                }
            check();
        }
    function bad_word(str) {
        res = [];
        //clearing stop words
        words = str.split(' ')
        for(i=0;i<words.length;i++) {
        word_clean = words[i].split(".").join("")
            if(!stopwords.includes(word_clean)) {
                res.push(word_clean)
            }
        }
        //bad word filtering
        resz = [];
        for(i=0;i<res.length;i++) {
            mod_words = res[i].split(".").join("")
            if(!badwords.includes(mod_words)) {
                resz.push(mod_words)
            }
            else{
                return false;
            }
        }
        return(resz.join(' '));
    } 
});
}

;