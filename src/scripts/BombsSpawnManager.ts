import Bomb from './Bomb';
import GameManager from './GameManager';
import Droppable from './../../node_modules/@shopify/draggable/lib/droppable';

export default class BombSpawnManager {
	
	readonly MAX_MINUTES:number = 0.3;
	readonly INTERVAL_MAX_SECONDS:number = 5;
	readonly INTERVAL_MIN_SECONDS:number = 0.5;
	readonly BOMB_WIDTH_VH = 10;
	readonly BOMB_HEIGHT_VH = 10;

	bombsContainer:HTMLDivElement;

	spawnDelay:number;
	spawningStartTime:number;
	spawningEndTime:number;
	bombCount:number = 0;

	constructor(gameContainer:HTMLDivElement) {
		this.bombsContainer = document.createElement('div');
		this.bombsContainer.classList.add('bombs-container');
		this.spawningEndTime = Date.now() + (this.MAX_MINUTES * 60 * 1000);
		gameContainer.appendChild(this.bombsContainer);
		this.spawnBomb();

		// droppable.on('droppable:stop', function (e:any) {
		// 	console.log(e);
		// });

	}

	spawnBomb() {
		let randomPosition = this.getRandomUnoccupiedPosition();
		this.bombCount++;
		let bomb = new Bomb();
		bomb.html.style.left = randomPosition.left + 'px';
		bomb.html.style.top = randomPosition.top + 'px';
		this.bombsContainer.appendChild(bomb.html);
		if (Date.now() > this.spawningEndTime || this.bombCount > 1) {
			GameManager.gameOver();
		} else {
			this.scheduleNextBombSpawn();
		}
	}

	getRandomUnoccupiedPosition():{left:number, top:number} {
		let containerBounds = this.bombsContainer.getBoundingClientRect();
		let bombPixelsWidth = (window.innerHeight / 100) * this.BOMB_WIDTH_VH;
		let bombPixelsHeight = (window.innerHeight / 100) * this.BOMB_HEIGHT_VH;
		let elementAlreadyAt:Element;
		let left:number;
		let top:number;
		do {
			left = Math.random()  * (containerBounds.width - bombPixelsWidth) + containerBounds.left;
			top = Math.random() * (containerBounds.height - bombPixelsHeight) + containerBounds.top;
			console.log(left, top);
			elementAlreadyAt = document.elementFromPoint(left, top);
		} while(elementAlreadyAt.matches('.bomb'));
		return {left, top};
	}

	scheduleNextBombSpawn() {
		let factor = (this.spawningEndTime - Date.now()) / (this.MAX_MINUTES * 60 * 1000);
		let delay = (this.INTERVAL_MAX_SECONDS - this.INTERVAL_MIN_SECONDS) * factor;
		delay += this.INTERVAL_MIN_SECONDS;
		delay *= 1000;
		setTimeout(()=>{
			this.spawnBomb();
		}, delay)
	}

	onGameOver() {
		let droppable:any = new Droppable(document.querySelector('#game'), {
			draggable: '.bomb',
			droppable: '.bin, .bombs-container'
		});
		console.log(droppable);
	}
}
