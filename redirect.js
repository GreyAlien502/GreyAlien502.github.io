function redirect(){
    var RL = window.location.hash.substring(1);
    if (RL !== ''){
        window.location.href = "http://greyalien502.github.io/"+RL;
    }
}
