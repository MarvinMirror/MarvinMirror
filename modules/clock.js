var moment = require('moment');
var now = moment();

/*
** With the momentjs module we will be able to easily
** set timezone and hopefully change it easily with
** voice command.
*/
console.log("clock1");

function dateTime() {
    
    var div = document.getElementById('clock');
    
    // Generating html for date and time
    var wrapper = document.createElement("div");
    var timeWrapper = document.createElement("div");
    var dateWrapper = document.createElement("div");
    var hourSpan = document.createElement("span");
    var colonSpan = document.createElement("span");
    var minuteSpan = document.createElement("span");
    
    var dateString = now.format("dddd, MMMM D");
    
    // For css styling
    colonSpan.className = "blink";
    timeWrapper.className = "clock";
    dateWrapper.className = "date";

    // DOM management
    div.insertBefore(wrapper, document.getElementById('spacer'));
    wrapper.appendChild(timeWrapper);
    wrapper.appendChild(dateWrapper);
    timeWrapper.appendChild(hourSpan);
    timeWrapper.appendChild(colonSpan);
    timeWrapper.appendChild(minuteSpan);
    
    colonSpan.innerHTML = ":";
    dateWrapper.innerHTML = dateString;

    var newDay = moment('12:00:01am', 'h:mm:ssa');
    console.log(newDay);
    console.log(moment().add(1, 'days').startOf('day'));
    console.log(moment());

   // Time updates every 1 second, date does not
   setInterval(function getTime () {
        now = moment();
        hourSpan.innerHTML = now.format("HH");
        minuteSpan.innerHTML = now.format("mm");
        if (now.isSameOrBefore(newDay)) {
            dateString = now.format("dddd, MMMM D");
            dateWrapper.innerHTML = dateString;
            console.log(dateString);
        }
    }, 1000);
}