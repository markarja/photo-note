var photo = null;
var canvas = null;

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
	navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
	    destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccess(imageURI) {
    canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var h = 0;
    var rf = 1;
	photo = document.getElementById("photo");
	photo.width = window.innerWidth;
	photo.onload = function() {
      context.drawImage(photo, 0, 0);
    };
    
    window.imageResizer.getImageSize(
	  function(data) { 
    	  w = data.width;    	  
    	  rf = w / window.innerWidth;
      }, function (error) {
    	  alert("Error : \r\n" + error);
      }, imageURI, { }
    );
    
    window.imageResizer.resizeImage(
      function(data) { 
    	  photo.src = "data:image/jpeg;base64," + data.imageData; 
      }, function (error) {
    	  alert("Error : \r\n" + error);
      }, imageURI, rf, rf, {
    	  resizeType:ImageResizer.RESIZE_TYPE_FACTOR,
    	  format:'jpg',
    	  imageType : ImageResizer.IMAGE_DATA_TYPE_URL,
    	  storeImage : false,
    	  pixelDensity : true
      }
    );
    
	//photo.src = imageURI;
}

function onFail(message) {
    alert("Failed because: " + message);
}