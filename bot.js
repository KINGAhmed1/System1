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

client.on('message' , message =>{
    var prefix = "-";
    let commands = message.content.split(" ");
    if(commands[0] == prefix+"say"){
    if(!message.guild) return;
if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("**You Dont Have `MANAGE_MESSAGES` Permission .**");
    if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("Please Check My Role Permission To `MANAGE_MESSAGES`");
    var args = message.content.split(" ").slice(1).join(' ')
    if (!args){
        return message.channel.send("`Usage : "+prefix+"say <message>`");
    }
    message.delete()
    var embed = new Discord.MessageEmbed()
    .setColor(`Black`)
    .setDescription(`${args}`)
    .setFooter(`By ${message.author.tag}`)
    message.channel.send(embed);
    }

});

client.on("message" , message => {
	var args = message.content.split(" ");
	var command = args[0];
	var anum = args[1];
	var tax = 5; // قيمة الضريبة , بالمئة
	if(command == prefix+"tax"){
		if(!anum){
			return message.reply("`"+command+" <number>`");
		}
		var fnum = Math.floor(anum);
		if(fnum < 0 || fnum == NaN || !fnum){
			return message.reply("**يجب ان تكون القيمة صحيحة.**");
		}
		var taxval = Math.floor(fnum*(tax/100));
		var total = Math.floor(fnum-taxval);
		message.channel.send(`
**
المبلغ الأساسي : ${fnum}
الضريبة : ${tax}%
قيمة الضريبة : ${taxval}
المبلغ مع الضريبة : ${total}
**	
		`);
	}
});
 
client.login(process.env.TOKEN);
