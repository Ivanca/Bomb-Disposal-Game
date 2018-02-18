// declare module "./../../node_modules/@shopify/draggable/lib/draggable.js" {
// 	var Draggable:any;
// 	export = Draggable;
// };
import GameManager from './GameManager';
import Colors from './Colors';

export default class Bomb {

	public html: HTMLDivElement;
	public enabled: boolean;
	id: number;

	constructor() {
		this.enabled = true;
		this.id = Date.now();
		this.html = document.createElement('div');
		this.html.classList.add('bomb', 'bomb-' + this.id);
		this.html.style.background = '#' + Colors.getRandomColorHex(true);
		this.handleExplosionTiming();
		// code...
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
		let id = setInterval(()=> {
			countDown--;
			[...document.querySelectorAll('.bomb-' + this.id)].forEach(
				(e) => e.innerHTML = countDown.toString()
			)
			this.html.innerHTML = countDown.toString();
			if (countDown === 0) {
				clearInterval(id);
				if (this.html.parentElement) {
					this.destroy();
					// penalty for taking too long to remove this bomb;
					GameManager.addToScore(-1);
				}
			}
		}, 1000);
	}

	private destroy() {
		setTimeout(()=>{
			this.enabled = false;
			[...document.querySelectorAll('.bomb-' + this.id)].forEach(
				(e)=> e.remove()
			)
		})
	}

}