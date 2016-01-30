var GREEN = 'rgb(128, 255, 0)';
var BROWN = 'rgb(43, 34, 5)';
var DISP = 'inline';
//                        Sounds
//                 ||||||||||||||||||
var cows = document.getElementById("cows");
var errors = document.getElementById("errors");
//                        Images
//                 ||||||||||||||||||
var cowi = 'cow.gif';
var blanki = 'blank.gif';
var loseri = 'cow-grave.gif';
var winneri = 'cow-post.gif';

var cattli = cowi;

var x = 0;
var y = 0;

function setVolume(){
	var volume = document.getElementById('volumeSlider').value/100;
	cows.volume = volume;
	errors.volume = volume;
}
function play(sound){
	sound.pause();
	sound.currentTime = 0;
	sound.play();
}

function getField(x, y) {
	return document.getElementById(x.toString() + ',' + y.toString()).style.backgroundColor;
}
function setField(x, y, color) {
	document.getElementById(x.toString() + ',' + y.toString()).style.backgroundColor = color;
}

function alive() {
	return getField(x, y) == GREEN;
}
function won() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (getField(i, j) == GREEN) {
				if (!(i == x & j == y)) {
					return false;
				}
			}
		}
	}
	return true;
}

function win() {
	document.getElementById('endScreen').src = winneri;
	document.getElementById('endDiv').style.display = DISP;
}
function lose() {
	document.getElementById('endScreen').src = loseri;
	document.getElementById('endDiv').style.display = DISP;
}

function tryMove(destx, desty) {
	if (( (Math.pow((x - destx),2) + Math.pow((y - desty),2)) == 1) & alive() &! won()) {
		play(cows);
		setField(x,y,BROWN);
		moveTo(destx, desty);
		if (!alive()) {
			lose();
		} else if (won()) {
			win();
		}
	} else {
		//play(errors);
	}
}
function moveTo(destx, desty) {
	document.getElementById(x.toString() + ',' + y.toString()+'i').src = blanki;
	x = destx;
	y = desty;
	document.getElementById(x.toString() + ',' + y.toString()+'i').src = cowi;
}

function restart() {
	function randPlace() {
		return Math.floor(Math.random() * 4);
	}

	function resetPastures() {
		var i = 0;
		while (i < 4) {
			var j = 0;
			while (j < 4) {
				setField(i, j, GREEN);
				j++;
			}
			i++;
		}
	}
	moveTo(randPlace(),randPlace());
	document.getElementById('endDiv').style.display = "none";
	resetPastures();
}
function setup() {
	var pasturebox = '';
	for (var i = 0; i < 4; i++) {
		pasturebox = pasturebox + '<div class="row" id="' + i.toString() + '">';
		for (var j = 0; j < 4; j++) {
			id = i.toString() + ',' + j.toString();
			pasturebox = pasturebox + '<button class="field" id="'+id+'"onclick="tryMove('+id+')"><img class="fieldi" id="' + id + 'i" src="' + blanki + '"></button>';
		}
		pasturebox += '</div>';
	}
	document.getElementById('game').innerHTML = pasturebox;
	document.getElementById('endScreen').src = winneri;
	
	cows = document.getElementById("cows");
	errors = document.getElementById("errors");
	setVolume();

	restart();
}