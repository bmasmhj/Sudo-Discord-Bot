const Discord = require('discord.js')
const fetch = require("node-fetch")

module.exports = {
    name: "unlock",
    description: "Unlock Channel command",

  async run(client, message, args) {
    message.delete();

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You cannot use this command.");
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I require \`MANAGE_CHANNELS\` permssion to lock the channel")

    var thisguild = message.guild.id;

    const check = await fetch("http://localhost/Sudo/api/moderation?guildid="+thisguild);
    const result = await check.json();
    const prfx = result.prefix;

    const role = result.defaultrole;
    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;

    const su6embed = new Discord.MessageEmbed()

    .setTitle("UnLocked")
    .setDescription("This Channel Is UnLocked! :unlock:")
    .setColor(`RANDOM`)
    .setFooter(client.user.tag, client.user.displayAvatarURL)
    .setTimestamp()


    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: true
    }).catch(err => console.log(err));
    message.channel.send(su6embed);
  }
}