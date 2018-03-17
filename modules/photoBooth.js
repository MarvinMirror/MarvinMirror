var manageDOM = require("../src/manageDOM");

var nodemailer = require('nodemailer')
var path = require("path");
var jimp = require('jimp');
var photoConfig = require('../config/config.js').Photo_booth
var Raspistill = require("node-raspistill").Raspistill;
var get_input = require('../src/get_input').get_Email;

let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: "magmir42@gmail.com",
        clientId: "658464642264-0f1i6ddj7o6kt7ta4dvc9mptgoum1ad4.apps.googleusercontent.com",
        clientSecret: "rSHO7igjaylyyTEqSTa24IR4",
        refreshToken: "1/WnFWi0KdigXfaa39xBbUYqNpQM0Uw59h-rQOPycc3PU",
        accessToken: 'ya29.GluABfTgZXrg5hvVxyvnFVldhuCg7gVVZhqNrzgHvqVywdsqahMHDsfTagCWp23t7NGtWxbALMGF4gnnGOK5iRy7MtbJNdqJNmbfOG5Rt8mecDGm7RMgjNqxS5l4',
        expires: 1484314697598
    }
}

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
	manageDOM.buildPopup();
	manageDOM.array2Div(["photobooth"], "popup");
	let popup = document.getElementById("popup");
	let photobooth = document.getElementById("photobooth");
	popup.appendChild(photobooth);
	var showPhoto = document.createElement("img");
	photobooth.className = "photobooth center-div";
	photobooth.appendChild(showPhoto);
	showPhoto.src = photoConfig.outputDir + name + ".jpg";
}

function send_to_mail(email, path, filename)
{
    var mailOptions = {
        from: 'magmir42@gmail.com', 
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
    console.log(path)
    console.log(filename)
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) console.log(error);
        else console.log("Email sent: " + info.response);
    }); 
}


function send_by(email) {
   var pics = [path.join(__dirname, '..', '/img/42_Logo.png'), photoConfig.outputDir + name + ".jpg"]
   var jimps = [];
   for (var i = 0; i < 2; i++) {jimps.push(jimp.read(pics[i]))}
   Promise.all(jimps).then(function(data) {
    console.log(jimps)   
    return Promise.all(jimps)
    }).then(data => {
        data[1].composite(data[0], 0,data[1].bitmap.height - data[0].bitmap.height);
        data[1].write(photoConfig.outputDir + name + ".jpg");
        return([photoConfig.outputDir, name + ".jpg"])
    }).then(data => send_to_mail(email, data[0], data[1]))
    .catch(err => console.log(err))
}

function photo(){

	options.fileName = Math.floor((Math.random()*999) + 1);
	//console.log(options);

	var new_photo = new Raspistill(options);
	new_photo.takePhoto()
		.then(() => {
			setTimeout( () => {
				var sound = new Audio("../img/photo_sound.mp3");
				sound.play();
			}, 500);
			setTimeout( () => {
				showIMG(options.fileName);
			}, 1000);
		})
		.then(() => {
			setTimeout( () => {
				get_input(send_by);
			}, 1000);
		})
			.catch(console.error);
}

module.exports = photo;