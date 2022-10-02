const Potion = require('./Potion');
const Character = require('./Character');

//This code was generated with ES6
class Enemy extends Character {
	constructor(name, weapon) {
		
		//Call parent constructor here:
		super(name);

		//Removed these properties to introduce property inheritance
		//this.name = name;
		this.weapon = weapon;
		this.potion = new Potion;

		//this.health = Math.floor(Math.random() * 10 + 85);
		//this.strength = Math.floor(Math.random() * 5 + 5);
		//this.agility = Math.floor(Math.random() * 5 + 5);
	}

	//Enemy.prototype = Object.create(Character.prototype);

	getDescription() {
		return `A ${this.name} holding a ${this.weapon} has appeared!`;
	}
}

module.exports = Enemy;


//This code was generated with ES5
// function Enemy(name, weapon) {
//   this.name = name;
//   this.weapon = weapon;
//   this.potion = new Potion;

// 	this.health = Math.floor(Math.random() * 10 + 85);
//   this.strength = Math.floor(Math.random() * 5 + 5);
//   this.agility = Math.floor(Math.random() * 5 + 5);
// }

/*
IMPORTANT
If arrays can inherit methods from a parent constructor, then surely
you can do the same thing with your own objects!
We want objects to inherit from the Character() constructor that we
just created. This means Player() and Enemy() don't need to define
these methods anymore:
	- getHealth()
	- isAlive()
	- getAttackValue()
	- reduceHealth()
*/

	// Enemy.prototype.getHealth = function() {
	// 	return `The ${this.name}'s health is now ${this.health}!`;
	// };
	
	// Enemy.prototype.isAlive = function() {
	// 	if (this.health === 0) {
	// 		return false;
	// 	}
	// 	return true;
	// };
	
	// Enemy.prototype.getAttackValue = function() {
	// 	const min = this.strength - 5;
	// 	const max = this.strength + 5;
	// 	return Math.floor(Math.random() * (max - min) + min);
	// };
	
	// Enemy.prototype.reduceHealth = function(health) {
	// 	this.health -= health;
	// 	if (this.health < 0) {
	// 		this.health = 0;
	// 	}
	// };

// Enemy.prototype = Object.create(Character.prototype);

// Enemy.prototype.getDescription = function () {
// 	return `A ${this.name} holding a ${this.weapon} has appeared!`;
// }

// module.exports = Enemy;

/**
In ES6, constructor functions can be written using the class keyword, E.g.:
	class Car {
  	constructor(make, model) {
    	this.make = make;
    	this.model = model;
  	}

	  honk() {
  	  console.log('beep beep');
  	}
	}

	// car objects are still created and used the same way
	const car = new Car('Honda', 'Civic');
	car.honk();

Note that the class syntax accomplishes the same thing that a normal constructor
function would, as you can see in the following code:

	function Car(make, model) {
  	this.make = make;
  	this.model = model;
	}

	Car.prototype.honk = function() {
  	console.log('beep bee');
	};

	const car = new Car('Honda', 'Civic');
	car.honk();

ES6 classes are not hoisted. Hoisting refers to function declarations being put
into memory before your code has executed.

	//Uncaught ReferenceError: Cannot access 'Car' before initialization
	const car = new Car('Honda', 'Civic');

	class Car {
		constructor(make, model) {
  		this.make = make;
  		this.model = model;
		}
	}

*/