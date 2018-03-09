var shell = require("shelljs");

function sensorStart() {
    shell.cd("/Users/jania/MarvinMirror/modules/");
    shell.sudo("node", "sensor.js");
}
