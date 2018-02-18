import GameManager from './GameManager';
import Colors from './Colors';
import $ from 'jquery';

export default class Bomb {

	public $html: JQuery<HTMLElement>;
	public enabled: boolean;
	public color: string;
	class: string;
	explosionInterval: number;
	private svg:string = '<svg viewBox="0 0 97.324 97.324"><use xlink:href="dist/images/bomb.svg#bomb" /></svg>';

	constructor() {
		this.enabled = true;
		// unique classname
		this.class = 'bomb-' + Date.now();
		this.color = Colors.getRandomColorHex(true);
		this.$html = $('<div>')
			.addClass('bomb ' + this.class)
			.html(this.svg + '<span class="countdown"></span>');
		this.$html.find('svg').css('fill', this.color);
		this.handleExplosionTiming();
	}

	public onDropped(collided:HTMLElement) {
		let initialBounds:ClientRect | DOMRect = this.$html[0].getBoundingClientRect();
		if (collided.matches('.bin')) {
			let bin = GameManager.binsSpawnManager.findBinByHTMLNode(collided);
			if (this.color === bin.color) {
				GameManager.addToScore(+1);
			}  else {
				GameManager.addToScore(-1);
			}
			this.destroy();
		}
	}

	private handleExplosionTiming() {
		let countDown = 6 + Math.floor(Math.random() * 6);
		let everySecondCallback = ()=> {
			countDown--;
			this.$html.add('.' + this.class).find('.countdown').html(countDown.toString());
			if (countDown === 0) {
				this.destroy();
				// penalty for taking too long to remove this bomb;
				GameManager.addToScore(-1);
			}
		}
		this.explosionInterval = setInterval(everySecondCallback, 1000);
		everySecondCallback();
	}

	private destroy() {
		clearInterval(this.explosionInterval);
		this.enabled = false;
		// making sure to delete any dragging clones as well
		setTimeout(()=> $('.' + this.class).addClass('disabled').remove())
	}

}