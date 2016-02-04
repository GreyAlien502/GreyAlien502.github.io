function updateDefinitions(){
	var perfmatches = [];
	var matches = [];
	var ngenglecian = dictionary();
	var searchee = document.getElementById("search term").value;

	for (var i in ngenglecian) {
		if (ngenglecian[i].original == searchee){
			perfmatches.push(ngenglecian[i]);
		}
		if (ngenglecian[i].original.startsWith(searchee)){
			matches.push(ngenglecian[i]);
		}
	}
	document.getElementById('definitions').innerHTML = formatWords(perfmatches)+'<hr>'+formatWords(matches);
}
