var student = require('../modules/student');
var projects = require('../modules/projects');
var corrections = require('../modules/corrections');

var manageDOM = {

    clearContent: (parent) => {
        var content = document.getElementById(parent);
        var wrapper = document.getElementById(parent + "_wrapper");
    
        if (wrapper !== null) {
            content.removeChild(wrapper);
        }
    },

    // FOR THE INITIAL TESTS, WE WILL USE KEYBOARD ENTRY FOR STUDENT INFO
    studentPopup: (call_function) => {

        var checkPopup = document.getElementById('popup');
        if (checkPopup) {
            document.body.removeChild(document.getElementById('popup'));        
        }    
        var popup = document.createElement('div');
        body.appendChild(popup);
    
        popup.setAttribute('class', 'popup');
        popup.setAttribute('id', 'popup');
        popup.innerHTML = 
            '<div class="popup__content">\
                <span class="popup__content--header"> Please enter the login of the student you are looking for:</span>\
                <form action="#" class="popup__form">\
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

        var c = document.getElementById(parent);

        var wrapper = document.createElement("div");
        wrapper.id = parent + "_wrapper";
        wrapper.setAttribute('class', arr[0]);

        for (var i = 1, len = arr.length; i < len; i++) {
            var e = document.createElement("div");
            e.id = arr[i];
            wrapper.appendChild(e);
        };
        c.appendChild(wrapper);
    }
}

module.exports = manageDOM;