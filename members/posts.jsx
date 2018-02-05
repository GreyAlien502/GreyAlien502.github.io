import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { API, authorship } from './base.js';

class CommentBox extends React.Component{
	constructor(props){
		super(props);
		this.state=Object.assign({expand:false},props);
	}
	componentWillReceiveProps(newProps){
		console.log(newProps);
		this.setState({
			comments:newProps.comments,
			expand:false
		});
	}
	render(){
		return ( <div>
			{this.state.comments.length}
			<button
				onClick={()=>this.setState({expand:!this.state.expand})}
			>
				{this.state.expand?'-':'+'}
			</button>
			<ol>
				{this.state.comments.map( comment=> <li key={comment.time} id={comment.time}>
					<h5>{authorship(comment)}</h5>
					<div dangerouslySetInnerHTML={ {__html:"<pre>"+comment.content+"</pre>"} }/>
					<CommentBox
						comments={comment.comments}
						comment={this.state.comment}
						time={comment.time}
					/>
				</li>)}
				{this.state.expand?(<li key="new">
					<textarea id={"comment"+this.state.time}/><br/>
					<button onClick={ ()=>{
						this.state.comment(
							this.state.time,
							document.getElementById("comment"+this.state.time).value
						);
					}} >
						Comment
					</button>
				</li>):null}
			</ol>
		</div>);
	}
}
class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.newState(props);
	}
	load(){
		API('comments', { post: this.state.postId })
		.then(response=>this.setState({ data: response }));
	}
	componentDidMount() {
		this.load();
	}
	componentWillReceiveProps(newProps){
		this.setState( this.newState(newProps),()=>this.load() );
	}
	newState(props){
		return {
			postId: parseFloat(props.match.params.postId),
			data: null
		};
	}
	render() {
		let comment =(parentId, content)=>{
			console.log('laodaing', parentId, content);
			API('comment', {
				'post': this.state.postId,
				'comment': parentId,
				'content': content
			}).then(
				()=>this.load()
			);
		};
		if(this. state.data){
			document.title = this.state.data.post.title;
			return(<div id={this.state.data.post.time}>
				<h1>{this.state.data.post.title}</h1>
				<h3>{authorship(this.state.data.post)}</h3>
				<div dangerouslySetInnerHTML={ {__html:'<pre>'+this.state.data.post.contents+'</pre>'} }/>
				<CommentBox
					comments={this.state.data.comments}
					comment={comment}
					time={this.state.data.post.time}
				/>
			</div>);
		}else{
			return <span> Loading...</span>;
		}
	}
}
class NewPost extends React.Component {
	render(){
		let submit=()=> API('post', {
			title: document.getElementById('title').value,
			contents: document.getElementById('postContent').value
		}).then(
			()=>window.location.hash="#posts"
		);
		return ( <div>
			<h1>New Post</h1>
			<input id="title"/><br/>
			<textarea id="postContent"/><br/>
			<button onClick={submit}>Post</button>
		</div>);
	}
}
class PostList extends React.Component {
	constructor(props){
		super(props);
		this.state = this.newState(props)
	}
	load() {
		API('posts', { start: this.state.postNumber })
		.then(response=>this.setState({ data: response }));
	}
	componentDidMount() {
		document.title = "Posts";
		this.load();
	}
	componentWillReceiveProps(newProps){
		this.setState( this.newState(newProps),()=>this.load() );
	}
	newState(props){
		return {
			postNumber: (postnum=>postnum?postnum:0)(parseInt(props.match.params.postNumber)),
			data: null
		};
	}


	render() {
		return (<div>
			<h1>Posts:</h1>
			{this.state.data?(<div>
				<span>{this.state.data.posts.length}</span><a href="#posts/new">+</a>
				<ol>{this.state.data.posts.map(post=>(<li key={post.time}>
					<h2><a href={"#posts/" + post.time}>
						{post.title}
					</a></h2>
					<h3>{authorship(post)}</h3>
					<div dangerouslySetInnerHTML={ {__html:'<pre>'+post.contents} } />
				</li>))}</ol>
				<a href={"#posts/p"+(this.state.postNumber-this.state.data.posts.length)}> &lt; </a>
				<a href={"#posts/p"+(this.state.postNumber+this.state.data.posts.length)}> &gt; </a>
			</div>):(
				<span>Loading...</span>
			)}
		</div>);
	}
}

let Posts =()=>(
	<Switch>
		<Route exact path='/posts' component={PostList} />
		<Route path='/posts/p:postNumber([0-9]*)' component={PostList} />
		<Route path='/posts/:postId([0-9.]*)' component={Post} />
		<Route exact path='/posts/new' component={NewPost} />
	</Switch>
);

export {Posts};
