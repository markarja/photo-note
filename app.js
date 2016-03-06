if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

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
	
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function onDeviceReady() {
	alert("device is ready");
}

function onOrientationChanged() {
	if(portrait()) {
		
	} else {
		
	}
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function portrait() {
	if(window.innerHeight > window.innerWidth) {
		return true;
	} else {
		return false;
	}
}

function takePhoto() {
	navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
	    destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccess(imageURI) {
	var image = new Image();
    image.src = imageURI;
    image.width = window.innerWidth;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
}

function onFail(message) {
    alert("Failed because: " + message);
}