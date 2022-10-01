const Potion = require('../lib/Potion');

function Player(name = '') {
	this.name = name;
	this.health = Math.floor(Math.random() * 10 + 95);
	this.strength = Math.floor(Math.random() * 5 + 7);
	this.agility = Math.floor(Math.random() * 5 + 7);

	this.inventory = [new Potion('health'), new Potion()];

/*	
	//Returns an object with various player properties
	this.getStats = function() {
		return {
			potions: this.inventory.length,
			health: this.health,
			strength: this.strength,
			agility: this.agility
		};
	};

	//Returns the inventory array or false if empty
	this.getInventory = function() {
		if(this.inventory.length) {
			return this.inventory;
		}
		return false;
	};
*/

	//Using prototype sintax
	Player.prototype.getStats = function() {
		return {
			potions: this.inventory.length,
			health: this.health,
			strength: this.strength,
			agility: this.agility
		};
	};

	Player.prototype.getInventory = function() {
		if (this.inventory.length) {
			return this.inventory;
		}
		return false;
	};
};

module.exports = Player;

/*
PROTOTYPE
At a glance, using this.methodName probably makes more sense. It clearly
shows that you are creating methods for each player. Unfortunately, that's
also the problem: it creates new methods for each player. If you have a
game that creates 100 Player objects, your code will create a hundred
getStats() methods.

When using prototype, however, you are only creating the method once on
the constructor itself. New player objects simply inherit the method from
the constructor rather than having their own instances of that method.
Such inheritance can traverse multiple levels, meaning if the method
being called doesn't exist on Player(), JavaScript will look for it on
the next constructor up the chain. In this case, the next constructor
would be the built-in Object data type.
*/

/*
Prototype chain
Because of this chain, you can call player.toString() even though you
didn't explicitly define a toString() method anywhere. It was inherited
from Object two levels up. In JavaScript, this is known as the
prototype chain.
*/

/*
DO NOT USE ARROW FUNCTIONS WITH PROTOTYPES
Arrow functions change what "this" means. Under normal lexical scope
conditions, this would self-reference the Player object. Using arrow
functions, this now refers to whatever it means in the outer scope. In
the case of Node.js, the global this is just an empty object (e.g., {}).
Thus, all of these properties become undefined.

*/