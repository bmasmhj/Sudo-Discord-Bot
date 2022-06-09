const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "meme",
    description: "meme command, sends a meme from certain place",

    async run (bot, message, args) {

        let data = await fetch
        (`http://meme-api.herokuapp.com/gimme/memes`).then(res=> res.json());

        const embed = new Discord.MessageEmbed()
        embed.setTitle(data.title);
        embed.setURL(data.postLink);
        embed.setFooter(data.ups+" Upvotes");
        embed.setTimestamp()
        embed.setImage(data.url)


        
        message.channel.send(embed)
    }
}