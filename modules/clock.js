var moment = require('moment');
var now = moment();

/*
** With the momentjs module we will be able to easily
** set timezone and hopefully change it easily with
** voice command.
*/
console.log("clock1");

function dateTime() {

    var newDay = moment('12:00:01am', 'h:mm:ssa');
    var dateString = now.format("dddd, MMMM D");

    var clockdiv = document.getElementById("time");
    var datediv = document.getElementById("date");

    var hourDiv = document.createElement("div");
    var colonDiv = document.createElement("div");
    var minutesDiv = document.createElement("div");

    hourDiv.className = "hour";
    colonDiv.className = "colon";
    minutesDiv.className = "minutes";
   
    clockdiv.appendChild(hourDiv);
    clockdiv.appendChild(colonDiv);
    clockdiv.appendChild(minutesDiv);

    colonDiv.innerHTML = ":";
    datediv.innerHTML = dateString;

    setInterval(function getTime () {
        now = moment();
        hourDiv.innerHTML = now.format("HH");
        minutesDiv.innerHTML = now.format("mm");
        if (now.isSameOrBefore(newDay)) {
            dateString = now.format("dddd, MMMM D");
            dateDiv.innerHTML = dateString;
            console.log(dateString);
        }
    }, 1000);
}