import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { API, authorship } from './base.js';


let Cats =()=>(<div>
	<h1>Cat Facts!</h1>
	<p>
		Enter an email to recieve cat facts daily.
		To send a text, enter the SMS Gateway Address,
		which you can look up <a href="http://www.freecarrierlookup.com/" target="_blank">here</a>.
	</p>
	<input id="nomination"/><br/>
	<button onClick={
		()=>API('cat',{to:document.getElementById('nomination').value})
	}>CAT</button>
</div>);
export {Cats};
