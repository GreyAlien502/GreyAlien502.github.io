function home(){
    sendAndGet('home',{},finishhome);
    }function finishhome(reply){
    document.getElementById("content").innerHTML = reply;
}

function go(){
    function scrollToEventually(element){
        try{element.scrollIntoView();}
        catch(e){setTimeout(
            function(){scrollToEventually(element);},
        300);}
    }
    console.log('initializing');
    var username = localStorage.getItem("username"); 
    if ( username === null){
        setCreds('guest','guest');
        username = 'guest';
    }
    document.getElementById('username').innerHTML = username;
    var RL = window.location.hash.substring(1);
    var RLlecian = RL.split('/');
    document.getElementById('actualcontent').innerHTML = "Loading...";
    if (RLlecian[RLlecian.length-1] === ''){
        RLlecian.pop();
    }
    
    if (RLlecian[0] == 'posts'){
        if (RLlecian.length == 1){
            posts(0);
        }else{
            setNavigation([['#posts','Posts']]);
            if (RLlecian[1] == 'new'){
                writePost();
            } else {
                comments(RLlecian[1]);
                if (RLlecian.length != 2){
                    scrollToEventually(document.getElementById(RLlecian.pop()));
                }
            }
        }
    }else if(RLlecian[0] === 'logout'){
        logout();    
    }else if(RLlecian[0] === 'files'){
             file(RLlecian.slice(1).join('/'));
    }else if(RLlecian[0] === 'preferences'){
        preferences();
    }else if(RLlecian[0] === 'cats'){
        cats();
    }else if(RLlecian[0] === 'messages'){
        if (RLlecian.length == 1){
            messagers();
        }else{
            messages();
        }
    }else if(RLlecian[0] === ''){
        home();
   }
    window.scrollTo(0,0);
}

function formatDate(date){
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" "+date.getHours()+':'+date.getMinutes()+":"+date.getSeconds();
}
function setNavigation(navlecian){
    var output = '';
    for (var i=0;i++;i<navlecain.length){
        output += '|<a href="'+navlecian[i][0]+'">'+navlecain[i][1]+'</a>';
    }
    document.getElementById('navigation').innerHTML = output;
}



function logout(){
    setCreds('guest','guest');
    window.location.href = '../index.html';
}

