function rfc3986EncodeURIComponent (str) {  
	return encodeURIComponent(str).replace(/[!'()*]/g, escape);  
}
function getURL(url,callback){
	/*var script = document.createElement('script');
	//"https://jsonp.afeld.me/?callback="+callback+"&url="+url;
	// 'http://alloworigin.com/get?url='+url+'&callback='+callback;
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'"+url+"'&format=json&diagnostics=true&callback="+callback;
	document.body.appendChild(script);*/

	//url = 'https://crossorigin.me/' + url;
	//url = 'http://cors-proxy.htmldriven.com/?url=' + url;
	url = 'http://query.yahooapis.com/v1/public/yql?diagnostics=false&format=json&q=select%20*%20from%20html%20where%20url%3D\''+rfc3986EncodeURIComponent(url.replace(/\'/g,"\\'"))+ '\'';


	var request = new XMLHttpRequest();
	if("withCredentials" in request) {
		request.open('GET', url, true);
	}else if(typeof XDomainRequest != "undefined") {
		request = new XDomainRequest();
		request.open('GET', url);
	}

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log(request.responseText);
			var myArr = JSON.parse(request.responseText);
			console.log(myArr.query.results.body);
			callback(myArr.query.results.body);
		}
	};
	request.send();
}
function getResource(cmd,id,to,callback){
	var script = document.createElement('script');
	script.src = 'http://qzfbhpc4waxkrcdg.onion.to/chat/app.php.js?cmd='+cmd+'&id='+id+'&callback='+callback+'&to='+to;
	document.body.appendChild(script);
}

function idontcare(aboutthis){}

function getSendback(){
	if (localStorage.getItem("sendback") === null) {
		var width = window.screen.availWidth;
		var height = window.screen.availHeight;
		return ''+width+'x'+height+Math.random();
	}
	return localStorage.getItem('sendback')+Math.random()+'';
}

var requestData = {};//callback, response, tries

function setCreds(username,password){
	localStorage.setItem("username", username);
	localStorage.setItem("password",password);
}

function sendRequest(sendback,command,data){
	var username = localStorage.getItem("username");
	var password = localStorage.getItem("password");
	var message = {"sendback":sendback,"username":username,"password":password,"command":command,"data":data};
	
	message = JSON.stringify(message);
	var encoded_message = rfc3986EncodeURIComponent(rfc3986EncodeURIComponent(message));
	//getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Dchat%26id%3Dzerving_hat%26to%3D'+encoded_message,'idontcare');
	//getURL('http%3A%2F%2Fd6rb4djowarvwvp5.onion.to%2Fchat%2Fapp.php%3Fcmd%3Dchat%26id%3Dzerving_hat%26to%3D'+encoded_message,'idontcare');
	getResource('chat','zerving_hat',encoded_message,'idontcare');
	requestData[sendback]={"callback":null,"response":'',"tries":0,"run":null};
}

function getReply(sendback,callback){
	precallback = 'function'+Math.round(Math.random()*1000000000000);
	window[precallback] = new Function('response',"return finishgetReply(response,'"+sendback+"');");
	requestData[sendback].callback = callback;
	//getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Dkeep%26id%3D'+sendback,precallback);
	getResource('keep',sendback,'idontcare',precallback);
	}function finishgetReply(response,sendback){console.log(response);json = response;
		var callback = requestData[sendback].callback;
		console.log(requestData[sendback]);
		
		function processEvent(event,sendback){
			console.log(event);
			if( event.type == 'disconnect'){//0:done; 1:in process;
				requestData[sendback].response = requestData[sendback].response + event.from.substring(1);
				if (event.from.charAt(0) == '0'){
					requestData[sendback].tries = 999999999;
				}else if(event.from.charAt(0)== '1'){
					requestData[sendback].tries = 0;
				}else{
					window.alert(event.from);
				}
			}
		}
		requestData[sendback].tries = requestData[sendback].tries+1;
		if (json.hasOwnProperty('events')) {
			if (json.events.hasOwnProperty('type')){
				processEvent(json.events,sendback);
			}else{
				for (eventnum = 0; eventnum < json.events.length; eventnum++) {
						processEvent(json.events[eventnum],sendback);
				}
			}
		}
		console.log(requestData[sendback].response);
		if (requestData[sendback].tries < 100){
			getReply(sendback,callback);
		}else{
			requestData[sendback].callback='null';
			callback(JSON.parse(requestData[sendback].response));
		}
}

function sendAndGet(command,data,callback){
	var sendback = getSendback();
	sendRequest(sendback,command,data);
	setTimeout(function(){getReply(sendback,callback);},250);
}
