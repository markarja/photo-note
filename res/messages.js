var language = "en-us";
var messages = {
	"en-us" : [
	    {"key" : "takephoto", "value" : "Take photo"},
	    {"key" : "savephoto", "value" : "Save photo"}
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
