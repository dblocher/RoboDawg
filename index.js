require('dotenv').config();
//add AWS service access
var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var lexruntime = new AWS.LexRuntime();


AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.author.id != '788062078140153868') {
    var params = {
        botAlias: '$LATEST', /* required, has to be '$LATEST' */
        botName: 'RoboVapeDawg', /* required, the name of you bot */
        inputText: msg.content, /* required, your text */
        userId: 'DiscordMessage', /* required, arbitrary identifier */
      };
      lexruntime.postText(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          if ((data.message =='Sorry, can you please repeat that?') || (data.message =='Sorry, I could not understand. Goodbye.')) {
            console.log(data.message);
          } else {
            msg.channel.send(data.message);   // successful response
          };
        };         
      });
  }
});
