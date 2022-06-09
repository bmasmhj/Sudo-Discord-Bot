module.exports = (client) => {
    const { Client, MessageEmbed } = require('discord.js');
const fetch = require("node-fetch")
    

client.on('message', (message) => {
    if(message.author.bot) return;
    if(message.content == 'helpbot'){
        // var thisguild = message.guild.id;
        // const check = await fetch("http://localhost/Sudo/api/moderation?guildid="+thisguild);
        // const result = await check.json();
        var thisguild = message.guild.id;
       
        let check = () => {
            fetch("http://localhost/Sudo/api/moderation?allcommands="+thisguild)
            .then(response =>{
            return response.json()
        })
        .then (data =>{
            if(data.prefix != ""){
                var prfx = data.prefix; 
            }else{
                var prfx = '.';
            }
            var comman = data.cmnd; 
            const embed = new MessageEmbed()
            .setTitle(`Commannds`)
            .addField(`Prefix is`, `${prfx}`)
            .setDescription(`${comman}`)
            .setColor("RANDOM")
            
            message.channel.send(embed)
        })
        }

        check()
       
    }
});
}