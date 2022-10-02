/*
Constructor functions act like blueprints for objects. Because they
don't have a return statement, they return undefined by default. However,
unlike a regular function, they are meant to be used in conjunction with
the new keyword.
*/

//Potion Constructor
class Potion {
  constructor(name) {
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    if (this.name === 'health') {
      this.value = Math.floor(Math.random() * 10 + 30);
    } else {
      this.value = Math.floor(Math.random() * 5 + 7);
    }
  }
}

//Potion Constructor using ES5
// function Potion(name) {
// 	this.types = ['strength', 'agility', 'health'];

	/*
	Notice that the this.name function is set to:
	name || this.types[Math.floor(Math.random() * this.types.length)].
	This is another use case of the || operator. This expression will
	be evaluated so that if name is truthy—that is to say, it can be
	coerced to true—then this.name = name. If name is not truthy, then
	this.name = this.types[Math.floor(Math.random() * this.types.length)] or
	a random type of potion.
	Note: all values are truthy except false, 0, -0, 0n, "", null, undefined, and NaN.
	*/

// 	this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
	
//   if (this.name === 'health') {
//     this.value = Math.floor(Math.random() * 10 + 30);
//   } else {
//     this.value = Math.floor(Math.random() * 5 + 7);
//   }
// };

module.exports = Potion;


/*
Constructor Example:

function Staff (name, doctor) {
	this.name = name;
	this.doctor = doctor;
	this.paging = function() {
		if (this.doctor) {
			console.log('BEEP!');
		} else {
			console.log ('No Pager!');
		}
	};
	this.paidTimeOff = true;
}

const lisa = new Staff ('Lisa', true);
const keeve = new Staff ('Keeve', false);
const chi = new Staff ('Chi', false);
const alejandro = new Staff ('Alejandro', true);

console.log('Lisa', lisa);
alejandro.paging();
*/

/*
The Potion() constructor should take in a name parameter and assign the value
property to be a random number between 7 and 12. If the potion is a health potion,
its value is a number between 30 and 40.
*/