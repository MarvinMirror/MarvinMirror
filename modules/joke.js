/******************************************************************************\
**  __  __          _______      _______     ___  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |    _/|_    /| |  | |  _  /       Eugeniu Popa               **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var send_message = require("../src/controller.js").message;
var manageDOM = require("../src/manageDOM");

var joke = function(){
    var url = 'https://icanhazdadjoke.com/';
    var retry = true;
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function(){
       if (xhr.status === 200){
           var output = JSON.parse(xhr.responseText)
           var joke = output.joke;
           manageDOM.buildPopup();
           var smile = document.createElement("div");
           var face = document.createElement("img");
           var popup = document.getElementById("popup");
           popup.appendChild(smile);
           smile.appendChild(face);
           face.src  = ("../img/laugh_cry.png");
           var text = document.createElement("div");
           popup.appendChild(text);
           text.innerHTML = joke;
           smile.className = "png";
           text.className = "text";
           }
       }
xhr.send()
}

module.exports = joke;
