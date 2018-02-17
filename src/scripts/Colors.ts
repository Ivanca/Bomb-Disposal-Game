 

class Colors {

	static possibleColors():string[] {
		return [
			'2a9d8f', // Pale Blue
			'e9c46a', // Pale Yellow
			'e76f51', // Pale Red
		]
	}

	static colorsHex:string[] = []
	
	public static getRandomColorHex():string {
		if (this.colorsHex.length === 0) {
			this.colorsHex = this.possibleColors();
		}
		let randomIndex:number = Math.floor(Math.random() * this.colorsHex.length);
		return this.colorsHex.splice(randomIndex, 1)[0];
	}
}

export default Colors;
