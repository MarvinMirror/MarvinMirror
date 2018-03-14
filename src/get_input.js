var waitingTime = require('../config/config.js').waitingInput;

var send_message = require('../src/controller.js').message;

var Input = require("../src/mongoDB").Models.Input;

function accessDB(n, callback) {
    Input.findOne({source: 'Heroku_app'})
    .then(data => {
        if (data != null) 
        {
            Input.deleteOne({source: 'Heroku_app'}, function(err, obj) {console.log("deleted")});
            n = waitingTime;
            if (data.message != "") callback(data.message)
            else send_message("You sent me an empty string! <br>Do you think I'm stupid?")
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

function getInput(callback) {
    manageDOM.inputPopup();
    accessDB(0, callback);
}

module.exports = getInput