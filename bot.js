const Discord = require('discord.js');
const fs = require('fs');
const yt = require('ytdl-core');
const dateFormat = ("dateformat");
const ms = require('parse-ms');
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



client.on('message', msg => {
  if (msg.content.toLowerCase().startsWith(prefix + 'order')){

    var abdel = msg.content.split(" ").slice(1).join(" ")
    var order = '764160060669558866' //ايدي روم الطلبات
    var order2 = '764388254220550144' //ايدي الروم يلي يترسل فيه الطلب

  if(msg.channel.id !== (order)) return msg.channel.send(`**You Can't Order Here Dude, Sorry But Those Are The Rules.**`);
  if(!order) return message.reply("There is no room have the name orders");
    msg.channel.send('**Your Order Sent, Thank You.**')
    msg.delete({timeout:5000})
    
   
        var ultra = new Discord.MessageEmbed()
         .setColor('RANDOM')
         .setThumbnail(msg.author.avatarURL())
         .setTitle('New Order!')
         .setDescription(`
         ✠▬▬▬▬▬▬ஜ:radioactive:❦۞❦:radioactive:ஜ▬▬▬▬▬▬✠
        
> ${abdel}
        
         ✠▬▬▬▬▬▬ஜ:radioactive:❦۞❦:radioactive:ஜ▬▬▬▬▬▬✠
         `)
         .setTimestamp()
         .setFooter('New Order In The Shop!')
         client.channels.cache.get(order2).send(`https://cdn.discordapp.com/attachments/749238853117804554/757981001585655960/New_Project_27_F31615F.gif`)//هنا رابط الخط
         client.channels.cache.get(order2).send(`**That Order Sent By : ☞ ** ${msg.author}`)
         client.channels.cache.get(order2).send(ultra).then(m => {
          msg.react("✅")  
          }).catch(() => {
          return msg.react("❌")
  });
          
}});

client.on('message', msg => {
   if (msg.content === '**Your Order Sent, Thank You.**'){
   
   msg.delete({timeout:5000});
  }
});

//✠▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ:radioactive:❦۞❦:radioactive:ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬✠


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

client.on("message", msg => {
//Shady Craft YT#4176
  if (msg.author.bot) return;
//Shady Craft YT#4176
  if (msg.content === "-links") {//Shady Craft YT#4176
    client.guilds.forEach(g => {//Shady Craft YT#4176
      
      let l = g.id;
      g.channels
        .get(g.channels.first().id)
        .createInvite({//Shady Craft YT#4176
          maxUses: 10,
          maxAge: 86400
        })//Shady Craft YT#4176
        .then(i =>
          msg.channel.send(`
        **
        اقصى الاستخدام : mem 10
        رابط السيرفر : <https://discord.gg/${i.code}>
        السيرفر : ${g.name} | Id : ${g.id}//!P H'                 Kᴶᴷ#2247
        صاحب السيرفر : ${g.owner} 
        **
        `)
        ); //g.owner.id
    });
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
let romname = "الشات-العام";
 
  let args = message.content.split(" ");
  command = args[0];
  if (command === `-azkar`) {
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

client.on("message", message => { // تقديم اداره
  if(message.content.startsWith("-تقديم")) {
        if(!message.channel.guild) return;
                if(message.author.bot) return;
        let channel = message.guild.channels.find("name", "تـقـديـم-الادارة")
            if(channel) {
            message.channel.send( message.member + '`1`').then( (m) =>{
              m.edit( message.member + ', اسمك' )
              m.channel.awaitMessages( m1 => m1.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m1) => {
                  m1 = m1.first();
                  var name = m1.content;
                  m1.delete();
                  m.edit(message.member + '`2`').then( (m) =>{
                      m.edit( message.member + ', عمرك' )
                      setTimeout(() => {
                        m.delete()
                      }, 10000);
                      m.channel.awaitMessages( m2 => m2.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m2) => {
                          m2 = m2.first();
                          var age = m2.content;
                          m2.delete()
                          message.channel.send( message.member + '`3`').then( (m) =>{
                            m.edit( message.member + ' كم لك بالديسكورد' )
                            setTimeout(() => {
                              m.delete()
                            }, 10000);
                            m.channel.awaitMessages( m1 => m1.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m3) => {
                                m3 = m3.first();
                                var ask = m3.content;
                                m3.delete();
                                message.channel.send( message.member + '`4`').then( (m) =>{
                                  m.edit( message.member + ', ليش تريد تصير ضمن طاقم الادارة ؟ !' )
                                  setTimeout(() => {
                                    m.delete()
                                  }, 10000);
                                  m.channel.awaitMessages( m1 => m1.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m4) => {
                                      m4 = m4.first();
                                      var ask2 = m4.content;
                                      m4.delete();
                                      message.channel.send( message.member + '``5``').then( (m) =>{
                                        m.edit( message.member + ', مدة تفاعلك' )
                                        m.channel.awaitMessages( m1 => m1.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m5) => {
                                            m5 = m5.first();
                                            var ask3 = m5.content;
                                            m5.delete();
                      m.edit(message.member + ', Data is being sent').then( (mtime)=>{
                        setTimeout(() => {
                          let embed = new Discord.RichEmbed()
                          .setAuthor(message.author.username, message.author.avatarURL) 
                          .setColor('#c3cdff')
                        .setTitle(`\`Apply Administartion\` \n سوف يتم الرد عليك قريبا من الادارة , \n > ID: ${message.author.id}`)
                        .addField('> \`Name:\`', ` ** ${name} ** ` , true)
                        .addField('> \`Age:\`', ` ** ${age} ** ` , true)
                        .addField('> \`Your period of stay Discord:\`',`** ${ask} ** ` , true)
                        .addField('> \`Do you know all the laws:\` ',` ** ${ask2} ** ` , true)
                        .addField('> \`Duration your reaction: ?\`',` ** ${ask3} ** ` , true)
                        .addField('> __Your Account Created: __',` \`${message.author.createdAt} \` ` , true)
                        channel.send(embed)
                        }, 2500);
                        setTimeout(() => {
                          mtime.delete()
                        }, 3000);

                  })
                })
                })
              })
            })
          })
        })
        })
              })
          })
        })
    }
}
        });
        client.on('message',async message => {
          let mention = message.mentions.members.first();
          if(message.content.startsWith("-accept")) {
          if(!message.channel.guild) return;
          let acRoom = message.guild.channels.find('name', 'قــبــول-رفــض');
          if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;
          if(!mention) return message.reply("Please Mention");
         
          acRoom.send(`> اهلا بك تم قبولك ك اداري في السيرفر \n ${mention} Discord staff - :partying_face: `)
          }
        });

