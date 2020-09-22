const Discord = require('discord.js');
const fs = require('fs');
const yt = require('ytdl-core');
const moment = require('moment');
const prefix = "-"
const client = new Discord.Client();

 
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


client.on('message', message => {  
    if (message.author.bot) return;
if (message.content.startsWith(prefix + 'clear')) { //Codes
    if(!message.channel.guild) return message.reply('⛔ | This Command For Servers Only!'); 
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | You dont have **MANAGE_MESSAGES** Permission!');
        if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | I dont have **MANAGE_MESSAGES** Permission!');
 let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 99) return message.reply("**🛑 || يجب ان يكون عدد المسح أقل من 100 .**").then(messages => messages.delete(5000))
    if(!messagecount) args = '100';
    message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages));
    message.channel.send(`\`${args}\` : __عدد الرسائل التي تم مسحها __ `).then(messages => messages.delete(5000));
  }
  });

client.on('message' , message => {
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "ping")) {
 message.channel.send('Pong...').then((msg) => {
      msg.edit(`\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ping)} ms.\`\`\``);//حقوق دايموند كودز
 })
  }  
 });

client.on('message', message => {
    let filter = m => m.author.id === message.author.id;
    let www = message.guild.channels.find(`name`, "polls");
    if(message.content.startsWith(prefix + "poll")) {
        message.reply('A').then(m => m.delete(3000));
        let bi;    
        message.channel.awaitMessages(filter, { //???? ???????#2824
 
            max: 1,
 
            time: 90000,
 
            errors: ['time']
 
          })
          .then(collected => {
              collected.first().delete();
              bi = collected.first().content;
    message.reply('B').then(m => m.delete(3000));
    let wi;
    message.channel.awaitMessages(filter, { //???? ???????#2824
 
        max: 1,
 
        time: 90000,
 
        errors: ['time']
 
      })
      .then(collected => {
          collected.first().delete();
          wi = collected.first().content;
var embed = new Discord.RichEmbed()
.setColor('RED')
.setTitle('New Poll')
.setDescription(`A: ${bi}
B: ${wi}`)
message.guild.channels.find(r => r.name === "polls").send(embed).then(res => {
res.react('🇦').then(() => res.react('🇧'));
});
      });
    });
};
});

client.on('message', message => {
    if (message.content.startsWith("رابط")) {
 
  message.channel.createInvite({
        thing: true,
        maxUses: 100,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("| :white_check_mark:  | :heart:  تم ارسال الرابط على الخاص  ")
      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
                .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`
**
---------------------
-[${message.guild.name}]  هذا هو رابط سيرفر
---------------------
-هذا الرابط صالح ل 100 مستخدم فقط
---------------------
-هذا الرابط صالح لمده 24 ساعه فقط
---------------------
**`)
      message.author.sendEmbed(Embed11)
    }
});

client.on('message', message => {
 
    if (message.content === "-lock") {
                        if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');
 
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false
 
           }).then(() => {
               message.reply("تم تقفيل الشات ✅ ")
           });
             }
if (message.content === "-unlock") {
    if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');
 
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true
 
           }).then(() => {
               message.reply("تم فتح الشات✅")
           });
             }
 
 
 
});

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith('-' + str);
}
 
function pluck(array) {
    return array.map(function(item) { return item['name']; });
}
 
function hasRole(mem, role) {
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
 
  }
 
 
var servers = {};
 
var q1 = "-quran 1"
 
var q2 = "-quran 2"
 
var q3 = "-quran 3"
 
var q4 = "-quran 4"
 
var q5 = "-quran 5"
 
var q6 = "-quran 6"
 
var q7 = "-quran 7"
 
var q8 = "-quran 8"
 
var q9 = "-quran 9"
 
var q10 = "-quran 10"
 
var q11 = "-quran 11"
 
var q12 = "-quran 12"
 
var q13 = "-quran 13"
 
var q14 = "-quran 14"
 
var q15 = "-quran 15"
 
var q16 = "-quran 16"
 
var q17 = "-quran 17"
 
var q18 = "-quran 18"
 
var q19 = "-quran 19"
 
var q20 = "-quran 20"
 
var q21 = "-quran 21"
 
var q22 = "-quran 22"
 
var q23 = "-quran 23"
 
var q24 = "-quran 24"
 
