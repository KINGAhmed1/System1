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
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
 
client.user.setActivity('!help', { type: 'PLAYING' })
});

client.on('message',message=>{
    if(message.content.startsWith(prefix + 'قفل')){
        if(message.channel.type == 'dm') return;
        if(message.author.bot) return;
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return  message.reply(`**MANAGE_CHANNELS ليس لديك خاصية** :negative_squared_cross_mark: `)	
        let everyone = message.guild.roles.find(king => king.name === '@everyone');
        message.channel.createOverwrite(everyone, {
               SEND_MESSAGES: false
            }).then(() => {
                message.channel.send("** ✅ | تم  **").then(msg=>{
                    msg.delete({timeout : 2000})
                    message.delete({timeout : 2000})
                })
            });
    }
        if(message.content.startsWith(prefix + 'فتح')){
            if(message.channel.type == 'dm') return 
            if(message.author.bot) return;
            if(!message.member.hasPermission('MANAGE_CHANNELS')) return  message.reply(`**MANAGE_CHANNELS ليس لديك خاصية** :negative_squared_cross_mark: `)	
            let everyone = message.guild.roles.find(king => king.name === '@everyone');
            message.channel.createOverwrite(everyone, {
                SEND_MESSAGES: true
             }).then(() => {
                 message.channel.send("** ✅ | تم  **").then(msg=>{
                    msg.delete({timeout : 2000})
                    message.delete({timeout : 2000})
                })
             }); 
        }
})
 
client.login(process.env.TOKEN);
