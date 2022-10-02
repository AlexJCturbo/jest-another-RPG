const Potion = require('../lib/Potion');
const Character = require('./Character');

/*
Keep in mind that in an ES6 class, the methods go inside the class brackets
instead of being defined in the prototype.
*/

/*
Method inheritance with ES6 is pretty simple. We just need to
tell our classes to extend another class.
*/
//This code was generated with ES6
class Player extends Character {
  constructor(name = '') {

	  //Call parent constructor here:
		super(name);
/*
The super keyword is how we can reference the parent object. In a constructor(),
calling super() will call the constructor() of the parent. Even though we didn't
add our own constructor() method to the Character class, one still exists under
the hood to set up the object.
*/
    
		//Removed these properties to introduce property inheritance
    //this.name = name;
    //this.health = Math.floor(Math.random() * 10 + 95);
    //this.strength = Math.floor(Math.random() * 5 + 7);
    //this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];
  }

  getStats() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  }

  getInventory() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  }

  addPotion(potion) {
    this.inventory.push(potion);
  }

  usePotion(index) {
    const potion = this.inventory.splice(index, 1)[0];

    switch (potion.name) {
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength':
        this.strength += potion.value;
        break;
    }
  }
}

module.exports = Player;


//This code was generated with ES5
// function Player(name = '') {
//   this.name = name;

//   this.health = Math.floor(Math.random() * 10 + 95);
//   this.strength = Math.floor(Math.random() * 5 + 7);
//   this.agility = Math.floor(Math.random() * 5 + 7);

//   this.inventory = [new Potion('health'), new Potion()];
// }
// /*	
// 	//Returns an object with various player properties
// 	this.getStats = function() {
// 		return {
// 			potions: this.inventory.length,
// 			health: this.health,
// 			strength: this.strength,
// 			agility: this.agility
// 		};
// 	};

// 	//Returns the inventory array or false if empty
// 	this.getInventory = function() {
// 		if(this.inventory.length) {
// 			return this.inventory;
// 		}
// 		return false;
// 	};
// */

// //Inherit prototype methods from Character here:
// Player.prototype = Object.create(Character.prototype);

// /*
// We'll take all of the methods that exist on the Character() constructor's
// prototype and assign them as the prototype for another object. In fact,
// that new object could simply be the prototype of an existing constructor
// function. For example: Player.prototype. Thus, Player() could inherit all
// of its prototype methods from Character().

// For this to work, however, you must establish the inheritance before
// assigning any other methods to prototype. Otherwise, those methods will
// get overwritten.
// */

// //Using prototype sintax
// Player.prototype.getStats = function () {
// 	return {
// 		potions: this.inventory.length,
// 		health: this.health,
// 		strength: this.strength,
// 		agility: this.agility
// 	};
// };

// Player.prototype.getInventory = function () {
// 	if (this.inventory.length) {
// 		return this.inventory;
// 	}
// 	return false;
// };

// 	// Player.prototype.getHealth = function() {
// 	// 	return(`${this.name}'s health is now ${this.health}!`);
// 	// }

// 	// Player.prototype.isAlive = function() {
// 	// 	if (this.health === 0) {
// 	// 		return false;
// 	// 	}
// 	// 	return true;
// 	// };

// 	// Player.prototype.reduceHealth = function(health) {
// 	// 	this.health -= health;

// 	// 	if (this.health < 0) {
// 	// 		this.health = 0;
// 	// 	};
// 	// };

// 	// Player.prototype.getAttackValue = function() {
// 	// 	const min = this.strength - 5;
// 	// 	const max = this.strength + 5;

// 	// 	return Math.floor(Math.random() * (max - min) + min);
// 	// };

// Player.prototype.addPotion = function (potion) {
// 	//.push() is an Array method that adds an item to the end of an array.
// 	this.inventory.push(potion);
// };

// //Using index of the Potion to keep track of which one has been selected.
// Player.prototype.usePotion = function (index) {
// 	const potion = this.getInventory().splice(index, 1)[0];

// 	switch (potion.name) {
// 		case 'agility':
// 			this.agility += potion.value;
// 			break;
// 		case 'health':
// 			this.health += potion.value;
// 			break;
// 		case 'strength':
// 			this.strength += potion.value;
// 			break;
// 	};
// };


// module.exports = Player;

/*
The .splice() method removes items from an array and returns the removed
item(s) as a new array E.g.:
	let months = ["January", "February", "Monday", "Tuesday"];
	let days = months.splice(2, 2, "March", "April");

	console.log(days); // ["Monday", "Tuesday"]
	console.log(months); // ["January", "February", "March", "April"]

Thus, two things are happening here: the original
inventory array has a single Potion removed at the specified index value
and put into a new "removed items" array, then the Potion at index [0]
of this "removed items" array is saved in a potion variable.

Both .push() and .splice() are methods on the Array prototype. This means
that even built-in JavaScript data types are constructors themselves!
*/

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