import React from 'react'; import ReactDOM from 'react-dom';     
import { HashRouter, Switch, Route } from 'react-router-dom';

import { Posts } from './posts.jsx';
import { Files } from './files.jsx';
import { Preferences } from './preferences.jsx';
import { Cats } from './cats.jsx';
import { Messages } from './messages.jsx';

if(localStorage.getItem("username") === null){
}
document.getElementById('username').innerHTML=localStorage.getItem("username");
let Logout =()=>{
	localStorage.setItem("username","guest");
	localStorage.setItem("password","guest");
	document.getElementById('username').innerHTML=localStorage.getItem("username");
	return <span>Logged out.</span>;
}


const Main = ()=>(
	<Switch>
		<Route path='/posts' component={Posts} />
		<Route path='/files' component={Files} />
		<Route path='/preferences' component={Preferences} />
		<Route path='/cats' component={Cats} />
		<Route path='/messages' component={Messages} />
		<Route path='/logout' component={Logout} />
	</Switch>
);


ReactDOM.render(
	<HashRouter><Main/></HashRouter>,
	document.getElementById('actualcontent')
);
