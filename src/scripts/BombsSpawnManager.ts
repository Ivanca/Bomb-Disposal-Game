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
	droppable:any;

	constructor(gameContainer:HTMLElement) {
		this.allBombs = [];
		this.bombsContainer = document.createElement('div');
		this.spawningEndTime = Date.now() + (this.MAX_MINUTES * 60 * 1000);
		$(this.bombsContainer)
			.addClass('bombs-container')
			.appendTo(gameContainer);
		this.spawnBomb();

		this.droppable = new Droppable(gameContainer, {
			draggable: '.bomb',
			droppable: '.bin, .bombs-container'
		});

		this.droppable.on('drag:stop', (e:any) => {
			let original = e.originalSource as HTMLElement;
			let bomb = this.findBombByHTMLNode(original);
			if (bomb.enabled) { 
				bomb.onDropped(e.source.parentElement);
			}
		});

		this.droppable.on('mirror:destroy', (e:any) => {
			// avoid the "occupied" logic the pluggin offers by removing this class
			$('.draggable-droppable--occupied').removeClass('draggable-droppable--occupied');
			if (e.mirror.parentNode === null) {
				// already removed, cancel event to prevent an error on "Draggable" library
				e.cancel();
			}
		});

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

	getRandomUnoccupiedPosition():{left:string, top:string} {
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
		} while(document.elementFromPoint(left, top).matches('.bomb, .bin'));
		return {
			left: (left / window.innerWidth * 100) + '%',
			top: (top / window.innerHeight * 100) + '%'
		};
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
		this.droppable.destroy();
		this.allBombs.forEach((bomb)=>{
			bomb.enabled = false; 
			bomb.$html.remove();
		});
		this.allBombs = [];
	}
}
