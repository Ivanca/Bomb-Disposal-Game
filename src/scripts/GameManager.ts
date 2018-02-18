import BombsSpawnManager from './BombsSpawnManager';
import BinsSpawnManager from './BinsSpawnManager';
import Bin from './bin';
import $ from 'jquery';

namespace GameManager {

	export let bombsSpawnManager:BombsSpawnManager;
	export let binsSpawnManager:BinsSpawnManager;
	let bins:Bin[];
	let $gameContainer:JQuery<HTMLElement>;
	let $score:JQuery<HTMLElement>;
	let score:number = 0;

	export function initialSetup() {
		// code...
		$gameContainer = $('#game');
		$score = $('<div class="score">').appendTo($gameContainer);
		bombsSpawnManager = new BombsSpawnManager($gameContainer[0]);
		binsSpawnManager = new BinsSpawnManager($gameContainer[0]);
		updateScoreHtml();
	}

	export function gameOver() {
		bombsSpawnManager.onGameOver();
		binsSpawnManager.onGameOver();
		$gameContainer
			.html(`<div class="gameover"><p><strong>GAME OVER!</strong><br>Your score was: ${score}</></div>`)
			.find('.gameover')
			.hide()
			.fadeIn('slow');
	}

	export function addToScore(num:number) {
		score += num;
		updateScoreHtml();
	}

	function updateScoreHtml() {
		$score.html("Score: " + score);
	}
}

export default GameManager;