var randText = () => {
    var word = [
        "Start with \"Hey Marvin...\"",
        "Ask me about the weather",
        "What is the answer to the Ultimate Question?",
        "I'm feeling very depressed",
        "Don't talk to me about life",
        "Here I am with a brain the size of a planet...",
        "Hey you, YES YOU"];

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
