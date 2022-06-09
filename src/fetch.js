var thisguild = message.guild.id;
let check = () => {
  fetch("http://localhost/chatbot/guild.json")
    .then(response =>{
      return response.json()
  })
  .then (data =>{
    var guildlenght = data.guilds.length;
    for(i=0;i<guildlenght;i++){
      if(data.guilds[i].guildId == thisguild ){
        

      }
    }
})
}