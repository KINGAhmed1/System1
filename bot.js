const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const client = new Discord.Client();
const prefix = "-"
 
console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
console.log('         [Wait please ... ]       ')
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

client.on("message", message => {
	let avt = `${message.author.avatarURL}`;
  let args = message.content.split(" ")
	if(message.guild) return;
    if (message.content == - + "user"){
      let member = message.author || message.mentions.members.first() 
			let embed = new Discord.MessageEmbed() 
.addField(`**Username :**`,`n ${member.tag}`)

.addField('**User ID :**', `n${member.id}`)

.addField('**User Created At :**', `n${moment(member.createdTimestamp).fromNow()}`)

.addField(`**User AvatarURL :**`,`[Click Here](${avt})`)
.setImage(`${member.avatarURL}`)
.setTimestamp()
.setFooter(`Requested By ${member.tag}`,`${member.avatarURL}`)

return message.channel.send(embed);
}
});

client.on('ready', () => {// افنت التشغيل 
	console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
console.log('         [Rainbow Work .. ]       ')
console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
  setInterval(function(){
      client.guilds.forEach(g => { 
                  var role = g.roles.find('Rainbow', 'اسم لرتبه الي تبي يغير لونها');
                  if (role) {
                      role.edit({color : "RANDOM"});
                  };
      });
  }, 10000);//لازم تخلي رتبه البوت اعلى من رتبه الون تبعه
})

client.on("message", m => {
  if (m.content === "help") {
    let Dashboard = "Soon";
    var addserver ="https://discord.com/api/oauth2/authorize?client_id=734885025484374036&permissions=8&scope=bot";
    var SUPPORT = "https://discord.gg/6weHnd7";
    let embed = new Discord.RichEmbed().setTitle(`Helpful Links`)
      .setDescription(`                                                                                                               
**[Add To Your Server ](${addserver})**    
**[Dashboard](${Dashboard})**
**[ Server Support](${SUPPORT})**`);
    m.react("✅");
    m.author.send(embed);
  }
});

const top = JSON.parse(fs.readFileSync("top.json", "UTF8"));

function save() {
    fs.writeFileSync("./top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember) {
    if (newMember.user.bot) return;
    if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
    if (!top[newMember.guild.id][newMember.user.id]) top[newMember.guild.id][newMember.user.id] = {
        "text": 0,
        "voice": parseInt(Math.random()*10),
        "msgs": 0,
        "id": newMember.user.id
    }
    save();
    if (!oldMember.voiceChannel && newMember.voiceChannel) {
        var addXP = setInterval(async function () {
            top[newMember.guild.id][newMember.user.id].voice+=parseInt(Math.random()*4);
            save();
            if (!newMember.voiceChannel) {
                clearInterval(addXP);
            }
        }, 60000);
    }
});
client.on("message", async function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!top[message.guild.id]) top[message.guild.id] = {};
    if (!top[message.guild.id][message.author.id]) top[message.guild.id][message.author.id] = {
        "text": parseInt(Math.random()*10),
        "voice": 1,
        "msgs": 0,
        "id": message.author.id
    }
    if (top[message.guild.id][message.author.id].msgs > 10) {
        top[message.guild.id][message.author.id].text += parseInt(Math.random()*4);
        top[message.guild.id][message.author.id].msgs = 0;
    }
    save();
    var args = message.content.split(" ");
    var cmd = args[0].toLowerCase();
    if (!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "top text")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 10).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: ${user.text} **`
                }
            }).join("n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:speech_balloon: | TEXT LEADERBOARD**`, `${textStr}   nn **✨ | For More: ${prefix}top text**`, true)  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send({
                embed: embed
            });
  } else {
    if(message.content.startsWith(prefix + "top voice")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 10).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: ${user.voice}**`
                }
            }).join("n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:microphone2: | VOICE LEADERBOARD**`, `${voiceStr}   nn **:sparkles: More?** ${prefix}top voice`, true)
  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()  
            message.channel.send({
                embed: embed
            });
  } else {
       if(message.content.startsWith(prefix + "top")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 5).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: ${user.text} **`
                }
            }).join("n")}`;
            num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 5).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: ${user.voice} **`
                }
            }).join("n")}`;
            var embed = new Discord.RichEmbed()  
            .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
            .addField("**TOP 5 TEXT :speech_balloon:**", `${textStr}  nn  **:sparkles: More?** ${prefix}top text`, true)
            .addField("**TOP 5 VOICE :microphone2:**", `${voiceStr} nn **:sparkles: More?** ${prefix}top voice`, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setColor("13B813");
            message.channel.send({
                embed: embed
            
  
            });
        }
  }
  }
});


