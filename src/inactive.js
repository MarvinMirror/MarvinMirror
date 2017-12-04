/* Back to standby mode from the active phase*/
var waitingTime = require('../config/config').waitingTime

var incatvityTime = function(name)
{
    var timer;

    if (name !== null) resetTimer()
    document.onclick = resetTimer;
    function logout()
    {
        console.log("you are logged out")
        //add real logout
    }

    function standby()
    {
        logout()
        window.location.replace("main.html")
    }

    function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(standby, waitingTime);
    }
}