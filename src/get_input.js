var waitingTime = require('../config/config.js').waitingInput;

var send_message = require('../src/controller.js').message;

var Input = require("../src/mongoDB").Models.Input;

function accessDB(n, callback, Model, source) {
    Model.findOne({source: source})
    .then(data => {
        if (data != null) 
        {
            Model.deleteOne({source: source}, function(err, obj) {console.log("deleted")});
            n = waitingTime;
            callback(data.message)
        }
        else {
            console.log("nothing there")
            if (n < waitingTime) 
            { 
                n++; 
                setTimeout(function() {accessDB(n, callback)}, 2000);
            }
            else {
                console.log("done");
                send_message("I lost you somewhere")
            }
        }
    })
}

function get_Input(callback) {
    manageDOM.inputPopup();
    accessDB(0, callback, Input, 'Heroku_app');
}

function get_Email(callback) {
    manageDOM.inputPopup();
    accessDB(0, callback, Input, 'Heroku_app_email');
}
module.exports = get_Input

module.exports.get_Email = get_Email