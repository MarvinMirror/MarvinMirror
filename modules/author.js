var manageDOM = require('../src/manageDOM');

'use strict';

var authorsHTML = '\
    <div class="author-wrapper center-div" id="authors">\
        <div class="authors-row">\
            <div class="col-1-of-2 nastya-z">\
                <figure class="shape">\
                    <img src="../img/author/flags/RU.png" alt="Russian Flag" class="flag"></img>\
                </figure>\
                <div class="pic"></div>\
                <div class="label">Anastasia "Nastya"<br>Zimina</div>\
            </div>\
            <div class="col-1-of-2 eugeniu">\
                <figure class="shape">\
                    <img src="../img/author/flags/MD.png" alt="Moldovian Flag" class="flag"></img>\
                </figure>\
                <div class="pic"></div>\
                <div class="label">Eugeniu "Janea"<br>Popa</div>\
            </div>\
        </div>\
        <div class="authors-row">\
            <div class="col-1-of-2 kyle">\
                <figure class="shape">\
                    <img src="../img/author/flags/US.png" alt="US Flag" class="flag"></img>\
                </figure>\
                <div class="pic"></div>\
                <div class="label">Kyle<br>Murray</div>\
            </div>\
            <div class="col-1-of-2 nastya-d">\
                <figure class="shape">\
                    <img src="../img/author/flags/UA.png" alt="Ukraine Flag" class="flag"></img>\
                </figure>\
                <div class="pic"></div>\
                <div class="label">Anastasiia "Nastya"<br>Dosiak</div>\
            </div>\
        </div>\
    </div>\
';

var authors = () => {  
    manageDOM.buildPopup();
    document.getElementById("popup").innerHTML = authorsHTML;
}

module.exports = authors;