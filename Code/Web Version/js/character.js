var playerCharacter = {
	tileX: 0,
	tileY: 0,

	drawOffsetX: -32,
	drawOffsetY: -48,

	drawWidth: 64,
	drawHeight: 64,

	drawX: 0,
	drawY: 0,

	cameraCenter: function() {
		return { x: (this.tileX << 5) + 16, y: (this.tileY << 5) + 16 };
	},

    drawPosition: function() {
        return { x: (this.tileX << 5) + this.drawOffsetX + 16, y: (this.tileY << 5) + this.drawOffsetY + 16 };
    },

	image: loadImage("images/Addie.png"),

	move: function(dx, dy) {

		if (dx < 0 && dy < 0) { this.drawY = 128; } //UL
		else if (dx < 0 && dy == 0) { this.drawY = 448; } //L
		else if (dx < 0 && dy > 0) { this.drawY = 0; } //DL

		else if (dx == 0 && dy < 0) { this.drawY = 320; } //U
		else if (dx == 0 && dy > 0) { this.drawY = 256; } //D

		else if (dx > 0 && dy < 0) { this.drawY = 192; } //UR
		else if (dx > 0 && dy == 0) { this.drawY = 384; } //R
		else if (dx > 0 && dy > 0) { this.drawY = 64; } //DR

		var change = rotateVector({ dx: dx, dy: dy }, camera.rotation);
		this.tileX += change.dx;
		this.tileY += change.dy;

		if (camera.centerTarget == this) {
			camera.recenter();
		}
	}
};

camera.centerTarget = playerCharacter;