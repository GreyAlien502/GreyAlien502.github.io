let API = (command,data) => {
	let encode = str => encodeURIComponent(str).replace(/[!'()*]/g, escape);
	return fetch(
		"https://mebio"+"us.us.to/memebers.js?"+
		(queries=>Object.keys(queries).map( key => encode(key)+'='+encode(queries[key]) ))({
			'username':localStorage.getItem("username"),
			'password':localStorage.getItem("password"),
			'command': command,
			'data':    JSON.stringify(data)
		}).join('&'),
		{mode: 'cors'}
	).then(x=>x.json(),()=>API(command,data));
}
let formatTime=time=>{
	let date = new Date(time*1000);
	return (
		date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" "+
		date.getHours()+':'+date.getMinutes()+":"+date.getSeconds()
	);
}
function authorship(post){
	return post.author+' @ '+formatTime(post.time);
}

export { API, formatTime, authorship };
