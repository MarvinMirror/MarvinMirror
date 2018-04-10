/******************************************************************************\
**  __  __          _______      _______ _   _ _  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |  _  /|  _  /| |  | |  _  /       Kyle Murray                **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var manageDOM = require("../src/manageDOM");

"use strict";

/*  For a simple, static page like this, it is best to 
    build html instead of calling the builder functions
    to create the page content */

var authorsHTML = "\
    <div class=\"author-wrapper center-div\" id=\"authors\">\
        <div class=\"authors-row\">\
            <div class=\"col-1-of-2 nastya-z\">\
                <figure class=\"shape\">\
                    <img src=\"../img/author/flags/RU.png\" alt=\"Russian Flag\" class=\"flag\"></img>\
                </figure>\
                <div class=\"pic\"></div>\
                <div class=\"label\">Anastasia \"Nastya\"<br>Zimina</div>\
            </div>\
            <div class=\"col-1-of-2 eugeniu\">\
                <figure class=\"shape\">\
                    <img src=\"../img/author/flags/MD.png\" alt=\"Moldovian Flag\" class=\"flag\"></img>\
                </figure>\
                <div class=\"pic\"></div>\
                <div class=\"label\">Eugeniu \"Janea\"<br>Popa</div>\
            </div>\
        </div>\
        <div class=\"authors-row\">\
            <div class=\"col-1-of-2 kyle\">\
                <figure class=\"shape\">\
                    <img src=\"../img/author/flags/US.png\" alt=\"US Flag\" class=\"flag\"></img>\
                </figure>\
                <div class=\"pic\"></div>\
                <div class=\"label\">Kyle<br>Murray</div>\
            </div>\
            <div class=\"col-1-of-2 nastya-d\">\
                <figure class=\"shape\">\
                    <img src=\"../img/author/flags/UA.png\" alt=\"Ukraine Flag\" class=\"flag\"></img>\
                </figure>\
                <div class=\"pic\"></div>\
                <div class=\"label\">Anastasiia \"Nastya\"<br>Dosiak</div>\
            </div>\
        </div>\
    </div>\
";

/*  Creating the overlay element and then filling the html
    with simple js*/
var authors = () => {
	manageDOM.buildPopup();
	document.getElementById("popup").innerHTML = authorsHTML;
};

module.exports = authors;