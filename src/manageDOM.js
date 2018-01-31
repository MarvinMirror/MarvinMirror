var student = require('../modules/student');
var projects = require('../modules/projects');
var corrections = require('../modules/corrections');
var timer = require('../config/config').waitingTime;

var manageDOM = {

    buildPopup: () => {
        let checkPopup = document.getElementById('popup');

        if (checkPopup) {
            manageDOM.delPopup();
        }

        let popup = document.createElement('div');
        body.appendChild(popup);
    
        popup.setAttribute('id', 'popup');
        popup.setAttribute('class', 'popup');

        setTimeout(manageDOM.delPopup, timer / 2);
        // setTimeout(manageDOM.delPopup, 10000);
    },

    clearContent: (parent) => {
        var content = document.getElementById(parent);
        while (content.firstChild)
            content.removeChild(content.firstChild);
    },

    delPopup: () => {
        var popup = document.getElementById("popup");
    
        if (popup !== null) {
            document.body.removeChild(popup);
        }
    },

    // FOR THE INITIAL TESTS, WE WILL USE KEYBOARD ENTRY FOR STUDENT INFO
    studentPopup: (call_function) => {

        // var checkPopup = document.getElementById('popup');
        // if (checkPopup) {
        //     document.body.removeChild(document.getElementById('popup'));        
        // }    
        // body.appendChild(popup);
        manageDOM.buildPopup();
        var popup = document.getElementById("popup");
        popup.setAttribute('class', 'popup');
        popup.setAttribute('id', 'popup');
        popup.innerHTML = 
            '<div class="student-form center-div">\
                <span class="student-form--header"> Please enter the login of the student you are looking for:</span>\
                <form action="#" class="popup__form center-div">\
                    <div class="popup__form--entry">\
                        <input type="text" class="popup__form--entry-input" id="popup__form">\
                    </div>\
                    <div class="popup__button">\
                        <button type="submit" class="btn-hidden" onclick="' + call_function + '()"></button>\
                    </div>\
                </form>\
            </div>';
        document.getElementById('popup__form').focus();
    },

    array2Div: (arr, parent) => {

        if (parent === "popup")
            manageDOM.buildPopup();

        var c = document.getElementById(parent);
        let wrapper = document.createElement("div");
        wrapper.id = arr[0];
        wrapper.className = arr[0];

        for (var i = 1, len = arr.length; i < len; i++) {
            var e = document.createElement("div");
            e.id = arr[i];
            wrapper.appendChild(e);
        };
        c.appendChild(wrapper);
    }
}

module.exports = manageDOM;