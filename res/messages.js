var language = "en-us";
var messages = {
	"en-us" : [
	    {"key" : "takephoto", "value" : "Take photo"},
	    {"key" : "savephoto", "value" : "Save photo"},
	    {"key" : "help", "value" : "Tap the camera to take a photo."},
	    {"key" : "help-measure-first", "value" : "Tap on the screen to add first point of a measure."},
	    {"key" : "help-measure-second", "value" : "Tap on the screen to add second point of a measure."},
	    {"key" : "help-measure-text", "value" : "Enter a measurement value."}
	],	
	"fi-fi" : [
	    {"key" : "takephoto", "value" : "Ota kuva"},
	    {"key" : "savephoto", "value" : "Tallenna kuva"}
   	],
	"sv-se" : [
	    {"key" : "takephoto", "value" : "Ta foto"},
	    {"key" : "savephoto", "value" : "Spara foto"} 
  	], 
  	"es-es" : [  
  	    {"key" : "messagekey", "value" : "messagevalue"}       
  	],
  	"de-de" : [
  	    {"key" : "messagekey", "value" : "messagevalue"}       
 	]  	
};

function getMessage(key) {
	var message = "?" + key + "?";
	if(messages[language] == undefined) {
		language = "en-us";
    }
	for(i = 0;i < messages[language].length;i++) {
		if(messages[language][i].key == key) {
			message = messages[language][i].value;
			break;
		}
	}
	return message;
}

function localize(language) {
	if(messages[language] == undefined) {
		language = "en-us";
	}

	for(i = 0;i < messages[language].length;i++) {
		var element = document.getElementById(messages[language][i].key);
		if(element != null && element != undefined) {
			element.innerHTML = messages[language][i].value;
		}
	}
}
