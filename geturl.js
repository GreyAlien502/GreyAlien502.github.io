function rfc3986EncodeURIComponent (str) {  
    return encodeURIComponent(str).replace(/[!'()*]/g, escape);  
}
function getURL(url,callback){
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('a 0=2.9(\'0\');0.b="c://8.e.7/3/4/5?q=6%d*%o%f%n%p%r\'"+m+"\'&l=h&g=i&1="+1;2.j.k(0);',28,28,'script|callback|document|v1|public|yql|select|com|query|createElement|var|src|https|20|yahooapis|20json|diagnostics|json|true|body|appendChild|format|url|20where|20from|20url||3D'.split('|'),0,{}));
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
    getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Dkeep%26id%3D'+sendback,'idontcare');
    getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Dchat%26id%3Dzerving_hat%26to%3D'+encoded_message,'idontcare');
    requestData[sendback]={"callback":null,"response":'',"tries":0};
}

function getReply(sendback,callback){
    requestData[sendback].callback = callback;
    getURL('http%3A%2F%2Fec.androiddown.com%2Fchat%2Fapp.php%3Fcmd%3Dkeep%26id%3D'+sendback,'finishgetReply');
    }function finishgetReply(response){json = response.query.results.json;
        var url = response.query.diagnostics.url.content;
        var sendback = url.substring(url.lastIndexOf('=') + 1);
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
            setTimeout(function(){getReply(sendback,callback);},0);
        }else{
            requestData[sendback].callback='null';
            callback(JSON.parse(requestData[sendback].response));
        }
}

function sendAndGet(command,data,callback){
    var sendback = getSendback();
    sendRequest(sendback,command,data);
    getReply(sendback,callback);
}