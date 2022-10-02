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
			this.startNewBattle();
		});
	};

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
						
						//After player sees their empty inventory...
						return this.checkEndOfBattle();;
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

						//After player uses a potion...
            this.checkEndOfBattle();
					});
      	} else {
      	  const damage = this.player.getAttackValue();
        	this.currentEnemy.reduceHealth(damage);

					console.log(`You attacked the ${this.currentEnemy.name}`);
					console.log(this.currentEnemy.getHealth());

					//After player attacks...
					this.checkEndOfBattle();
				}
			});

		} else {
			const damage = this.currentEnemy.getAttackValue();
			this.player.reduceHealth(damage);
	
			console.log(`You were attacked by the ${this.currentEnemy.name}`);
			console.log(this.player.getHealth());

			//After enemy attacks...
			this.checkEndOfBattle();
		}
	};

	Game.prototype.checkEndOfBattle = function() {
		if (this.player.isAlive() && this.currentEnemy.isAlive()) {
			this.isPlayerTurn = !this.isPlayerTurn;
			this.battle();
		} else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
			console.log(`You've defeated the ${this.currentEnemy.name}.`);

			this.player.addPotion(this.currentEnemy.potion);
			console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion.`);

			this.roundNumber++;

			if (this.roundNumber < this.enemies.length) {
				this.currentEnemy = this.enemies[this.roundNumber];
				this.startNewBattle();
			} else {
				console.log('You win!');
			}
		} else {
			//Condition if Player has been defeated, marking the end of the game.
			console.log("You've been defeated!");
		}
	};
};

module.exports = Game;