var compass = {};

compass.image = loadImage("images/compass.png");

compass.draw = function(screenWidth, screenHeight) {
	var translation = {
		x: screenWidth - 80,
		y: 20
	};

	gameCTX.translate(translation.x, translation.y);
	
	if (camera) {
		gameCTX.translate(30, 50);
		gameCTX.rotate((Math.PI * camera.rotation) / 180);
		if (camera.rotationFrames > 0) {
			gameCTX.rotate(camera.rotationInertia);
		}
		gameCTX.translate(-30, -50);
	}
	
	gameCTX.drawImage(this.image, 0, 0);
	
	if (camera) {
		gameCTX.translate(30, 50);
		gameCTX.rotate(-(Math.PI * camera.rotation) / 180);
		if (camera.rotationFrames > 0) {
			gameCTX.rotate(-camera.rotationInertia);
		}
		gameCTX.translate(-30, -50);
	}
	gameCTX.translate(-translation.x, -translation.y);
}