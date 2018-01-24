let student = require('../modules/student');

function setPopup(fn) {
    var input = document.getElementById('popup__button');
    console.log(fn);
    input.setAttribute('onclick', fn);
}