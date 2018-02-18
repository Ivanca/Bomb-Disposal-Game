import BombsSpawnManager from './BombsSpawnManager';
import BinsSpawnManager from './BinsSpawnManager';
import Bin from './bin';



namespace GameManager {

	let bombsSpawnManager:BombsSpawnManager;
	let binsSpawnManager:BinsSpawnManager;
	let bins:Bin[];
	let gameContainer:HTMLDivElement;
	let score:HTMLDivElement;

	export function initialSetup() {
		// code...
		gameContainer = document.querySelector('#game') as HTMLDivElement;
		bombsSpawnManager = new BombsSpawnManager(gameContainer);
		binsSpawnManager = new BinsSpawnManager(gameContainer);
	}

	export function gameOver() {
		bombsSpawnManager.onGameOver();
		binsSpawnManager.onGameOver();
	}
}

export default GameManager;