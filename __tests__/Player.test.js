const Potion = require('../lib/Potion');
const Player = require('../lib/Player');

jest.mock('../lib/Potion.js');

test('creates a player object', () => {
  const player = new Player('Dave');

  expect(player.name).toBe('Dave');
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));

  expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

console.log(new Potion());

/*
When you run npm run test, it will run all files within the __tests__
directory and any other .test files throughout the project. If you only
want to run a particular group of related tests (known as a test suite),
you can modify the npm run command as shown here:
  npm run test Player
  npm run test Potion
*/

/*
An example of mocking fs (file system module) might look like this:

const fs = require('fs');
jest.mock('fs');
fs.readFileSync.mockReturnValue('fake content');
*/

test("gets player's stats as an object", () => {
  const player = new Player('Dave');

  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
  const player = new Player('Dave');

  expect(player.getInventory()).toEqual(expect.any(Array));
  
  player.inventory = [];
  expect(player.getInventory()).toEqual(false);
});