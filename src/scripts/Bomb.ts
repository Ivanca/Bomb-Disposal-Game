// declare module "./../../node_modules/@shopify/draggable/lib/draggable.js" {
// 	var Draggable:any;
// 	export = Draggable;
// };
import Colors from './Colors';

export default class Bomb {

	public html: HTMLDivElement;

	constructor() {
		this.html = document.createElement('div');
		this.html.classList.add('bomb');
		// code...
	}
}