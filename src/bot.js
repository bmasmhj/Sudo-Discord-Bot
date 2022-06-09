require('dotenv').config();
const fetch = require("node-fetch");
const Discord = require("discord.js")
const { Client, MessageAttachment }  = require('discord.js'); 
const bot = new Discord.Client();

const { readdirSync, read } = require('fs');

const welcome = require('./livecheck/welcome');
const spamtest = require('./livecheck/spamtest');
const pokemon = require('./utils/pokemon');

const { join } = require('path');
const moderation = require('./livecheck/moderation');
const { channel } = require('diagnostics_channel');
const customcmnd = require('./livecheck/customcmnd');
const kickuser = require('./livecheck/kickuser');
const levelup = require('./livecheck/levelup');
const start = require('./livecheck/helpbot');

bot.commands = new Discord.Collection();

const commandFiles = readdirSync(join(__dirname,"commands")).filter(file=>file.endsWith(".js"));
for(const file of commandFiles){
  const command = require(join(__dirname,"commands",`${file}`));
  bot.commands.set(command.name, command);
}



bot.on("error", console.error);


bot.on('ready', () => {
    console.log("Bots are Ready");
    bot.user.setActivity(' Nepali Song 🇳🇵',{type: "PLAYING"}).catch(console.error); 
    welcome(bot); spamtest(bot); chat(bot); pokemon(bot); moderation(bot); customcmnd(bot); kickuser(bot); levelup(bot); helpbot(bot);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  var thisguild = message.guild.id;
  let check = () => {
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
       
        if(message.content.startsWith(prefix)) {
          const args = message.content.slice(prefix.length).trim().split(/ +/);
          const command = args.shift().toLowerCase();
          if(!bot.commands.has(command)) return;
          try { 
              bot.commands.get(command).run(bot, message, args);
          } catch (error){
              console.error(error);
          }
      }
    })
  }
check();

  if(message.channel.type === 'dm') return;
})



bot.on('guildCreate',(guild)=>{
  let channeltoSend;
  guild.channels.cache.forEach((channel) => {
    if(
      channel.type === "text" && 
      !channeltoSend &&
      channel.permissionsFor(guild.me).has("SEND_MESSAGE")
    )
    channeltoSend = channel;
  });
    if(!channeltoSend) return;

    let channelEmbed = new Discord.MessageEmbed()
    .setColor("WHITE")
    .setAuthor(`Thank you for inviting me to ${guild.name} 💝 `)
    .setDescription("Default Prefix is `.` ")
    .addField("need help ? type .help", " Check out [here](https://bimash.com.np)!")

    channeltoSend.send(channelEmbed).catch(e=>{
      if(e){  
        return;
      }
    })  

    

  });

  const distube = require('distube');
  const helpbot = require('./livecheck/helpbot');
const chat = require('./chatbot/chat');
  bot.distube = new distube(bot, { searchSongs: false, emitNewSongOnly: true })
  bot.distube
      .on('playSong', (message, queue, song) => message.channel.send(
          `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`,
      ))
      .on('addSong', (message, queue, song) => message.channel.send(
          `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
      ))
      .on('error', (message, e) => {
      //console.error(e)
      message.channel.send(`An error encountered: ${e}`)
    })


bot.login(process.env.DISCORD_BOT_TOKEN);