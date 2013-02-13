// Draw everything
//this is the render method which will actually be used!
var realRenderMethod = function() {
	drawMap(gameCanvas.width, gameCanvas.height);
	drawWorldObject(character);
}

var drawWorldObject = function(obj){
	gameCTX.drawImage(
		obj.image,
		
		obj.drawX,
		obj.drawY,
		obj.drawWidth,
		obj.drawHeight,
		
		obj.worldX + obj.drawOffsetX - tileMap.cameraLeftX,
		obj.worldY + obj.drawOffsetY - tileMap.cameraTopY,
		obj.drawWidth,
		obj.drawHeight
		);
	
	//alert("Got drawn at (" + (obj.worldX + obj.drawOffsetX - tileMap.cameraLeftX) + "," + (obj.worldY + obj.drawOffsetY - tileMap.cameraTopY + ")"));
}

var render = function () { //this is just a temp value for render, which gets replaced when things are done loading
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
	
	render();
	updateAndRenderFPS(elapsedTime);
};

var lastTime = Date.now();

finishLoadingImage();

setInterval(gameLoop, 14);