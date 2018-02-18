import Bin from './Bin';

export default class BinSpawnManager {

	bins:Bin[];
	binsContainer: HTMLDivElement;
	swapColorCountdown: HTMLDivElement; 
	setIntervalId: number;

	constructor(gameContainer:HTMLDivElement) {
		this.binsContainer = document.createElement('div');
		this.binsContainer.classList.add('bins-container');
		this.bins = [new Bin, new Bin, new Bin];
		this.bins.forEach((bin) => this.binsContainer.appendChild(bin.html));
		this.swapColorCountdown = document.createElement('div');
		this.swapColorCountdown.classList.add('bin-timer-countdown');
		gameContainer.appendChild(this.binsContainer);
		gameContainer.appendChild(this.swapColorCountdown);
		this.startCountdown();
	}

	startCountdown() {
		const delayInSeconds = 40;
		let countDown = delayInSeconds;
		this.setIntervalId = setInterval(() => {
			countDown--;
			if (countDown === 0) {
				this.bins.forEach((bin) => bin.colorChangeHandler());
				countDown = delayInSeconds;
			}
			this.swapColorCountdown.innerHTML = countDown.toString();
		}, 1000);
	}

	onGameOver() {
		clearInterval(this.setIntervalId);
	}

}