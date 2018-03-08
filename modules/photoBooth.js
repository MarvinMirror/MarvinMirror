
var manageDOM = require('../src/manageDOM');
var Raspistill = require('node-raspistill').Raspistill;
var options = {
        noPreview: false,
        outputDir: '/home/pi/Pictures/Photo',
        encoding: 'jpg',
        width: 1024,
        height: 768,
//      time:undefined,
//      iso: 200,
//      shutterspeed: undefined,
//      contrast: 10,
//      brightness: 30,
//      saturation: 10
};

function showIMG(name){
        manageDOM.buildPopup();
        var showPhoto = document.createElement("img");
                showPhoto.src = '/home/pi/Pictures/Photo/'+ name + '.jpg';
    var show = document.getElementById('popup')
            show.appendChild(showPhoto);
}

function photo(){

        options.fileName = Math.floor((Math.random()*999) + 1);
        //console.log(options);

        var new_photo = new Raspistill(options);
        new_photo.takePhoto()
                .then((photo) => {})
                .catch((error) => {});
        
//        function saund() {
//            var saund = new Audio("./img/Photo_saund.mp3");
//                saund.play();
//        }
//    setTimeout(function(){ saund(); }, 3000);
setTimeout(function(){showIMG('composite-image');}, 6000);
}
//options.fileName
//watermark(['/img/forest.jpg', '/img/logo.png'])
//  .image(watermark.image.lowerRight(0.5))
//  .then(function (img) {
//    document.getElementById('alpha-image').appendChild(img);
//  });

module.exports = photo;