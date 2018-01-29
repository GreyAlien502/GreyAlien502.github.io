import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { API, authorship } from './base.js';


class FileContent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			path: props.path,
			content: props.content,
			edit: false
		}
	}
	render(){
		return (<div>
			<button
				onClick={ ()=> this.setState({edit:!this.state.edit}) }
			>+</button><br/>
			{this.state.edit?(<div>
				<textarea
					value={this.state.content}
					onChange={(event)=>this.setState({ content: event.target.value })}
				/><br/>
				<button onClick={()=>this.submit()}> Save </button>
			</div>):(
				<div dangerouslySetInnerHTML={ {__html:"<pre>"+this.state.content+"</pre>"} }/>
			)}
			<br/><button onClick={()=>this.deleteFile()}>-</button>
		</div>);
	}
	submit(){
		API('editFile',{path:this.state.path,data:this.state.content});
	}
	deleteFile(){
		if(
			confirm('Do you want to delete this?')
		){
			API('removeFile',{path:this.state.path})
			.then(()=> window.location.hash = '#files/'+this.state.path.slice(0,-1).join('/') )
		}
	}
}
class DirectoryContent extends React.Component {
	constructor(props){
		super(props);
		this.state = this.newFileState(props);
	}
	newFileState(props){
		return {
			path: props.path,
			files: props.files,
			edit: false,
			load: props.load
		};
	}
	componentWillReceiveProps(newProps){
		let newState = this.newFileState(newProps);
		this.setState(newState);
	}
	render(){
		return (<div>
			<button onClick={()=>this.setState({edit:!this.state.edit})}>+</button>
			<ul>
				{this.state.files.map(file=>
					<li key={file}>
						<a
							href={
								"#files/"
								+this.state.path.reduce( (old,next)=>old+next+'/', '' )
								+file
							}
						>
							{file}
						</a>
					</li>
				)}
				{this.state.edit?(<li key="new">
					<input id="newFilename"/>
					<button onClick={()=>this.addFile('file')}>File</button>
					<button onClick={()=>this.addFile('directory')}>Directory</button>
				</li>):null}
			</ul>
			<button onClick={()=>this.deleteDir()}>-</button>
		</div>)
	}
	addFile(type){
		API('addFile',{
			path:this.state.path.concat([document.getElementById('newFilename').value]),
			type:type
		}).then(this.state.load);
	}
	deleteDir(){
		if(
			confirm('Do you want to delete this?')
			&this.state.files.length==0
		){
			API('removeFile',{path:this.state.path})
			.then(()=> window.location.hash = '#files/'+this.state.path.slice(0,-1).join('/') )
		}
	}
}

class File extends React.Component {
	constructor(props){
		super(props);
		this.state = this.newFileState(props);
	}
	load(){
		return API('files',{path:this.state.path})
		.then(response=>this.setState({ data:response }));
	}
	componentDidMount(){ this.load(); }
	componentWillReceiveProps(newProps){
		let newState = this.newFileState(newProps);
		this.setState(newState,()=>this.load());
	}
	newFileState(props){
		return {
			path: props.match.params.path?props.match.params.path.split('/'):[],
			titleEdit:false,
			data:null
		};
	}
	render(){
		document.title = this.filename();
		if(this.state.data){
			return (<div>
				<h1>Files:</h1>
				<h2>
					<a href="#files/">/</a>
				{
					this.state.path.slice(0,-1).map((filename,index)=>( <a
						key={index}
						href={"#files/"+this.state.path.slice(0,index+1).join('/')}
					> {filename+'/'} </a>) )
				}{
					this.state.titleEdit?(<span>
						<input id="newTitle" defaultValue={this.state.path.slice(-1)}/>
						<button onClick={()=>this.rename()}>Save</button>
						<button onClick={()=>this.setState({titleEdit:false})}>Cancel</button>
					</span>):(
						(filename=> filename?(
							<button onClick={()=>this.setState({titleEdit:true})}>
								{filename}
							</button>
						):(null))(this.state.path.slice(-1)[0])
					)
				}</h2>
				{this.state.data.type=='directory'?(
					<DirectoryContent
						path={this.state.path}
						files={this.state.data.files}
						load={()=>this.load()}
					/>
				):(
					<FileContent
						path={this.state.path}
						content={this.state.data.content}
					/>
				)}
			</div>);
		}else{
			return <span>Loading...</span>;
		}
	}
	rename(){
		let newname=document.getElementById('newTitle').value;
		API('renameFile',{
			path:this.state.path,
			newname:newname
		}).then(
			()=>window.location.hash = "#files/"+this.state.path.slice(0,-1).map(name=>name+'/').join('')+newname,
			()=>console.log('error naming file to '+newname+'.')
		)
	}
}

class Root extends File {
	constructor(props){
		super(props);
		this.state = {
			path: [],
			titleEdit:false,
			contentEdit:false,
			data:null
		};
	}
	filename(){return '/';}
}
class RegularFile extends File {
	filename(){return this.state.path.slice(-1)[0];}
}
let Files =()=>(
	<Switch>
		<Route exact path='/files' component={Root} />
		<Route path='/files/:path(.*)' component={RegularFile} />
	</Switch>
);

export {Files};
