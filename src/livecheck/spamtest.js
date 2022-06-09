const Discord = require("discord.js")
const fetch = require("node-fetch")

const { Client, MessageEmbed } = require('discord.js');
module.exports = (client) => {

const usersMap = new Map();


client.on('message', async message => {

  if(message.author.bot) return;    
  var thisguild = message.guild.id;
  const check = await fetch("http://localhost/Sudo/api/moderation?guildid="+thisguild);
  const result = await check.json();
  const roledata1 = result.rolenormal;
  const roledata2 = result.rolemute;

  const check2 = await fetch("http://localhost/Sudo/api/moderation?smapid="+thisguild);
  const dats = await check2.json();
  const LIMIT = parseInt(dats.limit);
  const TIME = parseInt(dats.time);
  const DIFF = parseInt(dats.diff);

  console.log(DIFF);
  if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    console.log(difference);
    if(difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared timeout');
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from RESET.');
      }, TIME);
      usersMap.set(message.author.id, userData);
    }
    else {
      ++msgCount;
      if(parseInt(msgCount) === LIMIT) {
        const role = message.guild.roles.cache.get(roledata1);
        const role2 = message.guild.roles.cache.get(roledata2 );
        message.member.roles.remove(role);
        message.member.roles.add(role2);

        const ping = new Discord.MessageEmbed()
        .setDescription(`${message.author}, You have been muted for Spamming`);
        message.reply(ping);
        setTimeout(() => {  
        message.member.roles.add(role);
        message.member.roles.remove(role2);
        const unmutemsg = new Discord.MessageEmbed()
        .setDescription(`${message.author}, You have been unmuted.`);
        message.reply(unmutemsg);
        }, TIME);
      } 
      
      else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  }
  else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log('Removed from map.');
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }

});
};
