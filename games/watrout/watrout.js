'use strict';
var context = new window.AudioContext();
var gain = context.createGain();
gain.connect(context.destination);
gain.gain.setValueAtTime(.1, context.currentTime);

var objects = {};

function dependsOn(name,evaluator){
	var collider = Object.keys(objects).find(
		key => (key!=name & !evaluator(objects[key].frequency.value))
	);
	if(collider!= undefined){
		console.log(name+' hit '+collider);
		objects[name].stop();
		delete objects[name];
		objects[collider].stop();
		delete objects[collider];
	}
}
function move(name,displacement){
	var position = objects[name].frequency.value+displacement;
	objects[name].frequency.value = position;
	dependsOn(
		name,
		value => (
			( (point1,point2) => (value-point1)*(value-point2) > 0 )
			(position,position-displacement)
		)
	);
}
function teleport(name,factor){
	var position = objects[name].frequency.value*factor;
	objects[name].frequency.value = position;
	dependsOn(name,value => (value != position));
}

function create(name,position){
	var object = context.createOscillator();
	object.type = 'sine';
	object.frequency.value = position;
	object.connect(gain);
	object.start();
	objects[name] = object;
	dependsOn(name,value => (value != position));
}
function setup(){
	var SKY_HEIGHT = 2000;
	var SPAWN_HEIGHT = 500;
	var WALL_HEIGHT = 120;
	document.body.addEventListener(
		'wheel',
		(e => move('me',e.deltaY*5) )
	);
	document.body.onclick=(trash => teleport('me',2));
	create('me',SPAWN_HEIGHT);
	create('wall',WALL_HEIGHT);
	create('meteor',SKY_HEIGHT);
	setInterval(function(){
		if(objects['meteor'].frequency.value == WALL_HEIGHT+1){
			objects['meteor'].frequency.value= SKY_HEIGHT;
		}
		move('meteor',-1);
	},1);
} 
