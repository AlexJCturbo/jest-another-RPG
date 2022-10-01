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
			//console.log(this.currentEnemy, this.player);
			this.startNewBattle();
		});
	};

/*
IMPORTANT
This is the perfect case where ES6 arrow shorthand is necessary versus just
being a nicety. If you were to write the callback function shown in the
following code:
	.then(function({ name }) {
		this.player = new Player(name);
		console.log(this.currentEnemy, this.player);
	});

The function keyword would have created a new lexical scope where this no
longer references the Game object. To avoid this problem, use the arrow
shorthand for all inquirer callbacks in this project!
*/

	//Method to start a new battle
	Game.prototype.startNewBattle = function() {
		if(this.player.agility > this.currentEnemy.agility) {
			this.isPlayerTurn = true;
		} else {
			this.isPlayerTurn = false;
		}

		console.log('Your stats are as follows:');
		console.table(this.player.getStats());
		console.log(this.currentEnemy.getDescription());

		this.battle();
	};

	//Method to assigning turns in battle
	Game.prototype.battle = function() {
		if (this.isPlayerTurn) {
			inquirer.prompt({
				type: 'list',
      	message: 'What would you like to do?',
    	  name: 'action',
      	choices: ['Attack', 'Use potion']
    	})
    	.then(({ action }) => {
  	    if (action === 'Use potion') {
					if (!this.player.getInventory()) {
						console.log("You don't have any potions!");
						return;
					}
					inquirer.prompt({
						type: 'list',
						name: 'action',
						message: 'Which potion would you like to use?',
						choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
					})
					.then(({ action }) => {
						const potionDetails = action.split(': ');
				
						this.player.usePotion(potionDetails[0] - 1);
						console.log(`You used a ${potionDetails[1]} potion.`);
					});
/*
The usePotion() method we set up and tested requires the index of the
object in the array (e.g., usePotion(0)). How can we preserve the
indexes if the inquirer package only returns a string value?

One solution would be to populate the choices array with strings that
contain the Potion name and its index (e.g., '1: health'), then strip
out the index after the user has chosen. We can do this using the
Array.prototype.map() method. The map() method creates a new array
based on the results of a callback function used in the original array.
The following code shows an example:
		const numbers = [5, 10, 15];
		const newArr = numbers.map((num) => `hello x ${num}`);
		
		//Not using ES6 syntax
		const newArr2 = numbers.map(function(num) {
			return 'hello x ' + num;
		});
		console.log(newArr); // ['hello x 5', 'hello x 10', 'hello x 15']
*/
/*
When the user selects a Potion, the returned value will be a string like
'2: agility'. We can use the String.prototype.split() method, though, to
split on the ': ', giving us an array with the number and Potion name
(e.g., ['2', 'agility']). Subtracting 1 from the number will put us back
at the original array index.
*/

      	} else {
      	  const damage = this.player.getAttackValue();
        	this.currentEnemy.reduceHealth(damage);

					console.log(`You attacked the ${this.currentEnemy.name}`);
					console.log(this.currentEnemy.getHealth());
				}
			});

		} else {
			const damage = this.currentEnemy.getAttackValue();
			this.player.reduceHealth(damage);
	
			console.log(`You were attacked by the ${this.currentEnemy.name}`);
			console.log(this.player.getHealth());
		}
	};
/*
We're using previously created methods like getAttackValue(),
reduceHealth(), and getHealth(). Because these methods already passed
our tests, we don't need to worry about them if the Game starts
producing bugs. It will most likely be an issue with the game logic
itself.
*/

	//Game.prototype.checkEndOfBattle()

}

module.exports = Game;