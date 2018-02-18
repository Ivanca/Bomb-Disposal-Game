import BombsSpawnManager from './BombsSpawnManager';
import BinsSpawnManager from './BinsSpawnManager';
import Bin from './bin';

namespace GameManager {

	let bombsSpawnManager:BombsSpawnManager;
	let binsSpawnManager:BinsSpawnManager;
	let bins:Bin[];
	let gameContainer:HTMLDivElement;
	let scoreElement:HTMLDivElement;
	let score:number = 0;

	export function initialSetup() {
		// code...
		gameContainer = document.querySelector('#game') as HTMLDivElement;
		scoreElement = document.createElement('div');
		scoreElement.classList.add('score');
		gameContainer.appendChild(scoreElement);
		bombsSpawnManager = new BombsSpawnManager(gameContainer);
		binsSpawnManager = new BinsSpawnManager(gameContainer);
	}

	export function gameOver() {
		bombsSpawnManager.onGameOver();
		binsSpawnManager.onGameOver();
	}

	export function addToScore(num:number) {
		score += num;
		scoreElement.innerHTML = "Score: " + score;
	}
}

export default GameManager;