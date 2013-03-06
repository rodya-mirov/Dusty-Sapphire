var rotateVector = function(changeVector, rotationAmount) {
	if (rotationAmount == 0) {
		return changeVector;
	}
	if (rotationAmount == 90) {
		return { dx: changeVector.dy, dy: -changeVector.dx };
	}
	if (rotationAmount == 180) {
		return { dx: -changeVector.dx, dy: -changeVector.dy };
	}
	if (rotationAmount == 270) {
		return {dx: -changeVector.dy, dy: changeVector.dx };
	}
	throw "Unknown rotation amount " + rotationAmount;
}

//for square tiles, the tile image is 42x42, but draws on a 32x32 space (put it at -5,-10)

var camera = {
	centerX: 0,
	centerY: 0,
	
	leftX: function() { return this.centerX - (gameCanvas.width >> 1); },
	topY: function() { return this.centerY - (gameCanvas.height >> 1); },
	
	mode: 0, //0 for square, 1 for isometric (unimplemented)
	rotation: 0, //0, 90, 180, 360 for square, or 45,135,225,315 for isometric
	
	rotationInertia: 0,
	rotationFrames: 0,
	maxRotationFrames: 15,
	inertialIncrement: 0,
	
	update: function() {
		if (this.rotationFrames > 0) {
			this.rotationFrames += 1;
			
			if (this.rotationFrames == this.maxRotationFrames) {
				this.rotationInertia = 0;
				this.rotationFrames = 0;
			}
			else {
				this.rotationInertia += this.inertialIncrement / this.maxRotationFrames;
			}
		}
	}
};
	
camera.recenter = function(){
	if(this.centerTarget && this.centerTarget.cameraCenter) {
		var centerOn = this.centerTarget.cameraCenter();
		this.centerX = centerOn.x;
		this.centerY = centerOn.y;
	}
	else {
		alert("Error in method \"recenter\"");
	}
};

camera.rotate = function(degrees) {
	if(this.rotationFrames == 0) { //only rotate if we're not done with the previous one
		this.rotation += degrees;
		this.rotation %= 360;
		if (this.rotation < 0) { this.rotation += 360; }
		
		this.rotationFrames = 1;
		this.inertialIncrement = degrees * Math.PI / 180;
		this.rotationInertia = -this.inertialIncrement;
	}
};