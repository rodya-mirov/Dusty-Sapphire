var mouseState = {
	buttonsHeld: {},
	
	mouseOnScreen: false,
	
	mouseX: -1,
	mouseY: -1,
	
	leftButtonHeld: function() { return 0 in buttonsHeld; },
	middleButtonHeld: function() { return 1 in buttonsHeld; },
	rightButtonHeld: function() { return 2 in buttonsHeld; }
};

gameCanvas.addEventListener(
	"mousedown",
	function(e) {
		if (e.preventDefault) { e.preventDefault(); }
		if (e.stopPropagation) { e.stopPropagation(); }
			
		mouseState.buttonsHeld[e.button] = true;
	},
	false);

gameCanvas.addEventListener(
	"mouseup",
	function(e) {
		if (e.preventDefault) { e.preventDefault(); }
		if (e.stopPropagation) { e.stopPropagation(); }
		
		delete mouseState.buttonsHeld[e.button];
	},
	false);

gameCanvas.addEventListener(
	"mousemove",
	function(e) {
		if (gameCanvas)
		{
			var canvasPos = findElementPosition(gameCanvas);
			mouseState.mouseX = e.clientX - canvasPos.x;
			mouseState.mouseY = e.clientY - canvasPos.y;
		}
	},
	false);

var processMouseInput = function() {
	//nothing
}