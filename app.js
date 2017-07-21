var photo = null;
var canvas = null;
var context = null;
var state = 0;
var x, y, x0, y0;

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
	canvas.height = window.innerHeight;
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
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    
    if(state == 0) {
        
        context.beginPath();
        context.arc(x, y, 2, 0, 2 * Math.PI, false);
        context.fillStyle = '#ffffff';
        context.fill();
        
    	x0 = x;
    	y0 = y;
    	
    	document.getElementById('help').innerHTML = 
        	getMessage('help-measure-second');
    	
    	state = 1;
    	
    } else if(state == 1) {
    	
    	 context.beginPath();
         context.moveTo(x0, y0);
         context.lineTo(x, y);
         context.strokeStyle = '#ffffff';
         context.lineWidth = 2;
         context.stroke();
         
         document.getElementById('help').innerHTML = 
         	getMessage('help-measure-text');
         
         state = 2;
         
         document.getElementById("text").style.left = x + 'px';
         document.getElementById("text").style.top = y + 'px';
         document.getElementById("text").style.visibility = 'visible';
         
    } else {
    	
    	document.getElementById("text").style.visibility = 'hidden';
    	context.font = "10px Arial";
    	context.fillText(document.getElementById("text").value,x - (x0 / 2),y - 5);
    	context.fillStyle = '#ffffff';
    	document.getElementById("text").value = '';
        document.getElementById('help').innerHTML = 
        	getMessage('help-measure-first');
    	
    	state = 0;
    	
    }
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
    document.getElementById('help').innerHTML = 
    	getMessage('help-measure-first');
}

function onFail(message) {
    alert("Failed because: " + message);
}