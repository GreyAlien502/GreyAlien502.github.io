import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { API, authorship } from './base.js';

class Message extends React.Component {
	constructor(props){
		super(props);
		this.state = props;
	}
	render(){
		return (<div>
			<h5>{authorship(this.state)}</h5>
			<div dangerouslySetInnerHTML={ {__html:'<pre>'+this.state.content+'</pre>'} } />
		</div>);
	}
}
class Messager extends React.Component {
	render() {
		document.title = 'Messagers:'+this.state.user;
		return(<div>
			<h1>{'Messages:'+this.state.user}</h1>
			{this.state.data?(<div>
				<button onClick={()=>this.update()}>^</button>
				<ul>
					<li key="new">
						<textarea id="newMessage"/><br/>
						<button onClick={()=>this.send()}>Send</button>
					</li>
					{this.state.data.messages.map(message=>(<li key={message.time}>
						<Message
							author={message.author}
							content={message.content}
							time={message.time}
						/>
					</li>))}
				</ul>
				<button onClick={()=>this.more()}>v</button>
			</div>):(
				'Loading...'
			)}
		</div>);
	}
	constructor(props) {
		super(props);
		this.state = this.newState(props);
	}
	componentDidMount() {
		this.load();
	}
	componentWillReceiveProps(newProps){
		this.setState( this.newState(newProps),()=>this.load() );
	}
	newState(props){
		return {
			user: props.match.params.user,
			data: null
		};
	}
	load(){
		API('messages', {
			end: (data=>data==null?null:data.messages.length)(this.state.data),
			user: this.state.user
		})
		.then(response=> this.setState({ data: response }));
	}
	update() {
		API('updateMessages',{
			start:this.state.data.messages[0].time,
			user:this.state.user
		}).then(response=>
			this.state.data==null?
				this.setState({ data: response })
			:
				this.setState(
					{data: {messages: Array.concat(response.messages,this.state.data.messages)} }
				)
		);
	}
	more() {
		API('messages',{
			end:this.state.data.messages.slice(-1)[0].time,
			user:this.state.user
		}).then(response=>this.setState(
			{data: {messages: Array.concat(this.state.data.messages,response.messages)} }
		));
	}
	send(){
		API('message',{
			user:this.state.user,
			content:document.getElementById('newMessage').value
		}).then(()=>{
			document.getElementById('newMessage').value='';
			this.update()
		});
	}
}
class Messagers extends React.Component {
	render() {
		document.title = 'Messagers';
		return (<div>
			<h1>Messagers:</h1>
			{ this.state.data?( <div>
				{this.state.data.messagers.length}
				<button onClick={()=>this.setState({adding:!this.state.editing})}>+</button><br/>
				<button onClick={()=>this.update()}>^</button>
				<ul>
					{this.state.adding?(
						<li key="new">
							<input id="newMessager"/>
							<button onClick={()=>this.send()}>Send</button>
						</li>
					):null}
					{ this.state.data.messagers.map(messager=>(<li key={messager}>
						<a href={"#/messages/"+messager}>{messager}</a>
					</li>)) }
				</ul>
				<button onClick={()=>this.more()}>v</button>
			</div>):(
				<span> Loading...</span>
			)}
		</div>)
	}
	constructor(props) {
		super(props);
		this.state = {
			adding: false,
			data: null
		};
	}
	componentDidMount() {
		this.load();
	}
	load(){
		API('messagers',{})
		.then(response=> this.setState({ data: response }));
	}
	addMessagee() {
		newMessagee = document.getElementById('newMessagee').value;
		API('messager',{ name: newMessagee })
		.then(()=>this.load());
	}
}



let Messages =()=>(
	<Switch>
		<Route exact path='/messages' component={Messagers} />
		<Route path='/messages/:user(.*)' component={Messager} />
	</Switch>
);

export {Messages};
