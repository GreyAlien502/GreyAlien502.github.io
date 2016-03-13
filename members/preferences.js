function preferences(){
	document.title = "Preferences";
	sendAndGet('preferences',{},finishpreferences);
	}function finishpreferences(reply){
	var prefs = reply.prefs;
	var prefkeys = Object.keys(prefs);
	var content = "<h1>Preferences</h1><ul>";
	for (var i = 0;i<prefkeys.length;i++){
		content += '<li>'+prefkeys[i]+'<input id="'+prefkeys[i]+'" value="'+prefs[prefkeys[i]]+'"></li>\n';
	}
	window.sessionStorage.setItem('prefkeys',JSON.stringify(prefkeys));
	content += "</ul><button onclick=\"preference()\">Save</button>";
	document.getElementById("actualcontent").innerHTML = content;
}

function preference(){
	var prefs = {};
	var prefkeys = JSON.parse(window.sessionStorage.getItem('prefkeys'));
	for (var keynum in prefkeys){
		var key = prefkeys[keynum];
		prefs[key] = document.getElementById(key).value;
	}
	var sendback = getSendback();
	sendAndGet('preference',prefs,idontcare);
}