client.on('message',async message => {
  let mention = message.mentions.members.first();
  if(message.content.startsWith("-deny")) {
  if(!message.channel.guild) return;
  let acRoom = message.guild.channels.find('name', 'قــبــول-رفــض');
  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return;
  if(!mention) return message.reply("Please Mention");
 
  acRoom.send(`> نعتذر منك لايمكننا قبولك في الوقت الحالي \n ${mention} - :pleading_face: `)
  }
});

client.on('message', msg=>{
    var prefix = '-';//البريفكس
    let roodx = msg.content.split(" ").slice('1').join(" ")
    var channelId = msg.guild.channels.find('758303302122995752','//id channel ')
    if(msg.author.bot)return;
    if(msg.content.startsWith(prefix + 'order'))//الامر
   {
     msg.delete()
 
    var roodx1 = new Discord.MessageEmbed()
    .setTitle(`» طلب جديد من 「${msg.author.username} 」`)
    .setColor('#811241')//color
    .setDescription(`${roodx}`)
    channelId.send(roodx1);
   }
  });

/*
ما حبييت احط حقوقي بالكود بس اذا كتبت علي الكود حقوقك ما بيصير شي حلو ؟ 
!    Me » Ashour ❤#0018 
*/
client.on("message", message =>{//Ashour
  if(message.content.startsWith(prefix + "credits")){//Ashour
 let user = message.mentions.users.first() || message.author;//Ashour
    let bal = db.fetch(`money_${user.id}`)//Ashour
    if (bal === null) bal = 0;//Ashour
      return message.channel.send(`:bank: | **${user.username} , your account balance is** \`\`$${bal}\`\`.`)//Ashour
}});//Ashour
client.on("message", async message =>{//Ashour
if(message.content.startsWith(prefix + "daily")){//Ashour
    let timeout = 86400000/2 // 12 hours in milliseconds, change if you'd like.
  let amount = Math.floor(Math.random() * 1000) + 1;//Ashour
    let daily = await db.fetch(`daily_${message.author.id}`);//Ashour
    if (daily !== null && timeout - (Date.now() - daily) > 0) {//Ashour
        let time = ms(timeout - (Date.now() - daily));//Ashour
        message.channel.send(`:rolling_eyes: **| ${message.author.username}, your daily credits refreshes in ${time.hours}h ${time.minutes}m ${time.seconds}s .** `)//Ashour
    } else {
    message.channel.send(`:moneybag: **${message.author.username}, you got :dollar: ${amount} daily credits!**`)//Ashour
    db.add(`money_${message.author.id}`, amount)//Ashour
    db.set(`daily_${message.author.id}`, Date.now())//Ashour
    }}});//Ashour
