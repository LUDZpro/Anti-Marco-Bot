const discord = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
// the bot client
const bot = new discord.Client();
// all marco bots ids
let marcobot = ["559169425488740392"];
// bot owners
let owners = ["546443322286407751", "401741067470503946", "398310259275464706"]
let stop = true;
bot.on("message",
    (message) => {
       try {
        if ( owners.includes(message.author.id) )
        {
            if(message.content == '$stop') stop = false;
            else if (message.content == '$start') stop = true;
            else if (message.content == '$marcobotlist')marcobot.map(
                e => message.channel.send("<@"+e+">")
            )
            else if (message.content.startsWith('$marcobotadd')) {
                let bottoblock = message.content.split(' ');
                if(bottoblock[1] && !marcobot.includes(bottoblock[1]))marcobot.push(bottoblock[1])
                else throw new Error("you should mension the Id of the user")
                message.delete(1);
            }
            else if (message.content.startsWith('$marcobotremove')) {
                let bottoblock = message.content.split(' ');
                if(bottoblock[1] && marcobot.includes(bottoblock[1]))marcobot.pop(bottoblock[1]);
                else throw new Error("you should mension the Id of the user")
                message.delete(1);
            }
            else if (message.content == '$help')
            message.channel.send(
                '```'+
                '$stop  -  to stop the deletion of marcos bots\n'+
                '$start -  to start deleting all marcos bots comments\n'+
                '$marcobotadd  id - block an new bot from talking\n'+
                '$marcobotremove  id - allow a bot to talk\n'+
                '$marcobotlist - list all marco users\n'+
                '```'
            )
        }
        if(marcobot.includes(message.author.id) && stop) message.delete(1);
       } catch (error) {
           message.author.send(error.message);
       }
    }
);

bot.login(process.env.token);