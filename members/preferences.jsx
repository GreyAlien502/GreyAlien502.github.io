import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { API, authorship } from './base.js';


class Preferences extends React.Component {
	constructor(props){
		super(props);
		this.state = {data:null}
		document.title="Preferences"
	}
	load(){
		return API('preferences',{})
		.then(response=>this.setState(response));
	}
	componentDidMount(){ this.load(); }
	render(){
		if(this.state.prefs){
			return (<div>
				<h1>Preferences:</h1>
				<ul>{Object.entries(this.state.prefs).map(entry=>(
					<li key={entry[0]}>
						{entry[0]+":"}
						<input
							id={entry[0]+" input"}
							defaultValue={entry[1]}
						/>
					</li>
				))}</ul>
				<button onClick={()=>this.save()}>Save</button>
			</div>);
		}else{
			return <span>Loading...</span>;
		}
	}
	save(){
		let newPrefs = Object.keys(this.state.prefs).reduce(
			(old,next)=>Object.assign( old, {[next]:parseInt(document.getElementById(next+' input').value)} ),
			Object()
		);
		API('preference',newPrefs);
		this.setState({prefs:newPrefs});
	}
}

export {Preferences};
