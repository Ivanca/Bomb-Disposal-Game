// declare module "./../../node_modules/@shopify/draggable/lib/draggable.js" {
// 	var Draggable:any;
// 	export = Draggable;
// };
import GameManager from './GameManager';
import Colors from './Colors';

export default class Bomb {

	public html: HTMLDivElement;

	constructor() {
		this.html = document.createElement('div');
		this.html.classList.add('bomb');
		this.html.style.background = '#' + Colors.getRandomColorHex(true);
		// code...
	}

	onDropped(collided:HTMLElement) {
		let initialBounds:ClientRect | DOMRect = this.html.getBoundingClientRect();
		if (collided.matches('.bin')) {			
			if (this.html.style.background === collided.style.background) {
				GameManager.addToScore(+1);
			}  else {
				GameManager.addToScore(-1);
			}
			this.html.remove();
		}

	}

}