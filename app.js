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
	alert("device is ready");
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

function takePhoto() {
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
	    destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccess(imageURI) {
    var image = document.getElementById("photo");
    image.src = imageURI;
}

function onFail(message) {
    alert("Failed because: " + message);
}