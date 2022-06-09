const fetch = require("node-fetch")

module.exports = (client) => {
    const { Client, MessageEmbed } = require('discord.js');
    // 

client.on('message', (message) => {
    // console.log(message);
    if(message.author.bot) return;
    var thisguild = message.guild.id;
    var chanelid = message.channel.id;
    let check = () => {
      fetch("http://localhost/Sudo/api/moderation?guildid="+thisguild)
        .then(response =>{
          return response.json()
      })
      .then (data =>{
        const channelId = data.chatchannelId
        // if()
        // console.log(message.channel.id);
        if(channelId == chanelid){
            console.log('true');
        }else{
            console.log('chatchanelnotset')
        }
    
  
    })
    }

    check();
   
    


});
}

;