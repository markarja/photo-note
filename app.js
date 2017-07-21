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
	window.addEventListener("resize", onOrientationChanged, false);
	
	photo = document.getElementById("photo");
	photo.width = window.innerWidth;
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 40;
}

function onDeviceReady() {
	alert("device is ready");
}

function onOrientationChanged() {
	if(portrait()) {
		
	} else {
		
	}
	
	photo = document.getElementById("photo");
	photo.width = window.innerWidth;
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 40;
}

function portrait() {
	if(window.innerHeight > window.innerWidth) {
		return true;
	} else {
		return false;
	}
}

function takePhoto() {
	navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 100,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: window.innerWidth,
			targetHeight: window.innerHeight	
		}
	);
}

function savePhoto() {
	
	/*
	canvas = document.getElementById("canvas");
	var imageData = canvas.toDataURL('image/jpeg', 1.0);
	
	alert(imageData);
	
	window.imageResizer.storeImage(
	  function(data) { 
    	  alert('Image stored successfully');
      }, function (error) {
    	  alert("Error : \r\n" + error);
      }, imageData, { 
    	  quality:100,
    	  imageDataType: ImageResizer.IMAGE_DATA_TYPE_BASE64 
      }
    );*/
	
	alert(window.canvas2ImagePlugin);
	
	window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            alert(msg);
        },
        function(err){
            alert(err);
        },
        "test",
        "test",
        document.getElementById('canvas')
    );
	
}


function handle(canvas, event) {
    var rect = canvas.getBoundingClientRect();

    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = 'grey';
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