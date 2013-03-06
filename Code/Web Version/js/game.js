// Draw everything
//this is the render method which will actually be used!
var realRenderMethod = function() {
	tileMap.drawMap(gameCanvas.width, gameCanvas.height);
	drawWorldObject(playerCharacter);
	
	compass.draw(gameCanvas.width, gameCanvas.height);
}

var drawWorldObject = function(obj){
    var drawPos = obj.drawPosition();

	gameCTX.drawImage(
		obj.image,
		
		obj.drawX,
		obj.drawY,
		obj.drawWidth,
		obj.drawHeight,
		
		drawPos.x - camera.leftX(),
		drawPos.y - camera.topY(),
		obj.drawWidth,
		obj.drawHeight
		);
}

var render = function () {
	//blank out the screen
	gameCTX.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	
	renderMethod();
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
	
	camera.update();
	
	render();
	updateAndRenderFPS(elapsedTime);
};

var lastTime = Date.now();

finishLoadingImage();

setInterval(gameLoop, 14);