require('dotenv').config();

const Discord = require("discord.js");

const { Client, MessageAttachment }  = require('discord.js'); 
const client = new Client({
    intend: [
      "GUILDS",
      "GUILD_MESSAGES",
      "GUILDS_MEMBERS",
  
    ]
  }); 


let bot = {
    client
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.login(process.env.DISCORD_BOT_TOKEN);