client.on("message", async (message)=>{
if(message.author.bot || !message.guild || !message.content.startsWith(prefix))return;
const args = message.content.slice(prefix.length).trim().split(/ +/), commandName = args.shift().toLowerCase();
if(["ban", "kick"].includes(commandName)){
let mode = commandName;
if(!message.member.hasPermission(mode=="kick"?"KICK_MEMBERS":"BAN_MEMBERS")) return message.channel.send("**❌ | You don't have Permissions do to this.**");
let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(x=> x.id == args[0]));
if(!user)return message.channel.send("**❌ | Member not found!**");
let bot = message.guild.member(client.user);
if (user.user.id == client.user.id) return message.channel.send("lol no");
if (user.user.id == message.guild.owner.id) return message.channel.send(`**:x: | You can't ${mode} the owner!**`);
if (user.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) return message.channel.send(`**:x: | You can't ${mode} people higher ranked than yourself!**`);
if (user.roles.highest.position >= bot.roles.highest.position)return message.channel.send(`**:x: | I can't ${mode} people who are higher ranked than me!**`);
if (!user[`${mode == "ban" ? "bann" : mode}able`])return message.channel.send(`**:x: | Specified user is not ${mode}able.**`);
user[mode](mode == "ban" ? {days:7,reason:`Banned by ${message.author.tag}`}:`Kicked by ${message.author.tag}`)
.then(()=>message.channel.send(`**✅ ${mode == "ban" ? "Bann" : mode}ed __${user.user.tag}__ (ID: \`${user.user.id}\`)**`))
.catch(console.error);
}
});

client.on("message",message => {
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "avatar")){
const mention = message.mentions.users.first()

if(!mention) return console.log("") 
let embed = new Discord.RichEmbed()
.setColor("BLACK")
.setAuthor(`${mention.username}#${mention.discriminator}`,`${mention.avatarURL}`) 
.setTitle("Avatar Link")
.setURL(`${mention.avatarURL}`)
.setImage(`${mention.avatarURL}`)
.setFooter(`Requested By ${message.author.tag}`,`${message.author.avatarURL}`)    
    message.channel.send(embed)
}
})

client.on("message", message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "avatar server")) {
    let doma = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setTitle("Avatar Link")
    .setURL(message.guild.iconURL)
    .setImage(message.guild.iconURL)
    .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(doma)
  } else if(message.content.startsWith(prefix + "avatar")) {
    let args = message.content.split(" ")[1]
var avt = args || message.author.id;    
    client.fetchUser(avt).then(user => {
     avt = user;
  let embed = new Discord.RichEmbed() 
  .setColor("BLACK")
  .setAuthor(`${avt.tag}`, avt.avatarURL)
  .setTitle("Avatar Link")
  .setURL(avt.avatarURL)
  .setImage(avt.avatarURL)
  .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
  message.channel.send(embed) 
    })
  }
})

client.on('message', message => {
                      if (message.content.startsWith(prefix + 'اسرع')) {
                        if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
                      
                      const type = require('./2sr3.json');
                      const item = type[Math.floor(Math.random() * type.length)];
                      const filter = response => {
                          return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
                      };
                      message.channel.send('** لديك 15 ثانيه لكتابه هذه الكلمه بسرعة**').then(msg => {
                      
                            
                      msg.channel.send(`${item.type}`).then(() => {
                              message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
                              .then((collected) => {
                          message.channel.send(`${collected.first().author} ✅ **احسنت لقد تمكنت من كتابه هذه الكلمه بسرعه**`);
                          console.log(`[Typing] ${collected.first().author} typed the word.`);
                                })
                                .catch(collected => {
                                  message.channel.send(`:x: **لم يتمكن احد من كتابه هذه الكلمه في الوقت المناسب**`);
                                })
                          })
                        })
                      }
                      });



const MC = JSON.parse(fs.readFileSync("./MC.json", "utf8"));//تحديد الروم
client.on("message", message => {
   if (message.author.bot) return;
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "setroom")) {
    
    let args = message.content.split(" ").slice(1);
    let args1 = message.content.split(" ").slice(2);
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        ":information_source: | **لا تملك الصلاحيات الكافيه**"
      );
    let room = args[0];
    if (!room) return message.reply("**عذرا لم يتم تحديد الروم**");
    //جميع الحقوق لدى محمد / مي كودز
    let link = args[1];
    if (!link) return message.reply("**عذرا لم يتم تحديد الرابط**");
    if (!message.guild.channels.find("name", args[0]))
      return message.reply("**عذرا لم يتم تعرف على الروم**");
    let embed = new Discord.RichEmbed()
      .setTitle("**تم الاعداد بنجاح**")
      .addField("الروم:", room)
      .addField("رابط الخط:", link)
      .addField("بواسطة:", `${message.author}`)
      .setThumbnail(link)
      .setFooter(`By M7MD <MeCodes/>`);
    message.channel.sendEmbed(embed);
    MC[message.guild.id] = {
      channel: room,
      link: link,
      onoff: "شغال"
    };
    fs.writeFile("./MC.json", JSON.stringify(MC), err => {
      if (err) console.error(err);
    });
  }
}); //جميع الحقوق لدى محمد / مي كودز

