function init() {
	
	language = window.navigator.language || window.navigator.browserLanguage;
	language = language.toLowerCase();
	
	if(language.startsWith("es")) {
		language = "es-es";
	} else if(language.startsWith("de")) {
		language = "de-de";
	}
	
	localize(language);
	
	document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener("resize", onOrientationChanged, false);
}

function onDeviceReady() {
	
	
}

function onOrientationChanged() {
	if(portrait()) {
		
	} else {
		
	}
}

function portrait() {
	if(window.innerHeight > window.innerWidth) {
		return true;
	} else {
		return false;
	}
}