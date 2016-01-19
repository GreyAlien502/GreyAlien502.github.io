function cats(){
    document.title = 'Cat Facts!';
    document.getElementById('actualcontent').innerHTML = "<h1>Cat Facts!</h1><p>Enter an email to recieve cat facts daily. To send a text, enter the SMS Gateway Address, which you can look up <a href = \"http://www.freecarrierlookup.com/\" target=\"_blank\">here</a>.</p><div id=\"done?\"></div><input id=\"nomination\"><button onclick=\"cat()\">CAT</button>";
}
function cat(){
    var name = document.getElementById('nomination').value;
    sendAndGet('cat',{'to':name},finishcat);
    }function finishcat(reply){
    document.getElementById('nomination').value = '';
    document.getElementById('done?').innerHTML = reply;
}