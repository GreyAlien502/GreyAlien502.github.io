function comments(post){
	sendAndGet('comments',{'post':post},finishcomments);
	}function finishcomments(reply){
	document.title = reply.post.title;
	var date = new Date(reply.post.time*1000);
	function format(posttime,comment,index){
		var date = new Date(comment.time*1000);
		var output = '<li id="'+comment.time+'"><h5>'+comment.author+" @ "+formatDate(date)+'</h5><pre>'+comment.content+'</pre>'+comment.comments.length+'<a onclick="writeComment('+posttime+','+comment.time+')">+</a><ol>';
		for (var i=0;i<comment.comments.length;i++){
			var actuaindex = index.slice(0);
			actuaindex.push(i);
			output = output + format(posttime,comment.comments[i],actuaindex);
		}
		output = output +'</ol></li>';
		return output;
	}
	
	var content = '<h1>'+reply.post.title+'</h1><h3>'+reply.post.author+" @ "+formatDate(date)+'</h3><pre>'+reply.post.contents+'</pre>'+reply.comments.length+'<a onclick="writeComment('+reply.post.time+','+reply.post.time+')">+</a><ol id="comments">';
	console.log(reply.comments.length);
	for (var i=0;i<reply.comments.length;i++){
		content = content+format(reply.post.time,reply.comments[i],[i]);
	}
	content = content+'</ol>';
	
	document.getElementById('actualcontent').innerHTML = content;
}
function writeComment(post,commentid){
	var comment;
	if (post==commentid){
		comment = document.getElementById('comments');
	}else{
		comment = document.getElementById(String(commentid)).lastChild;
	}
	comment.innerHTML = '<li><textarea id="comment"></textarea><br><button onclick="comment('+post+','+commentid+')">Comment</button></li>'+comment.innerHTML;
}
function comment(post,commentid){
	commentcontent = document.getElementById('comment').value;
	sendAndGet("comment",{'post':post, 'comment':commentid,'content':commentcontent},finishcomment);
}function finishcomment(reply){
	comments(reply.post);
}

