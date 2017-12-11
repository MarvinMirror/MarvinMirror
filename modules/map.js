var manageDOM = require('../src/manageDOM');

function zone(img) { 
    
    manageDOM.clearContent("content");
    var pic = "../img/" + img + ".png"
    var content = document.getElementById('content');
    manageDOM.array2Div(['image'], "content");
    var image = document.createElement('img');
    var map = document.getElementById('image')
    map.appendChild(image);
    image.setAttribute('src', pic);
    
    map.className = "map";
}


