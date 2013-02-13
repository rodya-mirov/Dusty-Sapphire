imagesToLoad++;
var womanSprite = new Image();
womanSprite.src = "images/Addie.png";
womanSprite.onload = function() { finishLoadingImage(); }

var character = {
	worldX: 0,
	worldY: 0,
	
	drawOffsetX: -30,
	drawOffsetY: -49,
	
	drawWidth: 64,
	drawHeight: 64,
	
	drawX: 0,
	drawY: 0,
	
	cameraCenter: function() {
		return { x: this.worldX, y: this.worldY };
	},
	
	image: womanSprite,
	
	move: function(dx, dy) {
		this.worldX += dx;
		this.worldY += dy;
		
		if (dx < 0 && dy < 0) { this.drawY = 128; }
		else if (dx < 0 && dy == 0) { this.drawY = 448; }
		else if (dx < 0 && dy > 0) { this.drawY = 0; }
		
		else if (dx == 0 && dy < 0) { this.drawY = 320; }
		else if (dx == 0 && dy > 0) { this.drawY = 256; }
		
		else if (dx > 0 && dy < 0) { this.drawY = 192; }
		else if (dx > 0 && dy == 0) { this.drawY = 384; }
		else if (dx > 0 && dy > 0) { this.drawY = 64; }
		
		if (tileMap.centerTarget == this) {
			tileMap.recenter();
		}
	},
};

tileMap.centerTarget = character;