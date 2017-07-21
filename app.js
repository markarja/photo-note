var photo = null;
var canvas = null;
var context = null;

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
	
	photo = document.getElementById("photo");
	photo.width = window.innerWidth;
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 40;
}

function onDeviceReady() {
	
}

function capture() {
	navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 100,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: window.innerWidth,
			targetHeight: window.innerHeight	
		}
	);
}

function save() {	
	window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(message){
            alert(message);
        },
        function(error){
            alert(error);
        },
        null,
        null,
        document.getElementById('canvas')
    );
}


function handle(canvas, event) {
    var rect = canvas.getBoundingClientRect();

    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    context.beginPath();
    context.arc(x, y, 2, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
}

function onSuccess(imageURI) {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
	photo = document.getElementById("photo");
	photo.width = window.innerWidth;
	photo.src = imageURI;
	photo.onload = function() {
      context.drawImage(photo, 0, 0);
    };
}

function onFail(message) {
    alert("Failed because: " + message);
}