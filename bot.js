const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "-"
 
console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
console.log('         [Wait please .. ]       ')
console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
client.on('ready', () => {
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  console.log(`Logged in as [ ${client.user.tag}! ]`);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  console.log('[           BOT IS ONLINE         ]')
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  console.log('[        info         ]')
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  console.log(`servers! [ " ${client.guilds.cache.size} " ]`);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  console.log(`Users! [ " ${client.users.cache.size} " ]`);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  console.log(`channels! [ " ${client.channels.cache.size} " ]`);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
 
client.user.setActivity('!help', { type: 'PLAYING' })
});

if (message.content.startsWith(prefix + "warn")) {
    if (!message.channel.guild)
      return message.channel
        .send("THISC  COMMAND IS ONLY FOR SERVERS")
        .then(m => m.delete(7000));
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("sorry but u dont have ``MANAGE_MESSAGES`` prems");
  let user = message.guild.members.get(message.content.split(' ')[1]) || message.mentions.members.first();
    let warn = new Discord.RichEmbed()
.setFooter(`WARNED By ${message.author.tag}`,`${message.author.avatarURL}`)   
.setAuthor('Warn', 'https://cdn3.iconfinder.com/data/icons/musthave/256/Delete.png')
.setThumbnail(user.avatarURL)
      .setDescription(` resson :  **${args.join("  ")}**`)
      .setColor(RANDOM);
    user.sendEmbed(warn);
    message.delete();
    message.channel.send("**Done **")
  }
});
//by ! Angel,  H2#7353 
//في حال لم ترد ان تحذف رساله الشخص الذي يعطي الوارن فقط قم بحذف   message.delete();

 
 
client.login(process.env.TOKEN);
