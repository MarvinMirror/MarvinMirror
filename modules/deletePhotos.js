var shell = require('shelljs');

function deletePhotos(){
    shell.cd('/home/pi/Pictures/');
    shell.rm('-fr', 'Photo/');
setTimeout(function(){deletePhotos()}, 14400000); //every 4 hours delete the photos Dir
}
