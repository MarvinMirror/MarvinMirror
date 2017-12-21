var moment = require('moment');
var getJSON = require('../src/getJSON');
var config = require('../config/config.js');
var now = moment();
var $ = require("jquery");
require('../node_modules/fullcalendar/dist/fullcalendar.js');

function Calendar(){
  manageDOM.clearContent("content");
  var caldiv = document.createElement("div");
  caldiv.id = 'customCalendar';
  manageDOM.array2Div(['calDiv'], "content");

  var contentdiv = document.getElementById("content_wrapper");
  contentdiv.appendChild(caldiv);

   // page is now ready, initialize the calendar...
   console.log("calendar");

   $('#customCalendar').fullCalendar({
     weekends:true,
     aspectRatio: 1.23,
     // contentHeight: 300,
     events: [
        {
            title  : 'event1',
            start  : '2017-12-13',
           end    : '2017-12-15'
        }],
       // put your options and callbacks here
       header: {
          //  left: 'prev,next today myCustomButton',
            left: '',
            center: 'title',
            right: ''
          //  right: 'month,agendaWeek,agendaDay'
        }
     })
};
