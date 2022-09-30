//Start again at second video at 18:30

//canvas package will give us the ability to draw shapes, text and images onto a canvas which than can be converted into an image file for it to be uploaded on discord for our welcome message
//This file will hold the async function responsible for creating an image on canvas

const Canvas = require('canvas');

const Discord = require("discord.js")

const background = "https://i.imgur.com/iGs0XEl.png";
//link to our background image to be used in the welcome message

const dim = {
  height: 670 , 
  width : 1200 , 
  margin : 50
}
//This is the dimension where our background image will lie in i.e our canvas

const av = {
  size : 256,
  x : 480,
  y : 170
}
//The size is in pixels
//our image will have the dimensions of 1200 x 670 and cordinates for rest of the message would be adjusted to this background size.
//av is short for avatar and x / y coordinates are the dimensions of our avatar image will lie in. for a different size , we will have to calculate the value of x and y cordinates to figure out a size that will fit

const generateImage = async(member)=>{
  let username = member.user.username;
  let discrim = member.user.discriminator;
  let avatarURL = member.user.displayAvatarURL({
    format : "png" ,
    dynamic : false , 
    size:av.size
  });
  const canvas = Canvas.createCanvas(dim.width , dim.height);
  const ctx = canvas.getContext("2d");//context object

  const backimg = await Canvas.loadImage(background);//loading our background image which will be drawn on our canvas
  ctx.drawImage(backimg,0 ,0) //our loaded image will be now drawn into our canvas using the context object.Here 0,0 signifies the top left hand corner of our canvas i.e starting point from where our canvas will start to be filled with the background image

  ctx.fillStyle = "rgba(0,0,0,0.70)"; //this will help us add a black tinted box which will help us improve the readability of text on our canvas from the background image.Here the 0.8 represents the transparency of our text which is 80%
  ctx.fillRect(dim.margin,dim.margin,dim.width - 2*dim.margin,dim.height - 2*dim.margin);
  //This fills our canvas with the rectangle with provided dimensional constraints starting with coordinates from left hand side moving clockwise.this will eventually draw the black tinted box we want on our canvas

  const avimg = await Canvas.loadImage(avatarURL);//loading the avatar image to put on our canvas

  ctx.save();//saves our current context

  //To give a circular shape to our avatar image on our canvas , we will have to trim by clipping which is selecting a portion of image than pasting it on our canvas so it only appears on the selected portion.To draw on this selection we will use something called the arc tool which draws in a circle for our image to fill in
  
  ctx.beginPath();
  ctx.arc(av.x + av.size/2 , av.y + av.size/2 , av.size/2 , 0 ,Math.PI * 2 , true)//here the first to parameters are coordinates to center of avatar and the third parameter signifies the radius of the circle the avatar image will fill in.The later 2 parameters signifies the angle at which the arc will work on and to create a circle with arc , we require it to start from 0 and move to 2 pi to do a full 360 to create a circle.The last parameter signifies if we are moving anticlockwise or not
  ctx.closePath();
  ctx.clip()//selecting the circle we created to fill our avatar image in.

  ctx.drawImage(avimg,av.x,av.y);//the last two parameters centers our avatar image on the context
  ctx.restore();//We can now restore rest of the image context we saved earlier in ctx.save() , which will restore the background we worked in along with selected portion of avatar image.

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  //the above two lines would set how our text input will look on the welcome image banner

  ctx.font = "50px Roboto";
  ctx.fillText("Welcome" , dim.width/2 , dim.margin+70);
  // The above two lines would set our Welcome text with size as 50px with Roboto font and will further draw in the text input at provided coordinates

  ctx.font = "60px Roboto";
  ctx.fillText(username+"#"+discrim , dim.width/2 , dim.height - dim.margin-125);
  //This will draw in the text containing the welcomed user name and discrim at provided coordinates with font type and dimensions provided.

  ctx.font = "40px Roboto";
  ctx.fillText("to the server",dim.width/2 , dim.height-dim.margin-50);
  //this will draw in our phrase to the server on the welcome banner

  //now we will convert our canvas to an image and upload it on discord
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),"Welcome.png"); //Our image will be sent as an attachement to welcome message , the .buffer() will put our data into a format that our message attachment function can take in and create a image with a particular format
  return attachment;
}
//Here the member parameter is from the Guild member object which contains an array of all user objects from the guild
//member's user object gives us access to properties like username, id , tag discriminator etc for a user of that guild.The user represents a base entity of a guild , it maybe a normal user or a bot which is owned by some other user.
//discriminator is the four digit number after hash at the end of the username
//avatarURL is used to fetch the avatar of the user (Profile image) 
//format means extension type of the image we will be generating like jpeg , png etc
//dynamic represents if our image is a gif or not
//We will also create a context object along these dimensions provided in canvas which will be used to add the image and text to the image i.e ctx where our things will be actually drawn on the canvas and how it will be drawn

module.exports = generateImage; //exporting our generated image attachement to our index.js where our bot will eventually send the attachement when the event will eventually occur

