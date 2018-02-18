import BombsSpawnManager from './BombsSpawnManager';
import BinsSpawnManager from './BinsSpawnManager';
import Bin from './bin';

namespace GameManager {

	export let bombsSpawnManager:BombsSpawnManager;
	export let binsSpawnManager:BinsSpawnManager;
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
		updateScoreHtml();
	}

	export function gameOver() {
		bombsSpawnManager.onGameOver();
		binsSpawnManager.onGameOver();
	}

	export function addToScore(num:number) {
		score += num;
		updateScoreHtml();
	}

	function updateScoreHtml() {
		scoreElement.innerHTML = "Score: " + score;
	}
}

export default GameManager;