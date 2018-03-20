var count = 1;
var Raspistill = require('node-raspistill').Raspistill;
var options = {
        noPreview: false,
        outputDir: '/home/pi/Pictures/Photo',
        encoding: 'jpg',
        width: 800,
        height: 600,
//      time:undefined,
//      iso: 200,
//      shutterspeed: undefined,
//      contrast: 10,
//      brightness: 30,
//      saturation: 10
};

function showIMG(name){
console.log('time');
	document.getElementById('photo').src = '/home/pi/Pictures/Photo/'+ name + '.jpg';
}

function snap(){

	options.fileName = Math.floor((Math.random()*999) + 1);
	console.log(options);

	var new_photo = new Raspistill(options);
	new_photo.takePhoto()
   		.then((photo) => {})
   		.catch((error) => {});
setTimeout(function(){showIMG(options.fileName);}, 6000);
}
