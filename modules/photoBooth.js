var manageDOM = require("../src/manageDOM");

var nodemailer = require('nodemailer')
var path = require("path");
var jimp = require('jimp');
var photoConfig = require('../config/config.js').Photo_booth
var Raspistill = require("node-raspistill").Raspistill;
var get_input = require('../src/get_input').get_Email;
var emailConfig = require('../config/config.js').Email;
var send_message = require('../src/controller.js').message;

let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: emailConfig.type,
        user: emailConfig.user,
        clientId: emailConfig.clientId,
        clientSecret: emailConfig.clientSecret,
        refreshToken: emailConfig.refreshToken,
        accessToken: emailConfig.accessToken,
        expires: 1484314697598
    }
}
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

var transporter = nodemailer.createTransport(smtpConfig)

function showIMG(name){
	let popup = document.getElementById("popup");
	let photobooth = document.createElement("photobooth");
	photobooth.id = 'photobooth';
	popup.appendChild(photobooth);
	var showPhoto = document.createElement("img");
	photobooth.className = "photobooth center-div";
	photobooth.appendChild(showPhoto);
	showPhoto.src = photoConfig.outputDir + name + ".jpg";
}

function send_to_mail(email, path, filename)
{
    var mailOptions = {
        from: emailConfig.user, 
        to: email,
        subject: 'Picture from Marvin Mirror', 
        text: 'Hello!',
        html: '<img src="cid:magmir42@gmail.com"/>',
        attachments: [{
            filename: filename, 
            path: path + filename,
            cid: 'magmir42@gmail.com' //same cid value as in the html img src
        }]
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) console.log(error);
        else {
			console.log("Email sent: " + info.response);
			send_message("Check you email, dude!");
			}
    }); 
}

function send_by(email) {
	showIMG(options.fileName)
   var pics = [path.join(__dirname, '..', '/img/42_Logo.png'), photoConfig.outputDir + options.fileName + ".jpg"]
   var jimps = [];
   for (var i = 0; i < 2; i++) {jimps.push(jimp.read(pics[i]))}
   Promise.all(jimps).then(function(data) {
    return Promise.all(jimps)
    }).then(data => {
        data[1].composite(data[0], 0,data[1].bitmap.height - data[0].bitmap.height);
        data[1].write(photoConfig.outputDir + options.fileName + ".jpg");
        return([photoConfig.outputDir, options.fileName + ".jpg"])
    }).then(data => send_to_mail(email, data[0], data[1]))
    .catch(err => console.log(err))
}

function photo(){

	options.fileName = Math.floor((Math.random()*999) + 1);

	var new_photo = new Raspistill(options);
	new_photo.takePhoto()
		.then(() => {
			setTimeout( () => {
				var sound = new Audio("../img/photo_sound.mp3");
				sound.play();
			}, 500);
		})
		.then(() => {
			get_input(send_by);
		})
			.catch(console.error);
}

module.exports = photo;
