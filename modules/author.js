var manageDOM = require('../src/manageDOM');

function authors() {

    //clear content div
    manageDOM.clearContent("content");

    var content = document.getElementById("content");

    var author_wrapper = document.createElement("div");
    var row_1 = document.createElement("div");
    var row_2 = document.createElement("div");
    var nastya_z = document.createElement("div");
    var nastya_z__pic = document.createElement("div");
    var nastya_z__label = document.createElement("div");
    var eugeniu = document.createElement("div");
    var eugeniu__pic = document.createElement("div");
    var eugeniu__label = document.createElement("div");
    var kyle = document.createElement("div");
    var kyle__pic = document.createElement("div");
    var kyle__label = document.createElement("div");
    var nastya_d = document.createElement("div");
    var nastya_d__pic = document.createElement("div");
    var nastya_d__label = document.createElement("div");
    // var nastya_d__flag_wrapper = document.createElement("figure");
    // var nastya_d__flag_img = document.createElement("img");
    
    author_wrapper.setAttribute('class', 'author-wrapper');
    author_wrapper.setAttribute('id', 'content_wrapper');
    row_1.setAttribute('class', 'row');
    row_2.setAttribute('class', 'row');
    nastya_z.setAttribute('class', 'col-1-of-2 nastya_z');
    eugeniu.setAttribute('class', 'col-1-of-2 eugeniu');
    kyle.setAttribute('class', 'col-1-of-2 kyle');
    nastya_d.setAttribute('class', 'col-1-of-2 nastya_d');
    nastya_z__pic.setAttribute('class', 'nastya_z__pic');
    eugeniu__pic.setAttribute('class', 'eugeniu__pic');
    kyle__pic.setAttribute('class', 'kyle__pic');
    nastya_d__pic.setAttribute('class', 'nastya_d__pic');
    nastya_z__label.setAttribute('class', 'nastya_z__label');
    eugeniu__label.setAttribute('class', 'eugeniu__label');
    kyle__label.setAttribute('class', 'kyle__label');
    nastya_d__label.setAttribute('class', 'nastya_d__label');
    // nastya_d__flag_wrapper.setAttribute('class', 'nastya_d__flag-wrapper');
    // nastya_d__flag_img.setAttribute('class', 'nastya_d__flag-img');
    // nastya_d__flag_img.setAttribute('src', '../img/author/flags/UA.png');

    content.appendChild(author_wrapper);
    author_wrapper.append(row_1, row_2);
    row_1.append(nastya_z, eugeniu);
    nastya_z.append(nastya_z__pic, nastya_z__label);
    eugeniu.append(eugeniu__pic, eugeniu__label);
    row_2.append(kyle, nastya_d);
    kyle.append(kyle__pic, kyle__label);
    
    nastya_d.append(nastya_d__pic, nastya_d__label);
    // nastya_d.append(nastya_d__pic, nastya_d__label, nastya_d__flag_wrapper);
    // nastya_d__flag_wrapper.append(nastya_d__flag_img);

    nastya_z__label.innerHTML = "Anastasia \"Nastya\"<br>Zimina";
    kyle__label.innerHTML = "Kyle<br>Murray";
    eugeniu__label.innerHTML = "Eugeniu \"Janea\"<br>Popa";
    nastya_d__label.innerHTML = "Anastasiia \"Nastya\"<br>Dosiak";

}