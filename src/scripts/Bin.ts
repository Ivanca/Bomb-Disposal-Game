import Colors from './Colors';

export default class Bin {
	
	public color:string;
	public html:HTMLDivElement;
	private widthVw: number = 7;
	private svg:string = '<svg viewBox="0 0 59 59"><use xlink:href="images/bin.svg#bin" /></svg>';

	colorIntervalId:number;

	constructor() {
		this.html = document.createElement("div");
		this.html.classList.add('bin');
		this.html.style.width = this.widthVw + 'vw';
		this.html.innerHTML = this.svg;
		this.colorChangeHandler();
	}

	colorChangeHandler():void {
		this.color = Colors.getRandomColorHex();
		this.html.querySelector('svg').style.fill = this.color;
	}

	public onScore() : void {
		// code...
		this.widthVw += 0.3;
		this.html.style.width = this.widthVw + 'vw';
		this.colorChangeHandler();
	}

}
