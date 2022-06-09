
const fetch = require("node-fetch")

module.exports = (client) => {
    const { Client, MessageEmbed } = require('discord.js');


client.on('message', (message) => {

    if(message.author.bot) return;
        const text = message.content;

        var thisguild = message.guild.id;
        var user = message.author.id;
        let preixcheck = () => {
        fetch("http://localhost/Sudo/api/moderation?guild="+thisguild+"&userid="+user)
            .then(response =>{
            return response.json()
        })
        .then (data =>{
        console.log(data);
            if(data.lvln != 0 & data.msg != 'false'){
                message.reply('! You have been Advanced to Level '+data.lvln);     
            }
        })
        }
        preixcheck();
       

        
        
});
}

;