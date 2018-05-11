/******************************************************************************\
**  __  __          _______      _______   ___  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |    _/|_    /| |  | |  _  /       Anastasia Zimina           **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var waitingInput = require('../config/config.js').waitingInput;
var waitingTime = require('../config/config.js').waitingTime;

var send_message = require('../src/controller.js').message;

var Input = require("../src/mongoDB").Models.Input;

function accessDB(n, callback, source) {
    Input.findOne({source: source})
    .then(data => {
        if (data != null) 
        {
            Input.deleteOne({source: source}, function(err, obj) {console.log("deleted")});
            n = waitingInput;
            if (data.message != "") callback(data.message)
            else send_message("The input you submitted was empty.")
        }
        else {
            if (n < waitingInput) 
            { 
                n++; 
                setTimeout(function() {accessDB(n, callback, source)}, 2000);
            }
        }
    })
}

function get_Input(callback) {
    manageDOM.inputPopup('form', "http://bit.ly/marvinmirror", waitingTime);
    accessDB(0, callback, 'Heroku_app');
}

function get_Email(callback) {
    manageDOM.inputPopup('email', "http://bit.ly/marvinmirrorEmail", waitingInput*2000);
    accessDB(0, callback, 'Heroku_app_email');
}
module.exports = get_Input

module.exports.get_Email = get_Email
