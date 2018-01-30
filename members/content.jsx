import React from 'react';
import ReactDOM from 'react-dom';     
import { HashRouter, Switch, Route } from 'react-router-dom';

import { Posts } from './posts.jsx';
import { Files } from './files.jsx';
import { Preferences } from './preferences.jsx';
import { Cats } from './cats.jsx';
import { Messages } from './messages.jsx';

if(localStorage.getItem("username") === null){
	localStorage.setItem("username","guest");
	localStorage.setItem("password","guest");
}
document.getElementById('username').innerHTML=localStorage.getItem("username");

const Main = ()=>(
	<Switch>
		<Route path='/posts' component={Posts} />
		<Route path='/files' component={Files} />
		<Route path='/preferences' component={Preferences} />
		<Route path='/cats' component={Cats} />
		<Route path='/messages' component={Messages} />
	</Switch>
);


ReactDOM.render(
	<HashRouter><Main/></HashRouter>,
	document.getElementById('actualcontent')
);
