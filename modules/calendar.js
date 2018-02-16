var moment = require('moment');
var getJSON = require('../src/getJSON');
var config = require('../config/config.js');
var now = moment();
var $ = require("jquery");
var ftAPI = require('../src/ftAPI');

require('../node_modules/fullcalendar/dist/fullcalendar.js');

function Calendar_create(data, view){

  console.log(data);
  manageDOM.clearContent("content");

  var caldiv = document.createElement("div");
  caldiv.id = 'customCalendar';
  manageDOM.array2Div(['calendar-wrapper'], "popup");

  var contentdiv = document.getElementById("calendar-wrapper");
  contentdiv.className = "calendar-wrapper center-div";
  contentdiv.appendChild(caldiv);

   // page is now ready, initialize the calendar...
   var cal = $('#customCalendar').fullCalendar({
     defaultView: data['view'],
     duration: { days: 10 },
     weekends:true,
     aspectRatio: 0.91,
     // contentHeight: 300,
     events: data['key'],
       // put your options and callbacks here
       header: {
          //  left: 'prev,next today myCustomButton',
            left: '',
            center: 'title',
            right: ''
          //  right: 'month,agendaWeek,agendaDay'
        }
     });

     // if user wants to see calendar for specific month or date
     if ('date' in data)
      cal.fullCalendar('changeView', data['view'], data['date']);
};

//creating json of events for calendar
function Calendar(view, date){
  console.log("calendar");
  var res = ftAPI.query42("/v2/campus/7/events")
    .then(function(data)
  {
    console.log(data);
    var all_data = {};//empty object
    var key = 'key';
    all_data[key] = [];// empty Array, which you can push() values into

    for (var index in data){
      var one_event = {
          title  : data[index].description,
          start  : data[index].begin_at,
          end    : data[index].end_at
      }
      all_data[key].push(one_event);
    }

    //adding parameters
    all_data['view'] = view;
    if (date)
      all_data['date'] = date;
    //console.log(all_data);
    return(all_data);
  })
      .then(Calendar_create);
}

module.exports = Calendar;
