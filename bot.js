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

client.on('message',message=>{
    if(message.content.startsWith(prefix + 'قفل')){
        if(message.channel.type == 'dm') return;
        if(message.author.bot) return;
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return  message.reply(`**MANAGE_CHANNELS ليس لديك خاصية** :negative_squared_cross_mark: `)	
        let everyone = message.guild.roles.cache.find(king => king.name === '@everyone');
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
            let everyone = message.guild.roles.cache.find(king => king.name === '@everyone');
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

client.on("message", message => {
    var args = message.content.split(" ");
    var sugg = message.content.split(" ").slice(1).join(" ");
    var prefix = "-"
    if (args[0] === prefix+"suggest"){
    if (!sugg){
        return message.channel.send("Usage : `"+args[0]+" <your suggest>`");
    }
    var chname = "suggestion"; // اسم الروم
    var sugchanel = message.guild.channels.cache.find(ch => ch.name == chname); // اسم الروم 
    if (!sugchanel){
        return message.channel.send("**i can't find a suggestion channel please create one with name `"+chname+"`**");
    }
    message.channel.send("Thanks you for suggestion , your suggestion has been Sent in <#"+sugchanel.id+">")
    message.delete();
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Suggestion By '+message.author.tag)
    .setDescription(`${sugg}`)
    sugchanel.send(embed).then(mes => {
    mes.react("⬆️").then(rec =>{
        mes.react("⬇️")
    })
    
    });
    }
});

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

client.on("message", message => {
	let avt = `${message.author.avatarURL}`;
  let args = message.content.split(" ")
	if(message.guild) return;
    if (message.content == prefix + "user"){
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

client.on('message', message => {
  if(message.content.split(' ')[0] == `${prefix}kick`){
  if(!message.guild || message.author.bot) return undefined;
      if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(':no_entry: | لا تمتلك صلاحية طرد الاعضاء!');
      if(!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.channel.send(':no_entry: | انا لا امتلك صلاحية طرد الاعضاء!');
      let args = message.content.split(" ").slice(1);
      let user = message.guild.members.get(message.content.split(' ')[1]) || message.mentions.members.first();
      let reason = message.content.split(" ").slice(2).join(" ");
      if(!user) return message.channel.send("نرجوا اتباع التنسيق الاتي: ogkick @Name والسبب");
      if(!reason) reason = 'No reason provided.';
      if(user.user.id === message.author.id) return message.channel.send(':no_entry: | لماذا تريد طرد نفسك؟');
      if(user.user.id === message.guild.owner.id) return message.channel.send(':no_entry: | محاولة فاشلة جميلة :3');
      if(message.guild.member(user.user).highestRole.position >= message.guild.member(message.member).highestRole.position) return message.channel.send(`:no_entry: | لا يمكنك طرد **${user.user.username}** لأن رتبته اعلي منك!`);
      if(message.guild.member(user.user).highestRole.position >= message.guild.member(client.user).highestRole.position) return message.channel.send(`:no_entry: | لا يمكنني طرد **${user.user.username}** لأن رتبته اعلي من رتبتي!`);
      if(!message.guild.member(user.user).kickable) return message.channel.send(`:no_entry: | لا يمكنني طرد **${user.user.username}** `);
      if(message.guild.member(user.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`:no_entry: | لا يمكننك طرد **${user.user.username}** لأنه يمتلك رتبة عالية!`);
      message.guild.member(user).kick(reason, user);
      message.channel.send(`:white_check_mark: | تم بنجاح طرد ${user.user.username} من السيرفر! :airplane: ``${reason}```);
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
                      
                      client.on('message', message => {  
    if (message.author.bot) return; 
    if (message.content.startsWith(prefix + 'clear')) { 
    if(!message.channel.guild) return message.reply(`** This Command For Servers Only**`); 
     if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`** You don't have Premissions!**`);
     if(!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`**I don't have Permission!**`);
    let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.reply(`** The number can't be more than **100** .**`).then(messages => messages.delete(5000))
    if(!messagecount) args = '100';
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages)).then(msgs => {
    message.channel.send(`** Done , Deleted `${msgs.size}` messages.**`).then(messages => messages.delete(5000));
    })
  }
});

client.on('message', message => {                      
    if(!message.channel.guild) return;
       if(message.content.startsWith(prefix + 'new')) {

     if(message.guild
      .member (message.author)
      .roles.find ("name" , "V")) return;
      let num = Math.floor((Math.random() * 4783) + 10);
   
      //Shady Craft YT#4176

message.channel.send(`يرجاء كتابة الرقم التالي: **${num}**`).then(m => {
        
//Shady Craft YT#4176
message.channel.awaitMessages(res => res.content == `${num}`, {
          max: 1,
          time: 60000,
          errors: ['time'],
        }).then(collected => {
          
          //Shady Craft YT#4176

message.member.addRole(message.guild.roles.find(c => c.name == "V"));
        
    message.guild
      .createChannel(`ticket-${message.author.id}`, "text")
      .then(c => {
        let role = message.guild.roles.find("name", "support");
        let role2 = message.guild.roles.find("name", "@everyone");
        let role3 = message.guild.roles.find("name", "support new");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(role3, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        
      
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
            `اهلا وسهلا انتظر السبورت يجو يساعدوك اكتب مشكلتك`
          )
          .setTimestamp();
        c.send({
          embed: embed
        })
    })
        })
      })
       }
  
      
        });
        
        //كود ترحيب مع الغاء و تفعيل وكود التوديع مع الغاء وتفعيل 

client.on("guildMemberAdd", member => {
  let channel = member.guild.channels.find("name", "welcome");
  let role = member.guild.roles.find("name", "welcome");
  let memberavatar = member.user.avatarURL;
  if (!role) return;
  if (!channel) return;
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField(":running_shirt_with_sash: | name :  ", `${member}`)
    .addField(
      ":loudspeaker: | نورت السيرفر يا قلبي",
      `Welcome to the server, ${member}`
    )
    .addField(":id: | user :", "**[" + `${member.id}` + "]**")
    .addField("➡| انت العضو رقم", `${member.guild.memberCount}`)

    .addField("Name:", `<@` + `${member.id}` + `>`, true)

    .addField(" الـسيرفر", `${member.guild.name}`, true)

    .setFooter(`${member.guild.name}`)
    .setTimestamp();

  channel.sendEmbed(embed);
});

client.on("guildMemberRemove", member => {
  var embed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`الله معاك :raised_hand::skin-tone-1: :pensive:`)
    .setDescription(
      `مع السلامه تشرفنا بك :raised_hand::skin-tone-1: :pensive: `
    )
    .addField(
      ":bust_in_silhouette:   تبقي",
      `**[ ${member.guild.memberCount} ]**`,
      true
    )
    .setColor("RED")
    .setFooter(
      `==== نــتــمــنــآ لــكــم آســتــمـــتــآع ====`,
      "https://cdn.discordapp.com/attachments/397818254439219217/399292026782351381/shy.png"
    );

  var channel = member.guild.channels.find("name", "goodbye");
  var role = member.guild.roles.find("name", "goodbye");
  if (!role) return;
  if (!channel) return;
  channel.send({ embed: embed });
});

client.on("message", async message => { //OMAR#6356
  if(message.content.startsWith(prefix + "bc")) { //OMAR#6356
    const args = message.content.split(" ").slice(1).join(" "); //OMAR#6356
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('لا تمتلك الصلاحيات الكافية');
    if(!args) return message.channel.send('يجب عليك  الرسالة'); //OMAR#6356
 //OMAR#6356
      let help = new Discord.RichEmbed() //OMAR#6356
          .setColor("RANDOM") //OMAR#6356
          .setThumbnail(message.author.avatarURL) //OMAR#6356
          .setDescription(`**انوع البرودكاست

          1- للكل بدون امبيد
          2- للكل بامبيد
          3- اونلاين بدون امبيد
          4- للالغاء
          **`);
         let typesMSG = await  message.channel.sendEmbed(help)
         var numbers = ["u0030u20E3", "u0031u20E3", "u0032u20E3", "u0033u20E3", "u0034u20E3", "u0035u20E3", "u0036u20E3", "u0037u20E3", "u0038u20E3", "u0039u20E3"]


       let r1 = await typesMSG.react(numbers[1]); //OMAR#6356
       let r2 = await typesMSG.react(numbers[2]); //OMAR#6356
       let r3 = await typesMSG.react(numbers[3]); //OMAR#6356
       let r4 = await typesMSG.react("❌"); //OMAR#6356




 let filter1 = (reaction, user) => reaction.emoji.name == numbers[1] && user.id == message.author.id;
 let filter2 = (reaction, user) => reaction.emoji.name == numbers[2] && user.id == message.author.id;
 let filter3 = (reaction, user) => reaction.emoji.name == numbers[3] && user.id == message.author.id;
 let filter4 = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;
 if (!typesMSG) return;

 let f1 = typesMSG.createReactionCollector(filter1, { //OMAR#6356
     time: 18000 //OMAR#6356
 });
 let f2 = typesMSG.createReactionCollector(filter2, { //OMAR#6356
     time: 18000
 }); //OMAR#6356
 let f3 = typesMSG.createReactionCollector(filter3, { //OMAR#6356
     time: 18000
 });
 let f4 = typesMSG.createReactionCollector(filter4, { //OMAR#6356
     time: 18000
 });


  

f1.on('collect', async r => { //OMAR#6356
  await typesMSG.delete();
  message.guild.members.filter(m => m.presence.status !== 'all').forEach(m => {
    m.send(`${args}n ${m}`);
    })
    message.channel.send(`تم الارسال`); 
  
}); //OMAR#6356

f2.on('collect', async r => {
await typesMSG.delete();
message.guild.members.forEach(m => {
  var bc = new Discord.RichEmbed()
  .setThumbnail(message.author.avatarURL)
  .addField('# | الراسل', message.author) //OMAR#6356
  .addField('# | الرسالة ', args)
  .addField('# | السيرفر', message.guild.name) //OMAR#6356
  .setColor('RANDOM')
  m.sendMessage(bc)
});
message.channel.send(`تم الارسال`)
}); //OMAR#6356

f3.on('collect', async r => {
await typesMSG.delete();
message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {
  m.send(`${args}n ${m}`); //OMAR#6356
  })
  message.channel.send(``${message.guild.members.filter(m => m.presence.status !== 'online').size}` : عدد الاعضاء المستلمين`); 
});
 //OMAR#6356
f4.on('collect', async r => {
await typesMSG.delete();
message.channel.send('تم الالغاء بنجاح') //OMAR#6356
}); //OMAR#6356


  } //OMAR#6356

}); //OMAR#6356


 
 
client.login(process.env.TOKEN);
