//We are currently using version 13 of discord.js instead of the newer versions because some tools / packages wouldn't work with the newer versions
//We are setting up a .gitignore file which tells git to avoid tracking / adding certain files when our project is uploaded to Github as a repository

const Discord = require("discord.js");

require("dotenv").config();
//This line allows us to load all dotenv variables into a global variable that can be accessed anywhere in the code using process.env.TOKEN. We know that servers like Heroku or Glitch or other similar kind of platforms are set up to use .env files directly but when you want to use a .env in Node , We need to require "dotenv" node package  for the .env file to work.
//The config function in dotenv package tells Node to load all the values from .env file
//We need to also install the "dotenv" as a dependency in our project for the require line to work

const BOTTOKEN = process.env.TOKEN;
//contains token which helps us in accessing our discord bot
//We use environment(.env) variables to seperate the important / restricted TOKENS or KEYS from our code so that our code can be easily shared in public i.e through a Github repo without compromising the security of those restricted TOKENS or KEYS.

//now we will create a botclient which will help us in accessing our discord api , we will also setup the client with some predefined parameters called Intents which  were introduced by Discord so bot developers can choose which events their bot receives based on which data it needs to function.If we don't specify intents disocrd.js might throw out an error..
// more on intents can be found here -> https://discordjs.guide/popular-topics/intents.html#privileged-intents

const client = new Discord.Client({
  intents:[
    "GUILDS",
    "GUILD_MESSAGES"
  ]
});
//discord api represents  discord servers as GUILDS 

client.on("ready",()=>{
  console.log(`Logged in as ${client.user.tag}`)
})
//ready event listeners -> triggers when bot successfully logs in with provided token so when that event happens the bot will run this function.
//here we are passing specefic events our bots acts on as our first parameter
//client.user.tag is the username of the concerned bot that we are logged in with

client.on("messageCreate", (message)=>{
  if(message.content=== "Hi General_Testing" || message.content=== "Hello General_Testing" ){
    message.reply(`Welcome to the party ${message.author}`);
  }
  console.log("message replied");
})
//this is our first bot command "messageCreate" which will be triggered when a bot sees someone send a message on the server
//we have a message as our second parameter because whenever this event is triggered discord will also pass in the information about the message that was sent through this
// Note -> It is necessary to give all intent permissons to our discord bot in the bot dashboard in developer portal for it to respond 

client.login(BOTTOKEN);//helps us in logging into to our bot and to stop the bot from continousally running on our system , we terminate it in the terminal using ctrl+c
//on our discord bot dashbard , we can move on to Oauth and then to url generator to specify what permissions our bot has and what it can do in a server. Now we generate a url which will help in authorizing our bot to access our server.




