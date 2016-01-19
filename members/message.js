function messagers(){
    document.title = 'Messagers';
    sendAndGet("messagers",{},finishmessagers);
    }function finishmessagers(reply){
    var content = '<h1>Messagers:</h1>'+reply.messagers.length+'<a onclick="writeMessager()">+</a><ul id="messagerlecian">';
    for (var i=0;i<reply.messagers.length;i++){
        var messager = reply.messagers[i];
        content +='<li><h2><a href="#messages/'+messager+'">'+messager+'</a></h2></li>';
    }
    content += '</ul>';
    document.getElementById("actualcontent").innerHTML = content;
}
function writeMessager(){
    document.getElementById('messagerlecian').innerHTML+=
    '<input id="newMessager"><button onclick="messager()">Add</button>';
}
function messager(){
    var name = document.getElementById('newMessager').value;
    sendAndGet('messager',{'name':name},finishMessager);
    }function finishMessager(reply){
    window.location.reload();
}

function getUser(){
    var hash = window.location.hash.substring(1);
    hash = hash.split('/');
    return hash[1];
}

function messages(){
    document.title = 'Messages:'+getUser();
    document.getElementById("actualcontent").innerHTML = '<h1>Messages:'+getUser()+'</h1>'+
    '<span id="length">0</span>'+
    '<a onclick="writeMessage();">+</a><br>'+
    '<a onclick="updateMessages();">^</a>'+
    '<ol id="messages"></ol>'+
    '<a onclick="moreMessages();">v</a>';
    window.sessionStorage.setItem('firstMessage',null);
    window.sessionStorage.setItem('lastMessage',null);
    moreMessages();
}
function formatMessage(message){
        var date = new Date(message.time*1000);
        output = '<li id="'+message.time+'"><h5>'+message.author+" @ "+formatDate(date)+'</h5><pre>'+message.content+'</pre></li>';
        return output;
    }

function moreMessages(){
    var end = parseFloat(window.sessionStorage.getItem('lastMessage'));
    sendAndGet('messages',{'end':end,'user':getUser()},finishmoreMessages);
}function finishmoreMessages(reply){
    var messagenum = parseInt(document.getElementById("length").innerHTML);
    var content = '';
    for (var i=0;i<reply.messages.length;i++){
        content += formatMessage(reply.messages[i]);
    }

    if (messagenum == '0'){
        window.sessionStorage.setItem('firstMessage',reply.messages[0].time);
    }
    window.sessionStorage.setItem('lastMessage',reply.messages.pop().time);

    document.getElementById('messages').innerHTML += content;
    document.getElementById("length").innerHTML = document.getElementById("messages").childNodes.length;
}

function updateMessages(){
    var start = parseFloat(window.sessionStorage.getItem('firstMessage'));
    sendAndGet('updateMessages',{'start':start,'user':getUser()},finishupdateMessages);
    }function finishupdateMessages(reply){
    var content = '';
    for (i=0;i<reply.messages.length;i++){
        content += formatMessage(reply.messages[i]);
    }
    document.getElementById('messages').innerHTML = content+document.getElementById('messages').innerHTML;
    document.getElementById("length").innerHTML = document.getElementById("messages").childNodes.length;
}

function writeMessage(){
    document.getElementById('messages').innerHTML =
    '<li><textarea id="messagecontent"></textarea><br><button onclick="message();">Send</button></li>'+
    document.getElementById('messages').innerHTML;
}
function message(){
    messagecontent = document.getElementById('messagecontent').value;
    sendAndGet("message",{'user':getUser(), 'content':messagecontent},finishmessage);
    }function finishmessage(reply){
    document.getElementById('messages').removeChild(document.getElementById('messages').children[0]);
    updateMessages();
}