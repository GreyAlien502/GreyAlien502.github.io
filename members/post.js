function posts(start){
    document.title = 'Posts';
    window.sessionStorage.setItem('postStart',start);
    sendAndGet("posts",{'start':start},finishposts);
    }function finishposts(reply){
    var start = window.sessionStorage.getItem('postStart');
    var content = '<h1>Posts:</h1>'+reply.posts.length+'<a href="#posts/new">+</a><ol>';
    for (var i=0;i<reply.posts.length;i++){
        var post = reply.posts[i];
        var date = new Date(post.time*1000);
        content = content+'<li><h2><a href="#posts/'+post.time+'">'+post.title+'</a></h2><h3>'+post.author+" @ "+formatDate(date)+'</h3><pre>'+post.contents+'</pre></li>';
        document.getElementById("actualcontent").innerHTML = content;
    }
    content = content+'</ol><a onclick="posts(0)">Top</a><br>\
    <a onclick="posts('+(start-reply.posts.length)+')">&lt;</a><a onclick="posts('+(parseInt(start)+reply.posts.length)+')">&gt;</a><br>';
    document.getElementById("actualcontent").innerHTML = content;
}
function writePost(){
    setNavigation([['#new','New']]);
    document.getElementById('actualcontent').innerHTML = '<h1>New Post</h1><input id="title"><br><textarea id="postcontent"></textarea><br><button onclick="post()">Post</button>';
    document.title = 'New Post';
}
function post(){
    posttitle = document.getElementById('title').value;
    postcontent = document.getElementById('postcontent').value;
    sendback = getSendback();
    sendRequest(sendback,"post",{'title':posttitle, 'contents':postcontent});
    getReply(sendback,finishpost);
}function finishpost(reply){
    window.location.href = '#posts';
}
