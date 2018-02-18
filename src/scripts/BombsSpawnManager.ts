import Bomb from './Bomb';
import GameManager from './GameManager';
import Droppable from './../../node_modules/@shopify/draggable/lib/droppable';

export default class BombSpawnManager {
	
	readonly MAX_MINUTES:number = 2;
	readonly INTERVAL_MAX_SECONDS:number = 5;
	readonly INTERVAL_MIN_SECONDS:number = 0.5;
	readonly BOMB_WIDTH_VH = 10;
	readonly BOMB_HEIGHT_VH = 10;

	bombsContainer:HTMLDivElement;

	spawnDelay:number;
	spawningStartTime:number;
	spawningEndTime:number;
	bombCount:number = 0;
	allBombs:Bomb[];

	constructor(gameContainer:HTMLDivElement) {
		this.allBombs = [];
		this.bombsContainer = document.createElement('div');
		this.bombsContainer.classList.add('bombs-container');
		this.spawningEndTime = Date.now() + (this.MAX_MINUTES * 60 * 1000);
		gameContainer.appendChild(this.bombsContainer);
		this.spawnBomb();

		let droppable = new Droppable(gameContainer, {
			draggable: '.bomb',
			droppable: '.bin, .bombs-container'
		});

		droppable.on('drag:stop', (e:any) => {
			let original = e.originalSource as HTMLElement;
			let bomb = this.findBombByHTMLNode(original);

			// avoid the "occupied" logic the pluggin offers by removing this class
			e.source.parentElement.classList.remove('draggable-droppable--occupied');
			if (bomb.enabled) { 
				bomb.onDropped(e.source.parentElement);
			}
		});

		droppable.on('mirror:destroy', (e:any) => {
			if (e.mirror.parentNode === null) {
				// already removed, cancel event to prevent an error on "Draggable" library
				e.cancel();
			}
		})

	}

	findBombByHTMLNode(node:HTMLElement):Bomb {
		return this.allBombs.find((bomb)=> bomb.html === node);
	}

	spawnBomb() {
		let randomPosition = this.getRandomUnoccupiedPosition();
		this.bombCount++;
		let bomb = new Bomb();
		bomb.html.style.left = randomPosition.left + 'px';
		bomb.html.style.top = randomPosition.top + 'px';
		this.allBombs.push(bomb);
		this.bombsContainer.appendChild(bomb.html);
		if (Date.now() > this.spawningEndTime || this.bombCount > 120) {
			GameManager.gameOver();
		} else {
			this.scheduleNextBombSpawn();
		}
	}

	getRandomUnoccupiedPosition():{left:number, top:number} {
		let containerBounds = this.bombsContainer.getBoundingClientRect();
		let bombPixelsWidth = (window.innerHeight / 100) * this.BOMB_WIDTH_VH;
		let bombPixelsHeight = (window.innerHeight / 100) * this.BOMB_HEIGHT_VH;
		let left:number;
		let top:number;
		do {
			left = Math.random()  * (containerBounds.width - bombPixelsWidth) + containerBounds.left;
			top = Math.random() * (containerBounds.height - bombPixelsHeight) + containerBounds.top;
			console.log(left, top);
		} while(document.elementFromPoint(left, top).matches('.bomb'));
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
		
	}
}
