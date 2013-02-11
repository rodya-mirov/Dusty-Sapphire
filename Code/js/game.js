// Draw everything
var render = function () {
	//blank out the screen
	gameCTX.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	
	renderMethod();
}

function realRenderMethod() {
	drawMap(gameCanvas.width, gameCanvas.height);
}

if (!updateAndRenderFPS) {
	var updateAndRenderFPS = function(arg) { }
};

//run the game
var gameLoop = function()
{
	currentTime = Date.now();
	elapsedTime = currentTime - lastTime;
	
	lastTime = currentTime;
	
	processKeyboardInput();
	processMouseInput();
	
	render();
	updateAndRenderFPS(elapsedTime);
};

var lastTime = Date.now();

finishLoadingImage();

setInterval(gameLoop, 14);