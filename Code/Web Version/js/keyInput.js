var keysDown = {};
var keysAlreadyHeld = {};

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

document.addEventListener('keyup', function(event) { keysDown[event.keyCode] = 0; }, false);
document.addEventListener('keydown', function(event) { keysDown[event.keyCode] = 1; }, false);

var speed = 2;

var directionManager = {
    /**
     * This represents the "new" change- the directions pressed this frame
     * that weren't pressed last frame.
     */
    newChange: function() {
        var output = {dx: 0, dy: 0};

        if (this.left && !this.wasLeft && !this.right) { output.dx = -1; }
        else if (this.right && !this.wasRight && !this.left) { output.dx = 1; }

        if (this.up && !this.wasUp && !this.down) { output.dy = -1; }
        else if (this.down && !this.wasDown && !this.up) { output.dy = 1; }

        return output;
    },

    /**
     * This represents the "held" or "sustained" change- the directions
     * that were pressed this frame, regardless of whether or not they were
     * changed from last frame.
     */
    directionsHeld: function() {
        var output = {dx: 0, dy: 0};

        if (this.left && !this.right) { output.dx = -1; }
        else if (this.right && !this.left) { output.dx = 1; }
        else if (this.up && !this.down) { output.dy = -1; }
        else if (this.down && !this.up) { output.dy = 1; }

        return output;
    },

    /**
     * This "settles" the movement- pushes the
     * "new" movement to the "old" movement flags,
     * and sets the "new" movement flags to false.
     */
    settle: function() {
        this.wasLeft = this.left;
        this.wasRight = this.right;
        this.wasUp = this.up;
        this.wasDown = this.down;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
    },

    left: false,
    wasLeft: false,

    right: false,
    wasRight: false,

    up: false,
    wasUp: false,

    down: false,
    wasDown: false
}

var processKeyboardInput = function()
{
    directionManager.settle();
	
	if ( isKeyDown( [keyCodes.W, keyCodes.UP] ) ) { directionManager.up = true; }
	else if ( isKeyDown( [keyCodes.S, keyCodes.DOWN] ) ) { directionManager.down = true; }
	
	if ( isKeyDown( [keyCodes.A, keyCodes.LEFT] ) ) { directionManager.left = true; }
	else if ( isKeyDown( [keyCodes.D, keyCodes.RIGHT] ) ) { directionManager.right = true; }

    var change = directionManager.newChange();
	
	playerCharacter.move(change.dx, change.dy);
	
	if (isKeyDown( [keyCodes.E] ) ) {
		camera.rotate(90);
	}
	if (isKeyDown( [keyCodes.Q] ) ) {
		camera.rotate(-90);
	}
};