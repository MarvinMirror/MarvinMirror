var manageDOM = require("../src/manageDOM");
var marvinReacts = require("../src/controller");
var nodemailer = require("nodemailer");
var path = require("path");
var jimp = require("jimp");
var photoConfig = require("../config/config.js").Photo_booth;
var Raspistill = require("node-raspistill").Raspistill;
var get_input = require("../src/get_input").get_Email;
var send_message = require("../src/controller.js").message;

//if time is not set it'll be 5sec.

var options = {
	noPreview: false,
	outputDir: photoConfig.outputDir,
	encoding: "jpg",
	width: photoConfig.width,
	height: photoConfig.height,
//  time:undefined, 	
//  iso: 200,	
//  shutterspeed: undefined,	
//  contrast: 10,	
//  brightness: 30,	
//  saturation: 10
};

function showIMG(name){
	let popup = document.getElementById("popup");
	console.log("here should be photo");
	let photobooth = document.createElement("div");
	photobooth.id = "photobooth";
	popup.appendChild(photobooth);
	var showPhoto = document.createElement("img");
	photobooth.className = "photobooth center-div";
	let qr = document.getElementById("qr");
	photobooth.appendChild(showPhoto);
	photobooth.appendChild(qr);
	showPhoto.src = photoConfig.outputDir + name + ".jpg";
	showPhoto.className = "snapshot";
}

function send_to_mail(email, path, filename)
{
	var mailOptions = {
		from: process.env.MARVIN_GMAIL_USER, 
		to: email,
		subject: "Picture from Marvin Mirror", 
		text: "Hello!",
		html: "<img src=\"cid:magmir42@gmail.com\"/>",
		attachments: [{
			filename: filename, 
			path: path + filename,
			cid: "magmir42@gmail.com" //same cid value as in the html img src
		}]
	};
	let smtpConfig = {
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		type: "OAuth2",
		user: process.env.MARVIN_GMAIL_USER,
		clientId: process.env.MARVIN_GMAIL_CLIENT_ID,
		clientSecret: process.env.MARVIN_GMAIL_CLIENT_SECRET,
		refreshToken: process.env.MARVIN_GMAIL_REFRESH_TOKEN,
		accessToken: process.env.MARVIN_GMAIL_ACCESS_TOKEN,
		expires: 1484314697598
	}
};
	var transporter = nodemailer.createTransport(smtpConfig);
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
			send_message("Hmmm! You gave me bad email:(")}
		else {
			console.log("Email sent: " + info.response);
			send_message("Check your email, dude!");
		}
	}); 
}

function count_down(n)
{
	let content = document.getElementById("content");
	if (n >= 0)
	{	
		content.innerHTML = "<div id='count_down' class='count_down'><p>" + n + "</div>";
		if (n == 0) {
			var sound = new Audio("../img/photo_sound.mp3");
			sound.play();
		}
		setTimeout(count_down, 1000, n-1);
	}
}

function send_by(email) {
	marvinReacts.process_gif("popup");
	var pics = [path.join(__dirname, "..", "/img/42_Logo.png"), photoConfig.outputDir + options.fileName + ".jpg"];
	var jimps = [];
	for (var i = 0; i < 2; i++) {jimps.push(jimp.read(pics[i]));}
	Promise.all(jimps).then(function(data) {
		return Promise.all(jimps);
	}).then(data => {
		data[1].composite(data[0], 0,data[1].bitmap.height - data[0].bitmap.height);
		data[1].write(photoConfig.outputDir + options.fileName + ".jpg");
		return([photoConfig.outputDir, options.fileName + ".jpg"]);
	}).then(data => send_to_mail(email, data[0], data[1]))
		.catch((err) => {
			send_message("Something went wrong:(");
			console.log(err)});
}

function photo(){
	
	options.fileName = Math.floor((Math.random()*999) + 1);
	var new_photo = new Raspistill(options);
	count_down(5);
	new_photo.takePhoto()
		.then(() => {
			get_input(send_by);
			showIMG(options.fileName);
		})
		.catch(console.error);
}

module.exports = photo;
