var waitingTime = require('../config/config.js').waitingInput;

var send_message = require('../src/controller.js').message;

var Input = require("../src/mongoDB").Models.Input;

function accessDB(n, callback, source) {
    Input.findOne({source: source})
    .then(data => {
        if (data != null) 
        {
            Input.deleteOne({source: source}, function(err, obj) {console.log("deleted")});
            n = waitingTime;
            if (data.message != "") callback(data.message)
            else send_message("You sent me an empty string! <br>Do you think I'm stupid?")
        }
        else {
            console.log("nothing there")
            if (n < waitingTime) 
            { 
                n++; 
                setTimeout(function() {accessDB(n, callback, source)}, 2000);
            }
            else {
                console.log("done");
                send_message("I lost you somewhere")
            }
        }
    })
}

function get_Input(callback) {
    manageDOM.inputPopup('form', "http://bit.ly/marvinmirror");
    accessDB(0, callback, 'Heroku_app');
}

function get_Email(callback) {
    manageDOM.inputPopup('email', "http://bit.ly/marvinmirrorEmail");
    accessDB(0, callback, 'Heroku_app_email');
}
module.exports = get_Input

module.exports.get_Email = get_Email
