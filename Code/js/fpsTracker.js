var fpsTracker = {
	numberOfFramesToTrack: 10,
	
	trackedTimes: [],
	currentIndex: 0,
	
	totalTime: 0,
	
	getFPS: function(){
		return Math.floor(1000 / (this.totalTime / this.numberOfFramesToTrack));
	},
	
	updateFPS: function(elapsedTime) {
		if (this.trackedTimes.length > this.currentIndex) {
			this.totalTime -= this.trackedTimes[this.currentIndex];
		}
		
		this.trackedTimes[this.currentIndex] = elapsedTime;
		this.currentIndex = (this.currentIndex+1) % this.numberOfFramesToTrack;
		
		this.totalTime += elapsedTime;
	}
};

function updateAndRenderFPS(elapsedTime) {
	fpsTracker.updateFPS(elapsedTime);
	
	gameCTX.fillText("FPS: " + fpsTracker.getFPS(), gameCanvas.width - 30, gameCanvas.height - 30);
}