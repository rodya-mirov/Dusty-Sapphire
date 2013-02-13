var keysDown = {};

var keyCodes = {
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	
	LEFT: 37,
	DOWN: 40,
	RIGHT: 39,
	UP: 38
};

var isKeyDown = function(listOfKeys){
	for (i=0; i < listOfKeys.length; i++) {
		if (keysDown[listOfKeys[i]] == 1) { return true; }
	}
	
	return false;
}

document.addEventListener('keyup', function() { keysDown[event.keyCode] = 0; }, false);
document.addEventListener('keydown', function() { keysDown[event.keyCode] = 1; }, false);

var speed = 2;

var processKeyboardInput = function()
{
	var change = { dx: 0, dy: 0 };
	
	if ( isKeyDown( [keyCodes.W, keyCodes.UP] ) ) { change.dy = -speed; }
	else if ( isKeyDown( [keyCodes.S, keyCodes.DOWN] ) ) { change.dy = speed; }
	
	if ( isKeyDown( [keyCodes.A, keyCodes.LEFT] ) ) { change.dx = -speed; }
	else if ( isKeyDown( [keyCodes.D, keyCodes.RIGHT] ) ) { change.dx = speed; }
	
	character.move(change.dx, change.dy);
};