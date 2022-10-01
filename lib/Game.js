const Player = require('./Player');
const Enemy = require('./Enemy')
const inquirer = require('inquirer');

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;

	//Methods
	//Initialize the game
	Game.prototype.initializeGame = function() {
		this.enemies.push(new Enemy('goblin', 'sword'));
		this.enemies.push(new Enemy('orc', 'baseball bat'));
		this.enemies.push(new Enemy('skeleton', 'axe'));

		this.currentEnemy = this.enemies[0];

		inquirer.prompt({
			type: 'text',
			name: 'name',
			message: 'What is your name?'
		})

		//Destructure name from the prompt object
		.then(({name}) => {
			this.player = new Player(name);
		
			//Test the object creation
			console.log(this.currentEnemy, this.player);
		});
	};
/*
IMPORTANT
This is the perfect case where ES6 arrow shorthand is necessary versus just
being a nicety. If you were to write the callback function shown in the
following code:

	.then(function({ name }) {
		this.player = new Player(name);

 		//Test the object creation
		console.log(this.currentEnemy, this.player);
	});

The function keyword would have created a new lexical scope where this no
longer references the Game object. To avoid this problem, use the arrow
shorthand for all inquirer callbacks in this project!
*/

	// Game.prototype.battle()
	// Game.prototype.checkEndOfBattle()
	// Game.prototype.startNewBattle()

}

module.exports = Game;