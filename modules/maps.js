var info = require('../src/maps_info.js');
var marvin_reaction = require('../src/controller.js');

function create_floor_1(zone_name, get_row, get_seat, zone_obj, zone_42, zone_style) {
    //get HTML element to add new elements there
    var floor = document.getElementById(zone_name);
    //create sections/rows
    for (row in zone_obj)
    {
        var start_c = 1;
        for (sections in zone_obj[row])
            {
                var occupied = false;
                var stations = zone_obj[row][sections];
                if (stations.length > 0) {
                    var width = Math.round(stations[stations.length - 1]/2);
                    var element = document.createElement("div");
                    element.id = "row " + row + " " + sections;
                    element.className = "row_container_" + zone_name;
                    element.setAttributeNode(creaty_row_style(width, 3, start_c, 1 + (row - 1)* 4));
                    for (station in zone_obj[row][sections])
                    {
                        var seat = document.createElement("div")
                        var seat_num = zone_obj[row][sections][station]
                        seat.id = "station" + seat_num;
                        seat.setAttributeNode(creaty_element_style(Math.round(seat_num / 2), 1 + !(seat_num % 2)* 2))
                        if (9 - row == get_row && zone_42[row][sections][station] == get_seat) 
                        {
                            seat.className = "seat-occupied";
                            occupied = true;
                        }
                            else seat.className = "seat"
                        var icon = document.createElement("img");
                        icon.setAttribute("src", "../img/mac.png")
                        seat.appendChild(icon);
                        element.appendChild(seat)
                    }
                    var table_div = document.createElement("div")
                    table_div.className = (occupied) ? "table-occupied" : "table";
                    table_div.setAttributeNode(creaty_table_style(width, 1, start_c, 2 + (row - 1)* 4))
                    floor.appendChild(table_div)
                    floor.appendChild(element);
                    start_c = start_c + width + 1;
                }
            }
    }
    add_user_position(zone_name, zone_style.width, zone_style.height)
}

function create_floor_2(zone_name, get_row, get_seat, zone_obj, zone_42, zone_style) {
    //get HTML element to add new elements there
    var floor = document.getElementById(zone_name);
    floor.className = "zone";
    //create sections/rows
    for (row in zone_obj)
    {
        var occupied = false;
        var location = zone_style[row];
        var element = document.createElement("div")
        element.id = row;
        if (row === "0") element.className = "row_container_" + zone_name + '_0';
            else element.className = "row_container_" + zone_name;
        element.setAttributeNode(creaty_element_style(location[0], location[1]));
        for (station in zone_obj[row])
        {
            var seat = document.createElement("div")
            var index = zone_obj[row][station] - 1;
            var col_start = row%2 ? zone_style.odd_col[index] : zone_style.even_col[index];
            var row_start = row%2 ? zone_style.odd_row[index] : zone_style.even_row[index];
            if (row === "0") row_start = row_start - 9;
            seat.id = "station" + zone_obj[row][station];
            seat.setAttributeNode(creaty_element_style(col_start, row_start))
            if (zone_style['42_map'][row] == get_row && zone_42[row][station] == get_seat) 
            {
                seat.className = "seat-occupied";
                occupied = true;
            }
                else seat.className = "seat"
            var icon = document.createElement("img");
            icon.setAttribute("src", "../img/mac.png")
            seat.appendChild(icon);
            element.appendChild(seat)
        }
        for (table in zone_style.tables[row])
        {
            var index = zone_style.tables[row][table] - 1;
            if (row % 2) var table_size = zone_style.tables.odd_size[index]
                else if ( !((index + 1) % 12) ) var table_size = 3
                    else if ( !((index + 1) % 4) ) var table_size = 1
                        else var table_size = 2
            var start_c = (row % 2) ? zone_style.tables.odd_col[index] : zone_style.tables.even_col[index];
            var start_r = (row % 2) ? zone_style.tables.odd_row[index] : zone_style.tables.even_row[index];
            if (row === "0") start_r = start_r - 9;
            var table_div = document.createElement("div")
            table_div.className = (occupied) ? "table-occupied" : "table";
            table_div.setAttributeNode(creaty_table_style(table_size, 1, start_c, start_r))
            element.appendChild(table_div)
        }
        floor.appendChild(element);
        
    }
    add_user_position(zone_name, zone_style.width, zone_style.height)
}

