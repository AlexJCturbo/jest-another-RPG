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

//Inventory Test
test('gets inventory from player or returns false', () => {
  const player = new Player('Dave');

  expect(player.getInventory()).toEqual(expect.any(Array));
  
  player.inventory = [];
  expect(player.getInventory()).toEqual(false);
});

//Health Tests
test("gets player's health value", () => {
  const player = new Player('Dave');

  expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test("checks if player is alive or not", () => {
  const player = new Player('Dave');

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;
  expect(player.isAlive()).toBeFalsy();
});

test("subtracts from player's health", () => {
  const player = new Player('Dave');
  const oldHealth = player.health;

  player.reduceHealth(5);
  expect(player.health).toBe(oldHealth - 5);
  
  player.reduceHealth(99999);
  expect(player.health).toBe(0);
});

/*
we create a new Player instance in every test. We could choose to use the same
one in all of our tests, but this might lead to unintended consequences. Now
that our tests affect the Player object's property values, if we used the same
object every time, we would no longer be testing properties and methods in
isolation.

The moral of the story is that it's important to create a new instance of the
object we're testing in every test to give that test a fresh start.
*/

//Attack Test
test("gets player's attack value", () => {
  const player = new Player('Dave');
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

//Adding potions test
test('adds a potion to the inventory', () => {
  const player = new Player('Dave');
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());
  expect(player.inventory.length).toBeGreaterThan(oldCount);
});

//Testing if the correct potion is removed from inventory
test('uses a potion from inventory', () => {
  const player = new Player('Dave');
  player.inventory = [new Potion(), new Potion(), new Potion()];
  const oldCount = player.inventory.length;

  player.usePotion(1);
  expect(player.inventory.length).toBeLessThan(oldCount);
});