var q25 = "-quran 25"
 
 
function play(connection, message) {
    var server = servers[message.guild.id];
 
   server.dispatcher = connection.playStream(yt(server.queue[0], { fliter: "audionly" }));
 
    server.queue.shift();
 
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}
 
client.on("ready", () => {
    console.log(`Quran bot is in ${client.guilds.size} servers `)
});
 
client.on("message", message => {
                        if (message.content === q1 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);  
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=E1Y0pDXNPu8', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
      });
  }
 
                        if (message.content === q2 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=IEC8wi6wpGg', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
      });
  }
 
                            if (message.content === q3 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=cjmh_-4VY9I', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
      });
  }
 
                            if (message.content === q4 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=L0s4ij88LTU', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
                              if (message.content === q5 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=Je1QLnXRGjE', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
                                  if (message.content === q6 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=2Q--P6Fxyl0', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
                                      if (message.content === q7 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=yM-nVWU0wfU', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q8 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=fw2ByWafkV0', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q9 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=tuYP5JktEn0', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q10 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=RGnYiavNAJI', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q11 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=W7KqMe44aGo', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q12 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=hXVqZRX9FUM', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q13 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=Up4iDBOjGU8', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q14 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=YwClCEV1AWA', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q15 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=20-hBBasCGE', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q16 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=E4dbht9oza4', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q17 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=9QhMMkQ_VSg', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q18 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=UerpNxFxg0w', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q19 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=-ulcJ6m0euU', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q20 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`يرجى أن تكون في قناة صوتيه أولا!`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=MMYT9P_OZUo', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q21 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=5OERHMfuI7E', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q22 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=VMSWdncvHqo', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q23 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`يرجى أن تكون في قناة صوتيه أولا!`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=JrNFbjseBcg', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q24 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=9CN-31h_wK4', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
                                      if (message.content === q25 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`**عزيزي , اذا اردت الإستماع للقرآن الكريم فعليك الدخول لقناة صوتية**`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=vSOl00Y-WDo', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
 
 
  if(message.content === "-stop" ) {
                var servers = {};
 
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
 
  }
 
 if(message.content === "server2quran") {
   message.channel.send(` QuranBot
شكرا لإستعمال البوت | Thanks You
 `)
 }
 
 
});

const developers = ["720115877873451048"] // ايدي صاحب البوت
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
 
  if (message.content.startsWith(prefix + 'ply')) {
    client.user.setGame(argresult);
      message.channel.send(`**✅   ${argresult}**`)
  } else
     if (message.content === (prefix + "leave")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith(prefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else
  if (message.content.startsWith(prefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else
  if (message.content.startsWith(prefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`**✅**`)
  }
  if (message.content.startsWith(prefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(prefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});

client.on("message", message => { 
// الكود منشور لوجه الخير , لا نحلل استخدامه في السبام وما الى ذلك
// اللهم اني بلغت اللهم فشهد
  var az = [
    '**سبحان الله العلي العظيم**',
    '**الحمد لله رب العالمين**',
    '**لا تنسى ذكر الله **',
    '**اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ. **',
    '**قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ. **',
    '**قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ **',
    '** أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْ**',
    '**اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ . **',
    '**رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً.  **',
    '** اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك. **',
    '**حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.  **',
    '**بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم. **',
    '**اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور.  **',
    '**اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ.  **',
    '**أسْتَغْفِرُ اللهَ وَأتُوبُ إلَيْهِ  **',
    '**لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ.  **',
    '** اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا.**',
  ]
  // مصدر الأذكار موقع
  // https://www.islambook.com/azkar/1/
  // كتابة الكود : AboKhalil
let romname = "・❱-الشات-العام";
 
  let args = message.content.split(" ");
  command = args[0];
  if (command === `${prefix}startazkar`) {
      if (!message.guild.member(message.author).hasPermission("ADMINISTATOR")) {
        message.channel.send('**يجب ان تكون لديك خاصية `administrator` **');
    } else { 
    setInterval(() => {
      azkar = az[Math.floor(Math.random() * az.length)];
      let sendrom = message.guild.channels.find('name', `${romname}`)
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("[ اذكار ]")
      .setDescription(azkar)
      sendrom.send(embed);
    }, 360000);
   }
  } 
});// By AboKhalil




                      
 
client.login(process.env.TOKEN);
