import GameManager from './GameManager';
import Colors from './Colors';
import $ from 'jquery';

export default class Bomb {

	public html: HTMLDivElement;
	public enabled: boolean;
	class: string;
	explosionInterval: number;

	constructor() {
		this.enabled = true;
		// unique classname
		this.class = 'bomb-' + Date.now();
		this.html = document.createElement('div');
		this.html.classList.add('bomb', this.class);
		this.html.style.background = '#' + Colors.getRandomColorHex(true);
		this.handleExplosionTiming();
	}

	public onDropped(collided:HTMLElement) {
		let initialBounds:ClientRect | DOMRect = this.html.getBoundingClientRect();
		if (collided.matches('.bin')) {			
			if (this.html.style.background === collided.style.background) {
				GameManager.addToScore(+1);
			}  else {
				GameManager.addToScore(-1);
			}
			this.destroy();
		}
	}

	private handleExplosionTiming() {
		let countDown = 5 + Math.floor(Math.random() * 6);
		this.explosionInterval = setInterval(()=> {
			countDown--;
			$('.' + this.class).html(countDown.toString());
			if (countDown === 0) {
				this.destroy();
				// penalty for taking too long to remove this bomb;
				GameManager.addToScore(-1);
			}
		}, 1000);
	}

	private destroy() {
		clearInterval(this.explosionInterval);
		this.enabled = false;
		// making sure to delete any dragging clones as well
		setTimeout(()=> $('.' + this.class).remove())
	}

}