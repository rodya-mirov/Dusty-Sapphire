imagesToLoad++;
var squareTileset = new Image();
squareTileset.src = "images/SquareTileSheet.png";
squareTileset.onload = function() { finishLoadingImage(); }

//for square tiles, the tile image is 42x42, but draws on a 32x32 space (put it at -5,-10)

var tileMap = {
	cameraLeftX: 0,
	cameraTopY: 0,
	
	randomA: 22695477,
	randomB: 1,

	findTileIndexAt : function(xIndex, yIndex){
		var seed = (xIndex & 65535) + (yIndex << 16); //combine them into a uniform seed

		var rng = seed * seed % 14747;
		var mod = rng % 5;
		
//		alert("From (" + xIndex + "," + yIndex + ") we got a seed of (" + seed + ") and a result of (" + rng + ") which has a tile of (" + mod + ")");
		return { x: mod, y: 0 };
	}
}

var drawMap = function(screenWidth, screenHeight) {
	screenWidth += 5; //this is to compensate for tile overflow
	
	var cameraLeftX = Math.floor(tileMap.cameraLeftX);
	var cameraTopY = Math.floor(tileMap.cameraTopY);
	
	var drawOffsetX, drawOffsetY;
	var leftTileX, topTileY;
	
	drawOffsetX = -(cameraLeftX % 32);
	if (drawOffsetX > 0) { drawOffsetX -= 32; }
	leftTileX = (cameraLeftX + drawOffsetX) / 32;
	
	drawOffsetY = -(cameraTopY % 32);
	if (drawOffsetY > 0) { drawOffsetY -= 32; }
	topTileY = (cameraTopY + drawOffsetY) / 32;
	
	var topY, leftX;
	var tileX, tileY;
	
	topY = drawOffsetY - 10;
	tileY = topTileY;
	
	//draw each row
	while (topY < screenHeight) {
		leftX = drawOffsetX - 5;
		tileX = leftTileX;
		
		//draw the squares in each row
		while (leftX < screenWidth + 5) {
			var tile = tileMap.findTileIndexAt(tileX, tileY);
			
			gameCTX.drawImage(
				squareTileset, 
				tile.x * 42, tile.y * 42, 42, 42, //find the tile coordinates in the image
				leftX, topY, 42, 42
				);
			
			//alert("Drawing tile (" + tileX + "," + tileY + ") at (" + leftX + "," + topY + ")");
			
			leftX += 32;
			tileX ++;
		}
		
		topY += 32;
		tileY ++;
	}
}