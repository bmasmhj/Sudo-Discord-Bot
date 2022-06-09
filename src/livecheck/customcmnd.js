
const fetch = require("node-fetch")

module.exports = (client) => {
    const { Client, MessageEmbed } = require('discord.js');
   client.on('message', (message) => {

    if(message.author.bot) return;
        const text = message.content;

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
            let check = () => {
                fetch("http://localhost/Sudo/api/moderation?custmcmnd="+thisguild)
                    .then(response =>{
                    return response.json()
                })
                .then (data =>{
                 
                    var cmndlen = data.length;
                    
                   for(i=0;i<cmndlen;i++){
                        if(text === prefix+data[i].cmnd_name){
                            message.reply(data[i].cmnd_reply);
                        }
                   }
                })
                }
        check();

        })
        }
        preixcheck();
       

        
        
});
}

;