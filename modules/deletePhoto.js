var shell = require('shelljs');

function deleted(){
shell.cd('/home/pi/Pictures/');
shell.rm('-fr', 'Photo/');
}
