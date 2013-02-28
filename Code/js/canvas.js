//set up the canvas
var gameCanvas = document.getElementById("gameCanvas");
var gameCTX = gameCanvas.getContext("2d");

var loadImage = function(fileName) {
	imagesToLoad++;
	var output = new Image();
	output.src = fileName;
	output.onload = finishLoadingImage;
	return output;
}

window.onload = function() {
	gameCanvas.width = 800;
	gameCanvas.height = 600;
	
	gameCTX.fillStyle = "rgb(255, 75, 75)";
	gameCTX.font = "16px Helvetica";
	gameCTX.textAlign = "right";
	gameCTX.textBaseline = "bottom";

	gameCanvas.addEventListener('contextmenu', function() { return false; }, false);
	gameCanvas.oncontextmenu = function() { return false; }
}

function findElementPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
	
    return undefined;
}

//set up the imaging stuff
var imagesToLoad = 1;   //this is a FAKE image; this should be incremented
			//by one each time a load is started and finishLoadingImage should
			//be called each time one finishes!

//this is a loading message; it will be replaced by a real method once everything is loaded
function renderMethod() {
	gameCTX.fillStyle = "rgb(140, 20, 20)";
	gameCTX.textAlign = "center";
	gameCTX.textBaseline = "center";
	
	gameCTX.fillText("LOADING...", Math.floor(gameCanvas.width / 2), Math.floor(gameCanvas.height / 2));
}

function finishLoadingImage() {
	imagesToLoad--;
	if(imagesToLoad < 0) {
		alert("Programmer error, make sure your image count is correct!");
	}
	else if (imagesToLoad == 0) {
		renderMethod = realRenderMethod;
	}
}