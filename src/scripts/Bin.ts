import Colors from './Colors';

export default class Bin {
	
	public color:string;
	public html:HTMLDivElement;

	colorIntervalId:number;

	constructor() {
		this.html = document.createElement("div");
		this.html.classList.add('bin');
		this.colorChangeHandler();
	}

	colorChangeHandler():void {
		this.color = Colors.getRandomColorHex();
		this.html.style.background = '#' + this.color;
	}

}
