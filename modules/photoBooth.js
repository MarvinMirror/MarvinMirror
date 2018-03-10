var watermark = require("watermarkjs");
var manageDOM = require("../src/manageDOM");
var Raspistill = require("node-raspistill").Raspistill;
var options = {
	noPreview: false,
	outputDir: "/home/pi/Pictures/Photo",
	encoding: "jpg",
	width: 1024,
	height: 768
};

function showIMG(name){
	manageDOM.buildPopup();
	manageDOM.array2Div(["photobooth"], "popup");
	let popup = document.getElementById("popup");
	let photobooth = document.getElementById("photobooth");
	popup.appendChild(photobooth);
	var showPhoto = document.createElement("img");
	photobooth.className = "photobooth center-div";
	photobooth.appendChild(showPhoto);
	showPhoto.src = "/home/pi/Pictures/Photo/"+ name + ".jpg";
	watermark(["/home/pi/Pictures/Photo/" + name + ".jpg", "../img/42_Logo.png"]).image(watermark.image.lowerLeft(0.5));
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
			}, 3000);
			setTimeout( () => {
				showIMG(options.fileName);
			}, 4000);
		})
		.catch(console.error);
}

module.exports = photo;