var chattext;
var id;
var to;
var message;
function printCat(){
		document.getElementById("chattext").innerHTML = "chattext";
}
function addToChat(text){
	chattext = text + chattext ;
	document.getElementById("chattext").innerHTML = chattext;
}
function maybeSend(key){
	if (key.keyCode == 13){chat();}
}
function form(text,time,format){
	return "<div class='messagedivs "+format+"_container' title='"+time+"'><div class='message "+format+"'>"+text+"</div></div>";
}
function deactivate(button){
	document.getElementById(button).style.class = 'active';
}
function activate(button){
	document.getElementById(button).style.class = 'inactive';
}

function setup(){
	chattext = "";
	id=Math.floor(Math.random()*10000000000);
	setInterval(function(){keep();},800);
	document.getElementById("input").addEventListener( "keydown", function( e ) {
		var keyCode = e.keyCode || e.which;
		if ( keyCode === 13 ) {
		   chat();
		}
	}, false);
}

function clearChat(){
	chattext = "";
	document.getElementById('chattext').innerHTML = '';
}
function login(){
		getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Dlogin%26id%3D'+id,'finishlogin');
		activate('login');
	}function finishlogin(response){json = response;
		addToChat(form('Requesting connection...',"Please wait.",'system'));
		deactivate('login');
}
function keep(){
		getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Dkeep%26id%3D'+id,'finishkeep');
		activate('keep');
	}function finishkeep(response){json = response;
		function processEvent(event){
			if (event.type == 'connected'){
				to = event.from;
				addToChat(form("connected:"+event.content,event.time,'system'));
			}else if (event.type == 'msg'){
				var msg = event.content;
				if (msg.substring(0,8) == "PICTURE|"){
					addToChat(form(msg.substring(8),event.time,'bud'));
				} else {
					addToChat(form(msg,event.time,'bud'));
				}
			}else if (event.type == 'disconnect'){
				addToChat(form("You've been disconnected.",event.time,'system'));
			}
		}
		if (json.hasOwnProperty('events')) {
			if (json.events.hasOwnProperty('type')){
				processEvent(json.events);
			}else{
				for (eventnum = 0; eventnum < json.events.length; eventnum++) { 
					processEvent(json.events[eventnum]);
				}
			}
		}
		deactivate('keep');
}
function chat(){
		message = document.getElementById("input").value;
		if (message !== ''){
			var encoded_message = rfc3986EncodeURIComponent(rfc3986EncodeURIComponent(message));
			getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Dchat%26id%3D'+id+'%26to%3D'+to+"%26content%3D"+encoded_message,'finishchat');
			activate('chat');
		}
	}function finishchat(response){json = response;
		addToChat(form(message,'sent',"user"));
		document.getElementById('input').value = '';
		deactivate('chat');
}
function disconnect(){
		getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Ddisconnect%26id%3D'+id+'%26to%3D'+to,'finishdisconnect');
		activate('disconnect');
	}function finishdisconnect(response){json = response;
		addToChat(form("Disconnected.","",'system'));
		deactivate('disconnect');
}
function sendPic(){
		message = document.getElementById("input").value;
		if (message !== ''){
			var encoded_message = rfc3986EncodeURIComponent(rfc3986EncodeURIComponent("PICTURE|"+message));
			getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Dchat%26id%3D'+id+'%26to%3D'+to+"%26content%3D"+encoded_message,'finishsendPic');
			activate('picture');
		}
	}function finishsendPic(response){json = response;
		addToChat(form("<img src='"+message+"'>",json.time,"user"));
		document.getElementById('input').value = '';
		deactivate('picture');
}