function create_floor_3(zone_name, get_row, get_seat, zone_obj, zone_42, zone_style) {
    //get HTML element to add new elements there
    var floor = document.getElementById(zone_name);
    //create sections/rows
    for (row in zone_obj)
    {
        var location = zone_style[row];
        var element = document.createElement("div")
        element.id = row;
        element.className = "row_container_" + zone_name;
        element.setAttributeNode(creaty_element_style(location[0], location[1]))
        //create seats in each section/row
        for (station in zone_obj[row])
        {
            var seat = document.createElement("div")
            var index = zone_obj[row][station] - 1;
            var col_start = row%2 ? zone_style.odd_col[index] : zone_style.even_col[index];
            var row_start = zone_style.row[index];
            seat.id = "station" + zone_obj[row][station];
            seat.setAttributeNode(creaty_element_style(col_start, row_start))
            if (row == get_row && zone_42[row][station] == get_seat) 
            {
                seat.className = "seat-occupied";
                occupied = true;
            }
                else seat.className = "seat"
            var icon = document.createElement("img");
            icon.setAttribute("src", "../img/mac.png")
            seat.appendChild(icon);
            element.appendChild(seat)
        }
        //create tables in each section/row
       for (table in zone_style.tables)
        {
            var table_size = zone_style.tables[table].size
            var start_c = zone_style.tables[table].start_c[row%2]
            var start_r = zone_style.tables[table].start_r[row%2]
            var table_div = document.createElement("div")
            table_div.className = (occupied) ? "table-occupied" : "table";
            table_div.setAttributeNode(creaty_table_style(table_size[0], table_size[1], start_c, start_r))
            if (row < 10 || (row == 10 && table == 1)) element.appendChild(table_div)
        }
    floor.appendChild(element)
    }
    add_user_position(zone_name, zone_style.width, zone_style.height)
}

function creaty_element_style(col_start, row_start)
{
    var att = document.createAttribute("style");
    att.value = "grid-column-start: " + col_start + "; grid-row-start: " + row_start + ";";
    return (att);
}

function creaty_table_style(width, height, col_start, row_start)
{
    var att = document.createAttribute("style");
    att.value = "grid-column-start: " + col_start + "; grid-row-start: " + row_start + "; grid-column-end: " + (col_start + width)+ "; grid-row-end: " + (row_start + height);
    return (att);
}

function creaty_row_style(width, height, col_start, row_start)
{
    var att = document.createAttribute("style");
    att.value = "grid-column-start: " + col_start + "; grid-row-start: " + row_start + "; grid-template-columns: repeat("+ width + ", var(--size)); ";
    return (att);
}

function creaty_row1_style(col_start, col_end, row_start, row_end)
{
    var att = document.createAttribute("style");
    att.value = "grid-column-start: " + col_start + "; grid-column-end:" + col_end + "; grid-row-start: " + row_start + "; grid-row-end: " + row_end;
    return (att);
}

function add_user_position(zone_name, width, height) {
    if (zone_name === 'zone1') height = 1;
    else if (zone_name == 'zone3') width = 1;
    var userPosition = document.getElementById("userPosition")
    userPosition.className = "user_position"
    userPosition.setAttributeNode(creaty_table_style(1, 1, width, height))
    var icon = document.createElement("img");
    icon.setAttribute("src", "../img/pointer.png")
    userPosition.appendChild(icon);
}

function zone(num, row, seat) {

    manageDOM.array2Div(["zone","zone" + num,"userPosition"], "content");
    document.getElementById("zone" + num).className = "zone";
    var zone_obj = info["zone" + num].map
    var zone_42 = info["zone" + num]['42']
    var zone_style = info["zone" + num].style
    var element = document.getElementById('content');
    var shortestWindowSide = (element.clientWidth > element.clientHeight) ? element.clientHeight : element.clientWidth;
    var widestZoneSide = (zone_style.width > zone_style.height) ? zone_style.width : zone_style.height;
    var seat_size = Math.floor(shortestWindowSide/widestZoneSide);
    
    document.documentElement.style.setProperty(`--size`, seat_size + 'px');
    document.documentElement.style.setProperty(`--width`, zone_style.width);
    document.documentElement.style.setProperty(`--height`, zone_style.height);

    if (num == 1)
        create_floor_1("zone" + num, row, seat, zone_obj, zone_42, zone_style);
    if (num == 2)
        create_floor_2("zone" + num, row, seat, zone_obj, zone_42, zone_style);
    if (num == 3)
        create_floor_3("zone" + num, row, seat, zone_obj, zone_42, zone_style);
    //if (num == 4)
    //    create_floor_4("zone" + num, row, seat);
}

function send_no_student_message(message)
{
    manageDOM.array2Div(["message","not_found"], "content");
    var message_div = document.getElementById('not_found');
    message_div.innerHTML = message;
}

function showMap(obj)
{
    marvin_reaction.delete_gif();
    marvin_reaction.talk_message();
    console.log(obj)
    if (obj != null) {
        var location = obj.location;
        if (location != null)
        {
            var res = location.split(/[^1-9]/);
            console.log(res)
            zone(res[2], res[3], res[4]);
        }
        else send_no_student_message(obj.displayname + ' is not here at the moment');
    }
    else send_no_student_message('I didn\'t find this username in our database');
}

// There is no direct-to-student from login via the API so 2 requests are needed. This is the second and 
// feeds comprehensive student data object to callback function
var getStudentID = function (obj) {

    if (obj.length > 0){
        return ftAPI.query42("/v2/users/" + obj[0].id);
    }
    else {
        return (null);
    }
}

// The first step is to get the user/:id by using the login from this endpoint
var studentOnMap = () => {
   // removes from "content" div of app any div with id "wrapper"
    manageDOM.clearContent("content"); 
    marvin_reaction.process_gif();
    var login = document.getElementById('popup__form').value;
    
    if (login !== null) {
        ftAPI.query42("/v2/users/?filter[login]=" + login)
            .then(getStudentID)
            .then(showMap)
            .catch(console.error);
    }

    document.body.removeChild(document.getElementById('popup'));
}

module.exports = loadStudent;