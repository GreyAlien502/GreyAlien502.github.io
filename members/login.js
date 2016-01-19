function login(){
    document.getElementById("content").innerHTML = 'Loading...';
    if(localStorage.getItem('sendback')===null){
        localStorage.setItem("sendback", Math.floor(Math.random()*10000000000).toString());
    }
    var sendback = localStorage.getItem('sendback');
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    setCreds(username,password);
    sendRequest(sendback,"login",{});
    getReply(sendback,finishLogin);
}function finishLogin(reply){
    document.getElementById("content").innerHTML = reply;
}
function maybeLogin(key){
    if (key.keyCode == 13){login();}
}