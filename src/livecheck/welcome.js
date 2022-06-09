const generateImage = require("./generateImage")
const fetch = require('node-fetch')

module.exports = (client) => {
    client.on("guildMemberAdd", async (member) => {
        const img = await generateImage(member);
        var thisguild = member.guild.id;
        // console.log(thisguild);

        let check = () => {
        fetch("http://localhost/Sudo/api/moderation?guildid="+thisguild)
            .then(response =>{
            return response.json()
        })
        .then (data =>{
            if(data.guildId !='' && data.welcomechannel!='' && data.defaultrole != '' && data.rulesid){
                const channelId = data.welcomechannel;
                const rulesChannel = data.rulesid;
                const role = data.defaultrole;
                member.roles.add(role);
                member.guild.channels.cache.get(channelId).send({
                    content: `Welcome <@${member.id}>  to the server ! Be sure to check out our ${member.guild.channels.cache
                        .get(rulesChannel)}`,
                    files: [img] 
                })
                
            }
        })
        }
        check();
    })
};
  

