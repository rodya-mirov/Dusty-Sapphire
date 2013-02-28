var squareTileset = loadImage("images/SquareTileSheet.png");

var tileMap = {

	makeRandom: function(xIndex, yIndex) {
		var seed = (xIndex & 65535) + (yIndex << 16); //combine them into a uniform seed
		return (seed * seed) % 509203;
	},
};

tileMap.findTileIndexAt = function(xIndex, yIndex){
	return {
		x: this.makeRandom(xIndex, yIndex) % 5,
		y: 0
	};
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
	
	//go this many from center
	var tilesLeft = (screenWidth >> 6) + 1; //half the screen width, divided by 32
	var tilesUp = (screenHeight >> 6) + 1; //as above
	
	if (camera.rotationFrames > 1) //while spinning, the calculations get a little weirder
	{ //basically, just draw 1.5 times as many, and make it a big square
		if (tilesLeft < tilesUp) { tilesLeft = tilesUp; }
		tilesLeft += tilesLeft >> 1;
		tilesUp = tilesLeft;
	}
	
	//which means we'll start here, in the (screen's) upper left corner
	var startTile = {
		x: tileCenter.x - tilesLeft * rightTileChange.dx - tilesUp * downTileChange.dx,
		y: tileCenter.y - tilesLeft * rightTileChange.dy - tilesUp * downTileChange.dy,
	};
	
	var tilesWide = 2 * tilesLeft + 1;
	var tilesTall = 2 * tilesUp + 1;
	
	var currentTile = {};
	
	/*
	translation.x -= additionalTranslation.x;
	translation.y -= additionalTranslation.y;
	*/
	
	var startDrawPos = {
		x: -tilesLeft * 32 - 5 - additionalTranslation.x,
		y: -tilesUp * 32 - 10 - additionalTranslation.y,
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