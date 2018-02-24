var timer = require("../config/config").waitingTime;

var manageDOM = {

    /*  Creates a popup div of 100vh to use all of the monitor space on
        the mirror */
	buildPopup: () => {
		let checkPopup = document.getElementById("popup");

		if (checkPopup) {
			manageDOM.delPopup();
		}

		let body = document.body;
		let popup = document.createElement("div");
		body.appendChild(popup);

		popup.setAttribute("id", "popup");
		popup.setAttribute("class", "popup");

		setTimeout(manageDOM.delPopup, timer / 2);
		// setTimeout(manageDOM.delPopup, 10000);
	},

    /*  Removes all DOM objects within a parent object */
	clearContent: (parent) => {
		var content = document.getElementById(parent);
		while (content.firstChild)
			content.removeChild(content.firstChild);
	},

    /*  Specifically removes the popup element from the DOM */
	delPopup: () => {
		var popup = document.getElementById("popup");

		if (popup !== null) {
			document.body.removeChild(popup);
		}
	},

    /*  This function was created to bridge the issue with searching
        for students within the 42 API. There are logistical issues to
        searching by word fragments and names so for time's sake, this function
        is created to manually enter info for a student searched. */
	studentPopup: (call_function) => {

		// var checkPopup = document.getElementById('popup');
		// if (checkPopup) {
		//     document.body.removeChild(document.getElementById('popup'));
		// }
		// body.appendChild(popup);
		manageDOM.buildPopup();
		var popup = document.getElementById("popup");
		popup.setAttribute("class", "popup");
		popup.setAttribute("id", "popup");
		popup.innerHTML =
            "<div class=\"student-form center-div\">\
                <span class=\"student-form--header\"> Please enter the login of the student you are looking for:</span>\
                <form action=\"#\" class=\"popup__form center-div\">\
                    <div class=\"popup__form--entry\">\
                        <input type=\"text\" class=\"popup__form--entry-input\" id=\"popup__form\">\
                    </div>\
                    <div class=\"popup__button\">\
                        <button type=\"submit\" class=\"btn-hidden\" onclick=\"" + call_function + "()\"></button>\
                    </div>\
                </form>\
            </div>";
		document.getElementById("popup__form").focus();
	},

    /*  This function assists a developer who is creating a new module that needs to
        create an unknown number or, in general, many repeating divs for the mirror.
        For the array submitted as argument, array2Div will take the first element and
        create a wrapper of same name, and then subsequently append to the wrapper
        a div for each further element in the array */
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
		}
		c.appendChild(wrapper);
	}
};

module.exports = manageDOM;