//تفعيل الروم او الغائه
client.on("message", message => {
   if (message.author.bot) return;
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "room")) {
    if (!message.channel.guild) return;
//جميع الحقوق لدى محمد / مي كودز
    if (!message.channel.guild) return;
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send("*عذرا انت لا تمتلك صلاحيات* `MANAGE_GUILD`");
    if (!MC[message.guild.id])
      MC[message.guild.id] = {
        onoff: "طافي"
      };
    if (MC[message.guild.id].onoff === "طافي")
      return [
        message.channel.send(`**تم  تفعيل روم صور**`),
        (MC[message.guild.id].onoff = "شغال")
      ];
    if (MC[message.guild.id].onoff === "شغال")
      return [
        message.channel.send(`**تم الغاء تفعيل روم الصور**`),
        (MC[message.guild.id].onoff = "طافي")
      ];
    fs.writeFile("./MC.json", JSON.stringify(MC), err => {
      if (err) console.error(err);
    });
  }
});


client.on("message", message => {
   if (message.author.bot) return;
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "inforoom")) {//امر تشوف اذا الروم شغال ولا لا
    let embed = new Discord.RichEmbed()
      .addField("حالة الروم", `${MC[message.guild.id].onoff}`)
      .addField("روم الخط", `${MC[message.guild.id].channel}`)
      .addField("بواسطة", `${message.author}`)
      .setThumbnail(`https://cdn.discordapp.com/icons/589156112448749589/859edaa2f30924ba1d5cba2018986922.gif?size=1024`)
      .setFooter(`By M7MD <MeCodes/>`);
    message.channel.sendEmbed(embed);
  }
});


//لاتلعب هنا
client.on("message", message => {
   if (message.author.bot) return;
  if (!message.channel.guild) return;
  if (!MC[message.guild.id])
    MC[message.guild.id] = {
      onoff: "طافي"
    };
  if (MC[message.guild.id].onoff === "طافي") return;

  if (
    !MC[message.guild.id] ||
    !MC[message.guild.id].channel ||
    !MC[message.guild.id].link ||
    !MC[message.guild.id].onoff
  )
    return;
  if (message.channel.name !== `${MC[message.guild.id].channel}`) return;
  message.channel.send(MC[message.guild.id].link);
}); //جميع الحقوق لدى محمد / مي كودز





client.on("message", message => {
     const args = message.content.split(' ');
    let avt = `${message.author.avatarURL}`;
    let id1 = `https://images-ext-1.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif`
    if(message.guild.channel) return;
                 if (message.content === (prefix + 'user') || message.content === (prefix + "u")) {
const mention = message.mentions.users.first() || message.author;
            let embed = new Discord.RichEmbed() 
.addField(`**Username :**`,`\n ${mention.tag}`)

.addField('**User ID :**', `\n${mention.id}`)

.addField('**User Created At :**', `\n${moment(mention.createdTimestamp).format('YYYY/MM/DD HH:mm')}`)

.addField('**User Joined At :**', `\n${moment(mention.joinedTimestamp).format('YYYY/MM/DD HH:mm')}`)

.setThumbnail(`${mention.avatarURL}` , ({format : "png" , dynamic : true , size : "1024"}))
.setFooter(`${mention.tag}`,`${id1}`)

message.channel.send(embed);
}
});

client.on('guildMemberAdd', (member) => {
        const welcomer = member.guild.channels.cache.find(
            (d) => d.name == '・❱-الشات-العام'
        );
        if (!welcomer) return;
        if (welcomer) {
            moment.locale('en');
            var m = member.user;
		
            member.guild.fetchInvites().then((guildInvites) => {
                setTimeout(() => {
                    const invite = guildInvites.find((i) => i.uses);
 
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(member.tag, member.user.avatarURL())
                        .setTitle('**New Member Join**')
                        .setThumbnail(member.user.avatarURL())
                        .setTimestamp()
                        .setDescription(
                            `Member: ${member}\nInviter: <@${
                                invite.inviter.id
                            }>\nUrl: https://discord.gg/${invite.code}\nAge: ${moment(
                                member.user.createdTimestamp
                            ).fromNow()}`
                        );
 
                    welcomer.send(embed);
                }, 2000);
            });
        }
});


                      
 
client.login(process.env.TOKEN);
