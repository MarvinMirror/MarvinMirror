/* Back to standby mode from the active phase*/
var waitingTime = require('../config/config').waitingTime
var marvin_reaction = require('../src/controller')

var inactvityTime = function(name)
{
    var timer;

    if (name !== null) resetTimer()
    document.onload = marvin_reaction.marvin_gif();

   // document.getElementById('popup').onchange = resetTimer;
    
    function logout()
    {
        console.log("you are logged out")
        //add real logout
    }

    function standby()
    {
        logout()
        marvin_reaction.marvin_gif();
    }

    function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(standby, waitingTime);
    }
}