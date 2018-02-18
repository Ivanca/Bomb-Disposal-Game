import Bomb from './Bomb';
import GameManager from './GameManager';
import Droppable from './../../node_modules/@shopify/draggable/lib/droppable';
import $ from 'jquery';

export default class BombSpawnManager {
	
	readonly MAX_MINUTES:number = 2;
	readonly INTERVAL_MAX_SECONDS:number = 5;
	readonly INTERVAL_MIN_SECONDS:number = 0.5;
	readonly BOMB_WIDTH_VH = 10;
	readonly BOMB_HEIGHT_VH = 10;

	bombsContainer:HTMLElement;

	spawnDelay:number;
	spawningStartTime:number;
	spawningEndTime:number;
	allBombs:Bomb[];

	constructor(gameContainer:HTMLElement) {
		this.allBombs = [];
		this.bombsContainer = document.createElement('div');
		this.spawningEndTime = Date.now() + (this.MAX_MINUTES * 60 * 1000);
		$(this.bombsContainer)
			.addClass('bombs-container')
			.appendTo(gameContainer);
		this.spawnBomb();

		let droppable = new Droppable(gameContainer, {
			draggable: '.bomb',
			droppable: '.bin, .bombs-container'
		});

		droppable.on('drag:stop', (e:any) => {
			let original = e.originalSource as HTMLElement;
			let bomb = this.findBombByHTMLNode(original);
			// avoid the "occupied" logic the pluggin offers by removing this class
			$(e.source).parent().removeClass('draggable-droppable--occupied');
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
		return this.allBombs.find((bomb)=> bomb.$html[0] === node);
	}

	spawnBomb() {
		let bomb = new Bomb();
		let {top, left} = this.getRandomUnoccupiedPosition();

		bomb.$html.css({top, left}).appendTo(this.bombsContainer);
		this.allBombs.push(bomb);

		if (Date.now() > this.spawningEndTime || this.allBombs.length > 120) {
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
			left = Math.random() * (containerBounds.width - bombPixelsWidth) + containerBounds.left;
			left = Math.max(left, 0);
			top = Math.random() * (containerBounds.height - bombPixelsHeight) + containerBounds.top;
			top = Math.max(top, 0);
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
