imagesToLoad++;
var squareTileset = new Image();
squareTileset.src = "images/SquareTileSheet.png";
squareTileset.onload = function() { finishLoadingImage(); }

var tileMap = {

	makeRandom: function(xIndex, yIndex) {
		var seed = (xIndex & 65535) + (yIndex << 16); //combine them into a uniform seed
		return (seed * seed) % 509203;
	},
};

tileMap.findTileIndexAt = function(xIndex, yIndex){
	if (xIndex == 0 && yIndex == 0) {
		return {x: 1, y: 1};
	}
	if (xIndex == 1 && yIndex == 1) {
		return {x: 0, y: 2};
	}
	if (xIndex == 2 && yIndex == 1) {
		return {x: 0, y: 2};
	}
	if (xIndex == 2 && yIndex == 2) {
		return {x: 0, y: 2};
	}
	if (xIndex == 2 && yIndex == 3) {
		return {x: 0, y: 2};
	}
	else {
		return {x: 0, y: 1};
	}
};

tileMap.drawMap = function(screenWidth, screenHeight) {
	var translation = {
		x: screenWidth >> 1, //center, then move a little to deal with the
		y: screenHeight >> 1 //nature of tiles (which start at +5,+10
	};
	
	//set up the (map) tile change as the (screen) tile changes
	var rightTileChange;
	var downTileChange;
	var tileCenter = {
		x: camera.centerX >> 5,
		y: camera.centerY >> 5,
	};
	
	var additionalTranslation = {
		x: camera.centerX - tileCenter.x * 32,
		y: camera.centerY - tileCenter.y * 32,
	}
	
	switch(camera.rotation) {
		case 0:
			rightTileChange = { dx: 1, dy: 0 };
			downTileChange = { dx: 0, dy: 1 };
			
			additionalTranslation = {
				x: additionalTranslation.x,
				y: additionalTranslation.y,
			};
			
			//alert("(" + additionalTranslation.x + "," + additionalTranslation.y + ")");
			
			break;
		
		case 90:
			rightTileChange = { dx: 0, dy: -1 };
			downTileChange = { dx: 1, dy: 0 };
			
			additionalTranslation = {
				x: 32 - additionalTranslation.y,
				y: additionalTranslation.x,
			};
			
			break;
		
		case 180:
			rightTileChange = { dx: -1, dy: 0 };
			downTileChange = { dx: 0, dy: -1 };
			
			additionalTranslation = {
				x: 32 - additionalTranslation.x,
				y: 32 - additionalTranslation.y,
			};
			break;
		
		case 270:
			rightTileChange = { dx: 0, dy: 1 };
			downTileChange = { dx: -1, dy: 0 };
			
			additionalTranslation = {
				x: additionalTranslation.y,
				y: 32 - additionalTranslation.x,
			};
			break;
	}
	
	translation.x -= additionalTranslation.x;
	translation.y -= additionalTranslation.y;
	
	//go this many from center
	var tilesLeft = 5;
	var tilesUp = 5;
	
	//which means we'll start here, in the (screen's) upper left corner
	var startTile = {
		x: tileCenter.x - tilesLeft * rightTileChange.dx - tilesUp * downTileChange.dx,
		y: tileCenter.y - tilesLeft * rightTileChange.dy - tilesUp * downTileChange.dy,
	};
	
	var tilesWide = 2 * tilesLeft + 1;
	var tilesTall = 2 * tilesUp + 1;
	
	var currentTile = {};
	
	var startDrawPos = {
		x: -tilesLeft * 32 - 5,
		y: -tilesUp * 32 - 10,
	};
	
	var drawPos = {};
	
	//move the "center" of the map from the UL corner to the center of the screen
	gameCTX.translate(translation.x, translation.y );
	
	if (camera.rotationFrames > 0) {
		gameCTX.rotate(camera.rotationInertia);
	}
	
	drawPos.x = startDrawPos.x;
	for (var i = 0; i < tilesWide; i += 1)
	{
		currentTile.x = startTile.x;
		currentTile.y = startTile.y;
		
		drawPos.y = startDrawPos.y;
		
		for (var j = 0; j < tilesTall; j += 1)
		{
			tile = tileMap.findTileIndexAt(currentTile.x, currentTile.y);
			
			gameCTX.drawImage(
				squareTileset,
				//in-image position
				tile.x * 42, tile.y * 42, 42, 42,
				//screen position
				drawPos.x, drawPos.y, 42, 42
				);
			
			currentTile.x += downTileChange.dx;
			currentTile.y += downTileChange.dy;
			
			drawPos.y += 32;
		}
		
		startTile.x += rightTileChange.dx;
		startTile.y += rightTileChange.dy;
		
		drawPos.x += 32;
	}
	
	if (camera.rotationFrames > 0) {
		gameCTX.rotate(-camera.rotationInertia);
	}
	
	//and fix the translation
	gameCTX.translate(-(translation.x), -(translation.y));
}