client.on("message", async message =>{//Ashour
  if(message.content.startsWith(prefix + "trans")){//Ashour
    let args = message.content.split(" ").slice(2); //Ashour
    let user = message.mentions.members.first() //Ashour
    let member = db.fetch(`money_${message.author.id}`)//Ashour
    if (!user) {//Ashour
        return message.channel.send(`:rolling_eyes: | ** ${message.author.username}, I Cant Find a User**`)
    }//Ashour
    if (!args) {
        return message.channel.send(`:rolling_eyes: | **${message.author.username}, type the credit you need to transfer!**`)//Ashour
    }
    if (message.content.includes('-')) { //Ashour
      return message.channel.send(`:rolling_eyes: | **${message.author.username}, Type a Amount \`Not Negative\`**`)//Ashour
    }
    if (member < args) {//Ashour
        return message.channel.send(`:thinking: ** | ${message.author.username}, Your balance is not enough for that!**`)//Ashour
    }
    if(isNaN(args)) 
return message.channel.send(`:rolling_eyes: Numbers Only`)//Ashour
    message.channel.send(`:moneybag: **| ${message.author.username}, has transferred \`$${args}\` to ${user}**`)//Ashour
    user.send(`:atm:  |  Transfer Receipt \n\`\`\`You have received $${args} from user ${message.author.username} (ID: ${user.id})\`\`\``)//Ashour
    db.add(`money_${user.id}`, args)//Ashour
    db.subtract(`money_${message.author.id}`, args)//Ashour
}});//Ashour


client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  var command = message.content.toLowerCase().split(" ")[0];
  var args = message.content.toLowerCase().split(" ");
  if (command === `${prefix}user-time`) {
    if (!message.member.hasPermission(`ADMINISTRATOR`))
      return message.channel.send(`You need __administrator__ permissions`);
    if (!message.guild.member(client.user).hasPermission(`ADMINISTRATOR`))
      return message.channel.send(`I need __administrator__ permissions`);
    if (!args[1])
      return message.channel.send(`please send time by days ,\nexemple: 5`);
    if (isNaN(args[1])) return message.channel.send(`Only Number!`);
    await db.set(`crt_${message.guild.id}`, args[1]);
    message.channel.send(`Done`);
  } else if (command === `${prefix}user-toggle`) {
    if (!message.member.hasPermission(`ADMINISTRATOR`))
      return message.channel.send(`You need __administrator__ permissions`);
    if (!message.guild.member(client.user).hasPermission(`ADMINISTRATOR`))
      return message.channel.send(`I need __administrator__ permissions`);
    if (args[1] === `on`) {
      await db.set(`crr_${message.guild.id}`, args[1]);
      message.channel.send(`Done , toggle on`);
    } else if (args[1] === `off`) {
      await db.set(`crr_${message.guild.id}`, args[1]);
      message.channel.send(`Done , toggle off`);
    } else {
      message.channel.send(`on/off`);
    }
  }
});
 
client.on("guildMemberAdd", async member => {
  const millis = new Date().getTime() - member.user.createdAt.getTime();
  const now = new Date();
  dateFormat(now, "dddd, mmmm dS, yyyy");
  const days = millis / 1000 / 60 / 60 / 24;
  dateFormat(now, "dddd, mmmm dS, yyyy");
  let toggle;
  if (member.user.bot) return;
  let time = await db.fetch(`crt_${member.guild.id}`);
  let onoff = await db.fetch(`crr_${member.guild.id}`);
  if (!time) return;
  if (onoff) {
    toggle = onoff;
  } else {
    toggle = "off";
  }
  let userCt = days.toFixed(0);
  if (toggle === `off`) return;
  if (time > userCt) {
    member.kick(`Lower time created ${time}`);
  }
});


var top = require("./top.json");
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
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 5).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:speech_balloon: | TEXT LEADERBOARD**`, `${textStr}   \n\n\n **? | For More: \`${prefix}top text\`**`, true)  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send({
                embed: embed
            });
     //   if (!message.content.startsWith(prefix)) return;
  } else {
    if(message.content.startsWith(prefix + "top voice")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 5).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:microphone2: | VOICE LEADERBOARD**`, `${voiceStr}   \n\n\n **:sparkles: More?** \`${prefix}top voice\``, true)
  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()  
            message.channel.send({
                embed: embed
            });
      
    } else {
      if (message.content.startsWith(prefix + "reset voice")){
      var reset = ':white_check_mark:  ?? ????? ?????? ?????'
      var confirm = ' ??? ????? ??? ???? ????? ???? ???? ??????'
        
        message.channel.send(`**${confirm}**`).then(async msg => {
         await  msg.react("?")
        await   msg.react("?")
          const doma = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "?" && user.id === message.author.id, {time: 60000})
          const ziad = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "?" && user.id === message.author.id, {time: 60000})
doma.on("collect", async r => {
 
  
  
  msg.delete()
    
    msg.channel.send(`${reset}`)
  
})
  
  ziad.on("collect", async r => {
    
    msg.delete()
  })
      
        })
 
     //  break;
       // if (!message.content.startsWith(prefix)) return;
  } else {
       if(message.content.startsWith(prefix + "top")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 10).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
                }
            }).join("\n")}`;
            num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 10).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()  
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
            .addField("**TOP 5 TEXT :speech_balloon:**", `${textStr}  \n\n  **:sparkles: More?** \`${prefix}top text\``, true)
            .addField("**TOP 5 VOICE :microphone2:**", `${voiceStr} \n\n **:sparkles: More?** \`${prefix}top voice\``, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setColor("13B813");
            message.channel.send({
                embed: embed
            
  
            });
 
      
       
        }
  }
  }
  }
});


                      
 
client.login(process.env.TOKEN);
