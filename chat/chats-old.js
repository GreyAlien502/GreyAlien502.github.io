<!-- hide script from old browsers
function httpGet(theUrl){
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			return xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", theUrl, false );
	xmlhttp.send();    
}
function addToChat(text){
	var chattext = localStorage.getItem("chattext");
	chattext = text+"<br>"+chattext;
	localStorage.setItem("chattext",chattext);
	document.getElementById("chattext").innerHTML = chattext;
}
function printCat(){
	addToChat("cat");
}
function setup(){
	var id = Math.floor(Math.random() * 10000000);
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem("id", id);
		localStorage.setItem("to",to);
		clearChat();
	} else {
		alert ("Sorry, storage is not supported in your browser. Upgrade to a better browser if you ever want to use this feature." );
	}
}
function clearChat(){
	localStorage.setItem("chattext","");
	document.getElementById("chattext").innerHTML = "";
}
function login(){
	window.open("http://www.w3schools.com");
	var id = localStorage.getItem("id");
	addToChat(httpGet("http://ec.androiddown.com/chat/app.php?cmd=login&id="+id+"&plat=iphone"));
}
function keep(){
	var id = localStorage.getItem("id");
	addToChat(httpGet('http://ec.androiddown.com/chat/app.php?cmd=keep&id='+id+'&plat=iphone'));
}
function disconnect(){
	var id = localStorage.getItem("id");
	var to = localStorage.getItem("to");
	addToChat(httpGet('http://ec.androiddown.com/chat/app.php?cmd=disconnect&id='+id+'&to='+to+'&plat=iphone'));
}
function chat(){
	var id = localStorage.getItem("id");
	var to = localStorage.getItem("to");
	addToChat(httpGet("http://www.google.com")))
	//addToChat(httpGet('http://ec.androiddown.com/chat/app.php?cmd=chat&id='+id+'&to='+to+'&content='+encodedMessage+'&plat=iphone'));
}

// end hiding script from old browsers -->