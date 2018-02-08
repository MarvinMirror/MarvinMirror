//// long running function
//function waitThreeSeconds() {
//    var ms = 3000 + new Date().getTime();
//    
//    while (new Date() < ms){}
//        console.log('finished function');
//}
//
//function clickHandler() {
//    console.log('click event!');   
//}
//
//// listen for the click event
//document.addEventListener('click', clickHandler);
//
//
//waitThreeSeconds();
//console.log('finished execution');



//var name = 'lalalend';
//var n = 120;
//this[name] = n;
//console.log(this[name]);

//var filename = "app.js" 
//console.log(filename.split('.').pop());

//function calculator(a, b) {
//    
//    var c  = a + b; 
//    
//    if (a === b){
//        console.log (c*3);
//    }
//    else {
//        console.log (c);
//    }
//}
//
//calculator(44, 79);
//calculator(88, 88);

//function check(a, b) {
//    if( a <= 0 ||  b <= 0){
//        return '-';
//    }
//    else if (a  > 0 || b > 0) {
//        return '+';
//    }
//}
//
//console.log(check(9, -9));
//console.log(check(2, 5));


//var age  = 16;
//
//if (age < 20 ){
//    console.log('john is a teenager');
//}else {
//    console.log(' John is not a man');
//}

//
//var john = {
//    age: 29,
//    height: 160
//}
//
//var Maria = {
//    age: 31,
//    height: 155
//}
//
//var elizaveta = {
//    age: 28,
//    height: 151
//}
//
//var elizavetaV = elizaveta.age * 5 + elizaveta.height;
//var johnV = john.age * 5 + john.height;
//var mariaV = Maria.age *5 + Maria.height;
//
//if (johnV > mariaV && johnV > elizavetaV){
//    console.log ('John ' + johnV);
//}else if (mariaV > johnV && mariaV > elizavetaV){
//    console.log ('Maria ' + mariaV);
//}else {
//    console.log('Elizaveta ' + elizavetaV);
//}
//
//console.log(elizavetaV);
//console.log(johnV);
//console.log(mariaV);


//function a(str) {
//    if (str.substring(0, 2) === 'Py'){
//        return str;
//    }else{
//        return 'Py' + str;
//    }
//}
//
//console.log(a('Python'));
//console.log(a('thon'));
//
//function a(str){
//    if (str){
//       var d = str.substr(3);
//    return d;
//    }
//}
//
//console.log(a('hi my name is John'));


//var a = {
//    name: 'John'
//}
//
//var b = a;
//
//console.log (a);
//console.log (b);
//
//b.name = 'hi my darling';
//
//console.log(b);
//console.log(a);

// is  pointing to the  same location in memory

//function a(){
//    console.log(this);
//}
//
//a();
//
//var b = function(){
//    console.log(this);
//}
//
//b();
 
//function numere(num){
//    for(var i = 1; i <= num; i++){
//        if (i % 15 === 0) console.log('FizzBuzz');
//        else if(i % 3 === 0) console.log('Fizz');
//        else if(i % 5 === 0) console.log('Buzz');
//        else console.log(i);
//    }
//}
//numere(100);

//
//function timecomlex (noteText, magazinText){
//    var noteArr = noteText.split(' ');
//    var magazinArr = magazinText.split(' ');
//    var magObj = {};
//    
//    magazinArr.forEach(function(word){
//        if(!magObj[word])  
//            magObj[word] = 0;
//        magObj[word]++;
//    });
//    console.log(magObj);
//    
//}
//
//timecomlex('', 'this is is all the magazin is the magazin');

var randText = () => {
    var word = [
        "Start whit Hey Marvin!",
        "Ask me how is the WEATHER",
        "What is the Answer of Life?",
        "I'm feeling very depressed",
        "Don't talk to me about life",
        "Here I'm, brain the size of a planet",
        "hey You, Yes Yes you"];

    var position = Math.floor(Math.random() * 7)+1;
    var position1 = Math.floor(Math.random() * 7)+1;
    var text = word[Math.floor(Math.random() * word.length)];
    var text1 = word[Math.floor(Math.random() * word.length)];
    
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
   
    var str1 = document.getElementById('a'+position).innerHTML = text;
    var str2;
    sleep(3000).then(() => {
        str2 = document.getElementById('a'+position1).innerHTML = text1;
        str1 = document.getElementById('a'+position).innerHTML = "";    
    });
    
    sleep(6000).then(() => {
        str2 = document.getElementById('a'+position1).innerHTML = "";
        });
    
    sleep(6000).then(() => {
        randText();
    });
}
























