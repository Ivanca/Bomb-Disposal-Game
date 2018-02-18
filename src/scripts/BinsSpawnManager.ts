import Bin from './Bin';
import $ from 'jquery';

export default class BinSpawnManager {

	bins:Bin[];
	$binsContainer: JQuery<HTMLElement>;
	$swapColorCountdown: JQuery<HTMLElement>; 
	setIntervalId: number;

	constructor(game:HTMLElement) {
		this.bins = [new Bin, new Bin, new Bin];
		this.$binsContainer = $('<div class="bins-container">')
			.append(this.bins.map((e) => e.html))
			.appendTo(game);
		this.$swapColorCountdown = $('<div class="bin-timer-countdown">')
			.appendTo(game);
		this.startCountdown();
	}

	startCountdown() {
		const delayInSeconds = 40;
		let countDown = delayInSeconds;
		this.setIntervalId = setInterval(() => {
			if (--countDown === 0) {
				this.bins.forEach((bin) => bin.colorChangeHandler());
				countDown = delayInSeconds;
			}
			this.$swapColorCountdown.html(countDown.toString());
		}, 1000);
	}

	onGameOver() {
		clearInterval(this.setIntervalId);
	}

}