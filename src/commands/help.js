const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');

const fetch = require("node-fetch")


module.exports = {
    name: "help",
    description: "Help command",

    async run (bot, message, args) {

        if(message.author.bot) return;
        var thisguild = message.guild.id;
        const check = await fetch("http://localhost/Sudo/api/moderation?guildid="+thisguild);
        const result = await check.json();
        const prfx = result.prefix;
        const embed = new MessageEmbed()
        .setTitle(`Commannds`)
        .addField(`Prefix is`, `${prfx}`)
        .setDescription(`
        helpbot or ${prfx}help //Display all commands
        ${prfx}ping //check your ping
        ${prfx}weather <location>
        ${prfx}stats // status of server
        ${prfx}stats <user_id> | ${prfx}stats @mention // status of member
        
        Fun Commands
        ${prfx}howgay @mention //Gay percentage
        ${prfx}howmand @mention //Mad precentage
        ${prfx}meme //Memes from reddit
        ${prfx}pokemon <pokemon_name> // Pokemon Details
            
        Games 
        ${prfx}poll <time> <question> //create yes no poll
        ${prfx}rps // Playing Rock Paper Scissors with bot
        ${prfx}tictactoe @mention // play tictactoe with player
        
        Music
        ${prfx}play //play music or add to quere
        ${prfx}skip //skip queue music
        ${prfx}stop //stop playing music

        Moderation
        ${prfx}kick @mention Reason.. // Kick user from server and sends private message with reason 
        ${prfx}ban @mention Reason.. // Ban user from server and send private message with reason 

        Channel
        ${prfx}lock //locks chanel
        ${prfx}unlock //unlocks Channel
        `)
        .setColor("RANDOM")
        
        message.channel.send(embed)
    }   
}