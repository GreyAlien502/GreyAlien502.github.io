function updateDefinitions(){
	var perfmatches = [];
	var matches = [];
	var ngenglecian = dictionary();
	var searchee = document.getElementById("search term").value;

	for (var i in ngenglecian) {
		for (var j in ngenglecian[i].translations){
			var translation = ngenglecian[i].translations[j];
			if (translation.english == searchee){
				perfmatches.push(ngenglecian[i]);
			}else if (translation.english.startsWith(searchee)){
				matches.push(ngenglecian[i]);
			}
		}
	}
	document.getElementById('definitions').innerHTML = formatWords(perfmatches)+'<hr>'+formatWords(matches);
}
