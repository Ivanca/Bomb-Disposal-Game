
import BombsSpawnManager from './BombsSpawnManager';
import BinsSpawnManager from './BinsSpawnManager';
import Bin from './bin';

export default class GameManager {
	
	spawnManager:BombsSpawnManager;
	binsSpawnManager:BinsSpawnManager;
	bins:Bin[];
	html:HTMLDivElement;
	constructor() {
		// code...
		this.html = document.querySelector('#game');
		this.spawnManager = new BombsSpawnManager(this.html);
		this.binsSpawnManager = new BinsSpawnManager(this.html);
	}
}
